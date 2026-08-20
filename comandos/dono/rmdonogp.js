module.exports = {
name: 'rmdonogp',
aliases: ['rmperm', 'del_permissao'],
category: 'dono',
description: 'Remove a permissão do antirroubo de uma pessoa marcada no grupo, apenas dono.',
async execute(ctx) {
const {
reply, mess, isGroup, SoDono, from, prefix, info, kiimorizinha,
getAntiRouboData, checkAntiRouboActive, extractTargetJids, removePermission,
saveAntiRouboData,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono) return reply(mess.onlyOwner());
const { data, pathAtiv } = getAntiRouboData(from);
const check = checkAntiRouboActive(data, prefix);
if (!check.ok) return reply(check.errorMsg);
const { telNum, lidNum } = await extractTargetJids(info, from, kiimorizinha);
if (!telNum && !lidNum) return reply('*ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴘᴇssᴏᴀ *');
const result = removePermission(data, telNum, lidNum);
if (!result.found) {
return reply('*ɴᴀᴏ ᴇɴᴄᴏɴᴛʀᴇɪ ᴇꜱꜱᴀ ᴩᴇꜱꜱᴏᴀ ɴᴏ ᴍᴇᴜ ʙᴀɴᴄᴏ ᴅᴇ ᴅᴀᴅᴏꜱ *');
}
saveAntiRouboData(pathAtiv, data);
reply('*ʀᴇᴍᴏᴠɪ ᴇꜱꜱᴀ ᴩᴇꜱꜱᴏᴀ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ 🙅‍♂️*');
},
};
