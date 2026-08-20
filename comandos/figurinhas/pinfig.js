const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');
const { fetch } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'pinfig',
aliases: ['pinterestfig', 'pinsticker'],
category: 'figurinhas',
description: 'Busca imagens no Pinterest e envia como figurinhas.',
async execute(ctx) {
const { reply, q, emojii, prefix, command, mess, ownerName, botNome: NomeDoBot, pushname, groupName, isGroup, kiimorizinha, from, selo, sendImageAsSticker2, DLT_FL, ChannelContextNewsLetter, ErroCase } = ctx;

if (!q?.trim()) {
return reply(`『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} gatos`);
}

reply(`🔍 *Buscando figurinhas no Pinterest: ${q}...*`);

try {
const url = `${API_KIMORI_URL}/api/search/pinterest-images?q=${encodeURIComponent(q.trim())}&limit=6&apikey=${APIKEY_KIMORI}`;
const response = await fetch(url);
const data = await response.json();

if (!data.success || !data.results?.length) return reply(`❌ Nenhuma imagem encontrada.`);

const pack = mess.fig(ownerName, NomeDoBot);
const author = mess.fig2(pushname, groupName, isGroup, NomeDoBot);

for (const img of data.results.slice(0, 6)) {
try {
const buffer = Buffer.from(await (await fetch(img.image || img.thumbnail)).arrayBuffer());
const encmedia = await sendImageAsSticker2(kiimorizinha, from, buffer, selo, {
packname: pack,
author,
contextInfo: ChannelContextNewsLetter
});
await DLT_FL(encmedia);
} catch (err) {
console.log(err);
}
}
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
