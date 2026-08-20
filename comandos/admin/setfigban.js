module.exports = {
name: 'setfigban',
category: 'admin',
description: 'Adiciona a figurinha citada na lista de figurinhas banidas do grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, SoDono, isBotGroupAdmins,
info, dataGp, setGp, sender, dattofc,
} = ctx;

try {
if (!isGroup) return reply(mess.onlyGroup())
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if (!info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage)
return reply('*ᴍᴇɴᴄɪᴏɴᴇ ᴜᴍᴀ ꜰɪɢᴜʀɪɴʜᴀ *')
const idSticker = info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
if (!Array.isArray(dataGp[0].figban)) dataGp[0].figban = []
if (dataGp[0].figban.some(v => v.id === idSticker))
return reply('*ᴇssᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴊᴀ ᴇsᴛᴀ́ ɴᴀ ʟɪsᴛᴀ ᴅᴇ ʙᴀɴ *')
dataGp[0].figban.push({ id: idSticker, addedBy: sender, data: dattofc })
setGp(dataGp)
reply(`*ᴄᴇʀᴛᴏ, ʀᴇɢɪsᴛʀᴇɪ ᴇssᴀ ꜰɪɢᴜʀɪɴʜᴀ ɴᴀ ʟɪsᴛᴀ ᴅᴇ ʙᴀɴ ᴅᴏ ɢʀᴜᴘᴏ*\n\n🆔 | ɪᴅ: ${idSticker}`)
} catch (e) {
console.log(e)
reply(mess.error())}
},
};
