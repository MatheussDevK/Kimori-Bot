import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const __json_links_img = loadJSON(new URL('../../config-bot/logos/links_img.json', import.meta.url));

const { imggostoso } = __json_links_img;
export default {
name: 'gostoso',
category: 'brincadeiras',
description: 'Sorteia uma porcentagem de chance de gostoso pro alvo.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, sender_ou_n, kiimorizinha, from, ChannelContextNewsLetter, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await kiimorizinha.sendMessage(from, {
text:`Pesquisando a sua ficha de gostoso @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async () => {
const random = `${Math.floor(Math.random() * 110)}`
await kiimorizinha.sendMessage(from, {
image: {url: imggostoso},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa gostosa?\n• A porcentagem de chance é *${random}%*`,
gifPlayback: true,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
}
};
