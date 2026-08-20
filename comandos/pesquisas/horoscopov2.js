const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'horoscopov2',
aliases: ['horóscopov2', 'signov2'],
category: 'pesquisas',
description: 'Mostra o horóscopo de um signo (versão 2).',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) {
return reply(`⭐『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} aries\n\n📋 *Signos disponíveis:*\naries, touro, gemeos, cancer, leao, virgem, libra, escorpiao, sagitario, capricornio, aquario, peixes`);
}
await reagir(from, "⭐");
reply(`🔮 *Buscando horóscopo V2 para ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/v2/search/horoscopo?signo=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (data.status !== 200) return reply(`❌ Signo "${q}" não encontrado\n\n📋 *Signos disponíveis:*\naries, touro, gemeos, cancer, leao, virgem, libra, escorpiao, sagitario, capricornio, aquario, peixes`);
let msg = `⭐ *HORÓSCOPO V2 - ${data.signo?.toUpperCase()}*\n`;
msg += `📅 ${data.data || new Date().toLocaleDateString('pt-BR')}\n\n`;
msg += `${data.previsao || 'Previsão não disponível'}`;
if (data.imagem) {
await kiimorizinha.sendMessage(from, { image: { url: data.imagem }, caption: msg }, { quoted: selo });
} else {
await reply(msg);
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
