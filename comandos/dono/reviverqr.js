module.exports = {
name: 'reviverqr',
category: 'dono',
description: 'Limpa as chaves de sessão e reinicia o bot para gerar um novo QR code, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, exec, qrcode } = ctx;

if(!SoDono) return reply(mess.onlyOwner())
exec(`cd ${qrcode} && rm -rf pre-key* sender* session*`)
setTimeout(async () => {
await reply("*ᴏᴋᴀʏ ᴍᴇsᴛʀᴇ, ɪʀᴇɪ ʀᴇɪɴɪᴄɪᴀʀ, ᴀɢᴜᴀʀᴅᴇ ᴜᴍ ᴍᴏᴍᴇɴᴛᴏ...*")
setTimeout(async () => {
process.exit()
}, 1200)
}, 1000)
},
};
