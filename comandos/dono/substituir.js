const fs = require('fs');
const { getRandom, getExtension } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'substituir',
category: 'dono',
description: 'Substitui um arquivo do diretório do bot pelo documento citado, apenas dono.',
async execute(ctx) {
const {
reply, mess, SoDono, isMedia, info, isQuotedDocument, getFileBuffer,
q, kiimorizinha, from, selo,
} = ctx;

if (!SoDono) return reply(mess.onlyOwner());

if (isMedia && !info.message.videoMessage || isQuotedDocument) {
const media = isQuotedDocument
? info.message.extendedTextMessage.contextInfo.quotedMessage.documentMessage
: info.message.documentMessage;

const rane = getRandom('.' + await getExtension(media.mimetype));
const doc = await getFileBuffer(media, 'document');

fs.writeFileSync(q, doc);

await kiimorizinha.sendMessage(from, {
text: '*🌟 ᴀʀǫᴜɪᴠᴏ ᴀᴛᴜᴀʟɪᴢᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ᴅɪʀᴇᴛᴏʀɪᴏ:* ' + q
}, { quoted: selo });

} else {
reply('*ᴍᴀʀǫᴜᴇ ᴜᴍ ᴅᴏᴄᴜᴍᴇɴᴛᴏ ᴏᴜ ᴀʀǫᴜɪᴠᴏ ǫᴜᴇ ꜱᴇʀᴀ́ ꜱᴜʙꜱᴛɪᴛᴜɪ́ᴅᴏ...* ');
}
},
};
