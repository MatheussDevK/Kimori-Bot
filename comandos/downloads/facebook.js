const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'facebook',
aliases: ['fb', 'facedl'],
category: 'downloads',
description: 'Baixa vídeo do Facebook.',
async execute(ctx) {
const { reply, q, emojii, reagir, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || (!q.includes('facebook.com') && !q.includes('fb.watch'))) {
return reply(`📘『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://www.facebook.com/facebook/videos/10153231379946729/`);
}
reply("*Baixando vídeo do Facebook...*" + emojii);
try {
const url = `${API_KIMORI_URL}/api/download/facebook?url=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.data?.video) return reply(`❌ Erro ao baixar vídeo`);
await kiimorizinha.sendMessage(from, {
video: { url: data.data.video },
mimetype: "video/mp4",
caption: `📘 *Facebook Video*`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
