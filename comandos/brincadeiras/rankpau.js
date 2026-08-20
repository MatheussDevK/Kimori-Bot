const { rnkpau } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankpau',
category: 'brincadeiras',
description: 'Gera um rank aleatório de maiores paus do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsPau = []
let rankPau = `🍆 RANK DOS 5 MAIORES PAUS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsPau.push(membro)
rankPau += `• ${i+1}° ${Math.floor(Math.random()*100)}cm - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnkpau}, caption: rankPau, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsPau}}, {quoted: selo})
}
};
