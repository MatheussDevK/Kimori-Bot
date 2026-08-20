module.exports = {
name: 'exemplo',
aliases: ['example', 'demo'],
category: 'geral',
description: 'Comando de exemplo, mostra como usar o sistema de comandos separados.',
async execute(ctx) {
const {
reply, args, isGroup, isGroupAdmins, isBotGroupAdmins, sender, from,
pushname, prefix, kiimorizinha, mess,
} = ctx;

if (!args.length) {
return reply(`Olá, ${pushname || 'pessoa'}! Este é o comando de exemplo do sistema ./comandos.\nUse: ${prefix}exemplo grupo — para ver um exemplo de checagem de grupo/admin.`);
}

if (args[0].toLowerCase() === 'grupo') {
if (!isGroup) return reply(mess.onlyGroup ? mess.onlyGroup() : 'Este comando só funciona em grupos.');
if (!isGroupAdmins) return reply(mess.onlyAdmins ? mess.onlyAdmins() : 'Apenas administradores podem usar isso.');
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin ? mess.onlyBotAdmin() : 'Preciso ser admin do grupo para isso.');
return reply('Tudo certo! Você é admin, o bot é admin, e estamos em um grupo.');
}

return reply(`Argumento "${args[0]}" recebido de ${sender}.`);
},
};
