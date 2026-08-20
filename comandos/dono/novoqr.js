module.exports = {
name: 'novoqr',
category: 'dono',
description: 'Apaga a sessão pra forçar um novo QR code, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, fs, qrcode } = ctx;

if(!SoDono) return reply(mess.onlyOwner());
reply("*ᴏᴋᴀʏ ᴍᴇsᴛʀᴇ, ɪʀᴇɪ ʀᴇɪɴɪᴄɪᴀʀ ᴏ ǫʀ, ᴀɢᴜᴀʀᴅᴇ ᴜᴍ ᴍᴏᴍᴇɴᴛᴏ... ᴇ ғɪǫᴜᴇ ʟɪɢᴀᴅᴏ ɴᴏ ᴄᴏɴsᴏʟᴇ*")
setTimeout(async() => {fs.rmdirSync(qrcode, {recursive: true})}, 1500);
},
};
