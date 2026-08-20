module.exports = {
name: 'antiddd',
aliases: ['anti_ddd', 'anti-ddd'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de números com DDD específicos.',

async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, dataGp, setGp, EnviaBtnReply, kiimorizinha, from, selo, prefix, emojii, isBotoes } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

if (dataGp[0].ANTI_DDD.active) {
dataGp[0].ANTI_DDD.active = false;
setGp(dataGp);

if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『❌』O recurso foi desativado com sucesso no grupo!`,
[
{ display_text: `『✅』𝔸𝕋𝕀𝕍𝔸ℝ 𝔸ℕ𝕋𝕀𝔻𝔻𝔻『✅』`, id: `${prefix}antiddd` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『❌』O recurso foi desativado com sucesso no grupo!');
}
} else {
dataGp[0].ANTI_DDD.active = true;
setGp(dataGp);

if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『✅』O recurso AntiDDD foi ativado com sucesso no grupo!`,
[
{ display_text: `『❌』𝔻𝔼𝕊𝔸𝕋𝕀𝕍𝔸ℝ 𝔸ℕ𝕋𝕀𝔻𝔻𝔻『❌』`, id: `${prefix}antiddd` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『✅』O recurso AntiDDD foi ativado com sucesso no grupo!');
}
}
}
};