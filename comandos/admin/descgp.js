module.exports = {
name: 'descgp',
aliases: ['descriçãogp'],
category: 'admin',
description: 'Muda a descrição do grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, args, kiimorizinha, from, selo } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
const blabla = args.join(" ");
await kiimorizinha.groupUpdateDescription(from, `${blabla}`);
await kiimorizinha.sendMessage(from, { text: 'Sucesso, alterou a descrição do grupo!' }, { quoted: selo });
},
};
