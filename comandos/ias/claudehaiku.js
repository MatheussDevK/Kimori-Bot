const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');
const { fetch } = require('../../arquivos/funcoes/functions.js');

module.exports = {
name: 'claudehaiku',
aliases: ['claude4.5', 'claudehaiku4.5'],
category: 'ias',
description: 'Conversa rápida com o modelo Claude Haiku 4.5.',
async execute(ctx) {
const { q, reply, reagir, from, prefix, command, emojii, ErroCase, botNome: NomeDoBot } = ctx;
if (!q?.trim()) {
return reply(`📝『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Explique rápido`);
}
await reagir(from, "📝");
reply(`📝 *Pensando rapidamente... (Claude Haiku 4.5)*`);
try {
const url = `${API_KIMORI_URL}/api/ai/claude/haiku?q=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Falha ao processar'}`);
let msg = `📝 *CLAUDE HAIKU 4.5*\n\n`;
msg += `${data.resposta || 'Sem resposta'}`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
