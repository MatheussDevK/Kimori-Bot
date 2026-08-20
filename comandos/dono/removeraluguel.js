module.exports = {
name: 'removeraluguel',
aliases: ['rmaluguel', 'desativaraluguel'],
category: 'dono',
description: 'Remove o aluguel ativo de um grupo (por id, link ou número da lista), apenas dono.',
async execute(ctx) {
const {
reply, mess, SoDono, isModoAluguel, isGroup, args, from, prefix,
listarGruposAlugados, isAluguelAtivo, desativarAluguel, kiimorizinha,
} = ctx;

try {
if (!SoDono) return reply(mess.onlyOwner())
if (!isModoAluguel) return reply(`*❌ ᴏ sɪsᴛᴇᴍᴀ ᴅᴇ ᴀʟᴜɢᴜᴇʟ ᴇsᴛᴀ́ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ.*`)
let grupoAlvo = ""
if (isGroup && !args[0]) {
grupoAlvo = from
} else if (args[0]) {
const entrada = args[0].trim()
if (/^\d+$/.test(entrada)) {
const grupos = listarGruposAlugados()
const index = parseInt(entrada) - 1
if (isNaN(index) || index < 0 || index >= grupos.length) {
return reply(`*❌ ɪ́ɴᴅɪᴄᴇ ɪɴᴠᴀ́ʟɪᴅᴏ. ᴜsᴇ ᴜᴍ ɴᴜ́ᴍᴇʀᴏ ᴅᴇ 1 ᴀ ${grupos.length}*`)}
grupoAlvo = grupos[index].id
} else {
const match = entrada.match(/chat\.whatsapp\.com\/([A-Za-z0-9]+)/)
grupoAlvo = match ? `${match[1]}@g.us` : entrada.includes("@g.us") ? entrada : `${entrada}@g.us`}
} else {
return reply(`*📋 ᴜsᴇ:*\n▸ ${prefix}removeraluguel (no grupo)\n▸ ${prefix}removeraluguel <id>\n▸ ${prefix}removeraluguel <número da lista>`)}
if (!isAluguelAtivo(grupoAlvo)) {
return reply(`*❌ ᴇsᴛᴇ ɢʀᴜᴘᴏ ɴᴀ̃ᴏ ᴘᴏssᴜɪ ᴀʟᴜɢᴜᴇʟ ᴀᴛɪᴠᴏ.*`)}
desativarAluguel(grupoAlvo)
let nomeGrupo = "Grupo"
try {
const meta = await kiimorizinha.groupMetadata(grupoAlvo)
nomeGrupo = meta.subject || "Grupo"
} catch (e) { console.error('[erro]', e) }
await reply(`*✅ ᴀʟᴜɢᴜᴇʟ ʀᴇᴍᴏᴠɪᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ!*\n\n👤 Grupo: ${nomeGrupo}\n🔓 O bot foi desativado neste grupo.`)
} catch (e) {
console.log("ERRO REMOVERALUGUEL:", e)
reply(mess.error())}
},
};
