module.exports = {
name: 'giftomp4',
category: 'alteradores',
description: 'Converte um GIF citado em vídeo MP4.',
async execute(ctx) {
const {
reply, prefix, isQuotedGif, info, downloadContentFromMessage,
fs, exec, kiimorizinha, from, selo,
} = ctx;

if (!isQuotedGif) return reply(`Marque um GIF usando ${prefix}giftomp4`);
try {
const gif = info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage;
const stream = await downloadContentFromMessage(gif, 'video');
let buffer = Buffer.from([]);
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}
const file = Date.now();
const input = `./${file}.gif`;
const output = `./${file}.mp4`;
fs.writeFileSync(input, buffer);
exec(
`ffmpeg -i "${input}" -movflags +faststart -pix_fmt yuv420p -vf "fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2:flags=lanczos" "${output}" -y`,
async (err) => {
if (fs.existsSync(input)) fs.unlinkSync(input);

if (err) {
if (fs.existsSync(output)) fs.unlinkSync(output);
return reply('Erro ao converter o GIF.');
}
await kiimorizinha.sendMessage(
from,
{
video: fs.readFileSync(output),
mimetype: 'video/mp4'
},
{ quoted: selo }
);
if (fs.existsSync(output)) fs.unlinkSync(output);
}
);
} catch (e) {
console.log(e);
reply('Ocorreu um erro ao converter o GIF.');
}
},
};
