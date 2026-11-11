import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.join(__dirname, '..', '..', 'comandos');

// Intervalo mínimo entre checagens de pasta (arquivos novos/removidos)
const CHECAGEM_PASTAS_MS = 2000;

const fileCache = new Map(); // fullPath -> { mtimeMs, mod, error }
let commandMap = new Map();
let assinaturaPastas = '';
let ultimaChecagem = 0;
let construindo = null; // promessa da reconstrução em andamento (evita duas ao mesmo tempo)

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

// ESM não tem require.cache: para recarregar um comando editado, importa a URL com ?v=<mtime>
async function importarComando(fullPath, mtimeMs) {
const url = `${pathToFileURL(fullPath).href}?v=${Math.trunc(mtimeMs)}`;
const ns = await import(url);
return ns.default ?? ns;
}

function montarEntrada(mod, fullPath, categoriaNome) {
return {
name: mod.name,
aliases: Array.isArray(mod.aliases) ? mod.aliases : [],
category: mod.category || categoriaNome,
description: mod.description || '',
execute: mod.execute,
sourceFile: fullPath,
categoria: categoriaNome,
};
}

async function loadCommandFile(fullPath, categoriaNome) {
const mtimeMs = statMtime(fullPath);
if (mtimeMs === null) {
fileCache.delete(fullPath);
return null;
}

const cached = fileCache.get(fullPath);
if (cached && cached.mtimeMs === mtimeMs) return cached.mod;

try {
const mod = await importarComando(fullPath, mtimeMs);
if (!mod || !mod.name || typeof mod.execute !== 'function') {
const error = 'precisa ter "export default { name, execute }"';
console.error(`[COMANDOS] Ignorando ${fullPath}: ${error}`);
fileCache.set(fullPath, { mtimeMs, mod: null, error });
return null;
}
const entry = montarEntrada(mod, fullPath, categoriaNome);
fileCache.set(fullPath, { mtimeMs, mod: entry, error: null });
return entry;
} catch (err) {
console.error(`[COMANDOS] Falha ao carregar ${fullPath}:`, err?.message || err);
fileCache.set(fullPath, { mtimeMs, mod: null, error: err?.message || String(err) });
return null;
}
}

function listarCategorias() {
return safeReaddirSync(BASE_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
}

// Assinatura barata: mtime da pasta base + de cada categoria.
// Muda quando um arquivo é criado, apagado ou renomeado.
function calcularAssinatura() {
const partes = [String(statMtime(BASE_DIR))];
for (const nome of listarCategorias()) {
partes.push(nome + ':' + statMtime(path.join(BASE_DIR, nome)));
}
return partes.join('|');
}

async function buildCommandMap() {
const map = new Map();
const seenFiles = new Set();
const tarefas = [];

for (const categoria of listarCategorias()) {
const categoriaPath = path.join(BASE_DIR, categoria);
for (const arquivo of safeReaddirSync(categoriaPath).filter(f => f.endsWith('.js'))) {
const fullPath = path.join(categoriaPath, arquivo);
seenFiles.add(fullPath);
tarefas.push(loadCommandFile(fullPath, categoria));
}
}

// carrega em paralelo, mas registra na ordem das pastas (resultado previsível em duplicados)
for (const entry of await Promise.all(tarefas)) {
if (!entry) continue;
for (const nome of [entry.name, ...entry.aliases]) {
const chave = String(nome).toLowerCase().trim();
if (!chave) continue;
if (map.has(chave) && map.get(chave).sourceFile !== entry.sourceFile) {
console.error(`[COMANDOS] Comando duplicado "${chave}" em ${entry.sourceFile} (já definido em ${map.get(chave).sourceFile})`);
continue;
}
map.set(chave, entry);
}
}

for (const cachedPath of Array.from(fileCache.keys())) {
if (!seenFiles.has(cachedPath)) fileCache.delete(cachedPath);
}

return map;
}

function reconstruir() {
if (!construindo) {
construindo = buildCommandMap()
.then(map => { commandMap = map; return map; })
.finally(() => { construindo = null; });
}
return construindo;
}

// Só reconstrói o mapa quando a estrutura de pastas muda (não a cada comando).
async function getCommandMap(forcar = false) {
const agora = Date.now();
if (forcar || !commandMap.size || agora - ultimaChecagem > CHECAGEM_PASTAS_MS) {
ultimaChecagem = agora;
const assinatura = calcularAssinatura();
if (forcar || assinatura !== assinaturaPastas || !commandMap.size) {
assinaturaPastas = assinatura;
await reconstruir();
}
}
return commandMap;
}

async function getExternalCommand(commandName) {
if (!commandName) return undefined;
const chave = String(commandName).toLowerCase().trim();
const entry = (await getCommandMap()).get(chave);
if (!entry) return undefined;

// hot-reload: se o arquivo do comando foi editado, recarrega só ele
// (confere o disco no máximo 1x por segundo por comando, não a cada uso)
const cached = fileCache.get(entry.sourceFile);
const agora = Date.now();
if (cached && agora - (cached.conferidoEm || 0) < 1000) return entry;
if (cached) cached.conferidoEm = agora;
const mtime = statMtime(entry.sourceFile);
if (mtime === null) {
await reconstruir();
return commandMap.get(chave);
}
if (!cached || cached.mtimeMs !== mtime) {
const novo = await loadCommandFile(entry.sourceFile, entry.categoria);
const nomesMudaram = !novo || novo.name !== entry.name || JSON.stringify(novo.aliases) !== JSON.stringify(entry.aliases);
if (nomesMudaram) {
await reconstruir();
return commandMap.get(chave);
}
for (const nome of [novo.name, ...novo.aliases]) commandMap.set(String(nome).toLowerCase().trim(), novo);
return novo;
}
return entry;
}

async function reloadExternalCommands() {
fileCache.clear();
return getCommandMap(true);
}

// Síncrona (usada no menu/contagem): devolve o que já está carregado e agenda uma checagem
function listExternalCommands() {
getCommandMap().catch(e => console.error('[COMANDOS]', e));
return Array.from(new Set(commandMap.values()));
}

// Carrega um arquivo e diz exatamente o que deu errado (usado pelo addplugin/editplugin)
async function testarArquivoComando(fullPath) {
const categoria = path.basename(path.dirname(fullPath));
fileCache.delete(fullPath);
const mod = await loadCommandFile(fullPath, categoria);
return { mod, error: mod ? null : (fileCache.get(fullPath)?.error || 'não carregou') };
}

// Carga inicial (chamada pelo connect.js antes de conectar). Não usa top-level await aqui:
// alguns comandos importam este arquivo, e um await no topo travaria nesse ciclo de imports.
async function initCommands() {
const map = await getCommandMap(true);
return new Set(map.values()).size;
}

export { getExternalCommand, reloadExternalCommands, listExternalCommands, testarArquivoComando, initCommands, BASE_DIR };
export default { getExternalCommand, reloadExternalCommands, listExternalCommands, testarArquivoComando, initCommands, BASE_DIR };
