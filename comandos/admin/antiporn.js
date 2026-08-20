module.exports = {
name: 'antiporn',
aliases: ['antiporno', 'antipornografia'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de conteúdo pornográfico no grupo.',

async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, dataGp, setGp, isAntiPorn, EnviaBtnReply, kiimorizinha, from, selo, prefix, emojii, isBotoes } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

if (isAntiPorn) {
dataGp[0].antiporn = false;
setGp(dataGp);

if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『❌』O recurso foi desativado com sucesso no grupo!`,
[
{ display_text: `『✅』𝔸𝕋𝕀𝕍𝔸ℝ 𝔸ℕ𝕋𝕀ℙ𝕆ℝℕ『✅』`, id: `${prefix}antiporn` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『❌』O recurso foi desativado com sucesso no grupo!');
}
} else {
dataGp[0].antiporn = true;
setGp(dataGp);

if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『✅』O recurso AntiPornografia foi ativado com sucesso no grupo!`,
[
{ display_text: `『❌』𝔻𝔼𝕊𝔸𝕋𝕀𝕍𝔸ℝ 𝔸ℕ𝕋𝕀ℙ𝕆ℝℕ『❌』`, id: `${prefix}antiporn` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『✅』O recurso AntiPornografia foi ativado com sucesso no grupo!');
}
}
}
};