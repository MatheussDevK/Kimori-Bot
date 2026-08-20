const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'pinimg',
aliases: ['pinterestimg', 'pinimages'],
category: 'pesquisas',
description: 'Busca imagens no Pinterest.',
async execute(ctx) {
const { reply, q, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome, emojii } = ctx;
if (!q?.trim()) return reply(`🖼️ 『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} gatos`);
await reagir(from, "🖼️");
reply(`🔍 *Buscando imagens no Pinterest: ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/search/pinterest-images?q=${encodeURIComponent(q.trim())}&limit=1&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.results?.length) return reply(`❌ Nenhuma imagem encontrada`);
const r = data.results[0];
await kiimorizinha.sendMessage(from, {
image: { url: r.image || r.thumbnail },
caption: `🖼️ *PINTEREST IMAGEM*\n📝 ${r.title || 'Sem título'}\n👤 ${r.fullName || r.username || 'Desconhecido'}`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
