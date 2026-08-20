const fs = require('fs');

module.exports = {
name: 'terminar',
aliases: ['terminar_namoro'],
category: 'brincadeiras',
description: 'Termina o seu namoro atual.',
async execute(ctx) {
const { reply, sender, namoro1, kiimorizinha, selo, ChannelContextNewsLetter } = ctx;

if (!JSON.stringify(namoro1).includes(sender))
return reply(`*ᴠᴏᴄᴇ ɴᴀᴏ ᴇꜱᴛᴀ ɴᴀᴍᴏʀᴀɴᴅᴏ ᴄᴏᴍ ɴɪɴɢᴜᴇᴍ...*`);

let D1 = namoro1.map(i => i.usu1).indexOf(sender);
if (D1 === -1) D1 = namoro1.map(i => i.usu2).indexOf(sender);
if (D1 === -1)
return reply(`*ɴᴀᴏ ᴇɴᴄᴏɴᴛʀᴇɪ ᴏ ꜱᴇᴜ ʀᴇʟᴀᴄɪᴏɴᴀᴍᴇɴᴛᴏ. ᴛᴇɴᴛᴇ ᴅᴇ ɴᴏᴠᴏ *`);

const parceiro = namoro1[D1].usu1 === sender ? namoro1[D1].usu2 : namoro1[D1].usu1;
const jidParceiro = parceiro.includes('@lid') ? parceiro : `${parceiro}@lid`;

const D2 = namoro1.map(a => a.usu1).indexOf(jidParceiro);
if (D2 !== -1) { namoro1[D2].namorados = false; namoro1.splice(D2, 1); }

await reply(`*ᴏ ɴᴀᴍᴏʀᴏ ꜰᴏɪ ᴅᴇꜱᴛʀᴜɪ́ᴅᴏ... ᴠᴏᴄᴇ ᴀɢᴏʀᴀ ᴇꜱᴛᴀ ꜱᴏʟᴛᴇɪʀᴏ ᴅᴇ ɴᴏᴠᴏ!*`);
await kiimorizinha.sendMessage(jidParceiro, {
text: `*💔 ᴛᴇɴʜᴏ ᴜᴍᴀ ɴᴏᴛɪ́ᴄɪᴀ ᴛʀɪꜱᴛᴇ... ꜱᴇᴜ ᴘᴀʀᴄᴇɪʀᴏ(ᴀ) ᴀᴄᴀʙᴏᴜ ᴅᴇ ᴛᴇʀᴍɪɴᴀʀ ᴏ ɴᴀᴍᴏʀᴏ...😔*\n> *ɢᴜᴀʀᴅᴇ ᴏꜱ ʙᴏɴꜱ ᴍᴏᴍᴇɴᴛᴏꜱ, ᴍᴇꜱᴍᴏ ǫᴜᴇ ᴅᴏᴀ...*`,
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [sender, jidParceiro] }
}, { quoted: selo });

namoro1.splice(D1, 1);
fs.writeFileSync('./database/func/namoro1.json', JSON.stringify(namoro1));
},
};
