module.exports = {
name: 'totag',
aliases: ['cita', 'hidetag', 'citar'],
category: 'admin',
description: 'Reencaminha/marca a mensagem (ou enquete/texto) mencionando todos os membros do grupo de forma oculta.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins,
info, groupMembers, kiimorizinha, from, q, args, prefix, command,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup())
if (!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
const quotedMsg = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
const TDS_GP = groupMembers.map(i => i.id)
if (quotedMsg?.pollCreationMessageV3) {
const poll = quotedMsg.pollCreationMessageV3
const titulo = poll.name
const opcoes = poll.options.map(o => o.optionName)
const aviso = await kiimorizinha.sendMessage(from, {
text: `${q}`,
contextInfo: { mentionedJid: TDS_GP }})
await kiimorizinha.sendMessage(from, {
poll: {
name: titulo,
values: opcoes,
selectableCount: poll.selectableCount || 1
}, mentions: TDS_GP }, { quoted: aviso })
return
}
if (!quotedMsg && args.length > 0) {
return await kiimorizinha.sendMessage(from, { text: args.join(" "), contextInfo: { mentionedJid: TDS_GP }})}
if (quotedMsg) {
const messageTypes = ['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage', 'documentWithCaptionMessage']
for (const type of messageTypes) {
const message = quotedMsg?.viewOnceMessageV2?.message?.[type] || quotedMsg?.[type]?.message?.documentMessage || quotedMsg?.[type]
if (message?.caption) {message.caption = args.length > 0 ? args.join(' ').trim() : message.caption}}
return await kiimorizinha.sendMessage(from, { forward: { key: info.key, message: quotedMsg }, contextInfo: { mentionedJid: TDS_GP }})}
return reply(`*ᴜsᴇ ᴏ ᴄᴏᴍᴀɴᴅᴏ ᴅᴇ ᴅᴜᴀs ᴍᴀɴᴇɪʀᴀs*\n> *1.* ᴍᴀʀǫᴜᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ (ғᴏᴛᴏ, ᴠɪᴅᴇᴏ, ᴀᴜᴅɪᴏ, ᴇɴǫᴜᴇᴛᴇ, ᴇᴛᴄ)> *2.* ᴏᴜ ᴅɪɢɪᴛᴇ *${prefix + command}* sᴇɢᴜɪᴅᴏ ᴅᴀ sᴜᴀ ᴍᴇɴsᴀɢᴇᴍ`)
},
};
