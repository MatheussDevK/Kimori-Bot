const { rnkbaiano } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankbaiano',
aliases: ['rankbaianos'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de baianos do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsBaiano = []
let rankBaiano = `💤 RANK DOS 5 MAIS BAIANOS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsBaiano.push(membro)
rankBaiano += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnkbaiano}, caption: rankBaiano, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsBaiano}}, {quoted: selo})
}
};
