const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'ttktrend',
aliases: ['tttrending', 'tiktoktrending', 'trendingtt'],
category: 'pesquisas',
description: 'Mostra vídeos em alta no TikTok.',
async execute(ctx) {
const { reply, emojii, reagir, from, prefix, command, ErroCase, botNome } = ctx;
await reagir(from, "📈");
reply("📈 *Buscando vídeos em alta no TikTok...*");
try {
const url = `${API_KIMORI_URL}/api/tiktok/trending?limit=10&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();
if (!data.success || !data.resultados?.length) return reply(`❌ Nenhum trending encontrado`);
let msg = `📈 *TIKTOK TRENDING*\n\n`;
data.resultados.forEach((v, i) => {
msg += `${i + 1}. ${v.titulo?.substring(0, 40) || 'Sem título'}\n`;
msg += ` 👤 @${v.autor?.username || 'Desconhecido'}\n`;
msg += ` ❤️ ${v.likes?.toLocaleString() || 0} | 👁️ ${v.views?.toLocaleString() || 0}\n\n`;
});
await reply(msg);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
