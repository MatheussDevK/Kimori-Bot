const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'instagram',
category: 'downloads',
description: 'Baixa vídeo ou imagem de um post do Instagram.',
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || !q.includes('instagram.com')) {
return reply(`📸『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://www.instagram.com/reel/DZii0_4Pcqg`);
}
reply(`*Baixando mídia do Instagram...*` + emojii);
try {
const url = `${API_KIMORI_URL}/api/instagram/dl/video?url=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Não foi possível obter a mídia'}`);
if (data.videos && data.videos.length > 0) {
await kiimorizinha.sendMessage(from, {
video: { url: data.videos[0] },
mimetype: "video/mp4",
caption: `📸 *Instagram*
🔗 ${q.substring(0, 50)}...`,
}, { quoted: selo });
} else if (data.imagens && data.imagens.length > 0) {
await kiimorizinha.sendMessage(from, {
image: { url: data.imagens[0] },
caption: `📸 *Instagram*
🔗 ${q.substring(0, 50)}...`,
}, { quoted: selo });
} else {
return reply("❌ Nenhuma mídia encontrada neste post");
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
