const { rnkbeta } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankbeta',
aliases: ['rankbetas'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de betas do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsBeta = []
let rankBeta = `😂 RANK DOS 5 MAIS BETAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsBeta.push(membro)
rankBeta += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnkbeta}, caption: rankBeta, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsBeta}}, {quoted: selo})
}
};
