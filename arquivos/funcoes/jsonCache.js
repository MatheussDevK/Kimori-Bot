import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Substitui o require('arquivo.json') do CommonJS: lê uma vez e devolve SEMPRE o mesmo objeto
// para o mesmo arquivo (assim, quem altera e salva o JSON vê a mudança em todos os módulos).
const cache = new Map();

function toPath(alvo) {
if (alvo instanceof URL) return fileURLToPath(alvo);
const s = String(alvo);
return s.startsWith('file:') ? fileURLToPath(s) : path.resolve(s);
}

export function loadJSON(alvo, fallback) {
const file = toPath(alvo);
if (cache.has(file)) return cache.get(file);
try {
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
cache.set(file, data);
return data;
} catch (e) {
if (fallback !== undefined) return fallback;
throw new Error(`Falha ao ler JSON ${file}: ${e.message}`);
}
}

export function reloadJSON(alvo) {
cache.delete(toPath(alvo));
return loadJSON(alvo);
}

export default { loadJSON, reloadJSON };
