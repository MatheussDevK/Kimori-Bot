const { FiguMp4OuGif } = require('../../arquivos/funcoes/togif.js');

module.exports = {
name: 'togif',
category: 'alteradores',
description: 'Converte uma figurinha animada citada em vídeo/gif.',
async execute(ctx) {
const {
reply, mess, isQuotedSticker, isMedia, info, q,
getFileBuffer, fs, kiimorizinha, from, selo, DLT_FL,
} = ctx;

if(!isQuotedSticker) return reply('Por favor, atribua uma figurinha animada à mensagem para realizar a conversão para vídeo/gif.');
try {
if((isMedia && !info.message.videoMessage || isQuotedSticker) && !q.length <= 1) {
const getBufferWebP = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, "sticker");
fs.writeFileSync("./database/data/media/sticker/convert.webp", getBufferWebP);
const outputFile = "./database/data/media/sticker/convert.webp";
const convertWebP = await FiguMp4OuGif(outputFile);
await kiimorizinha.sendMessage(from, {video: {url: convertWebP}, gifPlayback: true, fileName: 'sticker-sb.gif'}, {quoted: selo}).catch(async(error) => {
await reply(mess.error());
await DLT_FL(outputFile);
console.log(error)
});
}
} catch(error) {
await reply(mess.error());
console.log(error)
};
},
};
