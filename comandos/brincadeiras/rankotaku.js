const { rnkotaku } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankotaku',
aliases: ['rankotakus'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de otakus do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsOtaku = []
let rankOtaku = `㊙ RANK DOS 5 MAIS OTAKUS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsOtaku.push(membro)
rankOtaku += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnkotaku}, caption: rankOtaku, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsOtaku}}, {quoted: selo})
}
};
