module.exports = {
name: 'delpalavra',
category: 'admin',
description: 'Remove uma palavra da lista de palavrões proibidos do grupo (anti-palavrão).',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isPalavrao, isPalavras,
args, prefix, dataGp, setGp,
} = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isPalavrao) return reply('*ᴀɴᴛɪ-ᴘᴀʟᴀᴠʀᴀᴏ sᴇ ᴇɴᴄᴏɴᴛʀᴀ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ *')
if(args.length < 1) return reply(`*🌟 ᴜsᴇ ᴅᴀ ғᴏʀᴍᴀ ᴄᴇʀᴛᴀ, ᴇxᴇᴍᴘʟᴏ: ${prefix}ᴅᴇʟᴘᴀʟᴀᴠʀᴀ ᴄᴀʀᴀʟʜᴏ*`)
const texto = args.join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
if(!isPalavras.includes(texto)) return reply('*ᴀ ᴘᴀʟᴀᴠʀᴀ ᴊᴀ ғᴏɪ ʀᴇᴍᴏᴠɪᴅᴀ ᴏᴜ ɴᴀᴏ ᴇsᴛᴀ ɪɴᴄʟᴜsᴀ.. *')
const i = dataGp[0].antipalavrao.palavras.indexOf(texto)
dataGp[0].antipalavrao.palavras.splice(i, 1)
setGp(dataGp)
reply(`*ᴘᴀʟᴀᴠʀᴀᴏ ʀᴇᴍᴏᴠɪᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ✅*`)
},
};
