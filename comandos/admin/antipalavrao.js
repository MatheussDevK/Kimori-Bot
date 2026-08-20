module.exports = {
name: 'antipalavrão',
aliases: ['antipalavrao', 'antipalavra'],
category: 'admin',
description: 'Ativa/desativa o filtro de palavrão no grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
await toggleGroupFeature('antipalavrao.active', {
label: '𝔸ℕ𝕋𝕀ℙ𝔸𝕃𝔸𝕍ℝÃ𝕆',
onMsg: `『✅』O sistema anti palavrão foi ativado com sucesso nesse grupo!`,
offMsg: `『❌』O sistema anti palavrão foi desativado com sucesso nesse grupo!`,
onPlain: '『✅』O sistema anti palavrão acaba de ser ativado com sucesso nesse grupo!',
offPlain: '『❌』O sistema anti palavrão acaba de ser desativado com sucesso nesse grupo!',
}, 'antipalavrao')
},
};
