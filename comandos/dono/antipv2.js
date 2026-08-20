module.exports = {
name: 'antipv2',
category: 'dono',
description: 'Ativa/desativa o AntiPv2.',
async execute(ctx) {
const { reply, mess, SoDono, toggleNescessarioFeature } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
await toggleNescessarioFeature('antipv2', {
label: '𝔸ℕ𝕋𝕀ℙ𝕍2',
onMsg: `『✅』 O Anti Pv2 acaba de ser ativado com sucesso!`,
offMsg: `『❌』 O Anti Pv2 acaba de ser desativado!`,
onPlain: `『✅』 O Anti Pv2 acaba de ser ativado com sucesso!`,
offPlain: `『❌』 O Anti Pv2 acaba de ser desativado!`,
})
},
};
