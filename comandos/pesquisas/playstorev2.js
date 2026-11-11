import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'playstorev2',
aliases: ['psv2', 'pesquisarplayv2'],
category: 'pesquisas',
description: 'Busca um app na Play Store (versão 2).',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📱『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} whatsapp`);
await reagir(from, "📱");
reply(`🔍 *Buscando na Play Store V2: ${q}...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/v2/search/playstore?q=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (data.status !== 200 || !data.resultado?.length) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Nenhum app encontrado para "${q}"`);
let msg = `📱 *PLAY STORE V2 - ${q}*\n\n`;
data.resultado.slice(0, 5).forEach((app, i) => {
msg += `${i + 1}. *${app.nome}*\n`;
if (app.desenvolvedor) msg += ` 👤 ${app.desenvolvedor}\n`;
if (app.estrelas) msg += ` ⭐ ${app.estrelas} estrelas\n`;
if (app.link) msg += ` 🔗 ${app.link}\n\n`;
});
if (data.resultado[0]?.imagem) {
await kiimorizinha.sendMessage(from, { image: { url: data.resultado[0].imagem }, caption: msg }, { quoted: selo });
} else {
await reply(msg);
}
await reagir(from, "✅");
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
