module.exports = {
name: 'listafake',
aliases: ['listafakes'],
category: 'admin',
description: 'Lista os membros do grupo com números fora do DDI 55 (fakes).',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, reagir,
groupMembers, normalizar, kiimorizinha, from, selo,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
reagir(from, "🇺🇸");
let totalFake = 0;
let txtFake = `*━━━━━━━━━━━━━━━━━━━━━━━*\n*🇺🇸 ɴᴜᴍᴇʀᴏs ꜰᴀᴋᴇs ɴᴏ ɢʀᴜᴘᴏ:*\n*━━━━━━━━━━━━━━━━━━━━━━━*\n\n`;
let mencionadosFake = [];
for (let membro of groupMembers) {
const jid = normalizar(membro.id);
const numero = jid.split("@")[0];
if (!numero.startsWith("55")) {
totalFake++;
if (isGroupAdmins) mencionadosFake.push(jid);
txtFake += `╰➤ ${isGroupAdmins ? '@' : 'https://wa.me/'}${numero}\n`;}}
txtFake += `\n*━━━━━━━━━━━━━━━━━━━━━━━*\n*🇺🇸 ᴛᴏᴛᴀʟ ᴅᴇ ꜰᴀᴋᴇꜱ: ${totalFake}*\n*━━━━━━━━━━━━━━━━━━━━━━━*`;
if (totalFake > 0) {
if (isGroupAdmins) {
kiimorizinha.sendMessage(from, { text: txtFake, mentions: mencionadosFake }, { quoted: selo });
} else reply(txtFake);
} else reply("*ɴᴀᴏ ᴇxɪsᴛᴇ ɴᴇɴʜᴜᴍ ɴᴜᴍᴇʀᴏ ғᴀᴋᴇ ᴀǫᴜɪ ɴᴏ ɢʀᴜᴘᴏ *");
},
};
