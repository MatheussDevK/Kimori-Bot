module.exports = {
name: 'autorepo',
category: 'admin',
description: 'Liga/desliga o recurso de autoresposta (autorepo) no grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, isAutorepo,
dataGp, setGp, isBotoes, EnviaBtnReply, kiimorizinha, from, prefix, emojii,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup())
if (!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if (isAutorepo) {
dataGp[0].autoresposta = false
setGp(dataGp)
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『❌』O recurso foi desativado com sucesso no grupo!`,
[{ display_text: `『✅』𝔸𝕋𝕀𝕍𝔸ℝ 𝔸𝕌𝕋𝕆ℝ𝔼ℙ𝕆『✅』`, id: `${prefix}autorepo` },
 { display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }])
} else {
reply('『❌』O recurso foi desativado com sucesso no grupo!')
}
} else {
dataGp[0].autoresposta = true
setGp(dataGp)
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『✅』O recurso AutoRepo foi ativado com sucesso no grupo!`,
[{ display_text: `『❌』𝔻𝔼𝕊𝔸𝕋𝕀𝕍𝔸ℝ 𝔸𝕌𝕋𝕆ℝ𝔼ℙ𝕆『❌』`, id: `${prefix}autorepo` },
 { display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }])
} else {
reply('『✅』O recurso AutoRepo foi ativado com sucesso no grupo!')
}
}
},
};
