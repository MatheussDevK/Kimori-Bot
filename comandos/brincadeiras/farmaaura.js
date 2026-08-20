const { farmaaura } = require('../../config-bot/logos/links_img.json');

module.exports = {
name: 'farmaaura',
aliases: ['farmaraura'],
category: 'brincadeiras',
description: 'Quanto a pessoa farmou aura.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, sender_ou_n, kiimorizinha, from, ChannelContextNewsLetter, selo, reply
} = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isModobn) return reply(mess.onlyGroupFun(prefix));
const user = `@${sender_ou_n.split("@")[0]}`;
await kiimorizinha.sendMessage(from, { text: `${user} vai farmar aura...`, contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender_ou_n]} }, { quoted: selo });
setTimeout(async () => {
const aura = Math.floor(Math.random() * 199999) - 99999;
const auraFormatada = `${aura > 0 ? '+' : ''}${aura}`;
let texto;
if (aura <= -10000) {
texto = `${user} Você é um *Betinha Mogged* e Farmou *${auraFormatada} aura* 💀📉`;
} else if (aura < 0) {
texto = `${user} Você perdeu aura e Farmou *${auraFormatada} aura* 😭📉`;
} else if (aura >= 90000) {
texto = `${user} *FARMADOR DE AURA SUPREMO!* 👑🔥\n\nVocê Farmou *${auraFormatada} aura*.\n♾️ *Aura Infinita!*`;
} else if (aura >= 50000) {
texto = `${user} *Farmador de aura!* 🔥\n\nVocê Farmou *${auraFormatada} aura* 😎`;
} else {
texto = `${user} Farmou *${auraFormatada} aura* ✨`;
}
await kiimorizinha.sendMessage(from, {
video: { url: farmaaura },
gifPlayback: true,
caption: texto,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender_ou_n]}
}, { quoted: selo });
}, 0);
}
};