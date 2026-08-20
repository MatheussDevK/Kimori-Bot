const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'capcut',
aliases: ['capcutdl'],
category: 'downloads',
description: 'Baixa um template/vídeo do CapCut.',
async execute(ctx) {
const { reply, q, emojii, reagir, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || !q.includes('capcut.com')) {
return reply(`✂️『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://www.capcut.com/t/SEU_ID`);
}
reply("*Baixando vídeo do CapCut...*" + emojii);
try {
const url = `${API_KIMORI_URL}/api/download/capcut?url=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.data?.url) return reply(`❌ Erro ao baixar vídeo`);
await kiimorizinha.sendMessage(from, {
video: { url: data.data.url },
mimetype: "video/mp4",
caption: `✂️ *CapCut Template*
📝 ${data.data.titulo || 'Vídeo'}`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
