const linguagem = require('../../config-bot/menus/menus.js');

module.exports = {
name: 'menu2',
aliases: ['menudono'],
category: 'menu',
description: 'Menu de comandos do dono.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menudono(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
isOwnerRequired: true,
sendAudio: true,
mentionedJid: [sender]
});
},
};
