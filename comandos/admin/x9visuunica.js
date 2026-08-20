module.exports = {
name: 'x9visuunica',
aliases: ['x9visualizacao', 'x9visu'],
category: 'admin',
description: 'Ativa/desativa o modo X9 que revela visualizações únicas no grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, dataGp, setGp, EnviaBtnReply, kiimorizinha, from, selo, prefix, emojii, isBotoes } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
dataGp[0].X9VisuUnica = !dataGp[0].X9VisuUnica;
setGp(dataGp);
if (dataGp[0].X9VisuUnica) {
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『✅』O recurso X9VisuUnica foi ativado com sucesso!`,
[
{ display_text: `『❌』𝔻𝔼𝕊𝔸𝕋𝕀𝕍𝔸ℝ 𝕏𝟡𝕍𝕀𝕊𝕌𝕌ℕ𝕀ℂ𝔸『❌』`, id: `${prefix}x9visuunica` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『✅』O recurso X9VisuUnica foi ativado com sucesso!');
}
} else {
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『❌』O recurso foi desativado com sucesso no grupo!`,
[
{ display_text: `『✅』𝔸𝕋𝕀𝕍𝔸ℝ 𝕏𝟡𝕍𝕀𝕊𝕌𝕌ℕ𝕀ℂ𝔸『✅』`, id: `${prefix}x9visuunica` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『❌』O recurso foi desativado com sucesso no grupo!');
}
}
},
};