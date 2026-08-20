module.exports = {
name: 'antistatus',
category: 'admin',
description: 'Ativa/desativa o AntiStatus no grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
await toggleGroupFeature('antistatus', {
label: '𝔸ℕ𝕋𝕀𝕊𝕋𝔸𝕋𝕌𝕊',
onMsg: `『✅』O recurso AntiStatus foi ativado com sucesso nesse grupo!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: `『✅』ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪꜱᴛᴀᴛᴜꜱ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴇssᴇ ɢʀᴜᴘᴏ!`,
offPlain: `『❌』ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ!`,
})
},
};
