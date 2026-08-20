const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');
module.exports = {
name: 'avengers',
aliases: ['logoavengers'],
category: 'logos',
description: 'Gera uma logo estilo Avengers Logo Style.',
async execute(ctx) {
const { q, reply, reagir, from, prefix, axios, kiimorizinha, selo, emojii, command, ErroCase, botNome: NomeDoBot } = ctx;
if (!q || !q.includes('/')) return reply(`*Use da forma correta!* Exemplo: ${prefix}avengers Kimori/Bot`);
await reagir(from, "✨");
try {
const partes = q.split('/');
const text1 = encodeURIComponent(partes[0]?.trim() || '');
const text2 = encodeURIComponent(partes[1]?.trim() || '');
const url = `${API_KIMORI_URL}/api/logo/avengers?text1=${text1}&text2=${text2}&apikey=${APIKEY_KIMORI}`;
const response = await axios.get(url);
if (response.data?.success && response.data?.resultado?.imagem) {
await kiimorizinha.sendMessage(from, { image: { url: response.data.resultado.imagem }, caption: `₊˚‧✨ *Avengers Logo Style*\n₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊\n₊˚‧📝 ${partes[0]} | ${partes[1]}` }, { quoted: selo });
} else {
reply("Erro: API não retornou imagem válida");
}
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
}
};
