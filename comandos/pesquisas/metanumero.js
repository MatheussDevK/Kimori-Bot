const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'metanumero',
aliases: ['metan', 'mtn'],
category: 'pesquisas',
description: 'Busca um par de metadinha pelo número.',
async execute(ctx) {
const { reply, q, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || isNaN(q.trim())) {
return reply(`🔢 *USE:* ${prefix + command} [número]\n📌 *EXEMPLO:* ${prefix + command} 1\n📌 *EXEMPLO:* ${prefix + command} 50\n\n📋 *Use ${prefix}metalist para ver todos os números disponíveis*`);
}
const numero = parseInt(q.trim());
await reagir(from, "🔢");
reply(`🔄 *Buscando metadinha nº ${numero}...*`);
try {
const url = `${API_KIMORI_URL}/api/metadinha/${numero}?apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Metadinha nº ${numero} não encontrada`);
let msg = `💕 *METADINHA Nº ${data.numero}*\n\n`;
msg += `👤 *Masculina:*\n🔗 ${data.masculina || 'N/A'}\n\n`;
msg += `👩 *Feminina:*\n🔗 ${data.feminina || 'N/A'}`;
if (data.masculina) {
await kiimorizinha.sendMessage(from, {
image: { url: data.masculina },
caption: msg
}, { quoted: selo });
} else {
await reply(msg);
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
