module.exports = {
name: 'antispam',
category: 'admin',
description: 'Configura o antispam do grupo (limite/tempo por tipo de mídia: figu, texto, foto, video).',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, isBotGroupAdmins, q, prefix, command, dataGp, setGp } = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
const cfg = dataGp[0].antispam || {
active: false,
figu: { limite: 6, tempo: 10 },
texto: { limite: 8, tempo: 8 },
foto: { limite: 4, tempo: 10 },
video: { limite: 3, tempo: 15 }
}

cfg.figu = cfg.figu || { limite: 6, tempo: 10 }
cfg.texto = cfg.texto || { limite: 8, tempo: 8 }
cfg.foto = cfg.foto || { limite: 4, tempo: 10 }
cfg.video = cfg.video || { limite: 3, tempo: 15 }

if (!q) {
const st = cfg.active ? '✅' : '❌'
return reply(
`ᴀɴᴛɪsᴘᴀᴍ: ${st}

ғɪɢᴜʀɪɴʜᴀs: ${cfg.figu.limite} / ${cfg.figu.tempo}s
ᴛᴇxᴛᴏ: ${cfg.texto.limite} / ${cfg.texto.tempo}s
ғᴏᴛᴏ: ${cfg.foto.limite} / ${cfg.foto.tempo}s
ᴠɪᴅᴇᴏ: ${cfg.video.limite} / ${cfg.video.tempo}s

Use:
${prefix + command} on
${prefix + command} off

${prefix + command} figu limite 6
${prefix + command} figu tempo 10
${prefix + command} figu set 6 10

${prefix + command} texto limite 8
${prefix + command} texto tempo 8
${prefix + command} texto set 8 8

${prefix + command} foto limite 4
${prefix + command} foto tempo 10
${prefix + command} foto set 4 10

${prefix + command} video limite 3
${prefix + command} video tempo 15
${prefix + command} video set 3 15`
)
}

const args2 = q.trim().split(/\s+/)

if (args2[0] === 'on' || args2[0] === 'ativar') {
if (cfg.active === true) return reply(`*ᴏ ᴀɴᴛɪsᴘᴀᴍ ᴊᴀ ᴇsᴛᴀ ᴀᴛɪᴠᴀᴅᴏ ✅*`)
dataGp[0].antispam = { ...cfg, active: true }
setGp(dataGp)
return reply(`*ᴏ ᴀɴᴛɪsᴘᴀᴍ ғᴏɪ ᴀᴛɪᴠᴀᴅᴏ ✅*`)
}

if (args2[0] === 'off' || args2[0] === 'desativar') {
if (cfg.active === false) return reply(`*ᴏ ᴀɴᴛɪsᴘᴀᴍ ᴊᴀ ᴇsᴛᴀ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ❌*`)
dataGp[0].antispam = { ...cfg, active: false }
setGp(dataGp)
return reply(`*ᴏ ᴀɴᴛɪsᴘᴀᴍ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ❌*`)
}

const alvo =
(args2[0] === 'figu' || args2[0] === 'figurinha') ? 'figu' :
(args2[0] === 'texto' || args2[0] === 'msg' || args2[0] === 'mensagem') ? 'texto' :
(args2[0] === 'foto' || args2[0] === 'image' || args2[0] === 'imagem') ? 'foto' :
(args2[0] === 'video' || args2[0] === 'vídeo') ? 'video' :
null

if (!alvo) {
return reply(
`Use:
${prefix + command} on/off
${prefix + command} figu limite 6
${prefix + command} figu tempo 10
${prefix + command} figu set 6 10
${prefix + command} texto limite 8
${prefix + command} texto tempo 8
${prefix + command} texto set 8 8
${prefix + command} foto limite 4
${prefix + command} foto tempo 10
${prefix + command} foto set 4 10
${prefix + command} video limite 3
${prefix + command} video tempo 15
${prefix + command} video set 3 15`
)
}

if (args2[1] === 'set') {
const lim = parseInt(args2[2])
const tmp = parseInt(args2[3])
if (!lim || lim < 2) return reply(`Use: ${prefix + command} ${alvo} set 6 10`)
if (!tmp || tmp < 3) return reply(`Use: ${prefix + command} ${alvo} set 6 10`)

dataGp[0].antispam = { ...cfg, active: true, [alvo]: { ...cfg[alvo], limite: lim, tempo: tmp } }
setGp(dataGp)
return reply(`*ᴀᴛɪᴠᴀᴅᴏ ✅*\n*${alvo}:* ${lim} / ${tmp}s`)

}

if (args2[1] === 'limite') {
const lim = parseInt(args2[2])
if (!lim || lim < 2) return reply(`Use: ${prefix + command} ${alvo} limite 6`)
dataGp[0].antispam = { ...cfg, [alvo]: { ...cfg[alvo], limite: lim } }
setGp(dataGp)
return reply(`*ʟɪᴍɪᴛᴇ (${alvo}) ᴀᴛᴜᴀʟɪᴢᴀᴅᴏ ᴘᴀʀᴀ:* ${lim}`)
}

if (args2[1] === 'tempo') {
const tmp = parseInt(args2[2])
if (!tmp || tmp < 3) return reply(`Use: ${prefix + command} ${alvo} tempo 10`)
dataGp[0].antispam = { ...cfg, [alvo]: { ...cfg[alvo], tempo: tmp } }
setGp(dataGp)
return reply(`*ᴛᴇᴍᴘᴏ (${alvo}) ᴀᴛᴜᴀʟɪᴢᴀᴅᴏ ᴘᴀʀᴀ:* ${tmp}s`)
}

return reply(
`Use:
${prefix + command} on/off
${prefix + command} ${alvo} limite 6
${prefix + command} ${alvo} tempo 10
${prefix + command} ${alvo} set 6 10`
)
},
};
