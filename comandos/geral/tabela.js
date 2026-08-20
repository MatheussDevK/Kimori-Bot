const { tabela } = require('../../arquivos/js/tabela.js');

module.exports = {
name: 'tabela',
category: 'geral',
description: 'Mostra a tabela de informações e status do bot.',
async execute(ctx) {
const { kiimorizinha, from, selo, prefix, botNome } = ctx;
await kiimorizinha.sendMessage(from, { text: tabela(prefix, botNome) }, { quoted: selo });
},
};
