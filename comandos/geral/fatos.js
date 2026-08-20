const tools = require('../../database/tools.json');

module.exports = {
name: 'fatos',
aliases: ['curiosidades'],
category: 'geral',
description: 'Envia uma curiosidade aleatória.',
async execute(ctx) {
const { kiimorizinha, from, info, selo, mess } = ctx;
const texto = tools.curiousFacts[Math.floor(Math.random() * tools.curiousFacts.length)];
await kiimorizinha.sendMessage(from, { react: { text: '🙀', key: info.key } });
await kiimorizinha.sendMessage(from, { text: texto }, { quoted: info }).catch(async () => {
await kiimorizinha.sendMessage(from, { text: mess.error() }, { quoted: selo });
});
},
};
