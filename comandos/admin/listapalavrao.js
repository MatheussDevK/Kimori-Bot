module.exports = {
name: 'listapalavrão',
aliases: ['listapalavra', 'listpalavra'],
category: 'admin',
description: 'Lista as palavras proibidas (anti-palavrão) do grupo.',
async execute(ctx) {
const { reply, isPalavrao, isPalavras } = ctx;

if(!isPalavrao) return reply('*ᴀɴᴛɪ-ᴘᴀʟᴀᴠʀᴀᴏ sᴇ ᴇɴᴄᴏɴᴛʀᴀ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ *')
if(isPalavras.length < 0) return reply(`*ɴᴀᴏ ᴇxɪsᴛᴇ ɴᴇɴʜᴜᴍᴀ ᴘᴀʟᴀᴠʀᴀ ᴘʀᴏɪʙɪᴅᴀ *`)
reply(`*ᴛᴏᴛᴀʟ ${isPalavras.length} - ʟɪsᴛᴀ ᴅᴇ ᴘᴀʟᴀᴠʀᴏᴇs ɴᴏ ɢʀᴜᴘᴏ:*\n–\n${isPalavras.map((v, index) => `${index+1}. ➸${v}`).join('\n')}`)
},
};
