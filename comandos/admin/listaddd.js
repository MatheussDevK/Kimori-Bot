module.exports = {
name: 'listaddd',
aliases: ['dddlist'],
category: 'admin',
description: 'Lista os membros brasileiros do grupo que possuem um determinado DDD.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, q, prefix, groupMembers, kiimorizinha, from, selo } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (q.length < 1) return reply(`Fale o código do estado, por exemplo: *${prefix}listaddd 82*`);
if (isNaN(q)) return reply(`Fale o código de um estado(ddd), por exemplo: *${prefix}listaddd 82*`);

let teks = `• Lista de números brasileiros com o DDD *${q}* presentes neste grupo:\n–\n`;
const men = [];
for (const mem of groupMembers) {
if (mem.id.startsWith(55 + q)) {
teks += `⇒ @${mem.id.split('@')[0]}\n`;
men.push(mem.id);
}
}

if (teks.indexOf('⇒') < 0) return reply('Nenhum *número brasileiro* com DDD fornecido foi encontrado no grupo.');
await kiimorizinha.sendMessage(from, { text: teks, mentions: men }, { quoted: selo }).catch(async () => {
reply(mess.error());
});
},
};
