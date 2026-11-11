// Configuração de primeiro uso (igual à da Nagatoro): na primeira vez que alguém manda um
// comando, a Kimori pergunta o nome do dono, o número do dono e a key da OrbitalApis, e salva
// tudo no config-bot/config.json. Só roda enquanto a bot não estiver configurada:
//   - "configurado": false no config.json  → pergunta (use isso na cópia que você vende)
//   - sem "ownerNumber" no config.json     → pergunta
//   - bots já em uso (com ownerNumber e sem "configurado") → não muda nada
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import axios from 'axios';
import { loadJSON } from './jsonCache.js';

const CONFIG_URL = new URL('../../config-bot/config.json', import.meta.url);
const ESTADO_URL = new URL('../../config-bot/primeiro-uso.json', import.meta.url);
const config = loadJSON(CONFIG_URL);

// fluxo parado por mais que isso (alguém começou e sumiu): libera pra outro chat
const EXPIRA_MS = 5 * 60 * 1000;
const SITE_PADRAO = 'https://api.orbitalcode.online';

const digitos = (s) => String(s || '').split('@')[0].split(':')[0].replace(/\D/g, '');
const site = () => String(config.API_KIMORI_URL || SITE_PADRAO).replace(/\/+$/, '');
const mascarar = (k) => (k.length <= 8 ? '****' : `${k.slice(0, 4)}****${k.slice(-4)}`);
const limparKey = (raw) => String(raw || '').replace(/^[\s"'`“”‘’]+|[\s"'`“”‘’]+$/g, '').trim();

export function botConfigurada() {
if (config.configurado === true) return true;
if (config.configurado === false) return false;
return digitos(config.ownerNumber).length >= 10;
}

function salvarConfig() {
fs.writeFileSync(fileURLToPath(CONFIG_URL), JSON.stringify(config, null, 2) + '\n');
}

function lerEstado() {
try { return JSON.parse(fs.readFileSync(fileURLToPath(ESTADO_URL), 'utf8')); } catch { return null; }
}
function salvarEstado(estado) {
try { fs.writeFileSync(fileURLToPath(ESTADO_URL), JSON.stringify({ ...estado, atualizadoEm: Date.now() }, null, 2)); } catch {}
}
function limparEstado() {
try { fs.unlinkSync(fileURLToPath(ESTADO_URL)); } catch {}
}
const expirado = (e) => !e?.atualizadoEm || Date.now() - e.atualizadoEm > EXPIRA_MS;

function simOuNao(texto) {
const t = texto.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
if (t === 'sim' || t === 's') return true;
if (t === 'nao' || t === 'n') return false;
return null;
}

// confere a key na rota /api/status (não gasta request)
async function checarKey(key) {
try {
const r = await axios.get(`${site()}/api/status`, { params: { apikey: key }, timeout: 15000, validateStatus: () => true });
const d = r.data && typeof r.data === 'object' ? r.data : null;
if (r.status === 200 && d?.success) return { estado: 'ok', info: d };
if ([401, 403, 404].includes(r.status)) return { estado: 'invalida', texto: d?.message || d?.error || 'API Key não encontrada' };
return { estado: 'offline', texto: d?.message || `o site da API respondeu ${r.status}` };
} catch (e) {
return { estado: 'offline', texto: `não consegui falar com o site da API (${e.code || e.message})` };
}
}

const textoBoasVindas = (nomeBot) =>
`👋 Olá, pelo visto você adquiriu a *${nomeBot}*!!!!\n\n` +
'Muito obrigado por confiar em nossos projetos. Vamos configurar ela? Digite *Sim* ou *Não*.';

const textoKey = (nomeBot) =>
`🔑 Última etapa: a ${nomeBot} usa a *OrbitalApis* (downloads, figurinhas, IAs e outros recursos). ` +
'Você já tem uma *key* da OrbitalApis? Digite *Sim* ou *Não*.';

/**
* Chamado em toda mensagem (antes dos comandos). Devolve true se a mensagem foi usada
* pela configuração (aí o kimori.js não continua processando ela).
*/
export async function primeiroUso({ sock, info, from, body, isCmd, prefix, sender, senderNumeroReal }) {
const configurada = botConfigurada();
let estado = lerEstado();
if (estado && expirado(estado)) { limparEstado(); estado = null; }

// configurada e sem pergunta da key pendente: nada a fazer
if (configurada && !String(estado?.passo || '').startsWith('key_')) return false;

const nomeBot = config.NomeDoBot || 'Kimori';
const enviar = (text) => sock.sendMessage(from, { text }, { quoted: info }).catch(() => {});
const texto = String(body || '').trim();

// ainda não configurada: qualquer comando abre a configuração
if (!configurada && isCmd) {
if (estado?.passo && estado.chatId !== from) {
await enviar('⚙️ Já estou sendo configurada em outra conversa agora. Aguenta aí!');
return true;
}
if (!estado?.passo) {
salvarEstado({ passo: 'confirmar', chatId: from, quem: digitos(senderNumeroReal) || digitos(sender) });
await enviar(textoBoasVindas(nomeBot));
return true;
}
}

if (!estado?.passo || estado.chatId !== from || !texto || isCmd) return false;

// só responde quem começou a configuração (ou o dono que acabou de ser salvo)
const autorizados = [estado.quem, digitos(config.ownerNumber), digitos(config.ownerNumberLid)].filter(Boolean);
const quem = [digitos(sender), digitos(senderNumeroReal)];
if (autorizados.length && !quem.some((d) => d && autorizados.includes(d))) return false;

switch (estado.passo) {
case 'confirmar': {
const r = simOuNao(texto);
if (r === null) return false;
if (!r) {
limparEstado();
await enviar('Tudo bem, quando quiser configurar é só mandar qualquer comando de novo.');
return true;
}
salvarEstado({ ...estado, passo: 'nome' });
await enviar('Qual vai ser o nome do(a) dono(a)? Digite aí:');
return true;
}

case 'nome': {
const nome = texto.slice(0, 40);
salvarEstado({ ...estado, passo: 'usar_numero_atual', nome });
await enviar(`Show, ${nome}! Agora o número do(a) dono(a): deseja que seja o número que você está usando agora aí? Digite *Sim* ou *Não*.`);
return true;
}

case 'usar_numero_atual': {
const r = simOuNao(texto);
if (r === null) return false;
if (r) {
const numero = digitos(senderNumeroReal) || digitos(sender);
const lid = String(sender || '').endsWith('@lid') ? `${digitos(sender)}@lid` : '';
return terminar({ estado, numero, lid, enviar, from, nomeBot });
}
salvarEstado({ ...estado, passo: 'numero' });
await enviar('Beleza, digite o número do(a) dono(a) com DDI e DDD, só números. Ex: 5511999999999');
return true;
}

case 'numero': {
const numero = texto.replace(/\D/g, '');
if (numero.length < 10 || numero.length > 15) {
await enviar('❌ Número inválido. Digite só os números, com DDI e DDD. Ex: 5511999999999');
return true;
}
return terminar({ estado, numero, lid: '', enviar, from, nomeBot });
}

case 'key_confirmar': {
const r = simOuNao(texto);
if (r === null) return false;
if (!r) {
limparEstado();
await enviar(`Sem problema! 😉 Para comprar sua key, acesse:\n${site()}/planos\n\nDepois de comprar, é só mandar (de preferência no privado):\n*${prefix}setarkey sua_key*\n\nVocê pode trocar a key quando quiser com esse mesmo comando.`);
return true;
}
salvarEstado({ ...estado, passo: 'key_colar' });
await enviar(`Ótimo! Cole aqui a sua key da OrbitalApis (só a key, sem aspas).\n_Se preferir, depois use ${prefix}setarkey sua_key. Para desistir, digite *cancelar*._`);
return true;
}

case 'key_colar': {
if (/^(cancelar|cancela|sair)$/i.test(texto)) {
limparEstado();
await enviar(`Beleza! Quando tiver a key, use *${prefix}setarkey sua_key*.`);
return true;
}
const key = limparKey(texto);
if (/\s/.test(key) || key.length < 6) {
await enviar('❌ Essa key não parece certa. Cole ela inteira, sem espaços (ou digite *cancelar*).');
return true;
}
const check = await checarKey(key);
if (check.estado === 'invalida') {
await enviar(`❌ Key não aceita: ${check.texto}\n\nConfira e mande de novo, ou digite *cancelar*.`);
return true;
}
config.APIKEY_KIMORI = key;
salvarConfig();
limparEstado();
// em grupo, apaga a mensagem com a key
if (from.endsWith('@g.us')) await sock.sendMessage(from, { delete: info.key }).catch(() => {});
await enviar(check.estado === 'ok'
? `✅ Key ${mascarar(key)} salva e funcionando!\n\n📊 Status: *${check.info.status || 'Ativa'}*\n🎟️ Restantes: *${check.info.ilimitado ? 'ilimitado' : Number(check.info.requests_restantes || 0).toLocaleString('pt-BR')}*`
: `⚠️ Key ${mascarar(key)} salva, mas não consegui confirmar agora (${check.texto}). Use *${prefix}apistatus* mais tarde para conferir.`);
return true;
}

default:
limparEstado();
return false;
}
}

async function terminar({ estado, numero, lid, enviar, from, nomeBot }) {
config.ownerName = estado.nome;
config.ownerNumber = numero;
config.ownerNumberLid = lid; // número digitado: o LID antigo não vale mais
config.configurado = true;
salvarConfig();

// a key que veio no config.json da cópia vendida não conta: pergunta sempre
salvarEstado({ passo: 'key_confirmar', chatId: from, quem: estado.quem });
await enviar(`✅ Muito obrigado por configurar, ${estado.nome}!\n\nPense bem antes de vazar a ${nomeBot}, eu posso descobrir em minutos! Obg ❤️\n\n${textoKey(nomeBot)}`);
return true;
}
