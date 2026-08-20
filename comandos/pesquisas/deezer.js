const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'deezer',
aliases: ['dz', 'deezersearch'],
category: 'pesquisas',
description: 'Pesquisa uma música no Deezer.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🎵『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Imagine Dragons`);
await reagir(from, "🎵");
reply(`🔍 *Pesquisando no Deezer: ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/deezer/search?q=${encodeURIComponent(q.trim())}&type=track&limit=5&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.results?.length) return reply(`❌ Nenhuma música encontrada`);
let msg = `🎵 *DEEZER - ${q}*\n\n`;
data.results.slice(0, 5).forEach((t, i) => {
msg += `${i + 1}. ${t.title}\n`;
msg += ` 👤 ${t.artist}\n`;
msg += ` 💿 ${t.album}\n`;
msg += ` ⏱️ ${t.duration}\n`;
if (t.preview) msg += ` 🎧 ${t.preview}\n`;
msg += ` 🔗 ${t.link}\n\n`;
});
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
