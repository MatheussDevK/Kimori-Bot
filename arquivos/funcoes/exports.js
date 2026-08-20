const { 'default': makeWASocket,downloadContentFromMessage, fetchLatestBaileysVersion, useMultiFileAuthState, makeInMemoryStore, DisconnectReason, WAGroupMetadata, relayWAMessage, MediaPathMap, mentionedJid, processTime, MediaType, MessageType, Presence, Mimetype, Browsers, delay, MessageRetryMap } = require('@whiskeysockets/baileys');

const { Boom }= require('@hapi/boom');
const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');
const crypto = require('crypto');
const util = require('util');
const { randomBytes } = require("crypto");
const P = require('pino');
const fetch = require('node-fetch');
const NodeCache = require('@cacheable/node-cache').default;
const linkfy = require('linkifyjs');
const ms = require('ms');
const os = require('os');
const ffmpeg = require('fluent-ffmpeg');
const qrterminal = require('qrcode-terminal');
const { exec, spawn, execSync } = require('child_process');
const moment = require('moment-timezone');
const colors = require("colors");
const readline = require('readline');
const speed = require("performance-now");
const v8 = require('v8');
const { sendInteractiveMessage, sendButtons, sendAlbumMessage, sendInteractiveButtonsBasic } = require('baileys_helpers');

const time = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
const date = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY');

const { sendVideoAsSticker, sendImageAsSticker } = require('../../arquivos/sticker/rename.js');
const { sendVideoAsSticker2, sendImageAsSticker2 } = require('../../arquivos/sticker/rename2.js');
const LoggerB = require('@whiskeysockets/baileys/lib/Utils/logger').default;
const packname = JSON.parse(fs.readFileSync('./package.json'));
const { addBanned, unBanned, BannedExpired, cekBannedUser } = require("../../arquivos/js/banned.js");
const namoro1 = JSON.parse(fs.readFileSync("./database/func/namoro1.json"));
const namoro2 = JSON.parse(fs.readFileSync("./database/func/namoro2.json"));
const { validmove, setGame } = require('../../arquivos/tictactoe');
const { addComandosId, deleteComandos, getComandoBlock, getComandos, addComandos } =require('../../arquivos/js/addcmd.js');
const { wait, getExtension, generateMessageID, getMembros, getGroupAdmins, normalizeJid, getRandom, banner, banner2, banner3, temporizador, chyt, getBuffer, fetchJson, fetchText, createExif, getBase64, convertSticker, upload, nit, getpc, supre, recognize, carregarMidia } = require('../../arquivos/funcoes/functions.js');
const { writeExifImg } = require('../../arquivos/sticker/exif.js')
const { writeExif2 } = require('../../arquivos/sticker/exif2.js')
const { isFiltered, addFilter } = require('../../arquivos/funcoes/functions.js');

const pushnames = JSON.parse(fs.readFileSync('./database/usuarios/users.json'));
const nescessario = JSON.parse(fs.readFileSync('./config-bot/nescessario.json'));
const obrigadoEXT = nescessario
const rgtake = JSON.parse(fs.readFileSync('./database/usuarios/take.json'));
const sotoy = JSON.parse(fs.readFileSync('./database/sotoy.json'));
const countMessage = JSON.parse(fs.readFileSync('./database/countmsg.json'));
const comandos = JSON.parse(fs.readFileSync('./database/comandos.json'));
const daily = JSON.parse(fs.readFileSync('./database/usuarios/diario.json'));
const vip = JSON.parse(fs.readFileSync('./database/usuarios/vip.json'));
const ban = JSON.parse(fs.readFileSync('./database/usuarios/banned.json'));
const muted = JSON.parse(fs.readFileSync('./database/grupos/muted.json'))
const limitefll = JSON.parse(fs.readFileSync('./database/usuarios/flood.json'));
const joguinhodavelhajs = JSON.parse(fs.readFileSync('./database/usuarios/joguinhodavelha.json'));
const joguinhodavelhajs2 = JSON.parse(fs.readFileSync('./database/usuarios/joguinhodavelha2.json'));
const antispam = JSON.parse(fs.readFileSync('./database/antispam.json'));
const anotar = JSON.parse(fs.readFileSync("./database/func/anotar.json"));
const setting = JSON.parse(fs.readFileSync('./config-bot/config.json'));
const logoslink = JSON.parse(fs.readFileSync('./config-bot/logos/links_img.json'));
const Limit_CMD = JSON.parse(fs.readFileSync("./database/func/limitarcmd.json"))
const tools = JSON.parse(fs.readFileSync('./database/tools.json'));
const advices = JSON.parse(fs.readFileSync('./database/advices.json'));

