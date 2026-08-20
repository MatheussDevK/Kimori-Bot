const linguagem = require('../../config-bot/menus/menus.js');

module.exports = {
name: 'menu6',
aliases: ['menupesquisas', 'menupesquisar'],
category: 'menu',
description: 'Menu de comandos de pesquisas.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menupesq(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
sendAudio: true,
mentionedJid: [sender]
});
},
};
