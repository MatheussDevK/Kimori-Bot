module.exports = {
name: 'antiligar',
aliases: ['antiligacao', 'antiligação'],
category: 'dono',
description: 'Ativa/desativa o bloqueio automático de chamadas.',
async execute(ctx) {
const { reply, mess, SoDono, toggleNescessarioFeature } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
await toggleNescessarioFeature('anticall', {
label: '𝔸ℕ𝕋𝕀 𝕃𝕀𝔾𝔸ℝ',
onMsg: `『✅』O recurso Anti Ligar foi ativado com sucesso!`,
offMsg: `『❌』O recurso Anti Ligar foi desativado!`,
onPlain: `『✅』ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪ ʟɪɢᴀʀ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ!`,
offPlain: '『❌』ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ!',
}, 'antiligar')
},
};
