module.exports = {
name: 'listaddi',
aliases: ['ddilist'],
category: 'admin',
description: 'Lista os membros do grupo que possuem um determinado DDI (código de país).',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, q, args, prefix, groupMembers, kiimorizinha, from, selo } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (q.length < 1) return reply(`Fale o código de um país, por exemplo: *${prefix}listaddi 55*`);
if (isNaN(q)) return reply(`Fale o código de um país, por exemplo: *${prefix}listaddi 55*`);

let teks = `• Número com código de país +${args[0]} registrados no grupo:\n–\n`;
const men = [];
for (const mem of groupMembers) {
if (mem.id.startsWith(q)) {
teks += `⇒ @${mem.id.split('@')[0]}\n`;
men.push(mem.id);
}
}

if (teks.indexOf('⇒') < 0) return reply(`Nenhum número com o DDI *+${args[0]}* foi encontrado.`);
await kiimorizinha.sendMessage(from, { text: teks, mentions: men }, { quoted: selo }).catch(async () => {
reply(mess.error());
});
},
};
