import './garantirArquivos.js'; // cria arquivos de banco que faltarem antes de lê-los
import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import __boom from '@hapi/boom';
import axios from 'axios';
import fs from 'node:fs';
import * as cheerio from 'cheerio';
import util from 'node:util';
import { randomBytes } from 'node:crypto';
import P from 'pino';
import fetch from 'node-fetch';
import NodeCache from '@cacheable/node-cache';
import linkfy from 'linkifyjs';
import ms from 'ms';
import os from 'node:os';
import ffmpeg from 'fluent-ffmpeg';
import qrterminal from 'qrcode-terminal';
import { exec, spawn, execSync, execFile } from 'node:child_process';
import moment from 'moment-timezone';
import colors from 'colors';
import readline from 'node:readline';
import v8 from 'node:v8';
// versão que também mostra imagem/vídeo junto dos botões (ver interativo.js)
import * as baileys_helpersNS from './interativo.js';
import { sendVideoAsSticker, sendImageAsSticker } from '../sticker/rename.js';
import { sendVideoAsSticker2, sendImageAsSticker2 } from '../sticker/rename2.js';
import LoggerB from '@whiskeysockets/baileys/lib/Utils/logger.js';
import { addBanned, unBanned, BannedExpired, cekBannedUser } from '../js/banned.js';
import { validmove, setGame } from '../tictactoe/index.js';
import { addComandosId, deleteComandos, getComandoBlock, getComandos, addComandos } from '../js/addcmd.js';
import { getExtension, generateMessageID, getMembros, getGroupAdmins, normalizeJid, getRandom, banner2, banner3, temporizador, getBuffer, fetchJson, fetchText, createExif, convertSticker, upload, getpc, recognize, carregarMidia } from './functions.js';
import { writeExifImg } from '../sticker/exif.js';
import { converterBuffer } from './midiaTemp.js';
import { writeExif2 } from '../sticker/exif2.js';
import { isFiltered, addFilter } from './functions.js';
import __index from '../../database/P-INFORMACOES/lib/index.js';
import linguagem from '../../config-bot/menus/menus.js';
import __tabela from '../js/tabela.js';
import { getAntiRouboData, checkAntiRouboActive, extractTargetJids, saveAntiRouboData, clearPermissions, addPermission, removePermission, getResolvedPhoneList } from './AntiRoubo.js';
import { loadJSON } from './jsonCache.js';

const { Boom } = __boom;

// performance.now() nativo (o pacote performance-now só vinha de carona do "request")
const speed = () => performance.now();

const { sendInteractiveMessage, sendButtons, sendAlbumMessage, sendInteractiveButtonsBasic } = baileys_helpersNS;

// Antes eram calculados uma única vez no boot (a hora/data ficavam congeladas).
// Agora são getters em module.exports (ver final do arquivo) e funções abaixo.
const agoraHora = () => moment.tz('America/Sao_Paulo').format('HH:mm:ss');
const agoraData = () => moment.tz('America/Sao_Paulo').format('DD/MM/YYYY');

const packname = loadJSON('./package.json');

const namoro1 = loadJSON("./database/func/namoro1.json");
const namoro2 = loadJSON("./database/func/namoro2.json");

const pushnames = loadJSON('./database/usuarios/users.json');
const nescessario = loadJSON('./config-bot/nescessario.json');
const obrigadoEXT = nescessario
const rgtake = loadJSON('./database/usuarios/take.json');
const sotoy = loadJSON('./database/sotoy.json');
const countMessage = loadJSON('./database/countmsg.json');
const comandos = loadJSON('./database/comandos.json');
const daily = loadJSON('./database/usuarios/diario.json');
const vip = loadJSON('./database/usuarios/vip.json');
const ban = loadJSON('./database/usuarios/banned.json');
const muted = loadJSON('./database/grupos/muted.json')
const limitefll = loadJSON('./database/usuarios/flood.json');
const joguinhodavelhajs = loadJSON('./database/usuarios/joguinhodavelha.json');
const joguinhodavelhajs2 = loadJSON('./database/usuarios/joguinhodavelha2.json');
const antispam = loadJSON('./database/antispam.json');
const anotar = loadJSON("./database/func/anotar.json");
const setting = loadJSON('./config-bot/config.json');
const logoslink = loadJSON('./config-bot/logos/links_img.json');
const Limit_CMD = loadJSON("./database/func/limitarcmd.json")
const tools = loadJSON('./database/tools.json');
const advices = loadJSON('./database/advices.json');

const { mess } = __index;

const { tabela } = __tabela;

// apaga um arquivo temporário; ignora Buffer/undefined (as figurinhas agora são Buffer)
function DLT_FL(file) {
if (typeof file !== 'string' || !file) return;
try {
fs.unlinkSync(file);
} catch (error) {
}
}

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

// embaralha as letras (antes usava várias variáveis globais implícitas)
const shuffle = (palavraOriginal) => {
const letras = Array.from(`${palavraOriginal} `)
for (let i = letras.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[letras[i], letras[j]] = [letras[j], letras[i]]
}
return letras.join('')
}

const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType);
// junta os pedaços uma vez só (Buffer.concat a cada chunk era O(n²) em vídeos grandes)
const partes = [];
for await(const chunk of stream) partes.push(chunk);
return Buffer.concat(partes);
};

const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms));
};

