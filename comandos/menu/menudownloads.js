const linguagem = require('../../config-bot/menus/menus.js');

module.exports = {
name: 'menu5',
aliases: ['menudw', 'menudownloads'],
category: 'menu',
description: 'Menu de comandos de downloads.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menudw(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
sendAudio: true,
mentionedJid: [sender]
});
},
};
