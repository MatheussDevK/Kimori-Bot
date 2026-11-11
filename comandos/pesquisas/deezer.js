import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'deezer',
aliases: ['dz', 'deezersearch'],
category: 'pesquisas',
description: 'Pesquisa uma música no Deezer.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🎵『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Imagine Dragons`);
await reagir(from, "🎵");
reply(`🔍 *Pesquisando no Deezer: ${q}...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/deezer/search?q=${encodeURIComponent(q.trim())}&type=track&limit=5&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.results?.length) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Nenhuma música encontrada`);
let msg = `🎵 *DEEZER - ${q}*\n\n`;
data.results.slice(0, 5).forEach((t, i) => {
msg += `${i + 1}. ${t.title}\n`;
msg += ` 👤 ${t.artist}\n`;
msg += ` 💿 ${t.album}\n`;
msg += ` ⏱️ ${t.duration}\n`;
if (t.preview) msg += ` 🎧 ${t.preview}\n`;
msg += ` 🔗 ${t.link}\n\n`;
});
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
