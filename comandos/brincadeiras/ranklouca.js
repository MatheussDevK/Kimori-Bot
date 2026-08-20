const { rnklouca } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'ranklouca',
aliases: ['rankloucas'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de loucas do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsLouca = []
let rankLouca = `💀 RANK DAS 5 MAIS LOUCAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsLouca.push(membro)
rankLouca += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnklouca}, caption: rankLouca, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsLouca}}, {quoted: selo})
}
};
