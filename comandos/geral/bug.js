module.exports = {
name: 'bug',
category: 'geral',
description: 'Reporta um bug pro dono do bot.',
async execute(ctx) {
const { q, reply, prefix, sendMentions, nmrdnlid, sender } = ctx;
if(q.length < 1) return reply(`*ᴇxᴇᴍᴘʟᴏ ${prefix}ʙᴜɢ ᴏ ʙᴏᴛ ᴇsᴛᴀ ᴄᴏᴍ ᴀᴛʀᴀsᴏ*`);
if(q.length > 4000) return reply(`*ᴠᴏᴄᴇ ᴘᴀssᴏᴜ ᴅᴇ 4000 ᴄᴀʀᴀᴄᴛᴀʀᴇs*`);
await sendMentions(nmrdnlid, `*⚠ ᴏ ᴜsᴜᴀʀɪᴏ @${sender.split("@")[0]} ʀᴇʟᴀᴛᴏᴜ ᴀʟɢᴜᴍ ᴇʀʀᴏ ᴏᴜ ʙᴜɢ ɴᴏ ʙᴏᴛ*\n*ᴅᴇᴛᴀʟʜᴇs:*\n• ${q}`);
reply('*ᴍᴇɴsᴀɢᴇᴍ ᴇɴᴠɪᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴀᴏ ᴍᴇᴜ ᴍᴇsᴛʀᴇ, ᴄᴀsᴏ ᴠᴏᴄᴇ ғʟᴏᴏᴅ ᴏ ᴄᴏᴍᴀɴᴅᴏ ᴘᴏʀ ᴢᴜᴇɪʀᴀ ᴇᴜ ɪʀᴇɪ ʙʟᴏǫᴜᴇᴀʀ ᴠᴏᴄᴇ ᴅᴇ ᴜsᴀʀ ᴍᴇᴜs ᴄᴏᴍᴀɴᴅᴏs*');
}
};
