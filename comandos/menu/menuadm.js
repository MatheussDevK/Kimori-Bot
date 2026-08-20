const linguagem = require('../../config-bot/menus/menus.js');

module.exports = {
name: 'menu3',
aliases: ['menuadm'],
category: 'menu',
description: 'Menu de comandos de administrador.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.adms(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
isAdminRequired: true,
sendAudio: true,
mentionedJid: [sender]
});
},
};
