const { readJSON, writeJSON } = require('./database.js');

const COMPRAS_PATH = './database/usuarios/compras_pendentes.json';
const ESPERA_LINK_PATH = './database/func/espera_link_aluguel.json';
const ESPERA_LINK_TIMEOUT_MS = 30 * 60 * 1000;

function vipPlanos() {
return [
{ id: '1d', nome: '⭐ 1 DIA', dias: 1, precoCoins: 150, desc: 'Teste o VIP por 1 dia' },
{ id: '3d', nome: '⭐ 3 DIAS', dias: 3, precoCoins: 350, desc: 'VIP por 3 dias' },
{ id: '7d', nome: '⭐ 7 DIAS', dias: 7, precoCoins: 700, desc: 'VIP por 1 semana' },
{ id: '15d', nome: '⭐ 15 DIAS', dias: 15, precoCoins: 1200, desc: 'VIP por 2 semanas' },
{ id: '30d', nome: '⭐ 30 DIAS', dias: 30, precoCoins: 2200, desc: 'VIP por 1 mês' },
];
}

function findVipPlano(id) {
return vipPlanos().find(p => p.id === String(id || '').toLowerCase()) || null;
}

function precoAluguelEmCoins(planoAluguel) {
return Math.round((planoAluguel?.valor || 0) * 100);
}

function lerCompras() {
return readJSON(COMPRAS_PATH, {});
}

function salvarCompras(compras) {
writeJSON(COMPRAS_PATH, compras);
}

function adicionarCompraVip(numero, dias) {
const compras = lerCompras();
if (!compras[numero]) compras[numero] = { vipDiasPendentes: 0, aluguelPendente: [] };
compras[numero].vipDiasPendentes = (compras[numero].vipDiasPendentes || 0) + dias;
salvarCompras(compras);
return compras[numero].vipDiasPendentes;
}

function adicionarCompraAluguel(numero, planoId, dias, horas) {
const compras = lerCompras();
if (!compras[numero]) compras[numero] = { vipDiasPendentes: 0, aluguelPendente: [] };
compras[numero].aluguelPendente.push({ planoId, dias, horas, compradoEm: Date.now() });
salvarCompras(compras);
return compras[numero].aluguelPendente.length;
}

function getComprasPendentes(numero) {
const compras = lerCompras();
return compras[numero] || { vipDiasPendentes: 0, aluguelPendente: [] };
}

function consumirVipPendente(numero) {
const compras = lerCompras();
const dias = compras[numero]?.vipDiasPendentes || 0;
if (dias <= 0) return 0;
compras[numero].vipDiasPendentes = 0;
salvarCompras(compras);
return dias;
}

function consumirAluguelPendente(numero) {
const compras = lerCompras();
const lista = compras[numero]?.aluguelPendente || [];
if (lista.length === 0) return null;
const proximo = lista.shift();
salvarCompras(compras);
return proximo;
}

function lerEsperaLink() {
return readJSON(ESPERA_LINK_PATH, {});
}

function salvarEsperaLink(espera) {
writeJSON(ESPERA_LINK_PATH, espera);
}

function iniciarEsperaLink(numero, dias, horas) {
const espera = lerEsperaLink();
espera[numero] = { dias, horas, expiraPedidoEm: Date.now() + ESPERA_LINK_TIMEOUT_MS };
salvarEsperaLink(espera);
}

function getEsperaLink(numero) {
const espera = lerEsperaLink();
const entry = espera[numero];
if (!entry) return null;
if (Date.now() > entry.expiraPedidoEm) {
delete espera[numero];
salvarEsperaLink(espera);
return null;
}
return entry;
}

function limparEsperaLink(numero) {
const espera = lerEsperaLink();
delete espera[numero];
salvarEsperaLink(espera);
}

const moment = require('moment-timezone');

function concederVip(vip, numero, dias) {
const idx = vip.findIndex(i => i.id === numero);
if (idx >= 0) {
if (vip[idx].infinito === true) return { ok: false, motivo: 'ja_infinito' };
vip[idx].dias += dias;
} else {
const diaAtual = Number(moment.tz('America/Sao_Paulo').format('DD'));
vip.push({ id: numero, dias, save: diaAtual, infinito: false });
}
writeJSON('./database/usuarios/vip.json', vip);
return { ok: true };
}

module.exports = {
concederVip,
vipPlanos,
findVipPlano,
precoAluguelEmCoins,
getComprasPendentes,
adicionarCompraVip,
adicionarCompraAluguel,
consumirVipPendente,
consumirAluguelPendente,
iniciarEsperaLink,
getEsperaLink,
limparEsperaLink,
};
