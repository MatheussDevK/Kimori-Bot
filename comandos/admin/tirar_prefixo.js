const { ANT_LTR_MD_EMJ } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'tirar_prefixo',
category: 'admin',
description: 'Remove um prefixo da lista de multiprefixo do grupo.',
async execute(ctx) {
const { reply, isGroup, mess, isGroupAdmins, isMultiP, q, dataGp, setGp } = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isMultiP) return reply(`*ᴏ ᴍᴜʟᴛɪᴘʀᴇғɪx ᴘʀᴇᴄɪsᴀ ᴇsᴛᴀ ᴀᴛɪᴠᴏ *`)
if(ANT_LTR_MD_EMJ(q)) return reply("*ᴏᴘᴀ, ᴄᴀʟᴍᴀ ᴀɪ ᴘᴀɪᴢᴀᴜᴍ, ɴᴀᴅᴀ ᴅᴇ ʟᴇᴛʀᴀ ᴍᴏᴅɪғɪᴄᴀᴅᴀ ᴏᴜ ᴇᴍᴏᴊɪ 🙅‍♂️*")
if(!q.trim()) return reply("*ǫᴜᴀʟ ᴘʀᴇғɪxᴏ ᴠᴏᴄᴇ ᴅᴇsᴇᴊᴀ ᴛɪʀᴀʀ? *")
if(q.trim() > 1) return reply(`*ᴄᴀʟᴍᴀ ᴀɪ ᴘᴀɪᴢᴀᴜᴍ, ᴏ ᴘʀᴇғɪxᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴛɪʀᴀᴅᴏ ᴜᴍ ᴅᴇ ᴄᴀᴅᴀ ᴠᴇᴢ 🙅‍♂️*`)
if(dataGp[0].prefixos.indexOf(q.trim()) < 0) return reply(`*ᴇsᴛᴇ ᴘʀᴇғɪxᴏ ɴᴀᴏ ᴇsᴛᴀ ɪɴᴄʟᴜsᴏ *`)
if(dataGp[0].prefixos.length == 1) return reply("*ᴀᴅɪᴄɪᴏɴᴇ ᴏᴜᴛʀᴏ ᴘʀᴇғɪxᴏ ᴘᴀʀᴀ ᴘᴏᴅᴇʀ ᴛɪʀᴀʀ ᴇssᴇ... *")
dataGp[0].prefixos.splice(dataGp[0].prefixos.indexOf(q.trim()), 1)
setGp(dataGp)
reply(`*ᴏ ᴘʀᴇғɪxᴏ『 ${q.trim()} 』ғᴏɪ ᴛɪʀᴀᴅᴏ ᴅᴀ ʟɪsᴛᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ*`)
},
};
