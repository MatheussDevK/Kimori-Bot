const fs = require('fs');
const { CLASSES } = require('./core.js');
const { RACAS } = require('./racas.js');

const BOSS_STATE_PATH = './database/rpg/bosses.json';

// Modificadores de combate por classe (multiplicativos sobre atk/def).
const CLASSES_COMBATE = {
marinheiro: { atkMult: 1.0, defMult: 1.15 },
pirata: { atkMult: 1.10, defMult: 1.0 },
espadachim: { atkMult: 1.20, defMult: 0.95 },
mago: { atkMult: 1.05, defMult: 1.0, critChance: 0.10 },
};

// Golpes disponíveis. `V` só aparece pra quem tiver transformação
// desbloqueada (player.transformacaoDesbloqueada) — verificado nos comandos.
const MOVES = {
C: { nome: 'Soco Rápido', mult: 0.85, critBonus: 0 },
X: { nome: 'Chute Forte', mult: 1.10, critBonus: 0.05 },
F: { nome: 'Combo', mult: 1.35, critBonus: 0 },
O: { nome: 'Especial', mult: 1.65, critBonus: 0.10 },
V: { nome: 'Transformação', mult: 2.30, critBonus: 0.15 },
};

// Estatísticas base por nível, iguais pra todo mundo antes dos bônus de
// classe/raça.
function statsBase(nivel) {
return {
atk: 8 + nivel * 2.2,
def: 4 + nivel * 1.1,
hpMax: 80 + nivel * 8,
};
}

function ehNoite() {
const h = new Date().getHours();
return h >= 18 || h < 6;
}

// Junta base + classe + raça num único conjunto de stats de combate — é
// isso que faz as raças "funcionarem de verdade" nos cálculos de dano.
function statsDoJogador(player) {
const base = statsBase(player.nivel);
const classeMod = CLASSES_COMBATE[player.classe] || {};
const racaMod = RACAS[player.raca]?.combate || {};

const hpMax = base.hpMax;
const hpAtual = typeof player.combate?.hpJogador === 'number' ? player.combate.hpJogador : hpMax;
const vidaPct = hpMax > 0 ? hpAtual / hpMax : 1;

let atk = base.atk * (classeMod.atkMult || 1);
// Humano: quanto mais perto da morte, mais dano (até +30% com a vida no fim)
if (racaMod.furiaBaixaVida) atk *= 1 + (1 - vidaPct) * 0.3;

return {
atk,
def: base.def * (classeMod.defMult || 1),
hpMax,
critChance: 0.05 + (classeMod.critChance || 0) + (racaMod.critChance || 0),
esquiva: racaMod.esquiva || 0,
reducaoDano: racaMod.reducaoDano || 0,
bloqueioChance: racaMod.bloqueioChance || 0,
lifesteal: racaMod.lifesteal || 0,
curaPorTurno: racaMod.curaPorTurno || 0,
enfraquecerChance: racaMod.enfraquecerChance || 0,
aoeChance: racaMod.aoeChance || 0,
reduzCritInimigo: racaMod.reduzCritInimigo || 0,
bonusNoturno: (racaMod.bonusNoturno && ehNoite()) ? racaMod.bonusNoturno : 0,
};
}

// NPCs/bosses não têm raça nem classe — só escalam com o nível deles. Os
// multiplicadores aqui são mais baixos que os do jogador de propósito: sem
// isso, um NPC "recomendado" pra determinada faixa de nível vira parede
// intransponível pra quem acabou de entrar nela.
function statsDoAlvo(alvo) {
const base = statsBase(alvo.nivel);
const bonusBoss = alvo.tipo === 'boss' ? 1.6 : 1;
return {
atk: base.atk * 0.65 * bonusBoss,
def: base.def * bonusBoss,
hpMax: Math.round(base.hpMax * 1.1 * bonusBoss),
critChance: 0.05,
esquiva: 0,
reducaoDano: 0,
};
}

// Um golpe de `atkStats` contra `defStats`, já considerando esquiva,
// bloqueio, crítico e redução de dano do alvo. A defesa mitiga em
// porcentagem (fórmula com retornos decrescentes), não em valor fixo —
// assim ela sempre ajuda, mas nunca zera o dano sozinha.
function calcularGolpe(atkStats, defStats, move) {
if (Math.random() < (defStats.esquiva || 0)) {
return { dano: 0, critou: false, esquivou: true, bloqueou: false };
}
if (Math.random() < (defStats.bloqueioChance || 0)) {
return { dano: 0, critou: false, esquivou: false, bloqueou: true };
}

let dano = atkStats.atk * (move.mult * (1 + (atkStats.bonusNoturno || 0)));
const critChance = Math.max(0, (atkStats.critChance || 0) + move.critBonus - (defStats.reduzCritInimigo || 0));
const critou = Math.random() < critChance;
if (critou) dano *= 1.5;

const mitigacao = (defStats.def || 0) / ((defStats.def || 0) + 50);
dano *= 1 - mitigacao;
dano *= 1 - (defStats.reducaoDano || 0);
dano = Math.max(1, Math.round(dano));

return { dano, critou, esquivou: false, bloqueou: false };
}

function loadBossState() {
try {
return JSON.parse(fs.readFileSync(BOSS_STATE_PATH));
} catch {
return {};
}
}

function saveBossState(state) {
try {
if (!fs.existsSync('./database/rpg')) fs.mkdirSync('./database/rpg', { recursive: true });
fs.writeFileSync(BOSS_STATE_PATH, JSON.stringify(state, null, 2));
} catch (e) { console.error('[erro]', e) }
}

function bossDisponivel(bossKey) {
const state = loadBossState();
return Date.now() >= (state[bossKey] || 0);
}

function tempoRespawnRestante(bossKey) {
const state = loadBossState();
return Math.max(0, (state[bossKey] || 0) - Date.now());
}

function registrarMorteBoss(bossKey, respawnMin) {
const state = loadBossState();
state[bossKey] = Date.now() + respawnMin * 60 * 1000;
saveBossState(state);
}

module.exports = {
MOVES,
statsBase,
statsDoJogador,
statsDoAlvo,
calcularGolpe,
ehNoite,
bossDisponivel,
tempoRespawnRestante,
registrarMorteBoss,
};
