const { listarFigStickers } = require('../../arquivos/funcoes/command.js');

module.exports = {
name: 'listafig',
category: 'dono',
description: 'Lista todas as figurinhas registradas como comando, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, botNome: NomeDoBot } = ctx;

if (!SoDono) return reply(mess.onlyOwner());
const lista = listarFigStickers();
if (!lista.length) return reply('*ɴᴇɴʜᴜᴍᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴇꜱᴛᴀ́ ʀᴇɢɪꜱᴛʀᴀᴅᴀ *');
let msg = '- ──────❲ ʟɪꜱᴛᴀ ᴅᴇ ꜰɪɢᴜʀɪɴʜᴀꜱ ❳──────╮\n━━━━━━━━━━━━━━━━━━━━\n';
lista.forEach((item, index) => {
msg += `🌟 | ᴄᴏᴍᴀɴᴅᴏ: *${item.comando}*\n`;
msg += `🆔 | ɪᴅ: *${item.id}*\n`;
msg += '━━━━━━━━━━━━━━━━━━━━\n';
});
msg += `- ──────❲ ʟɪꜱᴛᴀ ᴅᴇ ꜰɪɢᴜʀɪɴʜᴀꜱ ❳──────╯\n> *${NomeDoBot}*`;
reply(msg);
},
};
