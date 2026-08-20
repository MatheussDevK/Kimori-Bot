const fs = require('fs');

module.exports = {
name: 'mute',
aliases: ['muta', 'mutar'],
category: 'admin',
description: 'Muta ou silencia um usuário marcado no grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, menc_os2,
botNumberLID, nmrdn, vip, groupAdmins, q, grupoMute, muted, mention, sender,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if (!menc_os2) return reply(`*🎯 ᴍᴇɴᴄɪᴏɴᴇ ǫᴜᴇᴍ ǫᴜᴇʀ ᴘᴜɴɪʀ*`);

if (menc_os2 == botNumberLID) return reply(`*ɴᴀᴏ ᴘᴏssᴏ ᴍᴜᴛᴀʀ ᴏ ʙᴏᴛ 😵*`);
if (menc_os2 == nmrdn) return reply(`*ɴᴀᴏ ᴏᴜsᴇ ᴛᴏᴄᴀʀ ɴᴏ ᴍᴇᴜ ᴅᴏɴᴏ 💢*`);
if (vip.map(i => i.id).includes(menc_os2)) return reply(`*ɴᴀᴏ ᴍᴇxᴀ ᴄᴏᴍ ǫᴜᴇᴍ ᴇ ᴠɪᴘ 😎*`);
if (groupAdmins.includes(menc_os2)) return reply(`*ɴᴀᴏ ᴘᴏᴅᴇ ᴍᴜᴛᴀʀ ᴜᴍ ᴀᴅᴍɪɴ*`);

const tipo = q.toLowerCase().includes("silenciar") ? "silenciar" : "mutar";

if (tipo === "silenciar") {
if (grupoMute.silenciados.includes(menc_os2))
return mention(`*ᴏ @${menc_os2.split('@')[0]} ᴊᴀ ᴇsᴛᴀ sɪʟᴇɴᴄɪᴀᴅᴏ*`);

grupoMute.silenciados.push(menc_os2);
fs.writeFileSync("./database/grupos/muted.json", JSON.stringify(muted, null, 2));
mention(`*ᴏ @${menc_os2.split('@')[0]} ꜰᴏɪ sɪʟᴇɴᴄɪᴀᴅᴏ ᴘᴏʀ @${sender.split('@')[0]} 🔇*`);
}

if (tipo === "mutar") {
if (grupoMute.mutados.includes(menc_os2))
return mention(`ᴏ @${menc_os2.split('@')[0]} ᴊᴀ ᴇsᴛᴀ ᴍᴜᴛᴀᴅᴏ`);

grupoMute.mutados.push(menc_os2);
fs.writeFileSync("./database/grupos/muted.json", JSON.stringify(muted, null, 2));
mention(`*ᴏ @${menc_os2.split('@')[0]} ꜰᴏɪ ᴍᴜᴛᴀᴅᴏ ᴘᴏʀ @${sender.split('@')[0]} 🚫*`);
}
},
};
