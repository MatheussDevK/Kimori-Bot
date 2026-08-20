module.exports = {
name: 'clearperm',
aliases: ['limparperm'],
category: 'dono',
description: 'Limpa todas as permissões do antirroubo do grupo, apenas dono.',
async execute(ctx) {
const {
reply, mess, isGroup, SoDono, from, prefix,
getAntiRouboData, checkAntiRouboActive, clearPermissions, saveAntiRouboData,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono) return reply(mess.onlyOwner());
const { data, pathAtiv } = getAntiRouboData(from);
const check = checkAntiRouboActive(data, prefix);
if (!check.ok) return reply(check.errorMsg);
clearPermissions(data);
saveAntiRouboData(pathAtiv, data);
reply('*ᴛᴏᴅᴀs ᴀs ᴘᴇʀᴍɪssᴏ̃ᴇs ғᴏʀᴀᴍ ʟɪᴍᴘᴀs 🧹*\n> ɴɪɴɢᴜᴇᴍ ʟɪʙᴇʀᴀᴅᴏ');
},
};
