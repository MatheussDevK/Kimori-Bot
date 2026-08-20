module.exports = {
name: 'antifake',
aliases: ['antifalso', 'antinumerofalso'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de números falsos/estrangeiros no grupo.',

async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, SoDono, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await toggleGroupFeature('antifake', {
label: '𝔸ℕ𝕋𝕀𝔽𝔸𝕂𝔼',
onMsg: `『✅』O recurso AntiFake foi ativado com sucesso no grupo!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』O recurso AntiFake foi ativado com sucesso no grupo!',
offPlain: '『❌』O recurso foi desativado com sucesso no grupo!',
}, 'antifake');
}
};