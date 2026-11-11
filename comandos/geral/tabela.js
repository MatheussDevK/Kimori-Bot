import __tabela from '../../arquivos/js/tabela.js';

const { tabela } = __tabela;

export default {
name: 'tabela',
category: 'geral',
description: 'Mostra a tabela de informações e status do bot.',
async execute(ctx) {
const { kiimorizinha, from, selo, prefix, botNome } = ctx;
await kiimorizinha.sendMessage(from, { text: tabela(prefix, botNome) }, { quoted: selo });
},
};
