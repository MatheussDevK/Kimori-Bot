const fs = require('fs');

module.exports = {
name: 'fotocmderro',
category: 'dono',
description: 'Define a imagem/vídeo de fundo usado na mensagem de comando inválido, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, info, reagir, from, getFileBuffer } = ctx;

if (!SoDono) return reply(mess.onlyOwner());
const msg = info.message?.extendedTextMessage?.contextInfo?.quotedMessage || info.message || {};
const v = msg.videoMessage || msg.viewOnceMessage?.message?.videoMessage || msg.viewOnceMessageV2?.message?.videoMessage;
const i = msg.imageMessage || msg.viewOnceMessage?.message?.imageMessage || msg.viewOnceMessageV2?.message?.imageMessage;
const pastaLogos = './config-bot/logos';
if (!fs.existsSync(pastaLogos)) fs.mkdirSync(pastaLogos, { recursive: true });
const imagemPath = `${pastaLogos}/cmdinvalid.png`;
const videoPath = `${pastaLogos}/cmdinvalid.mp4`;
if (v) {
reagir(from, "⏳");
const buffer = await getFileBuffer(v, 'video');
if (fs.existsSync(imagemPath)) fs.unlinkSync(imagemPath);
fs.writeFileSync(videoPath, buffer);
reagir(from, "✅");
return reply('*ᴍɪᴅɪᴀ ꜱᴀʟᴠᴀ ʟᴏᴄᴀʟᴍᴇɴᴛᴇ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ *');
}
if (i) {
reagir(from, "⏳");
const buffer = await getFileBuffer(i, 'image');
if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
fs.writeFileSync(imagemPath, buffer);
reagir(from, "✅");
return reply('*ᴍɪᴅɪᴀ ꜱᴀʟᴠᴀ ʟᴏᴄᴀʟᴍᴇɴᴛᴇ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ *');
}
reply('*ᴇɪ ᴍᴇsᴛʀᴇ, ᴍᴀɴᴅᴇ ᴜᴍᴀ ɪᴍᴀɢᴇᴍ ᴏᴜ ᴠɪ́ᴅᴇᴏ ᴘʀᴀ ᴍɪᴍ ᴍᴜᴅᴀʀ ᴏ ᴍᴇɴᴜ*');
},
};
