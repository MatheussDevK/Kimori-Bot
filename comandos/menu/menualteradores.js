const linguagem = require('../../config-bot/menus/menus.js');

module.exports = {
name: 'menu19',
aliases: ['alteradores', 'menualteradores'],
category: 'menu',
description: 'Menu de comandos e jogos de RPG.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menualteradores(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
isGroupRequired: true,
sendAudio: true,
mentionedJid: [sender]
});
},
};
