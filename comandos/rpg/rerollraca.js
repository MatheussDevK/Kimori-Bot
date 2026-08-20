const { loadRpgDB, saveRpgDB, getPlayer, ensureRaceFields } = require('../../arquivos/funcoes/rpg/core.js');
const { RACAS, racasObtenveis } = require('../../arquivos/funcoes/rpg/racas.js');
const { responder } = require('../../arquivos/funcoes/rpg/frutas.js');

const CUSTO_REROLL = 3000;

module.exports = {
name: 'rerollraca',
category: 'rpg',
description: 'Sorteia uma nova raça pro seu personagem, gastando 3.000 Fragmentos.',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx,
`*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]
);
}
ensureRaceFields(player);

if (player.fragmentos < CUSTO_REROLL) {
saveRpgDB(db);
return responder(ctx,
`*💎 ғʀᴀɢᴍᴇɴᴛᴏs ɪɴsᴜғɪᴄɪᴇɴᴛᴇs*\n\n` +
`Custo do reroll: *${CUSTO_REROLL}*\n` +
`Você tem: *${player.fragmentos}*`,
[{ display_text: '👤 Ver Perfil', id: `${prefix}perfilrpg` }]
);
}

// sorteia entre as raças obteníveis, evitando repetir a atual (a menos
// que só exista uma raça disponível no momento)
const opcoes = racasObtenveis().filter(r => r !== player.raca);
const novaRaca = opcoes.length ? opcoes[Math.floor(Math.random() * opcoes.length)] : player.raca;
const racaAntiga = player.raca;

player.fragmentos -= CUSTO_REROLL;
player.raca = novaRaca;
saveRpgDB(db);

const antiga = RACAS[racaAntiga] || { nome: racaAntiga, emoji: '❓' };
const nova = RACAS[novaRaca];

await responder(ctx,
`*🎲 ʀᴇʀᴏʟʟ ʀᴇᴀʟɪᴢᴀᴅᴏ!*\n\n` +
`${antiga.emoji} ${antiga.nome} ➜ ${nova.emoji} *${nova.nome}*\n\n` +
`_${nova.descricao}_\n\n` +
`💎 Fragmentos restantes: *${player.fragmentos}*`,
[{ display_text: '👤 Ver Perfil', id: `${prefix}perfilrpg` }]
);
},
};
