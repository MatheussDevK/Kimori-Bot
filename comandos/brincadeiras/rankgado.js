const { rnkgado } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankgado',
aliases: ['rankgados'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de gados do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsGado = []
let rankGado = `🏆 TOP 5 MAIS GADOS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsGado.push(membro)
rankGado += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnkgado}, caption: rankGado, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsGado}}, {quoted: selo})
}
};
