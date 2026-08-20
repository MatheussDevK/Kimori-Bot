const fs = require('fs');

module.exports = {
name: 'rgrepo',
aliases: ['addrepo'],
category: 'admin',
description: 'Registra um autorepo (texto, áudio, figurinha, foto ou vídeo) com um gatilho.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, isAutorepo,
q, prefix, from, loadGroupAutorepo, saveGroupAutorepo, getQuotedMessageRepo,
rmLetras, normalizeRepoKey, extractAnyTextRepo, AUTOREPO_MEDIA_DIR,
saveAutorepoMediaFile,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup())
if (!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if (!isAutorepo) return reply('*ᴀᴛɪᴠᴇ ᴏ ᴀᴜᴛᴏʀᴇᴘᴏ ᴘʀɪᴍᴇɪʀᴏ ᴘᴀʀᴀ ᴜsᴀʀ ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ*')
if (!q.trim()) {
return reply(
`*ᴜsᴇ ᴀssɪᴍ*

*• ${prefix}rgrepo oi/oi mano* (texto)
*• ${prefix}rgrepo teste* (marcando texto, áudio, figurinha, foto ou vídeo)`
)
}

const entradaRepo = q.trim()
const repos = loadGroupAutorepo(from)
const quoted = getQuotedMessageRepo()

if (!quoted) {
if (!entradaRepo.includes('/')) {
return reply(`*ᴘʀᴀ ᴛᴇxᴛᴏ ᴜsᴇ ᴀssɪᴍ:* ${prefix}rgrepo oi/oi mano*`)
}

const partes = entradaRepo.split('/')
const gatilhoTxt = String(partes.shift() || '').trim()
const respostaTxt = String(partes.join('/') || '').trim()

if (!gatilhoTxt) return reply('*ᴄᴀᴅᴇ ᴏ ɢᴀᴛɪʟʜᴏ?*')
if (!respostaTxt) return reply('*ᴄᴀᴅᴇ ᴀ ʀᴇsᴘᴏsᴛᴀ?*')

const gatilhoFinal = rmLetras(gatilhoTxt).replace(/\s+/g, ' ').trim()
const keyTexto = normalizeRepoKey(gatilhoFinal)

const idxOld = repos.findIndex(r => normalizeRepoKey(r?.trigger) === keyTexto)
if (idxOld >= 0) {
const antigo = repos[idxOld]
if (antigo?.file) {
const oldPath = `${AUTOREPO_MEDIA_DIR}/${antigo.file}`
try { if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath) } catch (e) { console.error('[erro]', e) }
}
repos.splice(idxOld, 1)
}

repos.push({
trigger: gatilhoFinal,
type: 'text',
text: respostaTxt
})

saveGroupAutorepo(from, repos)
return reply(`*ᴏᴋ, ᴀᴜᴛᴏʀᴇᴘᴏ ᴛᴇxᴛᴏ sᴀʟᴠᴏ ᴅᴇ ${gatilhoFinal} ᴘᴀʀᴀ ${respostaTxt}*`)
}

const gatilho = rmLetras(entradaRepo).replace(/\s+/g, ' ').trim()
if (!gatilho) return reply('*ɢᴀᴛɪʟʜᴏ ɪɴᴠᴀ́ʟɪᴅᴏ*')

const key = normalizeRepoKey(gatilho)
const textoQuoted = extractAnyTextRepo(quoted)
const img = quoted.imageMessage || quoted?.viewOnceMessage?.message?.imageMessage || quoted?.viewOnceMessageV2?.message?.imageMessage
const vid = quoted.videoMessage || quoted?.viewOnceMessage?.message?.videoMessage || quoted?.viewOnceMessageV2?.message?.videoMessage
const aud = quoted.audioMessage
const stk = quoted.stickerMessage

