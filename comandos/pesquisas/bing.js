import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'bing',
aliases: ['bingimg', 'bingimagens'],
category: 'pesquisas',
description: 'Busca uma imagem aleatória no Bing.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`🖼️『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} gatos`);
await reagir(from, "🖼️");
reply(`🔍 *Buscando imagens no Bing: ${q}...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/search/bing?q=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.imagens?.length) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Nenhuma imagem encontrada para "${q}"`);
const randomImg = data.imagens[Math.floor(Math.random() * data.imagens.length)];
await kiimorizinha.sendMessage(from, {
image: { url: randomImg },
caption: `🖼️ *BING IMAGENS*\n🔍 ${q}`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
