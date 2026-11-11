import linguagem from '../../config-bot/menus/menus.js';

export default {
name: 'menu9',
aliases: ['menuanimes'],
category: 'menu',
description: 'Menu de comandos de animes.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menuanimes(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
mentionedJid: [sender]
});
},
};
