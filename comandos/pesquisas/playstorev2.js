const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'playstorev2',
aliases: ['psv2', 'pesquisarplayv2'],
category: 'pesquisas',
description: 'Busca um app na Play Store (versão 2).',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📱『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} whatsapp`);
await reagir(from, "📱");
reply(`🔍 *Buscando na Play Store V2: ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/v2/search/playstore?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (data.status !== 200 || !data.resultado?.length) return reply(`❌ Nenhum app encontrado para "${q}"`);
let msg = `📱 *PLAY STORE V2 - ${q}*\n\n`;
data.resultado.slice(0, 5).forEach((app, i) => {
msg += `${i + 1}. *${app.nome}*\n`;
if (app.desenvolvedor) msg += ` 👤 ${app.desenvolvedor}\n`;
if (app.estrelas) msg += ` ⭐ ${app.estrelas} estrelas\n`;
if (app.link) msg += ` 🔗 ${app.link}\n\n`;
});
if (data.resultado[0]?.imagem) {
await kiimorizinha.sendMessage(from, { image: { url: data.resultado[0].imagem }, caption: msg }, { quoted: selo });
} else {
await reply(msg);
}
await reagir(from, "✅");
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
