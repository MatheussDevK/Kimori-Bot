const { rankbct } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankbct',
aliases: ['rankbuceta', 'rankbucetudas'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de bucetudas do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsBCT = []
let rankBCT = `🔥 RANK DAS 5 MAIS BUCETUDAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsBCT.push(membro)
rankBCT += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rankbct}, caption: rankBCT, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsBCT}}, {quoted: selo})
}
};
