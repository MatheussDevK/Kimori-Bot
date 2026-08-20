const { rnkcarioca } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankcarioca',
aliases: ['rankcariocas'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de cariocas do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsCarioca = []
let rankCarioca = `🔫 RANK DOS 5 MAIS CARIOCAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsCarioca.push(membro)
rankCarioca += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnkcarioca}, caption: rankCarioca, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsCarioca}}, {quoted: selo})
}
};
