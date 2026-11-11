import { normalizeJid } from '../../arquivos/funcoes/functions.js';
import { loadRpgDB, saveRpgDB, getPlayer, ensureAllFields } from '../../arquivos/funcoes/rpg/core.js';
import { loadBandos, saveBandos, getBando, getBandoDoJogador, MEMBROS_MAX } from '../../arquivos/funcoes/rpg/bando.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'convidarbando',
category: 'rpg',
description: 'Convida um usuário mencionado pro seu bando (só o capitão pode convidar).',
async execute(ctx) {
const { q, prefix, sender, info } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureAllFields(player);

const bandos = loadBandos();
const bando = getBando(bandos, player.bandoId);
if (!bando) {
saveRpgDB(db);
return responder(ctx, `*ᴠᴏᴄᴇ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ʙᴀɴᴅᴏ*\n\n> Use ${prefix}criarbando <nome> pra fundar um.`,
[{ display_text: '⛵ Criar Bando', id: `${prefix}criarbando` }]);
}
if (bando.capitao !== sender) {
saveRpgDB(db);
return responder(ctx, `*sᴏ́ ᴏ ᴄᴀᴘɪᴛᴀ̃ᴏ ᴅᴏ ʙᴀɴᴅᴏ ᴘᴏᴅᴇ ᴄᴏɴᴠɪᴅᴀʀ*`, null);
}
if (bando.membros.length >= MEMBROS_MAX) {
saveRpgDB(db);
return responder(ctx, `*ᴏ ʙᴀɴᴅᴏ ᴊᴀ́ ᴇsᴛᴀ́ ᴄʜᴇɪᴏ* (máx. ${MEMBROS_MAX} membros)`, null);
}

const ctxParticipant = info?.message?.extendedTextMessage?.contextInfo?.participant
|| info?.message?.stickerMessage?.contextInfo?.participant || null;
const mencJid = info?.message?.extendedTextMessage?.contextInfo?.mentionedJid
|| info?.message?.stickerMessage?.contextInfo?.mentionedJid || [];
const alvo = (q || '').includes('@')
? (mencJid.length > 0 ? normalizeJid(mencJid[0]) : null)
: (ctxParticipant ? normalizeJid(ctxParticipant) : null);

if (!alvo) {
saveRpgDB(db);
return responder(ctx, `*ᴍᴇɴᴄɪᴏɴᴇ ǫᴜᴇᴍ ᴠᴏᴄᴇ̂ ǫᴜᴇʀ ᴄᴏɴᴠɪᴅᴀʀ*\n\n> Use ${prefix}convidarbando @user`, null);
}
if (alvo === sender) {
saveRpgDB(db);
return responder(ctx, `*ᴠᴏᴄᴇ̂ ᴊᴀ́ ᴇsᴛᴀ́ ɴᴏ ᴘʀᴏ́ᴘʀɪᴏ ʙᴀɴᴅᴏ*`, null);
}

const alvoPlayer = getPlayer(db, alvo);
if (!alvoPlayer) {
saveRpgDB(db);
return responder(ctx, `*ᴇssᴀ ᴘᴇssᴏᴀ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ ɴᴏ ᴍᴇɴᴜʀᴘɢ*`, null);
}
if (getBandoDoJogador(bandos, alvo)) {
saveRpgDB(db);
return responder(ctx, `*ᴇssᴀ ᴘᴇssᴏᴀ ᴊᴀ́ ᴇsᴛᴀ́ ᴇᴍ ᴜᴍ ʙᴀɴᴅᴏ*`, null);
}
if (bando.convites.includes(alvo)) {
saveRpgDB(db);
return responder(ctx, `*ᴇssᴀ ᴘᴇssᴏᴀ ᴊᴀ́ ᴛᴇᴍ ᴜᴍ ᴄᴏɴᴠɪᴛᴇ ᴘᴇɴᴅᴇɴᴛᴇ*`, null);
}

bando.convites.push(alvo);
saveBandos(bandos);
saveRpgDB(db);

await responder(ctx,
`*✉️ ᴄᴏɴᴠɪᴛᴇ ᴇɴᴠɪᴀᴅᴏ!*\n\n@${alvo.split('@')[0]} foi convidado(a) pro bando *${bando.nome}*.\n\n> A pessoa aceita com ${prefix}entrarbando ${bando.id}`,
[{ display_text: '⛵ Ver Bando', id: `${prefix}bando` }]);
},
};
