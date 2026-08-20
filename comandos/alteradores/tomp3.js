module.exports = {
name: 'tomp3',
aliases: ['tomusica'],
category: 'alteradores',
description: 'Converte um vídeo citado em áudio MP3.',
async execute(ctx) {
const {
reply, prefix, isQuotedVideo, info, downloadContentFromMessage,
fs, exec, kiimorizinha, from, selo,
} = ctx;

if (!isQuotedVideo) return reply(`Marque um vídeo usando ${prefix}tomp3`);
try {
const video = info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage;
const stream = await downloadContentFromMessage(video, 'video');

let buffer = Buffer.from([]);
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}

const file = Date.now();
const input = `./${file}.mp4`;
const output = `./${file}.mp3`;

fs.writeFileSync(input, buffer);

exec(`ffmpeg -i "${input}" -vn -ab 128k -ar 44100 "${output}" -y`, async (err) => {

if (fs.existsSync(input)) fs.unlinkSync(input);

if (err) {
if (fs.existsSync(output)) fs.unlinkSync(output);
return reply('Erro ao converter o vídeo para MP3.');
}

await kiimorizinha.sendMessage(
from,
{
audio: fs.readFileSync(output),
mimetype: 'audio/mpeg',
ptt: false
},
{ quoted: selo }
);

if (fs.existsSync(output)) fs.unlinkSync(output);

});

} catch (e) {
console.log(e);
reply('Ocorreu um erro ao converter o vídeo.');
}
},
};
