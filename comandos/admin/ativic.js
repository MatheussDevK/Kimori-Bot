const { linguagem } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'ativic',
aliases: ['menuativacoes', 'ativacoes'],
category: 'admin',
description: 'Mostra o menu de ativações/recursos do grupo (via lista interativa numerada).',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, sender,
prefix, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
global.menuAzAtivos[sender] = true;
await reply(linguagem.ativic(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff));
},
};
