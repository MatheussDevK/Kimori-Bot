const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..', '..', 'comandos');

const fileCache = new Map();
let commandMap = new Map();

function safeReaddirSync(dir, options) {
try {
return fs.readdirSync(dir, options);
} catch {
return [];
}
}

function statMtime(fullPath) {
try {
return fs.statSync(fullPath).mtimeMs;
} catch {
return null;
}
}

function loadCommandFile(fullPath, categoriaNome) {
const mtimeMs = statMtime(fullPath);
if (mtimeMs === null) {
fileCache.delete(fullPath);
return null;
}

const cached = fileCache.get(fullPath);
if (cached && cached.mtimeMs === mtimeMs) {
return cached.mod;
}

try {
const resolved = require.resolve(fullPath);
delete require.cache[resolved];
const mod = require(resolved);
if (!mod || !mod.name || typeof mod.execute !== 'function') {
console.error(`[COMANDOS] Ignorando ${fullPath}: precisa exportar { name, execute }`);
fileCache.set(fullPath, { mtimeMs, mod: null });
return null;
}
const entry = {
name: mod.name,
aliases: Array.isArray(mod.aliases) ? mod.aliases : [],
category: mod.category || categoriaNome,
description: mod.description || '',
execute: mod.execute,
sourceFile: fullPath,
};
fileCache.set(fullPath, { mtimeMs, mod: entry });
return entry;
} catch (err) {
console.error(`[COMANDOS] Falha ao carregar ${fullPath}:`, err.message);
fileCache.set(fullPath, { mtimeMs, mod: null });
return null;
}
}

function buildCommandMap() {
const map = new Map();
const seenFiles = new Set();
const categorias = safeReaddirSync(BASE_DIR, { withFileTypes: true }).filter(d => d.isDirectory());

for (const categoria of categorias) {
const categoriaPath = path.join(BASE_DIR, categoria.name);
const arquivos = safeReaddirSync(categoriaPath).filter(f => f.endsWith('.js'));

for (const arquivo of arquivos) {
const fullPath = path.join(categoriaPath, arquivo);
seenFiles.add(fullPath);
const entry = loadCommandFile(fullPath, categoria.name);
if (!entry) continue;

const nomes = [entry.name, ...entry.aliases];
for (const nome of nomes) {
const chave = String(nome).toLowerCase().trim();
if (!chave) continue;
if (map.has(chave) && map.get(chave).sourceFile !== entry.sourceFile) {
console.error(`[COMANDOS] Comando duplicado "${chave}" em ${entry.sourceFile} (já definido em ${map.get(chave).sourceFile})`);
continue;
}
map.set(chave, entry);
}
}
}

for (const cachedPath of Array.from(fileCache.keys())) {
if (!seenFiles.has(cachedPath)) fileCache.delete(cachedPath);
}

return map;
}

function getCommandMap() {
commandMap = buildCommandMap();
return commandMap;
}

function getExternalCommand(commandName) {
if (!commandName) return undefined;
return getCommandMap().get(String(commandName).toLowerCase().trim());
}

function reloadExternalCommands() {
fileCache.clear();
return getCommandMap();
}

function listExternalCommands() {
const map = getCommandMap();
const unicos = new Set(Array.from(map.values()));
return Array.from(unicos);
}

module.exports = {
getExternalCommand,
reloadExternalCommands,
listExternalCommands,
BASE_DIR,
};
