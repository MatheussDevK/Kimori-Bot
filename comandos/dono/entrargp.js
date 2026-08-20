module.exports = {
name: 'entrar',
aliases: ['entrargp'],
category: 'dono',
description: 'Faz o bot entrar em um grupo a partir do link de convite, apenas dono.',
async execute(ctx) {
const { reply, SoDono, q, kiimorizinha } = ctx;

try {
if (!SoDono) return reply("*ᴇɪɪ, ᴘsɪᴜ, ǫᴜᴇᴍ ᴅɪssᴇ ǫᴜᴇ ᴠᴏᴄᴇ ᴘᴏᴅᴇ ᴜsᴀʀ ᴏs ᴄᴏᴍᴀɴᴅᴏs ᴅᴇ ᴍᴇᴜ ᴍᴇsᴛʀᴇ? ᴘᴏɴʜᴀ-sᴇ ɴᴏ sᴇᴜ ʟᴜɢᴀʀ *");
if (!q || !q.includes("https://chat.whatsapp.com/")) return reply("*ᴘʀᴇᴄɪsᴏ ᴅᴏ ʟɪɴᴋ ᴅᴏ ᴄʜᴀᴛ ᴘʀᴀ ᴍɪᴍ ᴘᴏᴅᴇʀ ᴇɴᴛʀᴀʀ sᴇɴʜᴏʀ(ᴀ) *");
reply("*ᴀɢᴜᴀʀᴅᴇ ᴜᴍ ᴍᴏᴍᴇɴᴛᴏ ǫᴜᴇ ᴇᴜ ᴊᴀ ᴇɴᴠɪᴇɪ ᴀ sᴏʟɪᴄɪᴛᴀᴄᴀᴏ sᴇɴʜᴏʀ(ᴀ)*");
const URL_ID = q.split('https://chat.whatsapp.com/')[1];
await kiimorizinha.groupAcceptInvite(URL_ID);
} catch (webSexo) {
console.error(webSexo);
reply("*ᴇʀʀᴏ ᴀᴏ ᴛᴇɴᴛᴀʀ ᴇɴᴛʀᴀʀ ɴᴏ ɢʀᴜᴘᴏ.(ᴛᴀʟᴠᴇᴢ ғᴜɪ ʀᴇᴍᴏᴠɪᴅᴏ ᴏᴜ ᴏ ʟɪɴᴋ ғᴏɪ ʀᴇᴅᴇғɪɴɪᴅᴏ) 👨‍💻*");
}
},
};
