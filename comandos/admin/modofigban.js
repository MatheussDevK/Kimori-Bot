module.exports = {
name: 'modofigban',
category: 'admin',
description: 'Liga/desliga o modo figban (remoção automática de figurinhas banidas) no grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, SoDono, isBotGroupAdmins,
dataGp, setGp,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup())
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
dataGp[0].modofigban = !dataGp[0].modofigban
setGp(dataGp)
reply(dataGp[0].modofigban ? '*ᴏ ᴍᴏᴅᴏ ꜰɪɢʙᴀɴ ꜰᴏɪ ᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ.*' : '*ᴏ ᴍᴏᴅᴏ ꜰɪɢʙᴀɴ ꜰᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ.*')
},
};
