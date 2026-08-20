const linguagem = require('../../config-bot/menus/menus.js');

module.exports = {
name: 'menu13',
aliases: ['menuplaquinhas', 'menuplaquinha'],
category: 'menu',
description: 'Menu do gerador de plaquinhas.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menuplaqs(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
sendAudio: true,
mentionedJid: [sender]
});
},
};
