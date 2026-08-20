const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'pinterestv2',
aliases: ['pinterest2'],
category: 'pesquisas',
description: 'Busca uma imagem no Pinterest (versão 2).',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📌『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} paisagem`);
await reagir(from, "📌");
reply(`🔍 *Buscando no Pinterest V2: ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/search/pinterest-v2?q=${encodeURIComponent(q.trim())}&limit=10&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.results?.length) return reply(`❌ Nenhum resultado encontrado`);
const r = data.results[0];
await kiimorizinha.sendMessage(from, {
image: { url: r.image || r.thumbnail },
caption: `📌 *PINTEREST V2*\n📝 ${r.title || 'Sem título'}\n👤 ${r.fullName || r.username || 'Desconhecido'}\n❤️ ${r.likes?.toLocaleString() || 0} curtidas`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
