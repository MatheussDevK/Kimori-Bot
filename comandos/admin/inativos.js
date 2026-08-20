module.exports = {
name: 'inativos',
aliases: ['inativo'],
category: 'admin',
description: 'Lista os membros com uma quantidade de mensagens igual ou menor que o valor informado.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, q, prefix, command, from, countMessage, getGroupIndex, mention } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!q || q.match(/[a-z]/i)) return reply(`Exemplo: ${prefix + command} 0\nMostrará membros com 0 mensagens ou menos.`);

const groupIndex = getGroupIndex(from);
if (groupIndex === -1) return reply('*ɴᴀᴏ ʜᴀ ᴅᴀᴅᴏs ᴅᴇsᴛᴇ ɢʀᴜᴘᴏ ᴀɪɴᴅᴀ.*');

const limite = Number(q.trim());
const inativos = countMessage[groupIndex].numbers
.filter(u => u.messages <= limite && u.cmd_messages <= limite && (u.figus || 0) <= limite)
.map(u => u.id);

if (inativos.length === 0) return reply(`Não tem pessoas com ${limite} mensagens ou menos.`);

let texto = `Usuários com *${limite}* mensagens ou menos:\n–\n`;
inativos.forEach((id, i) => {
texto += `*${i + 1}.* @${id.split('@')[0]}\n`;
});

await mention(texto, inativos, true);
},
};
