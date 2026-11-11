import linguagem from '../../config-bot/menus/menus.js';

export default {
name: 'menu3',
aliases: ['menuadm'],
category: 'menu',
description: 'Menu de comandos de administrador.',
async execute(ctx) {
const { from, selo, sendMenu, prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff } = ctx;
await sendMenu(from, selo, {
caption: linguagem.adms(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff),
isAdminRequired: true,
mentionedJid: [sender]
});
},
};
