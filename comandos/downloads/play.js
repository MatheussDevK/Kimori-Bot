const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'play',
category: 'downloads',
description: 'Pesquisa uma música e mostra info com botões de baixar áudio/vídeo.',
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, sendInteractiveMessage, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🎵『${emojii}❌』Me fala o nome da música que eu procuro pra você!`);
try {
const url = `${API_KIMORI_URL}/api/search/info?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.results || data.results.length === 0) {
return reply(`❌ Nenhum resultado encontrado para: ${q}`);
}
const r = data.results[0];
if (!r.title || !r.author) return reply(`❌ Dados incompletos para o vídeo encontrado`);
const viewsFormatada = r.views ? r.views.toLocaleString() : '0';
await sendInteractiveMessage(kiimorizinha, from, {
image: { url: r.thumbnail },
text: `₊˚‧︵₊୨ᰔ︵‧˚‧︵ᰔ୨₊︵‧˚₊
₊˚‧ 🎵 𝐏𝐋𝐀𝐘 𝐌𝐔𝐒𝐈𝐂 🎵
₊˚‧︵₊୨ᰔ︵‧˚‧︵ᰔ୨₊︵‧˚₊
₊˚‧𝚃𝚒𝚝𝚞𝚕𝚘: ${r.title}
₊˚‧︵₊୨ᰔ︵‧˚‧︵ᰔ୨₊︵‧˚₊
₊˚‧👤 𝙰𝚞𝚝𝚘𝚛: ${r.author}
₊˚‧⏱️ 𝙳𝚞𝚛𝚊𝚌̧𝚊̃𝚘: ${r.duration || 'Não disponível'}
₊˚‧👁️ 𝚅𝚒𝚎𝚠𝚜: ${viewsFormatada}
₊˚‧📅 𝙿𝚘𝚜𝚝𝚊𝚍𝚘: ${r.ago || 'Data não disponível'}
₊˚‧🔗 𝙻𝚒𝚗𝚔 𝙾𝚏𝚌: ${r.url}
₊˚‧︵₊୨ᰔ︵‧˚‧︵ᰔ୨₊︵‧˚₊`,
interactiveButtons: [
{ name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "『🎵』𝗕𝗔𝗜𝗫𝗔𝗥 𝗠𝗣3『🎵』", id: `${prefix}systemaudio ${r.videoId}` }) },
{ name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "『🎬』𝗕𝗔𝗜𝗫𝗔𝗥 𝗩𝗜𝗗𝗘𝗢『🎬』", id: `${prefix}systemvideo ${r.videoId}` }) },
],
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
