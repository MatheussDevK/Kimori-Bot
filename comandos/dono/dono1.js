module.exports = {
name: 'dono1',
aliases: ['dono2', 'dono3', 'dono4', 'dono5', 'dono6'],
category: 'dono',
description: 'Define ou remove um dos 6 números de dono do bot (dono1..dono6).',
async execute(ctx) {
const {
reply, mess, SoDono, isnit, issupre, ischyt, command, nescessario,
setNes, q, menc_os2, kiimorizinha, from, selo, ChannelContextNewsLetter,
} = ctx;

if (!SoDono && !isnit && !issupre && !ischyt) return reply(mess.onlyOwner());
const chave = { dono1: 'numero_dono1', dono2: 'numero_dono2', dono3: 'numero_dono3', dono4: 'numero_dono4', dono5: 'numero_dono5', dono6: 'numero_dono6' }[command];
const numeroAntigo = nescessario[chave];
if (!q && !menc_os2) {
if (!numeroAntigo || numeroAntigo === '.')
return reply(`*ɴᴀᴏ ʜᴀ ᴅᴏɴᴏ ᴘᴀʀᴀ ʀᴇᴍᴏᴠᴇʀ*`);
nescessario[chave] = '.';
setNes(nescessario);
return kiimorizinha.sendMessage(from, {
text: `*@${numeroAntigo} ꜰᴏɪ ʀᴇᴛɪʀᴀᴅᴏ ᴅᴏ ᴛɪᴍᴇ ᴅᴏꜱ ᴅᴏɴᴏꜱ*`,
mentions: [`${numeroAntigo}@lid`]
}, { quoted: selo });
}
const numeroNovo = menc_os2 ? menc_os2.split('@')[0] : q.replace(/\D/g,'');
if (!numeroNovo) return reply("*💫 ᴍᴇɴᴄɪᴏɴᴇ ᴏ ᴜsᴜᴀʀɪᴏ ᴏ ᴅɪɢɪᴛᴇ ᴏ ɴᴜ́ᴍᴇʀᴏ*");
nescessario[chave] = numeroNovo;
setNes(nescessario);
kiimorizinha.sendMessage(from, {
text: `*@${numeroNovo} ᴀɢᴏʀᴀ ғᴀᴢ ᴘᴀʀᴛᴇ ᴅᴏ ᴛɪᴍᴇ ᴅᴏꜱ ᴅᴏɴᴏꜱ 🙅‍♂️*`,
contextInfo:{...ChannelContextNewsLetter, mentionedJid: [menc_os2 || `${numeroNovo}@s.whatsapp.net`]}}, {quoted: selo})
},
};
