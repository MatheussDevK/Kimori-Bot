const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'pinterest',
aliases: ['pinsearch'],
category: 'pesquisas',
description: 'Busca uma imagem no Pinterest (com botão pra próxima).',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, sendInteractiveMessage, pushname, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📌『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} paisagem`);
await reagir(from, emojii);
try {
const pesquisa = q.trim();
const url = `${API_KIMORI_URL}/api/search/pinterest?q=${encodeURIComponent(pesquisa)}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.data?.imagem) return reply(`❌ Nenhuma imagem encontrada.`);
await sendInteractiveMessage(kiimorizinha, from, {
image: { url: data.data.imagem },
text: `📌 *PINTEREST*\n🔍 ${pesquisa}\n👤 Solicitado por: ${pushname}`,
interactiveButtons: [{
name: "quick_reply",
buttonParamsJson: JSON.stringify({ display_text: "Próxima", id: prefix + `pinterest ${pesquisa}` }),
}],
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
