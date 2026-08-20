module.exports = {
name: 'nomegp',
category: 'admin',
description: 'Muda o nome do grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, args, kiimorizinha, from, selo } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
const blat = args.join(" ");
await kiimorizinha.groupUpdateSubject(from, `${blat}`);
await kiimorizinha.sendMessage(from, { text: 'Sucesso, alterou o nome do grupo.' }, { quoted: selo });
},
};
