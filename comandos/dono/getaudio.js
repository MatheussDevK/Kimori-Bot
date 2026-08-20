const fs = require('fs');

module.exports = {
name: 'getaudio',
aliases: ['trocaraudio'],
category: 'dono',
description: 'Troca o áudio usado no menu do bot, apenas dono.',
async execute(ctx) {
const {
reply, mess, SoDono, info, reagir, from, getFileBuffer,
ErroCase, prefix, command, botNome: NomeDoBot,
} = ctx;

if (!SoDono) return reply(mess.onlyOwner());
const quotedMsg = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
if (!quotedMsg || !quotedMsg.audioMessage) {
return reply("🎵 Marque um áudio para ser o novo áudio do menu.");}
try {
await reagir(from, "⏳");
const audioBuffer = await getFileBuffer(quotedMsg.audioMessage, 'audio');
const audioPath = "./config-bot/audios/menu.mp3";
fs.writeFileSync(audioPath, audioBuffer);
await reagir(from, "✅");
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
