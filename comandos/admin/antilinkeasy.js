module.exports = {
name: 'antilinkeasy',
aliases: ['antilinksimples', 'antilinkfacil'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de links simples no grupo (apenas deleta).',

async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await toggleGroupFeature('antilinkeasy', {
label: '𝔸ℕ𝕋𝕀𝕃𝕀ℕ𝕂𝔼𝔸𝕊𝕐',
onMsg: `『✅』O AntiLinkEasy foi ativado com sucesso no grupo!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』O AntiLinkEasy foi ativado com sucesso no grupo!',
offPlain: '『❌』O recurso foi desativado com sucesso no grupo!',
}, 'antilinkeasy');
}
};