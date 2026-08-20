const path = require('path');
const { BASE_DIR } = require('./commandLoader.js');

function resolvePluginPath(rel) {
if (!rel || typeof rel !== 'string') return { ok: false, reason: 'Caminho vazio.' };
let clean = rel.trim().replace(/^\/+/, '');
if (!clean.toLowerCase().endsWith('.js')) clean += '.js';
if (!/^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\.js$/.test(clean)) {
return { ok: false, reason: 'Use o formato categoria/nome.js (só letras, números, _ e - em cada parte).' };
}
const [categoria, arquivo] = clean.split('/');
const fullPath = path.join(BASE_DIR, categoria, arquivo);
const resolved = path.resolve(fullPath);
const baseResolved = path.resolve(BASE_DIR);
if (resolved !== baseResolved && !resolved.startsWith(baseResolved + path.sep)) {
return { ok: false, reason: 'Caminho inválido.' };
}
return { ok: true, fullPath: resolved, categoria, arquivo, relPath: `${categoria}/${arquivo}` };
}

module.exports = { resolvePluginPath, BASE_DIR };
