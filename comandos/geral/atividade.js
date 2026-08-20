module.exports = {
name: 'atividade',
aliases: ['atividades'],
category: 'geral',
description: 'Mostra as atividades (mensagens, mídias e comandos) de todos os membros do grupo.',
async execute(ctx) {
const { reply, mess, isGroupAdmins, issupre, ischyt, from, countMessage, kiimorizinha, selo, ChannelContextNewsLetter } = ctx;
if (!isGroupAdmins && !issupre && !ischyt) return reply(mess.onlyAdmins());

const groupIndex = countMessage.findIndex(g => g.groupId === from);
if (groupIndex === -1 || countMessage[groupIndex].numbers.length === 0)
return reply('*"NADA FOI ENCONTRADO... GRUPO MORTO? 💀"*');

const mentionsList = [];
let texto = `- 「 *𝐀𝐓𝐈𝐕𝐈𝐃𝐀𝐃𝐄𝐒 𝐃𝐎𝐒 𝐌𝐄𝐌𝐁𝐑𝐎𝐒* 」\n\n`;
for (const u of countMessage[groupIndex].numbers) {
mentionsList.push(u.id);
texto += mess.atividade(u);
}

await kiimorizinha.sendMessage(from, {
text: texto,
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: mentionsList }
}, { quoted: selo });
},
};
