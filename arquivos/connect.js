import './funcoes/garantirArquivos.js'; // precisa ser o primeiro import
import { limpezaEmergencia } from './funcoes/limpezaDisco.js'; // limpeza de temporários + proteção contra disco cheio
import { useAtomicAuthState } from './funcoes/authState.js';
import fs from 'node:fs';
import path from 'node:path';
import v8 from 'node:v8';
import pLimit from 'p-limit';
import NodeCache from 'node-cache';
import makeWASocket, { makeCacheableSignalKeyStore, fetchLatestBaileysVersion, delay } from '@whiskeysockets/baileys';
import qrcodeTerminal from 'qrcode-terminal';
import chalk from 'chalk';
import __boom from '@hapi/boom';
import axios from 'axios';
import { readline, colors, banner2, banner3, getGroupAdmins, mess, setting, extractDDD, nescessario, extractStateFromNumber, extractStateFromDDD, agoraHora, agoraData } from './funcoes/exports.js';
import { getCached } from './funcoes/database.js';
import { fileURLToPath, pathToFileURL } from 'node:url';
import kimoriInicial from '../kimori.js';
import { initCommands } from './funcoes/commandLoader.js';
import { ajustarMencoes } from './funcoes/mencoes.js';
import { loadJSON } from './funcoes/jsonCache.js';
import { iniciarAvisoDeAtualizacao } from './funcoes/kimoriUpdate.js';
const __json_config = loadJSON(new URL('../config-bot/config.json', import.meta.url));
const __json_package = loadJSON(new URL('../package.json', import.meta.url));

const isDebugMode = process.argv.includes('--debug') || process.argv.includes('-d');
const MODE_DEBUG = isDebugMode;

const VERSION = __json_package.version || '1.0.0';

const { Boom } = __boom;

// versão do WhatsApp usada se não der pra buscar a mais recente
const WA_VERSION_FALLBACK = [2, 3000, 1044006379];

// lidos na hora de usar (mudanças pelos comandos valem sem reiniciar).
// Antes usava "channelnk", que não existe no config.json (o certo é "channell").
const cfg = () => __json_config;

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

// Só mensagens internas do libsignal/sessão. Antes havia padrões genéricos (/key/, /used/, /Buffer/,
// /sign/, /closed/...) que escondiam erros reais do bot, como "Cannot read properties of undefined (reading 'key')".
const SILENCED_PATTERNS = [
/Bad MAC/i,
/Bad Mac Error/i,
/Failed to decrypt message/i,
/Closing session/i,
/Closing open session/i,
/Closing stale open session/i,
/Session error/i,
/SessionEntry/i,
/No session found/i,
/No matching sessions found/i,
/Invalid PreKey ID/i,
/MessageCounterError/i,
/Key used already or never filled/i,
/Over \d+ messages into the future/i,
/decryptWithSessions/i,
/doDecryptWhisperMessage/i,
/verifyMAC/i,
/libsignal/i
];

// uma regex só (antes eram 18 testes por console.log, e o bot imprime várias linhas por mensagem)
const SILENCED_RE = new RegExp(SILENCED_PATTERNS.map(p => p.source).join('|'), 'i');

// Dump de sessão do libsignal (objetos SessionEntry impressos no console)
const isSessionData = (str) => {
if (!str) return false;
return str.includes('SessionEntry') || (str.includes('_chains') && str.includes('currentRatchet')) || (str.includes('ephemeralKeyPair') && str.includes('rootKey'));
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
return SILENCED_RE.test(str);
};

console.log = function(...args) {
const message = args.length === 1 && typeof args[0] === 'string' ? args[0] : args.map(a => typeof a === 'string' ? a : (a?.message || a?.stack || String(a))).join(' ');
if (!shouldSuppress(message)) {
originalConsole.log.apply(console, args);
}
};

console.error = function(...args) {
const message = args.length === 1 && typeof args[0] === 'string' ? args[0] : args.map(a => typeof a === 'string' ? a : (a?.message || a?.stack || String(a))).join(' ');
if (!shouldSuppress(message)) {
originalConsole.error.apply(console, args);
}
};

