module.exports = {
name: 'prefixos',
category: 'geral',
description: 'Lista os prefixos ativos do multiprefixo no grupo.',
async execute(ctx) {
const { reply, isGroup, mess, isMultiP, dataGp } = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isMultiP) return reply(`*ᴏ ᴍᴜʟᴛɪᴘʀᴇғɪx ᴘʀᴇᴄɪsᴀ ᴇsᴛᴀ ᴀᴛɪᴠᴏ *`)
if(dataGp[0].prefixos.length < 1) return reply("*ᴏᴘᴀ, ɴᴀᴏ ᴄᴏɴᴛᴇᴍ ɴᴇɴʜᴜᴍ ᴘʀᴇғɪxᴏ ᴀᴅɪᴄɪᴏɴᴀᴅᴏ ɴᴇssᴇ ɢʀᴜᴘᴏ.. *")
reply(`*ᴛᴏᴛᴀʟ ᴅᴇ ᴘʀᴇғɪxᴏs:『 ${dataGp[0].prefixos.length} 』🍂*\n${dataGp[0].prefixos.map((v, index) => `「 ${v} 」\n`).join("")}`)
},
};
