const { rnknazista } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'ranknazista',
aliases: ['ranknazistas'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de nazistas do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsNazista = []
let rankNazista = `💂‍♂ RANK DOS 5 MAIS NAZISTAS DO GRUPO 卐\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsNazista.push(membro)
rankNazista += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnknazista}, caption: rankNazista, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsNazista}}, {quoted: selo})
}
};
