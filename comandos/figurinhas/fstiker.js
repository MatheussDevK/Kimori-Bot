module.exports = {
name: 'fstiker',
aliases: ['fsticker', 'f'],
category: 'figurinhas',
description: 'Cria figurinha (imagem ou vídeo curto) com nome de usuário como pack e o bot como autor.',
async execute(ctx) {
const {
reply, mess, info, pushname, botNome: NomeDoBot, getFileBuffer,
sendImageAsSticker, sendVideoAsSticker, DLT_FL, kiimorizinha, from, selo,
ChannelContextNewsLetter,
} = ctx;

const RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
const boij = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
const boij2 = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage

if (boij) {
const packnameStk = `${pushname}`
const authorSticker = `${NomeDoBot}`
reply(mess.wait())
const owgi = await getFileBuffer(boij, 'image')
const ENC_MEDIA1 = await sendImageAsSticker(kiimorizinha, from, owgi, selo, {
packname: packnameStk,
author: authorSticker,
contextInfo: ChannelContextNewsLetter
})
await DLT_FL(ENC_MEDIA1)

} else if (boij2 && boij2?.seconds < 11) {
const packnameStk = `${pushname}`
const authorSticker = `${NomeDoBot}`
reply(mess.wait())
const owgi = await getFileBuffer(boij2, 'video')
const ENC_MEDIA2 = await sendVideoAsSticker(kiimorizinha, from, owgi, selo, {
packname: packnameStk,
author: authorSticker,
contextInfo: ChannelContextNewsLetter
})
await DLT_FL(ENC_MEDIA2)

} else {
reply(`*ᴍᴀʀǫᴜᴇ ᴜᴍᴀ ɪᴍᴀɢᴇᴍ ᴏᴜ ᴠɪᴅᴇᴏ ᴄᴏᴍ ᴏ ᴍᴀxɪᴍᴏ ᴅᴇ 10 ꜱᴇɢᴜɴᴅᴏꜱ*`)
}
},
};
