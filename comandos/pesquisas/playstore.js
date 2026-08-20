const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'playstore',
aliases: ['ps', 'pesquisarplay'],
category: 'pesquisas',
description: 'Busca um app na Play Store.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📱『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} spotify`);
await reagir(from, "📱");
reply(`🔍 *Buscando na Play Store: ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/search/playstore?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.resultado?.length) return reply(`❌ Nenhum app encontrado para "${q}"`);
let msg = `📱 *PLAY STORE - ${q}*\n\n`;
data.resultado.slice(0, 5).forEach((app, i) => {
msg += `${i + 1}. *${app.nome}*\n`;
msg += ` 👤 ${app.desenvolvedor || 'Desconhecido'}\n`;
if (app.estrelas) msg += ` ⭐ ${app.estrelas} estrelas\n`;
if (app.link) msg += ` 🔗 ${app.link}\n\n`;
});
if (data.resultado[0]?.imagem) {
await kiimorizinha.sendMessage(from, { image: { url: data.resultado[0].imagem }, caption: msg }, { quoted: selo });
} else {
await reply(msg);
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
