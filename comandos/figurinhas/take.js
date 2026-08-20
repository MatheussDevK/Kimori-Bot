module.exports = {
name: 'take',
category: 'figurinhas',
description: 'Aplica a marca dagua (autor/pack) registrada do usuário na figurinha citada.',
async execute(ctx) {
const {
reply, isQuotedSticker, readTakeDB, sender, pushname, info,
getFileBuffer, convertSticker, kiimorizinha, from, selo,
ChannelContextNewsLetter, ErroCase, prefix, command, botNome: NomeDoBot,
} = ctx;

try {
if (!isQuotedSticker) return reply('*𝕄𝕒𝕣𝕢𝕦𝕖 𝕦𝕞𝕒 𝔽𝕚𝕘𝕦𝕣𝕚𝕟𝕙𝕒... ฅ^•ﻌ•^ฅ*');

const db = readTakeDB();
const userKey = sender.replace(/\D/g, "");

const _author = db[userKey]?.author || `${pushname}`;
const _pack = db[userKey]?.packname || ` `;

const takeSTK = await getFileBuffer(
info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage,
'sticker'
);

const prepareSTK = await convertSticker(
takeSTK.toString('base64'),
_pack,
_author
);

await kiimorizinha.sendMessage(from, {
sticker: prepareSTK,
contextInfo: ChannelContextNewsLetter
}, { quoted: selo });

} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
