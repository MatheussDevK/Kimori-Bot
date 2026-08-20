module.exports = {
name: 'avaliar',
aliases: ['avalie'],
category: 'geral',
description: 'Envia uma avaliação do bot pro dono.',
async execute(ctx) {
const { q, reply, prefix, sendMentions, nmrdnlid, from, sender_ou_n } = ctx;
if(q.length < 1) return reply(`*ᴇxᴇᴍᴘʟᴏ ${prefix}ᴀᴠᴀʟɪᴇ ᴍᴇʟʜᴏʀ ʙᴏᴛ ǫᴜᴇ ᴊᴀ ᴠɪ!!*`);
if(q.length > 4000) return reply(`*ᴠᴏᴄᴇ ᴘᴀssᴏᴜ ᴅᴇ 4000 ᴄᴀʀᴀᴄᴛᴀʀᴇs*`);
await sendMentions(nmrdnlid, `*🌟 ᴀᴠᴀʟɪᴀᴄᴀᴏ ᴅᴇ: @${sender_ou_n.split("@")[0]}*\n- *ᴅᴇᴛᴀʟʜᴇs:*\n• ${q}`);
await sendMentions(from, `*✨ ᴍᴜɪᴛᴏ ᴏʙʀɪɢᴀᴅᴏ, @${sender_ou_n.split("@")[0]}!*

*💌 ᴀ sᴜᴀ ᴀᴠᴀʟɪᴀçãᴏ ꜰᴏɪ ʀᴇᴄᴇʙɪᴅᴀ ᴇ ᴇɴᴠɪᴀᴅᴀ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ ᴘᴀʀᴀ ᴀ ᴇ𝚀ᴜɪᴘᴇ ʀᴇꜱᴘᴏɴꜱáᴠᴇʟ.*

*📝 ᴏ ꜱᴇᴜ ꜰᴇᴇᴅʙᴀᴄᴋ é ᴍᴜɪᴛᴏ ɪᴍᴘᴏʀᴛᴀɴᴛᴇ! ᴄᴀᴅᴀ ᴀᴠᴀʟɪᴀçãᴏ ᴀᴊᴜᴅᴀ ɴᴏ ᴀᴘᴇʀꜰᴇɪçᴏᴀᴍᴇɴᴛᴏ ᴅᴏꜱ ʀᴇᴄᴜʀꜱᴏꜱ, ɴᴀ ᴄᴏʀʀᴇçãᴏ ᴅᴇ ᴘᴏꜱꜱíᴠᴇɪꜱ ᴘʀᴏʙʟᴇᴍᴀꜱ ᴇ ɴᴀ ᴄʀɪᴀçãᴏ ᴅᴇ ɴᴏᴠᴀꜱ ꜰᴜɴᴄɪᴏɴᴀʟɪᴅᴀᴅᴇꜱ.*

*🤝 ᴀɢʀᴀᴅᴇᴄᴇᴍᴏꜱ ᴘᴇʟᴏ ꜱᴇᴜ ᴛᴇᴍᴘᴏ, ᴘᴇʟᴀ ꜱᴜᴀ ᴄᴏɴꜰɪᴀɴçᴀ ᴇ ᴘᴏʀ ᴄᴏɴᴛʀɪʙᴜɪʀ ᴘᴀʀᴀ ǫᴜᴇ ᴏ ᴘʀᴏᴊᴇᴛᴏ ᴄᴏɴᴛɪɴᴜᴇ ᴇᴠᴏʟᴜɪɴᴅᴏ.*

🚀 *ᴅᴇꜱᴇᴊᴀᴍᴏꜱ ǫᴜᴇ ᴠᴏᴄê ᴄᴏɴᴛɪɴᴜᴇ ᴛᴇɴᴅᴏ ᴜᴍᴀ óᴛɪᴍᴀ ᴇxᴘᴇʀɪêɴᴄɪᴀ. ᴍᴜɪᴛᴏ ᴏʙʀɪɢᴀᴅᴏ! ❤️*`);
}
};
