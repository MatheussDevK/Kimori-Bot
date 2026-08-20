const { registrarFigSticker } = require('../../arquivos/funcoes/command.js');

module.exports = {
name: 'rgfig',
category: 'dono',
description: 'Associa uma figurinha citada a um comando (gatilho customizado), apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, info, q } = ctx;

try {
if (!SoDono) return reply(mess.onlyOwner())
if (!info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage)
return reply('*ᴍᴇɴᴄɪᴏɴᴇ ᴜᴍᴀ ꜰɪɢᴜʀɪɴʜᴀ *')
if (!q) return reply('*ɪɴꜰᴏʀᴍᴇ ᴏ ᴄᴏᴍᴀɴᴅᴏ ǫᴜᴇ ᴅᴇꜱᴇᴊᴀ ᴀꜱꜱᴏᴄɪᴀʀ*')
const texto = q.trim()
let comandoFinal = ""
if (texto.includes("|")) {
const partes = texto.split("|").map(x => x.trim()).filter(Boolean)
comandoFinal = partes.join(" ")
} else if (texto.includes("/")) {
const partes = texto.split("/").map(x => x.trim()).filter(Boolean)
comandoFinal = partes.join(" ")
} else {
comandoFinal = texto}
comandoFinal = comandoFinal.replace(/\s+/g, " ").trim().toLowerCase()
const idSticker = info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
await registrarFigSticker(idSticker, comandoFinal)
reply(
`*ᴄᴇʀᴛᴏ ᴍᴇꜱᴛʀᴇ! ᴀᴄᴀʙᴇɪ ᴅᴇ ᴀᴅɪᴄɪᴏɴᴀʀ ᴇꜱꜱᴇ ᴄᴏᴍᴀɴᴅᴏ ᴇᴍ ᴍᴇᴜ ʙᴀɴᴄᴏ ᴅᴇ ᴅᴀᴅᴏꜱ *\n\n` +
`- *🕊️ | ᴄᴏᴍᴀɴᴅᴏ:* ${comandoFinal}\n` +
`- *✨ | ɪᴅ:* ${idSticker}`)
} catch (e) {
console.log(e)
reply(mess.error())}
},
};
