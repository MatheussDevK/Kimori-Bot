const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'dzinfo',
aliases: ['deezerinfo', 'deezertrack'],
category: 'pesquisas',
description: 'Mostra informações de uma faixa do Deezer pelo ID.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || isNaN(q)) {
return reply(`ℹ️『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} 131730431`);
}
await reagir(from, "ℹ️");
reply(`🔍 *Buscando informações da música...*`);
try {
const url = `${API_KIMORI_URL}/api/deezer/track?id=${q.trim()}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.track) return reply(`❌ Música não encontrada`);
const t = data.track;
let msg = `🎵 *${t.title}*\n\n`;
msg += `👤 ${t.artist}\n`;
msg += `💿 ${t.album}\n`;
msg += `⏱️ ${t.duration}\n`;
if (t.preview) msg += `🎧 ${t.preview}\n`;
msg += `🔗 ${t.link}`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
