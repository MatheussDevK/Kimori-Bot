const fs = require('fs');

module.exports = {
name: 'banghost',
category: 'admin',
description: 'Remove do grupo os membros com atividade igual ou menor que o limite informado.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, q, prefix, command, from, groupName, groupMembers, groupAdmins, countMessage, numerodono, botNumber, kiimorizinha } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if (!q || q.match(/[a-z]/i) || q.length > 3)
return reply(`*ᴅɪɢɪᴛᴇ ᴀ ǫᴜᴀɴᴛɪᴅᴀᴅᴇ ᴍɪɴɪᴍᴀ ᴘᴀʀᴀ ʀᴇᴍᴏᴠᴇʀ *\n*Exemplo:* ${prefix + command} 5`);

const limite = Number(q.trim());
const ind = countMessage.map(i => i.groupId).indexOf(from);
if (ind === -1) return reply('Não há dados deste grupo ainda.');

const groupData = countMessage[ind];
const groupMemberIds = groupMembers.map(m => m.jid);
const membersToRemove = groupData.numbers
.filter(u => {
const msgs = u.messages || 0;
const cmds = u.cmd_messages || 0;
const figus = u.figus || 0;
const imgs = u.imagens || 0;
const vids = u.videos || 0;
const auds = u.audios || 0;
const docs = u.documentos || 0;
return (msgs <= limite && cmds <= limite && figus <= limite && imgs <= limite && vids <= limite && auds <= limite && docs <= limite);
})
.filter(u => !groupAdmins.includes(u.id))
.filter(u => !numerodono.includes(u.id))
.filter(u => u.id !== botNumber)
.filter(u => groupMemberIds.includes(u.id))
.map(u => u.id);

if (membersToRemove.length === 0)
return reply(`*ɴᴀᴏ ᴛᴇᴍ ᴍᴇᴍʙʀᴏꜱ ᴄᴏᴍ ${limite} ᴍᴇɴꜱᴀɢᴇɴꜱ ᴘᴀʀᴀ ʀᴇᴍᴏᴠᴇʀ.* `);

try {
await kiimorizinha.groupParticipantsUpdate(from, membersToRemove, 'remove');
groupData.numbers = groupData.numbers.filter(u => !membersToRemove.includes(u.id));
fs.writeFileSync('./database/countmsg.json', JSON.stringify(countMessage, null, 2));
reply(`*ᴛᴏᴛᴀʟ ᴅᴇ ${membersToRemove.length} ᴍᴇᴍʙʀᴏꜱ ʀᴇᴍᴏᴠɪᴅᴏꜱ ᴅᴏ ɢʀᴜᴩᴏ ${groupName} ᴘᴏʀ ᴄᴏɴᴛᴇʀ ${limite} ᴍᴇɴꜱᴀɢᴇɴꜱ.*`);
} catch (err) {
console.error(err);
reply(mess.error());
}
},
};
