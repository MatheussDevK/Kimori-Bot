import { loadRpgDB, saveRpgDB, getPlayer, ensureAllFields } from '../../arquivos/funcoes/rpg/core.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'recusarduelo',
category: 'rpg',
description: 'Recusa um desafio de duelo pendente.',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureAllFields(player);

if (!player.desafioDe) {
saveRpgDB(db);
return responder(ctx, `*ᴠᴏᴄᴇ̂ ɴᴀᴏ ᴛᴇᴍ ɴᴇɴʜᴜᴍ ᴅᴇsᴀғɪᴏ ᴘᴇɴᴅᴇɴᴛᴇ*`, null);
}

player.desafioDe = null;
saveRpgDB(db);

await responder(ctx, `*🏳️ ᴅᴜᴇʟᴏ ʀᴇᴄᴜsᴀᴅᴏ*`, null);
},
};
