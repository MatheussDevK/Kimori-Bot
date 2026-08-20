const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'deezerartist',
aliases: ['dzartist', 'pesquisarartista'],
category: 'pesquisas',
description: 'Pesquisa um artista no Deezer.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🎤『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Taylor Swift`);
await reagir(from, "🎤");
reply(`🔍 *Pesquisando artista no Deezer: ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/deezer/search?q=${encodeURIComponent(q.trim())}&type=artist&limit=5&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.results?.length) return reply(`❌ Nenhum artista encontrado`);
let msg = `🎤 *DEEZER ARTISTA - ${q}*\n\n`;
data.results.slice(0, 5).forEach((a, i) => {
msg += `${i + 1}. ${a.name}\n`;
if (a.nb_fan) msg += ` 👥 ${a.nb_fan.toLocaleString()} fãs\n`;
if (a.nb_album) msg += ` 💿 ${a.nb_album} álbuns\n`;
msg += ` 🔗 ${a.link}\n\n`;
});
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
