module.exports = {
name: 'addaluguel',
aliases: ['alugar'],
category: 'dono',
description: 'Ativa um plano de aluguel no grupo atual (ou informado, via PV), apenas dono.',
async execute(ctx) {
const {
reply, mess, isModoAluguel, args, q, prefix, findPlano, aluguelPlanos,
isGroup, kiimorizinha, from, SoDono, reagir, ativarAluguel, formatBRL,
emojii, botNome: NomeDoBot, ChannelContextNewsLetter, selo,
} = ctx;

try {
if (!isModoAluguel) return reply(`*❌ ᴏ sɪsᴛᴇᴍᴀ ᴅᴇ ᴀʟᴜɢᴜᴇʟ ᴇsᴛᴀ́ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ.*`)
const planoId = String(args[0] || q || "").trim().toLowerCase()
if (!planoId) return reply(`*❌ ᴜsᴇ:* ${prefix}alugar <plano>\n\n*ᴇxᴇᴍᴘʟᴏs:*\n▸ ${prefix}alugar teste\n▸ ${prefix}alugar 7d\n▸ ${prefix}alugar 30d\n▸ ${prefix}alugar vitalicio`)
const plano = findPlano(planoId)
if (!plano) {
const lista = aluguelPlanos().map(p => `${p.id} = ${p.nome}`).join("\n")
return reply(`*❌ ᴘʟᴀɴᴏ ɪɴᴠᴀ́ʟɪᴅᴏ!*\n\n*ᴘʟᴀɴᴏs ᴅɪsᴘᴏɴɪ́ᴠᴇɪs:*\n${lista}\n\n*ᴜsᴇ:* ${prefix}alugar <id>`)}
let grupoAlvo = ""
let nomeGrupo = ""
if (isGroup) {
grupoAlvo = from
try {
const meta = await kiimorizinha.groupMetadata(from)
nomeGrupo = meta.subject || "Grupo"
} catch {
nomeGrupo = "Grupo"}
} else {
const gid = String(args[1] || "").trim()
if (!gid) {
return reply(
`*📋 ᴘᴀʀᴀ ᴀᴛɪᴠᴀʀ ᴘᴇʟᴏ ᴘᴠ, ᴇɴᴠɪᴇ ᴏ ɪᴅ ᴏᴜ ʟɪɴᴋ ᴅᴏ ɢʀᴜᴘᴏ:*\n\n` +
`▸ ${prefix}alugar ${plano.id} <id-do-grupo>\n` +
`▸ ${prefix}alugar ${plano.id} <link-do-grupo>`)}
const match = gid.match(/chat\.whatsapp\.com\/([A-Za-z0-9]+)/)
grupoAlvo = match ? `${match[1]}@g.us` : gid.includes("@g.us") ? gid : `${gid}@g.us`
try {
const meta = await kiimorizinha.groupMetadata(grupoAlvo)
nomeGrupo = meta.subject || "Grupo"
} catch {
return reply(`*❌ ɴᴀ̃ᴏ ᴄᴏɴsᴇɢᴜɪ ᴀᴄᴇssᴀʀ ᴏ ɢʀᴜᴘᴏ. ᴠᴇʀɪғɪǫᴜᴇ ᴏ ɪᴅ/ʟɪɴᴋ.*`)}}
if (!SoDono) {
const donos = global.dono || []
return reply(
`*🔒 ᴀᴘᴇɴᴀs ᴏ ᴅᴏɴᴏ ᴅᴏ ʙᴏᴛ ᴘᴏᴅᴇ ᴀᴛɪᴠᴀʀ ᴘʟᴀɴᴏs!*\n\n` +
`*📩 ᴇɴᴛʀᴇ ᴇᴍ ᴄᴏɴᴛᴀᴛᴏ:*\n` +
`${donos.map(d => `▸ wa.me/${d.replace(/@.*/, "")}`).join("\n")}\n\n` +
`*💡 ᴅɪɢᴀ ǫᴜᴇ ᴅᴇsᴇᴊᴀ ᴏ ᴘʟᴀɴᴏ:* ${plano.nome}`)}
await reagir(from, "✅")
const expiraEm = ativarAluguel(grupoAlvo, plano.dias, plano.horas)
const dataExpira = new Date(expiraEm).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
let duracao = ""
if (plano.dias > 0 && plano.horas > 0) duracao = `${plano.dias} dias e ${plano.horas} horas`
else if (plano.dias > 0) duracao = `${plano.dias} dias`
else if (plano.horas > 0) duracao = `${plano.horas} horas`
const msgAtivado =
`┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𖡦 𝐀𝐋𝐔𝐆𝐔𝐄𝐋 𝐀𝐓𝐈𝐕𝐀𝐃𝐎【✅】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┃╭─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╮
┃✧ ✧ ✧ ✧ ✧
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ📦 *Plano:* ${plano.nome}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ⏰ *Duração:* ${duracao}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ📅 *Expira em:* ${dataExpira}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ👤 *Grupo:* ${nomeGrupo}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${plano.valor > 0 ? `💰 *Valor:* R$ ${formatBRL(plano.valor)}` : `🎁 *Valor:* GRÁTIS`}
┃✧ ✧ ✧ ✧ ✧
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ${emojii} ✨ *${NomeDoBot || "Bot"} está liberado no grupo!*
┃╰─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╯
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛`
await kiimorizinha.sendMessage(from, {
text: msgAtivado,
contextInfo: { ...ChannelContextNewsLetter }
}, { quoted: selo })
if (!isGroup || (isGroup && grupoAlvo !== from)) {
try {
await kiimorizinha.sendMessage(grupoAlvo, {
text: `┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𖡦 𝐁𝐎𝐓 𝐀𝐓𝐈𝐕𝐀𝐃𝐎 【🎉】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┃╭─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╮
┃✧ ✧ ✧ ✧ ✧
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ✨ *${NomeDoBot || "Bot"}* foi ativado neste grupo!
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ📦 *Plano:* ${plano.nome}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ⏰ *Duração:* ${duracao}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ📅 *Expira:* ${dataExpira}
┃✧ ✧ ✧ ✧ ✧
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ💡 *Use os comandos à vontade!*
┃╰─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╯
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛`})
} catch (e) { console.error('[erro]', e) }}
} catch (e) {
console.log("ERRO ALUGAR:", e)
reply(mess.error())}
},
};
