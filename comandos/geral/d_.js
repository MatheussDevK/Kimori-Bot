module.exports = {
name: 'd_',
category: 'geral',
description: 'Apaga a mensagem de resposta de botão (buttonsResponseMessage) do bot.',
async execute(ctx) {
const { kiimorizinha, from, info, botNumber } = ctx;

await kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.message.buttonsResponseMessage.contextInfo.stanzaId, participant: botNumber}})
},
};
