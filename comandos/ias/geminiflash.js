const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');
const { fetch } = require('../../arquivos/funcoes/functions.js');

module.exports = {
name: 'geminiflash',
aliases: ['gemini3.1flash', 'geminilite'],
category: 'ias',
description: 'Conversa rápida com o modelo Google Gemini 3.1 Flash Lite.',
async execute(ctx) {
const { q, reply, reagir, from, prefix, command, emojii } = ctx;
if (!q?.trim()) {
return reply(`⚡『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Resposta rápida`);
}
await reagir(from, "⚡");
reply(`⚡ *Pensando rapidamente... (Gemini 3.1 Flash Lite)*`);
try {
const url = `${API_KIMORI_URL}/api/ai/gemini/flashlite?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Falha ao processar'}`);
let msg = `⚡ *GOOGLE GEMINI 3.1 FLASH LITE*\n\n`;
msg += `${data.resposta || 'Sem resposta'}`;
await reply(msg);
} catch (e) {
console.error(e);
reply(`❌ Erro ao processar pergunta`);
}
},
};
