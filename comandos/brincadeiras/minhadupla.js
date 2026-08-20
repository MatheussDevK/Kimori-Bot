const fs = require('fs');
const { imgperfil } = require('../../config-bot/logos/links_img.json');

module.exports = {
name: 'minhadupla',
aliases: ['dupla'],
category: 'brincadeiras',
description: 'Mostra o seu par e há quanto tempo vocês estão juntos.',
async execute(ctx) {
const { reply, reagir, mess, isGroup, sender, from, namoro1, msToTime, kiimorizinha, selo, ChannelContextNewsLetter } = ctx;

if (!isGroup) return reply(mess.onlyGroup());

const userNum = sender.split('@')[0];
const dupla = namoro1.find(i => i.usu1 === sender || i.usu1 === userNum || i.usu2 === sender || i.usu2 === userNum);
if (!dupla) return reply('*ᴠᴏᴄᴇ ɴᴀᴏ ᴇsᴛᴀ ɴᴀᴍᴏʀᴀɴᴅᴏ ɴɪɴɢᴜᴇᴍ.. *');
if (!dupla.namorados) return reply('*sᴇᴜ ᴘᴇᴅɪᴅᴏ ᴀɪɴᴅᴀ ɴᴀᴏ ғᴏɪ ᴀᴄᴇɪᴛᴏ.. *');

await reagir(from, "❤️‍🩹");

const parceiro1 = dupla.usu1.includes('@') ? dupla.usu1 : `${dupla.usu1}@lid`;
const parceiro2 = dupla.usu2.includes('@') ? dupla.usu2 : `${dupla.usu2}@lid`;

if (!dupla.inicio) {
dupla.inicio = Date.now();
fs.writeFileSync('./database/func/namoro1.json', JSON.stringify(namoro1));
}

const tempoJuntos = msToTime(Date.now() - dupla.inicio);
const texto = mess.minhaDupla(parceiro1, parceiro2, tempoJuntos, dupla);

try {
const ppimg = await kiimorizinha.profilePictureUrl(parceiro2, 'image');
await kiimorizinha.sendMessage(from, {
image: { url: ppimg },
caption: texto,
mentions: [parceiro1, parceiro2],
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [parceiro1, parceiro2] }
}, { quoted: selo });
} catch {
await kiimorizinha.sendMessage(from, {
image: { url: imgperfil },
caption: texto,
mentions: [parceiro1, parceiro2],
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [parceiro1, parceiro2] }
}, { quoted: selo });
}
},
};
