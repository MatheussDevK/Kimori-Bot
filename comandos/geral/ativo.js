module.exports = {
name: 'ativo',
aliases: ['on', 'voltei'],
category: 'geral',
description: 'Remove seu registro de ausência (afk) do grupo.',
async execute(ctx) {
const { reply, isGroup, mess, sender, dataGp, setGp, msToTime } = ctx;

if(!isGroup) return reply(mess.onlyGroup())
const idx = dataGp[0].ausentes.findIndex(x => x.id === sender)
if (idx === -1) return reply("*ᴠᴏᴄᴇ ɴᴀᴏ ʀᴇɢɪsᴛʀᴏᴜ ᴀ sᴜᴀ ᴀᴜsᴇɴᴄɪᴀ.. *")
const tempo = msToTime(Date.now() - dataGp[0].ausentes[idx].hora)
dataGp[0].ausentes.splice(idx, 1)
setGp(dataGp)
reply("*ᴏᴋᴀʏ, ᴀᴄᴀʙᴇɪ ᴅᴇ ᴛɪʀᴀʀ sᴜᴀ ᴍᴇɴsᴀɢᴇᴍ ᴅᴇ ᴀᴜsᴇɴᴄɪᴀ ᴅᴇ ᴍᴇᴜs ʀᴇɢɪsᴛʀᴏs, ʙᴇᴍ ᴠɪɴᴅᴏ(ᴀ) ᴅᴇ ᴠᴏʟᴛᴀ*")
},
};
