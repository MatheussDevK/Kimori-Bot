import fs from 'node:fs';

export default {
name: 'tirardalistag',
category: 'dono',
description: 'Remove um número da lista negra global do bot, apenas dono.',
async execute(ctx) {
const {
reply, mess, SoDono, menc_os2, q, listanegraG, nescessario,
kiimorizinha, from, selo, ChannelContextNewsLetter,
} = ctx;

if (!SoDono) return reply(mess.onlyOwner());
const numero = menc_os2 ? menc_os2.split('@')[0] : q ? q.replace(/\D/g, '') : '';
if (!numero) return reply('*💫 ɪɴꜰᴏʀᴍᴇ ᴏ ɴᴜ́ᴍᴇʀᴏ ǫᴜᴇ ǫᴜᴇʀ ʀᴇᴍᴏᴠᴇʀ ᴅᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ *');
// marcado: usa o JID real; digitado: telefone (antes virava "telefone@lid", um JID que não existe)
const jid = menc_os2 ? String(menc_os2).replace(/:\d+(?=@)/, '') : (numero.length >= 14 ? `${numero}@lid` : `${numero}@s.whatsapp.net`);
const mesmo = (x) => String(x).split('@')[0] === numero;
if (!listanegraG.some(mesmo))
return reply('*❌ ᴇꜱꜱᴇ ɴᴜ́ᴍᴇʀᴏ ɴᴀ̃ᴏ ᴇꜱᴛᴀ́ ɴᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ*');
listanegraG.splice(listanegraG.findIndex(mesmo), 1);
fs.writeFileSync('./config-bot/nescessario.json', JSON.stringify(nescessario, null, '\t'));
await kiimorizinha.sendMessage(from, {
text: `*@${numero} ꜰᴏɪ ʀᴇᴍᴏᴠɪᴅᴏ ᴅᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ ✅*`,
contextInfo:{...ChannelContextNewsLetter, mentionedJid: [jid]}}, {quoted: selo})
},
};
