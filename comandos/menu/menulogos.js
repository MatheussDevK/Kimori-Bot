import linguagem from '../../config-bot/menus/menus.js';

export default {
name: 'menu11',
aliases: ['menulogos', 'menulogo'],
category: 'menu',
description: 'Menu de comandos para gerar logos.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menulogos(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
mentionedJid: [sender]
});
},
};
