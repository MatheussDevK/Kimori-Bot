'use strict';

const isDebugMode = process.argv.includes('--debug') || process.argv.includes('-d');
const MODE_DEBUG = isDebugMode;

const VERSION = require('../package.json').version || '1.0.0';

const fs = require('fs');
const path = require('path');
const v8 = require('v8');
const pLimit = require('p-limit');
const NodeCache = require('node-cache');

const {
default: makeWASocket,
useMultiFileAuthState,
makeCacheableSignalKeyStore,
Browsers,
delay
} = require('@whiskeysockets/baileys');

const qrcodeTerminal = require('qrcode-terminal');
const chalk = require('chalk');
const { Boom } = require('@hapi/boom');
const axios = require('axios');

const {
fs: fsUtils, readline, colors, banner2, banner3,
getGroupAdmins, mess, setting, extractDDD,
extractStateFromNumber, extractStateFromDDD, time, date
} = require('../arquivos/funcoes/exports.js');

const { NomeDoBot, channelnk, emojii } = require('../config-bot/config.json');

const CONFIG = {
QRCODE_PATH: './database/qr-code',

MAX_CONCURRENT: 500,
MESSAGES_PER_SECOND: 300,
MIN_INTERVAL_MS: 0,

CACHE_MAX_SIZE: 100,
CACHE_DEFAULT_TTL: 10 * 60 * 1000,
IMAGE_CACHE_TTL: 30 * 60 * 1000,

HEAP_THRESHOLD_MB: 300,
GC_INTERVAL_MS: 5 * 60 * 1000,

EVENT_THROTTLE_MS: 500,
MEDIA_DEBOUNCE_MS: 1000,

CONNECTION_TIMEOUT: 30000,
KEEP_ALIVE_INTERVAL: 10000,
RETRY_DELAY: 500,
MAX_RETRIES: 5,
};

const SILENCED_PATTERNS = [
/Bad MAC/i,
/Session error/i,
/Closing session/i,
/Closing open session/i,
/Failed to decrypt message/i,
/prekey bundle/i,
/SessionEntry/i,
/_chains/i,
/ephemeralKeyPair/i,
/lastRemoteEphemeralKey/i,
/rootKey/i,
/indexInfo/i,
/baseKey/i,
/registrationId/i,
/currentRatchet/i,
/remoteIdentityKey/i,
/verifyMAC/i,
/doDecryptWhisperMessage/i,
/decryptWithSessions/i,
/libsignal/i,
/Bad Mac Error/i,
/Unknown session/i,
/Chain/i,
/Ratchet/i,
/pubKey/i,
/privKey/i,
/Buffer/i,
/previousCounter/i,
/baseKeyType/i,
/closed/i,
/used/i,
/created/i,
/identityKey/i,
/senderKey/i,
/receiverKey/i,
/senderChainKey/i,
/receiverChainKey/i,
/messageKeys/i,
/chainKey/i,
/ratchet/i,
/session/i,
/ciphertext/i,
/plaintext/i,
/encrypt/i,
/decrypt/i,
/key/i,
/hash/i,
/sign/i,
/verify/i
];

const isSessionData = (str) => {
if (!str) return false;
const sessionIndicators = [
'SessionEntry',
'_chains',
'ephemeralKeyPair',
'currentRatchet',
'indexInfo',
'registrationId',
'remoteIdentityKey',
'baseKey',
'rootKey',
'Buffer',
'pubKey',
'privKey',
'senderKey',
'receiverKey',
'chainKey',
'messageKeys',
'identityKey'
];
return sessionIndicators.some(indicator => str.includes(indicator));
};

if (!MODE_DEBUG) {
const originalConsole = {
log: console.log,
error: console.error,
warn: console.warn,
info: console.info,
debug: console.debug,
trace: console.trace
};

const shouldSuppress = (message) => {
if (!message) return false;
const str = String(message);
if (isSessionData(str)) return true;
return SILENCED_PATTERNS.some(pattern => pattern.test(str));
};

console.log = function(...args) {
const message = args.join(' ');
if (!shouldSuppress(message)) {
originalConsole.log.apply(console, args);
}
};

console.error = function(...args) {
const message = args.join(' ');
if (!shouldSuppress(message)) {
originalConsole.error.apply(console, args);
}
};

console.warn = function(...args) {
const message = args.join(' ');
if (!shouldSuppress(message)) {
originalConsole.warn.apply(console, args);
}
};

console.info = function(...args) {
const message = args.join(' ');
if (!shouldSuppress(message)) {
originalConsole.info.apply(console, args);
}
};

console.debug = function(...args) {
const message = args.join(' ');
if (!shouldSuppress(message)) {
originalConsole.debug.apply(console, args);
}
};

console.trace = function(...args) {
const message = args.join(' ');
if (!shouldSuppress(message)) {
originalConsole.trace.apply(console, args);
}
};
}

const createFilteredLogger = (debugMode) => {
const shouldLog = (message) => {
if (debugMode) return true;
if (!message) return false;
if (isSessionData(message)) return false;
return !SILENCED_PATTERNS.some(pattern => pattern.test(message));
};

const logWithFilter = (fn, ...args) => {
const message = args.join(' ');
if (shouldLog(message)) {
fn(...args);
}
};

return {
level: debugMode ? 'debug' : 'silent',
child: () => createFilteredLogger(debugMode),
error: (...args) => logWithFilter(console.error.bind(console), ...args),
warn: (...args) => logWithFilter(console.warn.bind(console), ...args),
info: (...args) => logWithFilter(console.info.bind(console), ...args),
debug: (...args) => logWithFilter(console.debug.bind(console), ...args),
trace: (...args) => logWithFilter(console.debug.bind(console), ...args)
};
};

