import fs from 'node:fs';

export default {
name: 'autobang',
aliases: ['listanegrag'],
category: 'dono',
description: 'Adiciona um número na lista negra global do bot, apenas dono.',
async execute(ctx) {
const {
reply, mess, SoDono, menc_os2, q, listanegraG, nescessario,
kiimorizinha, from, selo,
} = ctx;

if (!SoDono) return reply(mess.onlyOwner());
const numero = menc_os2 ? menc_os2.split('@')[0] : q ? q.replace(/\D/g, '') : '';
if (!numero) return reply('*💫 ᴍᴀʀǫᴜᴇ ᴏᴜ ᴅɪɢɪᴛᴇ ᴏ ɴᴜ́ᴍᴇʀᴏ ǫᴜᴇ ᴅᴇꜱᴇᴊᴀ ᴀᴅɪᴄɪᴏɴᴀʀ ɴᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ *');
// marcado: usa o JID real; digitado: telefone (antes virava "telefone@lid", um JID que não existe)
const jid = menc_os2 ? String(menc_os2).replace(/:\d+(?=@)/, '') : (numero.length >= 14 ? `${numero}@lid` : `${numero}@s.whatsapp.net`);
const mesmo = (x) => String(x).split('@')[0] === numero;
if (listanegraG.some(mesmo))
return reply('*❌ ᴇꜱꜱᴇ ɴᴜ́ᴍᴇʀᴏ ᴊᴀ́ ᴇꜱᴛᴀ́ ɴᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ*');
listanegraG.push(jid);
fs.writeFileSync('./config-bot/nescessario.json', JSON.stringify(nescessario, null, '\t'));
await kiimorizinha.sendMessage(from, {
text: `*@${numero} ꜰᴏɪ ᴀᴅɪᴄɪᴏɴᴀᴅᴏ ᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ ✅*`,
mentions: [jid]
}, { quoted: selo });
},
};
