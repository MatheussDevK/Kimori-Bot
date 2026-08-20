// Ilhas do Sea 1. `imagem` fica null por padrão — preencha com uma URL
// quando quiser que a mensagem da ilha venha ilustrada. `nivelMax` é
// Infinity pra ilhas sem teto de nível (só o Colosseum tem faixa fechada).
const ISLANDS = {
starter_pirata: {
nome: 'Starter Island (Pirata)',
emoji: '🏴',
nivelMin: 0,
nivelMax: 15,
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/63d17048-4f99-4023-88eb-d664305f05c9.jpg",
npcs: [{ key: 'bandit', nome: 'Bandit', nivel: 5 }],
bosses: [],
},
starter_marinheiro: {
nome: 'Starter Island (Marinheiro)',
emoji: '⚓',
nivelMin: 0,
nivelMax: 15,
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/6b608192-80cc-4600-b4ef-35ac095a252b.jpg",
npcs: [{ key: 'trainee', nome: 'Trainee', nivel: 5 }],
bosses: [],
},
middle_island: {
nome: 'Middle Island',
emoji: '🏝️',
nivelMin: 0,
nivelMax: Infinity,
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/4fbcec76-df98-4f84-97a9-6a063821f16d.png",
npcs: [],
bosses: [],
},
jungle: {
nome: 'Jungle',
emoji: '🌴',
nivelMin: 15,
nivelMax: Infinity,
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/4ae73baa-1806-4114-9298-a20fc3865406.jpg",
npcs: [
{ key: 'monkey', nome: 'Monkey', nivel: 14 },
{ key: 'gorilla', nome: 'Gorilla', nivel: 20 },
],
bosses: [{ key: 'gorilla_king', nome: 'Gorilla King', nivel: 25, respawnMin: 2 }],
},
pirate_village: {
nome: 'Pirate Village',
emoji: '🏴‍☠️',
nivelMin: 30,
nivelMax: Infinity,
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/3464d04b-20e9-4912-8602-3d7f01d2cd46.jpg",
npcs: [
{ key: 'pirate', nome: 'Pirate', nivel: 35 },
{ key: 'brute', nome: 'Brute', nivel: 45 },
],
bosses: [{ key: 'bobby', nome: 'Bobby', nivel: 55, respawnMin: 10 }],
},
desert: {
nome: 'Desert',
emoji: '🏜️',
nivelMin: 60,
nivelMax: Infinity,
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/360cb3c0-7b42-4d1c-ad74-250513a049a3.jpg",
npcs: [
{ key: 'desert_bandit', nome: 'Desert Bandit', nivel: 60 },
{ key: 'desert_officer', nome: 'Desert Officer', nivel: 75 },
],
bosses: [],
},
frozen_village: {
nome: 'Frozen Village',
emoji: '❄️',
nivelMin: 90,
nivelMax: Infinity,
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/3e3bb617-c162-45e8-b83b-6556de0b6a93.jpg",
npcs: [
{ key: 'snow_bandit', nome: 'Snow Bandit', nivel: 90 },
{ key: 'snowman', nome: 'Snowman', nivel: 100 },
],
bosses: [{ key: 'yeti', nome: 'Yeti', nivel: 110, respawnMin: 3 }],
},
marine_fortress: {
nome: 'Marine Fortress',
emoji: '⚓',
nivelMin: 120,
nivelMax: Infinity,
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/58f45880-1222-48c6-a4cd-24182df6e08d.jpg",
npcs: [{ key: 'chief_petty_officer', nome: 'Chief Petty Officer', nivel: 120 }],
bosses: [{ key: 'vice_admiral', nome: 'Vice Admiral', nivel: 130, respawnMin: 5 }],
},
skypiea: {
nome: 'Skypiea Island',
emoji: '☁️',
nivelMin: 150,
nivelMax: Infinity,
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/a1f83235-4140-464b-a336-57b4c5b82ee9.jpg",
npcs: [
{ key: 'sky_bandit', nome: 'Sky Bandit', nivel: 150 },
{ key: 'dark_master', nome: 'Dark Master', nivel: 175 },
],
bosses: [],
},
impel_down: {
nome: 'Impel Down (Prisão)',
emoji: '🔒',
nivelMin: 200,
nivelMax: Infinity,
imagem: "https://kimoriapis.orbitalcode.online/api/uploads/07101354-e09c-4b54-93b9-45fa548275c5.png",
npcs: [
{ key: 'prisoner', nome: 'Prisoner', nivel: 190 },
{ key: 'dangerous_prisoner', nome: 'Dangerous Prisoner', nivel: 210 },
],
bosses: [
{ key: 'warden', nome: 'Warden', nivel: 220, respawnMin: 4 },
{ key: 'chief_warden', nome: 'Chief Warden', nivel: 230, respawnMin: 7 },
{ key: 'swan', nome: 'Swan', nivel: 240, respawnMin: 30 },
],
},
colosseum: {
nome: 'Colosseum',
emoji: '🏟️',
nivelMin: 225,
nivelMax: 250,
imagem: null,
npcs: [
{ key: 'toga_warrior', nome: 'Toga Warrior', nivel: 250 },
{ key: 'gladiator', nome: 'Gladiator', nivel: 275 },
],
bosses: [],
},
magma_village: {
nome: 'Magma Village',
emoji: '🌋',
nivelMin: 300,
nivelMax: Infinity,
imagem: null,
npcs: [
{ key: 'military_soldier', nome: 'Military Soldier', nivel: 300 },
{ key: 'military_spy', nome: 'Military Spy', nivel: 325 },
],
bosses: [{ key: 'magma_admiral', nome: 'Magma Admiral', nivel: 350, respawnMin: 20 }],
},
underwater_city: {
nome: 'Underwater City',
emoji: '🌊',
nivelMin: 380,
nivelMax: Infinity,
imagem: null,
npcs: [
{ key: 'fishman_warrior', nome: 'Fishman Warrior', nivel: 375 },
{ key: 'fishman_commando', nome: 'Fishman Commando', nivel: 400 },
],
bosses: [{ key: 'fishman_lord', nome: 'Fishman Lord', nivel: 425, respawnMin: 20 }],
},
upper_yard_entrance: {
nome: 'Upper Yard Entrance',
emoji: '☁️',
nivelMin: 450,
nivelMax: Infinity,
imagem: null,
npcs: [{ key: 'gods_guard', nome: "God's Guard", nivel: 450 }],
bosses: [],
},
upper_yard_first: {
nome: 'Upper Yard First Area',
emoji: '☁️',
nivelMin: 475,
nivelMax: Infinity,
imagem: null,
npcs: [{ key: 'shanda', nome: 'Shanda', nivel: 475 }],
bosses: [{ key: 'wysper', nome: 'Wysper', nivel: 500, respawnMin: 10 }],
},
upper_yard_second: {
nome: 'Upper Yard Second Area',
emoji: '☁️',
nivelMin: 525,
nivelMax: Infinity,
imagem: null,
npcs: [
{ key: 'royal_squad', nome: 'Royal Squad', nivel: 525 },
{ key: 'royal_soldier', nome: 'Royal Soldier', nivel: 550 },
],
bosses: [{ key: 'thunder_god', nome: 'Thunder God', nivel: 575, respawnMin: 10 }],
},
fountain_city: {
nome: 'Fountain City / Water 7',
emoji: '🏙️',
nivelMin: 625,
nivelMax: Infinity,
imagem: null,
npcs: [
{ key: 'galley_pirate', nome: 'Galley Pirate', nivel: 625 },
{ key: 'galley_captain', nome: 'Galley Captain', nivel: 650 },
],
bosses: [{ key: 'cyborg_boss', nome: 'Cyborg', nivel: 675, respawnMin: 30 }],
},
};

