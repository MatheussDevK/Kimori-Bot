const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'deezeralbum',
aliases: ['dzalbum', 'pesquisaralbum'],
category: 'pesquisas',
description: 'Pesquisa um álbum no Deezer.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`💿『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Billie Eilish`);
await reagir(from, "💿");
reply(`🔍 *Pesquisando álbum no Deezer: ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/deezer/search?q=${encodeURIComponent(q.trim())}&type=album&limit=5&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.results?.length) return reply(`❌ Nenhum álbum encontrado`);
let msg = `💿 *DEEZER ÁLBUM - ${q}*\n\n`;
data.results.slice(0, 5).forEach((a, i) => {
msg += `${i + 1}. ${a.title}\n`;
msg += ` 👤 ${a.artist}\n`;
if (a.release_date) msg += ` 📅 ${a.release_date}\n`;
if (a.nb_tracks) msg += ` 🎵 ${a.nb_tracks} faixas\n`;
msg += ` 🔗 ${a.link}\n\n`;
});
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
