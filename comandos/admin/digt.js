module.exports = {
name: 'digt',
category: 'admin',
description: 'Envia um texto de boas-vindas estilizada pro grupo.',
async execute(ctx) {
const {
reply, mess, isGroupAdmins, isBotGroupAdmins,
kiimorizinha, from, selo,
} = ctx;

if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
const bla = `🔥↯𝐉𝐀 𝐄𝐍𝐓𝐑𝐀 𝐃𝐈𝐆𝐈𝐓𝐀𝐍𝐃𝐎 𝚽𝐈 ↯°🌚💕
 ི⋮ ྀ🌴⏝ ི⋮ ྀ🚸 ི⋮ ྀ⏝🌴 ི⋮ ྀ

🐼🍧↯𝖠𝖰𝖴𝖨 𝖵𝖮𝖢𝖤̂ 𝖯𝖮𝖣𝖤 𝖲𝖤𝖱↯🍧🐻
ㅤㅤㅤㅤ◍۫❀⃘࣭࣭࣭࣭ٜꔷ⃔໑࣭࣭ٜ⟅◌ٜ🛸◌⟆࣭࣭ٜ໑⃕ꔷ⃘࣭࣭࣭࣭ٜ❀۫◍ི࣭࣭࣭࣭ ུ
【✔】ᴘʀᴇᴛᴀ👩🏾‍🦱 【✔】ʙʀᴀɴᴄᴀ👩🏼
【✔】ᴍᴀɢʀᴀ🍧【✔】ɢᴏʀᴅᴀ🍿
【✔】ᴘᴏʙʀᴇ🪙 【✔】ʀɪᴄᴀ💳
【✔】ʙᴀɪᴀɴᴀ💌【✔】ᴍᴀᴄᴏɴʜᴇɪʀᴀ🍁
【✔】ᴏᴛᴀᴋᴜ🧧【✔】ᴇ-ɢɪʀʟ🦄
【✔】ʟᴏʟɪ🍭【✔】ɢᴀᴅᴏ🐃
【✔】ɢᴀʏ🏳️‍🌈 【✔】ʟᴇsʙɪᴄᴀ✂️
【✔】ᴠᴀᴅɪᴀ💄【✔】ᴛʀᴀᴠᴇᴄᴏ🍌
【✔】ɴɪɴɢᴜᴇᴍ ʟɪɢᴀ📵
. ☪︎ • ☁︎. . •.
【 𝐕𝐄𝐌 𝐆𝐀𝐋𝐄𝐑𝐀, 𝐒𝐄 𝐃𝐈𝐕𝐄𝐑𝐓𝐈𝐑 𝐄 𝐅𝐀𝐙𝐄𝐑 𝐏𝐀𝐑𝐓𝐄 𝐃𝐀 𝐅𝐀𝐌𝐈𝐋𝐈𝐀.】🥂`
kiimorizinha.sendMessage(from, {text: bla}, {quoted: selo})
},
};
