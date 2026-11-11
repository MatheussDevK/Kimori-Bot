export default {
name: 'brlist',
aliases: ['listabr'],
category: 'admin',
description: 'Lista os membros do grupo com números brasileiros (DDI 55).',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, reagir,
groupMembers, normalizar, botNumber, isBotJid,
kiimorizinha, from, selo,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
reagir(from, "🇧🇷");
let totalBr = 0;
let txtBr = `*━━━━━━━━━━━━━━━━━━━━━━━*\n*🇧🇷 ɴᴜᴍᴇʀᴏꜱ ʙʀᴀꜱɪʟᴇɪʀᴏꜱ ɴᴏ ɢʀᴜᴘᴏ:*\n*━━━━━━━━━━━━━━━━━━━━━━━*\n\n`;
let mencionadosBr = [];
for (let membro of groupMembers) {
const jid = normalizar(membro.id);
// em grupo com LID o id não é o telefone: usa o phoneNumber (antes nenhum LID era contado)
const telefone = String(membro.phoneNumber || (jid.endsWith('@s.whatsapp.net') ? jid : '')).split('@')[0].split(':')[0];
const numero = telefone || jid.split("@")[0];
if (telefone && numero.startsWith("55") && !isBotJid(jid)) {
totalBr++;
if (isGroupAdmins) mencionadosBr.push(jid);
txtBr += `╰➤ ${isGroupAdmins ? '@' : 'https://wa.me/'}${numero}\n`;}}
txtBr += `\n*━━━━━━━━━━━━━━━━━━━━━━━*\n*🇧🇷 ᴛᴏᴛᴀʟ ʙʀᴀꜱɪʟᴇɪʀᴏꜱ: ${totalBr}*\n*━━━━━━━━━━━━━━━━━━━━━━━*`;
if (totalBr > 0) {
if (isGroupAdmins) {
kiimorizinha.sendMessage(from, { text: txtBr, mentions: mencionadosBr }, { quoted: selo });
} else reply(txtBr);
} else reply("*ɴᴀᴏ ʜᴀ ɴᴜᴍᴇʀᴏꜱ ʙʀᴀꜱɪʟᴇɪʀᴏꜱ ɴᴏ ɢʀᴜᴘᴏ *");
},
};
