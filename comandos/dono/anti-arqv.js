const fs = require('fs');

module.exports = {
name: 'anti-arqv',
category: 'dono',
description: 'Liga/desliga o modo antirroubo (proteção contra sequestro de grupo), apenas dono.',
async execute(ctx) {
const { reply, mess, isGroup, SoDono, from } = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!SoDono) return reply(mess.onlyOwner())
const pathAtiv = `./database/grupos/ATIVAÇÕES-GRUPO/${from}.json`
if (!fs.existsSync(pathAtiv)) {
fs.writeFileSync(pathAtiv, JSON.stringify([{}], null, 2))}
let data = []
try {
data = JSON.parse(fs.readFileSync(pathAtiv))
if (!Array.isArray(data)) data = [data]
if (!data[0]) data[0] = {}
} catch {
data = [{}]}
data[0].antiroubo = !data[0].antiroubo
if (!Array.isArray(data[0].ar_permitidos)) data[0].ar_permitidos = []
if (!Array.isArray(data[0].ar_permitidos_lid)) data[0].ar_permitidos_lid = []
fs.writeFileSync(pathAtiv, JSON.stringify(data, null, 2))
reply(data[0].antiroubo ? '*ᴀɴᴛɪʀᴏᴜʙᴏ ᴀᴛɪᴠᴀᴅᴏ *\n> use `donogp + @ do user`' : '*ᴀɴᴛɪʀᴏᴜʙᴏ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ 🙅‍♂️*')
},
};
