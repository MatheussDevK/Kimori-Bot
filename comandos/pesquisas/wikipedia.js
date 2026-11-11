import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'wikipedia',
aliases: ['pesquisarwiki'],
category: 'pesquisas',
description: 'Pesquisa um verbete na Wikipédia.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📚『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} Brasil`);
await reagir(from, "📚");
reply(`🔍 *Pesquisando na Wikipédia: ${q}...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/wikipedia/pesquisa?q=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.resultados?.length) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Nenhum resultado encontrado para "${q}"`);
const r = data.resultados[0];
let msg = `📚 *WIKIPÉDIA*\n\n`;
msg += `📝 *${r.titulo}*\n\n`;
msg += `${r.descricao || 'Sem descrição disponível'}\n\n`;
msg += `🔗 ${r.url || 'Link indisponível'}`;
if (r.imagem) {
await kiimorizinha.sendMessage(from, { image: { url: r.imagem }, caption: msg }, { quoted: selo });
} else {
await reply(msg);
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
