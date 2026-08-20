const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');
module.exports = {
name: 'neon',
aliases: ['logoneon'],
category: 'logos',
description: 'Gera uma logo estilo Neon Glitch.',
async execute(ctx) {
const { q, reply, reagir, from, prefix, axios, kiimorizinha, selo, emojii, command, ErroCase, botNome: NomeDoBot } = ctx;
if (!q?.trim()) return reply(`*Use da forma correta!* Exemplo: ${prefix}neon Kimori`);
await reagir(from, "✨");
try {
const url = `${API_KIMORI_URL}/api/logo/neon?text=${encodeURIComponent(q)}&apikey=${APIKEY_KIMORI}`;
const response = await axios.get(url);
if (response.data?.success && response.data?.resultado?.imagem) {
await kiimorizinha.sendMessage(from, { image: { url: response.data.resultado.imagem }, caption: `₊˚‧✨ *Neon Glitch*\n₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊\n₊˚‧📝 Texto: ${q}` }, { quoted: selo });
} else {
reply("Erro: API não retornou imagem válida");
}
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
}
};
