const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'qrcode',
aliases: ['gerarqr', 'qr'],
category: 'pesquisas',
description: 'Gera um QR Code a partir de um texto/link.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📱『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://google.com`);
await reagir(from, "📱");
reply("🔄 *Gerando QR Code...*");
try {
const url = `${API_KIMORI_URL}/api/qrcode?text=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
if (!response.ok) return reply(`❌ Erro ao gerar QR Code`);
const buffer = await response.buffer();
await kiimorizinha.sendMessage(from, {
image: buffer,
caption: `📱 *QR CODE*\n📝 ${q.trim()}`
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
