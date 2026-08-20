module.exports = {
name: 'linkgp',
aliases: ['linkgroup'],
category: 'admin',
description: 'Mostra o link de convite do grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, kiimorizinha, from } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
const linkgc = await kiimorizinha.groupInviteCode(from);
reply(`*✨ → ᴀᴄᴇꜱꜱᴇ ᴏ ʟɪɴᴋ ᴅᴏ ɢʀᴜᴩᴏ ᴀᴛᴜᴀʟ ᴀʙᴀɪxᴏ ↴*\nhttps://chat.whatsapp.com/` + linkgc);
},
};
