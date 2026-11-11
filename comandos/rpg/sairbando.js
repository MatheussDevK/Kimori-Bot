import { loadRpgDB, saveRpgDB, getPlayer, ensureAllFields } from '../../arquivos/funcoes/rpg/core.js';
import { loadBandos, saveBandos, getBando, getBandoDoJogador } from '../../arquivos/funcoes/rpg/bando.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'sairbando',
category: 'rpg',
description: 'Sai do bando atual (se for o capitão, o bando é dissolvido).',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureAllFields(player);

const bandos = loadBandos();
const bando = getBandoDoJogador(bandos, sender);
if (!bando) {
saveRpgDB(db);
return responder(ctx, `*ᴠᴏᴄᴇ ɴᴀᴏ ᴇsᴛᴀ́ ᴇᴍ ɴᴇɴʜᴜᴍ ʙᴀɴᴅᴏ*`, null);
}

player.bandoId = null;

if (bando.capitao === sender) {
// capitão saiu -> dissolve o bando pra todo mundo
for (const jid of bando.membros) {
const membro = getPlayer(db, jid);
if (membro) membro.bandoId = null;
}
const bandosRestantes = bandos.filter(b => b.id !== bando.id);
saveBandos(bandosRestantes);
saveRpgDB(db);
return responder(ctx, `*⛵ ᴏ ʙᴀɴᴅᴏ "${bando.nome}" ғᴏɪ ᴅɪssᴏʟᴠɪᴅᴏ* (você era o capitão)`, null);
}

bando.membros = bando.membros.filter(j => j !== sender);
saveBandos(bandos);
saveRpgDB(db);

await responder(ctx, `*🏃 ᴠᴏᴄᴇ̂ sᴀɪᴜ ᴅᴏ ʙᴀɴᴅᴏ "${bando.nome}"*`, null);
},
};
