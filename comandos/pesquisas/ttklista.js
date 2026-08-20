const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'ttklista',
aliases: ['ttklist', 'ttlist', 'tiktoklist', 'pesquisarttlista'],
category: 'pesquisas',
description: 'Lista vários resultados do TikTok pelo termo pesquisado.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📋『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} dança`);
await reagir(from, "📋");
reply(`🔍 *Pesquisando no TikTok (lista): ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/tiktok/search?q=${encodeURIComponent(q.trim())}&limit=5&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.resultados?.length) return reply(`❌ Nenhum resultado encontrado`);
let msg = `🎵 *TIKTOK - ${q}*\n\n`;
data.resultados.forEach((v, i) => {
msg += `${i + 1}. ${v.titulo?.substring(0, 50) || 'Sem título'}\n`;
msg += ` 👤 @${v.autor?.username || 'Desconhecido'}\n`;
msg += ` ❤️ ${v.likes?.toLocaleString() || 0} | 👁️ ${v.views?.toLocaleString() || 0}\n`;
msg += ` 🔗 ${v.video_url}\n\n`;
});
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
