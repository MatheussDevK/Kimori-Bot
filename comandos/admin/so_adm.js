module.exports = {
name: 'so_adm',
aliases: ['soadm', 'somenteadmin'],
category: 'admin',
description: 'Ativa/desativa o modo onde apenas admins podem usar comandos do bot.',

async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await toggleGroupFeature('soadm', {
label: '𝕊𝕆𝔸𝔻𝕄',
onMsg: `『✅』O recurso Só Adm foi ativado com sucesso no grupo!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』O recurso Só Adm foi ativado com sucesso no grupo!',
offPlain: '『❌』O recurso foi desativado com sucesso no grupo!',
}, 'so_adm');
}
};