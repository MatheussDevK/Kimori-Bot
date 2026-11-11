export default {
name: 'delremover',
aliases: ['delautorm', 'delautoban', 'tirardalista'],
category: 'admin',
description: 'Remove um número da lista negra local do grupo (auto-remove/auto-ban).',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, SoDono, isBotGroupAdmins,
menc_os2, q, dataGp, setGp, kiimorizinha, from, selo, ChannelContextNewsLetter,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
const numero = menc_os2 ? menc_os2.split('@')[0] : q ? q.replace(/\D/g, '') : '';
if (!numero) return reply('*💫 ɪɴꜰᴏʀᴍᴇ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴏ ɴᴜ́ᴍᴇʀᴏ ǫᴜᴇ ᴅᴇꜱᴇᴊᴀ ʀᴇᴍᴏᴠᴇʀ ᴅᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ *');
// marcado: usa o JID real; digitado: telefone (antes virava "telefone@lid", um JID que não existe)
const jid = menc_os2 ? String(menc_os2).replace(/:\d+(?=@)/, '') : (numero.length >= 14 ? `${numero}@lid` : `${numero}@s.whatsapp.net`);
const mesmo = (x) => String(x).split('@')[0] === numero;
if (!Array.isArray(dataGp[0].listanegra)) dataGp[0].listanegra = [];
if (!dataGp[0].listanegra.some(mesmo))
return reply('*❌ ᴇꜱꜱᴇ ɴᴜ́ᴍᴇʀᴏ ɴᴀ̃ᴏ ᴇꜱᴛᴀ́ ɴᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ*');
dataGp[0].listanegra.splice(dataGp[0].listanegra.findIndex(mesmo), 1);
setGp(dataGp);
await kiimorizinha.sendMessage(from, {
text: `*@${numero} ꜰᴏɪ ʀᴇᴍᴏᴠɪᴅᴏ ᴅᴀ ʟɪꜱᴛᴀ ᴅᴇ ᴀᴜᴛᴏʙᴀɴ ✅*`,
contextInfo:{...ChannelContextNewsLetter, mentionedJid: [jid]}}, {quoted: selo})
},
};
