const { rankcasal } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'rankcasal',
aliases: ['rankcasalzin', 'rankcasais'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de casais do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, reagir, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup());
if(!isModobn) return reply(mess.onlyGroupFun(prefix));
await reagir(from, "💞");
let mentionsCasal = []
let rankCasal = `❣ RANK CASAIS DO GRUPO\n\n`;
for(let i=0;i<5;i++){
const m1 = somembros[Math.floor(Math.random()*somembros.length)];
const m2 = somembros[Math.floor(Math.random()*somembros.length)];
mentionsCasal.push(m1, m2);
const porcent = Math.floor(Math.random()*101);
rankCasal += `• ${i+1}° ${porcent}% - @${m1.split('@')[0]} e @${m2.split('@')[0]}\n\n`;
}
await kiimorizinha.sendMessage(from, {image: {url: rankcasal}, caption: rankCasal, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsCasal}}, {quoted: selo})
}
};
