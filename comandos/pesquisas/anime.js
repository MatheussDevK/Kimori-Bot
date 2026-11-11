import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'anime',
aliases: ['animeinfo', 'pesquisaranime'],
category: 'pesquisas',
description: 'Pesquisa informações de um anime.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🎌『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} one piece`);
await reagir(from, "🎌");
reply(`🔍 *Pesquisando anime: ${q}...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/search/anime?q=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.resultados?.length) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Nenhum anime encontrado para "${q}"`);
let msg = `🎌 *ANIME - ${q.toUpperCase()}*\n\n`;
data.resultados.slice(0, 5).forEach((a, i) => {
msg += `${i + 1}. *${a.titulo}*\n`;
if (a.descricao) msg += ` 📝 ${a.descricao.substring(0, 100)}...\n`;
if (a.episodios) msg += ` 📺 ${a.episodios} episódios\n`;
if (a.status) msg += ` 📌 ${a.status}\n`;
if (a.nota) msg += ` ⭐ ${a.nota}\n`;
if (a.link) msg += ` 🔗 ${a.link}\n\n`;
});
if (data.resultados[0]?.imagem) {
await kiimorizinha.sendMessage(from, { image: { url: data.resultados[0].imagem }, caption: msg }, { quoted: selo });
} else {
await reply(msg);
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
