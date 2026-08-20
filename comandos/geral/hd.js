module.exports = {
name: 'hd',
category: 'geral',
description: 'Aumenta a qualidade (upscale) de uma imagem citada/enviada.',
async execute(ctx) {
const {
reply, mess, isMedia, info, isQuotedImage, downloadContentFromMessage,
upload, q, kiimorizinha, from, ChannelContextNewsLetter, selo,
} = ctx;

if ((isMedia && !info.message.videoMessage) || isQuotedImage) {
const post = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo.message.imageMessage : info.message.imageMessage;
const imagem = await downloadContentFromMessage(post, 'image');
let base64 = Buffer.from([]);
for await (const send of imagem) {
base64 = Buffer.concat([base64, send]);
}
reply(`*ᴀʟᴛᴇʀᴀɴᴅᴏ ᴀ ǫᴜᴀʟɪᴅᴀᴅᴇ ᴘᴀʀᴀ ʜᴅ...* `);
try {
const link = await upload(base64) || q.trim();
return kiimorizinha.sendMessage(from, {image: {url: `https://shizuku-apis.online/api/upscale?img=${encodeURIComponent(link)}&apitoken=Nk-Petrov-And-Harunni-Petrov`}, contextInfo: ChannelContextNewsLetter}, { quoted: selo });
} catch (error) {
console.error(error);
return reply(mess.error());
}
} else {
reply(`*ᴍᴇɴᴄɪᴏɴᴇ ᴜᴍᴀ ɪᴍᴀɢᴇᴍ ᴘᴀʀᴀ ᴀᴘʟɪᴄᴀʀ ᴏ ᴇғᴇɪᴛᴏ ʜᴅ*`);
}
},
};
