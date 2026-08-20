const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'ytvideo2',
aliases: ['ytdl_video2'],
category: 'downloads',
description: 'Baixa um vídeo do YouTube (versão 2).',
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || (!q.includes('youtube.com') && !q.includes('youtu.be'))) {
return reply(`🎬『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://youtu.be/SmWQg6G9Pxg`);
}
try {
const url = `${API_KIMORI_URL}/api/ytdl?url=${encodeURIComponent(q.trim())}&type=video&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
if (!response.ok) return reply(`❌ Erro: ${response.status}`);
const buffer = await response.buffer();
await kiimorizinha.sendMessage(from, {
video: buffer,
mimetype: "video/mp4",
fileName: "youtube_video_v2.mp4",
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