const { mess, getInfo } = require('../../database/P-INFORMACOES/lib');
const linguagem = require('../../config-bot/menus/menus');
const { tabela } = require('../../arquivos/js/tabela.js');

const { getAntiRouboData, checkAntiRouboActive, extractTargetJids, saveAntiRouboData, clearPermissions, addPermission, removePermission, getResolvedPhoneList } = require('./AntiRoubo.js');

function DLT_FL(file) {
try {
fs.unlinkSync(file);
} catch (error) {
}
}

if(!nescessario.botoes_) {
var EnvBotao = async (id, MR, kiimorizinha, text1, desc1, X) => {
if(X.split("|")[1] != "0") {
kiimorizinha.sendMessage(id, {image: {url: X.split("|")[1]}, caption: text1, mentions: [MR]})} else {kiimorizinha.sendMessage(id, {text: text1, mentions: [MR]})}}
} else {
var EnvBotao = async(id, MR, kiimorizinha, text1, desc1, X, TXT = [], vr) => {
var DMN_ = X.split("|")[0].charAt(0);
var QNT_B = DMN_ == "1" ? [{buttonId: TXT[0], buttonText: {displayText: TXT[1]}, type: 1}] : DMN_ == "2" ? [{buttonId: TXT[0], buttonText: {displayText: TXT[1]}, type: 1}, {buttonId: TXT[2], buttonText: {displayText: TXT[3]}, type: 1}] : DMN_ == "3" ? [{buttonId: TXT[0], buttonText: {displayText: TXT[1]}, type: 1}, {buttonId: TXT[2], buttonText: {displayText: TXT[3]}, type: 1}, {buttonId: TXT[4], buttonText: {displayText: TXT[5]}, type: 1}]: "";
if(X.split("|")[1] == "0" && !X.split("|")[0].includes("v")) {
var buttonMessage = {
text: text1, footer: desc1,
buttons: QNT_B, headerType: 1, mentions: [MR]};
} else if(X.split("|")[1] != "0" && !X.split("|")[0].includes("v")) {
var buttonMessage = {
image: {url: X.split("|")[1]},
caption: text1, footer: desc1, buttons: QNT_B,
headerType: 1, mentions: [MR]};
} else if(X.split("|")[1] != "0" && X.split("|")[0].includes("v")) {
var buttonMessage = {
video: {url: X.split("|")[1]},
caption: text1, footer: desc1,
buttons: QNT_B, headerType: 1, mentions: [ME]}}
kiimorizinha.sendMessage(id, buttonMessage, {quoted: vr}).catch(e => {
return console.log("Erro no botão, Tente novamente ou avalie o que pode está errando.. "+e);
})}}

const convertBytes = function(bytes) {
const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
if(bytes == 0) {
return "n/a";
}
const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
if(i == 0) {
return bytes + " " + sizes[i];
}
return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
};

const getName = (number) => {
const normalized = normalizeJid(number);
if (!normalized) return "usuário(a)";
const found = pushnames.find(p => normalizeJid(p.id) === normalized);
return found ? found.nick : "usuário(a)";
}

function ANT_LTR_MD_EMJ(str) {
for (let i = 0, n = str.length; i < n; i++) {
if(str.charCodeAt(i) > 255) {
return true;
}
}
return false;
}

