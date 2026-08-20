module.exports = {
name: 'listalugueis',
aliases: ['listaaluguel', 'gruposalugados'],
category: 'dono',
description: 'Lista todos os grupos com aluguel ativo, apenas dono.',
async execute(ctx) {
const {
reply, mess, SoDono, isModoAluguel, listarGruposAlugados,
kiimorizinha, prefix,
} = ctx;

try {
if (!SoDono) return reply(mess.onlyOwner())
if (!isModoAluguel) return reply(`*❌ ᴏ sɪsᴛᴇᴍᴀ ᴅᴇ ᴀʟᴜɢᴜᴇʟ ᴇsᴛᴀ́ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ.*`)
const grupos = listarGruposAlugados()
if (grupos.length === 0) {
return reply(`*📋 ɴᴇɴʜᴜᴍ ɢʀᴜᴘᴏ ᴄᴏᴍ ᴀʟᴜɢᴜᴇʟ ᴀᴛɪᴠᴏ ɴᴏ ᴍᴏᴍᴇɴᴛᴏ.*`)}
let texto = `╭─❨ 📋 𝐆𝐑𝐔𝐏𝐎𝐒 𝐀𝐋𝐔𝐆𝐀𝐃𝐎𝐒 ❩─╮\n\n`
texto += `📊 *Total:* ${grupos.length} grupo(s)\n\n`
for (let i = 0; i < grupos.length; i++) {
const g = grupos[i]
const restante = g.expiraEm - Date.now()
const dias = Math.floor(restante / (1000 * 60 * 60 * 24))
const horas = Math.floor((restante / (1000 * 60 * 60)) % 24)
try {
const meta = await kiimorizinha.groupMetadata(g.id)
const nome = meta.subject || "Grupo sem nome"
texto += `*${i + 1}.* ${nome}\n`
} catch {
texto += `*${i + 1}.* Grupo indisponível\n`}
texto += ` ⏳ ${dias}d ${horas}h restantes\n`
texto += ` 🆔 \`${g.id}\`\n\n`}
texto += `╰──────────────────\n`
texto += `💡 Use: ${prefix}removeraluguel <número>`
await reply(texto.trim())
} catch (e) {
console.log("ERRO LISTALUGUEIS:", e)
reply(mess.error())}
},
};
