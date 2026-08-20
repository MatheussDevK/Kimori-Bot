module.exports = {
name: 'me',
aliases: ['mecheck', 'checkme'],
category: 'geral',
description: 'Mostra os próprios dados de atividade (mensagens) no grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, from, getGroupIndex, sender,
countMessage, kiimorizinha, selo, ChannelContextNewsLetter,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
const groupIndex = getGroupIndex(from);
if (groupIndex === -1) return reply('O bot ainda não tem dados sobre este grupo.');
const userIndex = countMessage[groupIndex].numbers.findIndex(u => u.id === sender);
if (userIndex >= 0) {
const u = countMessage[groupIndex].numbers[userIndex];
await kiimorizinha.sendMessage(from, {
text: mess.checkme(u),
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender]}
}, {quoted: selo})
} else {
await kiimorizinha.sendMessage(from, {
text: `*SEM DADOS SOBRE @${sender.split('@')[0]} NESTE GRUPO...*`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender]}
}, {quoted: selo})
}
},
};
