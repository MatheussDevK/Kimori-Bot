const fs = require('fs');
const { getRandom, getExtension } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'index-bot',
category: 'dono',
description: 'Substitui o kimori.js inteiro pelo documento citado, apenas dono.',
async execute(ctx) {
const {
reply, mess, SoDono, isMedia, info, isQuotedDocument, getFileBuffer,
kiimorizinha, from, selo,
} = ctx;

if(!SoDono)return reply(mess.onlyOwner())
if(isMedia && !info.message.videoMessage || isQuotedDocument) {
const media = isQuotedDocument ? info.message.extendedTextMessage.contextInfo.quotedMessage.documentMessage : info.message.documentMessage
const rane = getRandom('.'+await getExtension(media.mimetype))
const doc = await getFileBuffer(media, 'document')
fs.writeFileSync('./kimori.js', doc)
await kiimorizinha.sendMessage(from, {text: "*ᴀ ɪɴᴅᴇx ғᴏɪ ᴀᴛᴜᴀʟɪᴢᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ ✅*"}, {quoted: selo})
} else {
reply('*ᴍᴀʀǫᴜᴇ ᴏ ᴅᴏᴄᴜᴍᴇɴᴛᴏ ǫᴜᴇ ᴠᴏᴄᴇ ɪʀᴀ ᴍᴜᴅᴀʀ.. *')
}
},
};
