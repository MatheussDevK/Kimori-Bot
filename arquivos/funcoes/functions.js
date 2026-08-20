const fetch = require('node-fetch');
const fs = require('fs');
const axios = require('axios');
const Crypto = require('crypto');
const chalk = require('chalk');
const exec = require("child_process").exec;
const log = console.debug;
const mimetype = require('mime-types');
const cheerio = require('cheerio');
const { spawn } = require("child_process");
const ff = require('fluent-ffmpeg');
const FormData = require('form-data');
const qs = require('qs');
const { fileTypeFromBuffer } = require('file-type');
const toMs = require('ms');
const ffmpeg = require('fluent-ffmpeg');
const moment = require('moment-timezone');
const webp = require("node-webpmux");
const crypto = require("crypto");
const path = require("path");
const os = require("os");

var corzinhas = ["red", "green", "yellow", "blue","magenta", "cyan", "", "gray", "redBright","greenBright", "yellowBright", "blueBright", "magentaBright", "cyanBright", "whiteBright"];
const cor1 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];
const cor2 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];
const cor3 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];
const cor4 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];
const cor5 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];

const ceemde = JSON.parse(fs.readFileSync('./database/data/totalcmd.json'));

const getpc = async function(totalchat){
pc = [];
a = [];
b = [];
for (var c of totalchat){
a.push(c.id);
}
for (var d of a){
if (d && !d.includes('g.us')){
b.push(d);
}
}
return b;
};

const UPLOAD_API_URL = `https://kimoriapis.orbitalcode.online/api/upload`;
const UPLOAD_API_KEY = null;

async function upload(midia) {
const raw = midia.buffer || midia;
const buffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);

let ext = 'png';
try {
const tipo = await fileTypeFromBuffer(buffer);
if (tipo?.ext) ext = tipo.ext;
} catch {}

const tmpfile = path.join(os.tmpdir(), `upload_${Date.now()}.${ext}`);
fs.writeFileSync(tmpfile, buffer);

try {
const form = new FormData();
form.append('source', fs.createReadStream(tmpfile), { filename: `file.${ext}` });

const headers = form.getHeaders();
if (UPLOAD_API_KEY) headers['x-api-key'] = UPLOAD_API_KEY;

const res = await axios.post(UPLOAD_API_URL, form, {
headers,
timeout: 30000,
maxContentLength: Infinity,
maxBodyLength: Infinity
});

if (res.data?.success && res.data?.url) return res.data.url;
throw new Error(`Upload failed: ${JSON.stringify(res.data)}`);
} finally {
try { fs.unlinkSync(tmpfile); } catch {}
}
}

function convertSticker(webpSticker, author, packname, categories = [''], extra = {}) {
return new Promise(async (resolve, reject) => {
try {
const img = new webp.Image();
const stickerPackId = crypto.randomBytes(32).toString('hex');
const json = {
'sticker-pack-id': stickerPackId,
'sticker-pack-name': packname,
'sticker-pack-publisher': author,
'emojis': categories,
...extra
};

const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
const exif = Buffer.concat([exifAttr, jsonBuffer]);

exif.writeUIntLE(jsonBuffer.length, 14, 4);

const bufferSticker = Buffer.from(webpSticker.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
await img.load(bufferSticker);
img.exif = exif;

const result = await img.save(null);
resolve(result);
} catch (err) {
reject(new Error("Erro ao processar a figurinha: " + err.message));
}});}

function carregarMidia(customName = "fotomenu") {
const pasta = './config-bot/logos'
const image = `${pasta}/${customName}.png`
const video = `${pasta}/${customName}.mp4`
if (fs.existsSync(video)) {
return {
type: "video",
data: fs.readFileSync(video)}}
if (fs.existsSync(image)) {
return {
type: "image",
data: fs.readFileSync(image)}}
return { type: "text" }
}

exports.fetchJson = fetchJson = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options).then(response => response.json())
 .then(json => {
resolve(json)
}).catch((err) => {
reject(err)})
})

exports.fetchText = fetchText = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options).then(response => response.text()).then(text => {
resolve(text)
}).catch((err) => {
reject(err)})
})

exports.createExif = (pack, auth) =>{
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
opcoes ? opcoes : {}
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

const getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`;
};

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

function temporizador(segundos){
function tempo(s){
return (s < 10 ? '0' : '') + s;
}
var horas = Math.floor(segundos / (60*60));
var minutos = Math.floor(segundos % (60*60) / 60);
var segundos = Math.floor(segundos % 60);
return `${tempo(horas)}:${tempo(minutos)}:${tempo(segundos)}`;
}

const color = (text, color) => {
return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

function recognize(filename, config = {}) {
const options = getOptions(config)
const binary = config.binary || "tesseract"
const command = [binary, `"${filename}"`, "stdout", ...options].join(" ")
if (config.debug) log("command", command)
return new Promise((resolve, reject) => {
exec(command, (error, stdout, stderr) => {
if(config.debug) log(stderr)
if(error) reject(error)
resolve(stdout)
})
})
}

function getOptions(config) {
const ocrOptions = ["tessdata-dir", "user-words", "user-patterns", "psm", "oem", "dpi"]
return Object.entries(config).map(([key, value]) => {
if (["debug", "presets", "binary"].includes(key)) return
if (key === "lang") return `-l ${value}`
if (ocrOptions.includes(key)) return `--${key} ${value}`
return `-c ${key}=${value}`
}).concat(config.presets).filter(Boolean)
}

const authorname = "KIMORI-MD"
const packname = "Matheus </Dev>"

const chyt = "152411645677743";
const nit = "14019477934285";
const supre = "553891164328";

const usedCommandRecently = new Set()
const isFiltered = (from) => !!usedCommandRecently.has(from)
const addFilter = (from) => {
usedCommandRecently.add(from)
setTimeout(() => usedCommandRecently.delete(from), 5000)}

module.exports = { getBuffer, fetchJson, fetchText, fetch, generateMessageID, getGroupAdmins, normalizeJid, getMembros, getRandom, banner2, temporizador, color, recognize, bgcolor, isFiltered, addFilter, banner3, chyt, getExtension, convertSticker, upload, nit, getpc, supre, carregarMidia }
