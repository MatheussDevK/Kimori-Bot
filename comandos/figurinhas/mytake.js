module.exports = {
name: 'mytake',
category: 'figurinhas',
description: 'Mostra a marca dagua (autor/pack) atualmente registrada do usuário.',
async execute(ctx) {
const { reply, mess, readTakeDB, sender, formatDataBR, kiimorizinha, from, selo } = ctx;

try {
const db = readTakeDB()
const userKey = sender.replace(/\D/g, "")

if (!db[userKey]) {
return reply(`*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴘᴏssᴜɪ ᴜᴍᴀ ᴍᴀʀᴄᴀ sᴇʟᴀᴅᴀ ᴇᴍ ᴍᴇᴜs ʀᴇɢɪsᴛʀᴏs...* `)
}

const authorAtual = db[userKey]?.author || "N/A"
const packAtual = db[userKey]?.packname || "N/A"
const criadoEm = db[userKey]?.savedAt ? formatDataBR(db[userKey].savedAt) : "N/A"
const ultimaAlt = db[userKey]?.updatedAt ? formatDataBR(db[userKey].updatedAt) : "ɴᴇɴʜᴜᴍᴀ ᴀʟᴛᴇʀᴀᴄᴀᴏ"

const texto =
`*ᴍᴀʀᴄᴀ ᴅᴀɢᴜᴀ ᴘᴇʀsᴏɴᴀʟɪᴢᴀᴅᴀ... sᴇᴜ sᴇʟᴏ ɴᴇsᴛᴇ ᴍᴜɴᴅᴏ.* ✨

➮ *ᴠᴏᴄᴇ:* @${sender.split("@")[0]} 
➮ *ᴀᴜᴛʜᴏʀ:* ${authorAtual} 
➮ *ᴘᴀᴄᴋɴᴀᴍᴇ:* ${packAtual} 
➮ *ʀᴇɢɪsᴛʀᴏᴜ ᴇᴍ:* ${criadoEm} 
➮ *ᴜʟᴛɪᴍᴀ ᴀʟᴛᴇʀᴀᴄᴀᴏ:* ${ultimaAlt}`

await kiimorizinha.sendMessage(from, {
text: texto,
contextInfo: {
mentionedJid: [sender]
}
}, { quoted: selo })

} catch (e) {
console.log(e)
reply(mess.error())
}
},
};
