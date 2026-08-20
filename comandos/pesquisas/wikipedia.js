const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'wikipedia',
aliases: ['pesquisarwiki'],
category: 'pesquisas',
description: 'Pesquisa um verbete na Wikipédia.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📚『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Brasil`);
await reagir(from, "📚");
reply(`🔍 *Pesquisando na Wikipédia: ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/wikipedia/pesquisa?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.resultados?.length) return reply(`❌ Nenhum resultado encontrado para "${q}"`);
const r = data.resultados[0];
let msg = `📚 *WIKIPÉDIA*\n\n`;
msg += `📝 *${r.titulo}*\n\n`;
msg += `${r.descricao || 'Sem descrição disponível'}\n\n`;
msg += `🔗 ${r.url || 'Link indisponível'}`;
if (r.imagem) {
await kiimorizinha.sendMessage(from, { image: { url: r.imagem }, caption: msg }, { quoted: selo });
} else {
await reply(msg);
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
