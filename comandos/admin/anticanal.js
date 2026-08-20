module.exports = {
name: 'anticanal',
aliases: ['antichannel'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de conteúdos de canais no grupo.',

async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, SoDono, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await toggleGroupFeature('anticanal', {
label: '𝔸ℕ𝕋𝕀ℂ𝔸ℕ𝔸𝕃',
onMsg: `『✅』AntiCanal ativado com sucesso!`,
offMsg: `『❌』AntiCanal desativado!`,
onPlain: '『✅』AntiCanal ativado com sucesso!',
offPlain: '『❌』AntiCanal desativado!',
}, 'anticanal');
}
};