function listaIlhasOrdenadas() {
return Object.entries(ISLANDS).sort((a, b) => a[1].nivelMin - b[1].nivelMin);
}

function ilhaLiberada(ilha, nivel) {
return nivel >= ilha.nivelMin && nivel <= ilha.nivelMax;
}

// Acha um NPC ou boss pela key dentro de uma ilha específica.
function encontrarAlvo(ilhaKey, alvoKey) {
const ilha = ISLANDS[ilhaKey];
if (!ilha) return null;
const npc = ilha.npcs.find(n => n.key === alvoKey);
if (npc) return { ...npc, tipo: 'npc' };
const boss = ilha.bosses.find(b => b.key === alvoKey);
if (boss) return { ...boss, tipo: 'boss' };
return null;
}

// Personagens criados antes do sistema de ilhas/combate não têm esses
// campos ainda — preenche sem precisar recriar o personagem.
function ensureIlhaFields(player) {
if (!player.ilhaAtual || !ISLANDS[player.ilhaAtual]) {
player.ilhaAtual = player.classe === 'marinheiro' ? 'starter_marinheiro' : 'starter_pirata';
}
if (player.combate === undefined) player.combate = null;
return player;
}

// Envia a mensagem de chegada numa ilha: se ela tiver `imagem` cadastrada,
// manda foto (+ botões via interactiveButtons quando isBotoes estiver
// ativo); senão cai pro texto puro — mesmo padrão do enviarMsgFruta.
async function enviarMsgIlha(ctx, ilhaKey, texto, botoes) {
const { kiimorizinha, from, selo, isBotoes, sendInteractiveMessage, EnviaBtnReply, reply } = ctx;
const imagem = ISLANDS[ilhaKey]?.imagem;
const temBotoes = isBotoes && Array.isArray(botoes) && botoes.length;

if (imagem) {
if (temBotoes) {
const payload = {
text: texto,
image: { url: imagem },
interactiveButtons: botoes.map(b => ({
name: 'quick_reply',
buttonParamsJson: JSON.stringify({ display_text: b.display_text, id: b.id }),
})),
};
return sendInteractiveMessage(kiimorizinha, from, payload, {});
}
return kiimorizinha.sendMessage(from, { image: { url: imagem }, caption: texto }, { quoted: selo });
}

if (temBotoes) return EnviaBtnReply(kiimorizinha, from, texto, botoes);
return reply(texto);
}

module.exports = {
ISLANDS,
listaIlhasOrdenadas,
ilhaLiberada,
encontrarAlvo,
ensureIlhaFields,
enviarMsgIlha,
};
