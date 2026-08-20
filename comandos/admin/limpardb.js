const fs = require('fs');
const { isJsonIncludes } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'limpardb',
category: 'admin',
description: 'Remove da database os membros que já saíram do grupo (ghosts).',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, SoDono, from, groupMembers, countMessage } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());

const AB = countMessage.map(i => i.groupId).indexOf(from);
if (AB === -1) return reply('*ɴᴀᴏ ʜᴀ ᴅᴀᴅᴏs ᴅᴇsᴛᴇ ɢʀᴜᴘᴏ ᴀɪɴᴅᴀ.*');

const total = countMessage[AB].participants.length;
const caixa = [];
for (let i = 0; i < countMessage[AB].participants.length; i++) {
if (isJsonIncludes(groupMembers, countMessage[AB].participants[i].id)) {
caixa.push(countMessage[AB].participants[i]);
}
}

const pack = total - caixa.length;
if (pack <= 0) return reply("*ᴛᴏᴅᴏs ᴏs ɢʜᴏsᴛ ғᴏʀᴀᴍ ʟɪᴍᴘᴀᴅᴏs ᴅᴀ ᴅᴀᴛᴀʙᴀsᴇ 🙅‍♂️*");

countMessage[AB].participants = caixa;
fs.writeFileSync('./database/countmsg.json', JSON.stringify(countMessage));
reply(`*${pack} ғᴏʀᴀᴍ ᴅᴇʟᴇᴛᴀᴅᴏs ᴄᴏᴍ sᴜᴄᴇssᴏ ✅*`);
},
};
