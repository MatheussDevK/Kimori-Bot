const { readJSON, writeJSON } = require('./database.js');

const GIFTCODES_PATH = './database/func/giftcodes.json';

function lerCodigos() {
return readJSON(GIFTCODES_PATH, {});
}

function salvarCodigos(codigos) {
writeJSON(GIFTCODES_PATH, codigos);
}

function gerarSufixo() {
const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
let out = '';
for (let i = 0; i < 4; i++) out += chars[Math.floor(Math.random() * chars.length)];
return out;
}

function parseTipoValor(texto) {
const partes = String(texto || '').trim().toLowerCase().split(/\s+/);
if (partes.length < 2) return null;
const tipoRaw = partes[0];
const diasMatch = partes[1].match(/^(\d+)d$/);
if (!diasMatch) return null;
const dias = Number(diasMatch[1]);
if (!(dias > 0)) return null;
if (tipoRaw === 'vip') return { tipo: 'vip', dias };
if (tipoRaw === 'aluguel' || tipoRaw === 'aluguer') return { tipo: 'aluguel', dias };
return null;
}

function gerarGiftCode(texto) {
const parsed = parseTipoValor(texto);
if (!parsed) return { ok: false, motivo: 'formato_invalido' };
const codigos = lerCodigos();
const tipoLabel = parsed.tipo === 'vip' ? 'VIP' : 'ALUGUEL';
let code;
do {
code = `GIFT-${tipoLabel}${parsed.dias}D-${gerarSufixo()}`;
} while (codigos[code]);
codigos[code] = {
tipo: parsed.tipo,
dias: parsed.dias,
usado: false,
criadoEm: Date.now(),
};
salvarCodigos(codigos);
return { ok: true, code, tipo: parsed.tipo, dias: parsed.dias };
}

function resgatarGiftCode(code, numeroResgate) {
const codigos = lerCodigos();
const chaveReal = String(code || '').trim().toUpperCase();
if (!codigos[chaveReal]) return { ok: false, motivo: 'nao_encontrado' };
if (codigos[chaveReal].usado) return { ok: false, motivo: 'ja_usado' };
codigos[chaveReal].usado = true;
codigos[chaveReal].usadoPor = numeroResgate;
codigos[chaveReal].usadoEm = Date.now();
salvarCodigos(codigos);
return { ok: true, tipo: codigos[chaveReal].tipo, dias: codigos[chaveReal].dias };
}

module.exports = {
GIFTCODES_PATH,
parseTipoValor,
gerarGiftCode,
resgatarGiftCode,
};
