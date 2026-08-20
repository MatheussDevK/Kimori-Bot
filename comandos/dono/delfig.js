const { removerFigSticker } = require('../../arquivos/funcoes/command.js');

module.exports = {
name: 'delfig',
category: 'dono',
description: 'Remove a associação de comando de uma figurinha citada, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, info, getFileBuffer } = ctx;

if (!SoDono) return reply(mess.onlyOwner());
if (!info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage)
return reply('*ᴍᴇɴᴄɪᴏɴᴇ ᴜᴍᴀ ꜰɪɢᴜʀɪɴʜᴀ *');
const buffer = await getFileBuffer(
info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage,
'sticker');
const idSticker = info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64');
const sucesso = removerFigSticker(idSticker);
if (sucesso) {
reply('*ꜰɪɢᴜʀɪɴʜᴀ ʀᴇᴍᴏᴠɪᴅᴀ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ *');
} else {
reply('*ᴇꜱꜱᴀ ꜰɪɢᴜʀɪɴʜᴀ ɴᴀ̃ᴏ ᴇꜱᴛᴀ́ ʀᴇɢɪꜱᴛʀᴀᴅᴀ*');}
},
};
