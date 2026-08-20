module.exports = {
name: 'verificado-global',
aliases: ['verificado'],
category: 'dono',
description: 'Ativa/desativa o selo de Verificado Global do bot.',
async execute(ctx) {
const { reply, mess, SoDono, toggleNescessarioFeature, ErroCase, prefix, command, botNome } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
try {
await toggleNescessarioFeature('verificado', {
label: '𝕍𝔼ℝ𝕀𝔽𝕀ℂ𝔸𝔻𝕆',
onMsg: `『✅』O recurso Verificado Global foi ativado com sucesso!`,
offMsg: `『❌』O recurso Verificado Global foi desativado!`,
onPlain: `『✅』ᴏ ʀᴇᴄᴜʀsᴏ ᴠᴇʀɪғɪᴄᴀᴅᴏ ɢʟᴏʙᴀʟ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ!`,
offPlain: `『❌』ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ!`,
})
} catch (e) {
await ErroCase(e, prefix, command, botNome)
}
},
};
