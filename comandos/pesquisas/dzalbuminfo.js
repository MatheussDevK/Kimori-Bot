import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'dzalbuminfo',
aliases: ['deezeralbuminfo'],
category: 'pesquisas',
description: 'Mostra informações de um álbum do Deezer pelo ID.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || isNaN(q)) {
return reply(`ℹ️『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} 11089666`);
}
await reagir(from, "ℹ️");
reply(`🔍 *Buscando informações do álbum...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/deezer/album?id=${q.trim()}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.album) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Álbum não encontrado`);
const a = data.album;
let msg = `💿 *${a.title}*\n\n`;
msg += `👤 ${a.artist}\n`;
if (a.release_date) msg += `📅 ${a.release_date}\n`;
if (a.nb_tracks) msg += `🎵 ${a.nb_tracks} faixas\n`;
if (a.duration) msg += `⏱️ ${a.duration}\n`;
msg += `🔗 ${a.link}\n\n`;
if (a.tracks?.length) {
msg += `🎵 *FAIXAS*\n`;
a.tracks.forEach((t, i) => {
msg += `${i + 1}. ${t.title} (${t.duration})\n`;
});
}
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
