const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'metafeminino',
aliases: ['metafem', 'mtf'],
category: 'pesquisas',
description: 'Busca uma foto de perfil feminina aleatória.',
async execute(ctx) {
const { reply, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
await reagir(from, "👩");
reply(`🔄 *Buscando metadinha feminina...*`);
try {
const url = `${API_KIMORI_URL}/api/metadinha/feminino/random?apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
if (!response.ok) return reply(`❌ Erro ao buscar metadinha feminina`);
const buffer = await response.buffer();
await kiimorizinha.sendMessage(from, {
image: buffer,
caption: `👩 *METADINHA FEMININA*`
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