const logger = createFilteredLogger(MODE_DEBUG);

const cacheLogger = {
level: 'silent',
child: () => cacheLogger,
error: () => {},
warn: () => {},
info: () => {},
debug: () => {},
trace: () => {}
};

class LRUCache {
constructor({ maxSize = CONFIG.CACHE_MAX_SIZE, defaultTTL = CONFIG.CACHE_DEFAULT_TTL, name = 'cache' } = {}) {
this.maxSize = maxSize;
this.defaultTTL = defaultTTL;
this.name = name;
this.store = new Map();
}

_isExpired(entry) {
return Date.now() > entry.expiresAt;
}

_evictLRU() {
const firstKey = this.store.keys().next().value;
this.store.delete(firstKey);
}

set(key, value, ttl = this.defaultTTL) {
if (this.store.has(key)) this.store.delete(key);
if (this.store.size >= this.maxSize) this._evictLRU();

this.store.set(key, {
value,
expiresAt: Date.now() + ttl,
size: this._estimateSize(value),
});
}

get(key) {
if (!this.store.has(key)) return null;
const entry = this.store.get(key);
if (this._isExpired(entry)) {
this.store.delete(key);
return null;
}
this.store.delete(key);
this.store.set(key, entry);
return entry.value;
}

has(key) {
return this.get(key) !== null;
}

delete(key) {
return this.store.delete(key);
}

clear() {
const count = this.store.size;
this.store.clear();
return count;
}

purgeExpired() {
let removed = 0;
for (const [key, entry] of this.store) {
if (this._isExpired(entry)) {
this.store.delete(key);
removed++;
}
}
return removed;
}

_estimateSize(value) {
if (Buffer.isBuffer(value)) return value.length;
if (typeof value === 'string') return value.length * 2;
if (typeof value === 'object' && !Buffer.isBuffer(value)) return 1024;
return 0;
}

get totalSizeKB() {
let total = 0;
for (const e of this.store.values()) total += e.size;
return Math.round(total / 1024);
}

get size() { return this.store.size; }

stats() {
return {
name: this.name,
entries: this.store.size,
maxSize: this.maxSize,
sizeKB: this.totalSizeKB,
};
}
}

const imageCache = new LRUCache({
maxSize: 50,
defaultTTL: CONFIG.IMAGE_CACHE_TTL,
name: 'image',
});

const responseCache = new LRUCache({
maxSize: 200,
defaultTTL: CONFIG.CACHE_DEFAULT_TTL,
name: 'response',
});

const bufferCache = new LRUCache({
maxSize: 30,
defaultTTL: CONFIG.CACHE_DEFAULT_TTL,
name: 'buffer',
});

const groupCache = new LRUCache({
maxSize: 100,
defaultTTL: 5 * 60 * 1000,
name: 'group',
});

class MemoryMonitor {
constructor() {
this._timer = null;
this._history = [];
this._maxHist = 10;
}

start() {
if (this._timer) return;
this._timer = setInterval(() => this._check(), CONFIG.GC_INTERVAL_MS);
this._timer.unref?.();
if (MODE_DEBUG) console.log(chalk.green('Monitor de memória iniciado'));
}

stop() {
if (this._timer) {
clearInterval(this._timer);
this._timer = null;
}
}

_check() {
const mb = heapMB();
this._history.push({ ts: Date.now(), mb });
if (this._history.length > this._maxHist) this._history.shift();

if (mb > CONFIG.HEAP_THRESHOLD_MB) {
if (MODE_DEBUG) console.log(chalk.yellow(`Heap: ${mb} MB - Limpando...`));
this._cleanup();
}
}

_cleanup() {
const removed =
imageCache.purgeExpired() +
responseCache.purgeExpired() +
bufferCache.purgeExpired() +
groupCache.purgeExpired();

if (heapMB() > CONFIG.HEAP_THRESHOLD_MB) {
responseCache.clear();
groupCache.clear();
}

if (typeof global.gc === 'function') {
global.gc();
}

if (MODE_DEBUG) {
console.log(chalk.green(`Limpeza: ${removed} itens removidos - Heap: ${heapMB()} MB`));
}
}

forceCleanup() {
this._cleanup();
}

report() {
const mem = process.memoryUsage();
return {
heap_used_mb: Math.round(mem.heapUsed / 1024 / 1024),
heap_total_mb: Math.round(mem.heapTotal / 1024 / 1024),
external_mb: Math.round(mem.external / 1024 / 1024),
rss_mb: Math.round(mem.rss / 1024 / 1024),
v8_heap_limit_mb: Math.round(v8.getHeapStatistics().heap_size_limit / 1024 / 1024),
caches: {
image: imageCache.stats(),
response: responseCache.stats(),
buffer: bufferCache.stats(),
group: groupCache.stats(),
}
};
}
}

const monitor = new MemoryMonitor();

const heapMB = () => Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
const toNum = (v) => String(v || '').replace(/\D/g, '');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise(resolve => rl.question(text, resolve));

