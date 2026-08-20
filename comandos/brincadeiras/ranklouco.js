const { rnklouco } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'ranklouco',
aliases: ['rankloucos'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de loucos do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsLouco = []
let rankLouco = `💀 RANK DOS 5 MAIS LOUCOS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsLouco.push(membro)
rankLouco += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnklouco}, caption: rankLouco, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsLouco}}, {quoted: selo})
}
};
