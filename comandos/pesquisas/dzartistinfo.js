import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'dzartistinfo',
aliases: ['deezerartistinfo'],
category: 'pesquisas',
description: 'Mostra informações de um artista do Deezer pelo ID.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || isNaN(q)) {
return reply(`ℹ️『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} 13`);
}
await reagir(from, "ℹ️");
reply(`🔍 *Buscando informações do artista...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/deezer/artist?id=${q.trim()}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.artist) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Artista não encontrado`);
const a = data.artist;
let msg = `🎤 *${a.name}*\n\n`;
if (a.picture) msg += `🖼️ ${a.picture}\n`;
if (a.nb_fan) msg += `👥 ${a.nb_fan.toLocaleString()} fãs\n`;
if (a.nb_album) msg += `💿 ${a.nb_album} álbuns\n`;
msg += `🔗 ${a.link}\n\n`;
if (data.top_tracks?.length) {
msg += `🎵 *TOP MÚSICAS*\n`;
data.top_tracks.slice(0, 5).forEach((t, i) => {
msg += `${i + 1}. ${t.title} (${t.duration})\n`;
});
}
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
