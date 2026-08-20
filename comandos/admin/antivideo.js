module.exports = {
name: 'antivideo',
aliases: ['antivid', 'antivids', 'antivideos'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de vídeos no grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await toggleGroupFeature('antivideo', {
label: '𝔸ℕ𝕋𝕀𝕍Í𝔻𝔼𝕆',
onMsg: `『✅』O recurso Anti Vídeo foi ativado com sucesso no grupo!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』O recurso Anti Vídeo foi ativado com sucesso no grupo!',
offPlain: '『❌』O recurso foi desativado com sucesso no grupo!',
}, 'antivideo')
},
};