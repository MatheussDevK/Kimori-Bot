const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'animev2',
aliases: ['animeinfov2', 'pesquisaranimev2'],
category: 'pesquisas',
description: 'Pesquisa informações de um anime (versão 2).',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🎌『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} naruto`);
await reagir(from, "🎌");
reply(`🔍 *Pesquisando anime V2: ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/v2/search/anime?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (data.status !== 200 || !data.resultados?.length) return reply(`❌ Nenhum anime encontrado para "${q}"`);
let msg = `🎌 *ANIME V2 - ${q.toUpperCase()}*\n\n`;
data.resultados.slice(0, 5).forEach((a, i) => {
msg += `${i + 1}. *${a.titulo}*\n`;
if (a.episodios) msg += ` 📺 ${a.episodios} episódios\n`;
if (a.status) msg += ` 📌 ${a.status}\n`;
if (a.link) msg += ` 🔗 ${a.link}\n\n`;
});
if (data.resultados[0]?.imagem) {
await kiimorizinha.sendMessage(from, { image: { url: data.resultados[0].imagem }, caption: msg }, { quoted: selo });
} else {
await reply(msg);
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
