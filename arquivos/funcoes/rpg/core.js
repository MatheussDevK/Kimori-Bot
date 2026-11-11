import fs from 'node:fs';
import { sortearRaca } from './racas.js';

const RPG_PATH = './database/rpg/personagens.json';

// As 4 tripulações/classes iniciais. Cada uma tem um emoji e uma descrição
// curta pra já ir dando o clima de One Piece — dá pra encaixar bônus de
// atributos, sprite, o que for, mais pra frente sem mexer no resto do código.
const CLASSES = {
marinheiro: {
nome: 'Marinheiro',
emoji: '⚓',
descricao: 'Serve a Marinha e caça piratas em nome da Justiça.',
},
pirata: {
nome: 'Pirata',
emoji: '🏴‍☠️',
descricao: 'Navega os mares em busca de liberdade e tesouros.',
},
espadachim: {
nome: 'Espadachim',
emoji: '⚔️',
descricao: 'Especialista em combate com espadas, força bruta e honra.',
},
mago: {
nome: 'Mago',
emoji: '🔮',
descricao: 'Domina poderes místicos fora do comum — quase uma Akuma no Mi.',
},
};

function loadRpgDB() {
try {
const raw = fs.readFileSync(RPG_PATH);
const db = JSON.parse(raw);
return Array.isArray(db) ? db : [];
} catch {
return [];
}
}

function saveRpgDB(db) {
try {
if (!fs.existsSync('./database/rpg')) fs.mkdirSync('./database/rpg', { recursive: true });
fs.writeFileSync(RPG_PATH, JSON.stringify(db, null, 2));
} catch (e) { console.error('[erro]', e) }
}

function getPlayer(db, jid) {
return db.find(p => p?.jid === jid) || null;
}

// Personagens criados antes do sistema de raças/fragmentos não têm esses
// campos ainda — preenche sem precisar recriar o personagem.
function ensureRaceFields(player) {
if (!player.raca) player.raca = sortearRaca();
if (typeof player.fragmentos !== 'number') player.fragmentos = 0;
return player;
}

// --- Estamina -------------------------------------------------------
// Gasta em ações que "custam esforço" (atacar, duelar). Regenera sozinha
// com o tempo, então não precisa de comando pra "descansar" — só esperar.
const ESTAMINA_MAX = 100;
const ESTAMINA_REGEN_MIN = 3; // 1 ponto a cada 3 minutos

function ensureEstaminaFields(player) {
if (typeof player.estamina !== 'number') player.estamina = ESTAMINA_MAX;
if (typeof player.estaminaAtualizadoEm !== 'number') player.estaminaAtualizadoEm = Date.now();
return player;
}

// Calcula quantos pontos regeneraram desde a última atualização e aplica,
// sem perder o "resto" do tempo (evita drift: só avança o relógio pelos
// minutos efetivamente convertidos em pontos).
function regenerarEstamina(player) {
ensureEstaminaFields(player);
if (player.estamina >= ESTAMINA_MAX) {
player.estaminaAtualizadoEm = Date.now();
return player;
}
const minutosPassados = (Date.now() - player.estaminaAtualizadoEm) / 60000;
const pontosGanhos = Math.floor(minutosPassados / ESTAMINA_REGEN_MIN);
if (pontosGanhos > 0) {
player.estamina = Math.min(ESTAMINA_MAX, player.estamina + pontosGanhos);
player.estaminaAtualizadoEm += pontosGanhos * ESTAMINA_REGEN_MIN * 60000;
}
return player;
}

// Tenta gastar estamina; retorna false (sem gastar nada) se não tiver o
// suficiente. Sempre regenera antes de checar.
function gastarEstamina(player, custo) {
regenerarEstamina(player);
if (player.estamina < custo) return false;
player.estamina -= custo;
return true;
}

function minutosParaProximoPonto(player) {
regenerarEstamina(player);
if (player.estamina >= ESTAMINA_MAX) return 0;
const minutosPassados = (Date.now() - player.estaminaAtualizadoEm) / 60000;
return Math.max(0, ESTAMINA_REGEN_MIN - minutosPassados);
}

