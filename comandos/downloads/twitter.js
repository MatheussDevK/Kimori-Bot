const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'twitter',
aliases: ['twit', 'twitterdl'],
category: 'downloads',
description: 'Baixa mídia de um tweet.',
async execute(ctx) {
const { reply, q, emojii, reagir, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || (!q.includes('twitter.com') && !q.includes('x.com'))) {
return reply(`🐦『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://x.com/i/status/2059213532265324581`);
}
reply("*Baixando mídia do Twitter...*" + emojii);
try {
const url = `${API_KIMORI_URL}/api/download/twitter?url=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.data?.video) return reply(`❌ Erro ao baixar`);
await kiimorizinha.sendMessage(from, {
video: { url: data.data.video },
mimetype: "video/mp4",
caption: `🐦 *Twitter/X*
👤 @${data.data.autor?.username || 'Desconhecido'}`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
