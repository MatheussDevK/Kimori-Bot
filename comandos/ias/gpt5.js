const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');
const { fetch } = require('../../arquivos/funcoes/functions.js');

module.exports = {
name: 'gpt5.0',
aliases: ['chatgpt5', 'openai5'],
category: 'ias',
description: 'Conversa com o modelo OpenAI GPT-5.0.',
async execute(ctx) {
const { q, reply, reagir, from, prefix, command, emojii, ErroCase, botNome: NomeDoBot } = ctx;
if (!q?.trim()) {
return reply(`💬『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} O que é Node.js?`);
}
await reagir(from, "💬");
reply(`💭 *Pensando... (GPT-5.0)*`);
try {
const url = `${API_KIMORI_URL}/api/ai/openai/gpt5?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Falha ao processar'}`);
let msg = `💬 *OPENAI GPT-5*\n\n`;
msg += `${data.resposta || 'Sem resposta'}`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
