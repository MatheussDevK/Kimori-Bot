import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'multi',
aliases: ['multidl', 'savefrom'],
category: 'downloads',
description: 'Processa um link genérico e mostra links de download de várias qualidades.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) {
return reply(`📥『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://vt.tiktok.com/ZSQSq47x9/`);
}
reply("*Processando link...*" + emojii);
try {
const url = `${__json_config.API_KIMORI_URL}/api/download/multi?url=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Não foi possível processar'}`);
let msg = `📥 *MULTI DOWNLOAD*

📝 ${data.title || 'N/A'}
${data.duration ? `⏱️ ${data.duration}\n` : ''}
📥 *Links:*\n`;
data.medias?.forEach((m, i) => {
msg += `${i + 1}. ${m.qualidade || 'N/A'} - ${m.tipo || 'N/A'}
🔗 ${m.url}\n\n`;
});
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
