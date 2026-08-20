const { linguagem, getBuffer } = require('../../arquivos/funcoes/exports.js');
const { infodono } = require('../../config-bot/logos/links_img.json');

module.exports = {
name: 'infobot',
aliases: ['infodono', 'dono'],
category: 'geral',
description: 'Mostra informações do dono e do bot (número, status, etc).',
async execute(ctx) {
const {
reagir, from, emojii, kiimorizinha, prefix, botNome: NomeDoBot,
NumeroDoBot, ownerNumber, isBotoff, ownerName, botNumber, selo,
ChannelContextNewsLetter,
} = ctx;

await reagir(from, `${emojii}`)
try {
const thumbnail = await getBuffer(infodono);
if (!thumbnail) throw new Error("Thumbnail não carregado");

await kiimorizinha.sendMessage(from, {
video: thumbnail,
caption: linguagem.dono(prefix, NomeDoBot, NumeroDoBot, ownerNumber, isBotoff, ownerName, botNumber, emojii),
gifPlayback: true,
contextInfo: ChannelContextNewsLetter
}, { quoted: selo });
} catch (e) {
console.error("Erro ao executar o comando:", e);
await kiimorizinha.sendMessage(from, { text: linguagem.dono(prefix, NomeDoBot, NumeroDoBot, ownerNumber, isBotoff, ownerName, botNumber, emojii) }, { quoted: selo });
}
},
};
