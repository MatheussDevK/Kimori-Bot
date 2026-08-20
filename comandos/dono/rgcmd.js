const { registrarNoPrefix } = require('../../arquivos/funcoes/command.js');

module.exports = {
name: 'rgcmd',
category: 'dono',
description: 'Registra um gatilho customizado (sem prefixo) apontando pra um comando real, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, q } = ctx;

try {
if (!SoDono) return reply(mess.onlyOwner())
if (!q) return reply('*ᴜꜱᴇ: rgcmd [ɢᴀᴛɪʟʜᴏ] | [ᴄᴏᴍᴀɴᴅᴏ ʀᴇᴀʟ] 🙅‍♂️*')
const texto = q.trim()
let semPrefixo = ''
let comandoReal = ''
if (texto.includes('|')) {
const partes = texto.split('|').map(x => x.trim()).filter(Boolean)
semPrefixo = partes[0] || ''
comandoReal = partes.slice(1).join(' ') || ''}
else if (texto.includes('/')) {
const partes = texto.split('/').map(x => x.trim()).filter(Boolean)
semPrefixo = partes[0] || ''
comandoReal = partes.slice(1).join(' ') || ''}
else {
const partes = texto.split(/\s+/)
semPrefixo = partes.shift() || ''
comandoReal = partes.join(' ')}
if (!semPrefixo || !comandoReal)
return reply('*ᴜꜱᴇ: rgcmd [ɢᴀᴛɪʟʜᴏ] | [ᴄᴏᴍᴀɴᴅᴏ ʀᴇᴀʟ] 🙅‍♂️*')
semPrefixo = semPrefixo.replace(/\s+/g, ' ').trim()
comandoReal = comandoReal.replace(/\s+/g, ' ').trim()
registrarNoPrefix(
semPrefixo.toLowerCase(),
comandoReal.toLowerCase())
reply(
`*ʀᴇɢɪꜱᴛʀᴇɪ ᴏ ᴄᴏᴍᴀɴᴅᴏ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ *\n\n` +
`- *🗿 | ꜱᴇᴍ ᴘʀᴇꜰɪxᴏ:* ${semPrefixo}\n` +
`- *⚙️ | ᴄᴏᴍᴀɴᴅᴏ ʀᴇᴀʟ:* ${comandoReal}`)
} catch (e) {
console.log(e)
reply(mess.error())}
},
};
