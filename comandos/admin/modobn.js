module.exports = {
name: 'modobn',
aliases: ['modobrincadeira', 'modobrincadeiras'],
category: 'admin',
description: 'Ativa/desativa o Modo Brincadeira no grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
await toggleGroupFeature('jogos', {
label: '𝕄𝕆𝔻𝕆𝔹ℕ',
onMsg: `『✅』O recurso Modo Brincadeira foi ativado com sucesso no grupo!`,
offMsg: `『❌』O recurso Modo Brincadeira foi desativado no grupo!`,
onPlain: '『✅』ᴏ ʀᴇᴄᴜʀsᴏ ᴍᴏᴅᴏ ʙʀɪɴᴄᴀᴅᴇɪʀᴀ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ!',
offPlain: '『❌』ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ!',
}, 'modobn')
},
};
