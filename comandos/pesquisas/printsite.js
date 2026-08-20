const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'printsite',
aliases: ['ssweb'],
category: 'pesquisas',
description: 'Tira um screenshot de um site.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📸『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://google.com`);
await reagir(from, "📸");
reply("🖼️ *Gerando screenshot do site...*");
try {
const url = `${API_KIMORI_URL}/api/screenshotweb?url=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
if (!response.ok) return reply(`❌ Erro ao gerar screenshot`);
const buffer = await response.buffer();
await kiimorizinha.sendMessage(from, {
image: buffer,
caption: `📸 *Screenshot*\n🔗 ${q.trim()}`
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