const idxOld = repos.findIndex(r => normalizeRepoKey(r?.trigger) === key)
if (idxOld >= 0) {
const antigo = repos[idxOld]
if (antigo?.file) {
const oldPath = `${AUTOREPO_MEDIA_DIR}/${antigo.file}`
try { if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath) } catch (e) { console.error('[erro]', e) }
}
repos.splice(idxOld, 1)
}

if (stk) {
const saved = await saveAutorepoMediaFile(from, key, 'sticker', quoted)
if (!saved) return reply('*ɴᴀ̃ᴏ ᴄᴏɴsᴇɢᴜɪ sᴀʟᴠᴀʀ ᴇssᴀ ғɪɢᴜʀɪɴʜᴀ*')

repos.push({
trigger: gatilho,
type: 'sticker',
file: saved.file,
mimetype: saved.mimetype
})

saveGroupAutorepo(from, repos)
return reply(`*ᴏᴋ, ᴀᴜᴛᴏʀᴇᴘᴏ ғɪɢᴜʀɪɴʜᴀ sᴀʟᴠᴀ ᴇᴍ ${gatilho}*`)
}

if (aud) {
const saved = await saveAutorepoMediaFile(from, key, 'audio', quoted)
if (!saved) return reply('*ɴᴀ̃ᴏ ᴄᴏɴsᴇɢᴜɪ sᴀʟᴠᴀʀ ᴇssᴇ ᴀᴜ́ᴅɪᴏ*')

repos.push({
trigger: gatilho,
type: 'audio',
file: saved.file,
mimetype: saved.mimetype
})

saveGroupAutorepo(from, repos)
return reply(`*ᴏᴋ, ᴀᴜᴛᴏʀᴇᴘᴏ ᴀᴜ́ᴅɪᴏ sᴀʟᴠᴏ ᴇᴍ ${gatilho}*`)
}

if (img) {
const saved = await saveAutorepoMediaFile(from, key, 'image', quoted)
if (!saved) return reply('*ɴᴀ̃ᴏ ᴄᴏɴsᴇɢᴜɪ sᴀʟᴠᴀʀ ᴇssᴀ ғᴏᴛᴏ*')

repos.push({
trigger: gatilho,
type: 'image',
file: saved.file,
mimetype: saved.mimetype,
caption: textoQuoted || ''
})

saveGroupAutorepo(from, repos)
return reply(`*ᴏᴋ, ᴀᴜᴛᴏʀᴇᴘᴏ ғᴏᴛᴏ sᴀʟᴠᴀ ᴇᴍ ${gatilho}*`)
}

if (vid) {
const saved = await saveAutorepoMediaFile(from, key, 'video', quoted)
if (!saved) return reply('*ɴᴀ̃ᴏ ᴄᴏɴsᴇɢᴜɪ sᴀʟᴠᴀʀ ᴇssᴇ ᴠɪ́ᴅᴇᴏ*')

repos.push({
trigger: gatilho,
type: 'video',
file: saved.file,
mimetype: saved.mimetype,
caption: textoQuoted || ''
})

saveGroupAutorepo(from, repos)
return reply(`*ᴏᴋ, ᴀᴜᴛᴏʀᴇᴘᴏ ᴠɪ́ᴅᴇᴏ sᴀʟᴠᴏ ᴇᴍ ${gatilho}*`)
}

if (textoQuoted) {
repos.push({
trigger: gatilho,
type: 'text',
text: textoQuoted
})

saveGroupAutorepo(from, repos)
return reply(`*ᴏᴋ, ᴀᴜᴛᴏʀᴇᴘᴏ ᴛᴇxᴛᴏ sᴀʟᴠᴏ ᴇᴍ ${gatilho}*`)
}

return reply('*ᴍᴀʀǫᴜᴇ ᴜᴍ ᴛᴇxᴛᴏ, ᴀᴜ́ᴅɪᴏ, ғɪɢᴜʀɪɴʜᴀ, ғᴏᴛᴏ ᴏᴜ ᴠɪ́ᴅᴇᴏ*')
},
};
