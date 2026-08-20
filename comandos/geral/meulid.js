module.exports = {
name: 'meulid',
category: 'geral',
description: 'Mostra o participant/remoteJid bruto da chave da mensagem.',
async execute(ctx) {
const { reply, info } = ctx;

const lid = (
info?.key?.participant ||
info?.participant ||
info?.key?.remoteJid ||
'Sem LID'
)

reply(`${lid}`)
},
};
