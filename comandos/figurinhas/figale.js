const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'figale',
aliases: [
'figemoji', 'figflork', 'figmemes', 'figanime', 'figcoreana',
'figbebe', 'figdesenho', 'figanimais', 'figengracada', 'figraiva', 'figroblox',
],
category: 'figurinhas',
description: 'Envia N figurinhas aleatórias de um tema específico (API Kimori).',
async execute(ctx) {
const { reply, args, command, kiimorizinha, from, selo } = ctx;

try {
let qtd = parseInt(args[0]) || 1;
if (qtd > 5) qtd = 5;
await reply(`*Enviando ${qtd} figurinha(s)*`);
for (let i = 0; i < qtd; i++) {
const response = await fetch(`${API_KIMORI_URL}/api/sticker/${command}?apikey=${APIKEY_KIMORI}`);
if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
const buffer = await response.arrayBuffer();
await kiimorizinha.sendMessage(from, { sticker: Buffer.from(buffer) }, { quoted: selo });
await new Promise(resolve => setTimeout(resolve, 500));
}
} catch (err) {
console.error(err);
reply(`『❌』Erro ao processar: ${err.message}`);
}
},
};
