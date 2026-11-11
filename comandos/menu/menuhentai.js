import linguagem from '../../config-bot/menus/menus.js';

export default {
name: 'menu14',
aliases: ['menuhentai', 'menuhentais'],
category: 'menu',
description: 'Menu de conteúdo hentai.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menuhentai(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
mentionedJid: [sender]
});
},
};
