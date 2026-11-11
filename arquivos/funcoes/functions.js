import fetch from 'node-fetch';
import fs from 'node:fs';
import axios from 'axios';
import Crypto from 'node:crypto';
import chalk from 'chalk';
import { execFile } from 'node:child_process';
import mimetype from 'mime-types';
import FormData from 'form-data';
import __file_type from 'file-type';
import webp from 'node-webpmux';
import crypto from 'node:crypto';
import path from 'node:path';
import os from 'node:os';
import { loadJSON } from './jsonCache.js';

const log = console.debug;

// file-type@16 é a última versão com require(); a v17+ é só ESM
const { fromBuffer: fileTypeFromBuffer } = __file_type;

// lista os chats privados (antes usava variáveis globais pc/a/b)
const getpc = async function(totalchat){
return (totalchat || []).map(c => c?.id).filter(d => d && !d.includes('g.us'));
};

// Upload para a OrbitalApis (POST /api/upload): link permanente em /api/uploads/<id>.<ext>.
// URL e apikey vêm do config.json (as mesmas de todo o bot). Cada upload custa 10 requests na key.
const configUpload = loadJSON(new URL('../../config-bot/config.json', import.meta.url));

async function upload(midia, nome) {
// Buffer já é o arquivo (atenção: Buffer.buffer é a memória compartilhada inteira do Node, não o
// arquivo — a versão antiga usava midia.buffer e mandava lixo junto em arquivos pequenos)
const raw = Buffer.isBuffer(midia) ? midia : (midia?.buffer && !(midia instanceof ArrayBuffer) ? midia.buffer : midia);
const buffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);
if (!buffer.length) throw new Error('arquivo vazio');

let ext = 'bin';
try {
const tipo = await fileTypeFromBuffer(buffer);
if (tipo?.ext) ext = tipo.ext;
} catch {}

const base = String(configUpload.API_KIMORI_URL || '').replace(/\/+$/, '');
const key = configUpload.APIKEY_KIMORI;
if (!base || !key) throw new Error('API_KIMORI_URL / APIKEY_KIMORI não configurados no config.json');

const form = new FormData();
form.append('file', buffer, { filename: nome || `arquivo.${ext}` });
const res = await axios.post(`${base}/api/upload?apikey=${encodeURIComponent(key)}`, form, {
headers: form.getHeaders(),
timeout: 180000,
maxContentLength: Infinity,
maxBodyLength: Infinity,
validateStatus: () => true,
});
const d = res.data && typeof res.data === 'object' ? res.data : {};
if (res.status < 400 && d.success && d.url) return d.url;
// mensagem da API ("Requests insuficientes", "Formato não suportado"...) vai direto pro usuário
const e = d.error || d.message || `a API respondeu ${res.status}`;
const m = d.message && d.message !== d.error ? `: ${d.message}` : '';
throw new Error(`Upload falhou — ${e}${m}`);
}

async function convertSticker(webpSticker, author, packname, categories = [''], extra = {}) {
try {
const img = new webp.Image();
const json = {
'sticker-pack-id': crypto.randomBytes(32).toString('hex'),
'sticker-pack-name': packname,
'sticker-pack-publisher': author,
'emojis': categories,
...extra
};
const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
const exif = Buffer.concat([exifAttr, jsonBuffer]);
exif.writeUIntLE(jsonBuffer.length, 14, 4);
const bufferSticker = Buffer.from(String(webpSticker).replace(/^data:image\/\w+;base64,/, ''), 'base64');
await img.load(bufferSticker);
img.exif = exif;
return await img.save(null);
} catch (err) {
throw new Error("Erro ao processar a figurinha: " + err.message);
}
}

// Foto/vídeo do menu em cache por mtime (antes lia o arquivo do disco a cada menu)
const cacheMidia = new Map()
function lerMidiaCache(arquivo) {
let mtime
try { mtime = fs.statSync(arquivo).mtimeMs } catch { cacheMidia.delete(arquivo); return null }
const c = cacheMidia.get(arquivo)
if (c && c.mtime === mtime) return c.data
const data = fs.readFileSync(arquivo)
cacheMidia.set(arquivo, { mtime, data })
return data
}

function carregarMidia(customName = "fotomenu") {
const pasta = './config-bot/logos'
// imagem tem prioridade (o menu agora é com foto, não com gif)
// "caminho" permite mandar por { url } e aproveitar o cache de upload do Baileys
for (const ext of ['png', 'jpg']) {
const caminho = `${pasta}/${customName}.${ext}`
const image = lerMidiaCache(caminho)
if (image) return { type: "image", data: image, caminho }
}
const caminhoVideo = `${pasta}/${customName}.mp4`
const video = lerMidiaCache(caminhoVideo)
if (video) return { type: "video", data: video, caminho: caminhoVideo }
return { type: "text" }
}

const fetchJson = (url, options) => fetch(url, options).then(response => response.json())

const fetchText = (url, options) => fetch(url, options).then(response => response.text())

