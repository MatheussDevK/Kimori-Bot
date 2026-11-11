import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'playstore',
aliases: ['ps', 'pesquisarplay'],
category: 'pesquisas',
description: 'Busca um app na Play Store.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📱『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} spotify`);
await reagir(from, "📱");
reply(`🔍 *Buscando na Play Store: ${q}...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/search/playstore?q=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.resultado?.length) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Nenhum app encontrado para "${q}"`);
let msg = `📱 *PLAY STORE - ${q}*\n\n`;
data.resultado.slice(0, 5).forEach((app, i) => {
msg += `${i + 1}. *${app.nome}*\n`;
msg += ` 👤 ${app.desenvolvedor || 'Desconhecido'}\n`;
if (app.estrelas) msg += ` ⭐ ${app.estrelas} estrelas\n`;
if (app.link) msg += ` 🔗 ${app.link}\n\n`;
});
if (data.resultado[0]?.imagem) {
await kiimorizinha.sendMessage(from, { image: { url: data.resultado[0].imagem }, caption: msg }, { quoted: selo });
} else {
await reply(msg);
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
