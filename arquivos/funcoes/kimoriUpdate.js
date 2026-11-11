// Atualizações da Kimori pela OrbitalApis.
//
// - Consulta:  GET {API_KIMORI_URL}/api/kimori/version?from=<versão atual>   (grátis)
// - Instalação: GET {API_KIMORI_URL}/api/kimori/update?from=<versão atual>&apikey=...  (100 requests)
//   A API manda UM zip com tudo o que mudou desde a versão do bot (mesmo pulando várias versões).
// - Aviso: de tempos em tempos o bot confere se saiu versão nova e avisa o dono no privado (uma vez
//   por versão).
import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';
import axios from 'axios';
import AdmZip from 'adm-zip';
import { loadJSON } from './jsonCache.js';

const config = loadJSON(new URL('../../config-bot/config.json', import.meta.url));
const ROOT = process.cwd();
const PKG = path.join(ROOT, 'package.json');
const AVISO_FILE = path.join(ROOT, 'database', 'update-aviso.json');
export const MARCADOR_FILE = path.join(ROOT, 'database', 'update-pendente.json');

// nunca sobrescreve dados/configurações de quem usa o bot (a API já filtra; aqui é a 2ª trava)
const PROTEGIDOS = [/^database\//i, /^config-bot\//i, /^node_modules\//i, /^\.env/i, /^session/i, /^qr-?code/i, /^\.git\//i, /^auth[_-]?info/i, /^package-lock\.json$/i];

const base = () => String(config.API_KIMORI_URL || '').replace(/\/+$/, '');
const apikey = () => config.APIKEY_KIMORI || '';

export function versaoAtual() {
  try { return JSON.parse(fs.readFileSync(PKG, 'utf8')).version || '0.0.0'; } catch { return '0.0.0'; }
}

export function compararVersoes(a, b) {
  const pa = String(a).replace(/^v/i, '').split('.').map(Number);
  const pb = String(b).replace(/^v/i, '').split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d) return d;
  }
  return 0;
}

