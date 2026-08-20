const linguagem = require('../../config-bot/menus/menus.js');

module.exports = {
name: 'menu1',
aliases: ['menuprincipal'],
category: 'menu',
description: 'Menu principal (texto).',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menucompleto(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
sendAudio: true,
mentionedJid: [sender]
});
},
};
