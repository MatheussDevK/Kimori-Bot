// Cliente único da OrbitalApis (antiga Kimori API).
// Todo comando que usa a API passa por aqui, então:
//   • a URL e a apikey vêm sempre do config.json (trocar vale na hora, sem reiniciar)
//   • o erro que a API manda ({ error, message }) aparece no terminal E na resposta do comando
//   • mídia (imagem/vídeo/áudio) e JSON são tratados do mesmo jeito
import axios from 'axios';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { loadJSON } from './jsonCache.js';
import { pastaTemp } from './midiaTemp.js';

const config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

export class ApiError extends Error {
constructor(message, { status = 0, route = '', data = null } = {}) {
super(message);
this.name = 'ApiError';
this.status = status;
this.route = route;
this.data = data;
this.apiMessage = message;
}
}

const base = () => String(config.API_KIMORI_URL || '').replace(/\/+$/, '');
const rota = (u) => { try { return new URL(u).pathname; } catch { return String(u).split('?')[0]; } };

/** Monta a URL completa de uma rota: apiUrl('/api/cep', { cep: '01001000' }) */
export function apiUrl(caminho, params = {}) {
const u = new URL(base() + caminho);
for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null && v !== '') u.searchParams.set(k, String(v));
u.searchParams.set('apikey', config.APIKEY_KIMORI);
return u.toString();
}