function kyun(seconds){
function pad(s){return (s < 10 ? "0" : "") + s};
var horas = Math.floor(seconds / (60*60) % (24));
var minutos = Math.floor(seconds % (60*60) / 60);
var segundos = Math.floor(seconds % 60);
return `${pad(horas)} horas, ${pad(minutos)} minutos e ${pad(segundos)} segundos.`;
}

function TimeCount(seconds) {
function pad(s) { return (s < 10 ? "0" : "") + s }

const dias = Math.floor(seconds / (60 * 60 * 24));
const horas = Math.floor((seconds / (60 * 60)) % 24);
const minutos = Math.floor((seconds % (60 * 60)) / 60);
const segundos = Math.floor(seconds % 60);

let resultado = "";

if (dias > 0) {
resultado += `${pad(dias)} ᴅ, ${pad(horas)} ʜʀ, ${pad(minutos)} ᴍɪɴ ᴇ ${pad(segundos)} ꜱᴇɢ`;
} else if (horas > 0) {
resultado += `${pad(horas)} ʜʀ, ${pad(minutos)} ᴍɪɴ ᴇ ${pad(segundos)} ꜱᴇɢ`;
} else if (minutos > 0) {
resultado += `${pad(minutos)} ᴍɪɴ ᴇ ${pad(segundos)} ꜱᴇɢ`;
} else {
resultado += `${pad(segundos)} ꜱᴇɢ`;
}

return resultado;
}

const shuffle = (palavraOriginal) => {
palavra = `${palavraOriginal} `; armax = []
for(i = 0; i < palavra.length; i++) {armax.push({l: palavra.split(palavra.slice(i+1))[0].slice(i)})}
shuffleProcess = ""; total_armax = armax.length
for(a = 0; a < total_armax; a++) {
toDoRandom = Math.floor(Math.random()*armax.length)
shuffleProcess += armax[toDoRandom].l
armax.splice(toDoRandom, 1)
}
return shuffleProcess
}

const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType);
let buffer = Buffer.from([]);
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}
return buffer;
};

const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms));
};

const enviarfiguUrl = async (nagatoro, from, link, mr) => {
ranp = getRandom('.gif');
rano = getRandom('.webp');
ini_buffer = `${link}`;
exec(`wget ${ini_buffer} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 320:320 ${rano}`, (err) => {
DLT_FL(ranp);
buff = fs.readFileSync(rano);
nagatoro.sendMessage(from, {sticker: buff}, {quoted: mr}).catch(() => {
return console.log("Erro..");
});
DLT_FL(rano);
});
};

const sendPoll = (nagatoro, id, name = '', values = [], selectableCount = 1) => {
return nagatoro.sendMessage(id, {poll: {name, values, selectableCount}, messageContextInfo: { messageSecret: randomBytes(32)}}, {id, options: {userJid: nagatoro?.user?.id}}).catch(() => {
return console.log(console.error);
});
}

const isJsonIncludes = (json, value) => {
if(JSON.stringify(json).includes(value)) return true
return false
}

const simih = async (text) => {
try {
datasimi = await fetchJson(`https://api.simsimi.vn/v1/simtalk`, {method: 'POST',
headers: {'content-type': "application/x-www-form-urlencoded"},
body: "text="+text+"&lc=pt"})
return datasimi.message
} catch (e){
return
}}

function obeso(peso, altura) {
 return Number(parseFloat(peso) / (parseFloat(altura) ** 2)).toFixed(2)
}

function capitalizeFirstLetter(string) {
 return string.charAt(0).toUpperCase() + string.substring(1)
}

const countDays = (date1, date2) => {
if (!(date1 || date2)) return 0
date1 = new Date(date1[1]+"/"+date1[0]+"/"+date1[2])
date2 = new Date(date2[1]+"/"+date2[0]+"/"+date2[2])
const timeDiff = Math.abs(date2.getTime() - date1.getTime());
const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
return diffDays || 0
}