// --- Recompensa (bounty) --------------------------------------------
function ensureBountyFields(player) {
if (typeof player.recompensa !== 'number') player.recompensa = 0;
return player;
}

// --- Bando (crew) + PVP + Despertar ----------------------------------
function ensureBandoFields(player) {
if (player.bandoId === undefined) player.bandoId = null;
return player;
}

function ensurePvpFields(player) {
if (typeof player.vitoriasPvp !== 'number') player.vitoriasPvp = 0;
if (typeof player.derrotasPvp !== 'number') player.derrotasPvp = 0;
if (player.desafioDe === undefined) player.desafioDe = null;
if (typeof player.transformacaoDesbloqueada !== 'boolean') player.transformacaoDesbloqueada = false;
return player;
}

// --- Inventário genérico + Mares (seas) -------------------------------
function ensureItensFields(player) {
if (!player.itens || typeof player.itens !== 'object') player.itens = {};
return player;
}

function darItem(player, itemKey, qtd = 1) {
ensureItensFields(player);
player.itens[itemKey] = (player.itens[itemKey] || 0) + qtd;
return player.itens[itemKey];
}

function gastarItem(player, itemKey, qtd = 1) {
ensureItensFields(player);
if ((player.itens[itemKey] || 0) < qtd) return false;
player.itens[itemKey] -= qtd;
if (player.itens[itemKey] <= 0) delete player.itens[itemKey];
return true;
}

// Sea 1 já vem liberado pra todo mundo; sea 2/3 exigem Log Pose (dropado
// ao derrotar o chefe final do mar anterior — ver golpe.js).
function ensureMarFields(player) {
if (!Array.isArray(player.maresLiberados)) player.maresLiberados = [1];
return player;
}

function marLiberado(sea, player) {
ensureMarFields(player);
return player.maresLiberados.includes(sea);
}

function liberarMar(player, sea) {
ensureMarFields(player);
if (!player.maresLiberados.includes(sea)) player.maresLiberados.push(sea);
return player;
}

// Junta todos os "ensure" novos num só, pra chamar de uma vez nos comandos
// sem precisar lembrar de cada um separadamente.
function ensureAllFields(player) {
ensureRaceFields(player);
ensureEstaminaFields(player);
ensureBountyFields(player);
ensureBandoFields(player);
ensurePvpFields(player);
ensureItensFields(player);
ensureMarFields(player);
return player;
}

function createPlayer(db, jid, nome, classeKey) {
const classe = CLASSES[classeKey];
const player = {
jid,
nome,
classe: classeKey,
raca: sortearRaca(),
nivel: 1,
xp: 0,
berries: 100,
fragmentos: 0,
recompensa: 0,
criadoEm: Date.now(),
sementes: {},
frutos: {},
plantacoes: [],
habilidades: [],
ilhaAtual: classeKey === 'marinheiro' ? 'starter_marinheiro' : 'starter_pirata',
combate: null,
estamina: ESTAMINA_MAX,
estaminaAtualizadoEm: Date.now(),
bandoId: null,
vitoriasPvp: 0,
derrotasPvp: 0,
desafioDe: null,
transformacaoDesbloqueada: false,
itens: {},
maresLiberados: [1],
ultimaExploracao: 0,
};
db.push(player);
return player;
}

export default {
CLASSES,
loadRpgDB,
saveRpgDB,
getPlayer,
ensureRaceFields,
createPlayer,
ESTAMINA_MAX,
ESTAMINA_REGEN_MIN,
ensureEstaminaFields,
regenerarEstamina,
gastarEstamina,
minutosParaProximoPonto,
ensureBountyFields,
ensureBandoFields,
ensurePvpFields,
ensureItensFields,
darItem,
gastarItem,
ensureMarFields,
marLiberado,
liberarMar,
ensureAllFields,
};

export { CLASSES, loadRpgDB, saveRpgDB, getPlayer, ensureRaceFields, createPlayer, ESTAMINA_MAX, ESTAMINA_REGEN_MIN, ensureEstaminaFields, regenerarEstamina, gastarEstamina, minutosParaProximoPonto, ensureBountyFields, ensureBandoFields, ensurePvpFields, ensureItensFields, darItem, gastarItem, ensureMarFields, marLiberado, liberarMar, ensureAllFields };
