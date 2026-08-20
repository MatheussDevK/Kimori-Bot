const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'diciov2',
aliases: ['dicionariov2', 'significadov2'],
category: 'pesquisas',
description: 'Busca o significado de uma palavra (versão 2).',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📚『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} amor`);
await reagir(from, "📚");
reply(`🔍 *Buscando "${q}" no dicionário V2...*`);
try {
const url = `${API_KIMORI_URL}/api/v2/search/dicionario?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.significado) return reply(`❌ Palavra "${q}" não encontrada`);
await reply(`📚 *${data.palavra?.toUpperCase()}*\n\n📝 ${data.significado}`);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
