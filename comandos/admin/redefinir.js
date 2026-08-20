module.exports = {
name: 'redefinir',
aliases: ['revlinkgp', 'revlinkgroup'],
category: 'admin',
description: 'Redefine (revoga) o link de convite do grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, kiimorizinha, from } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
await kiimorizinha.groupRevokeInvite(from);
reply(`Link do grupo redefinido com sucesso!`);
},
};
