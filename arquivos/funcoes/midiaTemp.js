// Arquivos temporários de mídia (figurinhas, conversões com ffmpeg, uploads).
//
// Por que existe: vários comandos gravavam arquivos soltos (na raiz do bot ou no /tmp) e só
// apagavam no caminho feliz. Qualquer erro (ffmpeg falhou, envio falhou) deixava o arquivo lá
// para sempre e, com o tempo, o disco enchia -> "ENOSPC: no space left on device".
//
// Aqui tudo vai para UMA pasta (kimori-tmp), sempre é apagado no finally e, se mesmo assim
// sobrar algo (bot reiniciou no meio), a limpeza periódica (limpezaDisco.js) remove.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';

const RAIZ = process.cwd();
const PASTA_LOCAL = path.join(RAIZ, 'database', 'tmp');
const PASTA_SISTEMA = path.join(os.tmpdir(), 'kimori-tmp');

function livreEm(p) {
try {
const s = fs.statfsSync(p);
return Number(s.bavail) * Number(s.bsize);
} catch { return -1; }
}

function podeGravar(p) {
try {
fs.mkdirSync(p, { recursive: true });
fs.accessSync(p, fs.constants.W_OK);
return true;
} catch { return false; }
}

// No Pterodactyl o /tmp costuma ser um tmpfs pequeno (100 MB). Usa a pasta com mais espaço livre.
let pastaAtual = null;
let escolhidaEm = 0;
function pastaTemp() {
const agora = Date.now();
if (pastaAtual && agora - escolhidaEm < 60_000) return pastaAtual;
escolhidaEm = agora;
const opcoes = [PASTA_SISTEMA, PASTA_LOCAL].filter(podeGravar);
if (!opcoes.length) { pastaAtual = os.tmpdir(); return pastaAtual; }
opcoes.sort((a, b) => livreEm(b) - livreEm(a));
pastaAtual = opcoes[0];
return pastaAtual;
}

const PASTAS_TEMP = [PASTA_SISTEMA, PASTA_LOCAL];

function caminhoTemp(ext = '') {
if (ext && !ext.startsWith('.')) ext = '.' + ext;
return path.join(pastaTemp(), `${Date.now()}_${crypto.randomBytes(5).toString('hex')}${ext}`);
}

function apagar(...arquivos) {
for (const f of arquivos.flat()) {
if (typeof f !== 'string' || !f) continue;
try { fs.unlinkSync(f); } catch {}
}
}

/**
* Cria caminhos temporários, roda `fn(...caminhos)` e apaga TODOS no final, dê certo ou não.
* Ex.: await comTemp(['.mp4', '.mp3'], async (entrada, saida) => { ... })
*/
async function comTemp(exts, fn) {
const caminhos = exts.map(caminhoTemp);
try {
return await fn(...caminhos);
} finally {
apagar(caminhos);
}
}

// Junta o stream do Baileys num Buffer só. Antes era Buffer.concat a cada pedaço (cópia
// quadrática: um vídeo de 10 MB gerava centenas de MB de cópias e travava o processo).
async function streamParaBuffer(stream) {
const partes = [];
for await (const parte of stream) partes.push(parte);
return Buffer.concat(partes);
}

/** Roda o ffmpeg sem shell (sem injeção de comando). Rejeita com a última linha do erro. */
function ffmpeg(args, { timeoutMs = 120_000 } = {}) {
return new Promise((resolve, reject) => {
let proc;
try {
proc = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: ['ignore', 'ignore', 'pipe'] });
} catch (e) { return reject(e); }
let erro = '';
const timer = setTimeout(() => { try { proc.kill('SIGKILL'); } catch {} }, timeoutMs);
proc.stderr.on('data', (d) => { erro = (erro + d).slice(-2000); });
proc.on('error', (e) => {
clearTimeout(timer);
reject(e.code === 'ENOENT' ? new Error('ffmpeg não está instalado') : e);
});
proc.on('close', (code, sinal) => {
clearTimeout(timer);
if (code === 0) return resolve();
reject(new Error(`ffmpeg falhou${sinal ? ` (${sinal})` : ''}: ${erro.trim().split('\n').pop() || code}`));
});
});
}

/** Converte um buffer com ffmpeg: grava a entrada, roda, lê a saída e apaga os dois. */
async function converterBuffer(buffer, extEntrada, extSaida, argsMeio, opcoes) {
return comTemp([extEntrada, extSaida], async (entrada, saida) => {
await fs.promises.writeFile(entrada, buffer);
await ffmpeg(['-i', entrada, ...argsMeio, saida], opcoes);
return fs.promises.readFile(saida);
});
}

export { pastaTemp, caminhoTemp, apagar, comTemp, streamParaBuffer, ffmpeg, converterBuffer, PASTAS_TEMP, livreEm };
export default { pastaTemp, caminhoTemp, apagar, comTemp, streamParaBuffer, ffmpeg, converterBuffer, PASTAS_TEMP, livreEm };