export function formatarTamanho(bytes) {
  if (bytes === undefined || bytes === null) return '—';
  const u = ['B', 'KB', 'MB', 'GB'];
  let i = 0, v = bytes;
  while (v >= 1024 && i < u.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(v < 10 && i > 0 ? 1 : 0)} ${u[i]}`;
}

function erroDaApi(e, padrao) {
  const d = e?.response?.data;
  let j = d;
  if (d && (Buffer.isBuffer(d) || d instanceof ArrayBuffer)) { try { j = JSON.parse(Buffer.from(d).toString('utf8')); } catch { j = null; } }
  return j?.message || j?.error || (e?.code === 'ECONNABORTED' ? 'a API demorou demais para responder' : padrao);
}

/** Info da versão mais nova + o que falta a partir da versão atual. */
export async function consultarAtualizacao() {
  if (!base()) throw new Error('API_KIMORI_URL não configurada no config-bot/config.json');
  const atual = versaoAtual();
  let info;
  try {
    ({ data: info } = await axios.get(`${base()}/api/kimori/version`, { params: { from: atual }, timeout: 20000 }));
  } catch (e) {
    if (e?.response?.status === 404) return { atual, info: null, tem: false };
    throw new Error(erroDaApi(e, 'não consegui falar com a OrbitalApis'));
  }
  const tem = !!info?.version && compararVersoes(info.version, atual) > 0;
  return { atual, info, tem };
}

/** Texto com as notas de cada versão que falta. */
export function notasPendentes(info) {
  const lista = info?.pending?.length ? info.pending : info ? [info] : [];
  return lista.map((p) => `*${p.version}*\n${(p.changelog || 'sem notas.').trim()}`).join('\n\n');
}

// mescla o package.json da atualização sem apagar o que é do usuário; diz se mudou dependência
function mesclarPackage(novoTexto) {
  let atual = {};
  try { atual = JSON.parse(fs.readFileSync(PKG, 'utf8')); } catch {}
  let novo;
  try { novo = JSON.parse(novoTexto); } catch { return false; }
  let mudouDeps = false;
  for (const campo of ['dependencies', 'optionalDependencies']) {
    if (!novo[campo]) continue;
    atual[campo] = atual[campo] || {};
    for (const [nome, ver] of Object.entries(novo[campo])) {
      if (atual[campo][nome] !== ver) { atual[campo][nome] = ver; mudouDeps = true; }
    }
  }
  for (const campo of ['scripts', 'main', 'type', 'engines']) if (novo[campo] !== undefined) atual[campo] = novo[campo];
  fs.writeFileSync(PKG, JSON.stringify(atual, null, 2));
  return mudouDeps;
}

function npmInstall() {
  return new Promise((resolve) => {
    exec('npm install --omit=dev --no-audit --no-fund', { cwd: ROOT, timeout: 10 * 60 * 1000, maxBuffer: 8 * 1024 * 1024 }, (err, stdout, stderr) => {
      resolve(err ? { ok: false, erro: String(stderr || err.message).trim().split('\n').slice(-3).join(' | ') } : { ok: true });
    });
  });
}

/**
 * Baixa e aplica a atualização. Não reinicia: quem chama decide (manda a mensagem e sai).
 * @returns {{ de, para, arquivos, ignorados, npm }}
 */
export async function instalarAtualizacao({ from } = {}) {
  if (!base()) throw new Error('API_KIMORI_URL não configurada no config-bot/config.json');
  if (!apikey()) throw new Error('APIKEY_KIMORI não configurada no config-bot/config.json');
  const de = versaoAtual();
  let resp;
  try {
    resp = await axios.get(`${base()}/api/kimori/update`, {
      params: { from: de, apikey: apikey() },
      responseType: 'arraybuffer',
      timeout: 180000,
      maxContentLength: 200 * 1024 * 1024,
    });
  } catch (e) {
    throw new Error(erroDaApi(e, 'falha ao baixar a atualização'));
  }
  const para = resp.headers['x-kimori-version'];
  const buffer = Buffer.from(resp.data);
  if (!para || buffer.readUInt32LE(0) !== 0x04034b50) throw new Error('a API não mandou um pacote de atualização válido');

  const zip = new AdmZip(buffer);
  let arquivos = 0;
  const ignorados = [];
  let mudouDeps = false;
  for (const e of zip.getEntries()) {
    if (e.isDirectory) continue;
    const nome = e.entryName.replace(/\\/g, '/').replace(/^\.\//, '');
    const destino = path.resolve(ROOT, nome);
    // trava contra caminhos que saem da pasta do bot (../) e arquivos protegidos
    if (!destino.startsWith(ROOT + path.sep) || PROTEGIDOS.some((re) => re.test(nome))) { ignorados.push(nome); continue; }
    if (nome === 'package.json') { mudouDeps = mesclarPackage(e.getData().toString('utf8')); arquivos++; continue; }
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(`${destino}.tmp-update`, e.getData());
    fs.renameSync(`${destino}.tmp-update`, destino);
    arquivos++;
  }

  // nova versão no package.json
  const pkg = JSON.parse(fs.readFileSync(PKG, 'utf8'));
  pkg.version = para;
  fs.writeFileSync(PKG, JSON.stringify(pkg, null, 2));

  const npm = mudouDeps ? await npmInstall() : null;

  // marcador: depois de reiniciar, o bot avisa que deu certo (o connect.js apaga depois de mandar)
  fs.mkdirSync(path.dirname(MARCADOR_FILE), { recursive: true });
  fs.writeFileSync(MARCADOR_FILE, JSON.stringify({ from, versaoAntiga: de, versaoNova: para, quando: Date.now() }));
  // já atualizou: não precisa avisar dessa versão
  marcarAvisado(para);

  return { de, para, arquivos, ignorados, npm, restante: resp.headers['x-api-key-remaining'] };
}

// ───────── aviso de nova versão no privado do dono ─────────
function ultimaAvisada() {
  try { return JSON.parse(fs.readFileSync(AVISO_FILE, 'utf8')).version || null; } catch { return null; }
}
function marcarAvisado(version) {
  try {
    fs.mkdirSync(path.dirname(AVISO_FILE), { recursive: true });
    fs.writeFileSync(AVISO_FILE, JSON.stringify({ version, quando: Date.now() }));
  } catch {}
}

function donos() {
  const out = [];
  const num = String(config.ownerNumber || config.OwnerNumber || '').replace(/\D/g, '');
  if (num) out.push(`${num}@s.whatsapp.net`);
  const lid = String(config.ownerNumberLid || config.OwnerNumberLid || '').trim();
  if (lid) out.push(lid.includes('@') ? lid : `${lid.replace(/\D/g, '')}@lid`);
  return out;
}

let sockAtual = null;
let timer = null;
let primeiro = null;
const INTERVALO_MS = 30 * 60 * 1000;

async function checarEAvisar() {
  const sock = sockAtual;
  if (!sock || !base()) return;
  let r;
  try { r = await consultarAtualizacao(); } catch { return; }
  if (!r.tem || ultimaAvisada() === r.info.version) return;
  const prefixo = config.prefix || '.';
  const texto =
    `*『🆕』 𝙽𝚘𝚟𝚊 𝚊𝚝𝚞𝚊𝚕𝚒𝚣𝚊𝚌̧𝚊̃𝚘 𝚍𝚊 𝙺𝚒𝚖𝚘𝚛𝚒!*\n\n` +
    `• Sua versão: ${r.atual}\n` +
    `• Nova versão: *${r.info.version}*\n` +
    `• Publicada em: ${new Date(r.info.releaseDate).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}\n` +
    `• Tamanho: ${formatarTamanho(r.info.sizeBytesTotal ?? r.info.sizeBytes)}\n\n` +
    `*O que mudou:*\n${notasPendentes(r.info)}\n\n` +
    `> Use ${prefixo}update start para instalar (consome ${r.info.cost || 100} requests da sua key).`;
  for (const jid of donos()) {
    try {
      await sock.sendMessage(jid, { text: texto });
      marcarAvisado(r.info.version);
      console.log(`[UPDATE] dono avisado da versão ${r.info.version} (${jid})`);
      return;
    } catch (e) {
      console.log(`[UPDATE] não consegui avisar ${jid}: ${e.message}`);
    }
  }
}

/** Chamado quando o bot conecta. Seguro chamar a cada reconexão (só existe 1 timer). */
export function iniciarAvisoDeAtualizacao(sock) {
  sockAtual = sock;
  if (!timer) {
    timer = setInterval(() => checarEAvisar().catch(() => {}), INTERVALO_MS);
    timer.unref?.();
  }
  clearTimeout(primeiro);
  primeiro = setTimeout(() => checarEAvisar().catch(() => {}), 60 * 1000);
  primeiro.unref?.();
}

/** Confere agora (sem esperar o timer). */
export const verificarAtualizacaoAgora = () => checarEAvisar();
