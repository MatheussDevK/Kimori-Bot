module.exports = {
name: 'botoes',
category: 'dono',
description: 'Ativa/desativa o uso de botões interativos no bot.',
async execute(ctx) {
const { reply, mess, SoDono, nescessario, setNes, isBotoes, EnviaBtnReply, kiimorizinha, from, prefix, emojii } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
if (!isBotoes) {
nescessario.botoes = true
setNes(nescessario)
reply(`『✅』Os botões foram ativados com sucesso no bot!`)
} else {
nescessario.botoes = false
setNes(nescessario)
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『❌』Os botões foram desativados.`,
[{ display_text: `『✅』𝔸𝕋𝕀𝕍𝔸ℝ 𝔹𝕆𝕋Õ𝔼𝕊『✅』`, id: `${prefix}botoes` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }])
} else {
reply(`『❌』Os botões foram desativados.`)
}
}
},
};
