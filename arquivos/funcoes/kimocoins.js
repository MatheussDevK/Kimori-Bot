import { readJSON, writeJSON } from './database.js';

const KIMOCOINS_PATH = './database/usuarios/kimocoins.json';
const TAXA_TRANSFERENCIA = 0.10;
const TRANSFERENCIA_MINIMA = 500;

function lerLedger() {
return readJSON(KIMOCOINS_PATH, {});
}

function salvarLedger(ledger) {
writeJSON(KIMOCOINS_PATH, ledger);
}

function getSaldo(numero) {
const ledger = lerLedger();
return ledger[numero]?.saldo || 0;
}

// aceita só inteiros positivos (um NaN passava por todas as checagens e virava saldo NaN)
function quantidadeValida(q) {
return Number.isSafeInteger(q) && q > 0;
}

function addCoins(numero, quantidade) {
if (!numero || !quantidadeValida(quantidade)) return getSaldo(numero);
const ledger = lerLedger();
if (!ledger[numero]) ledger[numero] = { saldo: 0 };
ledger[numero].saldo += quantidade;
salvarLedger(ledger);
return ledger[numero].saldo;
}

function removeCoins(numero, quantidade) {
if (!numero || !quantidadeValida(quantidade)) return null;
const ledger = lerLedger();
if (!ledger[numero]) ledger[numero] = { saldo: 0 };
if (ledger[numero].saldo < quantidade) return null;
ledger[numero].saldo -= quantidade;
salvarLedger(ledger);
return ledger[numero].saldo;
}

function calcularTaxaTransferencia(quantidade) {
return Math.ceil(quantidade * TAXA_TRANSFERENCIA);
}

function transferirCoins(numeroOrigem, numeroDestino, quantidade) {
if (!quantidadeValida(quantidade)) return { ok: false, motivo: 'valor_invalido' };
if (!numeroOrigem || !numeroDestino || numeroOrigem === numeroDestino) return { ok: false, motivo: 'destino_invalido' };
if (quantidade < TRANSFERENCIA_MINIMA) {
return { ok: false, motivo: 'valor_minimo', minimo: TRANSFERENCIA_MINIMA };
}
const taxa = calcularTaxaTransferencia(quantidade);
const total = quantidade + taxa;
const ledger = lerLedger();
const saldoOrigem = ledger[numeroOrigem]?.saldo || 0;
if (saldoOrigem < total) {
return { ok: false, motivo: 'saldo_insuficiente', necessario: total, saldoAtual: saldoOrigem };
}
if (!ledger[numeroOrigem]) ledger[numeroOrigem] = { saldo: 0 };
if (!ledger[numeroDestino]) ledger[numeroDestino] = { saldo: 0 };
ledger[numeroOrigem].saldo -= total;
ledger[numeroDestino].saldo += quantidade;
salvarLedger(ledger);
return { ok: true, taxa, total, saldoOrigemDepois: ledger[numeroOrigem].saldo, saldoDestinoDepois: ledger[numeroDestino].saldo };
}

// Junta o saldo guardado numa chave antiga (ex.: dígitos do LID) na chave certa (telefone).
function mesclarSaldo(chaveCerta, chaveAntiga) {
if (!chaveCerta || !chaveAntiga || chaveCerta === chaveAntiga) return false;
const ledger = lerLedger();
const antigo = ledger[chaveAntiga]?.saldo || 0;
if (!ledger[chaveAntiga]) return false;
if (!ledger[chaveCerta]) ledger[chaveCerta] = { saldo: 0 };
ledger[chaveCerta].saldo += antigo;
delete ledger[chaveAntiga];
salvarLedger(ledger);
return true;
}

export default {
mesclarSaldo,
KIMOCOINS_PATH,
TAXA_TRANSFERENCIA,
TRANSFERENCIA_MINIMA,
getSaldo,
addCoins,
removeCoins,
calcularTaxaTransferencia,
transferirCoins,
};

export { mesclarSaldo, KIMOCOINS_PATH, TAXA_TRANSFERENCIA, TRANSFERENCIA_MINIMA, getSaldo, addCoins, removeCoins, calcularTaxaTransferencia, transferirCoins };
