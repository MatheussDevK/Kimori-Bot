module.exports = {
name: 'autofigu',
aliases: ['autosticker', 'autofig', 'autofigurinha'],
category: 'admin',
description: 'Ativa/desativa a conversão automática de imagens/vídeos em figurinhas.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await toggleGroupFeature('autosticker', {
label: '𝔸𝕌𝕋𝕆𝔽𝕀𝔾𝕌',
onMsg: `『✅』O recurso AutoFigurinhas foi ativado com sucesso!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』ᴏ ʀᴇᴄᴜʀsᴏ ᴀᴜᴛᴏғɪɢᴜʀɪɴʜᴀs ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ!',
offPlain: '『❌』ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ!',
}, 'autofigu')
},
};