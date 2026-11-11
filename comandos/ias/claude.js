import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'claude',
aliases: ['claude4.8', 'claudeopus4.8'],
category: 'ias',
description: 'Conversa com o modelo Claude Opus 4.8.',
async execute(ctx) {
const { q, reply, reagir, from, prefix, command, emojii, ErroCase, botNome: NomeDoBot } = ctx;
if (!q?.trim()) {
return reply(`🧠『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Explique código`);
}
await reagir(from, "🧠");
reply(`💭 *Pensando... (Claude Opus 4.8)*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/ai/claude/opus48?q=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Falha ao processar'}`);
let msg = `🧠 *CLAUDE OPUS 4.8*\n\n`;
msg += `${data.resposta || 'Sem resposta'}`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
