module.exports = {
name: 'modtake',
category: 'figurinhas',
description: 'Altera a marca dagua (autor/pack) já registrada do usuário.',
async execute(ctx) {
const { reply, mess, readTakeDB, writeTakeDB, sender, q, prefix, formatDataBR } = ctx;

try {
const db = readTakeDB()
const userKey = sender.replace(/\D/g, "")

if (!db[userKey]) {
return reply(`*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴘᴏssᴜɪ ᴜᴍᴀ ᴍᴀʀᴄᴀ sᴇʟᴀᴅᴀ ᴇᴍ ᴍᴇᴜs ʀᴇɢɪsᴛʀᴏs...* `)
}

const texto = (q || "").trim()

if (!texto) {
return reply(
`*ᴏɴᴅᴇ ᴇsᴛᴀ sᴜᴀ ɴᴏᴠᴀ ᴍᴀʀᴄᴀ...?* 

➮ ᴇxᴇᴍᴘʟᴏ: \`${prefix}modtake texto1/texto2\``
)
}

const separador = texto.includes("|") ? "|" : (texto.includes("/") ? "/" : null)
if (!separador) {
return reply(
`*ᴏɴᴅᴇ ᴇsᴛᴀ sᴜᴀ ɴᴏᴠᴀ ᴍᴀʀᴄᴀ...?* 

➮ ᴇxᴇᴍᴘʟᴏ: \`${prefix}modtake texto1/texto2\``
)
}

const partes = texto.split(separador).map(t => t.trim()).filter(Boolean)
if (partes.length < 2) {
return reply(
`*ᴏɴᴅᴇ ᴇsᴛᴀ sᴜᴀ ɴᴏᴠᴀ ᴍᴀʀᴄᴀ...?* 

➮ ᴇxᴇᴍᴘʟᴏ: \`${prefix}modtake texto1/texto2\``
)
}

const authorNovo = partes[0].slice(0, 60)
const packNovo = partes.slice(1).join(` ${separador} `).trim().slice(0, 60)

if (!authorNovo || !packNovo) {
return reply(
`*ᴏɴᴅᴇ ᴇsᴛᴀ sᴜᴀ ɴᴏᴠᴀ ᴍᴀʀᴄᴀ...?* 

➮ ᴇxᴇᴍᴘʟᴏ: \`${prefix}modtake texto1/texto2\``
)
}

db[userKey].author = authorNovo
db[userKey].packname = packNovo
db[userKey].updatedAt = Date.now()

writeTakeDB(db)

const criadoEm = db[userKey]?.savedAt ? formatDataBR(db[userKey].savedAt) : "N/A"
const ultimaAlt = formatDataBR(db[userKey].updatedAt)

return reply(
`*ᴍᴀʀᴄᴀ ᴀʟᴛᴇʀᴀᴅᴀ... sᴇᴜ ɴᴏᴠᴏ sᴇʟᴏ ғᴏɪ ɢʀᴀᴠᴀᴅᴏ.*

➮ *ᴀᴜᴛʜᴏʀ:* ${authorNovo} 
➮ *ᴘᴀᴄᴋɴᴀᴍᴇ:* ${packNovo} 
➮ *ʀᴇɢɪsᴛʀᴏᴜ ᴇᴍ:* ${criadoEm} 
➮ *ᴜʟᴛɪᴍᴀ ᴀʟᴛᴇʀᴀᴄᴀᴏ:* ${ultimaAlt} `
)

} catch (e) {
console.log(e)
reply(mess.error())
}
},
};
