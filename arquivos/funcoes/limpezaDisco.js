// Limpeza automática de disco (resolve o "ENOSPC: no space left on device").
//
// Roda ao ligar e a cada 10 min:
// - apaga arquivos temporários esquecidos (figurinhas, conversões, uploads, zips de update);
// - apaga .tmp que sobraram de gravações interrompidas;
// - limita o cache de mídia do /play conforme o espaço livre;
// - se o espaço livre ficar baixo, faz uma limpeza de emergência (cache do play, cache do npm,
//   temporários de qualquer idade) e avisa no terminal.
// Também é chamada na hora por quem receber um ENOSPC (global.__kimoriLimpezaEmergencia).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { PASTAS_TEMP, livreEm } from './midiaTemp.js';

const RAIZ = process.cwd();
const MIN = 60 * 1000;
const MB = 1024 * 1024;

// espaço livre mínimo antes de entrar em modo emergência
const LIVRE_MINIMO = 200 * MB;
const PASTA_PLAY = path.join(RAIZ, 'database', 'cache', 'play');
const PASTA_NPM_TEMP = path.join(RAIZ, 'database', 'temp_npm');

// padrões de arquivos temporários que o próprio bot (ou versões antigas dele) cria
const PADROES_TMP_SISTEMA = [
/^[0-9a-z]{6,12}\.(webp|jpg|mp4)$/, // exif.js antigo
/^(togif|yt|orb|upload|fotomenu)_.+/,
/^\d{13}_[0-9a-f]{8,10}\.\w+$/,
];
const PADROES_TMP_RAIZ = [
/^\d{13}_[0-9a-f]{8,10}\.\w+$/, // getRandom()
/^\d{13}(_in|_out)?\.(ogg|mp3|mp4|gif|webp|png|jpg|jpeg|opus|m4a)$/, // alteradores antigos
/^update-.+\.zip$/,
];

function idadeMs(st) { return Date.now() - st.mtimeMs; }

function limparPasta(pasta, { idadeMin, padroes = null, recursivo = false, profundidade = 0 } = {}) {
let removidos = 0, bytes = 0;
let itens;
try { itens = fs.readdirSync(pasta, { withFileTypes: true }); } catch { return { removidos, bytes }; }
for (const it of itens) {
const p = path.join(pasta, it.name);
try {
if (it.isDirectory()) {
if (recursivo && profundidade < 6 && it.name !== 'node_modules') {
const r = limparPasta(p, { idadeMin, padroes, recursivo, profundidade: profundidade + 1 });
removidos += r.removidos; bytes += r.bytes;
}
continue;
}
if (!it.isFile()) continue;
if (padroes && !padroes.some(re => re.test(it.name))) continue;
const st = fs.statSync(p);
if (idadeMs(st) < idadeMin * MIN) continue;
fs.unlinkSync(p);
removidos++; bytes += st.size;
} catch {}
}
return { removidos, bytes };
}

function tamanhoPasta(pasta, profundidade = 0) {
let total = 0;
try {
for (const it of fs.readdirSync(pasta, { withFileTypes: true })) {
const p = path.join(pasta, it.name);
try {
if (it.isDirectory()) { if (profundidade < 8) total += tamanhoPasta(p, profundidade + 1); }
else if (it.isFile()) total += fs.statSync(p).size;
} catch {}
}
} catch {}
return total;
}

function apagarPasta(pasta) {
try { fs.rmSync(pasta, { recursive: true, force: true }); } catch {}
}

// limite do cache do /play: no máximo 150 MB e nunca deixando o disco com menos de 400 MB livres
function limitePlayBytes() {
const livre = livreEm(RAIZ);
if (livre < 0) return 150 * MB;
const usado = tamanhoPasta(PASTA_PLAY);
const permitido = Math.max(0, usado + livre - 400 * MB);
return Math.min(150 * MB, permitido);
}

function aparCachePlay(limite) {
let itens;
try {
itens = fs.readdirSync(PASTA_PLAY).map(nome => {
const p = path.join(PASTA_PLAY, nome);
try { const st = fs.statSync(p); return st.isFile() ? { p, tam: st.size, t: st.mtimeMs } : null; } catch { return null; }
}).filter(Boolean).sort((a, b) => a.t - b.t);
} catch { return 0; }
let total = itens.reduce((s, a) => s + a.tam, 0);
let liberado = 0;
for (const a of itens) {
if (total <= limite) break;
try { fs.unlinkSync(a.p); total -= a.tam; liberado += a.tam; } catch {}
}
return liberado;
}

function limpezaNormal() {
let bytes = 0;
for (const pasta of PASTAS_TEMP) bytes += limparPasta(pasta, { idadeMin: 15 }).bytes;
bytes += limparPasta(os.tmpdir(), { idadeMin: 30, padroes: PADROES_TMP_SISTEMA }).bytes;
bytes += limparPasta(RAIZ, { idadeMin: 15, padroes: PADROES_TMP_RAIZ }).bytes;
// .tmp de gravações interrompidas (database e sessão)
bytes += limparPasta(path.join(RAIZ, 'database'), { idadeMin: 5, padroes: [/\.tmp$/], recursivo: true }).bytes;
// npm temporário esquecido
try {
const st = fs.statSync(PASTA_NPM_TEMP);
if (idadeMs(st) > 30 * MIN) for (const n of fs.readdirSync(PASTA_NPM_TEMP)) apagarPasta(path.join(PASTA_NPM_TEMP, n));
} catch {}
// logs do npm
bytes += limparPasta(path.join(os.homedir(), '.npm', '_logs'), { idadeMin: 60 }).bytes;
bytes += aparCachePlay(limitePlayBytes());
bytes += limparOrfaosAutorepo();
return bytes;
}

