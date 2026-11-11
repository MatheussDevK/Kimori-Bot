import fs from 'node:fs';
import path from 'node:path';

// Cache global (sobrevive ao hot-reload): caminho -> { data, mtimeMs }
global.__kimoriDbCache ??= new Map();
// Gravações pendentes com debounce: caminho -> { timer, data, pretty }
global.__kimoriDbPendentes ??= new Map();

const cache = global.__kimoriDbCache;
const pendentes = global.__kimoriDbPendentes;

// Checagem de "o arquivo mudou no disco?" no máximo 1x por segundo por arquivo.
// Antes era um fs.statSync (síncrono) a CADA leitura, várias vezes por mensagem.
const INTERVALO_STAT_MS = 1000;
const ultimoStat = new Map();

// existsSync com cache curto (o bot perguntava "existe?" para o mesmo arquivo a cada mensagem)
const existeMemo = new Map();
function existeCached(filePath, ttl = 2000) {
const c = existeMemo.get(filePath);
const agora = Date.now();
if (c && agora - c.t < ttl) return c.v;
const v = fs.existsSync(filePath);
existeMemo.set(filePath, { v, t: agora });
if (existeMemo.size > 5000) existeMemo.delete(existeMemo.keys().next().value);
return v;
}

function ensureDirFor(filePath) {
const dir = path.dirname(filePath);
if (dir && !fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function mtimeDe(filePath) {
try {
return fs.statSync(filePath).mtimeMs;
} catch {
return null;
}
}

function readJSON(filePath, fallback) {
try {
if (!fs.existsSync(filePath)) {
if (fallback !== undefined) writeJSON(filePath, fallback);
return structuredCloneSafe(fallback);
}
const raw = fs.readFileSync(filePath, 'utf8');
if (!raw || !raw.trim()) return structuredCloneSafe(fallback);
return JSON.parse(raw);
} catch (err) {
console.error(`[DATABASE] Falha ao ler ${filePath}:`, err.message);
return structuredCloneSafe(fallback);
}
}

function gravarAtomico(filePath, text) {
const tmpPath = `${filePath}.${process.pid}.tmp`;
try {
fs.writeFileSync(tmpPath, text);
fs.renameSync(tmpPath, filePath);
} catch (err) {
// antes o .tmp parcial ficava no disco a cada falha (piorando o disco cheio)
try { fs.unlinkSync(tmpPath); } catch {}
throw err;
}
}

function writeJSON(filePath, data, pretty = true) {
try {
ensureDirFor(filePath);
const text = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
try {
gravarAtomico(filePath, text);
} catch (err) {
if (err?.code !== 'ENOSPC' || typeof global.__kimoriLimpezaEmergencia !== 'function') throw err;
// disco cheio: libera espaço e tenta mais uma vez (o arquivo antigo continua inteiro)
global.__kimoriLimpezaEmergencia('ENOSPC ao gravar ' + path.basename(filePath));
gravarAtomico(filePath, text);
}
existeMemo.set(filePath, { v: true, t: Date.now() });
const entrada = cache.get(filePath);
if (entrada && entrada.data === data) entrada.mtimeMs = mtimeDe(filePath);
return true;
} catch (err) {
console.error(`[DATABASE] Falha ao gravar ${filePath}:`, err.message);
return false;
}
}

function structuredCloneSafe(value) {
if (value === undefined) return undefined;
try {
return JSON.parse(JSON.stringify(value));
} catch {
return value;
}
}

// Lê do cache, mas recarrega se o arquivo foi alterado por fora (outro comando, edição manual).
// Antes o cache nunca era invalidado e podia ficar desatualizado.
function getCached(filePath, fallback) {
const entrada = cache.get(filePath);
if (entrada) {
// com gravação pendente, a versão em memória é a mais nova
if (pendentes.has(filePath)) return entrada.data;
const agora = Date.now();
if (agora - (ultimoStat.get(filePath) || 0) < INTERVALO_STAT_MS) return entrada.data;
ultimoStat.set(filePath, agora);
const mtimeAtual = mtimeDe(filePath);
if (mtimeAtual === null || mtimeAtual === entrada.mtimeMs) return entrada.data;
}
const data = readJSON(filePath, fallback);
cache.set(filePath, { data, mtimeMs: mtimeDe(filePath) });
return data;
}

function setCached(filePath, data, pretty = true) {
cancelarPendente(filePath);
cache.set(filePath, { data, mtimeMs: null });
const ok = writeJSON(filePath, data, pretty);
cache.set(filePath, { data, mtimeMs: mtimeDe(filePath) });
return ok;
}

// Atualiza o cache na hora e grava no disco depois de `delayMs` sem novas alterações.
// Ideal para arquivos que mudam a cada mensagem (contadores, nomes de usuários).
function setCachedDebounced(filePath, data, delayMs = 2000, pretty = true) {
cache.set(filePath, { data, mtimeMs: cache.get(filePath)?.mtimeMs ?? null });
const atual = pendentes.get(filePath);
if (atual) clearTimeout(atual.timer);
const timer = setTimeout(() => gravarPendente(filePath), delayMs);
pendentes.set(filePath, { timer, data, pretty });
}

function gravarPendente(filePath) {
const p = pendentes.get(filePath);
if (!p) return;
pendentes.delete(filePath);
if (!writeJSON(filePath, p.data, p.pretty)) {
// falhou (ex.: disco cheio): tenta de novo em 30 s em vez de perder a alteração
if (!pendentes.has(filePath)) {
const timer = setTimeout(() => gravarPendente(filePath), 30_000);
timer.unref?.();
pendentes.set(filePath, { timer, data: p.data, pretty: p.pretty });
}
return;
}
const entrada = cache.get(filePath);
if (entrada) entrada.mtimeMs = mtimeDe(filePath);
}

function cancelarPendente(filePath) {
const p = pendentes.get(filePath);
if (p) {
clearTimeout(p.timer);
pendentes.delete(filePath);
}
}

function flushPendentes() {
for (const filePath of Array.from(pendentes.keys())) {
try { gravarPendente(filePath); } catch (e) { console.error('[DATABASE] flush', filePath, e.message); }
}
}

// Garante que nada pendente se perca ao desligar/reiniciar o bot
if (!global.__kimoriDbFlushHook) {
global.__kimoriDbFlushHook = true;
process.on('exit', flushPendentes);
for (const sinal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
process.on(sinal, () => {
flushPendentes();
process.exit(0);
});
}
}

function invalidateCache(filePath) {
cache.delete(filePath);
ultimoStat.delete(filePath);
existeMemo.delete(filePath);
}

function mutateCached(filePath, fallback, mutator) {
const data = getCached(filePath, fallback);
const result = mutator(data);
setCached(filePath, data);
return result;
}

export default {
readJSON,
writeJSON,
getCached,
setCached,
setCachedDebounced,
flushPendentes,
invalidateCache,
mutateCached,
ensureDirFor,
existeCached,
};

export { readJSON, writeJSON, getCached, setCached, setCachedDebounced, flushPendentes, invalidateCache, mutateCached, ensureDirFor, existeCached };
