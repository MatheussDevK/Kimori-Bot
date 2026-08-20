const fs = require('fs');

module.exports = {
name: 'tirardb',
aliases: ['tirar_docnt'],
category: 'dono',
description: 'Remove um usuário do contador de mensagens do grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, SoDono, isnit, issupre, ischyt,
getGroupIndex, from, info, args, countMessage, kiimorizinha,
selo, ChannelContextNewsLetter,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono && !isnit && !issupre && !ischyt) return reply(mess.onlyOwner());
const groupIndex = getGroupIndex(from);
if (groupIndex === -1) return reply("*ᴇsᴛᴇ ɢʀᴜᴘᴏ ɴᴀᴏ ᴘᴏssᴜɪ ᴄᴏɴᴛᴀᴅᴏʀ. *");
let alvo;
if (info.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
alvo = info.message.extendedTextMessage.contextInfo.mentionedJid[0];
} else if (args[0]) {
const num = args[0].replace(/\D/g, '');
if (!num) return reply('*ᴠᴏᴄᴇ ᴇʀʀᴏᴜ ᴇᴍ ᴀʟɢᴏ ᴀɪ sᴇɴʜᴏʀ(ᴀ) *');
alvo = num + '@s.whatsapp.net';
} else {
return reply(`* ᴠᴏᴄᴇ ᴄᴏʟᴏᴄᴏᴜ ᴇʀʀᴀᴅᴏ sᴇɴʜᴏʀ(ᴀ), ᴠᴏᴜ ᴅᴀʀ ᴜᴍ ᴇxᴇᴍᴘʟᴏ:*\n> *⚙️ → ${ctx.prefix + ctx.command} @ᴜsᴇʀ*`);
}
let userIndex = countMessage[groupIndex].numbers.findIndex(u => u.id === alvo);
if (userIndex === -1) {
return reply("*ᴇʟᴇ ɴᴇᴍ ᴛᴀ ɴᴏ ᴄᴏɴᴛᴀᴅᴏʀ, ǫᴜᴇʀ ǫᴜᴇ ᴇᴜ ғᴀᴄᴀ ᴍᴀɢɪᴄᴀ ᴇ? 🙄*");
}
countMessage[groupIndex].numbers.splice(userIndex, 1);
fs.writeFileSync('./database/countmsg.json', JSON.stringify(countMessage));
await kiimorizinha.sendMessage(from, {
text: `*ᴄᴇʀᴛᴏ ᴍᴇsᴛʀᴇ, ᴀᴄᴀʙᴇɪ ᴅᴇ ʀᴇᴍᴏᴠᴇʀ ᴏ @${alvo.split('@')[0]} ᴅᴏ ᴄᴏɴᴛᴀᴅᴏʀ ᴅᴇ ᴍᴇɴsᴀɢᴇᴍ *.`,
contextInfo: { mentionedJid: [alvo], ...ChannelContextNewsLetter }
}, { quoted: selo });
},
};
