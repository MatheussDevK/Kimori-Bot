const fs = require('fs');
const forca = require('../../database/data/media/forca/index.js');

module.exports = {
name: 'fc',
category: 'brincadeiras',
description: 'Joga uma letra ou a palavra inteira na partida de forca em andamento.',
async execute(ctx) {
const {
reply, mess, isGroup, isModobn, prefix, command, from, q,
frames, DLT_FL, ErroCase, botNome: NomeDoBot,
} = ctx;

try {
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if (!fs.existsSync(`./database/data/media/forca/database/session-${from}.json`)) {
return reply(`*ᴏ ᴊᴏɢᴏ ᴀɪɴᴅᴀ ɴᴀᴏ ᴄᴏᴍᴇᴄᴏᴜ *

*ᴜsᴇ ${prefix}ғᴏʀᴄᴀ ᴘᴀʀᴀ ɪɴɪᴄɪᴀʀ ᴏ ᴊᴏɢᴏ *`);}
if (!q || q.length == 2 || !isNaN(q)) return reply("*ᴠᴏᴄᴇ sᴏ ᴘᴏᴅᴇ ᴜsᴀʀ ᴜᴍᴀ ᴘᴀʟᴀᴠʀᴀ ᴏᴜ ᴀ ғʀᴀsᴇ ᴛᴏᴅᴀ *");
const pathF = `./database/data/media/forca/database/session-${from}.json`;
const database = JSON.parse(fs.readFileSync(pathF));
const q_ToLC = q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
if (database.usado.includes(q_ToLC)) return reply('*ᴇsᴛᴀ ʟᴇᴛʀᴀ ᴊᴀ ғᴏɪ ᴜsᴀᴅᴀ, ᴛᴇʙᴛᴇ ᴏᴜᴛʀᴀ ʟᴇᴛʀᴀ*');
const data = forca.verify(from, q_ToLC, './database/data/media/forca/database');
if (data.ended) {
if (data.win) {
reply('*ᴠᴏᴄᴇ ᴀᴄᴀʙᴀ ᴅᴇ ɢᴀɴʜᴀʀ ᴏ ɢᴀᴍᴇ*');
} else {
reply('*sɪɴᴛᴏ ᴍᴜɪᴛᴏ ᴍᴀs ᴠᴏᴄᴇ ᴘᴇʀᴅᴇᴜ, ᴛᴇɴᴛᴇ ɴᴏᴠᴀᴍᴇɴᴛᴇ ɴᴀ ᴘʀᴏxɪᴍᴀ *');
}
DLT_FL(data.session);
} else {
if (data.letrasY.includes(q_ToLC)) {
reply('*ᴠᴏᴄᴇ ᴀᴄᴇʀᴛᴏᴜ ᴀ ʟᴇᴛʀᴀ *');
} else {
reply('*sɪɴᴛᴏ ᴍᴜɪᴛᴏ, ᴠᴏᴄᴇ ᴇʀʀᴏᴜ *');
}

reply(`• 🎮 𝐉𝐎𝐆𝐎--𝐃𝐀-𝐅𝐎𝐑𝐂𝐀 🌠 •
*₊˚‧ʟᴇᴛʀᴀs*: ${data.palavra.length}
*₊˚‧ᴛᴇᴍᴀ*: ${data.tema}
*₊˚‧ᴅɪᴄᴀ*: ${data.dica}
|───𖡜̸｡᭭
 _¦_
 ╚ ${frames[data.erros]}
 
 
₊˚‧︵₊୨ᰔ୧₊︵‧˚ꔫ˚‧︵₊୧ᰔ୨₊︵‧˚₊
 
 『 ${data.letrasX.join('')} 』
 
₊˚‧︵₊୨ᰔ୧₊︵‧˚ꔫ˚‧︵₊୧ᰔ୨₊︵‧˚₊
 ₊˚‧ʟᴇᴛʀᴀs ᴊᴏɢᴀᴅᴀs: ${data.usado.join(', ')}
 
 > ᴜsᴇ ᴏ ${prefix}ғᴄ ᴘᴀʀᴀ ᴀᴅᴠɪɴʜᴀʀ ᴀ ʟᴇᴛʀᴀ ᴏᴜ ᴀ ᴘᴀʟᴀᴠʀᴀ ᴛᴏᴅᴀ`);
}

} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
