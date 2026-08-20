module.exports = {
name: 'sugestao',
aliases: ['sugestão'],
category: 'geral',
description: 'Envia uma sugestão de comando/sistema pro dono do bot.',
async execute(ctx) {
const { q, reply, prefix, sendMentions, nmrdnlid, sender } = ctx;
if(q.length < 1) return reply(`*ᴇxᴇᴍᴘʟᴏ ${prefix}sᴜɢᴇsᴛᴀᴏ ǫᴜᴇ ᴛᴀʟ ᴄᴏʟᴏᴄᴀʀ ᴜᴍ ᴄᴏᴍᴀɴᴅᴏ ǫᴜᴇ ғᴜɴᴄɪᴏɴᴇ ᴅᴀ ᴛᴀʟ ᴍᴀɴᴇɪʀᴀ? *`);
if(q.length > 4000) return reply(`*ᴠᴏᴄᴇ ᴘᴀssᴏᴜ ᴅᴇ 4000 ᴄᴀʀᴀᴄᴛᴀʀᴇs*`);
await sendMentions(nmrdnlid, `*⚠ ᴏ ᴜsᴜᴀʀɪᴏ @${sender.split("@")[0]} sᴜɢᴇʀɪᴜ ᴜᴍ ᴄᴏᴍᴀɴᴅᴏ ᴏᴜ sɪsᴛᴇᴍᴀ ɴᴏ ʙᴏᴛ*\n*ᴅᴇᴛᴀʟʜᴇs:*\n• ${q}`);
reply('*ᴍᴇɴsᴀɢᴇᴍ ᴇɴᴠɪᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴀᴏ ᴍᴇᴜ ᴍᴇsᴛʀᴇ, ᴄᴀsᴏ ᴠᴏᴄᴇ ғʟᴏᴏᴅ ᴏ ᴄᴏᴍᴀɴᴅᴏ ᴘᴏʀ ᴢᴜᴇɪʀᴀ ᴇᴜ ɪʀᴇɪ ʙʟᴏǫᴜᴇᴀʀ ᴠᴏᴄᴇ ᴅᴇ ᴜsᴀʀ ᴍᴇᴜs ᴄᴏᴍᴀɴᴅᴏs*');
}
};
