const fs = require('fs');

module.exports = {
name: 'desmute',
aliases: ['unmute', 'desmutar', 'desmuta'],
category: 'admin',
description: 'Remove o mute/silêncio de um usuário marcado no grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, menc_os2,
grupoMute, muted, mention, sender,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if (!menc_os2) return reply(`*🎯 ᴍᴇɴᴄɪᴏɴᴇ ǫᴜᴇᴍ ǫᴜᴇʀ ᴅᴇsᴍᴜᴛᴀʀ*`);

if (!grupoMute.silenciados.includes(menc_os2) && !grupoMute.mutados.includes(menc_os2))
return mention(`*ᴏ @${menc_os2.split('@')[0]} ɴᴀᴏ ᴇsᴛᴀ ᴘᴜɴɪᴅᴏ*`);

grupoMute.silenciados = grupoMute.silenciados.filter(id => id !== menc_os2);
grupoMute.mutados = grupoMute.mutados.filter(id => id !== menc_os2);
fs.writeFileSync("./database/grupos/muted.json", JSON.stringify(muted, null, 2));
mention(`*ᴏ @${menc_os2.split('@')[0]} ꜰᴏɪ ʟɪʙᴇʀᴀᴅᴏ ᴘᴏʀ @${sender.split('@')[0]} *`);
},
};
