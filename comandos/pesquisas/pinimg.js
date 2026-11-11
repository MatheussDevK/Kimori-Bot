import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'pinimg',
aliases: ['pinterestimg', 'pinimages'],
category: 'pesquisas',
description: 'Busca imagens no Pinterest.',
async execute(ctx) {
const { reply, q, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome, emojii } = ctx;
if (!q?.trim()) return reply(`🖼️ 『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} gatos`);
await reagir(from, "🖼️");
reply(`🔍 *Buscando imagens no Pinterest: ${q}...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/search/pinterest-images?q=${encodeURIComponent(q.trim())}&limit=1&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.results?.length) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Nenhuma imagem encontrada`);
const r = data.results[0];
await kiimorizinha.sendMessage(from, {
image: { url: r.imagem || r.image || r.thumbnail },
caption: `🖼️ *PINTEREST IMAGEM*\n📝 ${r.title || 'Sem título'}\n👤 ${r.fullName || r.username || 'Desconhecido'}`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
