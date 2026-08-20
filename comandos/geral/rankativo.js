module.exports = {
name: 'rankativo',
aliases: ['rankativos'],
category: 'geral',
description: 'Mostra o ranking dos 5 membros mais ativos do grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, from, countMessage,
kiimorizinha, selo, ChannelContextNewsLetter,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
const groupIndex = countMessage.findIndex(g => g.groupId === from);
if (groupIndex === -1) return reply('*Não há dados do grupo.*');

const sorted = [...countMessage[groupIndex].numbers].sort((a, b) =>
(b.messages + b.cmd_messages + (b.figus || 0)) - (a.messages + a.cmd_messages + (a.figus || 0))
);

const mentionsList = [];
let texto = `- 「 *𝐑𝐀𝐍𝐊 𝐀𝐓𝐈𝐕𝐎𝐒 𝐃𝐎 𝐂𝐇𝐀𝐓* 」\n\n`;
for (let i = 0; i < Math.min(5, sorted.length); i++) {
const u = sorted[i];
mentionsList.push(u.id);
texto += mess.rankativo(u, i);
}
await kiimorizinha.sendMessage(from, {text: texto, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsList}
}, {quoted: selo})
},
};
