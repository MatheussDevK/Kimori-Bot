import fs from 'node:fs';

export default {
name: 'qc',
category: 'geral',
description: 'Cria uma figurinha estilo "citação" (quote card) com a foto e o texto do usuário.',
async execute(ctx) {
const {
reply, q, prefix, command, botNome: NomeDoBot, pushname, sender,
kiimorizinha, from, imgperfil, writeExifImg, getBuffer, imageToWebp,
sendImageAsSticker, selo, ChannelContextNewsLetter, axios,
} = ctx;

if(!q) return reply(`- Exemplo: ${prefix+command} ${NomeDoBot}`)
const text = `${q}`
const username2 = `${pushname}`
let ppimg;
try {
ppimg = await kiimorizinha.profilePictureUrl(sender, 'image')
} catch {
ppimg = imgperfil
}
const avatar = `${ppimg}`
const json = { "type": "quote", "format": "png", "backgroundColor": "#000000", "width": 512, "height": 768, "scale": 2, "messages": [{ "entities": [], "avatar": true, "from": { "id": 1, "name": username2, "photo": { "url": avatar }
}, "text": text, "replyMessage": {}
}
]
};
// antes sem await/catch: se a API falhasse, virava erro solto e o usuário ficava sem resposta
try {
const res = await axios.post('https://bot.lyo.su/quote/generate', json, {
headers: {'Content-Type': 'application/json'}
})
const imagem = res?.data?.result?.image
if (!imagem) return reply('Não consegui gerar a citação agora, tente de novo mais tarde.')
const buffer = Buffer.from(imagem, 'base64')
await sendImageAsSticker(kiimorizinha, from, buffer, selo, { packname: pushname, author: NomeDoBot,
contextInfo: {...ChannelContextNewsLetter}
}, {quoted: selo})
} catch (e) {
console.log('[QC]', e?.message || e)
reply('Não consegui gerar a citação agora, tente de novo mais tarde.')
}
},
};
