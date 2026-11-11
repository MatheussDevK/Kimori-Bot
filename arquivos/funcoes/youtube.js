// Download de áudio/vídeo do YouTube pela rota nova da API:
//   /api/download/youtube-beta/audio  e  /api/download/youtube-beta/video
// A API devolve JSON { success, data: { titulo, tempo, url, filename, qualidade } } e o arquivo
// é baixado do data.url. Tudo passa pelo cache do play (database/cache/play), então o mesmo
// vídeo pedido de novo (por botão ou por link) sai na hora.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import axios from 'axios';
import { loadJSON } from './jsonCache.js';
import { midiaComCache, idValido } from './playCache.js';
import { apiJson, apiErro, ApiError, textoDoErro, apiUrl } from './orbitalApi.js';
import { pastaTemp } from './midiaTemp.js';

// mesmo objeto do config em todo o bot: trocar a URL/apikey vale sem reiniciar
const config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36' };
const LIMITE_BYTES = 150 * 1024 * 1024;

function extrairIdYoutube(texto) {
const s = String(texto || '').trim();
if (idValido(s) && !s.includes('.')) return s;
const m = s.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/);
return m ? m[1] : null;
}

// Tenta de novo (1x) quando a API falha por problema passageiro (5xx / sem resposta)
async function comRetry(fn) {
try { return await fn(); }
catch (e) {
const passageiro = !e?.status || e.status >= 500;
if (!passageiro) throw e;
await new Promise(r => setTimeout(r, 1500));
return fn();
}
}

// 1ª opção (igual à Nagatoro): biblioteca @hiudyy/ytdl, sem depender da API.
// Se não estiver instalada ou falhar, devolve null e o fluxo cai na API.
let ytdlMod; // undefined = ainda não tentou · null = indisponível
async function carregarYtdl() {
if (ytdlMod !== undefined) return ytdlMod;
try { ytdlMod = await import('@hiudyy/ytdl'); }
catch { ytdlMod = null; console.log('[YOUTUBE] @hiudyy/ytdl não instalado; usando só a API'); }
return ytdlMod;
}

async function baixarPeloYtdl(id, tipo) {
const mod = await carregarYtdl();
if (!mod?.downloadYouTube) return null;
try {
const r = await mod.downloadYouTube(`https://youtu.be/${id}`, tipo === 'audio' ? 'mp3' : 'mp4');
if (!r?.success || !r.filePath) throw new Error(r?.error || 'sem arquivo');
const fp = String(r.filePath);
const remoto = /^https?:\/\//i.test(fp);
const buffer = remoto ? await baixarDoLink(fp) : await fs.promises.readFile(fp);
// o arquivo baixado pela lib é temporário: apaga sempre (antes só se estivesse no /tmp; se a lib
// gravasse em outra pasta, cada música baixada ficava no disco para sempre)
if (!remoto) fs.promises.unlink(fp).catch(() => {});
if (!buffer?.length) throw new Error('arquivo vazio');
return { buffer, titulo: r.title || null };
} catch (e) {
console.log(`[YOUTUBE] ytdl falhou (${e.message}); tentando pela API`);
return null;
}
}

// 1ª opção: rota da API que já devolve o ARQUIVO pronto (/api/download/youtube/audio|video).
// A própria API baixa (ytdl-core → yt-dlp → reservas) e repassa: não tem link preso ao IP nem link
// vencido, e o mesmo vídeo pedido de novo sai do cache dela. Se a API não tiver essa rota
// (versão antiga → 404) ou falhar, devolve null e o fluxo segue pelos outros caminhos.
async function baixarArquivoDaApi(id, tipo) {
const caminho = `/api/download/youtube/${tipo}`;
let r;
try {
r = await axios.get(apiUrl(caminho, { url: `https://youtu.be/${id}` }), {
responseType: 'arraybuffer',
timeout: tipo === 'audio' ? 300000 : 480000,
maxContentLength: LIMITE_BYTES,
maxBodyLength: LIMITE_BYTES,
headers: UA,
validateStatus: () => true,
});
} catch (e) {
console.log(`[YOUTUBE] API (arquivo) sem resposta (${e.code || e.message}); tentando outro caminho`);
return null;
}
const tipoResp = String(r.headers['content-type'] || '');
const buffer = Buffer.from(r.data || []);
if (r.status >= 400 || /json|text\/html/.test(tipoResp) || !buffer.length) {
let motivo = `HTTP ${r.status}`;
try { const j = JSON.parse(buffer.toString('utf8')); motivo = apiErro(j, motivo); } catch {}
if (r.status !== 404) console.log(`[YOUTUBE] API (arquivo) falhou: ${motivo}; tentando outro caminho`);
return null;
}
let titulo = null;
try { titulo = decodeURIComponent(String(r.headers['x-video-title'] || '')) || null; } catch {}
return { buffer, titulo, mimetype: tipoResp.split(';')[0] };
}

