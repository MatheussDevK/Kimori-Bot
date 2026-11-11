import { loadRpgDB, saveRpgDB, getPlayer, ensureAllFields } from '../../arquivos/funcoes/rpg/core.js';
import { loadBandos, saveBandos, getBando, getBandoDoJogador, MEMBROS_MAX } from '../../arquivos/funcoes/rpg/bando.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'entrarbando',
category: 'rpg',
description: 'Aceita um convite pendente e entra no bando.',
async execute(ctx) {
const { q, prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureAllFields(player);

const bandos = loadBandos();
if (getBandoDoJogador(bandos, sender)) {
saveRpgDB(db);
return responder(ctx, `*ᴠᴏᴄᴇ ᴊᴀ́ ᴇsᴛᴀ́ ᴇᴍ ᴜᴍ ʙᴀɴᴅᴏ*\n\n> Use ${prefix}sairbando primeiro se quiser trocar.`,
[{ display_text: '⛵ Ver Bando', id: `${prefix}bando` }]);
}

const id = String(q || '').trim().toLowerCase();
const bando = getBando(bandos, id);
if (!bando || !bando.convites.includes(sender)) {
saveRpgDB(db);
return responder(ctx, `*ᴠᴏᴄᴇ ɴᴀᴏ ᴛᴇᴍ ᴄᴏɴᴠɪᴛᴇ ᴘᴇɴᴅᴇɴᴛᴇ ᴘʀᴀ ᴇssᴇ ʙᴀɴᴅᴏ*\n\n> Use *${prefix}entrarbando <id-do-bando>*`, null);
}
if (bando.membros.length >= MEMBROS_MAX) {
bando.convites = bando.convites.filter(j => j !== sender);
saveBandos(bandos);
saveRpgDB(db);
return responder(ctx, `*ᴏ ʙᴀɴᴅᴏ ᴇɴᴄʜᴇᴜ ᴀɴᴛᴇs ᴅᴇ ᴠᴏᴄᴇ̂ ᴇɴᴛʀᴀʀ*`, null);
}

bando.convites = bando.convites.filter(j => j !== sender);
bando.membros.push(sender);
player.bandoId = bando.id;
saveBandos(bandos);
saveRpgDB(db);

await responder(ctx,
`*⛵ ᴠᴏᴄᴇ̂ ᴇɴᴛʀᴏᴜ ɴᴏ ʙᴀɴᴅᴏ!*\n\n🏴‍☠️ *${bando.nome}*\n👥 Membros: ${bando.membros.length}/${MEMBROS_MAX}\n\n` +
`> Lute na mesma ilha que outro membro pra ganhar o bônus de bando em ${prefix}atacar.`,
[{ display_text: '⛵ Ver Bando', id: `${prefix}bando` }]);
},
};
