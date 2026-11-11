import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'pinterestdl',
category: 'downloads',
description: 'Baixa imagem de um pin do Pinterest.',
async execute(ctx) {
const { reply, q, emojii, reagir, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || !q.includes('pinterest.com')) {
return reply(`『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://br.pinterest.com/pin/SEU_ID`);
}
reply("*Baixando mídia do Pinterest...*" + emojii);
try {
const url = `${__json_config.API_KIMORI_URL}/api/download/pinterest?url=${encodeURIComponent(q.trim())}&apikey=${__json_config.APIKEY_KIMORI}`;
const data = await apiJson(url);
if (!data.success || !data.data?.download) return reply(data?.success === false || data?.error ? `❌ ${apiErro(data)}` : `❌ Erro ao baixar`);
await kiimorizinha.sendMessage(from, {
image: { url: data.data.download },
caption: `📌 *Pinterest*
📝 ${data.data.titulo || 'Imagem'}
👤 ${data.data.autor?.nome || 'Desconhecido'}`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
