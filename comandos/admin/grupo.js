module.exports = {
name: 'grupo',
category: 'admin',
description: 'Abre (a) ou fecha (f) o grupo para apenas admins enviarem mensagem.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins,
args, prefix, command, kiimorizinha, from, ErroCase, botNome: NomeDoBot,
} = ctx;

try {
if (!isGroup) return reply(mess.onlyGroup())
if (!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if (args.length < 1) return reply(`*ᴇsᴛᴀ ғᴀʟᴛᴀɴᴅᴏ ᴀʟɢᴏ ᴀɪ ʀᴀᴘᴀᴢ *\n\n> ᴇxᴇᴍᴘʟᴏ: ${prefix}ɢʀᴜᴘᴏ ᴀ『 ᴘᴀʀᴀ ᴀʙʀɪʀ 』\n> ${prefix}ɢʀᴜᴘᴏ ғ『 ᴘᴀʀᴀ ғᴇᴄʜᴀʀ 』`);
const metadata = await kiimorizinha.groupMetadata(from)
const isFechado = metadata.announce === true
if (args[0] === 'a') {
if (!isFechado) return reply(`*ᴏ ɢʀᴜᴘᴏ ᴊᴀ ᴇsᴛᴀ ᴀʙᴇʀᴛᴏ sᴇɴʜᴏʀ(ᴀ) *`)
await kiimorizinha.groupSettingUpdate(from, 'not_announcement')
reply(`*ɢʀᴜᴘᴏ ᴀʙᴇʀᴛᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ sᴇɴʜᴏʀ(ᴀ)*`)
}
else if (args[0] === 'f') {
if (isFechado) return reply(`*ᴏ ɢʀᴜᴘᴏ ᴊᴀ ᴇsᴛᴀ ғᴇᴄʜᴀᴅᴏ sᴇɴʜᴏʀ(ᴀ) *`)
await kiimorizinha.groupSettingUpdate(from, 'announcement')
reply(`*ɢʀᴜᴘᴏ ғᴇᴄʜᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ sᴇɴʜᴏʀ(ᴀ)*`)
}
else {
reply(`*ᴇsᴛᴀ ғᴀʟᴛᴀɴᴅᴏ ᴀʟɢᴏ ᴀɪ ʀᴀᴘᴀᴢ *\n\n> ᴇxᴇᴍᴘʟᴏ: ${prefix}ɢʀᴜᴘᴏ ᴀ『 ᴘᴀʀᴀ ᴀʙʀɪʀ 』\n> ${prefix}ɢʀᴜᴘᴏ ғ『 ᴘᴀʀᴀ ғᴇᴄʜᴀʀ 』`)
}
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
