export default {
name: 'd_',
category: 'geral',
description: 'Apaga a mensagem de resposta de botão (buttonsResponseMessage) do bot.',
async execute(ctx) {
const { kiimorizinha, from, info, botNumber } = ctx;

// só funciona como resposta de botão; sem isso dava "Cannot read properties of undefined"
const ctxBotao = info?.message?.buttonsResponseMessage?.contextInfo || info?.message?.interactiveResponseMessage?.contextInfo
if (!ctxBotao?.stanzaId) return
await kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: true, id: ctxBotao.stanzaId, participant: ctxBotao.participant || botNumber}})
},
};
