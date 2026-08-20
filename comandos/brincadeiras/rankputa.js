const { rnkputa } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankputa',
aliases: ['rankputas'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de putas do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsPuta = []
let rankPuta = `🔞 RANK DAS 5 MAIS PUTAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsPuta.push(membro)
rankPuta += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnkputa}, caption: rankPuta, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsPuta}}, {quoted: selo})
}
};
