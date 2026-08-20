module.exports = {
name: 'mytag',
category: 'geral',
description: 'Mostra o nome de exibição de quem usou o comando.',
async execute(ctx) {
const { kiimorizinha, from, selo, pushname } = ctx;
await kiimorizinha.sendMessage(from, { text: `${pushname}` }, { quoted: selo });
},
};
