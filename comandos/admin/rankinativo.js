module.exports = {
name: 'rankinativo',
aliases: ['rankinativos'],
category: 'admin',
description: 'Mostra o ranking dos 5 membros mais inativos do grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, from, countMessage, getGroupIndex, kiimorizinha, selo, ChannelContextNewsLetter } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());

const groupIndex = getGroupIndex(from);
if (groupIndex === -1) return;

const inativos = countMessage[groupIndex].numbers
.filter(u => u.messages <= 1)
.sort((a, b) => (b.messages + b.cmd_messages) - (a.messages + a.cmd_messages));

if (inativos.length === 0) return reply('*Todos estão ativos no grupo! ✅*');

const mentionsList = [];
let texto = `- 「 *𝐈𝐍𝐀𝐓𝐈𝐕𝐎𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎* 」\n\n`;
for (let i = 0; i < Math.min(5, inativos.length); i++) {
const u = inativos[i];
mentionsList.push(u.id);
texto += mess.rankinativo(u, i);
}

await kiimorizinha.sendMessage(from, {
text: texto,
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: mentionsList }
}, { quoted: selo });
},
};
