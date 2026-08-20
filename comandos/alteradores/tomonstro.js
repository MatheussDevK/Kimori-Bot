module.exports = {
name: 'tomonstro',
category: 'alteradores',
description: 'Converte um áudio citado em voz de monstro (pitch baixo).',
async execute(ctx) {
const {
reply, prefix, isQuotedAudio, info, downloadContentFromMessage,
fs, exec, kiimorizinha, from, selo,
} = ctx;

if (!isQuotedAudio) return reply(`Marque um áudio usando ${prefix}tomonstro`);
try {
const audio = info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.audioMessage;
const stream = await downloadContentFromMessage(audio, 'audio');
let buffer = Buffer.from([]);
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}
const file = Date.now();
const input = `./${file}_in.ogg`;
const output = `./${file}_out.ogg`;
fs.writeFileSync(input, buffer);
exec(`ffmpeg -i "${input}" -filter:a "asetrate=44100*0.65,aresample=44100,atempo=1.1,bass=g=18,acompressor,volume=1.5" -c:a libopus "${output}" -y`, async (err) => {
if (fs.existsSync(input)) fs.unlinkSync(input);
if (err) {
if (fs.existsSync(output)) fs.unlinkSync(output);
return reply('Erro ao transformar a voz em monstro.');
}
await kiimorizinha.sendMessage(
from,
{
audio: fs.readFileSync(output),
mimetype: 'audio/ogg; codecs=opus',
ptt: true
},
{ quoted: selo }
);
if (fs.existsSync(output)) fs.unlinkSync(output);
});
} catch (e) {
console.log(e);
reply(`Erro: ${e.message || e}`);
}
},
};
