module.exports = {
name: 'limitecaracteres',
aliases: ['limiteflood'],
category: 'admin',
description: 'Ativa/desativa o limite de flood (caracteres) no grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
await toggleGroupFeature('limitec.active', {
label: '𝕃𝕀𝕄𝕀𝕋𝔼 𝔽𝕃𝕆𝕆𝔻',
onMsg: `『✅』O recurso Limite Flood foi ativado com sucesso nesse grupo!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』ᴏ ʀᴇᴄᴜʀsᴏ ʟɪᴍɪᴛᴇ ғʟᴏᴏᴅ ғᴏɪ ᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴇssᴇ ɢʀᴜᴘᴏ!',
offPlain: '『❌』ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ!',
}, 'limiteflood')
},
};
