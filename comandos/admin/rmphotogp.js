module.exports = {
name: 'rmphotogp',
aliases: ['rmfotogroup'],
category: 'admin',
description: 'Remove a foto de perfil do grupo.',
async execute(ctx) {
const { reply, isGroup, mess, isGroupAdmins, isBotGroupAdmins, kiimorizinha, from } = ctx;

if (!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
reply(`A foto do grupo foi removida com sucesso.`)
await kiimorizinha.removeProfilePicture(from)
},
};
