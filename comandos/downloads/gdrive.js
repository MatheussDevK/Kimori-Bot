import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'gdrive',
aliases: ['googledrive', 'drivedl'],
category: 'downloads',
description: 'Baixa um arquivo do Google Drive.',
async execute(ctx) {
const { reply, q, emojii, reagir, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || !q.includes('drive.google.com')) {
return reply(`📁『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://drive.google.com/file/d/SEU_ID/view`);
}
reply("*Processando link do Google Drive...*" + emojii);
try {
const url = `${__json_config.API_KIMORI_URL}/api/download/gdrive?url=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.data?.arquivo) return reply(`❌ Erro ao obter arquivo`);
const nome = data.data.filename || 'arquivo';
const extensao = nome.split('.').pop() || 'bin';
await kiimorizinha.sendMessage(from, {
document: { url: data.data.arquivo },
mimetype: `application/${extensao}`,
fileName: nome,
caption: `📁 *Google Drive*
📦 ${nome}
📏 ${data.data.tamanho || 'Desconhecido'}`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
