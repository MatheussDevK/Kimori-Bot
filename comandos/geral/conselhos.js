const advices = require('../../database/advices.json');

module.exports = {
name: 'conselhos',
aliases: ['conselho'],
category: 'geral',
description: 'Envia um conselho aleatório.',
async execute(ctx) {
const { kiimorizinha, from, info, selo, mess } = ctx;
const texto = advices.commonAdvices[Math.floor(Math.random() * advices.commonAdvices.length)];
await kiimorizinha.sendMessage(from, { react: { text: '😌', key: info.key } });
await kiimorizinha.sendMessage(from, { text: texto }, { quoted: info }).catch(async () => {
await kiimorizinha.sendMessage(from, { text: mess.error() }, { quoted: selo });
});
},
};
