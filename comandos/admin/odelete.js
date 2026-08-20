module.exports = {
name: 'odelete',
aliases: ['odeletemsg'],
category: 'admin',
description: 'Ativa/desativa a exclusão automática de mensagens de não-admins.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, SoDono, isBotGroupAdmins, nescessario, setNes, EnviaBtnReply, kiimorizinha, from, selo, prefix, emojii, isBotoes } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
nescessario.Odelete = !nescessario.Odelete;
setNes(nescessario);
if (nescessario.Odelete) {
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『✅』O recurso ODelete foi ativado com sucesso nos grupos!`,
[
{ display_text: `『❌』𝔻𝔼𝕊𝔸𝕋𝕀𝕍𝔸ℝ 𝕆𝔻𝔼𝕃𝔼𝕋𝔼『❌』`, id: `${prefix}odelete` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『✅』O recurso ODelete foi ativado com sucesso nos grupos!');
}
} else {
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『❌』O recurso foi desativado com sucesso nos grupos!`,
[
{ display_text: `『✅』𝔸𝕋𝕀𝕍𝔸ℝ 𝕆𝔻𝔼𝕃𝔼𝕋𝔼『✅』`, id: `${prefix}odelete` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『❌』O recurso foi desativado com sucesso nos grupos!');
}
}
},
};