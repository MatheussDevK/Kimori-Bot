module.exports = {
name: 'x9adm',
aliases: ['x9'],
category: 'admin',
description: 'Ativa/desativa o modo X9 que avisa sobre ações de admins no grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, dataGp, setGp, EnviaBtnReply, kiimorizinha, from, selo, prefix, emojii, isBotoes } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
dataGp[0].x9 = !dataGp[0].x9;
setGp(dataGp);
if (dataGp[0].x9) {
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『✅』O comando X9 Admin foi ativado com sucesso!`,
[
{ display_text: `『❌』𝔻𝔼𝕊𝔸𝕋𝕀𝕍𝔸ℝ 𝕏𝟡𝔸𝔻𝕄『❌』`, id: `${prefix}x9adm` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『✅』O comando X9 Admin foi ativado com sucesso!');
}
} else {
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『❌』O recurso foi desativado com sucesso no grupo!`,
[
{ display_text: `『✅』𝔸𝕋𝕀𝕍𝔸ℝ 𝕏𝟡𝔸𝔻𝕄『✅』`, id: `${prefix}x9adm` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『❌』O recurso foi desativado com sucesso no grupo!');
}
}
},
};