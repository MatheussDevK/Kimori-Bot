const fs = require('fs');
const path = require('path');

global.__kimoriDbCache ??= new Map();

function ensureDirFor(filePath) {
const dir = path.dirname(filePath);
if (dir && !fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
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

function writeJSON(filePath, data, pretty = true) {
try {
ensureDirFor(filePath);
const text = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
const tmpPath = `${filePath}.${process.pid}.tmp`;
fs.writeFileSync(tmpPath, text);
fs.renameSync(tmpPath, filePath);
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

function getCached(filePath, fallback) {
if (!global.__kimoriDbCache.has(filePath)) {
global.__kimoriDbCache.set(filePath, readJSON(filePath, fallback));
}
return global.__kimoriDbCache.get(filePath);
}

function setCached(filePath, data, pretty = true) {
global.__kimoriDbCache.set(filePath, data);
return writeJSON(filePath, data, pretty);
}

function invalidateCache(filePath) {
global.__kimoriDbCache.delete(filePath);
}

function mutateCached(filePath, fallback, mutator) {
const data = getCached(filePath, fallback);
const result = mutator(data);
setCached(filePath, data);
return result;
}

module.exports = {
readJSON,
writeJSON,
getCached,
setCached,
invalidateCache,
mutateCached,
ensureDirFor,
};
