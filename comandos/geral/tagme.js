module.exports = {
name: 'tagme',
category: 'geral',
description: 'Marca quem usou o comando na conversa.',
async execute(ctx) {
const { kiimorizinha, from, sender, selo, ChannelContextNewsLetter } = ctx;
const tagme = `@${sender.split('@')[0]} ✔️`;
await kiimorizinha.sendMessage(from, { text: tagme, mentions: [sender], contextInfo: { ...ChannelContextNewsLetter } }, { quoted: selo });
},
};
