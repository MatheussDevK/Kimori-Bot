module.exports = {
name: 'audio-menu',
category: 'dono',
description: 'Ativa/desativa o áudio junto do menu.',
async execute(ctx) {
const { reply, mess, SoDono, toggleNescessarioFeature } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
await toggleNescessarioFeature('menu_audio', {
label: '𝔸𝕌𝔻𝕀𝕆-𝕄𝔼ℕ�?',
onMsg: `『✅』O áudio-menu acaba de ser ativado com sucesso no bot!`,
offMsg: `『❌』O áudio-menu acaba de ser desativado com sucesso!`,
onPlain: `『✅』O áudio-menu acaba de ser ativado com sucesso no bot!`,
offPlain: `『❌』O áudio-menu acaba de ser desativado com sucesso!`,
}, 'audio-menu')
},
};
