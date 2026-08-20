const fs = require('fs');

module.exports = {
name: 'limpar_contador',
aliases: ['clean_counter'],
category: 'dono',
description: 'Zera o contador de mensagens de todos os membros do grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, SoDono, isnit, issupre, ischyt,
getGroupIndex, from, countMessage,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono && !isnit && !issupre && !ischyt) return reply(mess.onlyOwner());
const groupIndex = getGroupIndex(from);
if (groupIndex === -1) return reply("*ᴇsᴛᴇ ɢʀᴜᴘᴏ ɴᴀᴏ ᴘᴏssᴜɪ ᴄᴏɴᴛᴀᴅᴏʀ. *");
const totalAntes = countMessage[groupIndex].numbers.length;
countMessage[groupIndex].numbers = [];
fs.writeFileSync('./database/countmsg.json', JSON.stringify(countMessage));
const mensagem = totalAntes > 0
? `*ᴄᴏɴᴛᴀᴅᴏʀ ᴅᴇ ᴍᴇɴꜱᴀɢᴇᴍ ᴅᴇꜱᴛᴇ ɢʀᴜᴩᴏ ʟɪᴍᴩᴏ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ ꜱᴇɴʜᴏʀ(ᴀ), ꜰᴏʀᴀᴍ ɴᴏ ᴛᴏᴛᴀʟ ${totalAntes} ᴄᴏɴᴛᴀᴛᴏꜱ *`
: '*ɴᴇɴʜᴜᴍ ᴄᴏɴᴛᴀᴛᴏ ꜰᴏɪ ᴇɴᴄᴏɴᴛʀᴀᴅᴏ, ᴇꜱᴛᴀ ᴛᴜᴅᴏ ʟɪᴍᴩᴏ ꜱᴇɴʜᴏʀ(ᴀ)*';
reply(mensagem);
},
};
