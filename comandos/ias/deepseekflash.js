const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');
const { fetch } = require('../../arquivos/funcoes/functions.js');

module.exports = {
name: 'deepseekflash',
aliases: ['deepseekv4flash'],
category: 'ias',
description: 'Conversa rápida com o modelo DeepSeek V4 Flash.',
async execute(ctx) {
const { q, reply, reagir, from, prefix, command, emojii, ErroCase, botNome: NomeDoBot } = ctx;
if (!q?.trim()) {
return reply(`⚡『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Explique rápido`);
}
await reagir(from, "⚡");
reply(`⚡ *Pensando rapidamente... (DeepSeek V4 Flash)*`);
try {
const url = `${API_KIMORI_URL}/api/ai/deepseek/flash?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Falha ao processar'}`);
let msg = `⚡ *DEEPSEEK V4 FLASH*\n\n`;
msg += `${data.resposta || 'Sem resposta'}`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
