const linguagem = require('../../config-bot/menus/menus.js');

module.exports = {
name: 'menu11',
aliases: ['menulogos', 'menulogo'],
category: 'menu',
description: 'Menu de comandos para gerar logos.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menulogos(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
sendAudio: true,
mentionedJid: [sender]
});
},
};
