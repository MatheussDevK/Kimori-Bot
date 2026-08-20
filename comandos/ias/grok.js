const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');
const { fetch } = require('../../arquivos/funcoes/functions.js');

module.exports = {
name: 'grok',
aliases: ['grok4.1', 'grokai'],
category: 'ias',
description: 'Conversa com o modelo xAI Grok 4.1 Fast.',
async execute(ctx) {
const { q, reply, reagir, from, prefix, command, emojii, ErroCase, botNome: NomeDoBot } = ctx;
if (!q?.trim()) {
return reply(`🐦『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} O que é inteligência artificial?`);
}
await reagir(from, "🐦");
reply(`💭 *Pensando... (Grok 4.1 Fast)*`);
try {
const url = `${API_KIMORI_URL}/api/ai/grok/fast?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Falha ao processar'}`);
let msg = `🐦 *XAI GROK 4.1 FAST*\n\n`;
msg += `${data.resposta || 'Sem resposta'}`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