async function pedirLink(id, tipo, novo = false) {
// `novo`: nas tentativas seguintes manda um parâmetro extra para não reaproveitar um link já vencido
const params = { url: `https://youtu.be/${id}`, ...(novo ? { t: Date.now() } : {}) };
const j = await comRetry(() => apiJson(`/api/download/youtube-beta/${tipo}`, params, { timeout: 120000 }));
if (!j.success || !j.data?.url) throw new ApiError(apiErro(j, 'a API não mandou o link do arquivo'), { route: `/api/download/youtube-beta/${tipo}`, data: j });
return j.data;
}

// Última opção (rota antiga, JSON + link do conversor): se o link do arquivo falhar (404 = link vencido ou arquivo ainda sendo preparado),
// espera um pouco, pede um link novo e tenta de novo (até 3 vezes).
async function baixarComTentativas(id, tipo, info) {
let ultimoErro;
for (let tentativa = 0; tentativa < 3; tentativa++) {
if (tentativa > 0) {
await new Promise(r => setTimeout(r, 2000 * tentativa));
try { info = await pedirLink(id, tipo, true); }
catch (e) { ultimoErro = e; continue; }
}
try { return { arquivo: await baixarDoLink(info.url), info }; }
catch (e) {
ultimoErro = e;
console.log(`[YOUTUBE] link do arquivo falhou (${e.message}); tentativa ${tentativa + 1}/3`);
}
}
throw ultimoErro;
}

async function baixarDoLink(link) {
const r = await axios.get(link, {
responseType: 'arraybuffer',
timeout: 300000,
maxContentLength: LIMITE_BYTES,
maxBodyLength: LIMITE_BYTES,
headers: UA,
validateStatus: () => true,
});
if (r.status >= 400) {
// link do googlevideo é preso ao IP de quem gerou (a API): de outro IP dá 403
const preso = /googlevideo\.com/.test(link) && r.status === 403;
throw new Error(preso
? 'o link do vídeo só funciona no IP da API (googlevideo 403); a API precisa baixar e repassar o arquivo'
: `o servidor do arquivo respondeu ${r.status}`);
}
const buffer = Buffer.from(r.data);
if (!buffer.length) throw new Error('arquivo vazio');
if (String(r.headers['content-type'] || '').includes('text/html')) throw new Error('o link devolveu uma página, não o arquivo');
return buffer;
}

// mp3 -> m4a (toca melhor no WhatsApp do iPhone). Sem ffmpeg, fica o mp3 mesmo.
function paraM4A(mp3) {
return new Promise((resolve) => {
const id = crypto.randomBytes(8).toString('hex');
const entrada = path.join(pastaTemp(), `yt_${id}.mp3`);
const saida = path.join(pastaTemp(), `yt_${id}.m4a`);
const limpar = () => { for (const f of [entrada, saida]) try { fs.unlinkSync(f); } catch {} };
try { fs.writeFileSync(entrada, mp3); } catch { return resolve(mp3); }
let ff;
try {
ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', entrada, '-c:a', 'aac', '-b:a', '128k', '-ar', '44100', '-ac', '2', '-movflags', '+faststart', saida]);
} catch { limpar(); return resolve(mp3); }
ff.on('error', () => { limpar(); resolve(mp3); });
ff.on('close', (code) => {
let out = mp3;
if (code === 0) try { out = fs.readFileSync(saida); } catch {}
limpar();
resolve(out);
});
});
}

// m4a/mp4 já toca em qualquer WhatsApp: não precisa converter
const ehMp4 = (b) => b?.length > 12 && b.subarray(4, 8).toString() === 'ftyp';
const ehMp3 = (b) => b?.subarray(0, 3).toString() === 'ID3' || (b?.[0] === 0xff && (b[1] & 0xe0) === 0xe0);

