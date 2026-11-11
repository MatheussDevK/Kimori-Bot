import { loadRpgDB, saveRpgDB, getPlayer, ensureAllFields } from '../../arquivos/funcoes/rpg/core.js';
import { CLASSES } from '../../arquivos/funcoes/rpg/core.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'recompensa',
category: 'rpg',
description: 'Mostra seu cartaz de procurado: recompensa acumulada e sua posição no ranking.',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureAllFields(player);
saveRpgDB(db);

const ranking = [...db].filter(p => (p.recompensa || 0) > 0).sort((a, b) => (b.recompensa || 0) - (a.recompensa || 0));
const posicao = ranking.findIndex(p => p.jid === sender) + 1;
const classe = CLASSES[player.classe] || { nome: player.classe, emoji: '❓' };

const texto =
`*☠️『 𝗖𝗮𝗿𝘁𝗮𝘇 𝗱𝗲 𝗣𝗿𝗼𝗰𝘂𝗿𝗮𝗱𝗼 』☠️*\n\n` +
`${classe.emoji} *${player.nome}*\n` +
`💰 Recompensa: *฿ ${(player.recompensa || 0).toLocaleString('pt-BR')}*\n` +
`🏆 Posição no ranking: ${posicao > 0 ? `#${posicao}` : '— (ainda sem recompensa)'}\n` +
`⚔️ Vitórias em duelo: ${player.vitoriasPvp || 0}\n💀 Derrotas em duelo: ${player.derrotasPvp || 0}\n\n` +
`> A recompensa sobe quando você derrota chefes de ilha e vence duelos contra outros jogadores.`;

await responder(ctx, texto, [
{ display_text: '🏆 Ranking Geral', id: `${prefix}rankrecompensa` },
{ display_text: '⚔️ Duelar', id: `${prefix}duelar` },
]);
},
};
