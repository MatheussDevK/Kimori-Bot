module.exports = {
name: 'envpv',
aliases: ['pv'],
category: 'geral',
description: 'Reenvia a mensagem/mídia marcada para o seu PV.',
async execute(ctx) {
const {
reply, isGroup, menc_prt, info, isQuotedImage, isQuotedVideo,
isQuotedDocument, isQuotedDocW, isQuotedAudio, isQuotedSticker,
isQuotedMsg, q, prefix, command, emojii, kiimorizinha, sender, selo,
} = ctx;

if(!isGroup) return reply("*sᴏᴍᴇɴᴛᴇ ᴇᴍ ɢʀᴜᴘᴏs*")
if(!menc_prt) return reply("*ᴍᴀʀǫᴜᴇ ᴀ ᴍsɢ ᴏᴜ ᴀ ᴍɪᴅɪᴀ ǫᴜᴇ ᴠᴏᴄᴇ ǫᴜᴇʀ ǫᴜᴇ ᴇᴜ ᴍᴀɴᴅᴇ ɴᴏ ᴘᴠ sᴇɴʜᴏʀ(ᴀ)*")
let DFC = "";
const rsm = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
const pink = isQuotedImage ? rsm?.imageMessage: info.message?.imageMessage
const blue = isQuotedVideo ? rsm?.videoMessage: info.message?.videoMessage
const purple = isQuotedDocument ? rsm?.documentMessage: info.message?.documentMessage
const yellow = isQuotedDocW ? rsm?.documentWithCaptionMessage?.message?.documentMessage: info.message?.documentWithCaptionMessage?.message?.documentMessage
const aud_d = isQuotedAudio ? rsm.audioMessage : ""
const figu_d = isQuotedSticker ? rsm.stickerMessage : ""
const red = isQuotedMsg && !aud_d && !figu_d && !pink && !blue&& !purple && !yellow? rsm.conversation: info.message?.conversation
const green = rsm?.extendedTextMessage?.text || info?.message?.extendedTextMessage?.text
if(pink && !aud_d && !purple) {
DFC = pink
pink.caption = q.length > 1 ? "*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ)*" :pink.caption.replace(new RegExp(prefix+command, "gi"), `*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ)*`)
pink.image = {url: pink.url}
} else if(blue && !aud_d && !purple) {
DFC = blue
blue.caption = q.length > 1 ? "*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ)*"+q.trim() :blue.caption.replace(new RegExp(prefix+command, "gi"), `*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ)*`).trim()
blue.video = {url: blue.url}
} else if(red && !aud_d && !purple) {
const black = {}
black.text = red.replace(new RegExp(prefix+command, "gi"), `*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ)*`).trim()
DFC = black
} else if(!aud_d && !figu_d && green && !purple && !purple) {
const brown = {}
brown.text = green.replace(new RegExp(prefix+command, "gi"), `*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ)*`).trim()
DFC = brown
} else if(purple) {
DFC = purple
purple.document = {url: purple.url}
} else if(yellow && !aud_d) {
DFC = yellow
yellow.caption = q.length > 1 ? "*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ)*"+q.trim() :yellow.caption.replace(new RegExp(prefix+command, "gi"), `*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ)*`).trim()
yellow.document = {url: yellow.url}
} else if(figu_d && !aud_d) {
DFC = figu_d
figu_d.sticker = {url: figu_d.url}
} else if(aud_d) {
DFC = aud_d
aud_d.audio = {url: aud_d.url}
aud_d.ptt = true
}
reply(`*ᴏʟʜᴀ ᴏ ᴍᴇᴜ ᴘᴠ sᴇɴʜᴏʀ(ᴀ).${emojii}*`)
await kiimorizinha.sendMessage(sender, DFC, {quoted: selo}).catch(e => {
console.log(e)
})
},
};
