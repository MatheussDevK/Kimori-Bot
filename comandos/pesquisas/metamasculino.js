import { apiMedia } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'metamasculino',
aliases: ['metamasc', 'mtm'],
category: 'pesquisas',
description: 'Busca uma foto de perfil masculina aleatória.',
async execute(ctx) {
const { reply, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
await reagir(from, "👤");
reply(`🔄 *Buscando metadinha masculina...*`);
try {
const { buffer } = await apiMedia('/api/metadinha/masculino/random');
await kiimorizinha.sendMessage(from, {
image: buffer,
caption: `👤 *METADINHA MASCULINA*`
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
