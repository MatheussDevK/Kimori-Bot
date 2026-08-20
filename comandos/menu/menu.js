const { carregarMidia } = require('../../arquivos/funcoes/functions.js');
const linguagem = require('../../config-bot/menus/menus.js');

module.exports = {
name: 'menu',
category: 'menu',
description: 'Menu principal.',
async execute(ctx) {
const {
prefix, sender, emojii, botNome, isBotoff, isBotoes, reagir, from,
isAudioMenu, sendAudioMenu, pushname, BotVersion, isChVip, isCargo,
kiimorizinha, selo, sendInteractiveMessage, sendMenu, ChannelContextNewsLetter,
} = ctx;

const captionMenu = linguagem.menu(prefix, sender, isChVip, emojii, isCargo, botNome, BotVersion, isBotoff);

await sendMenu(from, selo, {
caption: captionMenu,
sendAudio: true,
mentionedJid: [sender]
});
},
};
