module.exports = {
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
if (!isBotGroupAdmins) return reply(mess.botAdmin());
const numero = menc_os2 ? menc_os2.split('@')[0] : q ? q.replace(/\D/g, '') : '';
if (!numero) return reply('*💫 ɪɴꜰᴏʀᴍᴇ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴏ ɴᴜ́ᴍᴇʀᴏ ǫᴜᴇ ᴅᴇꜱᴇᴊᴀ ʀᴇᴍᴏᴠᴇʀ ᴅᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ *');
const jid = `${numero}@lid`;
if (!dataGp[0].listanegra.includes(jid))
return reply('*❌ ᴇꜱꜱᴇ ɴᴜ́ᴍᴇʀᴏ ɴᴀ̃ᴏ ᴇꜱᴛᴀ́ ɴᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ*');
dataGp[0].listanegra.splice(dataGp[0].listanegra.indexOf(jid), 1);
setGp(dataGp);
await kiimorizinha.sendMessage(from, {
text: `*@${numero} ꜰᴏɪ ʀᴇᴍᴏᴠɪᴅᴏ ᴅᴀ ʟɪꜱᴛᴀ ᴅᴇ ᴀᴜᴛᴏʙᴀɴ ✅*`,
contextInfo:{...ChannelContextNewsLetter, mentionedJid: [jid]}}, {quoted: selo})
},
};
