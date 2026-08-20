const { rnkmacaco } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankmacaco',
aliases: ['rankmacacos'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de macacos do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsMacaco = []
let rankMacaco = `🐒 RANK DOS 5 MAIS MACACOS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsMacaco.push(membro)
rankMacaco += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnkmacaco}, caption: rankMacaco, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsMacaco}}, {quoted: selo})
}
};
