import { apiMedia } from '../../arquivos/funcoes/orbitalApi.js';
import { fetch } from '../../arquivos/funcoes/functions.js';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

const { API_KIMORI_URL, APIKEY_KIMORI } = __json_config;

export default {
name: 'metafeminino',
aliases: ['metafem', 'mtf'],
category: 'pesquisas',
description: 'Busca uma foto de perfil feminina aleatória.',
async execute(ctx) {
const { reply, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
await reagir(from, "👩");
reply(`🔄 *Buscando metadinha feminina...*`);
try {
const { buffer } = await apiMedia('/api/metadinha/feminino/random');
await kiimorizinha.sendMessage(from, {
image: buffer,
caption: `👩 *METADINHA FEMININA*`
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
