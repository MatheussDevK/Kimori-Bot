const linguagem = require('../../config-bot/menus/menus.js');

module.exports = {
name: 'menu4',
aliases: ['menubrincadeira', 'menubrincadeiras', 'menubn'],
category: 'menu',
description: 'Menu de brincadeiras e jogos.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.brincadeiras(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
isGroupRequired: true,
sendAudio: true,
mentionedJid: [sender]
});
},
};
