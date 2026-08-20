module.exports = {
name: 'console',
category: 'dono',
description: 'Ativa/desativa o Modo Console (ver todo tipo de mensagem).',
async execute(ctx) {
const { reply, mess, SoDono, toggleNescessarioFeature } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
await toggleNescessarioFeature('consoleoff', {
label: 'ℂ𝕆ℕ𝕊𝕆𝕃𝔼',
onMsg: `『✅』Modo Console ativo, agora verei todo tipo de mensagem!`,
offMsg: `『❌』O recurso Console foi desativado com sucesso!`,
onPlain: `『✅』ᴍᴏᴅᴏ ᴄᴏɴsᴏʟᴇ ᴀᴛɪᴠᴏ, ᴀɢᴏʀᴀ ɪʀᴇɪ ᴄᴏɴsᴇɢᴜɪʀ ᴠᴇʀ ᴛᴏᴅᴏ ᴛɪᴘᴏ ᴅᴇ ᴍᴇɴsᴀɢᴇᴍ!`,
offPlain: 'ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ!',
})
},
};
