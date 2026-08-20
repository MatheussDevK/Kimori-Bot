const { rnkbaiana } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankbaiana',
aliases: ['rankbaianas'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de baianas do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsBaiana = []
let rankBaiana = `😴 RANK DAS 5 MAIS BAIANAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsBaiana.push(membro)
rankBaiana += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnkbaiana}, caption: rankBaiana, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsBaiana}}, {quoted: selo})
}
};
