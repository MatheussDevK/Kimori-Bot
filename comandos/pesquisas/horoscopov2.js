import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'horoscopov2',
aliases: ['horóscopov2', 'signov2'],
category: 'pesquisas',
description: 'Mostra o horóscopo de um signo (versão 2).',
async execute(ctx) {
const { reply, q, emojii, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim()) {
return reply(`⭐『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} aries\n\n📋 *Signos disponíveis:*\naries, touro, gemeos, cancer, leao, virgem, libra, escorpiao, sagitario, capricornio, aquario, peixes`);
}
await reagir(from, "⭐");
reply(`🔮 *Buscando horóscopo V2 para ${q}...*`);
try {
const url = `${__json_config.API_KIMORI_URL}/api/v2/search/horoscopo?signo=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (data.status !== 200) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Signo "${q}" não encontrado\n\n📋 *Signos disponíveis:*\naries, touro, gemeos, cancer, leao, virgem, libra, escorpiao, sagitario, capricornio, aquario, peixes`);
let msg = `⭐ *HORÓSCOPO V2 - ${data.signo?.toUpperCase()}*\n`;
msg += `📅 ${data.data || new Date().toLocaleDateString('pt-BR')}\n\n`;
msg += `${data.previsao || 'Previsão não disponível'}`;
if (data.imagem) {
await kiimorizinha.sendMessage(from, { image: { url: data.imagem }, caption: msg }, { quoted: selo });
} else {
await reply(msg);
}
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
