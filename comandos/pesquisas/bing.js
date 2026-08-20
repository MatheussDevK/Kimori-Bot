const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'bing',
aliases: ['bingimg', 'bingimagens'],
category: 'pesquisas',
description: 'Busca uma imagem aleatória no Bing.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🖼️『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} gatos`);
await reagir(from, "🖼️");
reply(`🔍 *Buscando imagens no Bing: ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/search/bing?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.imagens?.length) return reply(`❌ Nenhuma imagem encontrada para "${q}"`);
const randomImg = data.imagens[Math.floor(Math.random() * data.imagens.length)];
await kiimorizinha.sendMessage(from, {
image: { url: randomImg },
caption: `🖼️ *BING IMAGENS*\n🔍 ${q}`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
