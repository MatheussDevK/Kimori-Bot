import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'dicio',
aliases: ['dicionario', 'significado'],
category: 'pesquisas',
description: 'Busca o significado de uma palavra.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) return reply(`📚『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} amor`);
await reagir(from, "📚");
reply(`🔍 *Buscando "${q}" no dicionário...*`);
try {
const res = await apiJson('/api/search/dicionario', { q: q.trim() });
const d = res.data || {};
if (!res.success || !d.significado) return reply(`❌ ${apiErro(res, `Palavra "${q}" não encontrada no dicionário`)}`);
let msg = `📚 *${String(d.palavra || q).toUpperCase()}*\n`;
if (d.classe) msg += `🏷️ ${d.classe}\n`;
if (d.separacao) msg += `✂️ ${d.separacao}\n`;
msg += `\n📝 ${(d.significados?.length ? d.significados.slice(0, 3).join('\n\n') : d.significado)}`;
if (d.sinonimos?.length) msg += `\n\n🔁 *Sinônimos:* ${d.sinonimos.slice(0, 10).join(', ')}`;
if (d.antonimos?.length) msg += `\n↔️ *Antônimos:* ${d.antonimos.slice(0, 10).join(', ')}`;
if (d.etimologia) msg += `\n\n📜 ${d.etimologia}`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
