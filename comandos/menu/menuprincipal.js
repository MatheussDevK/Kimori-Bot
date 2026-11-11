import linguagem from '../../config-bot/menus/menus.js';

export default {
name: 'menu1',
aliases: ['menuprincipal'],
category: 'menu',
description: 'Menu principal (texto).',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menucompleto(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
mentionedJid: [sender]
});
},
};
