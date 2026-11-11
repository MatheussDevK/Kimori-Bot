import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'deezertrending',
aliases: ['dztrending', 'deezertop'],
category: 'pesquisas',
description: 'Mostra as músicas em alta no Deezer.',
async execute(ctx) {
const { reply, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
await reagir(from, "📈");
reply("📈 *Buscando músicas em alta no Deezer...*");
try {
const url = `${__json_config.API_KIMORI_URL}/api/deezer/trending?apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.tracks?.length) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Nenhuma trending encontrada`);
let msg = `📈 *DEEZER TRENDING*\n\n`;
data.tracks.slice(0, 10).forEach((t, i) => {
msg += `${i + 1}. ${t.title}\n`;
msg += ` 👤 ${t.artist}\n`;
msg += ` ⏱️ ${t.duration}\n`;
if (t.preview) msg += ` 🎧 ${t.preview}\n`;
msg += `\n`;
});
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
