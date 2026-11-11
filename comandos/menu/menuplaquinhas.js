import linguagem from '../../config-bot/menus/menus.js';

export default {
name: 'menu13',
aliases: ['menuplaquinhas', 'menuplaquinha'],
category: 'menu',
description: 'Menu do gerador de plaquinhas.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menuplaqs(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
mentionedJid: [sender]
});
},
};
