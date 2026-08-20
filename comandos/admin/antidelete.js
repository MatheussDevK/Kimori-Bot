module.exports = {
name: 'antidelete',
aliases: ['antidel', 'x9msg'],
category: 'admin',
description: 'Ativa/desativa o modo X9 que recupera mensagens apagadas.',

async execute(ctx) {
const { 
reply, mess, isGroup, isGroupAdmins,
from, setAntideleteFlag, getAntideleteFlag,
EnviaBtnReply, kiimorizinha, selo, prefix, emojii, isBotoes
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());

const antideleteAtivo = setAntideleteFlag(from, !getAntideleteFlag(from));

if (antideleteAtivo) {
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『✅』O modo X9 Mensagem foi ativado com sucesso!`,
[
{ display_text: `『❌』𝔻𝔼𝕊𝔸𝕋𝕀𝕍𝔸ℝ 𝔸ℕ𝕋𝕀𝔻𝔼𝕃𝔼𝕋𝔼『❌』`, id: `${prefix}antidelete` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『✅』O modo X9 Mensagem foi ativado com sucesso!');
}
} else {
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『❌』O recurso foi desativado com sucesso no grupo!`,
[
{ display_text: `『✅』𝔸𝕋𝕀𝕍𝔸ℝ 𝔸ℕ𝕋𝕀𝔻𝔼𝕃𝔼𝕋𝔼『✅』`, id: `${prefix}antidelete` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply('『❌』O recurso foi desativado com sucesso no grupo!');
}
}
}
};