const fs = require('fs');
const { sortearRaca } = require('./racas.js');

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
criadoEm: Date.now(),
sementes: {},
frutos: {},
plantacoes: [],
habilidades: [],
ilhaAtual: classeKey === 'marinheiro' ? 'starter_marinheiro' : 'starter_pirata',
combate: null,
};
db.push(player);
return player;
}

module.exports = {
CLASSES,
loadRpgDB,
saveRpgDB,
getPlayer,
ensureRaceFields,
createPlayer,
};
