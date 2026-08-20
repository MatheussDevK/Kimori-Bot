const { imggay } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'gay',
category: 'brincadeiras',
description: 'Sorteia uma porcentagem de chance de gay pro alvo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, sender_ou_n, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await kiimorizinha.sendMessage(from, {
text: `Pesquisando a sua ficha de gay: @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async () => {
let percent = Math.floor(Math.random() * 110)
let status = ''
if(percent < 20) status = 'hmm... você é hetero...'
else if(percent <= 50) status = '+/- boiola'
else if(percent <= 80) status = 'tenho minha desconfiança...'
else status = 'você é gay...'
await kiimorizinha.sendMessage(from, {
image: {url: imggay},
caption: `Qual é a porcentagem de chance do(a) *@${sender_ou_n.split("@")[0]}* ser gay?\n• *${percent}% homossexual*, ${status}`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
}
};