const createExif = (pack, auth) =>{
const code = [0x00,0x00,0x16,0x00,0x00,0x00]
const exif = {"sticker-pack-id": "com.client.tech", "sticker-pack-name": pack, "sticker-pack-publisher": auth, "android-app-store-link": "https://play.google.com/store/apps/details?id=com.termux", "ios-app-store-link": "https://itunes.apple.com/app/sticker-maker-studio/id1443326857"}
let len = JSON.stringify(exif).length
if (len > 256) {
len = len - 256
code.unshift(0x01)
} else {
code.unshift(0x00)}
if(len < 16) {
len = len.toString(16)
len = "0" + len
} else {
len = len.toString(16)}
const _ = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]);
const __ = Buffer.from(len, "hex")
const ___ = Buffer.from(code)
const ____ = Buffer.from(JSON.stringify(exif))
fs.writeFileSync('./arquivos/sticker/data.exif', Buffer.concat([_, __, ___, ____]), function (err) {
console.log(err)
if (err) return console.error(err)
return `./arquivos/sticker/data.exif`})
}

const getBuffer = async (url, opcoes) => {
try {
opcoes = opcoes || {}
const post = await axios({
method: "get",
url,
headers: {
'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36',
'DNT': 1,
'Upgrade-Insecure-Request': 1},
...opcoes,
responseType: 'arraybuffer'})
return post.data
} catch (erro) {
console.log(`Erro identificado: ${erro}`)}
}

const randomBytes = (length) => {
return Crypto.randomBytes(length);
};

const generateMessageID = () => {
return randomBytes(10).toString('hex').toUpperCase();
};

const getExtension = async (type) => {
return await mimetype.extension(type)
}

function normalizeJid(jid) {
if (!jid) return null;
let id = String(jid).trim();
id = id.replace(/:.*(?=@)/, '');
if (!id.includes('@')) {
const numeros = id.replace(/\D/g, '');
return numeros ? numeros + '@s.whatsapp.net' : null;
}
return id;
}

function getGroupAdmins(participants) {
return participants
.filter(p => p.admin === "admin" || p.admin === "superadmin")
.map(p => {
const rawJid = p.id || p.participant || p.jid;
if (!rawJid) return null;
return normalizeJid(rawJid);
})
.filter(Boolean);
}

function getMembros(participants) {
return participants
.filter(p => !p.admin)
.map(p => {
const rawJid = p.id || p.participant || p.jid;
if (!rawJid) return null;
return normalizeJid(rawJid);
})
.filter(Boolean);
}

// nomes únicos (antes só 10.000 possibilidades: arquivos temporários colidiam com uso simultâneo)
const getRandom = (ext) => {
return `${Date.now()}_${Crypto.randomBytes(4).toString('hex')}${ext}`;
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const banner2 = `
                 By: Matheus +55 38 99116-4328
`;

const banner3 = `
            ██╗  ██╗██╗███╗   ███╗ ██████╗ ██████╗ ██╗
            ██║ ██╔╝██║████╗ ████║██╔═══██╗██╔══██╗██║
            █████╔╝ ██║██╔████╔██║██║   ██║██████╔╝██║
            ██╔═██╗ ██║██║╚██╔╝██║██║   ██║██╔══██╗██║
            ██║  ██╗██║██║ ╚═╝ ██║╚██████╔╝██║  ██║██║
            ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝
`;

function temporizador(totalSegundos){
function tempo(s){
return (s < 10 ? '0' : '') + s;
}
var horas = Math.floor(totalSegundos / (60*60));
var minutos = Math.floor(totalSegundos % (60*60) / 60);
var segundos = Math.floor(totalSegundos % 60);
return `${tempo(horas)}:${tempo(minutos)}:${tempo(segundos)}`;
}

const color = (text, color) => {
return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

// execFile com lista de argumentos: o nome do arquivo não passa mais pelo shell
function recognize(filename, config = {}) {
const options = getOptions(config)
const binary = config.binary || "tesseract"
if (config.debug) log("command", binary, filename, options.join(' '))
return new Promise((resolve, reject) => {
execFile(binary, [String(filename), "stdout", ...options], (error, stdout, stderr) => {
if(config.debug) log(stderr)
if(error) return reject(error)
resolve(stdout)
})
})
}

function getOptions(config) {
const ocrOptions = ["tessdata-dir", "user-words", "user-patterns", "psm", "oem", "dpi"]
const args = []
for (const [key, value] of Object.entries(config)) {
if (["debug", "presets", "binary"].includes(key)) continue
if (key === "lang") args.push('-l', String(value))
else if (ocrOptions.includes(key)) args.push(`--${key}`, String(value))
else args.push('-c', `${key}=${value}`)
}
return args.concat(config.presets || []).filter(Boolean)
}

// Os IDs fixos com acesso de dono (chyt/nit/supre) foram removidos daqui.
// Para ter donos extras, use "superDonos" no config-bot/config.json.

const usedCommandRecently = new Set()
const isFiltered = (from) => !!usedCommandRecently.has(from)
const addFilter = (from) => {
usedCommandRecently.add(from)
setTimeout(() => usedCommandRecently.delete(from), 5000)}

export default { getBuffer, fetchJson, fetchText, fetch, generateMessageID, getGroupAdmins, normalizeJid, getMembros, getRandom, sleep, banner2, temporizador, color, recognize, bgcolor, isFiltered, addFilter, banner3, getExtension, convertSticker, upload, getpc, carregarMidia, createExif }

export { getBuffer, fetchJson, fetchText, fetch, generateMessageID, getGroupAdmins, normalizeJid, getMembros, getRandom, sleep, banner2, temporizador, color, recognize, bgcolor, isFiltered, addFilter, banner3, getExtension, convertSticker, upload, getpc, carregarMidia, createExif };
