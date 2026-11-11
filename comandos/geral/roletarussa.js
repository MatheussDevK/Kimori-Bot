export default {
name: 'roletarussa',
category: 'geral',
description: 'Sorteia um membro comum e remove ele do grupo (brincadeira de roleta russa).',
async execute(ctx) {
const {
reply, mess, isGroup, isBotGroupAdmins, somembros, sender, botNumber,
numerodono, mentions, from, kiimorizinha, isDonoJid, isBotJid,
} = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
const TAMBOR = ["ɴᴀ ᴘᴇʀɴᴀ","ɴᴀ ᴄᴀʙᴇᴄᴀ","ɴᴏ ᴘᴇsᴄᴏᴄᴏ","ɴᴏ ᴘᴇɪᴛᴏ","ɴᴏ ᴏʟʜᴏ","ɴᴏ ᴇsᴛᴏᴍᴀɢᴏ.","ɴᴀ ʙᴏᴄᴀ","ɴᴀ ᴘᴇʀᴏᴋᴀʜ","ɴᴀ ᴛᴇsᴛᴀ","ɴᴏ ʙʀᴀᴄᴏ", "ɴᴀ ʙᴜᴢᴇᴛᴀ", "ɴᴀ ᴍᴀᴏ", "ɴᴏ ᴘᴇ"]
if(somembros.length == 0) return reply("*ᴛᴇᴍ ɴᴇɴʜᴜᴍ ᴍᴇᴍʙʀᴏ ᴄᴏᴍᴜᴍ ᴀǫᴜɪ *")
const C2 = somembros[Math.floor(Math.random() * somembros.length)]
if(C2 === sender || isBotJid(C2)) return mentions(`*ᴇᴜ ᴇsᴄᴏʟʜɪ ᴏ @${C2.split('@')[0]} ᴍᴀs ᴄᴏɴsᴇɢᴜɪᴜ ᴇsᴄᴀᴘᴀʀ 🙄*`, [C2], true)
if(isDonoJid(C2)) return mentions(`*ᴇsᴄᴏʟʜɪ ᴏ @${C2.split('@')[0]} sᴇɴᴛᴇ ᴀ ᴘʀᴇssᴀᴏ ɴᴇɴᴇᴍ 🙅‍♂️*`, [C2], true)
reply(`*ʙᴏʀᴀ ᴠᴇʀ ǫᴜᴇᴍ ɴᴀᴏ ᴛᴇᴍ sᴏʀᴛᴇ ᴀǫᴜɪ 🚀*`)
setTimeout(async() => {
await mentions(`*ǫᴜᴇ ᴘᴇɴɪɴʜᴀ @${C2.split('@')[0]} ᴠᴏᴄᴇ ɴᴀᴏ ᴛᴇᴠᴇ sᴏʀᴛᴇ  ᴛᴏᴍᴀ ᴜᴍ ᴛɪʀᴏ ${TAMBOR[Math.floor(Math.random() * (TAMBOR.length))]} 🙅‍♂️*`, [C2], true)
}, 5000)
setTimeout(() => {
kiimorizinha.groupParticipantsUpdate(from, [C2], "remove").catch(e => console.error('[ROLETARUSSA]', e?.message || e))
}, 6000)
},
};
