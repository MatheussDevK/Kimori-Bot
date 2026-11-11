// Cache do /play:
// - busca: "nome da música" -> resultado (memória + disco), 7 dias
// - mídia: áudio/vídeo já baixado fica em database/cache/play/<id>.<ext>, 2 dias, até 150 MB
//   (antes 500 MB: num servidor pequeno isso sozinho enchia o disco). Só grava se houver espaço.
// - pedidos iguais ao mesmo tempo (várias pessoas clicando no mesmo botão) baixam UMA vez só
import fs from 'node:fs';
import path from 'node:path';
import { temEspaco } from './limpezaDisco.js';

const PASTA = './database/cache/play';
const ARQ_BUSCAS = './database/cache/play-buscas.json';
const BUSCA_TTL = 7 * 24 * 60 * 60 * 1000;
const BUSCA_MAX = 1000;
const MIDIA_TTL = 2 * 24 * 60 * 60 * 1000;
const MIDIA_MAX_BYTES = 150 * 1024 * 1024;
const MIDIA_MAX_ARQUIVO = 40 * 1024 * 1024; // vídeos enormes não vão para o cache

fs.mkdirSync(PASTA, { recursive: true });

// ---------- buscas ----------
const buscas = new Map();
try {
const salvo = JSON.parse(fs.readFileSync(ARQ_BUSCAS, 'utf8'));
for (const [k, v] of Object.entries(salvo || {})) if (v?.t && Date.now() - v.t < BUSCA_TTL) buscas.set(k, v);
} catch {}

let timerGravar = null;
function gravarBuscas() {
clearTimeout(timerGravar);
timerGravar = setTimeout(() => {
try {
const tmp = `${ARQ_BUSCAS}.tmp`;
try {
fs.writeFileSync(tmp, JSON.stringify(Object.fromEntries(buscas)));
fs.renameSync(tmp, ARQ_BUSCAS);
} catch (e) { try { fs.unlinkSync(tmp); } catch {} throw e; }
} catch (e) { console.error('[PLAY-CACHE] gravar buscas:', e.message); }
}, 3000);
timerGravar.unref?.();
}

const chaveBusca = (q) => String(q || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();

const emAndamento = new Map();
function umaVez(chave, fn) {
if (emAndamento.has(chave)) return emAndamento.get(chave);
const p = Promise.resolve().then(fn).finally(() => emAndamento.delete(chave));
emAndamento.set(chave, p);
return p;
}

/** Devolve { resultado, doCache }. `buscar` só é chamado se não houver no cache. */
async function buscarComCache(query, buscar) {
const chave = chaveBusca(query);
const c = buscas.get(chave);
if (c && Date.now() - c.t < BUSCA_TTL) {
buscas.delete(chave);
buscas.set(chave, c);
return { resultado: c.r, doCache: true };
}
const resultado = await umaVez('busca|' + chave, buscar);
if (resultado) {
buscas.set(chave, { r: resultado, t: Date.now() });
while (buscas.size > BUSCA_MAX) buscas.delete(buscas.keys().next().value);
gravarBuscas();
}
return { resultado, doCache: false };
}

// ---------- mídia ----------
const idValido = (id) => /^[\w-]{6,20}$/.test(String(id || ''));

function limparMidia() {
try {
const arquivos = fs.readdirSync(PASTA).map(nome => {
const p = path.join(PASTA, nome);
try { const st = fs.statSync(p); return st.isFile() ? { p, tam: st.size, t: st.mtimeMs } : null; } catch { return null; }
}).filter(Boolean).sort((a, b) => a.t - b.t);
let total = arquivos.reduce((s, a) => s + a.tam, 0);
for (const a of arquivos) {
if (Date.now() - a.t > MIDIA_TTL || total > MIDIA_MAX_BYTES) {
try { fs.unlinkSync(a.p); total -= a.tam; } catch {}
}
}
} catch (e) { console.error('[PLAY-CACHE] limpeza:', e.message); }
}
limparMidia();
setInterval(limparMidia, 60 * 60 * 1000).unref?.();

/**
* Devolve o Buffer da mídia. `baixar` só é chamado se não estiver no cache;
* precisa devolver um Buffer (ou null se falhar).
*/
async function midiaComCache(id, ext, baixar) {
if (!idValido(id)) throw new Error('ID de vídeo inválido');
const arquivo = path.join(PASTA, `${id}.${ext}`);
try {
const st = fs.statSync(arquivo);
if (st.size > 0 && Date.now() - st.mtimeMs < MIDIA_TTL) {
const agora = new Date();
fs.promises.utimes(arquivo, agora, agora).catch(() => {});
return { buffer: await fs.promises.readFile(arquivo), doCache: true };
}
} catch {}
const buffer = await umaVez(`midia|${id}|${ext}`, baixar);
if (buffer?.length && buffer.length <= MIDIA_MAX_ARQUIVO && temEspaco(buffer.length)) {
// grava em segundo plano (não atrasa a resposta) e de forma atômica
const tmp = `${arquivo}.${process.pid}.tmp`;
fs.promises.writeFile(tmp, buffer)
.then(() => fs.promises.rename(tmp, arquivo))
.then(() => limparMidia())
.catch((e) => {
fs.promises.unlink(tmp).catch(() => {});
if (e?.code === 'ENOSPC') global.__kimoriLimpezaEmergencia?.('ENOSPC no cache do play');
else console.error('[PLAY-CACHE] gravar mídia:', e.message);
});
}
return { buffer, doCache: false };
}

export { buscarComCache, midiaComCache, idValido };
export default { buscarComCache, midiaComCache, idValido };
