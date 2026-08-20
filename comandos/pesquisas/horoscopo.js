const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'horoscopo',
aliases: ['horóscopo', 'signo'],
category: 'pesquisas',
description: 'Mostra o horóscopo de um signo.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) {
return reply(`⭐『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} touro\n\n📋 *Signos disponíveis:*\naries, touro, gemeos, cancer, leao, virgem, libra, escorpiao, sagitario, capricornio, aquario, peixes`);
}
await reagir(from, "⭐");
reply(`🔮 *Buscando horóscopo para ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/search/horoscopo?signo=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Signo "${q}" não encontrado\n\n📋 *Signos disponíveis:*\naries, touro, gemeos, cancer, leao, virgem, libra, escorpiao, sagitario, capricornio, aquario, peixes`);
const h = data.data;
let msg = `⭐ *HORÓSCOPO - ${h.signo?.toUpperCase()}*\n`;
msg += `📅 ${h.dia || new Date().toLocaleDateString('pt-BR')}\n\n`;
msg += `${h.previsao || 'Previsão não disponível'}\n\n`;
msg += `🔗 ${h.url || 'Fonte: Horóscopo Virtual'}`;
if (h.imagem) {
await kiimorizinha.sendMessage(from, { image: { url: h.imagem }, caption: msg }, { quoted: selo });
} else {
await reply(msg);
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
