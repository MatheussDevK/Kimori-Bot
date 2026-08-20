module.exports = {
name: 'antiloc',
aliases: ['antilocalizacao'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de localizações no grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
await toggleGroupFeature('antiloc', {
label: '𝔸ℕ𝕋𝕀𝕃𝕆ℂ',
onMsg: `『✅』O recurso Anti Localização foi ativado com sucesso!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』O recurso Anti Localização foi ativado com sucesso!',
offPlain: '『❌』O recurso foi desativado com sucesso no grupo!',
});
},
};
