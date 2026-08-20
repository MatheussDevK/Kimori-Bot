module.exports = {
name: 'addpalavra',
category: 'admin',
description: 'Adiciona uma palavra à lista de palavrões proibidos do grupo (anti-palavrão).',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isPalavrao, isPalavras,
args, prefix, command, dataGp, setGp,
} = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isPalavrao) return reply('*ᴀɴᴛɪ-ᴘᴀʟᴀᴠʀᴀᴏ sᴇ ᴇɴᴄᴏɴᴛʀᴀ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ *')
if(args.length < 1) return reply(`Use assim: ${prefix + command} [palavrão]. Um exemplo desmontrativo de como usar aqui: ${prefix + command} puta`)
const texto = args.join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
if(isPalavras.includes(texto)) return reply('A palavra já foi adicionada na lista de proibições. do anti palavra, verifique...')
dataGp[0].antipalavrao.palavras.push(texto)
setGp(dataGp)
reply(`Palavrão adicionado com sucesso! Consulte a lista, usando: ${prefix+command}`)
},
};
