module.exports = {
name: 'figfundo',
aliases: ['figvideo', 'figusemfundo', 'sfundo'],
category: 'figurinhas',
description: 'Cria uma figurinha a partir de imagem com pack/autor customizados via "texto1|texto2".',
async execute(ctx) {
const {
reply, mess, isMedia, isQuotedImage, info, q, args,
getFileBuffer, convertSticker, kiimorizinha, from, selo,
botNome: NomeDoBot, pushname,
} = ctx;

if((isMedia && !info.message.videoMessage || isQuotedImage) && !q.length <= 1) {
const rafa = isQuotedImage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : info.message.imageMessage
reply(mess.wait())
const buff = await getFileBuffer(rafa, 'image')
const bas64 = `data:image/jpeg;base64,${buff.toString('base64')}`
const anu = args.join(' ').split('|')
const satu = anu[0] !== '' ? anu[0] : `${NomeDoBot}`
const sd = `↳Feito pelo(a) usuário(a): ${pushname}`
const dua = typeof anu[1] !== 'undefined' ? anu[1] : `${sd}`
const mantap = await convertSticker(bas64, `${dua}`, `${satu}`)
const sti = Buffer.from(mantap, 'base64');
await kiimorizinha.sendMessage(from, {sticker: sti}, {quoted: selo})
} else {
return reply(`So imagem amigo(a)!`)
}
},
};
