import { apiJson, apiMedia, apiErro } from '../../arquivos/funcoes/orbitalApi.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;
export default {
name: 'write',
aliases: ['logowrite'],
category: 'logos',
description: 'Gera uma logo estilo Write Effect.',
async execute(ctx) {
const { q, reply, reagir, from, prefix, axios, kiimorizinha, selo, emojii, command, ErroCase, botNome: NomeDoBot } = ctx;
if (!q?.trim()) return reply(`*Use da forma correta!* Exemplo: ${prefix}write Kimori`);
await reagir(from, "✨");
try {
const url = `${__json_config.API_KIMORI_URL}/api/logo/write?text=${encodeURIComponent(q)}&apikey=${__json_config.APIKEY_KIMORI}`;
const response = { data: await apiJson(url) };
if (response.data?.success && response.data?.resultado?.imagem) {
await kiimorizinha.sendMessage(from, { image: { url: response.data.resultado.imagem }, caption: `₊˚‧✨ *Write Effect*\n₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊\n₊˚‧📝 Texto: ${q}` }, { quoted: selo });
} else {
reply(`❌ Erro: ${apiErro(response.data, 'a API não retornou imagem válida')}`);
}
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
}
};
