module.exports = {
name: 'antinotas',
aliases: ['antinota'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de notas de voz no grupo.',

async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await toggleGroupFeature('antinotas', {
label: '𝔸ℕ𝕋𝕀ℕ𝕆𝕋𝔸𝕊',
onMsg: `『✅』O recurso AntiNotas foi ativado com sucesso no grupo!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』O recurso AntiNotas foi ativado com sucesso no grupo!',
offPlain: '『❌』O recurso foi desativado com sucesso no grupo!',
}, 'antinotas');
}
};