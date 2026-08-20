const { rnksigma } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'ranksigma',
aliases: ['ranksigmas'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de sigmas do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsSigma = []
let rankSigma = `🗿🍷 RANK DOS 5 MAIS SIGMAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsSigma.push(membro)
rankSigma += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnksigma}, caption: rankSigma, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsSigma}}, {quoted: selo})
}
};
