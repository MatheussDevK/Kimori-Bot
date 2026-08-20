const { imgbaiano } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'baiano',
category: 'brincadeiras',
description: 'Sorteia uma porcentagem de chance de baiano pro alvo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, sender_ou_n, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await kiimorizinha.sendMessage(from, {
text:`Pesquisando a sua ficha de baiano @${sender_ou_n.split("@")[0]}, aguarde...`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async () => {
const random = `${Math.floor(Math.random() * 110)}`
await kiimorizinha.sendMessage(from, {
image: {url: imgbaiano},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa baiana?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
}
};
