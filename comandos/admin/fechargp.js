module.exports = {
name: 'fechargp',
aliases: ['fechamento'],
category: 'admin',
description: 'Programa um horário (HH:mm) para o grupo fechar automaticamente.',
async execute(ctx) {
const { reply, mess, isGroupAdmins, isBotGroupAdmins, q, from, definirFechamento } = ctx;

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
definirFechamento(from, horarioFinal);
await reply(`*🔒 ᴏ ɢʀᴜᴘᴏ ꜱᴇʀᴀ́ ꜰᴇᴄʜᴀᴅᴏ àꜱ ${horarioFinal}* ⏳\n-\n*ꜱᴇᴊᴀᴍ ʙᴇᴍ-ᴠɪɴᴅᴏꜱ ᴀᴏ ᴄᴀᴏꜱ ᴏʀɢᴀɴɪᴢᴀᴅᴏ ᴘᴏʀ ᴍɪᴍ...* `);
} catch (e) {
console.error('erro ao definir fechamento:', e);
reply('*ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ ᴀᴏ ᴅᴇꜰɪɴɪʀ ᴏ ʜᴏʀᴀʀɪᴏ ᴅᴇ ꜰᴇᴄʜᴀᴍᴇɴᴛᴏ* ❌');
}
},
};
