import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'kimi',
aliases: ['kimi26', 'kimi2.6', 'moonshot'],
category: 'ias',
description: 'Conversa com o modelo Moonshot Kimi K2.6.',
async execute(ctx) {
const { q, reply, reagir, from, prefix, command, emojii, ErroCase, botNome: NomeDoBot } = ctx;
if (!q?.trim()) {
return reply(`⭐『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Explique TypeScript`);
}
await reagir(from, "⭐");
reply(`💭 *Pensando... (Kimi K2.6)*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/ai/kimi/k26?q=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Falha ao processar'}`);
let msg = `⭐ *MOONSHOT KIMI K2.6*\n\n`;
msg += `${data.resposta || 'Sem resposta'}`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
