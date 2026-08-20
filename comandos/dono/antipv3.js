module.exports = {
name: 'antipv3',
category: 'dono',
description: 'Ativa/desativa o AntiPv3.',
async execute(ctx) {
const { reply, mess, SoDono, toggleNescessarioFeature } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
await toggleNescessarioFeature('antipv3', {
label: '𝔸ℕ𝕋𝕀ℙ𝕍3',
onMsg: `『✅』 O Anti Pv3 acaba de ser ativado com sucesso!`,
offMsg: `『❌』 O Anti Pv3 acaba de ser desativado!`,
onPlain: `『✅』 O Anti Pv3 acaba de ser ativado com sucesso!`,
offPlain: `『❌』 O Anti Pv3 acaba de ser desativado!`,
})
},
};
