module.exports = {
name: 'antidoc',
aliases: ['antidocumento'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de documentos no grupo.',

async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await toggleGroupFeature('antidoc', {
label: '𝔸ℕ𝕋𝕀𝔻𝕆ℂ',
onMsg: `『✅』O recurso AntiDocumento foi ativado com sucesso no grupo!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』O recurso AntiDocumento foi ativado com sucesso no grupo!',
offPlain: '『❌』O recurso foi desativado com sucesso no grupo!',
}, 'antidoc');
}
};