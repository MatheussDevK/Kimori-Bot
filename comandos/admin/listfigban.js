module.exports = {
name: 'listfigban',
category: 'admin',
description: 'Lista as figurinhas banidas do grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, SoDono,
dataGp, kiimorizinha, from, selo, botNome,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup())
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins())
const lista = Array.isArray(dataGp[0].figban) ? dataGp[0].figban : []
if (!lista.length) return reply('*ɴᴇɴʜᴜᴍᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴇsᴛᴀ́ ɴᴀ ʟɪsᴛᴀ ᴅᴇ ʙᴀɴ ᴅᴇssᴇ ɢʀᴜᴘᴏ *')
let msg = '- ──────❲ ʟɪsᴛᴀ ᴅᴇ ꜰɪɢᴜʀɪɴʜᴀs ʙᴀɴ ❳──────╮\n━━━━━━━━━━━━━━━━━━━━\n'
lista.forEach((item, index) => {
msg += `🌟 | ɴ°: *${index + 1}*\n`
msg += `🆔 | ɪᴅ: *${item.id}*\n`
msg += `👤 | ᴀᴅɪᴄɪᴏɴᴀᴅᴏ ᴘᴏʀ: @${(item.addedBy || '').split('@')[0]}\n`
msg += '━━━━━━━━━━━━━━━━━━━━\n'})
msg += `- ──────❲ ʟɪsᴛᴀ ᴅᴇ ꜰɪɢᴜʀɪɴʜᴀs ʙᴀɴ ❳──────╯\n> *${botNome}*`
kiimorizinha.sendMessage(from, { text: msg, mentions: lista.map(v => v.addedBy).filter(Boolean) }, { quoted: selo })
},
};
