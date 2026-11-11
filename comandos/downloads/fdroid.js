import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'fdroid',
aliases: ['froid', 'fdroiddl'],
category: 'downloads',
description: 'Busca e baixa um app do F-Droid pelo nome.',
async execute(ctx) {
const { reply, q, emojii, reagir, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) {
return reply(`📦『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} newpipe`);
}
reply(`*Buscando app no F-Droid: ${q}...*` + emojii);
try {
const url = `${__json_config.API_KIMORI_URL}/api/download/fdroid?url=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.data?.download) return reply(`❌ App "${q}" não encontrado no F-Droid`);
await kiimorizinha.sendMessage(from, {
document: { url: data.data.download },
mimetype: "application/vnd.android.package-archive",
fileName: data.data.filename || `${q}.apk`,
caption: `📦 *${data.data.nome || q}*
📝 ${data.data.resumo || ''}`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
