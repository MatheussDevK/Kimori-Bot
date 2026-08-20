const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'dzalbuminfo',
aliases: ['deezeralbuminfo'],
category: 'pesquisas',
description: 'Mostra informações de um álbum do Deezer pelo ID.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || isNaN(q)) {
return reply(`ℹ️『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} 11089666`);
}
await reagir(from, "ℹ️");
reply(`🔍 *Buscando informações do álbum...*`);
try {
const url = `${API_KIMORI_URL}/api/deezer/album?id=${q.trim()}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.album) return reply(`❌ Álbum não encontrado`);
const a = data.album;
let msg = `💿 *${a.title}*\n\n`;
msg += `👤 ${a.artist}\n`;
if (a.release_date) msg += `📅 ${a.release_date}\n`;
if (a.nb_tracks) msg += `🎵 ${a.nb_tracks} faixas\n`;
if (a.duration) msg += `⏱️ ${a.duration}\n`;
msg += `🔗 ${a.link}\n\n`;
if (a.tracks?.length) {
msg += `🎵 *FAIXAS*\n`;
a.tracks.forEach((t, i) => {
msg += `${i + 1}. ${t.title} (${t.duration})\n`;
});
}
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