const timeDate = (tempo, now, x = true) => {
if (Number(now) && x) return moment(now * 1000).tz('America/Sao_Paulo').format(tempo)
if (Number(now)) return moment(now).tz('America/Sao_Paulo').format(tempo)
return moment.tz('America/Sao_Paulo').format(tempo)
}

const formatNumber = (number) => {
if (number >= 1e9) return (number / 1e9).toFixed(1) + 'B';
if (number >= 1e6) return (number / 1e6).toFixed(1) + 'M';
if (number >= 1e5) return (number / 1e3).toFixed(1) + 'K';
if (number >= 1e4) return (number / 1e3).toFixed(1) + 'K';
if (number >= 1e3) return (number / 1e3).toFixed(1) + 'K';
return number;
}

const formatNumberDecimal = (num) => {
return (num).toLocaleString('pt-BR');
}

function formatDateOriginal(number, locale = 'pt') {
let dateInformation = new Date(number);
return dateInformation.toLocaleDateString(locale, {
weekday: 'long',
day: 'numeric',
month: 'long',
year: 'numeric'
 })
}

const addNumberMais = (nmr) => {
usu = (nmr.includes("@s.whatsapp.net") ? nmr : identArroba(nmr)).split("@")[0]
return "+" + usu.slice(0, 2) + " " + usu.slice(2, 4) + " " + usu.slice(4, usu.length - 4) + "-" + usu.slice(usu.length - 4, usu.length)
}

const identArroba = (txt) => {
if (!txt) return txt;
let cleaned = txt.replace(/:.*(?=@)/, '');
if (!cleaned.includes('@')) {
cleaned = cleaned.replace(/\D/g, '') + '@s.whatsapp.net';
}
return cleaned;
}

function fuzzySimilarity(word1, word2) {
function generateNGrams(word, n) {
const nGrams = [];
for (let i = 0; i < word.length - n + 1; i++) {
nGrams.push(word.slice(i, i + n));
}
return nGrams;
}

const nGrams1 = generateNGrams(word1, 2);
const nGrams2 = generateNGrams(word2, 2);
const commonNGrams = nGrams1.filter(nGram => nGrams2.includes(nGram));
const similarity = Math.round((2 * commonNGrams.length) / (nGrams1.length + nGrams2.length) * 100);

return similarity;
}

