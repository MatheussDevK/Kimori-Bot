const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'tiktokv2',
category: 'downloads',
description: 'Baixa vídeo do TikTok (versão 2).',
async execute(ctx) {
const { reply, q, emojii, reagir, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || !q.includes('tiktok.com')) {
return reply(`🎥『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://vt.tiktok.com/ZSQSq47x9/`);
}
reply(`🎥 Aguarde, já estou abaixando o seu vídeo com o link do TikTok V2 enviado! ${emojii}🤩`);
try {
const url = `${API_KIMORI_URL}/api/download/tiktok-v2?url=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Não foi possível obter o vídeo'}`);
const hdLink = data.links?.find(l => l.label?.toLowerCase().includes('hd'));
const videoUrl = hdLink?.url || data.links?.[0]?.url;
if (!videoUrl) return reply("❌ Nenhum link de download encontrado");
await kiimorizinha.sendMessage(from, {
video: { url: videoUrl },
mimetype: "video/mp4",
caption: `🎵 *TikTok V2*
📝 ${data.description?.substring(0, 100) || ''}
👤 @${data.author?.name || 'Desconhecido'}
❤️ ${data.statistics?.likes || 0} curtidas`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
