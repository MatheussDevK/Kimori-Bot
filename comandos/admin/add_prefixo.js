const { ANT_LTR_MD_EMJ } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'add_prefixo',
category: 'admin',
description: 'Adiciona um prefixo extra à lista de multiprefixo do grupo.',
async execute(ctx) {
const { reply, isGroup, mess, isGroupAdmins, isMultiP, q, dataGp, setGp } = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isMultiP) return reply(`*ᴏ ᴍᴜʟᴛɪᴘʀᴇғɪx ᴘʀᴇᴄɪsᴀ ᴇsᴛᴀ ᴀᴛɪᴠᴏ *`)
if(ANT_LTR_MD_EMJ(q)) return reply("*ᴏᴘᴀ, ᴄᴀʟᴍᴀ ᴀɪ ᴘᴀɪᴢᴀᴜᴍ, ɴᴀᴅᴀ ᴅᴇ ʟᴇᴛʀᴀ ᴍᴏᴅɪғɪᴄᴀᴅᴀ ᴏᴜ ᴇᴍᴏᴊɪ 🙅‍♂️*")
if(!q.trim()) return reply("*ǫᴜᴀʟ ᴘʀᴇғɪxᴏ ᴠᴏᴄᴇ ᴅᴇsᴇᴊᴀ ᴄᴏʟᴏᴄᴀʀ? *")
if(q.trim() > 1) return reply(`*ᴄᴀʟᴍᴀ ᴀɪ ᴘᴀɪᴢᴀᴜᴍ, ᴏ ᴘʀᴇғɪxᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴅɪᴄɪᴏɴᴀᴅᴏ ᴜᴍ ᴅᴇ ᴄᴀᴅᴀ ᴠᴇᴢ 🙅‍♂️*`)
if(dataGp[0].prefixos.indexOf(q.trim()) >= 0) return reply(`*ᴇsᴛᴇ ᴘʀᴇғɪxᴏ ɴᴀᴏ ᴇsᴛᴀ ɪɴᴄʟᴜsᴏ *`)
dataGp[0].prefixos.push(q.trim())
setGp(dataGp)
reply(`*ᴏ ᴘʀᴇғɪxᴏ『 ${q.trim()} 』ғᴏɪ ᴀᴅɪᴄɪᴏɴᴀᴅᴏ ᴀ ʟɪsᴛᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ*`)
},
};
