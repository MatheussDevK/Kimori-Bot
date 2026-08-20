const tools = require('../../database/tools.json');

module.exports = {
name: 'cantadas',
aliases: ['cantada'],
category: 'geral',
description: 'Envia uma cantada aleatória.',
async execute(ctx) {
const { kiimorizinha, from, info, selo, mess } = ctx;
const texto = tools.Cantadas[Math.floor(Math.random() * tools.Cantadas.length)];
await kiimorizinha.sendMessage(from, { react: { text: '😼', key: info.key } });
await kiimorizinha.sendMessage(from, { text: texto }, { quoted: info }).catch(async () => {
await kiimorizinha.sendMessage(from, { text: mess.error() }, { quoted: selo });
});
},
};
