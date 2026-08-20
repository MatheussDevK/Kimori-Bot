module.exports = {
name: 'anticatalogo',
aliases: ['anticatalg'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de catálogos/produtos no grupo.',

async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, dataGp, setGp, isAnticatalogo, EnviaBtnReply, kiimorizinha, from, selo, prefix, emojii, isBotoes } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

if (isAnticatalogo) {
dataGp[0].anticatalogo = false;
setGp(dataGp);

if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『❌』O recurso foi desativado com sucesso no grupo!`,
[
{ display_text: `『✅』𝔸𝕋𝕀𝕍𝔸ℝ 𝔸ℕ𝕋𝕀ℂ𝔸𝕋𝔸𝕃𝕆𝔾𝕆『✅』`, id: `${prefix}anticatalg` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『❌』O recurso foi desativado com sucesso no grupo!');
}
} else {
dataGp[0].anticatalogo = true;
setGp(dataGp);

if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『✅』O recurso AntiCatálogo foi ativado com sucesso!`,
[
{ display_text: `『❌』𝔻𝔼𝕊𝔸𝕋𝕀𝕍𝔸ℝ 𝔸ℕ𝕋𝕀ℂ𝔸𝕋𝔸𝕃𝕆𝔾𝕆『❌』`, id: `${prefix}anticatalg` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『✅』O recurso AntiCatálogo foi ativado com sucesso!');
}
}
}
};