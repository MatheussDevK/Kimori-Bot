import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'twitterv2',
aliases: ['twitv2', 'twitterinfo'],
category: 'downloads',
description: 'Mostra informações e mídias de um tweet.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || (!q.includes('twitter.com') && !q.includes('x.com'))) {
return reply(`🐦『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://x.com/i/status/2059213532265324581`);
}
reply("*Buscando informações do tweet...*" + emojii);
try {
const url = `${__json_config.API_KIMORI_URL}/api/twitter/v2?url=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success) return reply(`❌ Erro: ${data.error || 'Tweet não encontrado'}`);
let msg = `🐦 *TWEET INFO*\n\n`;
msg += `👤 @${data.author?.username || 'Desconhecido'}\n`;
msg += `📝 ${data.text?.substring(0, 200) || ''}\n\n`;
msg += `❤️ ${data.stats?.likes || 0} likes | 🔁 ${data.stats?.retweets || 0} retweets | 👁️ ${data.stats?.views || 0} views`;
if (data.media?.length > 0) {
msg += `\n\n📎 ${data.media.length} mídia(s)`;
data.media.forEach((m, i) => {
msg += `\n ${i + 1}. ${m.type} - ${m.download_url || 'N/A'}`;
});
}
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
