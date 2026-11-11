import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFile } from 'node:child_process';
import { pastaTemp } from '../../arquivos/funcoes/midiaTemp.js';

export default {
name: 'fotomenu',
aliases: ['fundomenu'],
category: 'dono',
description: 'Define a imagem/vídeo de fundo do menu principal, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, info, reagir, from, getFileBuffer } = ctx;

if (!SoDono) return reply(mess.onlyOwner());
const msg = info.message?.extendedTextMessage?.contextInfo?.quotedMessage || info.message || {};
const v = msg.videoMessage || msg.viewOnceMessage?.message?.videoMessage || msg.viewOnceMessageV2?.message?.videoMessage;
const i = msg.imageMessage || msg.viewOnceMessage?.message?.imageMessage || msg.viewOnceMessageV2?.message?.imageMessage;
const pastaLogos = './config-bot/logos';
if (!fs.existsSync(pastaLogos)) fs.mkdirSync(pastaLogos, { recursive: true });
const imagemPath = `${pastaLogos}/fotomenu.png`;
const videoPath = `${pastaLogos}/fotomenu.mp4`;
if (v) {
// o menu agora é sempre com imagem: pega um quadro do vídeo (precisa de ffmpeg)
reagir(from, "⏳");
const buffer = await getFileBuffer(v, 'video');
const tmp = path.join(pastaTemp(), `fotomenu_${Date.now()}.mp4`);
fs.writeFileSync(tmp, buffer);
try {
await new Promise((ok, falha) => execFile('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '1', '-i', tmp, '-frames:v', '1', imagemPath], e => e ? falha(e) : ok()));
} catch {
return reply('*ɴᴀ̃ᴏ ᴄᴏɴꜱᴇɢᴜɪ ᴛɪʀᴀʀ ᴜᴍᴀ ɪᴍᴀɢᴇᴍ ᴅᴏ ᴠɪ́ᴅᴇᴏ. ᴍᴀɴᴅᴇ ᴜᴍᴀ ꜰᴏᴛᴏ.*');
} finally {
try { fs.unlinkSync(tmp); } catch {}
}
if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
global.__kimoriMediaCache?.flushAll?.(); // imagem nova: descarta o upload antigo guardado
reagir(from, "✅");
return reply('*ɪᴍᴀɢᴇᴍ ᴅᴏ ᴍᴇɴᴜ ᴀᴛᴜᴀʟɪᴢᴀᴅᴀ (ᴛɪʀᴇɪ ᴜᴍ Qᴜᴀᴅʀᴏ ᴅᴏ ᴠɪ́ᴅᴇᴏ)*');
}
if (i) {
reagir(from, "⏳");
const buffer = await getFileBuffer(i, 'image');
if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
fs.writeFileSync(imagemPath, buffer);
global.__kimoriMediaCache?.flushAll?.(); // imagem nova: descarta o upload antigo guardado
reagir(from, "✅");
return reply('*ᴍɪᴅɪᴀ ꜱᴀʟᴠᴀ ʟᴏᴄᴀʟᴍᴇɴᴛᴇ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ *');
}
reply('*ᴇɪ ᴍᴇsᴛʀᴇ, ᴍᴀɴᴅᴇ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴜᴍᴀ ɪᴍᴀɢᴇᴍ ᴘʀᴀ ᴍɪᴍ ᴍᴜᴅᴀʀ ᴏ ᴍᴇɴᴜ*');
},
};
