import { carregarMidia } from '../../arquivos/funcoes/functions.js';
import linguagem from '../../config-bot/menus/menus.js';

export default {
name: 'menu',
category: 'menu',
description: 'Menu principal.',
async execute(ctx) {
const {
prefix, sender, emojii, botNome, isBotoff, isBotoes, reagir, from,
pushname, BotVersion, isChVip, isCargo,
kiimorizinha, selo, sendInteractiveMessage, sendMenu, ChannelContextNewsLetter,
} = ctx;

const captionMenu = linguagem.menu(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff);

await sendMenu(from, selo, {
caption: captionMenu,
mentionedJid: [sender]
});
},
};
