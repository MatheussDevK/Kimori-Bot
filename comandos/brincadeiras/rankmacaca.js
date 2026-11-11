import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_links_img = loadJSON(new URL('../../config-bot/logos/links_img.json', import.meta.url));

const { rnkmacaca } = __json_links_img;
export default {
name: 'rankmacaca',
aliases: ['rankmacacas'],
category: 'brincadeiras',
description: 'Gera um rank aleatório de macacas do grupo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, somembros, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsMacaca = []
let rankMacaca = `🙈 RANK DAS 5 MAIS MACACAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsMacaca.push(membro)
rankMacaca += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await kiimorizinha.sendMessage(from, {image: {url: rnkmacaca}, caption: rankMacaca, contextInfo:{...ChannelContextNewsLetter, mentionedJid: mentionsMacaca}}, {quoted: selo})
}
};
