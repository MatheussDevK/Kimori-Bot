import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'deezerartist',
aliases: ['dzartist', 'pesquisarartista'],
category: 'pesquisas',
description: 'Pesquisa um artista no Deezer.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🎤『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Taylor Swift`);
await reagir(from, "🎤");
reply(`🔍 *Pesquisando artista no Deezer: ${q}...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/deezer/search?q=${encodeURIComponent(q.trim())}&type=artist&limit=5&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.results?.length) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Nenhum artista encontrado`);
let msg = `🎤 *DEEZER ARTISTA - ${q}*\n\n`;
data.results.slice(0, 5).forEach((a, i) => {
msg += `${i + 1}. ${a.name}\n`;
if (a.nb_fan) msg += ` 👥 ${a.nb_fan.toLocaleString()} fãs\n`;
if (a.nb_album) msg += ` 💿 ${a.nb_album} álbuns\n`;
msg += ` 🔗 ${a.link}\n\n`;
});
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
