const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'clima',
aliases: ['tempo', 'previsao'],
category: 'pesquisas',
description: 'Mostra a previsão do tempo de uma cidade.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) {
return reply(`🌤️『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} São Paulo`);
}
await reagir(from, "🌤️");
reply(`🔄 *Consultando o clima em ${q}...*`);
try {
const url = `${API_KIMORI_URL}/api/clima?cidade=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Cidade "${q}" não encontrada`);
let msg = `🌤️ *CLIMA - ${data.cidade || q}*\n\n`;
msg += `🌡️ *Temperatura:* ${data.temperatura || 'N/A'}\n`;
if (data.sensacao) msg += `🥵 *Sensação:* ${data.sensacao}\n`;
msg += `☁️ *Condição:* ${data.condicao || 'N/A'}\n`;
if (data.umidade) msg += `💧 *Umidade:* ${data.umidade}\n`;
if (data.vento) msg += `💨 *Vento:* ${data.vento}\n`;
if (data.maxima) msg += `📈 *Máxima:* ${data.maxima}\n`;
if (data.minima) msg += `📉 *Mínima:* ${data.minima}\n`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
