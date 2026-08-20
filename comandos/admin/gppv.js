module.exports = {
name: 'gppv',
category: 'admin',
description: 'Envia o link de convite do grupo no privado de quem pediu.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins,
isCargo, kiimorizinha, from, sender, selo,
} = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
reply(`*ᴊᴀ ᴇsᴛᴏᴜ ᴇɴᴠɪᴀɴᴅᴏ ᴏ ʟɪɴᴋ ɴᴏ sᴇᴜ ᴘᴠ ${isCargo} 🙅‍♂️*`)
const linkgc = await kiimorizinha.groupInviteCode(from)
kiimorizinha.sendMessage(sender, { text: 'https://chat.whatsapp.com/' + linkgc}, {quoted: selo})
},
};
