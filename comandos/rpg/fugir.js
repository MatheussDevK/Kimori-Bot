import { loadRpgDB, saveRpgDB, getPlayer } from '../../arquivos/funcoes/rpg/core.js';
import { ensureIlhaFields } from '../../arquivos/funcoes/rpg/ilhas.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'fugir',
category: 'rpg',
description: 'Foge do combate em andamento, sem perder nada.',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureIlhaFields(player);

if (!player.combate) {
saveRpgDB(db);
return responder(ctx, `*ᴠᴏᴄᴇ ɴᴀᴏ ᴇsᴛᴀ́ ᴇᴍ ᴄᴏᴍʙᴀᴛᴇ*`,
[{ display_text: '📍 Ver Ilha', id: `${prefix}viajar ${player.ilhaAtual}` }]);
}

const nomeAlvo = player.combate.alvoNome;
player.combate = null;
saveRpgDB(db);

await responder(ctx, `*🏃 ᴠᴏᴄᴇ́ ғᴜɢɪᴜ ᴅᴇ ${nomeAlvo}*`,
[{ display_text: '📍 Ver Ilha', id: `${prefix}viajar ${player.ilhaAtual}` }]);
},
};
