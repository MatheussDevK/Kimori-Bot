const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'figurinhas2',
category: 'figurinhas',
description: 'Envia N figurinhas aleatórias do Pack 2 (API Kimori).',
async execute(ctx) {
const { reply, args, axios, kiimorizinha, from, selo } = ctx;

try {
let qtd = parseInt(args[0]) || 1;
if (qtd > 10) qtd = 10;
await reply(`*Enviando ${qtd} figurinha(s) Pack 2*`);
for (let i = 0; i < qtd; i++) {
const response = await axios.get(`${API_KIMORI_URL}/api/figurinhas2?apikey=${APIKEY_KIMORI}`, {
responseType: 'arraybuffer'});
await kiimorizinha.sendMessage(from, { sticker: response.data }, { quoted: selo });
await new Promise(resolve => setTimeout(resolve, 500));}
} catch (err) {
console.log(err);
reply(`『❌』Erro ao processar: ${err}, verifique o terminal ou ${API_KIMORI_URL}/dash`);}
},
};