function throttle(fn, intervalMs = CONFIG.EVENT_THROTTLE_MS) {
let lastCall = 0;
let timeout = null;
return function (...args) {
const now = Date.now();
if (now - lastCall >= intervalMs) {
lastCall = now;
return fn.apply(this, args);
} else {
if (timeout) clearTimeout(timeout);
timeout = setTimeout(() => {
lastCall = Date.now();
fn.apply(this, args);
}, intervalMs - (now - lastCall));
}
};
}

function debounce(fn, delayMs = CONFIG.MEDIA_DEBOUNCE_MS) {
let timer;
return function (...args) {
clearTimeout(timer);
timer = setTimeout(() => fn.apply(this, args), delayMs);
};
}

class RateLimiter {
constructor(maxPerSecond = CONFIG.MESSAGES_PER_SECOND) {
this.maxPerSecond = maxPerSecond;
this.tokens = maxPerSecond;
this.lastReset = Date.now();
this.queue = [];
this.processing = false;
}

async acquire() {
const now = Date.now();
if (now - this.lastReset >= 1000) {
this.tokens = this.maxPerSecond;
this.lastReset = now;
}

if (this.tokens > 0) {
this.tokens--;
return;
}

return new Promise((resolve) => {
const waitTime = 1000 - (now - this.lastReset);
setTimeout(() => {
this.tokens = this.maxPerSecond - 1;
this.lastReset = Date.now();
resolve();
}, waitTime + 10);
});
}

getStats() {
return {
tokens: this.tokens,
maxPerSecond: this.maxPerSecond,
queueLength: this.queue.length,
processing: this.processing
};
}
}

const rateLimiter = new RateLimiter();

async function getImageCached(url, fetchFn) {
const cached = imageCache.get(url);
if (cached) {
if (MODE_DEBUG) console.log(chalk.gray(`[image] HIT: ${url.slice(-30)}`));
return cached;
}
if (MODE_DEBUG) console.log(chalk.gray(`[image] MISS: ${url.slice(-30)}`));
const buffer = await fetchFn();
imageCache.set(url, buffer);
return buffer;
}

const _pendingWrites = new Map();

function writeJSONDebounced(filePath, data, delay = 500) {
if (_pendingWrites.has(filePath)) {
clearTimeout(_pendingWrites.get(filePath));
}
const timer = setTimeout(() => {
try {
const dir = path.dirname(filePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
_pendingWrites.delete(filePath);
} catch (e) {
console.error(chalk.red(`writeJSON falhou (${filePath}): ${e.message}`));
}
}, delay);
_pendingWrites.set(filePath, timer);
}

function readJSONCached(filePath, fallback = {}) {
const cached = responseCache.get('file:' + filePath);
if (cached) return cached;

try {
if (!fs.existsSync(filePath)) return fallback;
const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw);
responseCache.set('file:' + filePath, data, 60000);
return data;
} catch {
return fallback;
}
}

const normalizarJid = (alvo) => {
if (!alvo) return null;
let s = String(alvo).trim();

if (s.includes('@s.whatsapp.net')) return s;

if (s.includes('@lid')) {
const numeros = s.replace(/[^\d]/g, '');
if (numeros && numeros.length >= 10) {
return numeros + '@s.whatsapp.net';
}
return null;
}

if (s.includes(':')) {
s = s.split(':')[0];
}

if (!s.includes('@')) {
const numeros = s.replace(/\D/g, '');
if (numeros && numeros.length >= 10) {
return numeros + '@s.whatsapp.net';
}
return null;
}

return s;
};

const getGroupMetadata = async (kiimorizinha, jid) => {
if (!jid) return null;

const cacheKey = 'group:' + jid;
const cached = groupCache.get(cacheKey);
if (cached) {
if (MODE_DEBUG) console.log(chalk.gray(`[group] HIT: ${jid}`));
return cached;
}

try {
if (MODE_DEBUG) console.log(chalk.gray(`[group] MISS: ${jid}`));
const metadata = await kiimorizinha.groupMetadata(jid);
groupCache.set(cacheKey, metadata);
return metadata;
} catch (error) {
console.log(chalk.yellow(`Erro ao obter metadata do grupo ${jid}:`, error.message));
return null;
}
};

const parceriaManager = (() => {
let data = null;
let dirty = false;
const CONFIG_PATH = './database/parceria.json';

const load = () => {
if (data !== null) return data;
data = readJSONCached(CONFIG_PATH, []);
if (!Array.isArray(data)) data = [];
return data;
};

const save = () => {
if (!dirty) return;
try {
fs.writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2) + '\n');
dirty = false;
} catch (e) { console.error('[erro]', e) }
};

return {
cleanParticipants: (gid, parts) => {
if (!gid || !parts?.length) return;
const db = load();
const idx = db.findIndex(x => x?.grupo === gid);
if (idx < 0) return;
const gp = db[idx];
const jids = parts.map(p => {
const jid = p?.phoneNumber || p?.id || p;
return normalizarJid(jid);
}).filter(Boolean);
if (gp?.parceiros) jids.forEach(jid => delete gp.parceiros[jid]);
if (gp?.nparc) jids.forEach(jid => delete gp.nparc[jid]);
dirty = true;
save();
},
load,
save
};
})();

