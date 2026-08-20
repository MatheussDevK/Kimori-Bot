module.exports = {
name: 'antipv',
category: 'dono',
description: 'Ativa/desativa o AntiPv.',
async execute(ctx) {
const { reply, mess, SoDono, toggleNescessarioFeature } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
await toggleNescessarioFeature('antipv', {
label: '𝔸ℕ𝕋𝕀ℙ𝕍',
onMsg: `『✅』 O AntiPv acaba de ser ativado com sucesso no bot!`,
offMsg: `『❌』 O Anti Pv foi desativado!`,
onPlain: `『✅』 O AntiPv acaba de ser ativado com sucesso no bot!`,
offPlain: `『❌』 O Anti Pv foi desativado!`,
})
},
};
