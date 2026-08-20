const fs = require('fs');

module.exports = {
name: 'alugarbot',
category: 'dono',
description: 'Mostra o menu de planos de aluguel do bot com botões pra escolher.',
async execute(ctx) {
const {
reply, mess, isModoAluguel, reagir, from, aluguelPlanos, formatBRL,
prefix, SoDono, isGroup, kiimorizinha, sender, ChannelContextNewsLetter,
sendInteractiveMessage, selo,
} = ctx;

try {
if (!isModoAluguel) return reply(`*❌ ᴏ sɪsᴛᴇᴍᴀ ᴅᴇ ᴀʟᴜɢᴜᴇʟ ᴇsᴛᴀ́ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ɴᴏ ᴍᴏᴍᴇɴᴛᴏ.*`)
await reagir(from, "💎")
const planos = aluguelPlanos()
const planosGratis = planos.filter(p => p.valor === 0)
const planosPagos = planos.filter(p => p.valor > 0)
const mkRows = (arr) => arr.map(p => ({
header: p.nome,
title: `${p.valor === 0 ? "🎁 GRÁTIS" : "💰 R$ " + formatBRL(p.valor)} → ${p.desc}`,
description: `⏰ ${p.dias > 0 ? p.dias + " dias" : ""}${p.horas > 0 ? p.horas + " horas" : ""}`,
id: SoDono ? `${prefix}alugar ${p.id}` : `${prefix}alugarpv ${p.id}`}))
const sections = []
if (planosGratis.length > 0) {
sections.push({
title: "🎁 PLANOS GRATUITOS",
rows: mkRows(planosGratis)})}
sections.push({
title: "💎 PLANOS PAGOS",
rows: mkRows(planosPagos)})
const btnPlanos = {
name: "single_select",
buttonParamsJson: JSON.stringify({
title: "📦 ESCOLHER PLANO",
sections: sections})}
const textoMenu =
`┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓\n` +
`┣⋆⃟ۣۜ᭪➣𖡦 𝐀𝐋𝐔𝐆𝐔𝐄𝐋 【💎】\n` +
`┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛\n` +
`╎\n` +
`┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓\n` +
`┃╭─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╮\n` +
`┃✧ ✧ ✧ ✧ ✧\n` +
`┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ📍 *Local atual:* ${isGroup ? "Grupo" : "Privado"}\n` +
`┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ👤 *Modo:* ${SoDono ? "👑 Dono" : "🙋 Usuário"}\n` +
(SoDono ? `┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ⚡ *Clique no plano para ativar!*\n` : `┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ📩 *Clique no plano para falar com o dono!*\n`) +
`┃✧ ✧ ✧ ✧ ✧\n` +
`┃╰─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╯\n` +
`┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛`
const payload = {
text: textoMenu,
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [sender] },
interactiveButtons: [btnPlanos],
}
const caminhoVideo = "./config-bot/logos/fotomenu.mp4"
const caminhoImagem = "./config-bot/logos/fotomenu.png"
if (fs.existsSync(caminhoVideo)) {
payload.video = { url: caminhoVideo }
payload.gifPlayback = true
} else if (fs.existsSync(caminhoImagem)) {
payload.image = { url: caminhoImagem }
}
await sendInteractiveMessage(kiimorizinha, from, payload, { quoted: selo })
} catch (e) {
console.log("ERRO ALUGARBOT:", e)
reply(mess.error())}
},
};
