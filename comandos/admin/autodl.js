module.exports = {
name: 'autodl',
aliases: ['autodownload', 'autobaixar'],
category: 'admin',
description: 'Ativa/desativa o download automático de mídias no grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await toggleGroupFeature('autodl', {
label: '𝔸𝕌𝕋𝕆𝔻𝕃',
onMsg: `『✅』Auto Download ativado com sucesso no grupo!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』ᴀᴜᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ᴀᴛɪᴠᴏ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ ɴᴏ ɢʀᴜᴩᴏ!',
offPlain: '『❌』ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ!',
}, 'autodl')
},
};