const listCommands = (targetWord) => {
const fileContent = fs.readFileSync("kimori.js", "utf8");
const commandsRegex = /case\s+['"](.+?)['"]/g;
let mostSimilarCommand = "";
let highestSimilarity = -1;
let match;

while ((match = commandsRegex.exec(fileContent)) !== null) {
const extractedCommand = match[1];
const similarity = fuzzySimilarity(targetWord, extractedCommand);
if (similarity > highestSimilarity) {
highestSimilarity = similarity;
mostSimilarCommand = extractedCommand;
}
}

return {
command: mostSimilarCommand,
similarity: highestSimilarity
};
};

function extractStateFromDDD(ddd) {
const dddList = {"11": "São Paulo (SP)", "12": "São Paulo (SP)", "13": "São Paulo (SP)", "14": "São Paulo (SP)", "15": "São Paulo (SP)", "16": "São Paulo (SP)", "17": "São Paulo (SP)", "18": "São Paulo (SP)", "19": "São Paulo (SP)", "21": "Rio de Janeiro (RJ)", "22": "Rio de Janeiro (RJ)", "24": "Rio de Janeiro (RJ)", "27": "Espírito Santo (ES)", "28": "Espírito Santo (ES)", "31": "Minas Gerais (MG)", "32": "Minas Gerais (MG)", "33": "Minas Gerais (MG)", "34": "Minas Gerais (MG)", "35": "Minas Gerais (MG)", "37": "Minas Gerais (MG)", "38": "Minas Gerais (MG)", "41": "Paraná (PR)", "42": "Paraná (PR)", "43": "Paraná (PR)", "44": "Paraná (PR)", "45": "Paraná (PR)", "46": "Paraná (PR)", "47": "Santa Catarina (SC)", "48": "Santa Catarina (SC)", "49": "Santa Catarina (SC)", "51": "Rio Grande do Sul (RS)", "53": "Rio Grande do Sul (RS)", "54": "Rio Grande do Sul (RS)", "55": "Rio Grande do Sul (RS)", "61": "Distrito Federal (DF)", "62": "Goiás (GO)", "63": "Tocantins (TO)", "64": "Goiás (GO)", "65": "Mato Grosso (MT)", "66": "Mato Grosso (MT)", "67": "Mato Grosso do Sul (MS)", "68": "Acre (AC)", "69": "Rondônia (RO)", "71": "Bahia (BA)", "73": "Bahia (BA)", "74": "Bahia (BA)", "75": "Bahia (BA)", "77": "Bahia (BA)", "79": "Sergipe (SE)", "81": "Pernambuco (PE)", "82": "Alagoas (AL)", "83": "Paraíba (PB)", "84": "Rio Grande do Norte (RN)", "85": "Ceará (CE)", "86": "Piauí (PI)", "87": "Pernambuco (PE)", "88": "Ceará (CE)", "89": "Piauí (PI)", "91": "Pará (PA)", "93": "Pará (PA)", "94": "Pará (PA)", "95": "Roraima (RR)", "96": "Amapá (AP)", "97": "Amazonas (AM)", "98": "Maranhão (MA)", "99": "Maranhão (MA)"};
return dddList[ddd] || "";
}

function extractStateFromNumber(phoneNumber) {
const numericOnly = phoneNumber.replace(/\D/g, '');
if (numericOnly.startsWith(55) && numericOnly.length === 12 || numericOnly.length === 13) {
const ddd = numericOnly.substring(2, 4);
return extractStateFromDDD(ddd) || "Números de fora do Brasil, os estados não é possível identificar.";
} else {
return "Números de fora do Brasil, os estados não é possível identificar.";
}
}

function extractDDD(phoneNumber) {
const numericOnly = phoneNumber.replace(/\D/g, '');
if (numericOnly.startsWith(55) && numericOnly.length === 12 || numericOnly.length === 13) {
return numericOnly.substring(2, 4);
} else {
return null
}
}

module.exports = { extractDDD, extractStateFromNumber, extractStateFromDDD, formatDateOriginal, LoggerB, readline, P, fs, util, Boom, axios, linkfy, ms, ffmpeg, qrterminal, exec, spawn, execSync, limitefll, moment, time, hora, date, os, getBuffer, convertSticker, fetch, fetchJson, fetchText, getBase64, createExif, writeExifImg, upload, nit, addBanned, unBanned, BannedExpired, cekBannedUser, validmove, setGame, addComandosId, deleteComandos, getComandoBlock, getComandos, addComandos, getpc, supre, wait, getExtension, generateMessageID, getGroupAdmins, normalizeJid, getMembros, getRandom, banner, banner2, banner3, temporizador, chyt, simih, antispam, anotar, sotoy, countMessage, comandos, daily, muted, nescessario, vip, ban, joguinhodavelhajs, joguinhodavelhajs2, setting, logoslink, linguagem, getInfo, mess, tabela, recognize, colors, cheerio, NodeCache, kyun, TimeCount, sendVideoAsSticker, sendImageAsSticker, sendVideoAsSticker2,sendImageAsSticker2, enviarfiguUrl, sendPoll, getFileBuffer, DLT_FL, sleep, ANT_LTR_MD_EMJ, convertBytes, os, isFiltered, addFilter, speed, obeso, countDays, timeDate, writeExif2, Limit_CMD, capitalizeFirstLetter, formatNumber, formatNumberDecimal, isJsonIncludes, pushnames, shuffle, packname, advices, tools, getName, listCommands, namoro1, namoro2, obrigadoEXT, addNumberMais, identArroba, carregarMidia, getAntiRouboData, checkAntiRouboActive, extractTargetJids, saveAntiRouboData, clearPermissions, addPermission, removePermission, getResolvedPhoneList, sendInteractiveMessage, sendButtons, v8, sendAlbumMessage, sendInteractiveButtonsBasic }
