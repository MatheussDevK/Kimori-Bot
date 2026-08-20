const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'ytvideobeta',
aliases: ['youtube_beta_video'],
category: 'downloads',
description: 'Baixa um vídeo do YouTube (versão Beta).',
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || (!q.includes('youtube.com') && !q.includes('youtu.be'))) {
return reply(`🎬『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://youtu.be/SmWQg6G9Pxg`);
}
reply(`🎥 Aguarde, já estou abaixando o seu vídeo com o link enviado do YouTube, usando a versão Beta! ${emojii}🤩`);
try {
const url = `${API_KIMORI_URL}/api/download/youtube-beta/video?url=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.data?.url) return reply(`❌ Erro ao processar.`);
await kiimorizinha.sendMessage(from, {
video: { url: data.data.url },
mimetype: "video/mp4",
fileName: `${data.data.titulo?.replace(/[^a-zA-Z0-9]/g, '_') || 'video'}.mp4`,
caption: `🎬 *${data.data.titulo || 'YouTube Video'}*`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
