const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');

module.exports = {
name: 'brat',
category: 'figurinhas',
description: 'Gera uma figurinha no estilo brat com o texto informado.',
async execute(ctx) {
const { reply, q, prefix, mess, ownerName, botNome: NomeDoBot, pushname, groupName, isGroup, kiimorizinha, from, selo, axios, sendImageAsSticker2, DLT_FL, ChannelContextNewsLetter } = ctx;

if (!q) return reply(`Exemplo: ${prefix}brat Hello World`);

try {
const { data } = await axios.get(
`${API_KIMORI_URL}/api/brat?text=${encodeURIComponent(q)}&apikey=${APIKEY_KIMORI}`,
{ responseType: 'arraybuffer' }
);

const pack = mess.fig(ownerName, NomeDoBot);
const author2 = mess.fig2(pushname, groupName, isGroup, NomeDoBot);

const encmedia = await sendImageAsSticker2(kiimorizinha, from, Buffer.from(data), selo, {
packname: pack,
author: author2,
contextInfo: ChannelContextNewsLetter
});
await DLT_FL(encmedia);
} catch (e) {
console.log(e);
reply('Erro ao gerar a figurinha.');
}
},
};
