import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'ttktrend',
aliases: ['tttrending', 'tiktoktrending', 'trendingtt'],
category: 'pesquisas',
description: 'Mostra vídeos em alta no TikTok.',
async execute(ctx) {
const { reply, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
await reagir(from, "📈");
reply("📈 *Buscando vídeos em alta no TikTok...*");
try {
const url = `${__json_config.API_KIMORI_URL}/api/tiktok/trending?limit=10&apikey=${__json_config.APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.resultados?.length) return reply(`❌ Nenhum trending encontrado`);
let msg = `📈 *TIKTOK TRENDING*\n\n`;
data.resultados.forEach((v, i) => {
msg += `${i + 1}. ${v.titulo?.substring(0, 40) || 'Sem título'}\n`;
msg += ` 👤 @${v.autor?.username || 'Desconhecido'}\n`;
msg += ` ❤️ ${v.likes?.toLocaleString() || 0} | 👁️ ${v.views?.toLocaleString() || 0}\n\n`;
});
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
