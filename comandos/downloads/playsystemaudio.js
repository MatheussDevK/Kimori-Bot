const { fetch } = require('../../arquivos/funcoes/functions.js');
const { API_KIMORI_URL, APIKEY_KIMORI } = require('../../config-bot/config.json');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

function converterParaM4A(inputBuffer) {
return new Promise((resolve, reject) => {
const id = crypto.randomBytes(8).toString('hex');

const input = path.join(`ytaudio_${id}.mp3`);
const output = path.join(`ytaudio_${id}.m4a`);

fs.writeFileSync(input, inputBuffer);

const ffmpeg = spawn('ffmpeg', [
'-y',
'-i', input,
'-c:a', 'aac',
'-b:a', '128k',
'-ar', '44100',
'-ac', '2',
'-movflags', '+faststart',
output
]);

let stderr = '';

ffmpeg.stderr.on('data', data => {
stderr += data.toString();
});

ffmpeg.on('error', err => {
try {
fs.unlinkSync(input);
} catch {}

reject(err);
});

ffmpeg.on('close', code => {
try {
fs.unlinkSync(input);
} catch {}

if (code !== 0) {
try {
fs.unlinkSync(output);
} catch {}

return reject(
new Error(`FFmpeg falhou (${code}): ${stderr}`)
);
}

try {
const buffer = fs.readFileSync(output);
fs.unlinkSync(output);

resolve(buffer);
} catch (err) {
reject(err);
}
});
});
}

module.exports = {
name: 'systemaudio',
category: 'downloads',
description: 'Baixa o áudio de um vídeo do YouTube.',

async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, ErroCase, botNome } = ctx;

if (!q?.trim()) {return reply(`cracked`); }

try {
const url = `${API_KIMORI_URL}/api/dl/ytaudio1?url=https://youtu.be/${encodeURIComponent(q.trim())}&apikey=${APIKEY_KIMORI}`;

const response = await fetch(url);

if (!response.ok) {
return reply(`Erro: ${response.status}`);
}

const buffer = await response.buffer();

if (!buffer || !buffer.length) {
return reply('A API não retornou um áudio válido.');
}
const audio = await converterParaM4A(buffer);

await kiimorizinha.sendMessage(from, {audio, mimetype: 'audio/mp4', fileName: 'youtube_audio.m4a', ptt: false }, { quoted: selo } );

} catch (e) {
console.error('[YTAUDIO1]', e);
await ErroCase(e, prefix, command, botNome);
}
}
};