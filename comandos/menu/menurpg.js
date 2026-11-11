import linguagem from '../../config-bot/menus/menus.js';

export default {
name: 'menu10',
aliases: ['menurpg', 'rpgmenu'],
category: 'menu',
description: 'Menu de comandos e jogos de RPG.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.menurpg(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
isGroupRequired: true,
mentionedJid: [sender]
});
},
};
