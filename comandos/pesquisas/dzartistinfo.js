const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'dzartistinfo',
aliases: ['deezerartistinfo'],
category: 'pesquisas',
description: 'Mostra informações de um artista do Deezer pelo ID.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || isNaN(q)) {
return reply(`ℹ️『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} 13`);
}
await reagir(from, "ℹ️");
reply(`🔍 *Buscando informações do artista...*`);
try {
const url = `${API_KIMORI_URL}/api/deezer/artist?id=${q.trim()}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.artist) return reply(`❌ Artista não encontrado`);
const a = data.artist;
let msg = `🎤 *${a.name}*\n\n`;
if (a.picture) msg += `🖼️ ${a.picture}\n`;
if (a.nb_fan) msg += `👥 ${a.nb_fan.toLocaleString()} fãs\n`;
if (a.nb_album) msg += `💿 ${a.nb_album} álbuns\n`;
msg += `🔗 ${a.link}\n\n`;
if (data.top_tracks?.length) {
msg += `🎵 *TOP MÚSICAS*\n`;
data.top_tracks.slice(0, 5).forEach((t, i) => {
msg += `${i + 1}. ${t.title} (${t.duration})\n`;
});
}
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
