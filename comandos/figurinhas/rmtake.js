module.exports = {
name: 'rmtake',
category: 'figurinhas',
description: 'Remove a marca dagua (autor/pack) registrada do usuário.',
async execute(ctx) {
const { reply, mess, readTakeDB, writeTakeDB, sender } = ctx;

try {
const db = readTakeDB()
const userKey = sender.replace(/\D/g, "")

if (!db[userKey]) {
return reply(`*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴘᴏssᴜɪ ᴜᴍᴀ ᴍᴀʀᴄᴀ sᴇʟᴀᴅᴀ ᴇᴍ ᴍᴇᴜs ʀᴇɢɪsᴛʀᴏs...* `)
}

delete db[userKey]
writeTakeDB(db)

return reply(`*sᴜᴀ ᴍᴀʀᴄᴀ ғᴏɪ ᴀᴘᴀɢᴀᴅᴀ... ᴄᴏᴍᴏ sᴇ sᴜᴀ ᴘʀᴇsᴇɴᴄᴀ ɴᴜɴᴄᴀ ᴛɪᴠᴇssᴇ ᴇxɪsᴛɪᴅᴏ.*`)

} catch (e) {
console.log(e)
reply(mess.error())
}
},
};
