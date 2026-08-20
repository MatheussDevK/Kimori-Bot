module.exports = {
name: 'antipayment',
aliases: ['antipay', 'antipagamento'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de mensagens de pagamento no grupo.',

async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, SoDono, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await toggleGroupFeature('antipayment', {
label: '𝔸ℕ𝕋𝕀ℙ𝔸𝕐',
onMsg: `『✅』AntiPayment ativado com sucesso!`,
offMsg: `『❌』AntiPayment desativado!`,
onPlain: '『✅』AntiPayment ativado com sucesso!',
offPlain: '『❌』AntiPayment desativado!',
}, 'antipay');
}
};