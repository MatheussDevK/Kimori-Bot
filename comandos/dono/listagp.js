module.exports = {
name: 'listagp',
category: 'dono',
description: 'Lista todos os grupos em que o bot está, com link, membros e data de criação.',
async execute(ctx) {
const { reply, mess, SoDono, isnit, info, reagir, from, kiimorizinha, moment } = ctx;

if (!SoDono && !isnit && !info.key.fromMe) return reply(mess.onlyOwner());
await reagir(from, "🍂")
try {
const getGroups = await kiimorizinha.groupFetchAllParticipating();
const groups = Object.values(getGroups);
groups.sort((a, b) => b.participants.length - a.participants.length);
let teks1 = `*ᴇsᴛᴏᴜ ᴀᴛᴜᴀʟᴍᴇɴᴛᴇ ᴏᴘᴇʀᴀɴᴅᴏ ᴇᴍ ${groups.length} ɢʀᴜᴘᴏs ᴏᴜ ᴄᴏᴍᴜɴɪᴅᴀᴅᴇs.*\n`;
for (let i = 0; i < groups.length; i++) {
const group = groups[i];
try {
const metadt = await kiimorizinha.groupMetadata(group.id);
const linkdogp = await kiimorizinha.groupInviteCode(group.id);
teks1 += `『 ${i + 1} 』ɴᴏᴍᴇ ᴅᴏ ɢʀᴜᴘᴏ: ${group.subject}\n`;
teks1 += `ɪᴅ ᴅᴏ ɢʀᴜᴘᴏ: ${group.id}\n`;
teks1 += `ʟɪɴᴋ: https://chat.whatsapp.com/${linkdogp}\n`;
teks1 += `ᴄʀɪᴀᴅᴏ ᴇᴍ: ${moment(group.creation * 1000)
.tz('America/Sao_Paulo')
.format('DD/MM/YYYY HH:mm:ss')}\n`;
teks1 += `ᴍᴇᴍʙʀᴏs: ${group.participants.length}\n—\n`;
} catch (err) {
teks1 += `『 ${i + 1} 』ɴᴏᴍᴇ ᴅᴏ ɢʀᴜᴘᴏ: ${group.subject}\n`;
teks1 += `ɪᴅ ᴅᴏ ɢʀᴜᴘᴏ: ${group.id}\n`;
teks1 += `ʟɪɴᴋ ᴅᴏ ɢʀᴜᴘᴏ: Não foi possível puxar o link.\n`;
teks1 += `ɴᴀᴏ ғᴏɪ ᴘᴏssɪᴠᴇʟ ᴘᴇɢᴀʀ ᴀs ɪɴғᴏʀᴍᴀᴄᴏᴇs\n\n`;
}
await new Promise((resolve) => setTimeout(resolve, 100));
}
reply(teks1);
} catch (error) {
console.error(error);
reply(mess.error());
}
},
};
