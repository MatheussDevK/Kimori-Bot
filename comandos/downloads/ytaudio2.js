const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'ytaudio2',
aliases: ['ytdl_audio2'],
category: 'downloads',
description: 'Baixa o áudio de um vídeo do YouTube (versão 2).',
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || (!q.includes('youtube.com') && !q.includes('youtu.be'))) {
return reply(`🎵『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://youtu.be/SmWQg6G9Pxg`);
}
reply(`🎵 Aguarde, já estou abaixando sua música${emojii}🍷`);
try {
const url = `${API_KIMORI_URL}/api/ytdl?url=${encodeURIComponent(q.trim())}&type=audio&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
if (!response.ok) return reply(`❌ Erro: ${response.status}`);
const buffer = await response.buffer();
await kiimorizinha.sendMessage(from, {
audio: buffer,
mimetype: "audio/mpeg",
ptt: false,
fileName: "youtube_audio_v2.mp3",
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
