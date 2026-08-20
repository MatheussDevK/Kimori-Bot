const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');
const { fetch } = require('../../arquivos/funcoes/functions.js');

module.exports = {
name: 'gpt4omini',
aliases: ['chatgpt4omini', 'openai4omini'],
category: 'ias',
description: 'Conversa rápida com o modelo OpenAI GPT-4o Mini.',
async execute(ctx) {
const { q, reply, reagir, from, prefix, command, emojii, ErroCase, botNome: NomeDoBot } = ctx;
if (!q?.trim()) {
return reply(`⚡『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Explique TypeScript`);
}
await reagir(from, "⚡");
reply(`⚡ *Pensando rapidamente... (GPT-4o Mini)*`);
try {
const url = `${API_KIMORI_URL}/api/ai/openai/gpt4omini?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Falha ao processar'}`);
let msg = `⚡ *OPENAI GPT-4o MINI*\n\n`;
msg += `${data.resposta || 'Sem resposta'}`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
