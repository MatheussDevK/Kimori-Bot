const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'instagrambeta',
aliases: ['instabeta'],
category: 'downloads',
description: 'Baixa vídeo do Instagram (versão Beta).',
async execute(ctx) {
const { reply, q, emojii, reagir, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || !q.includes('instagram.com')) {
return reply(`📸『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://www.instagram.com/xxx`);
}
reply("*Baixando via InstaDL Beta...*" + emojii);
try {
const url = `${API_KIMORI_URL}/api/download/instagram-beta?url=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.data?.video) return reply(`❌ Erro ao baixar`);
await kiimorizinha.sendMessage(from, {
video: { url: data.data.video },
mimetype: "video/mp4",
caption: `📸 *Instagram Beta*`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
