module.exports = {
name: 'antiaudio',
aliases: ['antiaud', 'antiaudios'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de áudios no grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await toggleGroupFeature('antiaudio', {
label: '𝔸ℕ𝕋𝕀Á𝕌𝔻𝕀𝕆',
onMsg: `『✅』O recurso Anti Áudio foi ativado com sucesso no grupo!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』O recurso Anti Áudio foi ativado com sucesso no grupo!',
offPlain: '『❌』O recurso foi desativado com sucesso no grupo!',
}, 'antiaudio')
},
};