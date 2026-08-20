const fs = require('fs');
const forca = require('../../database/data/media/forca/index.js');

module.exports = {
name: 'forca',
category: 'brincadeiras',
description: 'Inicia uma partida do jogo da forca no grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, isModobn, prefix, command, from,
palavras, frames, ErroCase, botNome: NomeDoBot,
} = ctx;

try {
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
const pathF = `./database/data/media/forca/database/session-${from}.json`;
if (fs.existsSync(pathF)) {
return reply('*ᴏ ᴊᴏɢᴏ ᴊᴀ ғᴏɪ ɪɴɪᴄɪᴀᴅᴏ ᴀɴᴛᴇs*');}
const word = palavras[Math.floor(Math.random() * palavras.length)];
const params = {
palavra: word.palavra,
tema: word.tema,
dica: word.dica,
path: './database/data/media/forca/database',};
const data = forca.startSession(from, params);
reply(`• 🎮 𝐉𝐎𝐆𝐎--𝐃𝐀-𝐅𝐎𝐑𝐂𝐀 🌠 •
*₊˚‧ʟᴇᴛʀᴀs*: ${data.palavra.length}
*₊˚‧ᴛᴇᴍᴀ*: ${word.tema}
*₊˚‧ᴅɪᴄᴀ*: ${word.dica}
|───𖡜̸｡᭭
 _¦_
 ╚ ${frames[data.erros]}
 
 
₊˚‧︵₊୨ᰔ୧₊︵‧˚ꔫ˚‧︵₊୧ᰔ୨₊︵‧˚₊
 
 『 ${data.letrasX.join('')} 』
 
₊˚‧︵₊୨ᰔ୧₊︵‧˚ꔫ˚‧︵₊୧ᰔ୨₊︵‧˚₊
 ₊˚‧ʟᴇᴛʀᴀs ᴊᴏɢᴀᴅᴀs: ${data.usado.join(', ')}
 
 > ᴜsᴇ ᴏ ${prefix}ғᴄ ᴘᴀʀᴀ ᴀᴅᴠɪɴʜᴀʀ ᴀ ʟᴇᴛʀᴀ ᴏᴜ ᴀ ᴘᴀʟᴀᴠʀᴀ ᴛᴏᴅᴀ`);
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
