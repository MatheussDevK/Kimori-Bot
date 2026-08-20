const { rankfalido } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankfalido',
aliases: ['rankfalidos'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de falidos do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsFalido = []
let rankFalido = `💸 RANK DOS 5 MAIS FALIDOS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsFalido.push(membro)
rankFalido += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rankfalido}, caption: rankFalido, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsFalido}}, {quoted: selo})
}
};
