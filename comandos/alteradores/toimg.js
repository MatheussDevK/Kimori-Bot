module.exports = {
name: 'toimg',
aliases: ['toimagem'],
category: 'alteradores',
description: 'Converte uma figurinha citada em imagem.',
async execute(ctx) {
const {
reply, mess, isQuotedSticker, info, getFileBuffer,
kiimorizinha, from, selo,
} = ctx;

if(!isQuotedSticker) return reply('Por favor, *mencione um sticker* para executar o comando.')
try {
const buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
await kiimorizinha.sendMessage(from, {image: buff}, {quoted: selo}).catch(async(error) => {
reply(mess.error())
})
} catch(error) {
console.log(error)
}
},
};