const antiRouboProcess = async (kiimorizinha, event) => {
const { id, action, participants, author } = event;
if (!id || !participants?.length || !['promote', 'demote'].includes(action)) return;

const pathAtiv = `./database/grupos/ATIVAÇÕES-GRUPO/${id}.json`;
if (!fs.existsSync(pathAtiv)) return;

let config;
try {
const data = readJSONCached(pathAtiv, {});
config = Array.isArray(data) ? data[0] : data;
if (!config?.antiroubo) return;
} catch { return; }

const meta = await getGroupMetadata(kiimorizinha, id);
if (!meta) return;

const participantsFresh = meta.participants || [];
const groupAdmins = getGroupAdmins(participantsFresh);
const botNum = (kiimorizinha.user?.id?.split(':')[0] || '').replace(/@s\.whatsapp\.net.*/, '');
const botJid = botNum + '@s.whatsapp.net';
const donoJid = (setting?.ownerNumber || '').replace(/[()+\-/ ]/g, '') + '@s.whatsapp.net';

const lidMap = new Map();
for (const p of participantsFresh) {
const pid = p?.id || p?.jid;
if (p?.lid && pid) lidMap.set(p.lid, pid);
}

const resolveJid = (jid) => {
if (!jid) return null;
jid = String(jid);
if (jid.includes('@lid')) return lidMap.get(jid) || jid;
if (jid.includes(':')) jid = jid.split(':')[0];
if (!jid.includes('@')) return jid + '@s.whatsapp.net';
return jid;
};

const autorReal = resolveJid(author || event.participant || event.actor);
const targets = participants.map(p => {
const jid = p?.phoneNumber || p?.id || p;
return resolveJid(jid);
}).filter(Boolean);
const targetsSemBot = targets.filter(t => t !== botJid);

if (!autorReal || targetsSemBot.length === 0) return;

const autorNum = toNum(autorReal);
const isDono = autorReal === donoJid;
const isBot = autorReal === botJid;
const isSuperAdmin = participantsFresh.some(p =>
(p?.id || p?.jid) === autorReal && p?.admin === 'superadmin'
);

if (isDono || isSuperAdmin || isBot) return;

const permitidos = config.ar_permitidos || [];
const permitidosNums = permitidos.map(toNum).filter(Boolean);
const permitidosLidNums = (config.ar_permitidos_lid || []).map(toNum).filter(Boolean);

if (permitidosNums.includes(autorNum) || permitidosLidNums.includes(autorNum)) return;

if (!groupAdmins.includes(botJid)) return;

const safeUpdate = async (jid, parts, act) => {
try {
return await kiimorizinha.groupParticipantsUpdate(jid, parts, act);
} catch { return null; }
};

const mentions = [autorReal, ...targetsSemBot];
const autorMention = '@' + autorNum;
const targetsMentions = targetsSemBot.map(t => '@' + toNum(t)).join(' ');

const msgText = action === 'promote'
? `🗣️ 𝐓𝐄𝐍𝐓𝐀𝐓𝐈𝐕𝐀 𝐃𝐄 𝐏𝐑𝐎𝐌𝐎𝐂𝐀𝐎 𝐃𝐄𝐓𝐄𝐂𝐓𝐀𝐃𝐀\n> *Tentativa de promover admin sem permissão.*\n\n*ᴏ ᴜsᴜᴀʀɪᴏ ${targetsMentions} ꜰᴏɪ ʀᴇʙᴀɪxᴀᴅᴏ ᴀ ᴍᴇᴍʙʀᴏ. 🤷‍♂️*\n\n*ᴀᴅᴍ ʀᴇsᴘᴏɴsᴀ́ᴠᴇʟ: ${autorMention} 🙅‍♂️*`
: `‼️ 𝐓𝐄𝐍𝐓𝐀𝐓𝐈𝐕𝐀 𝐃𝐄 𝐑𝐄𝐁𝐀𝐈𝐗𝐀𝐌𝐄𝐍𝐓𝐎 𝐃𝐄𝐓𝐄𝐂𝐓𝐀𝐃𝐀\n> *Tentativa de rebaixar admin sem permissão.*\n\n*ᴏ ᴜsᴜᴀʀɪᴏ ${targetsMentions} ꜰᴏɪ ʀᴇʙᴀɪxᴀᴅᴏ ᴀ ᴍᴇᴍʙʀᴏ. 🤷‍♂️*\n\n*ᴀᴅᴍ ʀᴇsᴘᴏɴsᴀ́ᴠᴇʟ: ${autorMention} 🙅‍♂️*`;

if (!isSuperAdmin && !isDono) {
await safeUpdate(id, [autorReal], 'demote');
await delay(600);
}

for (const t of targetsSemBot) {
if (t === donoJid) continue;
const isTargetSuperAdmin = participantsFresh.some(p =>
(p?.id || p?.jid) === t && p?.admin === 'superadmin'
);
if (!isTargetSuperAdmin) {
await safeUpdate(id, [t], 'demote');
await delay(400);
}
}

await kiimorizinha.sendMessage(id, { text: msgText, mentions }).catch(() => {});
};

