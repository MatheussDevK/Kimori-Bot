const fs = require('fs');

module.exports = {
name: 'revelar',
aliases: ['rvisu', 'open'],
category: 'geral',
description: 'Revela uma mídia de visualização única (imagem, vídeo ou áudio) citada.',
async execute(ctx) {
const {
reply, reagir, from, info, kiimorizinha, selo, isQuotedAudio,
getFileBuffer, getRandom,
} = ctx;

await reagir(from, "👀");

if (JSON.stringify(info).includes("videoMessage")) {
const Xoxota = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
const video = Xoxota?.videoMessage || info.message?.videoMessage ||
Xoxota?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage ||
info.message?.viewOnceMessage?.message?.videoMessage || Xoxota?.viewOnceMessage?.message?.videoMessage;

if (video) {
video.viewOnce = false;
video.video = { url: video.url };
kiimorizinha.sendMessage(from, video, { quoted: selo });
}
} else if (JSON.stringify(info).includes("imageMessage")) {
const Xoxota = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
const image = Xoxota?.imageMessage || info.message?.imageMessage ||
Xoxota?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage ||
info.message?.viewOnceMessage?.message?.imageMessage || Xoxota?.viewOnceMessage?.message?.imageMessage;

if (image) {
image.viewOnce = false;
image.image = { url: image.url };
kiimorizinha.sendMessage(from, image, { quoted: selo });
}
} else if (JSON.stringify(info).includes("audioMessage") || info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2Extension?.message?.audioMessage) {
const audio = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage;

if (audio) {
if (!audio.mimetype) return;

const buffAudio = await getFileBuffer(audio, 'audio');
const audioFile = getRandom('.mp3');
fs.writeFileSync(audioFile, buffAudio);

const audioBuffer = fs.readFileSync(audioFile);
kiimorizinha.sendMessage(from, { audio: audioBuffer, mimetype: 'audio/mpeg', ptt: false }, { quoted: selo });

fs.rmSync(audioFile);
}
} else {
reply("• Marque uma Imagem, video ou áudio em visualização única.");
}
},
};
