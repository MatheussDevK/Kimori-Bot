const { casal } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'casal',
category: 'brincadeiras',
description: 'Sorteia dois membros do grupo pra formar um casal.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, reply, reagir, kiimorizinha, from, ChannelContextNewsLetter, selo, groupMembers } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await reagir(from, "💘");
let m1 = groupMembers[Math.floor(Math.random() * groupMembers.length)].id
let m2 = groupMembers[Math.floor(Math.random() * groupMembers.length)].id
let random = Math.floor(Math.random() * 100)
await kiimorizinha.sendMessage(from, { image: {url: casal}, caption: `👩🏼‍❤️‍💋‍👨🏻𝐒𝐈𝐍𝐓𝐎 𝐐𝐔𝐄 𝐄𝐒𝐒𝐄𝐒 𝐃𝐎𝐈𝐒 𝐅𝐎𝐑𝐌𝐀𝐑𝐈𝐀 𝐔𝐌 𝐎𝐓𝐈𝐌𝐎 𝐂𝐀𝐒𝐀𝐋:\n\n- @${m1.split("@")[0]}\n\n- @${m2.split("@")[0]}\n\n𝐂𝐎𝐌 𝐔𝐌𝐀 𝐄𝐒𝐏𝐄𝐂𝐓𝐀𝐓𝐈𝐕𝐀 𝐃𝐄:*${random}%*`, contextInfo: {...ChannelContextNewsLetter, mentionedJid: [m1, m2]}}, {quoted: selo}).catch(() => {reply(mess.error())})
}
};
