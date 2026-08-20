const fs = require('fs');

module.exports = {
name: 'alugarpv',
category: 'dono',
description: 'Envia um pedido de aluguel formatado, com botão pra falar com o dono.',
async execute(ctx) {
const {
reply, mess, isModoAluguel, SoDono, args, q, prefix, command,
findPlano, reagir, from, isGroup, kiimorizinha, formatBRL, sender,
setting, ChannelContextNewsLetter, sendInteractiveMessage, selo,
} = ctx;

try {
if (!isModoAluguel) return reply(`*❌ ᴏ sɪsᴛᴇᴍᴀ ᴅᴇ ᴀʟᴜɢᴜᴇʟ ᴇsᴛᴀ́ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ɴᴏ ᴍᴏᴍᴇɴᴛᴏ.*`)
if (SoDono) {
const planoId = String(args[0] || q || "").trim().toLowerCase()
if (planoId) {
args[0] = planoId}
return reply(`*👑 Você é o dono! Use ${prefix}alugar <plano> para ativar direto.*`)}
const planoId = String(args[0] || q || "").trim().toLowerCase()
if (!planoId) return reply(`*❌ ᴘʟᴀɴᴏ ɴᴀ̃ᴏ ᴇsᴘᴇᴄɪғɪᴄᴀᴅᴏ.*`)
const plano = findPlano(planoId)
if (!plano) return reply(`*❌ ᴘʟᴀɴᴏ ɪɴᴠᴀ́ʟɪᴅᴏ!*\n\nUse ${prefix}alugarbot para ver os planos.`)
await reagir(from, "💎")
const duracao = plano.dias > 0 ? `${plano.dias} dias` : `${plano.horas} horas`
const preco = plano.valor === 0 ? "GRÁTIS" : `R$ ${formatBRL(plano.valor)}`
let infoGrupo = ""
if (isGroup) {
try {
const meta = await kiimorizinha.groupMetadata(from)
infoGrupo = `Grupo: ${meta.subject || "N/A"}`
} catch {
infoGrupo = `Grupo: ${from}`}
} else {
infoGrupo = `PV: ${sender}`}
const mensagemDono = encodeURIComponent(
`┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𐐒𐐒𐐒 𝐒𝐎𝐋𝐈 𝐃𝐄 𝐀𝐋𝐔𝐆𝐔𝐄𝐋【💎】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┃╭─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╮
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ📦 *Plano:* ${plano.nome}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ⏰ *Duração:* ${duracao}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ💰 *Valor:* ${preco}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ👤 ${infoGrupo}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ🆔 *ID:* ${from}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ⚡ *Use:* /alugar ${plano.id} ${from}
┃╰─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╯
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛`)
const linkDono = `https://wa.me/${setting.ownerNumber}?text=${mensagemDono}`
const textoUsuario =
`┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𖡦 𝐒𝐎𝐋𝐈 𝐀𝐋𝐔𝐆𝐔𝐄𝐋【💎】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┃╭─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╮
┃✧ ✧ ✧ ✧ ✧
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ📦 *Plano escolhido:* ${plano.nome}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ⏰ *Duração:* ${duracao}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ💰 *Valor:* ${preco}
┃✧ ✧ ✧ ✧ ✧
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ📩 *Clique no botão abaixo para falar*
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ📩 *com o dono e ativar este plano!*
┃╰─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╯
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛`
const caminhoVideo = "./config-bot/logos/fotomenu.mp4"
const caminhoImagem = "./config-bot/logos/fotomenu.png"
const btnFalarDono = {
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "💬 FALAR COM O DONO",
url: linkDono,
merchant_url: linkDono})}
const payload = {
text: textoUsuario,
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [sender] },
interactiveButtons: [btnFalarDono],
}
if (fs.existsSync(caminhoVideo)) {
payload.video = { url: caminhoVideo }
payload.gifPlayback = true
} else if (fs.existsSync(caminhoImagem)) {
payload.image = { url: caminhoImagem }
}
await sendInteractiveMessage(kiimorizinha, from, payload, { quoted: selo })
} catch (e) {
console.log("ERRO ALUGARPV:", e)
reply(mess.error())}
},
};
