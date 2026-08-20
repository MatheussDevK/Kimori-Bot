const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');
const { getBuffer } = require('../../arquivos/funcoes/functions.js');

module.exports = {
name: 'plaq3',
category: 'plaquinhas',
description: 'Gera uma plaquinha personalizada (modelo 3).',
async execute(ctx) {
const { reply, mess, isGroup, args, q, reagir, from, kiimorizinha, sender, selo, pushname, command, prefix } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (args.length < 1) return reply('❕Ei humano, cadê o texto?');
if (q.length > 25) return reply('❗O texto é longo, o máximo é 25 caracteres.');
await reagir(from, "🔞");
try {
const buffer = await getBuffer(`${API_KIMORI_URL}/api/plaq3?query=${encodeURIComponent(q)}&apikey=${APIKEY_KIMORI}`);
if (!buffer || buffer.length < 100) {
return reply(`😓 Sua API Key expirou ou não foi renovada. Adquira uma nova em: ${API_KIMORI_URL}/store`);
}
await kiimorizinha.sendMessage(sender, { image: buffer }, { quoted: selo });
await reply(`> Plaquinha enviada no seu PV, ${pushname}! 😈🔥`);
} catch (error) {
console.error('[ Erro ] na plaq3:', error);
reply(`Ocorreu um erro no ${prefix + command}! Verifique o terminal, ou o site da API: ${API_KIMORI_URL}`);
}
},
};
