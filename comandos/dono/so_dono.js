module.exports = {
name: 'so_dono',
category: 'dono',
description: 'Liga/desliga o bot para membros e admins (só o dono continua com acesso).',
async execute(ctx) {
const { reply, mess, SoDono, toggleNescessarioFeature } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
await toggleNescessarioFeature('so_dono', {
label: '𝔹𝕆𝕋',
onMsg: `『❌』ᴏ ʙᴏᴛ ғᴏɪ ᴅᴇsʟɪɢᴀᴅᴏ ᴘʀᴀ ᴍᴇᴍʙʀᴏs ᴇ ᴀᴅᴍs!`,
offMsg: `『✅』ᴀᴛɪᴠᴀɴᴅᴏ ᴛᴏᴅᴏs ᴏs ғᴜɴᴄɪᴏɴᴀᴍᴇɴᴛᴏs ᴅᴏ ʙᴏᴛ ɴᴏᴠᴀᴍᴇɴᴛᴇ!`,
onPlain: '『❌』ᴏ ʙᴏᴛ ғᴏɪ ᴅᴇsʟɪɢᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴘʀᴀ ᴜsᴏ ᴅᴇ ᴍᴇᴍʙʀᴏs ᴇ ᴀᴅᴍs ᴅᴇ ɢʀᴜᴘᴏs!',
offPlain: `『✅』ᴀᴛɪᴠᴀɴᴅᴏ ᴛᴏᴅᴏs ᴏs ғᴜɴᴄɪᴏɴᴀᴍᴇɴᴛᴏs ᴅᴏ ʙᴏᴛ ɴᴏᴠᴀᴍᴇɴᴛᴇ!`,
})
},
};
