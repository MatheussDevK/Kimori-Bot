module.exports = {
name: 'antilink',
aliases: ['antilinkhard'],
category: 'admin',
description: 'Ativa/desativa o bloqueio de links no grupo (modo hard).',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, dataGp, setGp, EnviaBtnReply, kiimorizinha, from, selo, prefix, emojii, isBotoes } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
dataGp[0]['antilink'] = !dataGp[0]['antilink'];
dataGp[0]['antilinkhard'] = dataGp[0]['antilink'];
setGp(dataGp);
if (dataGp[0]['antilink']) {
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『✅』O recurso AntiLinkHard foi ativado com sucesso!`,
[
{ display_text: `『❌』𝔻𝔼𝕊𝔸𝕋𝕀𝕍𝔸ℝ 𝔸ℕ𝕋𝕀𝕃𝕀ℕ𝕂『❌』`, id: `${prefix}antilink` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『✅』O recurso AntiLinkHard foi ativado com sucesso!');
}
} else {
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『❌』O recurso AntiLinkHard foi desativado no grupo!`,
[
{ display_text: `『✅』𝔸𝕋𝕀𝕍𝔸ℝ 𝔸ℕ𝕋𝕀𝕃𝕀ℕ𝕂『✅』`, id: `${prefix}antilink` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『❌』O recurso AntiLinkHard foi desativado no grupo!');
}
}
},
};