const linguagem = require('../../config-bot/menus/menus.js');

module.exports = {
name: 'menu14',
aliases: ['menuhentai', 'menuhentais'],
category: 'menu',
description: 'Menu de conteúdo hentai.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menuhentai(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
sendAudio: true,
mentionedJid: [sender]
});
},
};
