const { rnkgay } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankgay',
aliases: ['rankgays'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de gays do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsGay = []
let rankGay = `🏳️‍🌈 RANK DOS 5 MAIS GAY DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsGay.push(membro)
rankGay += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnkgay}, caption: rankGay, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsGay}}, {quoted: selo})
}
};
