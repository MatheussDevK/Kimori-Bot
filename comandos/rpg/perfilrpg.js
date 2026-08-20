const { CLASSES, loadRpgDB, saveRpgDB, getPlayer, ensureRaceFields } = require('../../arquivos/funcoes/rpg/core.js');
const { RACAS } = require('../../arquivos/funcoes/rpg/racas.js');
const { NIVEL_MAX, xpParaProximoNivel } = require('../../arquivos/funcoes/rpg/xp.js');
const { ISLANDS, ensureIlhaFields } = require('../../arquivos/funcoes/rpg/ilhas.js');
const { responder } = require('../../arquivos/funcoes/rpg/frutas.js');

module.exports = {
name: 'perfilrpg',
category: 'rpg',
description: 'Mostra o perfil do seu personagem no MenuRpg.',
async execute(ctx) {
const { sender, prefix } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);

if (!player) {
return responder(ctx,
`*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]
);
}
ensureRaceFields(player);
ensureIlhaFields(player);
saveRpgDB(db);

const classe = CLASSES[player.classe] || { nome: player.classe, emoji: '❓' };
const raca = RACAS[player.raca] || { nome: player.raca, emoji: '❓' };
const ilha = ISLANDS[player.ilhaAtual];
const criadoEm = new Date(player.criadoEm).toLocaleDateString('pt-BR');
const xpNecessario = player.nivel >= NIVEL_MAX ? 0 : xpParaProximoNivel(player.nivel);

const texto =
`*⛵『 𝗣𝗲𝗿𝗳𝗶𝗹 ${classe.emoji} 』⛵*\n\n` +
`👤 *Nome:* ${player.nome}\n` +
`${classe.emoji} *Tripulação:* ${classe.nome}\n` +
`${raca.emoji} *Raça:* ${raca.nome}\n` +
`⭐ *Nível:* ${player.nivel}/${NIVEL_MAX}\n` +
`✨ *XP:* ${player.nivel >= NIVEL_MAX ? 'MÁXIMO' : `${player.xp}/${xpNecessario}`}\n` +
`💰 *Berries:* ${player.berries}\n` +
`💎 *Fragmentos:* ${player.fragmentos}\n` +
`${ilha?.emoji || '📍'} *Ilha atual:* ${ilha?.nome || player.ilhaAtual}\n` +
`📅 *Personagem criado em:* ${criadoEm}`;

await responder(ctx, texto, [
{ display_text: '🗺️ Ver Mapa', id: `${prefix}ilhas` },
{ display_text: '🎲 Reroll Race (💎3.000)', id: `${prefix}rerollraca` },
{ display_text: '🌾 Meus Frutos', id: `${prefix}meusfrutos` },
]);
},
};
