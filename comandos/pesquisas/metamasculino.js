const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'metamasculino',
aliases: ['metamasc', 'mtm'],
category: 'pesquisas',
description: 'Busca uma foto de perfil masculina aleatória.',
async execute(ctx) {
const { reply, reagir, from, kiimorizinha, selo, prefix, command, ErroCase, botNome } = ctx;
await reagir(from, "👤");
reply(`🔄 *Buscando metadinha masculina...*`);
try {
const url = `${API_KIMORI_URL}/api/metadinha/masculino/random?apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
if (!response.ok) return reply(`❌ Erro ao buscar metadinha masculina`);
const buffer = await response.buffer();
await kiimorizinha.sendMessage(from, {
image: buffer,
caption: `👤 *METADINHA MASCULINA*`
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
