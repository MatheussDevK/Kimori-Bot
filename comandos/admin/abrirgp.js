module.exports = {
name: 'abrirgp',
aliases: ['abertura'],
category: 'admin',
description: 'Programa um horário (HH:mm) para o grupo abrir automaticamente.',
async execute(ctx) {
const { reply, mess, isGroupAdmins, isBotGroupAdmins, q, from, definirAbertura } = ctx;

if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
try {
let barra = q.trim();
if (!barra.includes(':')) return reply('*ꜰᴏʀᴍᴀᴛᴏ ɪɴᴠᴀ́ʟɪᴅᴏ, ᴜꜱᴇ ʜʜ:ᴍᴍ* ❌');
let [horas, minutos] = barra.split(':');
if (!horas || !minutos) return reply('*ʜᴏʀᴀʀɪᴏ ɪɴᴄᴏᴍᴘʟᴇᴛᴏ, ᴜꜱᴇ ʜʜ:ᴍᴍ* ⚠️');
if (isNaN(horas) || isNaN(minutos)) return reply('*ᴜꜱᴇ ᴀᴘᴇɴᴀꜱ ɴᴜ́ᴍᴇʀᴏꜱ ɴᴏ ʜᴏʀᴀʀɪᴏ* 🔢');
horas = horas.padStart(2, '0');
minutos = minutos.padStart(2, '0');
if (parseInt(horas) > 23 || parseInt(minutos) > 59) return reply('*ʜᴏʀᴀ́ʀɪᴏ ɪɴᴠᴀ́ʟɪᴅᴏ* ❌');
let horarioFinal = `${horas}:${minutos}:00`;
definirAbertura(from, horarioFinal);
reply(`*🔓 ᴏ ɢʀᴜᴘᴏ ᴠᴀɪ ᴀʙʀɪʀ àꜱ ${horarioFinal}* ⏰\n-\n*ꜱᴇᴊᴀᴍ ʙᴇᴍ-ᴠɪɴᴅᴏꜱ ᴀᴏ ᴄᴀᴏꜱ ᴏʀɢᴀɴɪᴢᴀᴅᴏ ᴘᴏʀ ᴍɪᴍ...* `);
} catch (e) {
console.error('erro ao definir abertura:', e);
reply('*ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ ᴀᴏ ᴅᴇꜰɪɴɪʀ ᴏ ʜᴏʀᴀʀɪᴏ ᴅᴇ ᴀʙᴇʀᴛᴜʀᴀ* ❌');
}
},
};
