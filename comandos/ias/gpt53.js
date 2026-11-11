import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'gpt53',
aliases: ['gpt5.3', 'chatgpt53'],
category: 'ias',
description: 'Conversa com o modelo OpenAI GPT-5.3.',
async execute(ctx) {
const { q, reply, reagir, from, prefix, command, emojii, ErroCase, botNome: NomeDoBot } = ctx;
if (!q?.trim()) {
return reply(`💬『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} O que é API REST?`);
}
await reagir(from, "💬");
reply(`💭 *Pensando... (GPT-5.3)*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/ai/openai/gpt53?q=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Falha ao processar'}`);
let msg = `💬 *OPENAI GPT-5.3 CHAT*\n\n`;
msg += `${data.resposta || 'Sem resposta'}`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
