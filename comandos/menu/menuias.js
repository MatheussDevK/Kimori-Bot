const linguagem = require('../../config-bot/menus/menus.js');

module.exports = {
name: 'menu8',
aliases: ['menuias', 'menuia'],
category: 'menu',
description: 'Menu de comandos de inteligências artificiais.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menuias(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
sendAudio: true,
mentionedJid: [sender]
});
},
};
