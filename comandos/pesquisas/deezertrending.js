const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'deezertrending',
aliases: ['dztrending', 'deezertop'],
category: 'pesquisas',
description: 'Mostra as músicas em alta no Deezer.',
async execute(ctx) {
const { reply, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
await reagir(from, "📈");
reply("📈 *Buscando músicas em alta no Deezer...*");
try {
const url = `${API_KIMORI_URL}/api/deezer/trending?apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.tracks?.length) return reply(`❌ Nenhuma trending encontrada`);
let msg = `📈 *DEEZER TRENDING*\n\n`;
data.tracks.slice(0, 10).forEach((t, i) => {
msg += `${i + 1}. ${t.title}\n`;
msg += ` 👤 ${t.artist}\n`;
msg += ` ⏱️ ${t.duration}\n`;
if (t.preview) msg += ` 🎧 ${t.preview}\n`;
msg += `\n`;
});
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
