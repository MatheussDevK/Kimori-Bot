import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'pinterestv2',
aliases: ['pinterest2'],
category: 'pesquisas',
description: 'Busca uma imagem no Pinterest (versão 2).',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📌『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} paisagem`);
await reagir(from, "📌");
reply(`🔍 *Buscando no Pinterest V2: ${q}...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/search/pinterest-v2?q=${encodeURIComponent(q.trim())}&limit=10&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.results?.length) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Nenhum resultado encontrado`);
const r = data.results[0];
await kiimorizinha.sendMessage(from, {
image: { url: r.imagem || r.image || r.thumbnail },
caption: `📌 *PINTEREST V2*\n📝 ${r.title || 'Sem título'}\n👤 ${r.fullName || r.username || 'Desconhecido'}\n❤️ ${r.likes?.toLocaleString() || 0} curtidas`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
