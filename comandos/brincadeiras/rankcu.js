const { rankcu } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankcu',
category: 'brincadeiras',
description: 'Gera um rank aleatório de cuzudos do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsCu = []
let rankCu = `🍑 RANK DOS 5 MAIS CUZUDOS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsCu.push(membro)
rankCu += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rankcu}, caption: rankCu, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsCu}}, {quoted: selo})
}
};
