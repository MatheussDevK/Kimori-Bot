import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'metanumero',
aliases: ['metan', 'mtn'],
category: 'pesquisas',
description: 'Busca um par de metadinha pelo número.',
async execute(ctx) {
const { reply, q, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || isNaN(q.trim())) {
return reply(`🔢 *USE:* ${prefix + command} [número]\n📌 *EXEMPLO:* ${prefix + command} 1\n📌 *EXEMPLO:* ${prefix + command} 50\n\n📋 *Use ${prefix}metalist para ver todos os números disponíveis*`);
}
const numero = parseInt(q.trim());
await reagir(from, "🔢");
reply(`🔄 *Buscando metadinha nº ${numero}...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/metadinha/${numero}?apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Metadinha nº ${numero} não encontrada`);
let msg = `💕 *METADINHA Nº ${data.numero}*\n\n`;
msg += `👤 *Masculina:*\n🔗 ${data.masculina || 'N/A'}\n\n`;
msg += `👩 *Feminina:*\n🔗 ${data.feminina || 'N/A'}`;
if (data.masculina) {
await kiimorizinha.sendMessage(from, {
image: { url: data.masculina },
caption: msg
}, { quoted: selo });
} else {
await reply(msg);
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
