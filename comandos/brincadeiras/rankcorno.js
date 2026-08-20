const { rnkcorno } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankcorno',
aliases: ['rankcornos'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de chifrudos do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsCorno = []
let rankCorno = `🐂 TOP 5 MAIS CHIFRUDOS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsCorno.push(membro)
rankCorno += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnkcorno}, caption: rankCorno, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsCorno}}, {quoted: selo})
}
};
