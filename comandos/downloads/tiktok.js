const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');
const { prepareWAMessageMedia } = require('@whiskeysockets/baileys');

module.exports = {
name: 'tiktok_video',
aliases: ['tiktok'],
category: 'downloads',
description: 'Baixa vídeo ou fotos de um link do TikTok (com métodos alternativos de fallback).',
async execute(ctx) {
const { reply, q, emojii, reagir, info, kiimorizinha, from, prefix, command, ErroCase, botNome, ChannelContextNewsLetter } = ctx;
if (!q?.trim() || !q.includes('tiktok.com')) {
return reply(`🎵『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://vt.tiktok.com/ZSQSq47x9/`);
}
reply(`🎥 Aguarde, já estou baixando o seu vídeo do TikTok! ${emojii}🤩`);
try {
const resolved = await fetch(q, { redirect: 'follow' });
const finalUrl = resolved.url;
const apiResp = await fetch('https://www.tikwm.com/api/', {
method: 'POST',
headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
body: `url=${encodeURIComponent(finalUrl)}&hd=1`,
});
const json = await apiResp.json();
const data = json?.data;
if (data) {
if (data?.images?.length > 0) {
const total = data.images.length;
const cards = [];
for (let i = 0; i < total; i++) {
const media = await prepareWAMessageMedia({ image: { url: data.images[i] } }, { upload: kiimorizinha.waUploadToServer });
cards.push({
header: { hasMediaAttachment: true, imageMessage: media.imageMessage },
headerType: 'IMAGE', body: { text: `${i + 1}/${total}` },
footer: { text: '' }, nativeFlowMessage: { buttons: [] },
});
}
await kiimorizinha.relayMessage(from, {
interactiveMessage: { contextInfo: { participant: from }, body: { text: '' }, carouselMessage: { cards } },
}, {});
return;
}
const videoUrl = data?.hdplay || data?.play || data?.video_url;
if (videoUrl) {
await kiimorizinha.sendMessage(from, {
video: { url: videoUrl },
mimetype: 'video/mp4',
caption: `🎵 TikTok
📝 ${data?.title?.substring(0, 100) || 'Vídeo'}
❤️ ${data?.digg_count || 0} curtidas`,
}, { quoted: info });
return;
}
}
const urlV2 = `${API_KIMORI_URL}/api/download/tiktok-v2?url=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const responseV2 = await fetch(urlV2);
const dataV2 = await responseV2.json();
if (dataV2.success) {
const hdLink = dataV2.links?.find(l => l.label?.toLowerCase().includes('hd'));
const videoUrl = hdLink?.url || dataV2.links?.[0]?.url;
if (videoUrl) {
await kiimorizinha.sendMessage(from, {
video: { url: videoUrl },
mimetype: "video/mp4",
caption: `🎵 *TikTok V2*
📝 ${dataV2.description?.substring(0, 100) || ''}
👤 @${dataV2.author?.name || 'Desconhecido'}
❤️ ${dataV2.statistics?.likes || 0} curtidas`,
}, { quoted: info });
return;
}
}
const urlPadrao = `${API_KIMORI_URL}/api/download/tiktok?url=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const responsePadrao = await fetch(urlPadrao);
const dataPadrao = await responsePadrao.json();
if (dataPadrao.success && dataPadrao.data?.video_url) {
await kiimorizinha.sendMessage(from, {
video: { url: dataPadrao.data.video_url },
mimetype: "video/mp4",
fileName: "tiktok.mp4",
caption: `🎵 TikTok | ${dataPadrao.data.titulo || 'Vídeo'}`,
contextInfo: ChannelContextNewsLetter,
}, { quoted: info });
return;
}
const directResp = await fetch(q, { headers: { 'User-Agent': 'Mozilla/5.0' } });
const html = await directResp.text();
const videoMatch = html.match(/https?:\/\/[^"]+\.mp4[^"]*/);
if (videoMatch) {
await kiimorizinha.sendMessage(from, { video: { url: videoMatch[0] }, mimetype: "video/mp4" }, { quoted: info });
return;
}
throw new Error('Todos os métodos de download falharam');
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
