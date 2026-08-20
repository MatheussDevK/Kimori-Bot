module.exports = {
name: 'delfigban',
category: 'admin',
description: 'Remove a figurinha citada da lista de figurinhas banidas do grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, SoDono,
info, dataGp, setGp,
} = ctx;

try {
if (!isGroup) return reply(mess.onlyGroup())
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins())
if (!info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage)
return reply('*ᴍᴇɴᴄɪᴏɴᴇ ᴜᴍᴀ ꜰɪɢᴜʀɪɴʜᴀ *')
const idSticker = info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
if (!Array.isArray(dataGp[0].figban)) dataGp[0].figban = []
const idx = dataGp[0].figban.findIndex(v => v.id === idSticker)
if (idx < 0) return reply('*ᴇssᴀ ꜰɪɢᴜʀɪɴʜᴀ ɴᴀᴏ ᴇsᴛᴀ́ ɴᴀ ʟɪsᴛᴀ ᴅᴇ ʙᴀɴ*')
dataGp[0].figban.splice(idx, 1)
setGp(dataGp)
reply('*ꜰɪɢᴜʀɪɴʜᴀ ʀᴇᴍᴏᴠɪᴅᴀ ᴅᴀ ʟɪsᴛᴀ ᴅᴇ ʙᴀɴ ᴄᴏᴍ sᴜᴄᴇssᴏ *')
} catch (e) {
console.log(e)
reply(mess.error())}
},
};
