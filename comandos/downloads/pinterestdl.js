const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'pinterestdl',
category: 'downloads',
description: 'Baixa imagem de um pin do Pinterest.',
async execute(ctx) {
const { reply, q, emojii, reagir, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;
if (!q?.trim() || !q.includes('pinterest.com')) {
return reply(`『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://br.pinterest.com/pin/SEU_ID`);
}
reply("*Baixando mídia do Pinterest...*" + emojii);
try {
const url = `${API_KIMORI_URL}/api/download/pinterest?url=${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.data?.download) return reply(`❌ Erro ao baixar`);
await kiimorizinha.sendMessage(from, {
image: { url: data.data.download },
caption: `📌 *Pinterest*
📝 ${data.data.titulo || 'Imagem'}
👤 ${data.data.autor?.nome || 'Desconhecido'}`,
}, { quoted: selo });
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
