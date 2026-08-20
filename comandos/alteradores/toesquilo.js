module.exports = {
name: 'toesquilo',
category: 'alteradores',
description: 'Converte um áudio citado em voz de esquilo (pitch alto).',
async execute(ctx) {
const {
reply, prefix, isQuotedAudio, info, downloadContentFromMessage,
fs, exec, kiimorizinha, from, selo,
} = ctx;

if (!isQuotedAudio) return reply(`Marque um áudio usando ${prefix}toesquilo`);
try {
const audio = info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.audioMessage;
const stream = await downloadContentFromMessage(audio, 'audio');
let buffer = Buffer.from([]);
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}
const file = Date.now();
const input = `./${file}.ogg`;
const output = `./${file}.ogg`;
fs.writeFileSync(input, buffer);
exec(`ffmpeg -i "${input}" -filter:a "asetrate=44100*1.6,aresample=44100,atempo=0.9" -c:a libopus "${output}" -y`, async (err) => {
if (fs.existsSync(input)) fs.unlinkSync(input);
if (err) {
if (fs.existsSync(output)) fs.unlinkSync(output);
return reply('Erro ao converter o áudio.');
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
reply('Ocorreu um erro ao converter o áudio.');
}
},
};
