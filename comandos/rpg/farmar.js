import { loadRpgDB, saveRpgDB, getPlayer, ensureEstaminaFields, gastarEstamina, minutosParaProximoPonto } from '../../arquivos/funcoes/rpg/core.js';
import { ensureIlhaFields, encontrarAlvo } from '../../arquivos/funcoes/rpg/ilhas.js';
import { NIVEL_MAX, addXp } from '../../arquivos/funcoes/rpg/xp.js';
import { MOVES, statsDoJogador, statsDoAlvo, calcularGolpe } from '../../arquivos/funcoes/rpg/combate.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

const CUSTO_ESTAMINA_POR_RODADA = 10;
const RODADAS_MAX = 5;

export default {
name: 'farmar',
category: 'rpg',
description: 'Ataca um NPC (não chefe) várias vezes seguidas, resolvendo tudo de uma vez — economiza tempo no grind.',
async execute(ctx) {
const { q, prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureIlhaFields(player);
ensureEstaminaFields(player);

if (player.combate) {
saveRpgDB(db);
return responder(ctx, `*ᴠᴏᴄᴇ ᴇsᴛᴀ́ ᴇᴍ ᴄᴏᴍʙᴀᴛᴇ* — termine com ${prefix}golpe ou ${prefix}fugir antes de farmar.`, null);
}

const partes = String(q || '').trim().split(/\s+/);
const alvoKey = (partes[0] || '').toLowerCase();
const alvo = encontrarAlvo(player.ilhaAtual, alvoKey);

if (!alvo) {
saveRpgDB(db);
return responder(ctx, `*ᴀʟᴠᴏ ɴᴀᴏ ᴇɴᴄᴏɴᴛʀᴀᴅᴏ ɴᴇssᴀ ɪʟʜᴀ*\n\n> Use *${prefix}farmar <npc> [vezes]*`,
[{ display_text: '📍 Ver Ilha', id: `${prefix}viajar ${player.ilhaAtual}` }]);
}
if (alvo.tipo === 'boss') {
saveRpgDB(db);
return responder(ctx, `*ɴᴀᴏ ᴅᴀ́ ᴘʀᴀ ғᴀʀᴍᴀʀ ᴄʜᴇғᴇs* (só têm 1 vida por respawn) — use ${prefix}atacar pra bosses.`, null);
}

const rodadasPedidas = Math.min(RODADAS_MAX, Math.max(1, parseInt(partes[1], 10) || RODADAS_MAX));

let vitorias = 0;
let xpTotal = 0;
let berriesTotal = 0;
let rodadasFeitas = 0;
let morreu = false;

for (let i = 0; i < rodadasPedidas; i++) {
if (!gastarEstamina(player, CUSTO_ESTAMINA_POR_RODADA)) break;
rodadasFeitas += 1;

const jogadorStatsBase = statsDoJogador(player);
const alvoStats = statsDoAlvo(alvo);
let hpJogador = Math.round(jogadorStatsBase.hpMax);
let hpAlvo = alvoStats.hpMax;

// Combate simplificado: só golpe C (rápido) até alguém cair, igual o
// motor de combate normal, só que sem precisar digitar golpe a golpe.
let turnos = 0;
while (hpJogador > 0 && hpAlvo > 0 && turnos < 50) {
turnos += 1;
const golpeJogador = calcularGolpe(statsDoJogador(player), alvoStats, MOVES.C);
hpAlvo = Math.max(0, hpAlvo - golpeJogador.dano);
if (hpAlvo <= 0) break;
const golpeAlvo = calcularGolpe(alvoStats, statsDoJogador(player), MOVES.C);
hpJogador = Math.max(0, hpJogador - golpeAlvo.dano);
}

if (hpJogador <= 0) { morreu = true; break; }

vitorias += 1;
const xpGanho = Math.round(15 + alvo.nivel * 4);
const berriesGanho = Math.round(10 + alvo.nivel * 2);
addXp(player, xpGanho);
player.berries += berriesGanho;
xpTotal += xpGanho;
berriesTotal += berriesGanho;
}

saveRpgDB(db);

if (rodadasFeitas === 0) {
const minutos = Math.ceil(minutosParaProximoPonto(player));
return responder(ctx,
`*⚡ ᴇsᴛᴀᴍɪɴᴀ ɪɴsᴜғɪᴄɪᴇɴᴛᴇ*\n\nCada rodada custa ${CUSTO_ESTAMINA_POR_RODADA}.\n🔋 Você tem: ${player.estamina}/100\n⏳ Próximo ponto em: ${minutos}min`,
[{ display_text: '⚡ Ver Estamina', id: `${prefix}estamina` }]);
}

let texto = `*🔁『 ғᴀʀᴍ ᴇᴍ ${alvo.nome} 』🔁*\n\n` +
`⚔️ Vitórias: ${vitorias}/${rodadasFeitas}\n✨ XP total: +${xpTotal}\n💰 Berries total: +${berriesTotal}\n🔋 Estamina restante: ${player.estamina}/100`;

if (morreu) texto += `\n\n*💀 Você apanhou demais e parou de farmar antes de morrer de vez.*`;

await responder(ctx, texto, [
{ display_text: '🔁 Farmar de Novo', id: `${prefix}farmar ${alvo.key}` },
{ display_text: '👤 Ver Perfil', id: `${prefix}perfilrpg` },
]);
},
};