// baixa com axios e converte com ffmpeg via execFile (antes montava "wget <link>" no shell: injeção de comando)
const enviarfiguUrl = async (nagatoro, from, link, mr) => {
try {
const buffer = await getBuffer(String(link));
if (!buffer) throw new Error('download falhou');
const sticker = await converterBuffer(buffer, '.gif', '.webp', ['-vcodec', 'libwebp', '-filter:v', 'fps=fps=15', '-lossless', '1', '-loop', '0', '-preset', 'default', '-an', '-vsync', '0', '-s', '320:320']);
await nagatoro.sendMessage(from, {sticker}, {quoted: mr});
} catch (e) {
console.log("Erro ao enviar figurinha por URL:", e?.message || e);
}
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
const datasimi = await fetchJson(`https://api.simsimi.vn/v1/simtalk`, {method: 'POST',
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
const usu = (nmr.includes("@s.whatsapp.net") ? nmr : identArroba(nmr)).split("@")[0]
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
// parênteses: antes qualquer número de 13 dígitos (de qualquer país) era tratado como brasileiro
if (numericOnly.startsWith('55') && (numericOnly.length === 12 || numericOnly.length === 13)) {
const ddd = numericOnly.substring(2, 4);
return extractStateFromDDD(ddd) || "Números de fora do Brasil, os estados não é possível identificar.";
} else {
return "Números de fora do Brasil, os estados não é possível identificar.";
}
}

function extractDDD(phoneNumber) {
const numericOnly = phoneNumber.replace(/\D/g, '');
if (numericOnly.startsWith('55') && (numericOnly.length === 12 || numericOnly.length === 13)) {
return numericOnly.substring(2, 4);
} else {
return null
}
}

const __moduleExports = { extractDDD, extractStateFromNumber, extractStateFromDDD, formatDateOriginal, LoggerB, readline, P, fs, util, Boom, axios, linkfy, ms, ffmpeg, qrterminal, exec, spawn, execSync, limitefll, moment, agoraHora, agoraData, os, getBuffer, convertSticker, fetch, fetchJson, fetchText, createExif, writeExifImg, upload, addBanned, unBanned, BannedExpired, cekBannedUser, validmove, setGame, addComandosId, deleteComandos, getComandoBlock, getComandos, addComandos, getpc, getExtension, generateMessageID, getGroupAdmins, normalizeJid, getMembros, getRandom, banner2, banner3, temporizador, simih, antispam, anotar, sotoy, countMessage, comandos, daily, muted, nescessario, vip, ban, joguinhodavelhajs, joguinhodavelhajs2, setting, logoslink, linguagem, mess, tabela, recognize, colors, cheerio, NodeCache, kyun, TimeCount, sendVideoAsSticker, sendImageAsSticker, sendVideoAsSticker2,sendImageAsSticker2, enviarfiguUrl, sendPoll, getFileBuffer, DLT_FL, sleep, ANT_LTR_MD_EMJ, convertBytes, isFiltered, addFilter, speed, obeso, countDays, timeDate, writeExif2, Limit_CMD, capitalizeFirstLetter, formatNumber, formatNumberDecimal, isJsonIncludes, pushnames, shuffle, packname, advices, tools, getName, listCommands, namoro1, namoro2, obrigadoEXT, addNumberMais, identArroba, carregarMidia, getAntiRouboData, checkAntiRouboActive, extractTargetJids, saveAntiRouboData, clearPermissions, addPermission, removePermission, getResolvedPhoneList, sendInteractiveMessage, sendButtons, v8, sendAlbumMessage, sendInteractiveButtonsBasic }

// hora/data sempre atuais para quem lê exports.time / exports.date
Object.defineProperty(__moduleExports, 'time', { get: agoraHora, enumerable: true })
Object.defineProperty(__moduleExports, 'hora', { get: agoraHora, enumerable: true })
Object.defineProperty(__moduleExports, 'date', { get: agoraData, enumerable: true })

export default __moduleExports;
export { extractDDD, extractStateFromNumber, extractStateFromDDD, formatDateOriginal, LoggerB, readline, P, fs, util, Boom, axios, linkfy, ms, ffmpeg, qrterminal, exec, spawn, execSync, limitefll, moment, agoraHora, agoraData, os, getBuffer, convertSticker, fetch, fetchJson, fetchText, createExif, writeExifImg, upload, addBanned, unBanned, BannedExpired, cekBannedUser, validmove, setGame, addComandosId, deleteComandos, getComandoBlock, getComandos, addComandos, getpc, getExtension, generateMessageID, getGroupAdmins, normalizeJid, getMembros, getRandom, banner2, banner3, temporizador, simih, antispam, anotar, sotoy, countMessage, comandos, daily, muted, nescessario, vip, ban, joguinhodavelhajs, joguinhodavelhajs2, setting, logoslink, linguagem, mess, tabela, recognize, colors, cheerio, NodeCache, kyun, TimeCount, sendVideoAsSticker, sendImageAsSticker, sendVideoAsSticker2, sendImageAsSticker2, enviarfiguUrl, sendPoll, getFileBuffer, DLT_FL, sleep, ANT_LTR_MD_EMJ, convertBytes, isFiltered, addFilter, speed, obeso, countDays, timeDate, writeExif2, Limit_CMD, capitalizeFirstLetter, formatNumber, formatNumberDecimal, isJsonIncludes, pushnames, shuffle, packname, advices, tools, getName, listCommands, namoro1, namoro2, obrigadoEXT, addNumberMais, identArroba, carregarMidia, getAntiRouboData, checkAntiRouboActive, extractTargetJids, saveAntiRouboData, clearPermissions, addPermission, removePermission, getResolvedPhoneList, sendInteractiveMessage, sendButtons, v8, sendAlbumMessage, sendInteractiveButtonsBasic };
