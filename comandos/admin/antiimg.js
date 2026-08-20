module.exports = {
name: 'antiimg',
aliases: ['antiimagem', 'antiimage'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de imagens no grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, toggleGroupFeature } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

await toggleGroupFeature('antiimg', {
label: '𝔸ℕ𝕋𝕀𝕀𝕄𝔸𝔾𝔼𝕄',
onMsg: `『✅』O recurso Anti Imagem foi ativado com sucesso no grupo!`,
offMsg: `『❌』O recurso foi desativado com sucesso no grupo!`,
onPlain: '『✅』O recurso Anti Imagem foi ativado com sucesso no grupo!',
offPlain: '『❌』O recurso foi desativado com sucesso no grupo!',
}, 'antiimg')
},
};