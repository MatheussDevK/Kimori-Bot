import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'animev2',
aliases: ['animeinfov2', 'pesquisaranimev2'],
category: 'pesquisas',
description: 'Pesquisa informações de um anime (versão 2).',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🎌『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} naruto`);
await reagir(from, "🎌");
reply(`🔍 *Pesquisando anime V2: ${q}...*`);
try {
const data = await apiJson('/api/search/anime2', { q: q.trim() });
if (!data.success) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Erro: ${apiErro(data, 'Falha na pesquisa')}`);
if (!data.resultados?.length) return reply(`❌ Nenhum anime encontrado para "${q}"`);
let msg = `🎌 *ANIME V2 - ${q.toUpperCase()}*\n\n`;
data.resultados.slice(0, 5).forEach((a, i) => {
msg += `${i + 1}. *${a.titulo}*\n`;
if (a.episodios) msg += ` 📺 ${a.episodios} episódios\n`;
if (a.status) msg += ` 📌 ${a.status}\n`;
if (a.nota) msg += ` ⭐ ${a.nota}\n`;
if (a.descricao) msg += ` 📝 ${a.descricao}\n`;
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
