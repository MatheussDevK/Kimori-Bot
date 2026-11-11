import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'diciov2',
aliases: ['dicionariov2', 'significadov2'],
category: 'pesquisas',
description: 'Busca o significado de uma palavra (versão 2).',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📚『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} amor`);
await reagir(from, "📚");
reply(`🔍 *Buscando "${q}" no dicionário V2...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/v2/search/dicionario?q=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.significado) return reply(`❌ Palavra "${q}" não encontrada`);
await reply(`📚 *${data.palavra?.toUpperCase()}*\n\n📝 ${data.significado}`);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
