module.exports = {
name: 'listrepo',
aliases: ['autorepolist'],
category: 'admin',
description: 'Lista todos os autorepos configurados no grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins,
isAutorepo, loadGroupAutorepo, from, groupName,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup())
if (!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if (!isAutorepo) return reply('*ᴀᴛɪᴠᴇ ᴏ ᴀᴜᴛᴏʀᴇᴘᴏ ᴘʀɪᴍᴇɪʀᴏ ᴘᴀʀᴀ ᴜsᴀʀ ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ*')
const repos = loadGroupAutorepo(from)
if (!repos.length) return reply('*ᴇsᴛᴇ ɢʀᴜᴘᴏ ɴᴀ̃ᴏ ᴛᴇᴍ ɴᴇɴʜᴜᴍ ᴀᴜᴛᴏʀᴇᴘᴏ*')
let txt = `*ᴛᴏᴅᴏs ᴏs ᴀᴜᴛᴏʀᴇᴘᴏs ᴅᴏ ɢʀᴜᴘᴏ [ ${groupName} ]*`
for (let i = 0; i < repos.length; i++) {
txt += `\n\n*${i + 1}.* *ɢᴀᴛɪʟʜᴏ:* ${repos[i].trigger}\n*↝ ᴛɪᴘᴏ:* ${repos[i].type}`
if (repos[i].type === 'text') {
txt += `\n*↝ ʀᴇsᴘᴏsᴛᴀ:* ${repos[i].text || ''}`}}
reply(txt)
},
};
