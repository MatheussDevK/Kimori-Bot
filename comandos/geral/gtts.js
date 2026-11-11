import fs from 'node:fs';
import __gtts from '../../arquivos/funcoes/gtts.js';
import { caminhoTemp } from '../../arquivos/funcoes/midiaTemp.js';

export default {
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
if (args.length < 2) return await kiimorizinha.sendMessage(from, {text: 'Falta colocar o código do idioma!'}, {quoted: selo})
const gtts = __gtts(args[0])
// texto = tudo depois do idioma (antes usava body.slice(8), que quebrava com outro prefixo)
const dtt = args.slice(1).join(' ')
if(dtt.length > 2000) return reply('Para reduzir spam o máximo de letras permitidas são 2000!')
const ranm = caminhoTemp('.mp3') // antes ia para a raiz do bot
await gtts.save(ranm, dtt, async (err) => {
try {
if (err || !fs.existsSync(ranm)) return reply(mess.error())
await kiimorizinha.sendMessage(from, {audio: fs.readFileSync(ranm), mimetype: 'audio/mpeg', ptt:false, contextInfo: ChannelContextNewsLetter}, {quoted: selo})
} catch (e) {
console.log('[GTTS]', e?.message || e)
reply(mess.error())
} finally {
DLT_FL(ranm)
}
})
} catch(error) {
console.log(error)
return reply(mess.error())}
},
};
