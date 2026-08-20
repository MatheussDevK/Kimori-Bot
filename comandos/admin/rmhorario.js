module.exports = {
name: 'rmhorario',
aliases: ['remover_horario', 'removerhorario'],
category: 'admin',
description: 'Remove os horários programados de abertura/fechamento do grupo.',
async execute(ctx) {
const { reply, mess, isGroupAdmins, isBotGroupAdmins, from, horarios, removerHorarios } = ctx;

if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
try {
if (!horarios[from]) return reply('*ɴᴀ̃ᴏ ʜᴀ́ ʜᴏʀᴀ́ʀɪᴏꜱ ᴘʀᴏɢʀᴀᴍᴀᴅᴏꜱ ᴘᴀʀᴀ ᴇꜱᴛᴇ ɢʀᴜᴘᴏ* ❌');
removerHorarios(from);
reply('*ʜᴏʀᴀ́ʀɪᴏꜱ ʀᴇᴍᴏᴠɪᴅᴏꜱ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ* ');
} catch (e) {
console.error('erro ao remover horario:', e);
reply('*ɴᴀ̃ᴏ ꜰᴏɪ ᴘᴏꜱꜱɪ́ᴠᴇʟ ʀᴇᴍᴏᴠᴇʀ ᴏꜱ ʜᴏʀᴀ́ʀɪᴏꜱ* ❌');
}
},
};
