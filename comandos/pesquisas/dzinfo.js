import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'dzinfo',
aliases: ['deezerinfo', 'deezertrack'],
category: 'pesquisas',
description: 'Mostra informações de uma faixa do Deezer pelo ID.',
async execute(ctx) {
const { reply, q, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || isNaN(q)) {
return reply(`ℹ️『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} 131730431`);
}
await reagir(from, "ℹ️");
reply(`🔍 *Buscando informações da música...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/deezer/track?id=${q.trim()}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.track) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Música não encontrada`);
const t = data.track;
let msg = `🎵 *${t.title}*\n\n`;
msg += `👤 ${t.artist}\n`;
msg += `💿 ${t.album}\n`;
msg += `⏱️ ${t.duration}\n`;
if (t.preview) msg += `🎧 ${t.preview}\n`;
msg += `🔗 ${t.link}`;
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
