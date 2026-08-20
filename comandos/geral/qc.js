const fs = require('fs');

module.exports = {
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
kiimorizinha.sendImageAsSticker = async (jid, path, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await kiimorizinha.sendMessage(jid, { sticker: { url: buffer }, ...options})
return buffer
}
const avatar = `${ppimg}`
const json = { "type": "quote", "format": "png", "backgroundColor": "#000000", "width": 512, "height": 768, "scale": 2, "messages": [{ "entities": [], "avatar": true, "from": { "id": 1, "name": username2, "photo": { "url": avatar }
}, "text": text, "replyMessage": {}
}
]
};
axios.post('https://bot.lyo.su/quote/generate', json, {
headers: {'Content-Type': 'application/json'}
}).then(res => {
const buffer = Buffer.from(res.data.result.image, 'base64')
sendImageAsSticker(kiimorizinha, from, buffer, selo, { packname: pushname, author: NomeDoBot,
contextInfo: {...ChannelContextNewsLetter}
}, {quoted: selo})
})
},
};
