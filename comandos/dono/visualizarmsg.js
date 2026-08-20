module.exports = {
name: 'visualizarmsg',
category: 'dono',
description: 'Ativa/desativa o recurso de Visualizar Mensagem.',
async execute(ctx) {
const { reply, mess, SoDono, toggleNescessarioFeature } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
await toggleNescessarioFeature('visualizarmsg', {
label: '𝕍𝕀𝕊𝕌𝔸𝕃𝕀𝕁𝔸ℝ',
onMsg: `『✅』O recurso de Visualizar Msg foi ativado com sucesso!`,
offMsg: `『❌』O recurso Visualizar Msg foi desativado com sucesso!`,
onPlain: "『✅』ᴏ ʀᴇᴄᴜʀsᴏ ᴅᴇ ᴠɪᴢᴜᴀʟɪᴢᴀʀ ᴍsɢ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ!",
offPlain: '『❌』ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ!',
})
},
};
