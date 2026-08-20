const fs = require('fs');

module.exports = {
name: 'gtts',
category: 'geral',
description: 'Converte texto em áudio falado (text-to-speech), no idioma informado.',
async execute(ctx) {
const {
reply, args, body, prefix, kiimorizinha, from, selo, getRandom, exec,
DLT_FL, ChannelContextNewsLetter, mess,
} = ctx;

try {
if (args.length < 1) return await kiimorizinha.sendMessage(from,{text: `Cade o texto?, digite algo Exemplo:\n${prefix}gtts PT Oi`}, {quoted: selo})
const gtts = require('../../arquivos/funcoes/gtts.js')(args[0])
if (args.length < 2) return await kiimorizinha.sendMessage(from, {text: 'Falta colocar o código do idioma!'}, {quoted: selo})
const dtt = body.slice(8)
const ranm = getRandom('.mp3')
const rano = getRandom('.ogg')
if(dtt.length > 2000) return reply('Para reduzir spam o máximo de letras permitidas são 2000!')
gtts.save(ranm, dtt, async function() {
await exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, async(err) => {
await kiimorizinha.sendMessage(from, {audio: fs.readFileSync(ranm), mimetype: 'audio/mpeg', ptt:false, contextInfo: ChannelContextNewsLetter}, {quoted: selo}).catch(async(error) => {
return reply(mess.error())})
DLT_FL(ranm); DLT_FL(rano)})})
} catch(error) {
console.log(error)
return reply(mess.error())}
},
};
