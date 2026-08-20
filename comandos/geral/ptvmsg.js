module.exports = {
name: 'ptvmsg',
category: 'geral',
description: 'Converte o vídeo/gif citado em mensagem de vídeo circular (PTV).',
async execute(ctx) {
const { reply, isQuotedVideo, info, kiimorizinha, from } = ctx;

if (!isQuotedVideo && !info.message.videoMessage) return reply('Marque um vídeo/gif que você deseja converter para mensagem de vídeo.');
await kiimorizinha.relayMessage(from, {ptvMessage: isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : info.message.videoMessage }, {})
},
};
