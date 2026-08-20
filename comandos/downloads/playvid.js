const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'playvideo',
aliases: ['playvid', 'pesquisarvideo'],
category: 'downloads',
description: 'Pesquisa e baixa um vídeo pelo nome.',
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🎬『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Imagine Dragons`);
reply(`Já estou pesquisando seu vídeo! ${emojii}✨`);
try {
const url = `${API_KIMORI_URL}/api/search/video?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
if (!response.ok) return reply(`❌ Erro: ${response.status}`);
const buffer = await response.buffer();
const title = response.headers.get('x-video-title') ? decodeURIComponent(response.headers.get('x-video-title')) : 'Vídeo';
await kiimorizinha.sendMessage(from, {
video: buffer,
mimetype: "video/mp4",
fileName: `${title.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`,
caption: `🎬 *${title}*`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