// mídias do autorepo que não pertencem a nenhum gatilho (ex.: grupo apagou o json na mão)
const PASTA_AUTOREPO = path.join(RAIZ, 'database', 'data', 'autorepo');
let ultimoAutorepo = 0;
function limparOrfaosAutorepo() {
if (Date.now() - ultimoAutorepo < 60 * MIN) return 0;
ultimoAutorepo = Date.now();
const pastaMidia = path.join(PASTA_AUTOREPO, 'media');
let midias;
try { midias = fs.readdirSync(pastaMidia); } catch { return 0; }
if (!midias.length) return 0;
const usados = new Set();
try {
for (const nome of fs.readdirSync(PASTA_AUTOREPO)) {
if (!nome.endsWith('.json')) continue;
const texto = fs.readFileSync(path.join(PASTA_AUTOREPO, nome), 'utf8');
for (const m of texto.matchAll(/"file"\s*:\s*"([^"]+)"/g)) usados.add(m[1]);
}
} catch { return 0; } // se não deu para ler tudo, não apaga nada
let bytes = 0;
for (const nome of midias) {
if (usados.has(nome)) continue;
const p = path.join(pastaMidia, nome);
try {
const st = fs.statSync(p);
if (!st.isFile() || idadeMs(st) < 60 * MIN) continue;
fs.unlinkSync(p); bytes += st.size;
} catch {}
}
return bytes;
}

let ultimaEmergencia = 0;
function limpezaEmergencia(motivo = 'pouco espaço') {
// no máximo 1x a cada 30 s (vários ENOSPC seguidos chamam isto)
if (Date.now() - ultimaEmergencia < 30_000) return 0;
ultimaEmergencia = Date.now();
let bytes = 0;
for (const pasta of PASTAS_TEMP) bytes += limparPasta(pasta, { idadeMin: 2 }).bytes;
bytes += limparPasta(os.tmpdir(), { idadeMin: 2, padroes: PADROES_TMP_SISTEMA }).bytes;
bytes += limparPasta(RAIZ, { idadeMin: 2, padroes: PADROES_TMP_RAIZ }).bytes;
bytes += limparPasta(path.join(RAIZ, 'database'), { idadeMin: 1, padroes: [/\.tmp$/], recursivo: true }).bytes;
bytes += aparCachePlay(0);
const npmCache = path.join(os.homedir(), '.npm', '_cacache');
const tamNpm = tamanhoPasta(npmCache);
if (tamNpm) { apagarPasta(npmCache); bytes += tamNpm; }
for (const n of (() => { try { return fs.readdirSync(PASTA_NPM_TEMP); } catch { return []; } })()) apagarPasta(path.join(PASTA_NPM_TEMP, n));
const livre = livreEm(RAIZ);
console.log(`[DISCO] Limpeza de emergência (${motivo}): ${(bytes / MB).toFixed(1)} MB liberados.` +
(livre >= 0 ? ` Livre agora: ${(livre / MB).toFixed(0)} MB.` : ''));
if (livre >= 0 && livre < 50 * MB) {
console.log('[DISCO] ⚠️ O disco continua quase cheio. Veja o que ocupa espaço com: du -sh * .[!.]* | sort -h');
}
return bytes;
}

function verificar() {
try {
const liberado = limpezaNormal();
const livreRaiz = livreEm(RAIZ);
const livreTmp = livreEm(os.tmpdir());
if ((livreRaiz >= 0 && livreRaiz < LIVRE_MINIMO) || (livreTmp >= 0 && livreTmp < 20 * MB)) {
limpezaEmergencia('espaço livre baixo');
} else if (liberado > 5 * MB) {
console.log(`[DISCO] Limpeza automática: ${(liberado / MB).toFixed(1)} MB de arquivos temporários removidos.`);
}
} catch (e) {
console.error('[DISCO] erro na limpeza:', e?.message || e);
}
}

/** true quando ainda dá para gravar caches opcionais (ex.: mídia do /play) */
function temEspaco(bytesNecessarios = 0) {
const livre = livreEm(RAIZ);
return livre < 0 || livre - bytesNecessarios > LIVRE_MINIMO;
}

if (!global.__kimoriLimpezaIniciada) {
global.__kimoriLimpezaIniciada = true;
global.__kimoriLimpezaEmergencia = limpezaEmergencia;
verificar();
setInterval(verificar, 10 * MIN).unref?.();
}

export { verificar, limpezaEmergencia, temEspaco, tamanhoPasta };
export default { verificar, limpezaEmergencia, temEspaco, tamanhoPasta };
