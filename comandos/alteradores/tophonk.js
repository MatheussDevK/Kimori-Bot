module.exports = {
name: 'tophonk',
category: 'alteradores',
description: 'Converte um áudio citado em versão "phonk" (bass boost + distorção).',
async execute(ctx) {
const {
reply, prefix, isQuotedAudio, info, downloadContentFromMessage,
fs, exec, kiimorizinha, from, selo,
} = ctx;

if (!isQuotedAudio) return reply(`Marque um áudio usando ${prefix}tophonk`);
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
exec(`ffmpeg -i "${input}" -af "bass=g=12,acompressor,acrusher=bits=8:mode=log,volume=1.5,aecho=0.8:0.9:1000:0.3" -c:a libopus "${output}" -y`, async (err) => {
if (fs.existsSync(input)) fs.unlinkSync(input);
if (err) {
if (fs.existsSync(output)) fs.unlinkSync(output);
return reply('Erro ao transformar o áudio em phonk.');
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