/**
* @param {string} entrada link do YouTube ou ID do vídeo
* @param {'audio'|'video'} tipo
* @returns {Promise<{ buffer: Buffer, info: object|null, doCache: boolean, mimetype: string, ext: string }>}
*/
async function baixarYoutube(entrada, tipo) {
const id = extrairIdYoutube(entrada);
if (!id) throw new Error('link do YouTube inválido');
let info = null;
const { buffer, doCache } = await midiaComCache(id, tipo, async () => {
const daApi = await baixarArquivoDaApi(id, tipo);
if (daApi) {
info = { titulo: daApi.titulo };
if (daApi.titulo) { titulos.set(id, daApi.titulo); if (titulos.size > 2000) titulos.delete(titulos.keys().next().value); }
// a API já manda m4a (AAC); só converte se vier em outro formato
return tipo === 'audio' && !ehMp4(daApi.buffer) ? paraM4A(daApi.buffer) : daApi.buffer;
}
const local = await baixarPeloYtdl(id, tipo);
if (local) {
info = { titulo: local.titulo };
if (local.titulo) { titulos.set(id, local.titulo); if (titulos.size > 2000) titulos.delete(titulos.keys().next().value); }
return tipo === 'audio' && !ehMp4(local.buffer) ? paraM4A(local.buffer) : local.buffer;
}
info = await pedirLink(id, tipo);
if (info?.titulo) { titulos.set(id, info.titulo); if (titulos.size > 2000) titulos.delete(titulos.keys().next().value); }
const baixado = await baixarComTentativas(id, tipo, info);
info = baixado.info;
if (info?.titulo) titulos.set(id, info.titulo);
return tipo === 'audio' && !ehMp4(baixado.arquivo) ? paraM4A(baixado.arquivo) : baixado.arquivo;
});
if (!buffer?.length) throw new Error('não veio nenhum arquivo');
info ??= titulos.has(id) ? { titulo: titulos.get(id) } : null;
if (tipo === 'audio') {
const mp3 = ehMp3(buffer);
return { buffer, info, doCache, mimetype: mp3 ? 'audio/mpeg' : 'audio/mp4', ext: mp3 ? 'mp3' : 'm4a' };
}
return { buffer, info, doCache, mimetype: 'video/mp4', ext: 'mp4' };
}

// título por vídeo, para a legenda continuar certa quando o arquivo vem do cache
const titulos = new Map();

const nomeArquivo = (titulo, ext, padrao) => `${String(titulo || padrao).replace(/[\\/:*?"<>|]/g, '').trim().slice(0, 80) || padrao}.${ext}`;

/**
* Monta um comando de download do YouTube (todos os ytaudio/ytvideo e os botões do play usam este).
* @param {{ name: string, aliases?: string[], description: string, tipo: 'audio'|'video', aceitaId?: boolean, aviso?: string }} op
*/
function comandoYoutube(op) {
const emoji = op.tipo === 'audio' ? '🎵' : '🎬';
return {
name: op.name,
aliases: op.aliases || [],
category: 'downloads',
description: op.description,
async execute(ctx) {
const { reply, q, emojii, kiimorizinha, from, selo, prefix, command, reagir } = ctx;
const entrada = String(q || '').trim().split(/\s+/)[0];
const id = extrairIdYoutube(entrada);
if (!id || (!op.aceitaId && !/youtu\.?be/i.test(entrada))) {
return reply(op.aceitaId
? `Use ${prefix}play <nome da música> e toque no botão de baixar.`
: `${emoji}『${emojii}❌』Você usou da forma errada, use assim: ${prefix + command} https://youtu.be/SmWQg6G9Pxg`);
}
try {
reagir?.(from, '⏳');
if (op.aviso) reply(op.aviso.replace('{emojii}', emojii));
const { buffer, info, mimetype, ext } = await baixarYoutube(id, op.tipo);
const titulo = info?.titulo || (op.tipo === 'audio' ? 'YouTube Audio' : 'YouTube Video');
const fileName = nomeArquivo(titulo, ext, op.tipo);
if (op.tipo === 'audio') {
await kiimorizinha.sendMessage(from, { audio: buffer, mimetype, fileName, ptt: false }, { quoted: selo });
} else if (buffer.length > 95 * 1024 * 1024) {
// acima do limite de vídeo do WhatsApp: vai como documento
await kiimorizinha.sendMessage(from, { document: buffer, mimetype, fileName, caption: `${emoji} *${titulo}*` }, { quoted: selo });
} else {
await kiimorizinha.sendMessage(from, { video: buffer, mimetype, fileName, caption: `${emoji} *${titulo}*${info?.qualidade ? ` (${info.qualidade})` : ''}` }, { quoted: selo });
}
reagir?.(from, '✅');
} catch (e) {
console.error(`\x1b[31m[ERRO]\x1b[0m ${prefix + command}${e?.route ? ` (${e.route})` : ''} → ${textoDoErro(e)}`);
reagir?.(from, '❌');
await reply(`❌ Não consegui baixar o ${op.tipo === 'audio' ? 'áudio' : 'vídeo'}: ${textoDoErro(e)}`);
}
},
};
}

export { baixarYoutube, extrairIdYoutube, nomeArquivo, comandoYoutube };
export default { baixarYoutube, extrairIdYoutube, nomeArquivo, comandoYoutube };
