module.exports = {
name: 'multiprefixo',
aliases: ['multiprefix'],
category: 'admin',
description: 'Liga/desliga o recurso de multiprefixo no grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, SoDono, isMultiP, dataGp, setGp } = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins())
if(!isMultiP) {
dataGp[0].multiprefix = true
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴍᴜʟᴛɪ ᴘʀᴇғɪxᴏ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ*')
}
if(isMultiP) {
dataGp[0].multiprefix = false
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*')
}
},
};
