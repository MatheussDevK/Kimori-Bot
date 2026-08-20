module.exports = {
name: 'antisp',
aliases: ['antispamglobal', 'anti_sp', 'anti-sp'],
category: 'admin',
description: 'Ativa/desativa o detector global de links de spam no grupo (apenas dono).',
async execute(ctx) {
const { reply, mess, isGroup, SoDono, info, isBotGroupAdmins, ANT_SP, from, groupName, EnviaBtnReply, kiimorizinha, selo, prefix, emojii, isBotoes, fs, directory } = ctx;
if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono && !info.key.fromMe) return reply("*Você não tem permissão de usar este comando!!!* 😠");
if (!isBotGroupAdmins) return reply("O bot precisa ser *Administrador* do grupo para executar este comando");
if (ANT_SP.groupId === from && ANT_SP.active) {
ANT_SP.active = false;
fs.writeFileSync(directory, JSON.stringify(ANT_SP, null, 2));
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『❌』 AntiSP desativado com sucesso!`,
[
{ display_text: `『✅』𝔸𝕋𝕀𝕍𝔸ℝ 𝔸ℕ𝕋𝕀𝕊ℙ『✅』`, id: `${prefix}antisp` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply(`『❌』 AntiSP desativado com sucesso!`);
}
} else {
ANT_SP.active = true;
ANT_SP.groupId = from;
ANT_SP.groupName = groupName;
fs.writeFileSync(directory, JSON.stringify(ANT_SP, null, 2));
if (isBotoes) {
await EnviaBtnReply(kiimorizinha, from,
`『✅』 Detector de links global ativado com sucesso!`,
[
{ display_text: `『❌』𝔻𝔼𝕊𝔸𝕋𝕀𝕍𝔸ℝ 𝔸ℕ𝕋𝕀𝕊ℙ『❌』`, id: `${prefix}antisp` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }
]
);
} else {
reply(`『✅』 Detector de links global ativado com sucesso!`);
}
}
},
};