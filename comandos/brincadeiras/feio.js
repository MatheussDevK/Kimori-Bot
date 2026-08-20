const { imgfeio } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'feio',
category: 'brincadeiras',
description: 'Sorteia uma porcentagem de chance de feio pro alvo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, sender_ou_n, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await kiimorizinha.sendMessage(from, {
text: `Pesquisando a sua ficha de feio: *@${sender_ou_n.split("@")[0]}* aguarde...`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async () => {
let percent = Math.floor(Math.random() * 110)
let status = ''
if(percent < 20) status = 'Não é feio'
else if(percent <= 50) status = 'Meio feio'
else if(percent <= 80) status = 'Feio moderado'
else status = 'Feio demais'
await kiimorizinha.sendMessage(from, {
image: {url: imgfeio},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa feia?\n• A porcentagem de chance é *${percent}%*, ${status}`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
}
};