console.warn = function(...args) {
const message = args.length === 1 && typeof args[0] === 'string' ? args[0] : args.map(a => typeof a === 'string' ? a : (a?.message || a?.stack || String(a))).join(' ');
if (!shouldSuppress(message)) {
originalConsole.warn.apply(console, args);
}
};

console.info = function(...args) {
const message = args.length === 1 && typeof args[0] === 'string' ? args[0] : args.map(a => typeof a === 'string' ? a : (a?.message || a?.stack || String(a))).join(' ');
if (!shouldSuppress(message)) {
originalConsole.info.apply(console, args);
}
};

console.debug = function(...args) {
const message = args.length === 1 && typeof args[0] === 'string' ? args[0] : args.map(a => typeof a === 'string' ? a : (a?.message || a?.stack || String(a))).join(' ');
if (!shouldSuppress(message)) {
originalConsole.debug.apply(console, args);
}
};

console.trace = function(...args) {
const message = args.length === 1 && typeof args[0] === 'string' ? args[0] : args.map(a => typeof a === 'string' ? a : (a?.message || a?.stack || String(a))).join(' ');
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

// cache de uploads de mídia do Baileys (1 h); o /fotomenu limpa ao trocar a imagem
global.__kimoriMediaCache ??= new NodeCache({ stdTTL: 3600, checkperiod: 600, useClones: false, maxKeys: 500 });
const mediaCache = global.__kimoriMediaCache;

const heapMB = () => Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
const toNum = (v) => String(v || '').replace(/\D/g, '');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise(resolve => rl.question(text, resolve));

function throttle(fn, intervalMs = CONFIG.EVENT_THROTTLE_MS) {
// OBS: a versão antiga usava clearTimeout(timeout) para cancelar a chamada
// pendente sempre que uma nova mensagem chegava dentro do intervalo, ou seja,
// se 2+ mensagens/eventos chegassem em rajada, só a ÚLTIMA era processada e
// as anteriores eram DESCARTADAS (nunca apareciam no terminal, nem eram
// respondidas). Agora todas as chamadas são enfileiradas e processadas em
// ordem, sem perder nenhuma.
let lastCall = 0;
let timeout = null;
let queue = [];
const flush = () => {
timeout = null;
lastCall = Date.now();
const pending = queue;
queue = [];
for (const args of pending) fn.apply(null, args);
};
return function (...args) {
const now = Date.now();
if (now - lastCall >= intervalMs && !timeout) {
lastCall = now;
return fn.apply(this, args);
} else {
queue.push(args);
if (!timeout) {
timeout = setTimeout(flush, intervalMs - (now - lastCall));
}
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

// Mantém LID como LID (antes "123@lid" virava "123@s.whatsapp.net", um número que não existe)
const normalizarJid = (alvo) => {
if (!alvo) return null;
let s = String(alvo).trim();
if (s.includes(':')) s = s.replace(/:\d+(?=@)/, '');
if (s.endsWith('@s.whatsapp.net') || s.endsWith('@lid')) return s;
if (!s.includes('@')) {
const numeros = s.replace(/\D/g, '');
return numeros && numeros.length >= 8 ? numeros + '@s.whatsapp.net' : null;
}
return s;
};

// Resolve um participante do evento para { jid, telefone }.
// jid = o que o grupo usa (LID ou número) para mencionar; telefone = só dígitos, se for possível saber.
const resolverParticipante = (raw, meta) => {
const id = normalizarJid(raw?.id || raw?.jid || raw);
let telefoneJid = raw?.phoneNumber ? normalizarJid(raw.phoneNumber) : null;
if (!telefoneJid && id?.endsWith('@lid')) {
const p = (meta?.participants || []).find(x => x?.id === id || x?.lid === id);
const pn = p?.phoneNumber || p?.jid;
if (pn && !String(pn).endsWith('@lid')) telefoneJid = normalizarJid(pn);
}
if (!telefoneJid && id?.endsWith('@s.whatsapp.net')) telefoneJid = id;
return { jid: id, telefone: telefoneJid ? toNum(telefoneJid.split('@')[0]) : null };
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
// caminho corrigido: o arquivo fica em database/func/
const CONFIG_PATH = './database/func/parceria.json';

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
const data = getCached(pathAtiv, {});
config = Array.isArray(data) ? data[0] : data;
if (!config?.antiroubo) return;
} catch { return; }

const meta = await getGroupMetadata(kiimorizinha, id);
if (!meta) return;

const participantsFresh = meta.participants || [];

// Tudo é comparado pelos dígitos de id / lid / telefone. Antes comparava "telefone@s.whatsapp.net"
// com a lista de admins, que em grupo com LID só tem "...@lid": o anti-roubo nunca agia.
const digitos = (x) => String(x || '').split('@')[0].split(':')[0].replace(/\D/g, '');
const acharParticipante = (raw) => {
const d = digitos(raw?.id || raw?.phoneNumber || raw);
if (!d) return null;
return participantsFresh.find(p => [p?.id, p?.lid, p?.phoneNumber, p?.jid].some(x => x && digitos(x) === d)) || null;
};
const idsDe = (p, raw) => new Set([p?.id, p?.lid, p?.phoneNumber, p?.jid, raw?.id, raw?.phoneNumber, typeof raw === 'string' ? raw : null].filter(Boolean).map(digitos).filter(Boolean));
const botDig = new Set([digitos(kiimorizinha.user?.id), digitos(kiimorizinha.user?.lid)].filter(Boolean));
const donoDig = new Set([setting?.ownerNumber, setting?.ownerNumberLid, ...[1, 2, 3, 4, 5, 6].map(i => nescessario?.['numero_dono' + i])].map(digitos).filter(d => d.length > 5));
const ehBot = (ids) => [...ids].some(d => botDig.has(d));
const ehDono = (ids) => [...ids].some(d => donoDig.has(d));

const autorRaw = author || event.participant || event.actor;
const autorP = acharParticipante(autorRaw);
const autorIds = idsDe(autorP, autorRaw);
const autorReal = autorP?.id || normalizarJid(autorRaw?.id || autorRaw);
const alvos = participants.map(raw => {
const p = acharParticipante(raw);
return { jid: p?.id || normalizarJid(raw?.id || raw?.phoneNumber || raw), ids: idsDe(p, raw), p };
}).filter(a => a.jid && !ehBot(a.ids));

if (!autorReal || alvos.length === 0) return;

const isDono = ehDono(autorIds);
const isBot = ehBot(autorIds);
const isSuperAdmin = autorP?.admin === 'superadmin';
if (isDono || isSuperAdmin || isBot) return;

const permitidos = new Set([...(config.ar_permitidos || []), ...(config.ar_permitidos_lid || [])].map(toNum).filter(Boolean));
if ([...autorIds].some(d => permitidos.has(d))) return;

const botP = participantsFresh.find(p => [p?.id, p?.lid, p?.phoneNumber].some(x => x && botDig.has(digitos(x))));
if (!(botP?.admin === 'admin' || botP?.admin === 'superadmin')) return;

const safeUpdate = async (jid, parts, act) => {
try {
return await kiimorizinha.groupParticipantsUpdate(jid, parts, act);
} catch { return null; }
};

const mentions = [autorReal, ...alvos.map(a => a.jid)];
const autorMention = '@' + digitos(autorReal);
const targetsMentions = alvos.map(a => '@' + digitos(a.jid)).join(' ');

const msgText = action === 'promote'
? `🗣️ 𝐓𝐄𝐍𝐓𝐀𝐓𝐈𝐕𝐀 𝐃𝐄 𝐏𝐑𝐎𝐌𝐎𝐂𝐀𝐎 𝐃𝐄𝐓𝐄𝐂𝐓𝐀𝐃𝐀\n> *Tentativa de promover admin sem permissão.*\n\n*ᴏ ᴜsᴜᴀʀɪᴏ ${targetsMentions} ꜰᴏɪ ʀᴇʙᴀɪxᴀᴅᴏ ᴀ ᴍᴇᴍʙʀᴏ. 🤷‍♂️*\n\n*ᴀᴅᴍ ʀᴇsᴘᴏɴsᴀ́ᴠᴇʟ: ${autorMention} 🙅‍♂️*`
: `‼️ 𝐓𝐄𝐍𝐓𝐀𝐓𝐈𝐕𝐀 𝐃𝐄 𝐑𝐄𝐁𝐀𝐈𝐗𝐀𝐌𝐄𝐍𝐓𝐎 𝐃𝐄𝐓𝐄𝐂𝐓𝐀𝐃𝐀\n> *Tentativa de rebaixar admin sem permissão.*\n\n*ᴏ ᴀᴅᴍ ${targetsMentions} ꜰᴏɪ ʀᴇsᴛᴀᴜʀᴀᴅᴏ. ✅*\n\n*ᴀᴅᴍ ʀᴇsᴘᴏɴsᴀ́ᴠᴇʟ (ʀᴇʙᴀɪxᴀᴅᴏ): ${autorMention} 🙅‍♂️*`;

await safeUpdate(id, [autorReal], 'demote');
await delay(600);

// promoção indevida: desfaz (rebaixa quem foi promovido).
// rebaixamento indevido: devolve o admin (antes "rebaixava" de novo quem já tinha sido rebaixado).
const acaoAlvos = action === 'promote' ? 'demote' : 'promote';
for (const a of alvos) {
if (acaoAlvos === 'demote' && (ehDono(a.ids) || a.p?.admin === 'superadmin')) continue;
await safeUpdate(id, [a.jid], acaoAlvos);
await delay(400);
}

await kiimorizinha.sendMessage(id, { text: msgText, mentions }).catch(() => {});
};

async function welcomeProcess(kiimorizinha, event) {
const { id, action, participants } = event;
const { NomeDoBot, emojii, channell: channelnk } = cfg();
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
const data = getCached(pathConfig);
welcomeConfig = data?.welcome;
if (!welcomeConfig?.status) return;
} catch {
return;
}

const modoAtivo = welcomeConfig.modo;
if (!modoAtivo) return;

const configAtual = welcomeConfig[modoAtivo];
if (!configAtual || !configAtual.ativo) return;

const meta = await getGroupMetadata(kiimorizinha, id);
if (!meta) return;

// JID usado pelo grupo (LID ou número): é ele que precisa ir na menção
const { jid: participant, telefone } = resolverParticipante(participants[0], meta);
if (!participant) return;

const pathGp = `./database/grupos/ATIVAÇÕES-GRUPO/${id}.json`;
let gpConfig = {};
try {
const data = fs.existsSync(pathGp) ? getCached(pathGp) : {};
gpConfig = (Array.isArray(data) ? data[0] : data) || {};
} catch (e) { console.error('[erro]', e) }

const prefixo = gpConfig?.multiprefix ? gpConfig?.prefixos?.[0] : setting?.prefix || '';
const numero = toNum(participant.split('@')[0]);
const botNum = kiimorizinha.user.id.split(':')[0];
const time = agoraHora();
const date = agoraData();
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
.replace(/#estado#/g, extractStateFromNumber(telefone || ''))
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

const channelContext = (!channelnk || channelnk === "0@newsletter") ? {} : {
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

// O número é perguntado UMA vez e reaproveitado nas reconexões (antes, se a conexão caísse
// enquanto a pessoa digitava, o código era pedido num socket já fechado e nada acontecia;
// e um número inválido encerrava o pareamento sem perguntar de novo).
let numeroPareamento = null;
let perguntaPareamento = null;
let socketAtual = null;

// Na host (Pterodactyl) o número pode vir da variável NUMERO_BOT do egg: aí nem precisa digitar.
function numeroDaHost() {
const n = toNum(process.env.NUMERO_BOT || process.env.BOT_NUMBER || '');
return n.length >= 10 ? n : null;
}

async function perguntarNumero() {
const daHost = numeroDaHost();
if (daHost) {
console.log(chalk.cyan(`Número do bot pego da variável NUMERO_BOT: ${daHost}`));
return daHost;
}
// O console do Pterodactyl só mostra linha completa: a pergunta termina com quebra de linha
// (sem isso o "-->" ficava invisível) e é repetida enquanto ninguém responde, pra não sumir no meio dos logs.
const PERGUNTA = '\n════════════════════════════════════════\n' +
'  DIGITE O NÚMERO DO WHATSAPP DO BOT (com DDI e DDD)\n' +
'  Exemplo: 5511999998888  → e aperte Enter\n' +
'════════════════════════════════════════\n';
while (true) {
let phoneNumber;
const lembrete = setInterval(() => console.log(chalk.cyan(PERGUNTA)), 30000);
try {
phoneNumber = await question(chalk.cyan(PERGUNTA));
clearInterval(lembrete);
} catch {
clearInterval(lembrete);
// terminal sem entrada (ex.: rodando em segundo plano): não tem como perguntar
console.log(chalk.red('Não consigo ler o número: o terminal não aceita digitação. Coloque o número na variável NUMERO_BOT (na host: aba Startup) ou rode num terminal interativo.'));
return new Promise(() => {});
}
const numeros = toNum(phoneNumber);
if (numeros && numeros.length >= 10) return numeros;
console.log(chalk.red("Número inválido. Insira corretamente, exemplo: 551122334455"));
}
}

async function startPairing(kiimorizinha) {
if (kiimorizinha.authState?.creds?.registered) return;
if (!numeroPareamento) {
perguntaPareamento ??= perguntarNumero();
numeroPareamento = await perguntaPareamento;
}
if (kiimorizinha !== socketAtual) return; // a conexão foi trocada enquanto esperava: a nova pede o código
try {
const code = await kiimorizinha.requestPairingCode(numeroPareamento);
console.log(chalk.black(chalk.bgGreen(`Seu código de emparelhamento: `)), chalk.black(chalk.white(code)));
console.log(chalk.gray('Vá no whatsapp > dispositivos conectados > conectar um aparelho > conectar com número de telefone'));
} catch (e) {
console.log(chalk.red('Não consegui gerar o código de pareamento:'), e?.message || e);
}
}

// Reconexão com espera crescente (2 s, 4 s, 8 s... até 60 s) e sem abrir duas conexões ao mesmo tempo
let reconectando = null;
let tentativasReconexao = 0;
function agendarReconexao(mode, esperaMs) {
if (reconectando) return;
tentativasReconexao++;
const espera = esperaMs ?? Math.min(60000, 2000 * 2 ** Math.min(tentativasReconexao - 1, 5));
reconectando = setTimeout(() => {
reconectando = null;
startConnect(mode).catch(e => {
console.error(chalk.red('Falha ao reconectar:'), e?.message || e);
agendarReconexao(mode);
});
}, espera);
}

async function startConnect(mode = 'start') {

if (MODE_DEBUG) {
console.log(chalk.cyan('🔧 Modo DEBUG ativado'));
} else {
console.log(chalk.green('🚀 Modo PRODUÇÃO - Logs de sessão suprimidos'));
}

// gravação atômica: um disco cheio não corrompe mais o creds.json (antes o bot perdia a sessão)
const { state, saveCreds } = await useAtomicAuthState(CONFIG.QRCODE_PATH);

// versão atual do WhatsApp Web (uma versão fixa desatualizada faz a conexão falhar com 405)
let waVersion = WA_VERSION_FALLBACK;
try {
const { version } = await fetchLatestBaileysVersion();
if (Array.isArray(version) && version.length === 3) waVersion = version;
} catch (e) {
if (MODE_DEBUG) console.log(chalk.yellow('Não consegui buscar a versão do WhatsApp, usando a padrão.'));
}

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
version: waVersion,
logger: baileysLogger,
browser: ['Android', 'Samsung Browser', '13.0'],
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, cacheLogger),
},
// Sem isto o Baileys buscava os metadados do grupo no servidor A CADA mensagem enviada
// num grupo (uma ida e volta extra por resposta). Agora usa o cache que o bot já mantém.
cachedGroupMetadata: async (jid) => groupCache.get('group:' + jid) || global.groupCache?.get(jid)?.data || undefined,
// mídia enviada por { url } (menu, ping, brincadeiras...) é enviada ao WhatsApp 1x e reaproveitada
mediaCache,
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
// devolve a mensagem guardada para o WhatsApp reenviar quando o destinatário pede retry
// (antes devolvia sempre undefined e algumas mensagens ficavam em "Aguardando mensagem")
getMessage: async (key) => {
const id = key?.id;
if (!id) return undefined;
const daStore = (store) => {
const item = store?.get?.(id);
if (!item) return undefined;
return item.msg?.message || item.msg;
};
return daStore(global.__kimoriSentStore) || daStore(global.__kimoriMsgStore) || undefined;
},
fireInitQueries: true,
patchMessageBeforeSending: (msg) => msg,
});

socketAtual = kiimorizinha;

// Todo envio passa pelo ajuste de menções (LID x telefone, nulos, "@numero" sem marcação).
// Fica aqui (e não no kimori.js) para valer também para boas-vindas, anti-roubo etc.
const enviarOriginal = kiimorizinha.sendMessage.bind(kiimorizinha);
kiimorizinha.sendMessage = (jid, conteudo, ...resto) => {
try {
if (String(jid || '').endsWith('@g.us')) {
const meta = groupCache.get('group:' + jid) || global.groupCache?.get(jid)?.data;
conteudo = ajustarMencoes(jid, conteudo, meta?.participants || []);
} else {
conteudo = ajustarMencoes(jid, conteudo, []);
}
} catch (e) {
console.error('[MENÇÕES]', e?.message || e);
}
return enviarOriginal(jid, conteudo, ...resto).catch(async (erro) => {
// Mídia por link que não baixa (link morto, site fora do ar): antes o comando dava erro e
// ninguém recebia nada. Agora avisa no terminal qual link falhou e manda pelo menos o texto.
const tipo = ['image', 'video', 'sticker', 'audio', 'document'].find(k => conteudo && typeof conteudo === 'object' && k in conteudo);
const url = tipo && conteudo[tipo]?.url;
// buffer válido que falhou é outro problema (rede/WhatsApp): não mascara
if (!tipo || (Buffer.isBuffer(conteudo[tipo]) && conteudo[tipo].length)) throw erro;
console.error(chalk.yellow(`[MÍDIA] não consegui enviar ${tipo}${url ? ` (${String(url).slice(0, 120)})` : ''}: ${erro?.message || erro}`));
const texto = conteudo.caption || conteudo.text;
if (!texto) throw erro;
const { [tipo]: _midia, caption, gifPlayback, mimetype, fileName, ptt, jpegThumbnail, ...resto2 } = conteudo;
return enviarOriginal(jid, { ...resto2, text: texto }, ...resto);
});
};
// Só "registered" garante que o pareamento terminou. Antes também valia creds.me.id, que fica salvo
// quando um pareamento é interrompido no meio: aí o bot achava que já estava conectado e nunca
// mais pedia o número (o campo do número "sumia").
const isAuthenticated = !!state.creds?.registered;

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
agendarReconexao(mode, 2000);
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
if (statusCode === 440) {
// sessão aberta em outro lugar: reconectar na hora faz as duas instâncias se derrubarem em loop
console.log(colors.yellow('Sessão substituída (outra instância conectada com este número). Tentando de novo em 60 s...'));
agendarReconexao(mode, 60000);
return;
}
agendarReconexao(mode);
} else {
agendarReconexao(mode);
}
} else if (connection === 'connecting') {
console.log(`${colors.white("×")} [${colors.bgMagenta(agoraData(), agoraHora())}] - ${colors.white('Conectando...')}`);
} else if (connection === 'open') {
console.log(colors.magenta(banner3));
console.log(colors.magenta(banner2));
console.log(colors.white('Conectado com sucesso!'));
tentativasReconexao = 0;

try {
const marcadorUpdatePath = path.join(process.cwd(), 'database', 'update-pendente.json');
if (fs.existsSync(marcadorUpdatePath)) {
const infoUpdate = JSON.parse(fs.readFileSync(marcadorUpdatePath, 'utf-8'));
await kiimorizinha.sendMessage(infoUpdate.from, {
text: `*✅ ᴀᴛᴜᴀʟɪᴢᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴘᴀʀᴀ ${infoUpdate.versaoNova}!*\n\n(${infoUpdate.versaoAntiga} ➜ ${infoUpdate.versaoNova})\nO bot reiniciou e já está online de novo.`
});
fs.unlinkSync(marcadorUpdatePath);
}
} catch (e) {
console.error('[UPDATE] erro ao checar marcador pendente:', e);
}

monitor.start();

// confere se saiu versão nova da Kimori e avisa o dono no privado (1x por versão)
iniciarAvisoDeAtualizacao(kiimorizinha);

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

// Processa cada evento na hora, com limite de concorrência.
// Antes passava por um throttle de 500 ms + rate limiter, o que atrasava as respostas em rajadas.
kiimorizinha.ev.on("messages.upsert", (upsert) => {
limit(async () => {
await kimoriHandler(upsert, kiimorizinha, CONFIG.QRCODE_PATH);
}).catch(error => {
if (error?.code === 'ENOSPC') limpezaEmergencia('ENOSPC');
console.error(chalk.red('Erro ao processar mensagem:'), error);
});
});

// Anti-ligação: registrado uma única vez por conexão (antes era a cada mensagem no privado)
kiimorizinha.ev.on('call', async (calls) => {
if (!nescessario?.anticall) return;
const donoNum = toNum(setting?.ownerNumber);
for (const call of calls || []) {
if (call?.status !== 'offer' || call?.isGroup) continue;
const deQuem = call.from || call.chatId;
if (!deQuem || (donoNum && toNum(String(deQuem).split('@')[0]) === donoNum)) continue;
try {
if (typeof kiimorizinha.rejectCall === 'function') await kiimorizinha.rejectCall(call.id, deQuem);
await kiimorizinha.updateBlockStatus(deQuem, 'block');
} catch (e) {
console.error('[ANTI-LIGAÇÃO]', e?.message || e);
}
}
});

// nome/descrição/config do grupo mudou: invalida o cache de metadados
kiimorizinha.ev.on('groups.update', (updates) => {
for (const u of updates || []) {
if (!u?.id) continue;
groupCache.delete('group:' + u.id);
if (global.groupCache) global.groupCache.delete(u.id);
}
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
const data = getCached(pathAtiv, {});
config = Array.isArray(data) ? data[0] : data;
} catch { return; }

const meta = await getGroupMetadata(kiimorizinha, id);
if (!meta) return;

const botNum = kiimorizinha.user.id.split(':')[0].split('@')[0];
const botLid = String(kiimorizinha.user?.lid || '').split(':')[0].split('@')[0];

if (config?.antiroubo) {
await antiRouboProcess(kiimorizinha, event).catch(e => console.error('[ANTIROUBO]', e));
}

// trata todos os participantes do evento (antes só o primeiro)
for (const participantRaw of participants) {
try {
const { jid: participant, telefone } = resolverParticipante(participantRaw, meta);
if (!participant) continue;
const numJid = participant.split('@')[0];
if (numJid === botNum || (botLid && numJid === botLid) || telefone === botNum) continue;

if (action === 'add') {
const listaNegra = [...(nescessario?.listanegraG || []), ...(config?.listanegra || [])].map(x => toNum(String(x).split('@')[0]));
const isBlacklisted = listaNegra.includes(numJid) || (telefone && listaNegra.includes(telefone));
if (isBlacklisted) {
await kiimorizinha.sendMessage(id, {
text: mess.blackList?.(meta, { ...event, participants: [participant] }) || 'Usuário na lista negra!',
mentions: [participant]
});
await kiimorizinha.groupParticipantsUpdate(id, [participant], 'remove');
continue;
}

// antifake só quando dá pra saber o telefone (um LID sem telefone não começa com 55 e era removido)
if (config?.antifake && telefone && !telefone.startsWith('55')) {
if (config?.legenda_estrangeiro && config.legenda_estrangeiro !== "0") {
await kiimorizinha.sendMessage(id, { text: config.legenda_estrangeiro });
}
setTimeout(() => kiimorizinha.groupParticipantsUpdate(id, [participant], 'remove').catch(() => {}), 1000);
continue;
}

if (config?.ANTI_DDD?.active && telefone &&
config?.ANTI_DDD?.listaProibidos?.includes(extractDDD(telefone))) {
await kiimorizinha.sendMessage(id, {
text: mess.forbiddenStateFromDDD?.(participant, extractStateFromDDD, extractDDD) || 'DDD proibido!',
mentions: [participant]
});
setTimeout(() => kiimorizinha.groupParticipantsUpdate(id, [participant], 'remove').catch(() => {}), 1000);
continue;
}
}

if (['remove', 'leave', 'ban'].includes(action)) {
parceriaManager.cleanParticipants(id, [participantRaw]);
}

if (action === 'add' || action === 'remove' || action === 'leave') {
await welcomeProcess(kiimorizinha, { ...event, participants: [participantRaw] });
}
} catch (e) {
console.error('[GRUPO] erro ao tratar participante:', e);
}
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
if (reason?.code === 'ENOSPC') limpezaEmergencia('ENOSPC');
if (!isSessionData(msg) && !SILENCED_RE.test(msg)) {
console.error(chalk.red('Unhandled Rejection:'), reason);
}
});

}

