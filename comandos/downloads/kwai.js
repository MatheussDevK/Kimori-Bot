const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'kwai',
aliases: ['kwaidl'],
category: 'downloads',
description: 'Baixa vídeo do Kwai.',
async execute(ctx) {
const { reply, q, emojii, reagir, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || !q.includes('kwai.com')) {
return reply(`📱『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://www.kwai.com/@user/video/SEU_ID`);
}
reply("*Baixando vídeo do Kwai...*" + emojii);
try {
const url = `${API_KIMORI_URL}/api/download/kwai?url=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.data?.video) return reply(`❌ Erro ao baixar vídeo`);
await kiimorizinha.sendMessage(from, {
video: { url: data.data.video },
mimetype: "video/mp4",
caption: `📱 *Kwai Video*
📝 ${data.data.titulo || 'Vídeo'}`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