async function welcomeProcess(kiimorizinha, event) {
const { id, action, participants } = event;
if (!id || !participants?.length) return;

const isAdd = action === 'add';
const isRemove = action === 'remove' || action === 'leave';
if (!isAdd && !isRemove) return;

const dirPath = `./database/grupos/ATIVAÇÕES-GRUPO/TESTE`;
if (!fs.existsSync(dirPath)) {
fs.mkdirSync(dirPath, { recursive: true });
}

const pathConfig = `${dirPath}/${id}.json`;
if (!fs.existsSync(pathConfig)) return;

let welcomeConfig;
try {
const data = JSON.parse(fs.readFileSync(pathConfig, 'utf-8'));
welcomeConfig = data?.welcome;
if (!welcomeConfig?.status) return;
} catch {
return;
}

const modoAtivo = welcomeConfig.modo;
if (!modoAtivo) return;

const configAtual = welcomeConfig[modoAtivo];
if (!configAtual || !configAtual.ativo) return;

const participantRaw = participants[0];
const participantJid = participantRaw?.phoneNumber || participantRaw?.id || participantRaw;
const participant = normalizarJid(participantJid);
if (!participant) return;

const meta = await getGroupMetadata(kiimorizinha, id);
if (!meta) return;

const pathGp = `./database/grupos/ATIVAÇÕES-GRUPO/${id}.json`;
let gpConfig = {};
try {
const data = JSON.parse(fs.readFileSync(pathGp, 'utf-8'));
gpConfig = Array.isArray(data) ? data[0] : data;
} catch (e) { console.error('[erro]', e) }

const prefixo = gpConfig?.multiprefix ? gpConfig?.prefixos?.[0] : setting?.prefix || '';
const numero = toNum(participant);
const botNum = kiimorizinha.user.id.split(':')[0];
const subject = meta.subject || '';
const desc = meta.desc || '';
const totalMembros = meta.participants?.length || 0;

let pushName = '';
try {
const contact = await kiimorizinha.onWhatsApp(participant);
if (contact && contact[0]?.name) {
pushName = contact[0].name;
}
} catch (e) { console.error('[erro]', e) }
if (!pushName) pushName = numero;

const legendaBase = (txt) => {
if (!txt) return '';
return txt
.replace(/#hora#/g, time)
.replace(/#data#/g, date)
.replace(/#nomedogp#/g, subject)
.replace(/#numerodele#/g, '@' + numero)
.replace(/#nome#/g, pushName)
.replace(/#numerobot#/g, botNum)
.replace(/#prefixo#/g, prefixo)
.replace(/#descrição#/g, desc)
.replace(/#estado#/g, extractStateFromNumber(numero))
.replace(/#totalmembros#/g, totalMembros)
.replace(/#botnome#/g, NomeDoBot)
.replace(/#donobot#/g, setting?.ownerName || 'Dono')
.replace(/#horario#/g, time)
.replace(/#saudacao#/g, getSaudacao());
};

const getSaudacao = () => {
const hora = new Date().getHours();
if (hora >= 0 && hora < 6) return '🌙 Boa madrugada';
if (hora >= 6 && hora < 12) return '🌅 Bom dia';
if (hora >= 12 && hora < 18) return '🌤️ Boa tarde';
return '🌙 Boa noite';
};

const textoEntradaDecorado = `╔₊˚‧︵₊୨ᰔ︵‧˚‧︵ᰔ୨₊︵‧˚₊╗
₊˚‧ ✨ 𝐁𝐄𝐌-𝐕𝐈𝐍𝐃𝐎(𝐀) ✨
╚₊˚‧︵₊୨ᰔ︵‧˚‧︵ᰔ୨₊︵‧˚₊╝
₊˚‧
₊˚‧💫 ${getSaudacao()} ${'@' + numero}!
₊˚‧
₊˚‧  ${emojii} Seja muito bem-vindo(a)
₊˚‧
₊˚‧ Grupo: ${subject}
₊˚‧
₊˚‧ Total de membros: ${totalMembros}
₊˚‧ Bot: ${NomeDoBot}
₊˚‧ Prefixo: ${prefixo}
₊˚‧
╚₊˚‧︵₊୨ᰔ︵‧˚‧︵ᰔ୨₊︵‧˚₊╝
₊˚‧ Regras: Leia a descrição!
₊˚‧${emojii} Divirta-se e interaja!`;

const textoSaidaDecorado = `╔₊˚‧︵₊୨ᰔ︵‧˚‧︵ᰔ୨₊︵‧˚₊╗
₊˚‧   𝐒𝐀𝐈𝐔 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎
╚₊˚‧︵₊୨ᰔ︵‧˚‧︵ᰔ୨₊︵‧˚₊╝
₊˚‧👋 ${'@' + numero}! saiu do grupo
₊˚‧
₊˚‧ Grupo: ${subject}
₊˚‧
₊˚‧ 👥 Total de membros: ${totalMembros}
₊˚‧
₊˚‧ Bot: ${NomeDoBot}
╚₊˚‧︵₊୨ᰔ︵‧˚‧︵ᰔ୨₊︵‧˚₊╝`;

const txtConfigurado = isAdd ? configAtual.legendabv : configAtual.legendasaiu;
const legenda = txtConfigurado ? legendaBase(txtConfigurado) :
(isAdd ? textoEntradaDecorado : textoSaidaDecorado);

let ppimg = 'https://telegra.ph/file/b5427ea4b8701bc47e751.jpg';
if (modoAtivo === 'foto' || modoAtivo === 'audio' || modoAtivo === 'sticker') {
try {
ppimg = await kiimorizinha.profilePictureUrl(participant, 'image');
} catch (e) { console.error('[erro]', e) }
}

let ppimg2 = ppimg;
if (modoAtivo === 'foto') {
try {
const resp = await axios.get(`https://tinyurl.com/api-create.php?url=${ppimg}`);
ppimg2 = resp.data;
} catch (e) { console.error('[erro]', e) }
}

const channelContext = channelnk === "0@newsletter" ? {} : {
isForwarded: true,
forwardingScore: 1,
forwardedNewsletterMessageInfo: {
newsletterJid: channelnk,
newsletterName: NomeDoBot,
serverMessageId: ''
}
};

const contextInfo = {
...channelContext,
mentionedJid: [participant]
};

let ConteudoMsg = { contextInfo };

switch (modoAtivo) {
case 'texto':
ConteudoMsg.text = legenda;
break;

case 'foto':
const FundoImagem = isAdd
? `${ppimg2?.data || ppimg}`
: `${ppimg2?.data || ppimg}`;
ConteudoMsg.image = { url: FundoImagem || ppimg };
ConteudoMsg.caption = legenda;
break;

case 'video':
const FundoVideo = isAdd ? configAtual.urlbv : configAtual.urlsaiu;
if (!FundoVideo) return;
ConteudoMsg.video = { url: FundoVideo };
ConteudoMsg.caption = legenda;
ConteudoMsg.gifPlayback = true;
break;

case 'audio':
const FundoAudio = isAdd ? configAtual.urlbv : configAtual.urlsaiu;
if (!FundoAudio) return;
ConteudoMsg.audio = { url: FundoAudio };
ConteudoMsg.mimetype = 'audio/mp4';
ConteudoMsg.ptt = false;
ConteudoMsg.contextInfo.externalAdReply = {
title: isAdd ? '🎉 BEM-VINDO(A)' : '👋 SAIU DO GRUPO',
body: `${NomeDoBot} — Welcome`,
mediaType: 2,
thumbnailUrl: ppimg2?.data || ppimg
};
break;

case 'sticker':
const urlFinal = isAdd ? configAtual.urlbv : configAtual.urlsaiu;
if (!urlFinal) return;
ConteudoMsg.sticker = { url: urlFinal };
ConteudoMsg.contextInfo.externalAdReply = {
title: isAdd ? '🎉 BEM-VINDO(A)' : '👋 SAIU DO GRUPO',
body: `${NomeDoBot} — Welcome`,
mediaType: 2,
thumbnailUrl: ppimg2?.data || ppimg
};
break;

default:
return;
}

if (ConteudoMsg.text || ConteudoMsg.image || ConteudoMsg.video || ConteudoMsg.audio || ConteudoMsg.sticker) {
try {
await kiimorizinha.sendMessage(id, ConteudoMsg);
} catch (e) { console.error('[erro]', e) }
}
}

async function startPairing(kiimorizinha) {
const phoneNumber = await question(chalk.cyan("Digite o número do WhatsApp que deseja conectar ↴\n--> "));
const numeros = toNum(phoneNumber);

if (!numeros || numeros.length < 11) {
console.log(chalk.red("Número inválido. Insira corretamente, exemplo: 551122334455"));
return;
}

const code = await kiimorizinha.requestPairingCode(numeros);
console.log(chalk.black(chalk.bgGreen(`Seu código de emparelhamento: `)), chalk.black(chalk.white(code)));
console.log(chalk.gray('Vá no whatsapp > dispositivos conectados > conectar um aparelho > conectar com número de telefone'));
}

async function startConnect(mode = 'start') {

if (MODE_DEBUG) {
console.log(chalk.cyan('🔧 Modo DEBUG ativado'));
} else {
console.log(chalk.green('🚀 Modo PRODUÇÃO - Logs de sessão suprimidos'));
}

const { state, saveCreds } = await useMultiFileAuthState(CONFIG.QRCODE_PATH);

const baileysLogger = {
level: MODE_DEBUG ? 'debug' : 'silent',
child: () => baileysLogger,
error: (...args) => {
if (MODE_DEBUG) {
const msg = args.join(' ');
if (!isSessionData(msg) && !SILENCED_PATTERNS.some(p => p.test(msg))) {
console.error(chalk.red('[BAILEYS]'), ...args);
}
}
},
warn: (...args) => {
if (MODE_DEBUG) {
const msg = args.join(' ');
if (!isSessionData(msg) && !SILENCED_PATTERNS.some(p => p.test(msg))) {
console.warn(chalk.yellow('[BAILEYS]'), ...args);
}
}
},
info: (...args) => {
if (MODE_DEBUG) {
const msg = args.join(' ');
if (!isSessionData(msg) && !SILENCED_PATTERNS.some(p => p.test(msg))) {
console.info(chalk.blue('[BAILEYS]'), ...args);
}
}
},
debug: (...args) => {
if (MODE_DEBUG) {
const msg = args.join(' ');
if (!isSessionData(msg) && !SILENCED_PATTERNS.some(p => p.test(msg))) {
console.debug(chalk.gray('[BAILEYS]'), ...args);
}
}
},
trace: (...args) => {
if (MODE_DEBUG) {
const msg = args.join(' ');
if (!isSessionData(msg) && !SILENCED_PATTERNS.some(p => p.test(msg))) {
console.debug(chalk.gray('[BAILEYS TRACE]'), ...args);
}
}
}
};

const kiimorizinha = makeWASocket({
version: [2, 3000, 1044006379],
logger: baileysLogger,
browser: ['Android', 'Samsung Browser', '13.0'],
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, cacheLogger),
},
msgRetryCounterCache: new NodeCache({
stdTTL: 600,
checkperiod: 120,
maxKeys: 500,
}),
generateHighQualityLinkPreview: false,
syncFullHistory: false,
markOnlineOnConnect: false,
emitOwnEvents: false,
shouldIgnoreJid: (jid) => jid?.endsWith('@broadcast'),
connectTimeoutMs: CONFIG.CONNECTION_TIMEOUT,
keepAliveIntervalMs: CONFIG.KEEP_ALIVE_INTERVAL,
retryRequestDelayMs: CONFIG.RETRY_DELAY,
maxMsgRetryCount: CONFIG.MAX_RETRIES,
defaultQueryTimeoutMs: 20000,
transactionOpts: {
maxCommitRetries: CONFIG.MAX_RETRIES,
delayBetweenTriesMs: 500
},
customUploadHosts: ['mmg.whatsapp.net'],
getMessage: async () => undefined,
fireInitQueries: true,
patchMessageBeforeSending: (msg) => msg,
});

const isAuthenticated = state.creds?.me?.id;

if (!isAuthenticated) {
if (mode === 'code') {
setTimeout(() => startPairing(kiimorizinha), 2000);
}

if (mode === 'qr') {
kiimorizinha.ev.on('connection.update', (update) => {
if (update.qr) {
console.log(chalk.cyan("\nESCANEIE O QR PARA CONECTAR:\n"));
qrcodeTerminal.generate(update.qr, { small: true });
console.log(chalk.white("\n• ABRA O WHATSAPP > DISPOSITIVOS CONECTADOS > CONECTAR NOVO APARELHO\n"));
}
});
}
} else {
console.log(colors.green("✓ Sessão existente encontrada. Reconectando automaticamente..."));
}

kiimorizinha.ev.on("creds.update", saveCreds);

kiimorizinha.ev.on("connection.update", async (update) => {
const { connection, lastDisconnect } = update;
const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;

if (connection === 'close') {

if (!MODE_DEBUG && lastDisconnect?.error) {
const errorMsg = String(lastDisconnect.error);
if (isSessionData(errorMsg) || SILENCED_PATTERNS.some(p => p.test(errorMsg))) {
console.log(chalk.yellow('⚠️ Erro de conexão. Reconectando...'));
startConnect(mode);
return;
}
}

if (statusCode) {
const errorMessages = {
401: 'Credenciais inválidas, reconectando...',
403: 'Acesso negado, reconectando...',
408: 'Tempo limite excedido, reconectando...',
411: 'Erro de rede, reconectando...',
428: 'Autenticação necessária, reconectando...',
429: '⚠️ RATE LIMIT! Aguardando 10 segundos...',
440: 'Erro de sessão, reconectando...',
500: 'Erro interno do servidor, reconectando...',
503: 'Serviço indisponível, reconectando...',
515: 'Erro de autenticação, reconectando...'
};

const errorMsg = errorMessages[statusCode] || `Erro: ${lastDisconnect?.error}`;

if (statusCode === 429) {
console.log(chalk.yellow(`⚠️ ${errorMsg}`));
imageCache.purgeExpired();
responseCache.purgeExpired();
groupCache.purgeExpired();
await new Promise(r => setTimeout(r, 10000));
} else {
console.log(colors.red(`[CONNECTION CLOSED] ${errorMsg}`));
}

if (statusCode === 401 || statusCode === 403) {
try {
fs.rmSync(CONFIG.QRCODE_PATH, { recursive: true, force: true });
console.log(colors.yellow("Credenciais removidas. Será necessário autenticar novamente."));
} catch (error) {
console.error(chalk.red('Erro ao remover credenciais:', error));
}
}
startConnect(mode);
}
} else if (connection === 'connecting') {
console.log(`${colors.white("×")} [${colors.bgMagenta(date, time)}] - ${colors.white('Conectando...')}`);
} else if (connection === 'open') {
console.log(colors.magenta(banner3));
console.log(colors.magenta(banner2));
console.log(colors.white('Conectado com sucesso!'));

try {
const marcadorUpdatePath = require('path').join(process.cwd(), 'database', 'update-pendente.json');
if (require('fs').existsSync(marcadorUpdatePath)) {
const infoUpdate = JSON.parse(require('fs').readFileSync(marcadorUpdatePath, 'utf-8'));
await kiimorizinha.sendMessage(infoUpdate.from, {
text: `*✅ ᴀᴛᴜᴀʟɪᴢᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴘᴀʀᴀ ${infoUpdate.versaoNova}!*\n\n(${infoUpdate.versaoAntiga} ➜ ${infoUpdate.versaoNova})\nO bot reiniciou e já está online de novo.`
});
require('fs').unlinkSync(marcadorUpdatePath);
}
} catch (e) {
console.error('[UPDATE] erro ao checar marcador pendente:', e);
}

monitor.start();

if (MODE_DEBUG) {
console.log(chalk.cyan(`Cache: ${imageCache.size} imagens, ${responseCache.size} respostas`));
console.log(chalk.cyan(`Heap: ${heapMB()} MB`));
}

if (mode !== 'code') {
rl.close();
}
}
});

const limit = pLimit(CONFIG.MAX_CONCURRENT);

const throttledMessageHandler = throttle(async (upsert) => {
await rateLimiter.acquire();

try {
const startconexao = require('../kimori.js');
await startconexao(upsert, kiimorizinha, CONFIG.QRCODE_PATH);
} catch (error) {
if (error?.message?.includes('429')) {
console.log(chalk.yellow('Rate limit detectado, aguardando...'));
await new Promise(r => setTimeout(r, 5000));
}
console.error(chalk.red('Erro ao processar mensagem:', error));
}
}, CONFIG.EVENT_THROTTLE_MS);

kiimorizinha.ev.on("messages.upsert", (upsert) => {
limit(async () => {
await throttledMessageHandler(upsert);
}).catch(error => {
console.error(chalk.red('Erro no processamento:', error));
});
});

kiimorizinha.ev.on('group-participants.update', async (event) => {
const { id, action, participants } = event;
if (!id?.endsWith('@g.us')) return;
if (!participants || participants.length === 0) return;

groupCache.delete('group:' + id);
if (global.groupCache) global.groupCache.delete(id); // invalida o cache de admins/membros usado no kimori.js

const pathAtiv = `./database/grupos/ATIVAÇÕES-GRUPO/${id}.json`;
if (!fs.existsSync(pathAtiv)) return;

let config;
try {
const data = readJSONCached(pathAtiv, {});
config = Array.isArray(data) ? data[0] : data;
} catch { return; }

const meta = await getGroupMetadata(kiimorizinha, id);
if (!meta) return;

const participantRaw = participants[0];
const participantJid = participantRaw?.phoneNumber || participantRaw?.id || participantRaw;
const participant = normalizarJid(participantJid);
if (!participant) return;

const botNum = kiimorizinha.user.id.split(':')[0];
if (participant.startsWith(botNum)) return;

await rateLimiter.acquire();

if (config?.antiroubo) {
await antiRouboProcess(kiimorizinha, event);
}

if (action === 'add') {
const isBlacklisted =
global.nescessario?.listanegraG?.includes(participant) ||
config?.listanegra?.includes(participant);
if (isBlacklisted) {
await kiimorizinha.sendMessage(id, {
text: mess.blackList?.(meta, event) || 'Usuário na lista negra!',
mentions: [participant]
});
return kiimorizinha.groupParticipantsUpdate(id, [participant], 'remove');
}
}

if (action === 'add') {
if (config?.antifake && !participant.startsWith('55')) {
if (config?.legenda_estrangeiro && config.legenda_estrangeiro !== "0") {
await kiimorizinha.sendMessage(id, { text: config.legenda_estrangeiro });
}
setTimeout(() => kiimorizinha.groupParticipantsUpdate(id, [participant], 'remove'), 1000);
return;
}

if (config?.ANTI_DDD?.active &&
config?.ANTI_DDD?.listaProibidos?.includes(extractDDD(toNum(participant)))) {
await kiimorizinha.sendMessage(id, {
text: mess.forbiddenStateFromDDD?.(participant, extractStateFromDDD, extractDDD) || 'DDD proibido!',
mentions: [participant]
});
setTimeout(() => kiimorizinha.groupParticipantsUpdate(id, [participant], 'remove'), 1000);
return;
}
}

if (['remove', 'leave', 'ban'].includes(action) && participants?.length) {
parceriaManager.cleanParticipants(id, participants);
}

if (action === 'add' || action === 'remove' || action === 'leave') {
await welcomeProcess(kiimorizinha, event);
}
});

kiimorizinha.ev.on('error', (error) => {
const errorMsg = error?.message || String(error) || '';

if (!MODE_DEBUG) {
if (isSessionData(errorMsg) || SILENCED_PATTERNS.some(pattern => pattern.test(errorMsg))) {
return;
}
}

if (error?.message?.includes('429')) {
console.log(chalk.yellow('Rate limit error no socket'));
} else if (MODE_DEBUG) {
console.error(chalk.red('Erro no socket:'), error);
}
});

return kiimorizinha;
}

if (!MODE_DEBUG) {
process.on('unhandledRejection', (reason, promise) => {
const msg = reason?.message || String(reason) || '';
if (!isSessionData(msg) && !SILENCED_PATTERNS.some(pattern => pattern.test(msg))) {
console.error(chalk.red('Unhandled Rejection:'), reason);
}
});

process.on('uncaughtException', (error) => {
const msg = error?.message || String(error) || '';
if (!isSessionData(msg) && !SILENCED_PATTERNS.some(pattern => pattern.test(msg))) {
console.error(chalk.red('Uncaught Exception:'), error);
}

if (isSessionData(msg) || SILENCED_PATTERNS.some(pattern => pattern.test(msg))) {
return;
}
process.exit(1);
});
}

const args = process.argv.slice(2);
let mode = 'start';
if (args.includes('--code') || args.includes('-c')) mode = 'code';
else if (args.includes('--qr') || args.includes('-q')) mode = 'qr';

if (args.includes('--help') || args.includes('-h')) {
console.log(chalk.cyan(`
╔════════════════════════════╗
║          CONNECT.JS - HELP
╠════════════════════════════╣
║  --debug, -d Ativa modo debug
║  --code, -cConectar com código
║  --qr, -qConectar com QR
║  --help, -hMostra esta ajuda
╚════════════════════════════╝
`));
process.exit(0);
}

startConnect(mode).catch(error => {
const msg = error?.message || String(error) || '';
if (!isSessionData(msg) && !SILENCED_PATTERNS.some(p => p.test(msg))) {
console.log(colors.red("❌ Erro ao inicializar: " + error.message));
if (MODE_DEBUG) {
console.log(colors.gray(error.stack));
}
}
});

module.exports = {
startConnect,
CONFIG,
MODE_DEBUG,
isDebugMode,
imageCache,
responseCache,
bufferCache,
groupCache,
getImageCached,
writeJSONDebounced,
readJSONCached,
getGroupMetadata,
normalizarJid,
rateLimiter,
monitor,
throttle,
debounce,
heapMB,
forceCleanup: () => monitor.forceCleanup(),
memReport: () => monitor.report(),
};