module.exports = {
name: 'st',
aliases: ['stk', 'sticker', 's'],
category: 'figurinhas',
description: 'Cria figurinha (imagem ou vídeo curto) com pack/autor no estilo padrão da Kimori.',
async execute(ctx) {
const {
reply, mess, info, pushname, groupName, isGroup, ownerName,
botNome: NomeDoBot, getFileBuffer, sendImageAsSticker2, sendVideoAsSticker2,
DLT_FL, kiimorizinha, from, selo, ChannelContextNewsLetter,
} = ctx;

const RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
const boij2 = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
const boij = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage
if (boij2) {
const pack = mess.fig(ownerName, NomeDoBot)
const author2 = mess.fig2(pushname, groupName, isGroup, NomeDoBot)
const owgi = await getFileBuffer(boij2, 'image')
const encmediaa = await sendImageAsSticker2(kiimorizinha, from, owgi, selo, {
packname: pack,
author: author2,
contextInfo: ChannelContextNewsLetter
})
await DLT_FL(encmediaa)
} else if (boij && boij.seconds < 11) {
const pack = mess.fig(ownerName, NomeDoBot)
const author2 = mess.fig2(pushname, groupName, isGroup, NomeDoBot)
const owgi = await getFileBuffer(boij, 'video')
const encmedia = await sendVideoAsSticker2(kiimorizinha, from, owgi, selo, {
packname: pack,
author: author2,
contextInfo: ChannelContextNewsLetter
})
await DLT_FL(encmedia)
} else {
reply(`𝕄𝕒𝕣𝕢𝕦𝕖 𝕦𝕞𝕒 𝕚𝕞𝕘 𝕠𝕦 𝕧𝕚́𝕕𝕖𝕠 𝕕𝕖 𝕟𝕠 𝕞𝕒𝕩𝕚𝕞𝕠 𝕕𝕖 9.9 𝕊𝕖𝕘𝕦𝕟𝕕𝕠𝕤! ฅ^•ﻌ•^ฅ`)
}
},
};
