const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'ttksrc',
aliases: ['ttksearch', 'ttsearch', 'tiktoksearch', 'pesquisartt'],
category: 'pesquisas',
description: 'Pesquisa um vídeo aleatório no TikTok pelo termo.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🎵『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} memes`);
await reagir(from, "🎵");
reply(`🔍 *Pesquisando no TikTok: ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/tiktok/random?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.video) return reply(`❌ Nenhum vídeo encontrado para: ${q}`);
const v = data.video;
const autor = v.autor;
let videoUrl = v.video_url_hd || v.video_url || v.video_url_wm;
if (!videoUrl) return reply(`❌ Vídeo encontrado mas sem URL para reprodução`);
const duracao = v.duracao ? `${Math.floor(v.duracao / 60)}:${String(v.duracao % 60).padStart(2, '0')}` : 'N/A';
try {
const videoResponse = await fetch(videoUrl, {
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
'Referer': 'https://www.tiktok.com/',
'Origin': 'https://www.tiktok.com',
},
});
if (!videoResponse.ok) throw new Error(`Falha ao baixar vídeo: ${videoResponse.status}`);
const videoBuffer = await videoResponse.arrayBuffer();
await kiimorizinha.sendMessage(from, {
video: Buffer.from(videoBuffer),
mimetype: "video/mp4",
caption: `🎵 *TikTok*\n\n📝 *${v.titulo || 'Sem título'}*\n\n👤 @${autor?.username || 'Desconhecido'} ${autor?.verified ? '✅' : ''}\n📛 ${autor?.apelido || 'Sem apelido'}\n⏱️ ${duracao}\n❤️ ${(v.likes || 0).toLocaleString()} curtidas\n💬 ${(v.comentarios || 0).toLocaleString()} comentários\n🔄 ${(v.compartilhamentos || 0).toLocaleString()} compartilhamentos\n📥 ${(v.downloads || 0).toLocaleString()} downloads\n👁️ ${(v.views || 0).toLocaleString()} visualizações`,
}, { quoted: selo });
} catch (downloadError) {
console.error('Erro ao baixar vídeo:', downloadError);
if (videoUrl !== v.video_url_wm && v.video_url_wm) {
try {
const videoResponse = await fetch(v.video_url_wm, {
headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'Referer': 'https://www.tiktok.com/' },
});
if (videoResponse.ok) {
const videoBuffer = await videoResponse.arrayBuffer();
await kiimorizinha.sendMessage(from, {
video: Buffer.from(videoBuffer),
mimetype: "video/mp4",
caption: `🎵 *TikTok (com watermark)*\n\n📝 *${v.titulo || 'Sem título'}*\n\n👤 @${autor?.username || 'Desconhecido'}\n❤️ ${(v.likes || 0).toLocaleString()} curtidas\n💬 ${(v.comentarios || 0).toLocaleString()} comentários`,
}, { quoted: selo });
return;
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
}
await reply(`🎵 *TikTok*\n\n📝 *${v.titulo || 'Sem título'}*\n\n👤 @${autor?.username || 'Desconhecido'}\n⏱️ ${duracao}\n❤️ ${(v.likes || 0).toLocaleString()} curtidas\n💬 ${(v.comentarios || 0).toLocaleString()} comentários\n\n❌ *Não foi possível baixar o vídeo*`);
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
