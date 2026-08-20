module.exports = {
name: 'antilinkgp',
aliases: ['antilinkgrupo', 'antilinkg'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de links de convite para grupos no WhatsApp.',

async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await toggleGroupFeature('antilinkgp', {
label: '𝔸ℕ𝕋𝕀𝕃𝕀ℕ𝕂𝔾ℙ',
onMsg: `『✅』O recurso AntiLink Grupo foi ativado com sucesso no grupo!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』O recurso AntiLink Grupo foi ativado com sucesso no grupo!',
offPlain: '『❌』O recurso foi desativado com sucesso no grupo!',
}, 'antilinkgp');
}
};