const { cu } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'cu',
category: 'brincadeiras',
description: 'Sorteia quantos cm de profundidade o alvo tem.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, sender_ou_n, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if (!isGroup) return reply(mess.onlyGroup())
if (!isModobn) return reply(mess.onlyGroupFun(prefix))
await kiimorizinha.sendMessage(from, {
text: `Pesquisando quantos cm de profundidade tem seu bozo @${sender_ou_n.split("@")[0]}, aguarde...`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async () => {
const random = `${Math.floor(Math.random() * 110)}`
await kiimorizinha.sendMessage(from, {
image: { url: cu },
caption: `Quantos cm o(a) *@${sender_ou_n.split("@")[0]}* tem no bozo ?\n• A chance é de *${random}cm* 😳`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
}
};
