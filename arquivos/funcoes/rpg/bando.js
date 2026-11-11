import fs from 'node:fs';

const BANDO_PATH = './database/rpg/bandos.json';

function loadBandos() {
try {
const raw = fs.readFileSync(BANDO_PATH);
const db = JSON.parse(raw);
return Array.isArray(db) ? db : [];
} catch {
return [];
}
}

function saveBandos(bandos) {
try {
if (!fs.existsSync('./database/rpg')) fs.mkdirSync('./database/rpg', { recursive: true });
fs.writeFileSync(BANDO_PATH, JSON.stringify(bandos, null, 2));
} catch (e) { console.error('[erro]', e) }
}

// Transforma "Chapéus de Palha 2" em "chapeus-de-palha-2" pra virar o id
// único do bando (mais amigável do que um uuid pra digitar em comandos).
function slugify(nome) {
return String(nome)
.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
.toLowerCase()
.replace(/[^a-z0-9]+/g, '-')
.replace(/(^-|-$)/g, '')
.slice(0, 30);
}

function getBando(bandos, id) {
return bandos.find(b => b.id === id) || null;
}

function getBandoDoJogador(bandos, jid) {
return bandos.find(b => b.capitao === jid || b.membros.includes(jid)) || null;
}

function gerarIdUnico(bandos, nome) {
const base = slugify(nome) || 'bando';
let id = base;
let n = 2;
while (getBando(bandos, id)) {
id = `${base}-${n}`;
n += 1;
}
return id;
}

function criarBando(bandos, nome, capitaoJid) {
const bando = {
id: gerarIdUnico(bandos, nome),
nome: String(nome).trim().slice(0, 40),
capitao: capitaoJid,
membros: [capitaoJid],
convites: [], // jids convidados, aguardando ${prefix}entrarbando
criadoEm: Date.now(),
};
bandos.push(bando);
return bando;
}

const MEMBROS_MAX = 6;

export default {
BANDO_PATH,
MEMBROS_MAX,
loadBandos,
saveBandos,
getBando,
getBandoDoJogador,
criarBando,
};

export { BANDO_PATH, MEMBROS_MAX, loadBandos, saveBandos, getBando, getBandoDoJogador, criarBando };
