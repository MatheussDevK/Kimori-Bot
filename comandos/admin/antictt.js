module.exports = {
name: 'antictt',
aliases: ['anticontato'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de contatos no grupo.',

async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await toggleGroupFeature('antictt', {
label: '𝔸ℕ𝕋𝕀ℂ𝕋𝕋',
onMsg: `『✅』O recurso Anti Contato foi ativado com sucesso no grupo!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』O recurso Anti Contato foi ativado com sucesso no grupo!',
offPlain: '『❌』O recurso foi desativado com sucesso no grupo!',
}, 'antictt');
}
};