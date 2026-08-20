const fs = require('fs');

module.exports = {
name: 'delrepo',
aliases: ['rmrepo'],
category: 'admin',
description: 'Remove um ou mais autorepos do grupo, por número, gatilho ou "tudo".',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, isAutorepo,
q, prefix, from, loadGroupAutorepo, saveGroupAutorepo, normalizeRepoKey,
AUTOREPO_MEDIA_DIR,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup())
if (!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if (!isAutorepo) return reply('*ᴀᴛɪᴠᴇ ᴏ ᴀᴜᴛᴏʀᴇᴘᴏ ᴘʀɪᴍᴇɪʀᴏ ᴘᴀʀᴀ ᴜsᴀʀ ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ*')
const repos = loadGroupAutorepo(from)
if (!repos.length) return reply('*ᴇsᴛᴇ ɢʀᴜᴘᴏ ɴᴀ̃ᴏ ᴛᴇᴍ ɴᴇɴʜᴜᴍ ᴀᴜᴛᴏʀᴇᴘᴏ*')
const entrada = q.trim()
if (!entrada) {
return reply(`*ᴜsᴇ ᴀssɪᴍ:* ${prefix}rmrepo 1\n*ou:* ${prefix}rmrepo 1 5 7\n*ou:* ${prefix}rmrepo tudo*`)
}
const entradaNorm = normalizeRepoKey(entrada)
if (entradaNorm === 'tudo' || entradaNorm === 'todos') {
let removidos = 0
for (const item of repos) {
if (item?.file) {
const oldPath = `${AUTOREPO_MEDIA_DIR}/${item.file}`
try { if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath) } catch (e) { console.error('[erro]', e) }}
removidos++}
saveGroupAutorepo(from, [])
return reply(`*ᴏᴋ, ${removidos} ᴀᴜᴛᴏʀᴇᴘᴏs ʀᴇᴍᴏᴠɪᴅᴏs ᴄᴏᴍ sᴜᴄᴇssᴏ*`)}
const numeros = entrada
.split(/\s+/)
.map(x => Number(x))
.filter(x => Number.isInteger(x) && x > 0)
if (numeros.length) {
const unicos = [...new Set(numeros)].sort((a, b) => b - a)
const validos = unicos.filter(n => n <= repos.length)
if (!validos.length) {
return reply('*ɴᴇɴʜᴜᴍ ɴᴜ́ᴍᴇʀᴏ ᴠᴀ́ʟɪᴅᴏ ғᴏɪ ɪɴғᴏʀᴍᴀᴅᴏ*')}
const removidos = []
for (const n of validos) {
const item = repos[n - 1]
if (!item) continue
if (item?.file) {
const oldPath = `${AUTOREPO_MEDIA_DIR}/${item.file}`
try { if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath) } catch (e) { console.error('[erro]', e) }}
removidos.push(item.trigger || `#${n}`)
repos.splice(n - 1, 1)}
saveGroupAutorepo(from, repos)
return reply(`*ᴏᴋ, ᴀᴜᴛᴏʀᴇᴘᴏs ʀᴇᴍᴏᴠɪᴅᴏs ᴄᴏᴍ sᴜᴄᴇssᴏ*\n\n${removidos.map((x, i) => `${i + 1}. ${x}`).join('\n')}`)}
const idx = repos.findIndex(r => normalizeRepoKey(r?.trigger) === entradaNorm)
if (idx < 0) return reply('*ɴᴀ̃ᴏ ᴀᴄʜᴇɪ ᴇssᴇ ᴀᴜᴛᴏʀᴇᴘᴏ*')
const antigo = repos[idx]
if (antigo?.file) {
const oldPath = `${AUTOREPO_MEDIA_DIR}/${antigo.file}`
try { if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath) } catch (e) { console.error('[erro]', e) }}
const nomeRemovido = antigo?.trigger || entrada
repos.splice(idx, 1)
saveGroupAutorepo(from, repos)
reply(`*ᴏᴋ, ᴀᴜᴛᴏʀᴇᴘᴏ ${nomeRemovido} ʀᴇᴍᴏᴠɪᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ*`)
},
};
