import linguagem from '../../config-bot/menus/menus.js';

export default {
name: 'menu4',
aliases: ['menubrincadeira', 'menubrincadeiras', 'menubn'],
category: 'menu',
description: 'Menu de brincadeiras e jogos.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.brincadeiras(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
isGroupRequired: true,
mentionedJid: [sender]
});
},
};
