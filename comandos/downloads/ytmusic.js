const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'ytmusic',
aliases: ['youtubemusic'],
category: 'downloads',
description: 'Baixa o áudio de um link do YouTube.',
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || (!q.includes('youtube.com') && !q.includes('youtu.be'))) {
return reply(`『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://youtu.be/SmWQg6G9Pxg`);
}
reply(`Hmm, já estou pesquisando no YouTube ${emojii}✨`);
try {
const url = `${API_KIMORI_URL}/api/yt/music?url=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Não foi possível obter a música'}`);
await kiimorizinha.sendMessage(from, {
audio: { url: data.audio_url },
mimetype: "audio/webm",
fileName: `${data.title?.replace(/[^a-zA-Z0-9]/g, '_') || 'music'}.webm`,
caption: `🎵 *${data.title}*
👤 ${data.artist || 'Desconhecido'}
💿 ${data.album || 'N/A'}
⏱️ ${data.duration || 'N/A'}`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
