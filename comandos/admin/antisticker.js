module.exports = {
name: 'antisticker',
aliases: ['antifig', 'antifigurinha'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de figurinhas no grupo.',

async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
await toggleGroupFeature('antisticker', {
label: '𝔸ℕ𝕋𝕀𝕊𝕋𝕀ℂ𝕂𝔼ℝ',
onMsg: `『✅』O recurso Anti Sticker foi ativado com sucesso!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』O recurso Anti Sticker foi ativado com sucesso!',
offPlain: '『❌』O recurso foi desativado com sucesso no grupo!',
}, 'antisticker')

},
};