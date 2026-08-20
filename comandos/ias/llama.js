const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');
const { fetch } = require('../../arquivos/funcoes/functions.js');

module.exports = {
name: 'llama',
aliases: ['llama4', 'llama4.0', 'maverick'],
category: 'ias',
description: 'Conversa com o modelo Meta Llama 4 Maverick.',
async execute(ctx) {
const { q, reply, reagir, from, prefix, command, emojii, ErroCase, botNome: NomeDoBot } = ctx;
if (!q?.trim()) {
return reply(`🦙『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} O que é JavaScript?`);
}
await reagir(from, "🦙");
reply(`💭 *Pensando... (Llama 4 Maverick)*`);
try {
const url = `${API_KIMORI_URL}/api/ai/llama/maverick?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Falha ao processar'}`);
let msg = `🦙 *META LLAMA 4 MAVERICK*\n\n`;
msg += `${data.resposta || 'Sem resposta'}`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
