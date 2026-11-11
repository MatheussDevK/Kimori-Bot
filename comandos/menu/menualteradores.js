import linguagem from '../../config-bot/menus/menus.js';

export default {
name: 'menu19',
aliases: ['alteradores', 'menualteradores'],
category: 'menu',
description: 'Menu de comandos e jogos de RPG.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menualteradores(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
isGroupRequired: true,
mentionedJid: [sender]
});
},
};
