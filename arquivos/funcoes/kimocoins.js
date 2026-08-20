const { readJSON, writeJSON } = require('./database.js');

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

function addCoins(numero, quantidade) {
const ledger = lerLedger();
if (!ledger[numero]) ledger[numero] = { saldo: 0 };
ledger[numero].saldo += quantidade;
salvarLedger(ledger);
return ledger[numero].saldo;
}

function removeCoins(numero, quantidade) {
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

module.exports = {
KIMOCOINS_PATH,
TAXA_TRANSFERENCIA,
TRANSFERENCIA_MINIMA,
getSaldo,
addCoins,
removeCoins,
calcularTaxaTransferencia,
transferirCoins,
};
