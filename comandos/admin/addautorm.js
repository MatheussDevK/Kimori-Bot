export default {
name: 'addautorm',
aliases: ['addautoban', 'listanegra'],
category: 'admin',
description: 'Adiciona um número na lista negra local do grupo (auto-remove/auto-ban).',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, SoDono, isBotGroupAdmins,
menc_os2, q, dataGp, setGp, kiimorizinha, from, selo, ChannelContextNewsLetter,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
const numero = menc_os2 ? menc_os2.split('@')[0] : q ? q.replace(/\D/g, '') : '';
if (!numero) return reply('*💫 ᴍᴀʀǫᴜᴇ ᴜᴍᴀ ᴍᴇɴꜱᴀɢᴇᴍ ᴏᴜ ᴅɪɢɪᴛᴇ ᴏ ɴᴜ́ᴍᴇʀᴏ ǫᴜᴇ ᴅᴇꜱᴇᴊᴀ ᴀᴅɪᴄɪᴏɴᴀʀ ɴᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ *');
// marcado: usa o JID real; digitado: telefone (antes virava "telefone@lid", um JID que não existe)
const jid = menc_os2 ? String(menc_os2).replace(/:\d+(?=@)/, '') : (numero.length >= 14 ? `${numero}@lid` : `${numero}@s.whatsapp.net`);
const mesmo = (x) => String(x).split('@')[0] === numero;
if (!Array.isArray(dataGp[0].listanegra)) dataGp[0].listanegra = [];
if (dataGp[0].listanegra.some(mesmo))
return reply('*❌ ᴇꜱꜱᴇ ɴᴜ́ᴍᴇʀᴏ ᴊᴀ́ ᴇꜱᴛᴀ́ ɴᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ*');
dataGp[0].listanegra.push(jid);
setGp(dataGp);
await kiimorizinha.sendMessage(from, {
text: `*@${numero} ꜰᴏɪ ᴀᴅɪᴄɪᴏɴᴀᴅᴏ ᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ᴅᴇ ᴀᴜᴛᴏʙᴀɴ ✅*`,
contextInfo:{...ChannelContextNewsLetter, mentionedJid: [jid]}}, {quoted: selo})
},
};
