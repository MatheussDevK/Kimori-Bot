const { rnkgostosa } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankgostosa',
aliases: ['rankgostosas'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de gostosas do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsGostosa = []
let rankGostosa = `😏 RANK DAS 5 MAIS GOSTOSAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsGostosa.push(membro)
rankGostosa += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnkgostosa}, caption: rankGostosa, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsGostosa}}, {quoted: selo})
}
};
