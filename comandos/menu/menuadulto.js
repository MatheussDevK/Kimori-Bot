import linguagem from '../../config-bot/menus/menus.js';

export default {
name: 'menu15',
aliases: ['menuadulto', 'menuadultos'],
category: 'menu',
description: 'Menu de conteúdo adulto.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menuadulto(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
mentionedJid: [sender]
});
},
};
