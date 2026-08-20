module.exports = {
name: 'ausente',
aliases: ['off', 'afk'],
category: 'geral',
description: 'Registra você como ausente no grupo, com um motivo opcional.',
async execute(ctx) {
const { reply, isGroup, mess, q, sender, dataGp, setGp, prefix } = ctx;

if(!isGroup) return reply(mess.onlyGroup())
const motivo = q ? q.trim() : "Sem motivo especificado"
const horaAtual = Date.now()
const ja_afk = dataGp[0].ausentes.find(x => x.id === sender)
if (ja_afk) {
ja_afk.msg = motivo
ja_afk.hora = horaAtual
} else {
dataGp[0].ausentes.push({ id: sender, msg: motivo, hora: horaAtual })
}
setGp(dataGp)
reply(`*ᴍᴇɴsᴀɢᴇᴍ ᴅᴇ ᴀᴜsᴇɴᴄɪᴀ ᴄʀɪᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙅‍♂️*\n\n> ᴄᴀsᴏ ǫᴜᴇɪʀᴀ ᴛɪʀᴀʀ ᴜsᴇ ᴏ ᴄᴏᴍᴀɴᴅᴏ『 ${prefix}on 』`)
},
};