// Um erro solto (ex.: dentro de um setTimeout de algum comando) não derruba mais o bot na hora:
// registra e só reinicia (start.sh sobe de novo) se acontecerem muitos seguidos, sinal de estado quebrado.
const errosRecentes = [];
process.on('uncaughtException', (error) => {
const msg = error?.message || String(error) || '';
if (isSessionData(msg) || SILENCED_PATTERNS.some(pattern => pattern.test(msg))) return;
console.error(chalk.red('Uncaught Exception:'), error);
if (error?.code === 'ENOSPC') limpezaEmergencia('ENOSPC');
const agora = Date.now();
errosRecentes.push(agora);
while (errosRecentes.length && agora - errosRecentes[0] > 60000) errosRecentes.shift();
if (errosRecentes.length >= 10) {
console.error(chalk.red('Muitos erros seguidos em 1 minuto. Reiniciando...'));
process.exit(1);
}
});
if (MODE_DEBUG) {
process.on('unhandledRejection', (reason) => console.error(chalk.red('Unhandled Rejection:'), reason));
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

// ---- Handler de mensagens (kimori.js) com hot-reload ----
// ESM não tem require.cache: ao salvar o kimori.js, importa de novo com ?v=<data>.
// Se a versão nova tiver erro, continua usando a anterior.
let kimoriHandler = kimoriInicial;
const KIMORI_PATH = fileURLToPath(new URL('../kimori.js', import.meta.url));
let recarregandoKimori = null;
fs.watchFile(KIMORI_PATH, { interval: 1500 }, (atual, anterior) => {
if (atual.mtimeMs === anterior.mtimeMs || recarregandoKimori) return;
recarregandoKimori = import(`${pathToFileURL(KIMORI_PATH).href}?v=${Date.now()}`)
.then(mod => {
if (typeof mod.default !== 'function') throw new Error('kimori.js precisa ter "export default" do handler');
kimoriHandler = mod.default;
console.log(colors.white(`Alterações salvas no kimori.js, recarregado :)`));
})
.catch(e => console.error(chalk.red('[HOT-RELOAD] kimori.js com erro, mantendo a versão anterior:'), e?.message || e))
.finally(() => { recarregandoKimori = null; });
});

try {
const total = await initCommands();
console.log(chalk.green(`✓ ${total} comandos carregados`));
} catch (e) {
console.error(chalk.red('[COMANDOS] Falha na carga inicial:'), e);
}

startConnect(mode).catch(error => {
const msg = error?.message || String(error) || '';
if (!isSessionData(msg) && !SILENCED_PATTERNS.some(p => p.test(msg))) {
console.log(colors.red("❌ Erro ao inicializar: " + error.message));
if (MODE_DEBUG) {
console.log(colors.gray(error.stack));
}
}
// antes o bot ficava parado aqui para sempre; agora tenta de novo
agendarReconexao(mode);
});

export default {
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
export { startConnect, CONFIG, MODE_DEBUG, isDebugMode, imageCache, responseCache, bufferCache, groupCache, getImageCached, writeJSONDebounced, readJSONCached, getGroupMetadata, normalizarJid, rateLimiter, monitor, throttle, debounce, heapMB };
