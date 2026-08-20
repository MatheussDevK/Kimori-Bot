const { idade } = require('../../config-bot/logos/links_img.json');

module.exports = {
name: 'idade',
category: 'geral',
description: 'Calcula idade exata (anos, meses, dias) a partir de uma data de nascimento.',
async execute(ctx) {
const {
reply, q, prefix, mess, kiimorizinha, from, selo,
botNome: NomeDoBot, ChannelContextNewsLetter,
} = ctx;

if (!q) return reply(`- Exemplo: ${prefix}idade 23/12/2007`)
try {
let txt;
const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/
if (!regexData.test(q)) return reply(`- Exemplo: ${prefix}idade 23/12/2007`)
const [dia, mes, ano] = q.split('/').map(Number)
const dataNascimento = new Date(ano, mes - 1, dia)
const hoje = new Date()
if (dataNascimento > hoje || isNaN(dataNascimento)) {
return reply(`*ᴄᴏʟᴏǫᴜᴇ ᴅᴀ ғᴏʀᴍᴀ ᴄᴇʀᴛᴀ ʙᴀɪᴛᴏʟᴀ 😡*`)}
const diffMs = hoje - dataNascimento
const idadeData = new Date(diffMs)
const anos = idadeData.getUTCFullYear() - 1970
const meses = idadeData.getUTCMonth()
const dias = idadeData.getUTCDate() - 1
const diasVividos = Math.floor(diffMs / (1000 * 60 * 60 * 24))
const horasVividas = diasVividos * 24
const minutosVividos = horasVividas * 60
const proximoAniversario = new Date(hoje.getFullYear(), mes - 1, dia)
if (proximoAniversario <= hoje) proximoAniversario.setFullYear(hoje.getFullYear() + 1)
const diasParaAniversario = Math.ceil((proximoAniversario - hoje) / (1000 * 60 * 60 * 24))
txt = mess.idade(q, anos, meses, dias, diasVividos, horasVividas, minutosVividos, diasParaAniversario, NomeDoBot).trim()
kiimorizinha.sendMessage(from, {video: {url: idade}, gifPlayback: true, caption: txt, contextInfo:{...ChannelContextNewsLetter}}, {quoted: selo})
} catch (e) {
console.log(e)}
},
};