const garantirUrl = (alvo, params) => (/^https?:\/\//.test(alvo) ? alvo : apiUrl(alvo, params));

/** Texto do erro exatamente como a API mandou: "error: message" */
export function apiErro(data, padrao = 'Falha ao processar') {
if (!data || typeof data !== 'object') return padrao;
const e = data.error || data.erro || data.err || '';
const m = data.message || data.mensagem || data.msg || '';
if (e && m && !String(e).includes(m)) return `${e}: ${m}`;
return String(e || m || padrao);
}

function logar(route, status, texto) {
console.log(`\x1b[31m[API]\x1b[0m ${route} → ${status || 'sem resposta'} | ${texto}`);
}

function lerCorpo(buf) {
try { return JSON.parse(Buffer.isBuffer(buf) ? buf.toString('utf8') : String(buf)); } catch { return null; }
}

/**
* GET/POST na API que devolve JSON. NÃO lança erro quando a API responde (mesmo 4xx/5xx):
* devolve o JSON para o comando decidir, e já registra o erro no terminal.
* Só lança ApiError quando não há resposta (rede/timeout) ou a resposta não é JSON.
*/
export async function apiJson(alvo, params = {}, { method = 'GET', body, timeout = 120000 } = {}) {
const url = garantirUrl(alvo, params);
const route = rota(url);
let r;
try {
r = await axios({ url, method, data: body, timeout, validateStatus: () => true, headers: { 'User-Agent': UA, Accept: 'application/json' } });
} catch (e) {
const msg = e.code === 'ECONNABORTED' ? 'a API demorou demais para responder' : `não consegui falar com a API (${e.code || e.message})`;
logar(route, 0, msg);
throw new ApiError(msg, { route });
}
let data = r.data;
if (typeof data === 'string') data = lerCorpo(data) ?? data;
if (!data || typeof data !== 'object') {
const msg = `a API respondeu ${r.status} sem JSON`;
logar(route, r.status, msg);
throw new ApiError(msg, { status: r.status, route });
}
if (r.status >= 400 || data.success === false || (data.error && data.success !== true)) {
logar(route, r.status, apiErro(data));
}
return data;
}

/** Igual ao apiJson, mas lança ApiError se a API não tiver dado certo (use quando não há tratamento próprio). */
export async function apiJsonOk(alvo, params = {}, opts = {}) {
const data = await apiJson(alvo, params, opts);
if (data.success === false || data.error) throw new ApiError(apiErro(data), { route: rota(garantirUrl(alvo, params)), data });
return data;
}

/**
* Baixa mídia de uma rota da API (imagem, figurinha, vídeo, áudio).
* Se a API responder JSON (erro), lança ApiError com a mensagem dela.
* @returns {Promise<{ buffer: Buffer, type: string }>}
*/
export async function apiMedia(alvo, params = {}, { timeout = 120000, maxBytes = 120 * 1024 * 1024 } = {}) {
const url = garantirUrl(alvo, params);
const route = rota(url);
let r;
try {
r = await axios.get(url, { responseType: 'arraybuffer', timeout, maxContentLength: maxBytes, validateStatus: () => true, headers: { 'User-Agent': UA } });
} catch (e) {
const msg = e.code === 'ECONNABORTED' ? 'a API demorou demais para responder' : `não consegui falar com a API (${e.code || e.message})`;
logar(route, 0, msg);
throw new ApiError(msg, { route });
}
const type = String(r.headers['content-type'] || '').split(';')[0];
const buffer = Buffer.from(r.data || []);
if (r.status >= 400 || type.includes('json') || type.includes('text/html')) {
const data = lerCorpo(buffer);
const msg = data ? apiErro(data) : `a API respondeu ${r.status}`;
logar(route, r.status, msg);
throw new ApiError(msg, { status: r.status, route, data });
}
if (!buffer.length) { logar(route, r.status, 'mídia vazia'); throw new ApiError('a API mandou uma mídia vazia', { status: r.status, route }); }
return { buffer, type };
}

/** Baixa um arquivo de qualquer link (resultado de download). */
export async function baixarArquivo(link, { timeout = 300000, maxBytes = 150 * 1024 * 1024, headers = {} } = {}) {
const r = await axios.get(link, { responseType: 'arraybuffer', timeout, maxContentLength: maxBytes, validateStatus: () => true, headers: { 'User-Agent': UA, ...headers } });
if (r.status >= 400) throw new ApiError(`o servidor do arquivo respondeu ${r.status}`, { status: r.status, route: rota(link) });
const type = String(r.headers['content-type'] || '').split(';')[0];
if (type.includes('text/html')) throw new ApiError('o link devolveu uma página em vez do arquivo', { route: rota(link) });
const buffer = Buffer.from(r.data || []);
if (!buffer.length) throw new ApiError('arquivo vazio', { route: rota(link) });
return { buffer, type };
}


/**
* Lê uma rota SSE (text/event-stream) da API. Chama onData(obj) para cada evento.
* Resolve quando a API manda [DONE] / { done: true } ou fecha a conexão.
*/
export async function apiStream(caminho, params = {}, { method = 'GET', body, timeout = 180000, onData } = {}) {
const url = garantirUrl(caminho, params);
const route = rota(url);
let r;
try {
r = await axios({ url, method, data: body, responseType: 'stream', timeout, validateStatus: () => true, headers: { 'User-Agent': UA, Accept: 'text/event-stream' } });
} catch (e) {
const msg = e.code === 'ECONNABORTED' ? 'a API demorou demais para responder' : `não consegui falar com a API (${e.code || e.message})`;
logar(route, 0, msg);
throw new ApiError(msg, { route });
}
const type = String(r.headers['content-type'] || '');
if (r.status >= 400 || !type.includes('event-stream')) {
const chunks = [];
for await (const c of r.data) chunks.push(c);
const data = lerCorpo(Buffer.concat(chunks));
const msg = data ? apiErro(data) : `a API respondeu ${r.status}`;
logar(route, r.status, msg);
throw new ApiError(msg, { status: r.status, route, data });
}
let resto = '';
let erro = null;
await new Promise((resolve, reject) => {
r.data.on('data', (c) => {
resto += c.toString('utf8');
let i;
while ((i = resto.indexOf('\n')) !== -1) {
const linha = resto.slice(0, i).trim();
resto = resto.slice(i + 1);
if (!linha.startsWith('data:')) continue;
const conteudo = linha.slice(5).trim();
if (conteudo === '[DONE]') continue;
const obj = lerCorpo(conteudo);
if (!obj) continue;
if (obj.error && !erro) { erro = String(obj.error); logar(route, r.status, erro); }
try { onData?.(obj); } catch {}
}
});
r.data.on('end', resolve);
r.data.on('error', reject);
});
if (erro) throw new ApiError(erro, { route, status: r.status });
}

/** Extrai a mensagem de qualquer erro (ApiError, erro do axios com corpo da API, Error comum). */
export function textoDoErro(err) {
if (!err) return 'erro desconhecido';
if (err.apiMessage) return err.apiMessage;
const d = err.response?.data;
if (d) {
const data = Buffer.isBuffer(d) || d instanceof ArrayBuffer ? lerCorpo(Buffer.from(d)) : (typeof d === 'string' ? lerCorpo(d) : d);
if (data && typeof data === 'object') return apiErro(data, err.message);
}
if (err.response?.status) return `a API respondeu ${err.response.status}`;
return err.message || String(err);
}

/** Rota da API envolvida no erro, se houver. */
export function rotaDoErro(err) {
if (err?.route) return err.route;
const u = err?.config?.url || err?.response?.config?.url;
return u ? rota(u) : '';
}

// ---------------- ffmpeg ----------------
function rodarFfmpeg(args) {
return new Promise((resolve, reject) => {
let ff, stderr = '';
try { ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args]); }
catch (e) { return reject(new Error('ffmpeg não está instalado')); }
ff.stderr.on('data', (c) => { stderr += c; });
ff.on('error', () => reject(new Error('ffmpeg não está instalado')));
ff.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg falhou: ${stderr.trim().split('\n').pop() || code}`))));
});
}

/**
* Extrai o áudio de um vídeo (buffer) e devolve em mp3 (padrão) ou m4a.
* Usado pelo instagram áudio e tiktok áudio.
*/
export async function videoParaAudio(videoBuffer, formato = 'mp3') {
const id = crypto.randomBytes(8).toString('hex');
const entrada = path.join(pastaTemp(), `orb_${id}.mp4`);
const saida = path.join(pastaTemp(), `orb_${id}.${formato}`);
try {
fs.writeFileSync(entrada, videoBuffer);
const codec = formato === 'mp3' ? ['-c:a', 'libmp3lame', '-b:a', '128k'] : ['-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart'];
try { await rodarFfmpeg(['-i', entrada, '-vn', '-ar', '44100', '-ac', '2', ...codec, saida]); }
catch (e) {
if (/não está instalado/.test(e.message)) throw e;
throw new Error(/does not contain any stream|Invalid argument|matches no streams/i.test(e.message) ? 'esse vídeo não tem áudio' : e.message);
}
const out = fs.readFileSync(saida);
if (out.length < 1000) throw new Error('o vídeo não tem áudio');
return out;
} finally {
for (const f of [entrada, saida]) try { fs.unlinkSync(f); } catch {}
}
}


/** Converte um vídeo HLS (.m3u8, ex.: Pinterest) para MP4 com ffmpeg. */
export async function hlsParaMp4(url) {
const id = crypto.randomBytes(8).toString('hex');
const saida = path.join(pastaTemp(), `orb_${id}.mp4`);
try {
await rodarFfmpeg(['-user_agent', UA, '-i', url, '-c', 'copy', '-bsf:a', 'aac_adtstoasc', '-movflags', '+faststart', saida])
.catch(() => rodarFfmpeg(['-user_agent', UA, '-i', url, '-c:v', 'libx264', '-preset', 'veryfast', '-c:a', 'aac', '-movflags', '+faststart', saida]));
return fs.readFileSync(saida);
} finally { try { fs.unlinkSync(saida); } catch {} }
}

export default { hlsParaMp4, apiStream, apiUrl, apiJson, apiJsonOk, apiMedia, apiErro, baixarArquivo, textoDoErro, rotaDoErro, videoParaAudio, ApiError };
