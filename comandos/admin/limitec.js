const fs = require('fs');

module.exports = {
name: 'limitec',
aliases: ['limitec_global'],
category: 'admin',
description: 'Define o limite de caracteres do anti-flood (por grupo ou global).',
async execute(ctx) {
const {
reply, mess, SoDono, isnit, ischyt, isAntiFlood,
q, prefix, command, dataGp, setGp,
} = ctx;

if(!SoDono && !isnit && !ischyt) return reply(mess.onlyOwner())
if(!isAntiFlood) return reply(`* ᴀᴛɪᴠᴇ ᴏ ʀᴇᴄᴜʀsᴏ ᴘʀɪᴍᴇɪʀᴏ, ${prefix}ʟɪᴍɪᴛᴇᴄ`)
if(!q) return reply(`*🌟 ᴄᴀᴅᴇ ᴀ ǫᴜᴀɴᴛɪᴅᴀᴅᴇ? ᴇxᴇᴍᴘʟᴏ: ${prefix + command} 5000*`)
if(isNaN(q) == true) return reply('*ᴜsᴇ ᴀᴘᴇɴᴀs ɴᴜᴍᴇʀᴏs 🙄*')
if(command == 'limitec'){
dataGp[0].limitec.quantidade = q
setGp(dataGp)
reply(`*${q} ғᴏɪ ᴀᴜᴛᴇʀᴀᴅᴏ ᴏ ʟɪᴍɪᴛᴇ ᴄᴀʀᴀᴄᴛᴇʀᴇs 🚀*`)
} else {
fs.writeFileSync('./database/usuarios/flood.json', JSON.stringify({limitefl: q}, null, '\t'))
await reply(`*${q} ғᴏʀᴀᴍ ᴀᴅɪᴄɪᴏɴᴀᴅᴏ ᴀᴏ ʟɪᴍɪᴛᴇ ᴄᴀʀᴀᴄᴛᴇʀᴇs 🚀*`)
}
},
};
