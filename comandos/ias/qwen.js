const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');
const { fetch } = require('../../arquivos/funcoes/functions.js');

module.exports = {
name: 'qwen',
aliases: ['qwen3', 'qwen3.0', 'qwen3.0max', 'qwenmax', 'qwen3max'],
category: 'ias',
description: 'Conversa com o modelo Alibaba Qwen 3 Max.',
async execute(ctx) {
const { q, reply, reagir, from, prefix, command, emojii, ErroCase, botNome: NomeDoBot } = ctx;
if (!q?.trim()) {
return reply(`☁️『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} O que é API REST?`);
}
await reagir(from, "☁️");
reply(`💭 *Pensando... (Qwen 3 Max)*`);
try {
const url = `${API_KIMORI_URL}/api/ai/qwen/max?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Falha ao processar'}`);
let msg = `☁️ *ALIBABA QWEN 3 MAX*\n\n`;
msg += `${data.resposta || 'Sem resposta'}`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
