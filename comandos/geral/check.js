module.exports = {
name: 'check',
aliases: ['checkativo'],
category: 'geral',
description: 'Mostra os dados de atividade (mensagens) de um usuário marcado no grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, from, getGroupIndex, menc_os2,
countMessage, kiimorizinha, selo, ChannelContextNewsLetter,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
const groupIndex = getGroupIndex(from);
if (groupIndex === -1) return reply('O bot não tem ainda dados sobre o grupo');
if (!menc_os2 || Array.isArray(menc_os2) || menc_os2.includes(','))
return reply('Marque apenas 1 @ por vez para verificar a atividade.');
const userIndex = countMessage[groupIndex].numbers.findIndex(u => u.id === menc_os2);
if (userIndex >= 0) {
const u = countMessage[groupIndex].numbers[userIndex];
await kiimorizinha.sendMessage(from, {
text: mess.check(u),
contextInfo:{...ChannelContextNewsLetter, mentionedJid: [menc_os2]}
}, {quoted: selo})
} else {
await kiimorizinha.sendMessage(from, {
text: `*SEM DADOS SOBRE @${menc_os2.split('@')[0]} NESTE GRUPO...*`,
contextInfo:{...ChannelContextNewsLetter, mentionedJid: [menc_os2]}
}, {quoted: selo})
}
},
};
