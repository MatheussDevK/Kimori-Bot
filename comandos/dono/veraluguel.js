module.exports = {
name: 'veraluguel',
category: 'dono',
description: 'Mostra o status/tempo restante do aluguel de um grupo.',
async execute(ctx) {
const {
reply, isModoAluguel, isGroup, args, prefix, from, tempoRestante,
kiimorizinha,
} = ctx;

try {
if (!isModoAluguel) return reply(`*❌ ᴏ sɪsᴛᴇᴍᴀ ᴅᴇ ᴀʟᴜɢᴜᴇʟ ᴇsᴛᴀ́ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ.*`)
let grupoVerificar = from
if (!isGroup) {
const gid = String(args[0] || "").trim()
if (gid) {
const match = gid.match(/chat\.whatsapp\.com\/([A-Za-z0-9]+)/)
grupoVerificar = match ? `${match[1]}@g.us` : gid.includes("@g.us") ? gid : `${gid}@g.us`
} else {
return reply(`*📋 ᴇsᴛᴀᴍᴏs ɴᴏ ᴘᴠ. ᴇsᴘᴇᴄɪғɪǫᴜᴇ ᴏ ɢʀᴜᴘᴏ:*\n▸ ${prefix}veraluguel <id/link>`)}}
const restante = tempoRestante(grupoVerificar)
if (!restante) {
return reply(`*❌ ᴇsᴛᴇ ɢʀᴜᴘᴏ ɴᴀ̃ᴏ ᴘᴏssᴜɪ ᴀʟᴜɢᴜᴇʟ ᴀᴛɪᴠᴏ ɴᴏ ᴍᴏᴍᴇɴᴛᴏ.*`)}
let nomeGrupo = "Grupo"
try {
const meta = await kiimorizinha.groupMetadata(grupoVerificar)
nomeGrupo = meta.subject || "Grupo"
} catch (e) { console.error('[erro]', e) }
const msgStatus =
`┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┣⋆⃟ۣۜ᭪➣ 𖡦 𝐒𝐓𝐀𝐓𝐔𝐒 𝐃𝐎 𝐀𝐋𝐔𝐆𝐔𝐄𝐋 【⏰】
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛
╎
┏═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┓
┃╭─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╮
┃✧ ✧ ✧ ✧ ✧
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ👤 *Grupo:* ${nomeGrupo}
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ⏳ *Tempo restante:* ${restante.dias}d ${restante.horas}h ${restante.min}min
┃✦𝆺𝅥˚ ஓீᤢ✧͢⃟ᤢ📅 *Expira em:* ${restante.expiraEm.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
┃✧ ✧ ✧ ✧ ✧
┃╰─── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ───╯
┗═•✭･ﾟ✧*･ﾟ| ♡ |*✭˚･ﾟ✧･ﾟ•═┛`
await reply(msgStatus)
} catch (e) {
console.log("ERRO VERALUGUEL:", e)
reply(ctx.mess.error())}
},
};
