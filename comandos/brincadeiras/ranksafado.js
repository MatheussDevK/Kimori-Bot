const { rnksafado } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'ranksafado',
aliases: ['ranksafados'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de safados do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsSafado = []
let rankSafado = `🥵 RANK DOS 5 MAIS SAFADINHOS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsSafado.push(membro)
rankSafado += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnksafado}, caption: rankSafado, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsSafado}}, {quoted: selo})
}
};
