const linguagem = require('../../config-bot/menus/menus.js');

module.exports = {
name: 'menu7',
aliases: ['menufigs', 'menufigurinhas'],
category: 'menu',
description: 'Menu de comandos de figurinhas.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menufigs(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
sendAudio: true,
mentionedJid: [sender]
});
},
};
