module.exports = {
name: 'donogp',
aliases: ['addperm', 'add_permissao'],
category: 'dono',
description: 'Adiciona permissão do antirroubo pra uma pessoa marcada no grupo, apenas dono.',
async execute(ctx) {
const {
reply, mess, isGroup, SoDono, from, prefix, info, kiimorizinha,
getAntiRouboData, checkAntiRouboActive, extractTargetJids, addPermission,
saveAntiRouboData,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono) return reply(mess.onlyOwner());
const { data, pathAtiv } = getAntiRouboData(from);
const check = checkAntiRouboActive(data, prefix);
if (!check.ok) return reply(check.errorMsg);
const { telNum, lidNum } = await extractTargetJids(info, from, kiimorizinha);
if (!telNum && !lidNum) return reply('*ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴘᴇssᴏᴀ *');
const result = addPermission(data, telNum, lidNum);
if (result.alreadyExists) {
return reply('*ᴇꜱꜱᴀ ᴩᴇꜱꜱᴏᴀ ᴊᴀ ᴇꜱᴛᴀ ʀᴇɢɪꜱᴛʀᴀᴅᴀ *');}
saveAntiRouboData(pathAtiv, data);
reply('*ɴᴜᴍᴇʀᴏ ʀᴇɢɪsᴛʀᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ*');
},
};
