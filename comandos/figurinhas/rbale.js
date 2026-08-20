module.exports = {
name: 'rbale',
category: 'figurinhas',
description: 'Reenvia a figurinha citada com autor/pack padrão do bot.',
async execute(ctx) {
const {
reply, mess, isQuotedSticker, info, getFileBuffer, convertSticker,
kiimorizinha, from, selo, pushname, botNome: NomeDoBot,
} = ctx;

if(!isQuotedSticker) return reply('Marque uma figurinha...')
const encmediats = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
reply(mess.wait())
const bas64 = `data:image/jpeg;base64,${encmediats.toString('base64')}`
const mantap = await convertSticker(bas64, `↳Feito pelo(a) usuário(a): ${pushname}`, `${NomeDoBot}`)
const sti = Buffer.from(mantap, 'base64');
await kiimorizinha.sendMessage(from, {sticker: sti}, {quoted: selo}).catch(async(error) => {
reply(mess.error());
})
},
};
