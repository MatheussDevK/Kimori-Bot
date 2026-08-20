module.exports = {
name: 'rename',
aliases: ['roubar'],
category: 'figurinhas',
description: 'Renomeia o pacote/autor de uma figurinha citada.',
async execute(ctx) {
const {
reply, mess, isQuotedSticker, info, getFileBuffer, q, prefix, command,
convertSticker, kiimorizinha, from, selo, ErroCase, botNome: NomeDoBot,
ChannelContextNewsLetter,
} = ctx;

if (!isQuotedSticker) return reply('*𝕄𝕒𝕣𝕢𝕦𝕖 𝕦𝕞𝕒 𝔽𝕚𝕘ฅ^•ﻌ•^ฅ...*');
const encmediats = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker');
const kls = q;
const pack = kls ? kls.split("/")[0] : undefined;
const author2 = kls ? kls.split("/")[1] : undefined;
if (!q) {
return reply(`*𝔼𝕤𝕥𝕒́ 𝕗𝕒𝕝𝕥𝕒𝕟𝕕𝕠 𝕠 𝕟𝕠𝕞𝕖 𝕕𝕠 𝕡𝕒𝕔𝕠𝕥𝕖 + 𝕒𝕦𝕥𝕠𝕣!\n𝔼𝕩: ${prefix+command} Kimori/Bot *`);
}
if (!pack || !author2) {
return reply(`*ᴄᴏᴍᴏ ᴠᴏᴄᴇ ǫᴜᴇʀ ʀᴇɴᴏᴍᴇᴀʀ ᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴅᴇꜱꜱᴇ ᴊᴇɪᴛᴏ ᴀɪ? *\n> *ᴇxᴇᴍᴩʟᴏ ᴅᴇ ᴜꜱᴏ: ${prefix + command} Kimori/Bot*`);
}
reply(mess.wait());
const bas64 = `data:image/jpeg;base64,${encmediats.toString('base64')}`;
try {
const mantap = await convertSticker(bas64, author2, pack);
const sti = Buffer.from(mantap, 'base64');
kiimorizinha.sendMessage(from, {
sticker: sti,
contextInfo: ChannelContextNewsLetter
}, { quoted: selo }).catch((err) => {
reply(mess.error());
});

} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
