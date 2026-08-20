module.exports = {
name: 'gerarcpf',
category: 'geral',
description: 'Gera um número no formato de CPF, apenas para preencher formulários de teste.',
async execute(ctx) {
const { kiimorizinha, from, selo, ChannelContextNewsLetter } = ctx;
const cp1 = `${Math.floor(Math.random() * 300) + 600}`;
const cp2 = `${Math.floor(Math.random() * 300) + 600}`;
const cp3 = `${Math.floor(Math.random() * 300) + 600}`;
const cp4 = `${Math.floor(Math.random() * 30) + 60}`;
const cpf = `${cp1}.${cp2}.${cp3}-${cp4}`;
await kiimorizinha.sendMessage(from, { text: `CPF gerado com sucesso: ${cpf}`, contextInfo: { ...ChannelContextNewsLetter } }, { quoted: selo });
},
};
