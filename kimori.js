const { downloadContentFromMessage, relayWAMessage, mentionedJid, MediaType, Browser, MessageType, Presence, Mimetype, Browsers, delay, getLastMessageInChat, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, logger, makeInMemoryStore, getContentType, INativeFlowMessage, prepareWAMessageMedia, jidNormalizedUser } = require('@whiskeysockets/baileys');

const { fs, Boom, axios, crypto, util, P, linkfy, cheerio, ms, ffmpeg, qrterminal, exec, spawn, execSync, moment, color, time, hora, date, getBuffer, convertSticker, recognize, fetch, fetchJson, fetchText, getBase64, createExif, writeExifImg, upload, nit, addBanned, unBanned, BannedExpired, cekBannedUser, validmove, setGame, addComandosId, deleteComandos, getComandoBlock, getComandos, addComandos, getpc, supre, wait, getExtension, generateMessageID, getGroupAdmins, normalizeJid, getMembros, logos, sendPoll, getRandom, banner2, banner3, temporizador, chyt, kyun, TimeCount, botoff, colors, os, addFilter, isFiltered, MultiDownload, AssemblyAI, obeso, countDays, timeDate, Limit_CMD, capitalizeFirstLetter, shuffle, pushnames, formatNumber, formatNumberDecimal, listCommands, extractDDD, extractStateFromNumber, extractStateFromDDD, obrigadoEXT, addNumberMais, identArroba, carregarMidia } = require('./arquivos/funcoes/exports.js');
const { v4: uuidv4 } = require('uuid');

const { readJSON, writeJSON, getCached, setCached, mutateCached } = require('./arquivos/funcoes/database.js');

const { defaultGroupSettings, groupSettingsPath } = require('./arquivos/funcoes/groupSettings.js');

const { getExternalCommand } = require('./arquivos/funcoes/commandLoader.js');

const { getEsperaLink, limparEsperaLink } = require('./arquivos/funcoes/lojinha.js');

const directory = `./database/anti_sp.json`;
const ANT_SP = JSON.parse(fs.readFileSync(directory));

const ultimosNicks = {}
const { criarPagamentoPix, verificarPix } = require('./arquivos/funcoes/pix.js');

const { linguagem, MENU, mess, getInfo, tabela, namoro1, namoro2, tools, advices, ban, joguinhodavelhajs, joguinhodavelhajs2, nescessario, setting, logoslink, vip, rgtake, muted, countMessage, sendVideoAsSticker, sendImageAsSticker, sendVideoAsSticker2, sendImageAsSticker2, sotoy, daily, comandos, limitefll, antispam, anotar, enviarfiguUrl, getFileBuffer, DLT_FL, speed, sleep, ANT_LTR_MD_EMJ, packname, getName, chaves, grupos, getAntiRouboData, checkAntiRouboActive, extractTargetJids, saveAntiRouboData, clearPermissions, addPermission, removePermission, getResolvedPhoneList, sendInteractiveMessage, sendButtons, v8, sendAlbumMessage, sendInteractiveButtonsBasic } = require('./arquivos/funcoes/exports.js');

const { normalizarJid, normalizar, normalizarJidX9, normalizeJidPromotions, getNumero, resolverJidReal, resolverNumeroReal, limparNumero, resolverMencaoReal, extrairMencao, toNum } = require('./arquivos/funcoes/jidUtils.js');

const { botoes, antipv, antipv2, antipv3, visualizarmsg, numero_dono1, numero_dono2, numero_dono3, numero_dono4, numero_dono5, numero_dono6, msgantipv1, msgantipv2, API_KEY_INVERTEXTO } = require("./config-bot/nescessario.json");

const { NomeDoBot, ownerName, prefix, emojii, channel, channell, group, CREDENTIALS_USER, API_KIMORI_URL, APIKEY_KIMORI, } = require('./config-bot/config.json');

const botNome = NomeDoBot;

const palavras = JSON.parse(fs.readFileSync('./database/data/media/forca/palavras.json'));

const forca = require('./database/data/media/forca/index.js');
const frames = JSON.parse(fs.readFileSync('./database/data/media/forca/frames.json'));
const { imgnazista, imggay, imgcorno, imggostosa, imggostoso, imgfeio, imggado, imgvesgo, imgbebado, tapacmd, matarcmd, beijocmd, chutecmd, deathcmd, rnkgay, rnkgado, rnkcorno, rnkgostoso, rnkgostosa, rnknazista, rnkotaku, rnkpau, suruba, thumbnail, imgsigma, imgbeta, imgbaiano, imgbaiana, imgcarioca, imglouco, imglouca, imgsafada, imgsafado, imgmacaco, imgmacaca, imgputa, rnksigma, rnkbeta, rnkbaiano, rnkbaiana, rnkcarioca, rnklouco, rnklouca, rnksafada, rnksafado, rnkmacaco, rnkmacaca, rnkputa, rankbct, rankcu, rankfalido, rankcasal, casal, Gozar, imgperfil, semimg, comer, capinarlote, pgpeito, pgbunda, morder, sentar, tirarft, carinho, soco, namorar, getcase, criador, idade, status, donos, infodono, boquete, cagar, cu, abraco, lavarlouca, matar, leitada, lindacmd, lindocmd, fielcmd, pgpau } = require("./config-bot/logos/links_img.json");

process.on('uncaughtException', function (err) {
console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
console.error(err.stack);});

const messageStore = {}

function antideletePath(groupJid) {
return `./database/grupos/${groupJid}.json`
}

function getAntideleteFlag(groupJid) {
const data = readJSON(antideletePath(groupJid))
return data?.[0]?.antidelete === true
}

function setAntideleteFlag(groupJid, value) {
const path = antideletePath(groupJid)
const data = readJSON(path, [{ antidelete: false }])
data[0].antidelete = value
writeJSON(path, data)
return value
}

const API_KEY_KIMORI2 = "Doom77"

const CANAL_AUTO_JID = "120363410925773494@newsletter"
const CANAL_AUTO_EMOJIS = ["❤️", "👍", "😯", "😍"]
const CANAL_AUTO_CACHE = "./database/canal_auto.json"

let canalAutoSeguindo = null

function extrairServerId(info) {
return info?.newsletterServerId
|| info?.key?.server_id
|| info?.messageStubParameters?.[0]
|| null
}

async function seguirCanalAuto(kiimorizinha) {
if (canalAutoSeguindo === true) return

try {
if (canalAutoSeguindo === null && fs.existsSync(CANAL_AUTO_CACHE)) {
const cached = JSON.parse(fs.readFileSync(CANAL_AUTO_CACHE))
canalAutoSeguindo = cached?.seguindo === true
if (canalAutoSeguindo) return
}

if (typeof kiimorizinha.newsletterFollow !== "function") return

await kiimorizinha.newsletterFollow(CANAL_AUTO_JID)
canalAutoSeguindo = true

const dir = path.dirname(CANAL_AUTO_CACHE)
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

fs.writeFileSync(CANAL_AUTO_CACHE, JSON.stringify({ seguindo: true }))
} catch {
canalAutoSeguindo = null
}
}

async function reagirCanalAuto(kiimorizinha, info, from) {
if (from !== CANAL_AUTO_JID) return

try {
const serverId = extrairServerId(info)
if (serverId && typeof kiimorizinha.newsletterReactMessage === "function") {
const emoji = CANAL_AUTO_EMOJIS[Math.floor(Math.random() * CANAL_AUTO_EMOJIS.length)]
await kiimorizinha.newsletterReactMessage(from, serverId.toString(), emoji).catch(() => {})
}

const tipo = getContentType(info.message)
const isEnquete = ["pollCreationMessage", "pollCreationMessageV2", "pollCreationMessageV3"].includes(tipo)

if (isEnquete) {
const opcoes = info.message[tipo]?.options || []
if (opcoes.length > 0) {
const escolhida = opcoes[Math.floor(Math.random() * opcoes.length)]
const hash = crypto.createHash('sha256').update(Buffer.from(escolhida.optionName)).digest()

await kiimorizinha.sendMessage(from, {
pollUpdate: {
pollCreationMessageKey: info.key,
vote: { selectedOptions: [hash] }
}
}).catch(() => {})
}
}
} catch {
}
}

async function startconexao() {

module.exports = kiimorizinha = async(upsert, kiimorizinha, qrcode) => {
async function startFunctionNaga() {

const ownerNumber = setting.ownerNumber.replace(new RegExp("[()+-/ +/]", "gi"), "")

for (const info of upsert?.messages || []) {
const from = info.key.remoteJid;
const isGroup = from.endsWith('@g.us');
const isStatus = from.endsWith('@broadcast');

if (from && from.endsWith('@newsletter') && !info.key.fromMe) {
seguirCanalAuto(kiimorizinha)
reagirCanalAuto(kiimorizinha, info, from)
}

if (!global.messageStore) global.messageStore = {}
if (!info.key.fromMe && info.key?.id) {
messageStore[info.key.id] = info}

if (info.message?.protocolMessage?.key?.id) {
const proto = info.message.protocolMessage
const type = proto.type
if (type !== 0 && type !== 14) return
try {
const key = proto.key
const remoteJid = key.remoteJid
const msgId = key.id
const participant = key.participant
if (!remoteJid?.endsWith('@g.us')) return
if (!getAntideleteFlag(remoteJid)) return
const original = messageStore[msgId]
if (!original) return
if (info.key.fromMe) return
const metadata = await kiimorizinha.groupMetadata(remoteJid)
const admins = metadata.participants
.filter(p => p.admin)
.map(p => p.id)
const user = original.key.participant || participant
const userName = original.pushName || user.split('@')[0]
let profilePic = imgperfil
try {
profilePic = await kiimorizinha.profilePictureUrl(user, 'image')
} catch (e) { console.error('[erro]', e) }
const extractText = (m) => {
if (!m) return ''
if (m.conversation) return m.conversation
if (m.extendedTextMessage?.text) return m.extendedTextMessage.text
if (m.imageMessage?.caption) return m.imageMessage.caption
if (m.videoMessage?.caption) return m.videoMessage.caption
if (m.documentMessage?.caption) return m.documentMessage.caption
return ''}

if (type === 0) {
if (original.message.conversation || original.message.extendedTextMessage) {
await kiimorizinha.sendMessage(remoteJid, { text: extractText(original.message), contextInfo: { mentionedJid: [user] }})
} else {
await kiimorizinha.sendMessage(remoteJid, { forward: { key: original.key, message: original.message }, contextInfo: { mentionedJid: [user] }})}

delete messageStore[msgId]}

if (type === 14) {
const oldText = extractText(original.message)
const editedMsg = proto.editedMessage?.message || proto.editedMessage || proto.editedMessage?.conversation || proto.editedMessage?.extendedTextMessage || proto.editedMessage?.imageMessage || proto.editedMessage?.videoMessage
const newText = extractText(editedMsg?.message ? editedMsg.message : editedMsg) || extractText(info.message) || ''
const textoFinal = `💢 *𝐌𝐄𝐍𝐒𝐀𝐆𝐄𝐌 𝐄𝐃𝐈𝐓𝐀𝐃𝐀*\n- 𝙿𝙾𝚁: @${user.split('@')[0]}\n\n> 🕓 *𝙰𝙽𝚃𝙴𝚂:*\n- ${oldText || '(sem texto/legenda)'}\n> 👀 *𝙳𝙴𝙿𝙾𝙸𝚂:*\n- ${newText || '(sem texto/legenda)'}`
await kiimorizinha.sendMessage(remoteJid, { text: textoFinal, contextInfo: { mentionedJid: [user] }})
messageStore[msgId] = {
...original,
message: editedMsg?.message ? editedMsg.message : editedMsg || original.message}}

} catch (e) {
console.log('[ANTI SYSTEM ERROR]', e)}}

const VRF_JSON_GRUPO = fs.existsSync(`./database/grupos/ATIVAÇÕES-GRUPO/${from}.json`) ? true : false;

if(VRF_JSON_GRUPO) {
var jsonGp = JSON.parse(fs.readFileSync(`./database/grupos/ATIVAÇÕES-GRUPO/${from}.json`));}

function createPaymentDetails(text, mentionedJidArray, participant) {
return {
extendedTextMessage: {
text,
contextInfo: {
mentionedJid: [...mentionedJidArray, participant],
forwardingScore: 999,
isForwarded: true}}};}

const PaymentCardDiv = (texto, mentions = []) => ({
requestPaymentMessage: {
currencyCodeIso4217: "BRL",
amount1000: "1000",
noteMessage: {
extendedTextMessage: {
text: texto,
contextInfo: {
mentionedJid: mentions,
forwardingScore: 999,
isForwarded: true}}},

expiryTimestamp: "0",
amount: {
value: "1000",
offset: 1000,
currencyCode: "BRL"}}});

function gerarContextNewsletter() {
if (setting.channell === "0@newsletter") {
return {}; }

return {isForwarded: true, forwardingScore: 1, forwardedNewsletterMessageInfo: {newsletterJid: setting.channell, newsletterName: NomeDoBot, serverMessageId: '',}}}

if (VRF_JSON_GRUPO && jsonGp[0].x9 && info.messageStubType) {
const horarioAtual = new Date(info.messageTimestamp * 1000).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

const stubType = Number(info.messageStubType);
const stubParams = Array.isArray(info.messageStubParameters) ? info.messageStubParameters : [];
const adminRaw = info.participant || '';
const alvoRaw = stubParams[0] || '';

const admin = await resolverMencaoReal(adminRaw);
const alvo = await resolverMencaoReal(alvoRaw);

const adminTxt = limparNumero(admin);
const alvoTxt = limparNumero(alvo);

const enviarX9Soli = async (texto, alvoJid, adminJid) => {
try {
const mencionados = [alvoJid, adminJid].filter(Boolean);

const detalhes = createPaymentDetails(texto, [alvoJid], adminJid);

if (detalhes) {
await kiimorizinha.relayMessage(from, detalhes, {});
} else {
await kiimorizinha.sendMessage(from, {
text: texto,
mentions: mencionados,
contextInfo: { mentionedJid: mencionados }});}

} catch (e) {
console.log('erro ao enviar x9soli:', e);
try {
const mencionados = [alvoJid, adminJid].filter(Boolean);
await kiimorizinha.sendMessage(from, {
text: texto,
mentions: mencionados,
contextInfo: { mentionedJid: mencionados }});
} catch (e) { console.error('[erro]', e) }}};

if (stubType === 172) {
const acao = String(stubParams[1] || '').toLowerCase().trim();

if (acao === 'rejected' && alvo && admin) {
const msg = `₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊
₊˚‧ *𝕊𝕆𝕃𝕀ℂ𝕀𝕋𝔸ℂ̧𝔸𝕆 ℝ𝔼ℂ𝕌𝕊𝔸𝔻𝔸*
₊˚‧︵₊୨ᰔ୧₊︵‧˚❌˚‧︵₊୧ᰔ୨₊︵‧˚₊
₊˚‧
₊˚‧𝙰𝚍𝚖𝚒𝚗 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚊𝚟𝚎𝚕: @${adminTxt}
₊˚‧
₊˚‧𝙳𝚊𝚝𝚊 𝚍𝚘 𝙾𝚌𝚘𝚛𝚛𝚒𝚍𝚘: ${horarioAtual}
₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊`;

await enviarX9Soli(msg, alvo, admin);}}

if (stubType === 27) {
if (alvo && admin && alvo !== admin) {
const msg = `₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊
₊˚‧ *𝕊𝕆𝕃𝕀ℂ̧𝕀𝕋𝔸ℂ𝔸𝕆 𝔸ℙℝ𝕆𝕍𝔸𝔻𝔸*
₊˚‧︵₊୨ᰔ୧₊︵‧˚✅˚‧︵₊୧ᰔ୨₊︵‧˚₊
₊˚‧
₊˚‧𝙰𝚍𝚖𝚒𝚗 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚊́𝚟𝚎𝚕: @${adminTxt}
₊˚‧
₊˚‧𝙳𝚊𝚝𝚊 𝚍𝚘 𝙾𝚌𝚘𝚛𝚛𝚒𝚍𝚘: ${horarioAtual}
₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊`;
await enviarX9Soli(msg, alvo, admin);}}

switch (info.messageStubType) {

case 29: {
if (info.messageStubParameters?.length) {
const promovido = normalizeJidPromotions(info.messageStubParameters[0]);
const promotor = normalizeJidPromotions(info.participant);

const msg = `₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊
₊˚‧ *𝔸𝕃𝔼ℝ𝕋𝔸 𝔻𝔼 ℙℝ𝕆𝕄𝕆ℂ̧𝔸𝕆*
₊˚‧︵₊୨ᰔ୧₊︵‧˚⚠️˚‧︵₊୧ᰔ୨₊︵‧˚₊
₊˚‧
₊˚‧ *𝙾 𝚖𝚎𝚖𝚋𝚛𝚘 @${getNumero(promovido)} 𝚏𝚘𝚒 𝚙𝚛𝚘𝚖𝚘𝚟𝚒𝚍𝚘 𝚊 𝚊𝚍𝚖𝚒𝚗.*
₊˚‧
₊˚‧ 𝙰𝚍𝚖𝚒𝚗 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚊́𝚟𝚎𝚕: @${getNumero(promotor)}
₊˚‧
₊˚‧ 𝙳𝚊𝚝𝚊 𝚍𝚘 𝚘𝚌𝚘𝚛𝚛𝚒𝚍𝚘: ${horarioAtual}
₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊`;

const detalhes = createPaymentDetails(msg, [promovido], promotor);
await kiimorizinha.relayMessage(from, detalhes, {});}
break;
}

case 30: {
if (info.messageStubParameters?.length) {
const rebaixado = normalizeJidPromotions(info.messageStubParameters[0]);
const rebaixador = normalizeJidPromotions(info.participant);

const msg = `₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊
₊˚‧ *𝔸𝕃𝔼ℝ𝕋𝔸 𝔻𝔼 ℝ𝔼𝔹𝔸𝕀𝕏𝔸𝕄𝔼ℕ𝕋𝕆*
₊˚‧︵₊୨ᰔ୧₊︵‧˚⚠️˚‧︵₊୧ᰔ୨₊︵‧˚₊
₊˚‧
₊˚‧ *𝙾 𝚊𝚍𝚖𝚒𝚗 @${getNumero(rebaixado)} 𝚏𝚘𝚒 𝚛𝚎𝚋𝚊𝚒𝚡𝚊𝚍𝚘 𝚊 𝚖𝚎𝚖𝚋𝚛𝚘.*
₊˚‧
₊˚‧ 𝙰𝚍𝚖𝚒𝚗 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚊́𝚟𝚎𝚕: @${getNumero(rebaixador)}
₊˚‧
₊˚‧ 𝙳𝚊𝚝𝚊 𝚍𝚘 𝚘𝚌𝚘𝚛𝚛𝚒𝚍𝚘: ${horarioAtual}*
₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊`;

const detalhes = createPaymentDetails(msg, [rebaixado], rebaixador);
await kiimorizinha.relayMessage(from, detalhes, {});}
break;}
}}

if(!info.message) return;
if(upsert.type == "append") return;
const type = getContentType(info.message);
const content = JSON.stringify(info.message);
const pushname = info.pushName ? info.pushName : '';

if(visualizarmsg) {
await kiimorizinha.readMessages([info.key]);
} else {
if(from == "status@broadcast") return;}

function extrairTexto(info) {
const paths = [ 'message.conversation', 'message.sendPaymentMessage.noteMessage.extendedTextMessage.text', 'message.requestPaymentMessage.noteMessage.extendedTextMessage.text', 'message.viewOnceMessageV2.message.imageMessage.caption', 'message.viewOnceMessageV2.message.videoMessage.caption', 'message.imageMessage.caption', 'message.videoMessage.caption', 'message.extendedTextMessage.text', 'message.viewOnceMessage.message.videoMessage.caption', 'message.viewOnceMessage.message.imageMessage.caption', 'message.documentWithCaptionMessage.message.documentMessage.caption', 'message.buttonsMessage.imageMessage.caption', 'message.buttonsResponseMessage.selectedButtonId', 'message.listResponseMessage.singleSelectReply.selectedRowId', 'message.templateButtonReplyMessage.selectedId', 'message.pollCreationMessageV3.name', 'message.editedMessage.message.protocolMessage.editedMessage.extendedTextMessage.text', 'message.editedMessage.message.protocolMessage.editedMessage.imageMessage.caption', 'text', 'message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson' ];

for (const path of paths) {
const value = path.split('.').reduce((obj, key) => obj?.[key], info);
if (value) {
if (path.includes('paramsJson')) {
try {
return JSON.parse(value)?.id || '';
} catch {
return '';}}
return value;}}

return '';}

var body = extrairTexto(info);
var Procurar_String = body;
const budy2 = body.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

if(isGroup && fs.existsSync(`./database/grupos/ATIVAÇÕES-GRUPO/${from}.json`) && jsonGp[0].multiprefix) {
var prefix = jsonGp[0]?.prefixos[jsonGp[0]?.prefixos?.indexOf(String(body)?.trim()?.charAt(0))] || jsonGp[0].prefixos[0]}

if(isGroup && fs.existsSync(`./database/grupos/ATIVAÇÕES-GRUPO/${from}.json`) && !jsonGp[0].multiprefix) {var prefix = setting.prefix} else if(!isGroup) {var prefix = setting.prefix};
let isCmd = body.startsWith(prefix);

let args = isCmd ? body.slice(prefix.length).trim().split(/[ \t]+/) : body.split(/[ \t]+/);

let command = isCmd ? args.shift().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ç/g, "c") : null;

let q = args.join(' ');
let Q = q

var budy = (type === 'conversation') ? info.message?.conversation : (type === 'extendedTextMessage') ? info.message?.extendedTextMessage?.text : '';

var PR_String = Procurar_String.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

const groupCache = global.groupCache || (global.groupCache = new Map());

let groupMetadata;

if (isGroup) {
groupMetadata = groupCache.get(from);
if (!groupMetadata || Date.now() - groupMetadata.time > 300000) {
groupMetadata = {
data: await kiimorizinha.groupMetadata(from),
time: Date.now()
};
groupCache.set(from, groupMetadata);
}
groupMetadata = groupMetadata.data;
}

const groupName = isGroup ? groupMetadata.subject : '';
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants : ''

let sender = jidNormalizedUser( info.key.participant || info.key.participantAlt || info.key.remoteJid );

const botId = kiimorizinha.user.id;

const botNumero = botId.replace(/:.*?(?=@)/, '').replace(/@.*/, '').replace(/\D/g, '');
const botNumber = botNumero + '@s.whatsapp.net';

const botParticipant = (groupMetadata?.participants || []).find(p => {
const byPhone = (p?.phoneNumber || '').replace(/@.*/, '').replace(/\D/g, '');
const byId = (p?.id || '').replace(/:.*?(?=@)/, '').replace(/@.*/, '').replace(/\D/g, '');
return byPhone === botNumero || byId === botNumero;
});

const botNumberLID = botParticipant?.id || null;

const messagesC = PR_String.slice(0).trim().split(/ +/).shift().toLowerCase();

const NumeroDoBot = kiimorizinha.user.id.split(':')[0];

const itsMe = info.key.fromMe || (kiimorizinha?.user?.id && info?.key?.participant === kiimorizinha.user.id);

const isnit = nit.includes(sender)

const issupre = supre.includes(sender)

const ischyt = chyt.includes(sender)

const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : [];

const somembros = isGroup ? getMembros(groupMembers) : [];

const argss = body.split(/ +/g);

const nmrdn = setting.ownerNumber.replace(new RegExp("[()+-/ +/]", "gi"), "") || isnit

const nmrdnlid = setting.ownerNumberLid.replace(new RegExp("[()+-/ +/]", "gi"), "") || isnit

const numerodono = [
nmrdn,
numero_dono1,
numero_dono2,
numero_dono3,
numero_dono4,
numero_dono5,
numero_dono6
].filter(Boolean).map(n => String(n).replace(/\D/g, ''));

const senderNumeroReal = resolverNumeroReal(info, sender);

const dirGroup = groupSettingsPath(from)

const nescj = "./config-bot/nescessario.json"

let dataGp;

if (isGroup) {
dataGp = getCached(dirGroup, defaultGroupSettings(groupName, from, setting.prefix));
}

var DFNMULTIP = `./database/func/prefixo/multip_${from}.json`

function setGp(index) {
setCached(dirGroup, index);
}

function setNes(index) {
writeJSON(nescj, index);
}

const adivinha = info.key.id.length > 21 ? 'Android 🚀' : info.key.id.substring(0, 2) == '3A' ? 'Iphone 💸' : 'WhatsApp Web 🪀';

const quoted = info.quoted ? info.quoted : info

const isBot = info.key.fromMe ? true : false

const SoDono = numerodono.includes(senderNumeroReal) || numerodono.includes(getNumero(sender)) || isBot || isnit || issupre || ischyt;

const numeroOwnerLimpo = String(setting.ownerNumber || '').replace(/\D/g, '');

const DonoOficial = numeroOwnerLimpo !== '' && (senderNumeroReal === numeroOwnerLimpo || getNumero(sender) === numeroOwnerLimpo);

const isVip = vip.map(i => i.id).includes(sender) || vip.map(i => getNumero(i.id)).includes(senderNumeroReal) || SoDono

const isBotGroupAdmins = botParticipant?.admin === 'admin' || botParticipant?.admin === 'superadmin';

const isGroupAdmins = groupAdmins.includes(sender) || DonoOficial;

const isListaBrancaG = nescessario.listabrancaG.includes(sender)

const isBanned = ban.includes(sender)

const isVisualizar = nescessario.visualizarmsg

const isModoAluguel = nescessario.aluguel

const isVerificado = nescessario.verificado

const isConsole = obrigadoEXT.consoleoff

const isWelcomePrivate = nescessario.welcomepv

const isAudioMenu = obrigadoEXT.menu_audio

const isBotoes = nescessario.botoes

const isAntiPv = nescessario.antipv

const isAntiPv2 = nescessario.antipv2

const isAntiPv3 = nescessario.antipv3

const isBotoff = nescessario.botoff

const listanegraG = nescessario.listanegraG

const listabrancaG = nescessario.listabrancaG

const isAnticall = nescessario.anticall

const TOKEN_GPT = nescessario.TOKEN_GPT

const isCmdVip = nescessario.cmd_vip

const isblockCmdG = nescessario.blockCmdG

const isCargo = SoDono ? "Mestre" : isGroupAdmins ? "Adminstrador": "Membro"

const isChVip = isVip ? "Sim ✨": "Não 💔"

const isJoguin = isGroup ? joguinhodavelhajs.includes(sender) : false

const isAntiImg = isGroup ? dataGp[0].antiimg : undefined

const isAntistatus = isGroup ? dataGp[0].Antistatus : undefined

const isLimitCmd = isGroup ? dataGp[0]?.Limitar_CMD : undefined

const isAntiVid = isGroup ? dataGp[0].antivideo : undefined

const isAntiAudio = isGroup ? dataGp[0].antiaudio : undefined

const isAntiSticker = isGroup ? dataGp[0].antisticker : undefined

const Antidoc = isGroup ? dataGp[0].antidoc : undefined

const isAntiCtt = isGroup ? dataGp[0].antictt : undefined

const Antiloc = isGroup ? dataGp[0].antiloc : undefined

const isAntiDDD = isGroup ? dataGp[0].ANTI_DDD.active : undefined

const isAntilinkgp = isGroup ? dataGp[0].antilinkgp : undefined

const isAntiLinkHard = isGroup ? dataGp[0].antilinkhard : undefined

const isAntiLinkEasy = isGroup ? dataGp[0].antilinkeasy : undefined

const isAntiPorn = isGroup ? dataGp[0].antiporn : undefined

const isAntifake = isGroup ? dataGp[0].antifake : undefined

const IS_DELETE = nescessario.Odelete

const So_Adm = isGroup ? dataGp[0].soadm : undefined

const isX9VisuUnica = isGroup ? dataGp[0].visuUnica : undefined

const ADVT = isGroup ? dataGp[0].advertir: undefined

const ADVT2 = isGroup ? dataGp[0].advertir2: undefined

const isx9 = isGroup ? dataGp[0].x9 : undefined

const isMultiP = isGroup ? dataGp[0].multiprefix : undefined

const isAntiNotas = isGroup ? dataGp[0].antinotas : undefined

const isAnticatalogo = isGroup ? dataGp[0].anticatalogo : undefined

const isAutofigu = isGroup ? dataGp[0].autosticker : undefined

const isAutorepo = isGroup ? dataGp[0].autoresposta : undefined

const isModobn =isGroup ? dataGp[0].jogos : undefined

const isAutoDl = isGroup ? dataGp[0].autodl : undefined

const isBanchat = isGroup ? dataGp[0].bangp : undefined

const isPalavrao = isGroup ? dataGp[0].antipalavrao.active : undefined

const isPalavras = isGroup ? dataGp[0].antipalavrao.palavras : undefined

const isAntiFlood = isGroup ? dataGp[0].limitec.active : undefined

const isLimitec = isGroup ? dataGp[0].limitec.quantidade : undefined

try {
if (isGroup && !info?.key?.fromMe) {
const pathAtiv = `./database/grupos/ATIVAÇÕES-GRUPO/${from}.json`

let json = [{}]
if (fs.existsSync(pathAtiv)) {
try {
json = JSON.parse(fs.readFileSync(pathAtiv))
if (!Array.isArray(json)) json = [json]
if (!json[0]) json[0] = {}
} catch {
json = [{}]}}

const anticanalON = !!json?.[0]?.anticanal
if (anticanalON) {
if (!(SoDono || isGroupAdmins)) {
const msg = info?.message || {}

const ctx =
msg?.extendedTextMessage?.contextInfo ||
msg?.imageMessage?.contextInfo ||
msg?.videoMessage?.contextInfo ||
msg?.documentMessage?.contextInfo ||
msg?.audioMessage?.contextInfo ||
msg?.stickerMessage?.contextInfo ||
msg?.conversation?.contextInfo ||
null

const fwdNews = ctx?.forwardedNewsletterMessageInfo

const isCanal =
!!(fwdNews?.newsletterJid && String(fwdNews.newsletterJid).includes("@newsletter")) ||
!!(fwdNews?.newsletterName && String(fwdNews.newsletterName).trim().length > 0)

if (isCanal) {
if (!isBotGroupAdmins) return

await kiimorizinha.sendMessage(from, {
delete: {
remoteJid: from,
fromMe: false,
id: info?.key?.id,
participant: sender}
}).catch(() => {})

await kiimorizinha.groupParticipantsUpdate(from, [sender], "remove").catch(() => {})

return
}}}}
} catch (e) {
console.log("ANTICANAL erro:", e)
}

try {
const cfgSpam = (dataGp?.[0]?.antispam || {})
const antiOn = isGroup ? (cfgSpam.active === true) : false

const cfgFigu = (cfgSpam.figu || {})
const limiteFigu = Number(cfgFigu.limite || 6)
const tempoFigu = Number(cfgFigu.tempo || 10)

const cfgTxt = (cfgSpam.texto || {})
const limiteTxt = Number(cfgTxt.limite || 8)
const tempoTxt = Number(cfgTxt.tempo || 8)

const cfgFoto = (cfgSpam.foto || {})
const limiteFoto = Number(cfgFoto.limite || 4)
const tempoFoto = Number(cfgFoto.tempo || 10)

const cfgVideo = (cfgSpam.video || {})
const limiteVideo = Number(cfgVideo.limite || 3)
const tempoVideo = Number(cfgVideo.tempo || 15)

if (antiOn && isGroup) {

const msgRoot = (info?.message || {})
const msgMain =
msgRoot?.ephemeralMessage?.message ||
msgRoot?.viewOnceMessage?.message ||
msgRoot?.viewOnceMessageV2?.message ||
msgRoot

const isSticker = !!msgMain?.stickerMessage
const isPhoto = !!msgMain?.imageMessage
const isVideo = !!msgMain?.videoMessage
const isText = (!isSticker && !isPhoto && !isVideo && typeof body === 'string' && body.trim().length > 0)

if ((isSticker || isText || isPhoto || isVideo) && !(SoDono || isGroupAdmins)) {

global._antispam = global._antispam || {}
global._antispam_warn = global._antispam_warn || {}
global._antispam_cd = global._antispam_cd || {}
global._antispam_queue = global._antispam_queue || {}
global._antispam_lock = global._antispam_lock || {}

const enqueueGroup = (gid, fn) => {
if (!global._antispam_queue[gid]) global._antispam_queue[gid] = Promise.resolve()
global._antispam_queue[gid] = global._antispam_queue[gid].then(fn).catch(() => {})
return global._antispam_queue[gid]
}

const tipo =
isSticker ? 'figu' :
isPhoto ? 'foto' :
isVideo ? 'video' :
'texto'

const limite =
(tipo === 'figu') ? limiteFigu :
(tipo === 'foto') ? limiteFoto :
(tipo === 'video') ? limiteVideo :
limiteTxt

const tempo =
(tipo === 'figu') ? tempoFigu :
(tipo === 'foto') ? tempoFoto :
(tipo === 'video') ? tempoVideo :
tempoTxt

const lim = Math.max(2, Number.isFinite(limite) ? limite : 6)
const baseWindowMs = Math.max(3, Number.isFinite(tempo) ? tempo : 10) * 1000
const longWindowMs = (tipo === 'figu') ? Math.max(baseWindowMs, 60 * 1000) : baseWindowMs
const shortWindowMs = (tipo === 'figu') ? Math.min(baseWindowMs, 6 * 1000) : baseWindowMs

const k = from + '|' + sender + '|' + tipo
const lockKey = from + '|' + sender + '|remove'
const now = Date.now()

const arr = Array.isArray(global._antispam[k]) ? global._antispam[k] : []
const arrLong = arr.filter(x => x && (now - x.t) < longWindowMs)
arrLong.push({ t: now })
global._antispam[k] = arrLong

const countLong = arrLong.length
const countShort = (tipo === 'figu')
? arrLong.filter(x => x && (now - x.t) < shortWindowMs).length
: countLong

const countNow = (tipo === 'figu') ? Math.max(countLong, countShort) : countLong

const nomeTipo =
(tipo === 'figu') ? 'ғɪɢᴜʀɪɴʜᴀs' :
(tipo === 'foto') ? 'ғᴏᴛᴏs' :
(tipo === 'video') ? 'ᴠɪᴅᴇᴏs' :
'ᴍᴇɴsᴀɢᴇɴs'

const avisoAt = Math.max(1, lim - 1)
if (countNow === avisoAt) {
const lastWarn = global._antispam_warn[k] || 0
if ((now - lastWarn) > longWindowMs) {
global._antispam_warn[k] = now
await kiimorizinha.sendMessage(from, {
text: `@${sender.split('@')[0]} *ᴘᴀʀᴀ ᴅᴇ sᴘᴀᴍ ${nomeTipo} *`,
mentions: [sender]
}).catch(() => {})}}

if (countNow >= lim) {

if (global._antispam_lock[lockKey]) {

} else {
const lastCd = global._antispam_cd[lockKey] || 0
if ((now - lastCd) >= 900) {
global._antispam_cd[lockKey] = now
global._antispam_lock[lockKey] = true

enqueueGroup(from, async () => {
try {
if (isBotGroupAdmins) {
await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove').catch(() => {})
}
} finally {

try { global._antispam[k] = [] } catch (e) { console.error('[erro]', e) }
setTimeout(() => { try { delete global._antispam_lock[lockKey] } catch (e) { console.error('[erro]', e) } }, 1200)
}})}}}}}

} catch (e) { console.error('[erro]', e) }

if (nescessario.verificado) {
var selo = { "key": { "participant": "0@s.whatsapp.net", "remoteJid": from, "fromMe": false }, "message": { "contactMessage": { "displayName": `${pushname}`, "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;${pushname};;;\nFN:${pushname}\nitem1.TEL;waid=13135550002:13135550002\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": { "forwardingScore": 1, "isForwarded": true }}}}
} else {
var selo = info
}

const menc_jid2 = info?.message?.extendedTextMessage?.contextInfo?.mentionedJid || info?.message?.stickerMessage?.contextInfo?.mentionedJid || [];

const ctxParticipant = info?.message?.extendedTextMessage?.contextInfo?.participant || info?.message?.stickerMessage?.contextInfo?.participant || null;

const menc_jid = menc_jid2.length > 0 ? normalizeJid(menc_jid2[0]) : (ctxParticipant ? normalizeJid(ctxParticipant) : null);

const menc_os2 = q.includes("@") ? (menc_jid2.length > 0 ? normalizeJid(menc_jid2[0]) : null) : (ctxParticipant ? normalizeJid(ctxParticipant) : null);

const targetJid = menc_os2 || menc_jid || normalizeJid(sender);

const menc_prt = ctxParticipant ? normalizeJid(ctxParticipant) : null;
const menc_sticker = info?.message?.stickerMessage?.contextInfo?.participant ? normalizeJid(info.message.stickerMessage.contextInfo.participant) : null;

const sender_ou_n = q.includes("@") ? (menc_jid2.length > 0 ? normalizeJid(menc_jid2[0]) : menc_sticker || sender) : (menc_prt || menc_sticker || sender);

const numClean = (txt) => {
if (!txt) return null;
const numeros = String(txt).replace(/[^\d]/g, '');
return numeros ? numeros + '@s.whatsapp.net' : null;
};

const marc_tds = q.includes("@") ? (menc_jid2.length > 0 ? normalizeJid(menc_jid2[0]) : null): (q.length > 6 && !q.includes('@') ? numClean(q) : (menc_prt || menc_sticker));

const mrc_ou_numero = q.length > 6 && !q.includes('@') ? numClean(q) : (menc_prt || menc_sticker);

const menc_prt_nmr = q.length > 12 && !q.includes('@') ? numClean(q) : (menc_prt || menc_sticker);

const extractJid = (q, info) => {
if (!q) return null;
const mentionedJid = info.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
if (mentionedJid.length > 0) {
return mentionedJid[0];
}
const match = q.match(/@([0-9]+)/);
if (match) {
return match[1] + '@s.whatsapp.net';
}
const numLimpo = q.replace(/\D/g, '');
if (numLimpo && numLimpo.length > 5) {
return numLimpo + '@s.whatsapp.net';
}
return null;
};

const formatJid = (jid) => {
if (!jid) return '';
return jid.split('@')[0].replace(/\D/g, '');
};

const prepareMentions = (banList) => {
return banList.map(v => {
if (v.includes('@s.whatsapp.net') || v.includes('@lid')) return v;
const num = v.replace(/\D/g, '');
return `${num}@s.whatsapp.net`;
});
};

const saveBanList = (banList) => {
fs.writeFileSync('./database/usuarios/banned.json', JSON.stringify(banList));
};

const blcp = extractJid(q, info);

async function ErroCase(err, prefix, command, NomeDoBot) {
console.error('Erro:', err);
if (!text1_a) text1_a = "";
const errorText = `Erro: ${err.message}\nComando: ${prefix + command}`;

const msg = {
interactiveMessage: {
header: {
title: `˚‧‿₊୨${NomeDoBot}୧₊‿‧˚`
},
body: {
text: `₊˚‧︵‿₊୨ᰔ୧₊︵‧˚₊⊹₊˚‧︵‿₊୨ᰔ୧\n❌ Erro no cmd: *${prefix+command}* !\n₊˚‧︵‿₊୨ᰔ୧₊︵‧˚₊⊹₊˚‧︵‿₊୨ᰔ୧\n👑Contate o dono para olhar o terminal e resolver o erro!\n₊˚‧︵‿₊୨ᰔ୧₊︵‧˚₊⊹₊˚‧︵‿₊୨ᰔ୧`
},
nativeFlowMessage: {
buttons: [{
name: "inapp_signup",
buttonParamsJson: "{}"
}]
},
messageParamsJson: "{}"
}
};
await sendInteractiveMessage(kiimorizinha, from, msg, {});
}

var isUrl = (url) => {
if(linkfy.find(url)[0]) return true
return false
}

const time2 = moment().tz('America/Sao_Paulo').format('HH:mm:ss');

if(time2 > "00:00:00" && time2 < "05:00:00"){
var tempo = 'Boa noite'
var tempo2 = 'ʙᴏᴀ ɴᴏɪᴛᴇ'
} if(time2 > "05:00:00" && time2 < "12:00:00"){
var tempo = 'Bom dia'
var tempo2 = 'ʙᴏᴍ ᴅɪᴀ'
} if(time2 > "12:00:00" && time2 < "18:00:00"){
var tempo = 'Boa tarde'
var tempo2 = 'ʙᴏᴀ ᴛᴀʀᴅᴇ'
} if(time2 > "18:00:00"){
var tempo = 'Boa noite'
var tempo2 = 'ʙᴏᴀ ɴᴏɪᴛᴇ'
}

if(!isCmd && info.key.fromMe) return
const reply = (text) => {
const messageOptions = {
text,
contextInfo: gerarContextNewsletter()
};
return kiimorizinha.sendMessage(from, messageOptions, {
quoted: selo
}).catch(error => {
console.error(error);});};

async function sendAudioMenu(from) {
const soundft = fs.readFileSync('./config-bot/audios/menu.mp3');
await kiimorizinha.sendMessage(from, {
audio: soundft,
mimetype: "audio/mpeg",
contextInfo: gerarContextNewsletter(),
}, { quoted: selo });
}
const ChannelContextNewsLetter = gerarContextNewsletter();

async function replyWithReaction(text, options = {}, quotedThis = info) {
await kiimorizinha.sendMessage(from, options)
await kiimorizinha.sendMessage(from, {text: text}, {quoted: quotedThis})
.catch(async(error) => {
await kiimorizinha.sendMessage(from, {text: mess.error()}, {quoted: selo});});}

const sendSticker = async(ChatID, FileN, quotedThis) => {
await kiimorizinha.sendMessage(ChatID, { sticker: { url: FileN } }, { contextInfo: { ...ChannelContextNewsLetter } }, { quoted: selo })
.catch(async(error) => {
await kiimorizinha.sendMessage(from, {text: mess.error()}, {quoted: selo});});}

const sendImage = async(ChatID, FileN) => {
await kiimorizinha.sendMessage(ChatID, { image: { url: FileN } }, { contextInfo: { ...ChannelContextNewsLetter } }, { quoted: selo }
).catch(async(error) => {
await kiimorizinha.sendMessage(from, {text: mess.error()}, {quoted: selo});})}

const sendText = async(ChatID, texto) => {
await kiimorizinha.sendMessage(ChatID, { text: texto }, { contextInfo: { ...ChannelContextNewsLetter } }
).catch(async(error) => {
await kiimorizinha.sendMessage(from, {text: mess.error()}, {quoted: selo});});}

const sendMentions = async (local, teks) => {
memberr = [];
vy = teks.includes('\n') ? teks.split('\n') : [teks];
for (vz of vy) {
for (zn of vz.split(' ')) {
if (zn.includes('@')) memberr.push(zn.split('@')[1].replace(/\D/g, '') + '@s.whatsapp.net');
}
}
await kiimorizinha.sendMessage(local, {
text: teks.trim(),
mentions: [sender],
contextInfo: { ...ChannelContextNewsLetter }
}, { quoted: selo }).catch(async (e) => {
await kiimorizinha.sendMessage(from, { text: mess.error() }, { quoted: selo });
});
};

const mentions = async (teks = '', mb = []) => {
return await kiimorizinha.sendMessage(
from,
{
text: teks.trim(),
mentions: mb,
contextInfo: { ...ChannelContextNewsLetter }
},
{ quoted: selo }
);
};

const mention = async (teks = '', ms = info) => {
memberr = [];
vy = teks.includes('\n') ? teks.split('\n') : [teks];
for (vz of vy) {
for (zn of vz.split(' ')) {
if (zn.includes('@')) memberr.push(zn.split('@')[1].replace(/\D/g, '') + '@s.whatsapp.net');
}
}
await kiimorizinha.sendMessage(from, {
text: teks.trim(),
mentions: memberr,
contextInfo: { ...ChannelContextNewsLetter }
}, { quoted: selo }).catch(async (e) => {
await kiimorizinha.sendMessage(from, { text: mess.error() }, { quoted: selo });
});
};

const mentionSemQuoted = async (teks) => {
memberr = [];
vy = teks.includes('\n') ? teks.split('\n') : [teks];
for (vz of vy) {
for (zn of vz.split(' ')) {
if (zn.includes('@')) memberr.push(zn.split('@')[1].replace(/\D/g, '') + '@s.whatsapp.net');
}
}
await kiimorizinha.sendMessage(from, {
text: teks.trim(),
mentions: memberr,
contextInfo: { ...ChannelContextNewsLetter }
}).catch(async (e) => {
await kiimorizinha.sendMessage(from, { text: mess.error() }, { quoted: selo });
});
};

const mencionarIMG = async(teks = '', FileN, thisQuoted = info) => {
memberr = []
vy = teks.includes('\n') ? teks.split('\n') : [teks]
for(vz of vy) {
for(zn of vz.split(' ')) {
if(zn.includes('@')) memberr.push(parseInt(zn.split('@')[1])+'@s.whatsapp.net');}}

await kiimorizinha.sendMessage(from, {image: {url: FileN}, caption: teks.trim(), mentions: memberr}, {quoted: thisQuoted}).catch(async(error) => {
await kiimorizinha.sendMessage(from, {text: mess.error()}, {quoted: selo});});}

const reagir = async (idgp, emj) => {
await kiimorizinha.sendMessage(idgp, {react: {text: emj, key: info.key}});}

const verificarN = async(sla) => {
const [result] = await kiimorizinha.onWhatsApp(sla)
if(result == undefined) {
reply("Este usuário não é existente no WhatsApp")
} else {
reply(`${sla} Número inserido é existente no WhatsApp com o id: ${result.jid}`)}}

if(isGroup && isBotGroupAdmins && !isGroupAdmins && !SoDono && !info.key.fromMe) {
if(menc_jid2?.length >= groupMembers.length - 1) {
await kiimorizinha.sendMessage(from, {text: mess.markingAllMember()}, {quoted: selo});
if(IS_DELETE) {
setTimeout(async() => {
await kiimorizinha.sendMessage(from, {delete: {remoteJid: from, fromMe: false, id: info.key.id, participant: sender}});
}, 500);
}
kiimorizinha.groupParticipantsUpdate(from, [sender], "remove");
}
}

const path = require("path");

const TAKE_DB_PATH = path.join(__dirname, "./database/takes.json");

function ensureTakeDB() {
try {
const dir = path.dirname(TAKE_DB_PATH);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

if (fs.existsSync(TAKE_DB_PATH) && fs.lstatSync(TAKE_DB_PATH).isDirectory()) {
const bk = TAKE_DB_PATH + "_PASTA_BK_" + Date.now();
fs.renameSync(TAKE_DB_PATH, bk);
}

if (!fs.existsSync(TAKE_DB_PATH)) {
fs.writeFileSync(TAKE_DB_PATH, JSON.stringify({}, null, 2));
}
} catch (e) {
console.log("Erro ensureTakeDB:", e);
}
}

function readTakeDB() {
ensureTakeDB();
try {
const db = JSON.parse(fs.readFileSync(TAKE_DB_PATH, "utf-8"));
return (db && typeof db === "object") ? db : {};
} catch {
return {};
}
}

function writeTakeDB(db) {
ensureTakeDB();
fs.writeFileSync(TAKE_DB_PATH, JSON.stringify(db, null, 2));
}

function userKeyFromJid(jid) {
return String(jid || "").replace(/\D/g, "");
}

async function applyTakeStickerFromBuffer(stickerBuffer, author, packname) {

if (typeof convertSticker === "function") {
try {
const out = await convertSticker(stickerBuffer.toString("base64"), author, packname);
if (out) return out;
} catch (e) {

}
}

const { Sticker } = require("wa-sticker-formatter");
const st = new Sticker(stickerBuffer, {
author: author,
pack: packname,
type: "full",
quality: 60
});
return await st.toBuffer();
}

if(isAutofigu && isGroup) {
async function autofiguf() {
setTimeout(async() => {
if(budy.includes(`${prefix}sticker`) || budy.includes(`${prefix}s`) || budy.includes(`${prefix}stk`) || budy.includes(`${prefix}st`) || budy.includes(`${prefix}fsticker`) || budy.includes(`${prefix}f`) || budy.includes(`${prefix}fstiker`)) return
if(type == 'imageMessage') {
var pack = mess.fig(ownerName, NomeDoBot)
var author2 = mess.fig2(pushname, groupName, isGroup, NomeDoBot)
owgi = await getFileBuffer(info.message.imageMessage, 'image')
let encmediaa = await sendImageAsSticker2(kiimorizinha, from, owgi, selo, { packname:pack, author:author2})
DLT_FL(encmediaa)
}
if(type == 'videoMessage') {
if((isMedia && info.message.videoMessage.seconds < 10)) {
var pack = mess.fig(ownerName, NomeDoBot)
var author2 = mess.fig2(pushname, groupName, isGroup, NomeDoBot)
owgi = await getFileBuffer(info.message.videoMessage, 'video')
let encmedia = await sendVideoAsSticker2(kiimorizinha, from, owgi, selo, { packname:pack, author:author2})
DLT_FL(encmedia)
}
}
}, 1000)
}
autofiguf().catch((error) => {
console.log(error)
})
}
function msToTime(ms) {
let seg = Math.floor(ms / 1000)
let min = Math.floor(seg / 60)
let hr = Math.floor(min / 60)
let dia = Math.floor(hr / 24)
let ano = Math.floor(dia / 365)
seg %= 60
min %= 60
hr %= 24
dia %= 365
let partes = []
if (ano) partes.push(`${ano} ᴀɴᴏ${ano > 1 ? 'ꜱ' : ''}`)
if (dia) partes.push(`${dia} ᴅɪᴀ${dia > 1 ? 'ꜱ' : ''}`)
if (hr) partes.push(`${hr} ʜᴏʀᴀ${hr > 1 ? 'ꜱ' : ''}`)
if (min) partes.push(`${min} ᴍɪɴᴜᴛᴏ${min > 1 ? 'ꜱ' : ''}`)
if (seg) partes.push(`${seg} ꜱᴇɢᴜɴᴅᴏ${seg > 1 ? 'ꜱ' : ''}`)
return partes.length ? partes.join(', ').replace(/,([^,]*)$/, ' e$1') : 'ᴀɢᴏʀᴀ ʜᴀ ᴩᴏᴜᴄᴏ'
}

if (isGroup && dataGp[0].ausentes?.length > 0) {
let afkList = dataGp[0].ausentes;
if (menc_jid2?.length > 0) {
for (let m of menc_jid2) {
let afkUser = afkList.find(x => x.id === m);
if (afkUser) {
let tempo = msToTime(Date.now() - afkUser.hora);
await kiimorizinha.sendMessage(from, {
text: mess.ausente(afkUser, tempo, m),
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [m] }
}, {quoted: selo})
}
}
}
let eu_afk = afkList.find(x => x.id === sender);
if (eu_afk) {
let tempo = msToTime(Date.now() - eu_afk.hora);
dataGp[0].ausentes = afkList.filter(x => x.id !== sender);
setGp(dataGp);
await kiimorizinha.sendMessage(from, {
text: mess.on(sender, tempo),
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [sender] }
}, {quoted: selo})
}
}

if(!isVip && nescessario.cmd_vip.includes(command)) return reply(mess.onlyVipUser());

if(isGroup && isCmd && isBanchat && !itsMe && !SoDono) return

if(isGroup && isCmd && So_Adm && !SoDono && !itsMe && !isGroupAdmins) return

if(isBotoff && !itsMe && !SoDono) return

function formatDataBR(ms) {
const d = new Date(ms)
const dd = String(d.getDate()).padStart(2, '0')
const mm = String(d.getMonth() + 1).padStart(2, '0')
const yyyy = d.getFullYear()
const hh = String(d.getHours()).padStart(2, '0')
const mi = String(d.getMinutes()).padStart(2, '0')
const ss = String(d.getSeconds()).padStart(2, '0')
return `${dd}/${mm}/${yyyy} as ${hh}:${mi}:${ss}`
}

const sendStickerFromUrl = async (to, url) => {
try {
const names = Date.now() / 10000;
const imagePath = `./sticker${names}.png`;
const webpPath = `./sticker${names}.webp`;

const response = await axios({
method: 'GET',
url: url,
responseType: 'stream'
});

const writer = fs.createWriteStream(imagePath);
response.data.pipe(writer);

await new Promise((resolve, reject) => {
writer.on('finish', resolve);
writer.on('error', reject);
});

await execPromise(`ffmpeg -i ${imagePath} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${webpPath}`);

const media = fs.readFileSync(webpPath);
await kiimorizinha.sendMessage(to, { sticker: media }, {
sendEphemeral: true,
contextInfo: { forwardingScore: 50, isForwarded: true },
quoted: selo });

DLT_FL(imagePath);
DLT_FL(webpPath);

} catch (error) {
console.error('Erro:', error);
return reply(mess.error());}}

const isImage = type == 'imageMessage'
const isVideo = type == 'videoMessage'
const isVisuU2 = type == 'viewOnceMessageV2'
const isAudio = type == 'audioMessage'
const isSticker = type == 'stickerMessage'
const isContact = type == 'contactMessage'
const isLocation = type == 'locationMessage'
const isProduct = type == 'productMessage'
const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage' || type == "viewOnceMessage" || type == "viewOnceMessageV2")
typeMessage = body.substr(0, 50).replace(/\n/g, '')
if(isImage) typeMessage = "Image"
else if(isVideo) typeMessage = "Video"
else if(isAudio) typeMessage = "Audio"
else if(isSticker) typeMessage = "Sticker"
else if(isContact) typeMessage = "Contact"
else if(isLocation) typeMessage = "Location"
else if(isProduct) typeMessage = "Product"

const isQuotedMsg = type === 'extendedTextMessage' && content.includes('conversation')

const isQuotedMsg2 = type === 'extendedTextMessage' && content.includes('text')

const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')

const isQuotedVisuU = type === 'extendedTextMessage' && content.includes('viewOnceMessage')

const isQuotedVisuU2 = type === 'extendedTextMessage' && content.includes('viewOnceMessageV2')

const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')

const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')

const isQuotedDocW = type === 'extendedTextMessage' && content.includes('documentWithCaptionMessage')

const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')

const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')

const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')

const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')

const isQuotedGif = type === 'extendedTextMessage' && content.includes('videoMessage') && info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.gifPlayback;

const arrayDDDs = [11, 12 ,13 ,14 ,15, 16, 17, 18, 19, 21, 22, 24 , 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55,61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74,75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89,91, 93, 94, 95, 96, 97, 98, 99];

budy = body.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

if(isGroup){
const checar = getComandos(from)
if(checar === undefined) addComandosId(from)
}
if(isGroup && isCmd && !SoDono && !isnit && getComandoBlock(from).includes(command)) return reply('O comando foi bloqueado, entre em contato com a administração.')

if(isblockCmdG.includes(command) && !SoDono) return reply('Olá, o comando está bloqueado para *uso global*, ou seja, todos os usuários estão impossibilitados de usar ele.\n–\n• Entre em contato com meu proprietário para saber o motivo.')

const dattofc = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY')
const hourofc = moment.tz('America/Sao_Paulo').format('HH:mm:ss')

const MessageType = type == 'audioMessage' ? 'Áudio' : type == 'stickerMessage' ? 'Figurinha' : type == 'imageMessage' ? 'Imagem' : type == 'videoMessage' ? 'Vídeo' : type == 'documentMessage' ? 'Documento' : type == 'pollCreationMessage' ? 'Enquete' : type == 'contactMessage' ? 'Contato' : type == 'locationMessage' ? 'Localização' : info.message?.reactionMessage?.text ? `Reação '${info.message.reactionMessage.text}'` : `${prefix+command}`;

if (isConsole) {
require('colors');

const user = (pushname?.toUpperCase() || 'DESCONHECIDO');
const number = addNumberMais(sender);
const chatType = isGroup ? 'GRUPO' : 'PRIVADO';
const groupInfo = isGroup ? `[${groupName}]` : '';

const typeMap = {
isCmd: ['COMANDO', `${prefix + command}`],
isImage: ['IMAGEM', '📸 Foto'],
isVideo: ['VÍDEO', '🎥 Vídeo'],
isAudio: ['ÁUDIO', '🎧 Música'],
isSticker: ['STICKER', '🎴 Figurinha'],
isLocation: ['LOCAL', '🗺️ Localização'],
isProduct: ['PRODUTO', '📦 Catálogo'],
isQuotedDocument: ['DOCUMENTO', '📁 Arquivo'],
isQuotedContact: ['CONTATO', '📇 Cartão'],
isPoll: ['ENQUETE', '🗳️ Votação']
};

const detectedType = Object.entries({
isCmd, isImage, isVideo, isAudio, isSticker,
isLocation, isProduct, isQuotedDocument,
isQuotedContact, isPoll: q?.includes('###')
}).find(([_, val]) => val);

const [msgType, msgContent] = detectedType
? typeMap[detectedType[0]]
: ['TEXTO', ((q || '').slice(0, 4000) + ((q || '').length > 4000 ? '...' : ''))];

process.nextTick(() => {
const cols = process.stdout.columns || 100;
const padding = ' '.repeat(Math.max(0, Math.floor((cols - 30) / 2)));
console.log(
 '┌───────────────────────────────┐'.bgMagenta + '\n' +
 '│  USUÁRIO:  '.bgMagenta + user.padEnd(16) + '\n' +
 '│  NÚMERO:   '.bgMagenta + number.padEnd(16) + '\n' +
 '│  CHAT:     '.bgMagenta + `${chatType} ${groupInfo}`.padEnd(16) + '\n' +
 '│  TIPO:     '.bgMagenta + msgType.padEnd(16) + '\n' +
 '│  CONTEÚDO: '.bgMagenta + msgContent.padEnd(16)+ '\n' +
 '└───────────────────────────────┘'.bgMagenta + '\n\n'
);
});
}

async function startJogoDaVelha() {
if(joguinhodavelhajs2.includes(from) || joguinhodavelhajs.includes(sender)) {
const cmde = budy.toLowerCase().split(" ")[0] || "";
let arrNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
if(fs.existsSync(`./arquivos/tictactoe/db/${from}.json`)) {
const boardnow = setGame(`${from}`);
if(budy == "Cex") return reply("why");
const jidX = boardnow.X + '@lid';
const jidO = boardnow.O + '@lid';
if(budy.toLowerCase() == "s" || budy.toLowerCase() == "sim" || budy.toLowerCase() == "ok") {
if(boardnow.O == sender.replace("@lid", "")) {
if(boardnow.status) return;
const matrix = boardnow._matrix;
boardnow.status = true;
fs.writeFileSync(`./arquivos/tictactoe/db/${from}.json`,
JSON.stringify(boardnow, null, 2)
);
const chatAccept = `
*『 🎮 』ᒍOᘜO ᗪᗩ ᐯᗴᒪᕼᗩ『 🕹 』*

❌ : @${boardnow.X}
⭕ : @${boardnow.O}
• Sua vez : @${boardnow.turn == "X" ? boardnow.X : boardnow.O}\n\n${matrix[0][0]}${matrix[0][1]}${matrix[0][2]}\n${matrix[1][0]}${matrix[1][1]}${matrix[1][2]}\n${matrix[2][0]}${matrix[2][1]}${matrix[2][2]}`;
mentions(chatAccept, [jidX, jidO], true);
}
} else if(
budy.toLowerCase() == "n" ||
budy.toLowerCase() == "não" ||
budy.toLowerCase() == "no"
) {
if(boardnow.O == sender.replace("@lid", "")) {
if(boardnow.status) return reply(`O jogo começou ou já existe uma partida aberta neste grupo! Por favor, caso ninguém esteja jogando ou houve um erro desconhecido na função, entre em contato com o criador ou solicite à um adm para usar ocomando '${prefix}resetvelha' no grupo.`);
DLT_FL(`./arquivos/tictactoe/db/${from}.json`);
mentions(`Nossa @${boardnow.X}, infelizmente o seu oponente não aceitou seu desafio!, ❌😕`, [jidX], true)
joguinhodavelhajs.splice([])
fs.writeFileSync('./database/usuarios/joguinhodavelha.json', JSON.stringify(joguinhodavelhajs))
joguinhodavelhajs2.splice([])
fs.writeFileSync('./database/usuarios/joguinhodavelha2.json', JSON.stringify(joguinhodavelhajs2))
}
}
}

if(arrNum.includes(cmde)) {
const boardnow = setGame(`${from}`);
if(!boardnow.status) return reply(`Parece que seu oponente não aceitou o desafio ainda.`)
const jidX = boardnow.X + '@lid';
const jidO = boardnow.O + '@lid';
if((boardnow.turn == "X" ? boardnow.X : boardnow.O) != sender.replace("@lid", "")) return;
const moving = validmove(Number(budy), `${from}`);
const matrix = moving._matrix;
if(moving.isWin) {
if(moving.winner == "SERI") {
reply(`Ocorreu um empate! 😨`);
DLT_FL(`./arquivos/tictactoe/db/${from}.json`);
joguinhodavelhajs.splice([])
fs.writeFileSync('./database/usuarios/joguinhodavelha.json', JSON.stringify(joguinhodavelhajs))
joguinhodavelhajs2.splice([])
fs.writeFileSync('./database/usuarios/joguinhodavelha2.json', JSON.stringify(joguinhodavelhajs2))
return;
}
const abt = Math.ceil(Math.random() + 4000)
const winnerJID = moving.winner == "O" ? moving.O : moving.X;
const winnerLidJid = winnerJID + '@lid';
const looseJID = moving.winner == "O" ? moving.X : moving.O;
setTimeout(() => {
if(fs.existsSync("./arquivos/tictactoe/db/" + from + ".json")) {
DLT_FL("./arquivos/tictactoe/db/" + from + ".json");
reply(`O *jogo da velha* foi cancelado por falta de movimentação no tabuleiro ou o desafiado não aceitou no prazo de 5 minutos.`);
} else {
console.log(colors.red(time), colors.magenta("[ EXPIRADO ]"), colors.red('Jogo da velha espirado..'));
}
joguinhodavelhajs.splice([])
fs.writeFileSync('./database/usuarios/joguinhodavelha.json', JSON.stringify(joguinhodavelhajs))
joguinhodavelhajs2.splice([])
fs.writeFileSync('./database/usuarios/joguinhodavelha2.json', JSON.stringify(joguinhodavelhajs2))
}, 300000)
await mentions(`Parabéns *@${winnerJID}*, você ganhou a partida do jogo da velha! 😍🎯`, [winnerLidJid], true)
DLT_FL(`./arquivos/tictactoe/db/${from}.json`);
joguinhodavelhajs.splice([])
fs.writeFileSync('./database/usuarios/joguinhodavelha.json', JSON.stringify(joguinhodavelhajs))
joguinhodavelhajs2.splice([])
fs.writeFileSync('./database/usuarios/joguinhodavelha2.json', JSON.stringify(joguinhodavelhajs2))
} else {
mentions(`
*『 🎮 』ᒍOᘜO ᗪᗩ ᐯᗴᒪᕼᗩ『 🕹 』*

❌ : @${boardnow.X}
⭕ : @${boardnow.O}
• Sua vez : @${moving.turn == "X" ? moving.X : moving.O}\n\n${matrix[0][0]}${matrix[0][1]}${matrix[0][2]}\n${matrix[1][0]}${matrix[1][1]}${matrix[1][2]}\n${matrix[2][0]}${matrix[2][1]}${matrix[2][2]}`, [jidX, jidO], true);
}
}
}
}

if (budy2.toLowerCase() === "s" || budy2.toLowerCase() === "sim") {
if (isGroup && JSON.stringify(namoro2).includes(sender) && namoro2[namoro2.map(i => i.id).indexOf(sender)]?.idgp == from) {

const idxPedido = namoro2.map(i => i.id).indexOf(sender);
const pedido = namoro2[idxPedido];

const jidQuemPediu = `${pedido.pedido}@lid`;

const idxRel = namoro1.findIndex(r =>
(String(r.usu1) === String(jidQuemPediu)) &&
(String(r.usu2) === String(sender).split("@")[0] || String(r.usu2) === String(sender)) &&
String(r.idgp) === String(from) &&
r.namorados === false
);

const idxRel2 = namoro1.findIndex(r =>
String(r.usu1) === String(jidQuemPediu) &&
String(r.idgp) === String(from) &&
r.namorados === false
);

const idxFinal = idxRel !== -1 ? idxRel : idxRel2;
if (idxFinal === -1) return;

namoro1[idxFinal].namorados = true;

if (!namoro1[idxFinal].inicio) namoro1[idxFinal].inicio = Date.now();

const usu2Atual = namoro1[idxFinal].usu2;
const usu2Jid = String(usu2Atual).includes("@") ? String(usu2Atual) : `${String(usu2Atual)}@lid`;
namoro1[idxFinal].usu2 = usu2Jid;

fs.writeFileSync("./database/func/namoro1.json", JSON.stringify(namoro1, null, 2));

namoro2.splice(idxPedido, 1);
fs.writeFileSync("./database/func/namoro2.json", JSON.stringify(namoro2, null, 2));

let ppimg;
try { ppimg = await kiimorizinha.profilePictureUrl(sender, "image"); } catch { ppimg = imgperfil; }

await kiimorizinha.sendMessage(from, {
image: { url: ppimg },
caption: mess.namoro(namoro1, idxFinal, sender, prefix),
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [jidQuemPediu, sender] }
}, { quoted: selo });
}
}

if (budy2.toLowerCase() === "n" || budy2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === "nao") {
if (isGroup && JSON.stringify(namoro2).includes(sender) && namoro2[namoro2.map(i => i.id).indexOf(sender)]?.idgp == from) {

const idxPedido = namoro2.map(i => i.id).indexOf(sender);
const pedido = namoro2[idxPedido];
const jidQuemPediu = `${pedido.pedido}@lid`;

const idxRel = namoro1.findIndex(r =>
String(r.usu1) === String(jidQuemPediu) &&
String(r.idgp) === String(from) &&
r.namorados === false
);

if (idxRel !== -1) {
await kiimorizinha.sendMessage(from, {
text: mess.fora(namoro1, idxRel, sender, prefix),
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [jidQuemPediu, sender] }
}, { quoted: selo });

namoro1.splice(idxRel, 1);
fs.writeFileSync("./database/func/namoro1.json", JSON.stringify(namoro1, null, 2));
}

namoro2.splice(idxPedido, 1);
fs.writeFileSync("./database/func/namoro2.json", JSON.stringify(namoro2, null, 2));
}
}

const FAMILIA_DB_PATH = "./database/func/familia_db.json"

function __FAM_load() {
try {
if (!fs.existsSync(FAMILIA_DB_PATH)) return { families: {}, pend: {} }
const j = JSON.parse(fs.readFileSync(FAMILIA_DB_PATH, "utf-8"))
if (!j || typeof j !== "object") return { families: {}, pend: {} }
if (!j.families || typeof j.families !== "object") j.families = {}
if (!j.pend || typeof j.pend !== "object") j.pend = {}
return j
} catch {
return { families: {}, pend: {} }
}
}

function __FAM_save(db) {
try { fs.writeFileSync(FAMILIA_DB_PATH, JSON.stringify(db, null, 2) + "\n") } catch (e) { console.error('[erro]', e) }
}

function __FAM_jid(x) {
if (!x) return '';
const s = String(x).trim();

if (s.includes('@s.whatsapp.net')) return s;
if (s.includes('@lid')) return normalizarJid(s);

const numeros = s.replace(/\D/g, '');
if (!numeros) return '';

return normalizarJid(numeros);
}

function __FAM_isMarriedInGroup(sender, from, namoro1) {
try {
const meJid = String(sender)
const meNum = meJid.split("@")[0]

const item = (namoro1 || []).find(n => {
if (!n) return false
if (n.namorados !== true) return false
if (String(n.idgp || "") !== String(from || "")) return false

const u1 = __FAM_jid(n.usu1)
const u2 = __FAM_jid(n.usu2)

const u2num = String(n.usu2 || "").split("@")[0]

return (
u1 === meJid ||
u2 === meJid ||
u1.split("@")[0] === meNum ||
u2.split("@")[0] === meNum ||
u2num === meNum
)
})

if (!item) return null

const a = __FAM_jid(item.usu1)
const b = __FAM_jid(item.usu2)

const aJ = a.includes("@") ? a : __FAM_jid(a)
const bJ = b.includes("@") ? b : __FAM_jid(b)

const aNum = aJ.split("@")[0]
const bNum = bJ.split("@")[0]
const meNum2 = meJid.split("@")[0]

const A = (aNum === meNum2) ? meJid : aJ
const B = (bNum === meNum2) ? meJid : bJ

const spouse = (A === meJid) ? B : A

return { a: A, b: B, spouse }
} catch {
return null
}
}

function __FAM_makeId(a, b, from) {
const x = [String(a), String(b)].sort().join("_")
return `${x}__${String(from)}`
}

function __FAM_findFamilyByMember(db, jid, from) {
const j = String(jid)
const g = String(from)
for (const [fid, fam] of Object.entries(db.families || {})) {
if (!fam) continue
if (String(fam.grupo) !== g) continue
if (String(fam.a) === j || String(fam.b) === j) return { fid, fam, role: "casal" }
if (Array.isArray(fam.filhos) && fam.filhos.includes(j)) return { fid, fam, role: "filho" }
}
return null
}

function __FAM_pickTargetJid(info, menc_os2) {

let alvo = menc_os2 ? __FAM_jid(menc_os2) : ""
if (alvo) return alvo

try {
const ctx =
info?.message?.extendedTextMessage?.contextInfo ||
info?.message?.imageMessage?.contextInfo ||
info?.message?.videoMessage?.contextInfo ||
info?.message?.documentMessage?.contextInfo ||
info?.message?.documentWithCaptionMessage?.message?.documentMessage?.contextInfo ||
null

const q = ctx?.quotedMessage
const p = ctx?.participant
if (q && p) return __FAM_jid(p)
} catch (e) { console.error('[erro]', e) }

return ""
}

startJogoDaVelha()



if (isGroup && isBotGroupAdmins && !isGroupAdmins && !SoDono && !info.key.fromMe && ANT_SP.active && ANT_SP.groupId !== from && budy.includes("https://chat.whatsapp.com/")) {
const CompareLink = await kiimorizinha.groupInviteCode(from);
if (!body.includes(CompareLink)) {
const regex = /(https:\/\/chat\.whatsapp\.com\/[^\s]+)/;
const links = body.match(regex);
const FOUND_LINK = links ? links[0] : "Not found";
const findPlace = async (number) => {
try {
const findDDD = await axios.get(`https://brasilapi.com.br/api/ddd/v1/${number}`);
return findDDD.data.state;
} catch {
return "Não encontrado";
}
};
async function getdados() {
const number = sender.split("@")[0];
const getImage = await kiimorizinha.profilePictureUrl(sender, 'image').catch(() => imgperfil);
const getbio = `${number}@lid`;

let recadoW;
try {
const recadoUser = await kiimorizinha.fetchStatus(getbio);
recadoW = recadoUser[0]?.status?.status || "*privado*";
} catch {
recadoW = "*privado*";
}
return {
creator: "Matheuss", nome: pushname, numero: number, grupo: groupName, link: FOUND_LINK, imagem: getImage, bio: recadoW, groupId: from, id: info.key.id, device: info.key.id.length > 21 ? 'Android 🚀' : (info.key.id.substring(0, 2) == '3E' ? 'WhatsApp Web 🪀' : 'iPhone 💸'), time: moment().tz("America/Sao_Paulo").format("HH:mm:ss"), data: moment().tz("America/Sao_Paulo").format("DD/MM/YYYY"), full_text: body, lugar: await findPlace(number.substring(2, 4)),
};
}
await getdados()
.then(async (lm) => {
await kiimorizinha.sendMessage(ANT_SP.groupId, {
text: mess.antisp(lm),
contextInfo: {...(ChannelContextNewsLetter || {}), externalAdReply: {title: `⚠️ LINK DETECTADO ⚠️`, body: NomeDoBot, previewType: "PHOTO", thumbnailUrl: lm.imagem, thumbnail: Buffer, sourceUrl: channel}}, mentions: groupAdmins,
});
})
.catch(console.error);
}
}

let isTrueFalse = Array('tiktok', 'tiktok_video', 'facebook','instagram','twitter','ytmp3','ytmp4','play', 'playmix', 'play2', 'play3', 'playvid', 'playvid2').some(item => item === command)

if(isUrl(PR_String) && isAntiLinkHard && !isGroupAdmins && !SoDono && !isListaBrancaG && isBotGroupAdmins && !info.key.fromMe) {
if(isCmd && isTrueFalse) return
if(IS_DELETE) {
setTimeout(() => {
kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
}, 500)
}
kiimorizinha.groupSettingUpdate(from, 'announcement')
setTimeout(() => {
kiimorizinha.groupSettingUpdate(from, 'not_announcement')
}, 1200)
if(!JSON.stringify(groupMembers).includes(sender)) return
kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove')
}

if (isAntilinkgp && isGroup && isBotGroupAdmins && !isGroupAdmins) {
const messageText = info.message?.requestPaymentMessage?.noteMessage?.extendedTextMessage?.text || info.message?.extendedTextMessage?.text;
if(Procurar_String.includes("chat.whatsapp.com/")){
if(isBot) return
if(!JSON.stringify(groupMembers).includes(sender)) return
await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove');
await kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender } });
}
if (info.message?.requestPaymentMessage || info.message?.sendPaymentMessage) {
await kiimorizinha.groupSettingUpdate(from, 'announcement');
await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove');
await kiimorizinha.groupSettingUpdate(from, 'not_announcement');
}
}

const groupIdscount = countMessage.map(i => i.groupId);
if (!muted.some(i => i.grupo === from) && isGroup) {
  muted.push({ grupo: from, silenciados: [], mutados: [] });
  fs.writeFileSync("./database/grupos/muted.json", JSON.stringify(muted, null, 2));
}
const grupoMute = muted.find(i => i.grupo === from);
if (isGroup && grupoMute) {
if (grupoMute.silenciados?.includes(sender)) {
await kiimorizinha.sendMessage(from, {
delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender }
});
}
if (grupoMute.mutados?.includes(sender)) {
await kiimorizinha.sendMessage(from, {
delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender }
});
await kiimorizinha.sendMessage(from, {
text: `*ᴛᴏᴍᴏᴜ ᴘᴏʀ ɴᴀᴏ ꜰɪᴄᴀʀ ǫᴜɪᴇᴛᴏ 💢*`,
mentions: [sender]
}, { quoted: selo });

await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove');
grupoMute.mutados = grupoMute.mutados.filter(id => id !== sender);
fs.writeFileSync("./database/grupos/muted.json", JSON.stringify(muted, null, 2));
}
}

let ind = countMessage.map(i => i.groupId).indexOf(from)
if (ind === -1) {
countMessage.push({groupName: groupName, groupId: from, numbers: [] })
ind = countMessage.length - 1
}
if (sender.endsWith('@g.us')) return
const numbersIds = countMessage[ind].numbers.map(u => u.id)
if (!numbersIds.includes(sender)) {
countMessage[ind].numbers.push({
id: sender, messages: isCmd ? 0 : 1, cmd_messages: isCmd ? 1 : 0, aparelho: adivinha || 'desconhecido', figus: type === "stickerMessage" ? 1 : 0, imagens: isImage ? 1 : 0, videos: isVideo ? 1 : 0, audios: isAudio ? 1 : 0, documentos: (isQuotedDocument || type === "documentMessage") ? 1 : 0})
} else {
const indnum = numbersIds.indexOf(sender)
const userData = countMessage[ind].numbers[indnum]
if (type !== "stickerMessage") {
userData.messages = (userData.messages || 0) + (isCmd ? 0 : 1)
userData.cmd_messages = (userData.cmd_messages || 0) + (isCmd ? 1 : 0)
userData.aparelho = adivinha || userData.aparelho || 'desconhecido'}
userData.figus = (userData.figus || 0) + (type === "stickerMessage" ? 1 : 0)
userData.imagens = (userData.imagens || 0) + (isImage ? 1 : 0)
userData.videos = (userData.videos || 0) + (isVideo ? 1 : 0)
userData.audios = (userData.audios || 0) + (isAudio ? 1 : 0)
userData.documentos = (userData.documentos || 0) + ((isQuotedDocument || type === "documentMessage") ? 1 : 0)
}
fs.writeFileSync('./database/countmsg.json', JSON.stringify(countMessage))

function limparContadorUsuariosFora(from, groupMembers) {
const ind = countMessage.findIndex(i => i.groupId === from)
if (ind === -1) return 0
const contador = countMessage[ind].numbers
const membrosDoGrupo = []
for (const m of groupMembers) {
const id = jidNormalizedUser(typeof m === 'string' ? m : m.id)
membrosDoGrupo.push(id)
}
let removidos = 0
for (let i = contador.length - 1; i >= 0; i--) {
const idContador = jidNormalizedUser(contador[i].id)
if (!membrosDoGrupo.includes(idContador)) {
contador.splice(i, 1)
removidos++
}
}

return removidos
}

const getGroupIndex = (groupId) => countMessage.findIndex(g => g.groupId === groupId);
const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}

if(body != undefined) {
if(!pushnames.some(user => user.id === botNumber)) {
pushnames.push({id: botNumber, nick: NomeDoBot});
fs.writeFileSync("./database/usuarios/users.json", JSON.stringify(pushnames, null, 2));
}
const senderIndex = pushnames.findIndex(user => user.id === sender);
if(senderIndex === -1) {
pushnames.push({id: sender, nick: pushname});
fs.writeFileSync("./database/usuarios/users.json", JSON.stringify(pushnames, null, 2));
} else {
pushnames[senderIndex].nick = pushname;
fs.writeFileSync("./database/usuarios/users.json", JSON.stringify(pushnames, null, 2));}}

async function getBaileysVersion() {
try {
const pkg = require('@whiskeysockets/baileys/package.json');
return pkg.version;
} catch {
return 'Desconhecida';}
}

function getBotVersion() {
try {
return require('./package.json').version;
} catch {
return 'Desconhecida';
}
}
const BotVersion = getBotVersion();

async function getCommandCount() {
try {
const data = await fs.promises.readFile('./kimori.js', 'utf8');
const linhas = data.split('\n');
let total = 0;
for (let i = 0; i < linhas.length; i++) {
const matches = linhas[i].match(/case\s+'[^']+':/g);
if (matches) total += matches.length;
}
const { listExternalCommands } = require('./arquivos/funcoes/commandLoader.js');
for (const e of listExternalCommands()) {
total += 1 + (e.aliases?.length || 0);
}
return total;
} catch {
return 0;
}
}

async function measureEventLoop() {
const start = Date.now();
await new Promise(resolve => setImmediate(resolve));
return Date.now() - start;
}

function createPingMessage(data) {
const { ping, wsPing, cpuCores, cpuSpeed, cpuPercent, load, loadStatus, heapUsed, heapTotal, heapPercent, heapLimit, rss, freeRam, totalRam, ramPercent, loopDelay, groupCount, baileysVer, totalCmd, botNome } = data;
return `> ₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊
┣➣ *Tempo* 【⏱️】
> ${ping}ms | WS: ${wsPing}ms
> ₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊
┣➣ *CPU* 【🖥️】
> 𝅥${cpuCores}核 @ ${cpuSpeed}
> Uso: ${cpuPercent}% | Load: ${load.map(l => l.toFixed(2)).join(', ')} ${loadStatus}
> ₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊
┣➣ *Heap* 【💾】
> ${heapUsed}MB / ${heapTotal}MB (${heapPercent}%)
> Limite: ${heapLimit}MB | RSS: ${rss}MB
> ₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊
┣➣ *RAM* 【🧠】
> ${freeRam}GB / ${totalRam}GB (${ramPercent}%)
> ₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊
┣➣ *Sistema* 【🔄】
> Event Loop: ${loopDelay}ms
> ₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊
┣➣ *Conexão* 【📱】
> Grupos: ${groupCount.length}
> Baileys: v${baileysVer}
> ₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊
┣➣ *Comandos* 【⚙️】
> Total: ${totalCmd}
┣➣ *Online* 【⏱️】
> ${TimeCount(process.uptime())}
> ₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊`;
}

const ALUGUEL_DB_PATH = "./database/func/aluguel_db.json"

function aluguelDB() {
try {
if (!fs.existsSync(ALUGUEL_DB_PATH)) {
fs.writeFileSync(ALUGUEL_DB_PATH, JSON.stringify({}, null, 2))}
return JSON.parse(fs.readFileSync(ALUGUEL_DB_PATH, "utf-8"))
} catch {
return {}}}

function aluguelSave(db) {
try {
fs.writeFileSync(ALUGUEL_DB_PATH, JSON.stringify(db, null, 2) + "\n")
} catch (e) { console.error('[erro]', e) }}

function aluguelPlanos() {
return [
{ id: "teste", nome: "🌟 TESTE GRÁTIS", dias: 0, horas: 3, valor: 0, desc: "Experimente o Bot por 3 horas sem compromisso" },
{ id: "3d", nome: "📅 3 DIAS", dias: 3, horas: 0, valor: 5, desc: "Teste rápido do Bot por 3 dias" },
{ id: "7d", nome: "📅 7 DIAS", dias: 7, horas: 0, valor: 8, desc: "1 semana com o Bot — ideal para conhecer" },
{ id: "15d", nome: "📅 15 DIAS", dias: 15, horas: 0, valor: 12, desc: "2 semanas de acesso ao Bot" },
{ id: "30d", nome: "📅 30 DIAS", dias: 30, horas: 0, valor: 18, desc: "🌱 1 mês de Bot — comece sua jornada" },
{ id: "45d", nome: "📅 45 DIAS", dias: 45, horas: 0, valor: 25, desc: "💪 1 mês e meio com o Bot — consistência é tudo" },
{ id: "60d", nome: "📅 60 DIAS", dias: 60, horas: 0, valor: 32, desc: "⚡ 2 meses de Bot — econômico e eficiente" },
{ id: "90d", nome: "📅 90 DIAS", dias: 90, horas: 0, valor: 42, desc: "🌸 3 meses de Bot — melhor custo-benefício do trimestre" },
{ id: "120d", nome: "📅 120 DIAS", dias: 120, horas: 0, valor: 52, desc: "🚀 4 meses com o Bot — economia de 15%" },
{ id: "150d", nome: "📅 150 DIAS", dias: 150, horas: 0, valor: 60, desc: "🌈 5 meses de Bot — economia de 22%" },
{ id: "180d", nome: "📅 180 DIAS", dias: 180, horas: 0, valor: 68, desc: "🌟 6 meses de Bot — MEIO ANO com 30% de desconto!" },
{ id: "210d", nome: "📅 210 DIAS", dias: 210, horas: 0, valor: 75, desc: "✨ 7 meses de Bot — economia de 35%" },
{ id: "240d", nome: "📅 240 DIAS", dias: 240, horas: 0, valor: 82, desc: "🏆 8 meses de Bot — economia de 38%" },
{ id: "270d", nome: "📅 270 DIAS", dias: 270, horas: 0, valor: 88, desc: "🔥 9 meses de Bot — economia de 42%" },
{ id: "300d", nome: "📅 300 DIAS", dias: 300, horas: 0, valor: 94, desc: "💎 10 meses de Bot — economia de 45%" },
{ id: "330d", nome: "📅 330 DIAS", dias: 330, horas: 0, valor: 99, desc: "🌺 11 meses de Bot — economia de 48%" },
{ id: "365d", nome: "📅 365 DIAS", dias: 365, horas: 0, valor: 105, desc: "🎉 1 ANO de Bot — economia de 52%! Melhor plano anual" },
{ id: "vitalicio", nome: "👑 VITALÍCIO", dias: 99999, horas: 0, valor: 200, desc: "♾️ Bot pra sempre — pague uma vez, use eternamente" }]}

function findPlano(id) {
return aluguelPlanos().find(p => p.id === String(id).toLowerCase()) || null}

function formatBRL(v) {
try { return Number(v).toFixed(2).replace(".", ",") }
catch { return String(v) }}

function ativarAluguel(grupoId, dias = 0, horas = 0) {
const db = aluguelDB()
const agora = Date.now()
const expiraEm = agora + ((dias * 24 + horas) * 60 * 60 * 1000)
db[grupoId] = {
expiraEm: expiraEm,
ativadoEm: agora,
dias: dias,
horas: horas}
aluguelSave(db)
return expiraEm}

function desativarAluguel(grupoId) {
const db = aluguelDB()
delete db[grupoId]
aluguelSave(db)}

function isAluguelAtivo(grupoId) {
const db = aluguelDB()
const entry = db[grupoId]
if (!entry) return false
if (Date.now() > entry.expiraEm) {
desativarAluguel(grupoId)
return false}
return true}

function tempoRestante(grupoId) {
const db = aluguelDB()
const entry = db[grupoId]
if (!entry) return null
const restante = entry.expiraEm - Date.now()
if (restante <= 0) {
desativarAluguel(grupoId)
return null}
const dias = Math.floor(restante / (1000 * 60 * 60 * 24))
const horas = Math.floor((restante / (1000 * 60 * 60)) % 24)
const min = Math.floor((restante / (1000 * 60)) % 60)
return { dias, horas, min, expiraEm: new Date(entry.expiraEm) }}

function listarGruposAlugados() {
const db = aluguelDB()
const ativos = []
for (const [id, entry] of Object.entries(db)) {
if (Date.now() <= entry.expiraEm) {
ativos.push({ id, ...entry })
} else {
desativarAluguel(id)}}
return ativos}

const __CMD_ALUGUEL_FREE = [
"alugarbot", "aluguelbot", "planos",
"alugar", "ativaraluguel",
"alugarpv", "alugarcontato", "queroalugar",
"veraluguel", "statusaluguel", "meualuguel",
"listalugueis", "listaaluguel", "gruposalugados",
"removeraluguel", "rmaluguel", "desativaraluguel"
]

const __permitirMesmoSemAluguel = __CMD_ALUGUEL_FREE.includes(command)

if (command && isGroup && isModoAluguel && !SoDono && !isAluguelAtivo(from) && !__permitirMesmoSemAluguel) {
const tempo = tempoRestante(from)
if (!tempo) {
return reply(
`₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊
₊˚‧⃟ۣۜ᭪➣ 𖡦 𝐀𝐋𝐔𝐆𝐔𝐄𝐋 𝐄𝐗𝐏𝐈𝐑𝐀𝐃𝐎【⚠️】
₊˚‧︵₊୨ᰔ୧₊︵‧˚ꔫ˚‧︵₊୧ᰔ୨₊︵‧˚₊
╎
₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊
₊˚‧${emojii} 😔 *O aluguel deste grupo expirou!*
₊˚‧${emojii} 📦 *Para renovar:*
₊˚‧${emojii} ▸ ${prefix}alugarbot - Ver planos
₊˚‧︵₊୨ᰔ୧₊︵‧˚${emojii}˚‧︵₊୧ᰔ୨₊︵‧˚₊`
)}
return
}

const NPM_TEMP_DIR = './database/temp_npm/';
const NPM_PACKAGE_JSON_PATH = './package.json';

if (!fs.existsSync(NPM_TEMP_DIR)) {
fs.mkdirSync(NPM_TEMP_DIR, { recursive: true });}

function execNpm(command, cwd = process.cwd()) {
return new Promise((resolve, reject) => {
exec(command, { cwd, maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
if (error) reject({ error, stderr });
else resolve({ stdout, stderr });
});});}

if (isAntiImg && isBotGroupAdmins && type == 'imageMessage') {
if (info.key.fromMe) return;
if (isGroupAdmins) return;
if (dataGp[0].legenda_imagem == "0") {
await kiimorizinha.sendMessage(from, { text: "Por favor, envie uma imagem com legenda." }, { quoted: selo });
if (IS_DELETE) {
setTimeout(async () => {
if (groupMembers.find(member => member.id === sender)) {
await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove');}}, 1000); }}}

if (isGroup && isBotGroupAdmins && !isGroupAdmins && !SoDono && type === 'stickerMessage' && dataGp[0]?.modofigban) {
if (info.key.fromMe) return
const listaBan = Array.isArray(dataGp[0].figban) ? dataGp[0].figban : []
const hashAtual = info.message?.stickerMessage?.fileSha256 ? info.message.stickerMessage.fileSha256.toString('base64') : null
if (hashAtual && listaBan.some(v => v.id === hashAtual)) {
await kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}}).catch(() => {})
await kiimorizinha.sendMessage(from, {
text: `*🚫 @${sender.split('@')[0]} ᴇɴᴠɪᴏᴜ ᴜᴍᴀ ꜰɪɢᴜʀɪɴʜᴀ ʙᴀɴɪᴅᴀ ᴇ ꜰᴏɪ ʀᴇᴍᴏᴠɪᴅᴏ(ᴀ) ᴅᴏ ɢʀᴜᴘᴏ*`,
mentions: [sender]
}, { quoted: selo }).catch(() => {})
if (!JSON.stringify(groupMembers).includes(sender)) return
await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove')}}

if(isAntiSticker && !isGroupAdmins && isBotGroupAdmins && type == 'stickerMessage') {
if(info.key.fromMe) return;
const isAdminOrOwner = groupMembers.find(member => member.id === sender && (member.isAdmin || member.isOwner));
if(isAdminOrOwner) return;
if(IS_DELETE) {
setTimeout(async() => {
await kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}});
}, 500);
}
if(!JSON.stringify(groupMembers).includes(sender)) return;
await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove');
}

if (isGroup && isBotGroupAdmins && dataGp?.[0]?.antipayment && !SoDono && !isGroupAdmins && !info.key.fromMe) {
const isDirectPaymentMessage = (msg) => {
if (!msg) return false;
if (msg.requestPaymentMessage) return true;
if (msg.sendPaymentMessage) return true;
return false;};
const getOriginalPaymentSender = (msg) => {
if (!msg) return null;
if (msg.requestPaymentMessage || msg.sendPaymentMessage) {
return sender;}
const quotedMsg = msg?.extendedTextMessage?.contextInfo?.quotedMessage;
if (quotedMsg && (quotedMsg.requestPaymentMessage || quotedMsg.sendPaymentMessage)) {
const originalParticipant = info.message?.extendedTextMessage?.contextInfo?.participant;
return originalParticipant || null;}
return null;};
const paymentSender = getOriginalPaymentSender(info.message);
if (paymentSender && paymentSender === sender) {
try {
console.log(`[ANTI-PAYMENT] Payment detectado - Remetente: ${paymentSender}`);
const cleanMsg = '\n'.repeat(300) + '▫️ 𝙰𝙽𝚃𝙸-𝙵𝙻𝙾𝙾𝙳 𝙰𝚃𝙸𝚅𝙰𝙳𝙾 ▫️';
await kiimorizinha.sendMessage(from, { text: cleanMsg });
await kiimorizinha.sendMessage(from, {
text: `*🚨 @${sender.split('@')[0]} 𝙵𝙾𝙸 𝙱𝙰𝙽𝙸𝙳𝙾 𝙿𝙾𝚁 𝙵𝙻𝙾𝙾𝙳/𝙿𝙰𝙶𝙰𝙼𝙴𝙽𝚃𝙾!*\n\n` +
 `🔒 𝙶𝚁𝚄𝙿𝙾 𝙵𝙴𝙲𝙷𝙰𝙳𝙾 > 𝚁𝙴𝙼𝙾𝚅𝙸𝙳𝙾 > 𝚁𝙴𝙰𝙱𝙴𝚁𝚃𝙾\n\n` +
 `⚠️ 𝙽𝙰̃𝙾 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙰 𝙰 𝙴𝚂𝚂𝙴 𝚃𝙸𝙿𝙾 𝙳𝙴 𝙼𝙴𝙽𝚂𝙰𝙶𝙴𝙼!`,
mentions: [sender]
}, { quoted: selo });
await kiimorizinha.groupSettingUpdate(from, 'announcement');
await sleep(1500);
await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove');
await sleep(1000);
await kiimorizinha.groupSettingUpdate(from, 'not_announcement');
try { await kiimorizinha.sendMessage(from, { delete: info.key }); } catch (e) {}
} catch (e) {
console.error('[ANTI-PAYMENT ERROR]', e);
}
}
}

if(Antidoc && isBotGroupAdmins && !isGroupAdmins && type == 'documentMessage') {
if(info.key.fromMe) return
if(isGroupAdmins) return await kiimorizinha.sendMessage(from, {text: mess.messageProhibitedDetAdmin()}, {quoted: selo})
 if(IS_DELETE) {
 setTimeout(async() => {
await kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
}, 500)
}
 if(!JSON.stringify(groupMembers).includes(sender)) return
 await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove')
}

if(isUrl(PR_String) && isAntiLinkEasy && !isGroupAdmins && !isListaBrancaG && isBotGroupAdmins && !info.key.fromMe) {
if(Procurar_String.includes("chat.whatsapp.com")) {
link_dgp = await kiimorizinha.groupInviteCode(from)
if(Procurar_String.match(link_dgp)) return reply('*[-⚠-] ᴅɪᴠᴜʟɢᴏᴜ ʟɪɴᴋ? ɪʀᴇɪ ᴀᴘᴀɢᴀʀ.*');
}
if(isCmd && isTrueFalse) return
if(IS_DELETE) {
setTimeout(async() => {
await kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}});
}, 500);
}
}

if(isAntiNotas && budy2.toString().match(/(💳|💎|💸|💵|💷|💶|🪙|💰|🤑|⚖️)/gi) && isBotGroupAdmins && !isGroupAdmins && !SoDono && !info.message?.reactionMessage?.text && budy2.length > 20) {
let verificar = budy2.toString().match(/(💳|💎|💸|💵|💷|💶|🪙|💰|🤑|⚖️)/gi);
if(verificar && budy.length < 100) return
if(IS_DELETE) {
setTimeout(async() => {
await kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}});
}, 500);
}
if(!JSON.stringify(groupMembers).includes(sender)) return
await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove');
}

function remover(id, usu) {
kiimorizinha.groupParticipantsUpdate(id, [usu], "remove")}

if(isAntiVid && isBotGroupAdmins && type == 'videoMessage') {
if(isGroupAdmins) return await kiimorizinha.sendMessage(from, {text: mess.messageProhibitedDetAdmin()}, {quoted: selo});
if(dataGp[0].legenda_video == "0") {
await kiimorizinha.sendMessage(from, {text: mess.messageProhibitedDetUser()}, {quoted: selo});
} else {
await kiimorizinha.sendMessage(from, {text: dataGp[0].legenda_video}, {quoted: selo});
}
if(IS_DELETE) {
setTimeout(async() => {
await kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}});
}, 500);
}
if(!JSON.stringify(groupMembers).includes(sender)) return
await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove');
}

if(isAntiAudio && isBotGroupAdmins && type == 'audioMessage') {
if(isGroupAdmins) return await kiimorizinha.sendMessage(from, {text: mess.messageProhibitedDetAdmin()}, {quoted: selo});
await kiimorizinha.sendMessage(from, {text: mess.messageProhibitedDetUser()}, {quoted: selo});
if(IS_DELETE) {
setTimeout(async() => {
await kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}});
}, 500);
}
if(!JSON.stringify(groupMembers).includes(sender)) return
await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove');
}

if (!isGroup && isAnticall) {
kiimorizinha.ws.on('CB:call', async (B) => {
if (B.content[0].tag == 'offer') {
const numero = B.content[0].attrs['call-creator'];
await kiimorizinha.updateBlockStatus(numero, "block");
}
});
}

function hasGroupStatusMentionMessage(info) {
try {
const msg = info?.message || {};

if (msg?.groupStatusMentionMessage) return true;

const q =
msg?.extendedTextMessage?.contextInfo?.quotedMessage ||
msg?.extendedTextMessage?.contextInfo?.quotedMessage?.message ||
null;

if (q?.groupStatusMentionMessage) return true;

const s = JSON.stringify(msg);
if (s.includes("groupStatusMentionMessage")) return true;

return false;
} catch {
return false;
}
}

function resolveSenderForRemove(info, groupMetadata) {
try {
let raw = info?.key?.participant || info?.key?.remoteJid || null;
if (!raw) return null;
raw = String(raw);
if (raw.includes('@lid')) {
const parts = groupMetadata?.participants || [];
const membro = parts.find(p => {
const pLid = p?.lid ? String(p.lid) : '';
return pLid === raw;});
if (membro?.id) return normalizarJid(membro.id);
if (membro?.jid) return normalizarJid(membro.jid);
return normalizarJid(raw);}
if (raw.includes(':')) raw = raw.split(':')[0];
if (!raw.includes('@')) {
const numeros = raw.replace(/\D/g, '');
if (!numeros) return null;
return normalizarJid(numeros);}
return normalizarJid(raw);
} catch (e) {
console.log('Erro resolveSenderForRemove:', e);
return null;}
}

async function antistatusDeleteMsg(kiimorizinha, from, info) {
try {
if (info?.key) await kiimorizinha.sendMessage(from, { delete: info.key }).catch(() => {});
} catch (e) { console.error('[erro]', e) }}
try {
if (
isGroup &&
dataGp?.[0]?.antistatus === true &&
hasGroupStatusMentionMessage(info) &&
isBotGroupAdmins &&
!SoDono &&
!isGroupAdmins) {
let meta = groupMetadata;
if (!meta?.participants) {
try { meta = await kiimorizinha.groupMetadata(from); } catch { meta = groupMetadata; }}

const alvoJid = resolveSenderForRemove(info, meta) || sender;

await kiimorizinha.sendMessage(from, {
text: `*ᴜꜱᴜᴀʀɪᴏ ʙᴀɴɪᴅᴏ ᴩᴏʀ ᴍᴀʀᴄᴀʀ ᴏ ɢʀᴜᴩᴏ* 🗣️`,
mentions: [alvoJid]
}, { quoted: selo }).catch(() => {});

await kiimorizinha.groupParticipantsUpdate(from, [alvoJid], "remove").catch(() => {});
await antistatusDeleteMsg(kiimorizinha, from, info);

return;}
} catch (e) {
console.log(e);}

var USUARIOS_BLOQ = []
if(isAntiPv && !USUARIOS_BLOQ.includes(sender)) {
if(!isGroup && !SoDono && !isnit && !isVip){
await sleep(2500)
reply(msgantipv1.replace('#nome#', pushname))
setTimeout(async () => {
await kiimorizinha.updateBlockStatus(sender, 'block')
}, 2000)
}
USUARIOS_BLOQ.push(sender);
}

var MSG_ANTPV2_ENC = []
if(!isGroup && !isVip && !SoDono && !isnit && !issupre && !ischyt && !info.key.fromMe && isAntiPv2 && !MSG_ANTPV2_ENC.includes(sender)) {
MSG_ANTPV2_ENC.push(sender);
return reply(msgantipv2)
}

if(!isGroup && !isVip && !SoDono && !info.key.fromMe && isAntiPv3) return

const VerificarJSON = (json, value) => {
if(JSON.stringify(json).includes(value)) return true
return false
}

if (isX9VisuUnica) {
if (info.message?.viewOnceMessageV2 || type === "viewOnceMessage") {
let px;
if (JSON.stringify(info).includes("videoMessage")) {
px = info.message?.viewOnceMessageV2?.message?.videoMessage ||
 info.message?.viewOnceMessage?.message?.videoMessage;
if (px) {
px.viewOnce = false;
px.video = { url: px.url };
px.caption = (px.caption || "") + "\n\n";
await kiimorizinha.sendMessage(from, px, { quoted: selo });
}
} else if (JSON.stringify(info).includes("imageMessage")) {
px = info.message?.viewOnceMessageV2?.message?.imageMessage ||
 info.message?.viewOnceMessage?.message?.imageMessage;
if (px) {
px.viewOnce = false;
px.image = { url: px.url };
px.caption = (px.caption || "") + "\n\n";
await kiimorizinha.sendMessage(from, px, { quoted: selo });
}
} else if (JSON.stringify(info).includes("audioMessage") ||
 info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2Extension?.message?.audioMessage) {
let audio = info.message?.viewOnceMessageV2?.message?.audioMessage ||
info.message?.viewOnceMessage?.message?.audioMessage;

if (audio && audio.mimetype) {
let buffAudio = await getFileBuffer(audio, 'audio');
let audioFile = getRandom('.mp3');
fs.writeFileSync(audioFile, buffAudio);
let audioBuffer = fs.readFileSync(audioFile);

await kiimorizinha.sendMessage(from, {
audio: audioBuffer,
mimetype: 'audio/mpeg',
ptt: false
}, { quoted: selo });

fs.rmSync(audioFile);}}}}

let horarios = {};
const horariosPath = './arquivos/tictactoe/grupo.json';

if (fs.existsSync(horariosPath)) {
try {
horarios = JSON.parse(fs.readFileSync(horariosPath));
} catch (e) {
console.error('erro ao carregar horarios:', e);
horarios = {};
}
}

const salvarHorarios = () => {
fs.writeFileSync(horariosPath, JSON.stringify(horarios, null, 2));
};

const definirFechamento = (from, horario) => {
horarios[from] = horarios[from] || {};
horarios[from].fechamento = horario;
salvarHorarios();
};

const definirAbertura = (from, horario) => {
horarios[from] = horarios[from] || {};
horarios[from].abertura = horario;
salvarHorarios();
};

const removerHorarios = (from) => {
if (horarios[from]) {
delete horarios[from];
salvarHorarios();}};

let ultimaExecucao = {};

if (global.intervalHorarios) clearInterval(global.intervalHorarios);

global.intervalHorarios = setInterval(async () => {
const time2 = moment().tz('America/Sao_Paulo').format('HH:mm:ss');

if (fs.existsSync(horariosPath)) {
try {
horarios = JSON.parse(fs.readFileSync(horariosPath));
} catch (e) {
console.error(e);
horarios = {};}}

for (const from in horarios) {
const horario = horarios[from];
if (!horario) continue;

try {
if (horario.fechamento && time2 === horario.fechamento) {
if (ultimaExecucao[from + '_fechamento'] !== horario.fechamento) {
await kiimorizinha.groupSettingUpdate(from, 'announcement');
await kiimorizinha.sendMessage(from, {
text: mess.abertura()
});
ultimaExecucao[from + '_fechamento'] = horario.fechamento;}}

if (horario.abertura && time2 === horario.abertura) {
if (ultimaExecucao[from + '_abertura'] !== horario.abertura) {
await kiimorizinha.groupSettingUpdate(from, 'not_announcement');
await kiimorizinha.sendMessage(from, {
text: mess.fechamento(horario)
});
ultimaExecucao[from + '_abertura'] = horario.abertura;}}
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}}
}, 1000);

async function sendMenu(from, selo, opt = {}) {
const {
reaction = `${emojii}`,
caption = mess.error(),
isGroupRequired = false,
isAdminRequired = false,
isOwnerRequired = false,
isModoBnRequired = false,
sendAudio = false,
mentionedJid = []
} = opt;

try {
reagir(from, reaction);

if (isGroupRequired && !isGroup) return reply(mess.onlyGroup());
if (isAdminRequired && !isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (isOwnerRequired && !SoDono) return reply(mess.onlyOwner());
if (isModoBnRequired && !isModobn) return reply(mess.onlyGroupFun(prefix));
if (sendAudio && isAudioMenu) await sendAudioMenu(from);

const midia = carregarMidia("fotomenu");
const msg = { caption, contextInfo: { ...ChannelContextNewsLetter, mentionedJid } };

if (midia.type === "video") {
msg.video = midia.data;
msg.gifPlayback = true;
} else if (midia.type === "image") {
msg.image = midia.data;
} else {
msg.text = caption;}

await kiimorizinha.sendMessage(from, msg, { quoted: selo });

} catch (e) {
console.error(e);
await kiimorizinha.sendMessage(from, {
text: caption,
contextInfo: { ...ChannelContextNewsLetter, mentionedJid }
}, { quoted: selo });}}

if (isAutoDl && isGroup && !info.key.fromMe) {

if (typeof body === 'string' && !body.startsWith(prefix)) {

const tiktokMatch = body.match(/https?:\/\/(?:www\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/i);

if (tiktokMatch) {
try {
const link = tiktokMatch[0]
const url = `${API_KIMORI_URL}/api/download/tiktok?url=${encodeURIComponent(link)}&apikey=${APIKEY_KIMORI}`
const response = await axios.get(url)
const data = response.data
if (data.success && data.data?.video_url) {
await kiimorizinha.sendMessage(from, {
video: { url: data.data.video_url },
mimetype: "video/mp4",
fileName: "tiktok.mp4",
caption: `🎵 TikTok | ${data.data.titulo || 'Vídeo'}`,
contextInfo: ChannelContextNewsLetter
}, { quoted: selo })
} else {
console.log("Erro Auto TikTok: API não retornou vídeo")}
return
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}}

const instaMatch = body.match(/https?:\/\/(?:www\.)?instagram\.com\/[^\s]+/i);
if (instaMatch) {
try {
const link = instaMatch[0];
let downloadSuccess = false;

try {
const url = `${API_KIMORI_URL}/api/download/instagram-beta?url=${encodeURIComponent(link)}&apikey=${APIKEY_KIMORI}`;
const response = await axios.get(url);
const data = response.data;

if (data.success && data.data) {
if (data.data?.video) {
await kiimorizinha.sendMessage(from, {
video: { url: data.data.video },
mimetype: "video/mp4",
fileName: "instagram.mp4",
caption: `📸 *Instagram Vídeo*\n🔗 ${link}`,
contextInfo: ChannelContextNewsLetter
}, { quoted: selo });
downloadSuccess = true;
}
else if (data.data?.imagem) {
await kiimorizinha.sendMessage(from, {
image: { url: data.data.imagem },
caption: `📸 *Instagram Imagem*\n🔗 ${link}`,
contextInfo: ChannelContextNewsLetter
}, { quoted: selo });
downloadSuccess = true;
}

else if (data.data?.images && Array.isArray(data.data.images)) {
for (const img of data.data.images) {
await kiimorizinha.sendMessage(from, {
image: { url: img },
caption: `📸 *Instagram Carrossel*\n🔗 ${link}`,
contextInfo: ChannelContextNewsLetter
}, { quoted: selo });
}
downloadSuccess = true;

}
}
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}

if (!downloadSuccess) {
try {
const url = `${API_KIMORI_URL}/api/download/instagram?url=${encodeURIComponent(link)}&apikey=${APIKEY_KIMORI}`;
const response = await axios.get(url);
const data = response.data;

if (data.success && data.data) {
if (data.data?.video_url || data.data?.video) {
await kiimorizinha.sendMessage(from, {
video: { url: data.data.video_url || data.data.video },
mimetype: "video/mp4",
fileName: "instagram.mp4",
caption: `📸 *Instagram Vídeo*\n🔗 ${link}`,
contextInfo: ChannelContextNewsLetter
}, { quoted: selo });
downloadSuccess = true;
}
else if (data.data?.image_url || data.data?.imagem || data.data?.image) {
await kiimorizinha.sendMessage(from, {
image: { url: data.data.image_url || data.data.imagem || data.data.image },
caption: `📸 *Instagram Imagem*\n🔗 ${link}`,
contextInfo: ChannelContextNewsLetter
}, { quoted: selo });
downloadSuccess = true;
}
}
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
}

if (!downloadSuccess) {
await reply(`❌ *Não foi possível baixar o conteúdo do Instagram.*

🔗 Link: ${link}

💡 *Possíveis soluções:*
• Verifique se o post é público
• Tente novamente mais tarde
• O conteúdo pode ser restrito ou excluído

🔄 *Comando alternativo:* Use ${prefix}instagram ${link}`);
}

return;

} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
}
}}

if(isCmd && isBanned) return reply(mess.bannedUser())

const totalhit = JSON.parse(fs.readFileSync('./database/data/totalcmd.json'))
const CmdUsedBOT = () => {
totalhit[0].totalcmd += 1
fs.writeFileSync('./database/data/totalcmd.json', JSON.stringify(totalhit))
}
if (isCmd) CmdUsedBOT()

const reqcmd = JSON.parse(fs.readFileSync('./database/data/totalcmd.json'))

if (isGroup && isCmd && !isGroupAdmins && !SoDono && !isVip && dataGp[0]?.Limitar_CMD) {
var TEMPO_A = Math.floor(Date.now() / 1000)
var ID_G = Limit_CMD.findIndex(i => i.idgp === from)
var ID_U = Limit_CMD[ID_G]?.ids.findIndex(i => i.id === sender)
if(!JSON.stringify(Limit_CMD).includes(from) || ID_G < 0 && ID_U < 0) {
Limit_CMD.push({idgp: from, ids: [{id: sender, tempo: TEMPO_A}]})
fs.writeFileSync("./database/func/limitarcmd.json", JSON.stringify(Limit_CMD, null, 2));
} else if(ID_G >= 0 && ID_U < 0) {
Limit_CMD[ID_G].ids.push({id: sender, tempo: TEMPO_A})
fs.writeFileSync("./database/func/limitarcmd.json", JSON.stringify(Limit_CMD, null, 2));
}

if(ID_G >= 0 && ID_U >= 0) {
var TEMPO_D = Limit_CMD[ID_G].ids[ID_U].tempo;
var TEMPO_M = TEMPO_A - TEMPO_D
var TEMPO_D2 = parseInt(dataGp[0]?.Limit_tempo) || 60
if(TEMPO_M < TEMPO_D2) {
return reply(nescessario.TEMPO_DE_CMD.replaceAll("#tempocmd#", TimeCount(TEMPO_M)).replaceAll("#tempo#", TEMPO_D2))
} else {
Limit_CMD[ID_G].ids[ID_U].tempo = TEMPO_A
fs.writeFileSync("./database/func/limitarcmd.json", JSON.stringify(Limit_CMD, null, 2));
}
}
}

kiimorizinha.sendImageAsSticker = async (jid, path, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
 buffer = await writeExifImg(buff, options)
} else {
 buffer = await imageToWebp(buff)
}
await kiimorizinha.sendMessage(jid, { sticker: { url: buffer }, ...options})
return buffer
}

kiimorizinha.sendInteractiveTXT = async(idChat, mainText = '', footerText = '', quotedMessage = {}, buttonsParams = {}) => {
try {
await kiimorizinha.relayMessage(idChat, {interactiveMessage: {body: {text: mainText}, footer: {text: footerText}, contextInfo: quotedMessage, nativeFlowMessage: buttonsParams}}, {});
} catch(errorMessage) {
await reply(String(errorMessage));
}
}

kiimorizinha.sendInteractiveIMG = async(imageDir, ChatID, definedText = '', footer = '', contextMessageInfo = {}, buttonsParams = {}) => {
try {
create = await prepareWAMessageMedia({image: fs.readFileSync(imageDir)}, {upload: kiimorizinha.waUploadToServer});
imageCreate = create.imageMessage;
await kiimorizinha.relayMessage(ChatID, {interactiveMessage: {header: {hasMediaAttachment: true, imageMessage: imageCreate}, headerType: 'IMAGE', body: {text: definedText}, footer: {text: footer}, contextInfo: contextMessageInfo, nativeFlowMessage: buttonsParams}}, {});
 } catch(errorMessage) {
 return reply(String(errorMessage));
}
 }

const getallcases = () => {
try {
const content = fs.readFileSync("kimori.js", "utf8");
const regex = /case\s+['"](.+?)['"]\s*:/g;
const matches = [];
let match;

while ((match = regex.exec(content)) !== null) {
matches.push(match[1]);
}

return matches;
} catch (error) {
console.error("Erro no getallcases:", error.message);
return [];
}
}

const allCases = getallcases();

const rmLetras = (txt) =>
txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const getdistance = (a, b) => {
const lenA = a.length, lenB = b.length
if (!lenA) return lenB
if (!lenB) return lenA

const matrix = Array.from({ length: lenB + 1 }, (_, i) => [i])
for (let j = 1; j <= lenA; j++) matrix[0][j] = j

for (let i = 1; i <= lenB; i++) {
for (let j = 1; j <= lenA; j++) {
matrix[i][j] = b[i - 1] === a[j - 1]
? matrix[i - 1][j - 1]
: Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]) + 1
}
}
return matrix[lenB][lenA]
}

const getSimilarity = (array, txt, prefix) => {
let melhorNome = `Menu`, melhorScore = 0
const base = rmLetras(txt)

for (const word of array) {
const distance = getdistance(base, word.toLowerCase())
const maxLen = Math.max(base.length, word.length)
const score = 1 - distance / maxLen
if (score > melhorScore) {
melhorScore = score
melhorNome = word
}
}

return {
nome: melhorNome,
porcentagem: melhorScore * 100
}
}

const similarityCmd = (txt) => {
getsmlrt = getSimilarity(allCases, txt, prefix)
if(rmLetras(getsmlrt.nome).includes(`${prefix}Menu`)) return [{comando: getsmlrt.nome, porcentagem: getsmlrt.porcentagem}]
return [{comando: prefix+getsmlrt.nome, porcentagem: Number(getsmlrt.porcentagem).toFixed(1)}]
}

const AUTOREPO_DIR = './database/data/autorepo'
const AUTOREPO_MEDIA_DIR = `${AUTOREPO_DIR}/media`

const ensureAutorepoStore = () => {
if (!fs.existsSync(AUTOREPO_DIR)) fs.mkdirSync(AUTOREPO_DIR, { recursive: true })
if (!fs.existsSync(AUTOREPO_MEDIA_DIR)) fs.mkdirSync(AUTOREPO_MEDIA_DIR, { recursive: true })
}

const getAutorepoJsonPath = (jid) => `${AUTOREPO_DIR}/${jid}.json`

const normalizeRepoKey = (txt = '') => {
return rmLetras(String(txt || ''))
.toLowerCase()
.replace(/[^a-z0-9 ]/gi, ' ')
.trim()
.replace(/\s+/g, ' ')
}

const loadGroupAutorepo = (jid) => {
try {
ensureAutorepoStore()
const p = getAutorepoJsonPath(jid)
if (!fs.existsSync(p)) fs.writeFileSync(p, '[]\n')
const raw = fs.readFileSync(p, 'utf8')
const parsed = JSON.parse(raw)
return Array.isArray(parsed) ? parsed : []
} catch {
return []
}
}

const saveGroupAutorepo = (jid, arr) => {
ensureAutorepoStore()
fs.writeFileSync(getAutorepoJsonPath(jid), JSON.stringify(arr, null, 2) + '\n')
}

const getQuotedContext = () => {
return (
info?.message?.extendedTextMessage?.contextInfo ||
info?.message?.imageMessage?.contextInfo ||
info?.message?.videoMessage?.contextInfo ||
info?.message?.documentMessage?.contextInfo ||
info?.message?.audioMessage?.contextInfo ||
info?.message?.stickerMessage?.contextInfo ||
info?.message?.documentWithCaptionMessage?.message?.documentMessage?.contextInfo ||
null
)
}

const getQuotedMessageRepo = () => {
const ctx = getQuotedContext()
return ctx?.quotedMessage || null
}

const extractAnyTextRepo = (m) => {
if (!m) return ''
if (m.conversation) return m.conversation
if (m.extendedTextMessage?.text) return m.extendedTextMessage.text
if (m.imageMessage?.caption) return m.imageMessage.caption
if (m.videoMessage?.caption) return m.videoMessage.caption
if (m.documentMessage?.caption) return m.documentMessage.caption
return ''
}

const getRepoExtFromMime = (mime = '', fallbackType = '') => {
const m = String(mime || '').toLowerCase()

if (fallbackType === 'sticker') return 'webp'
if (fallbackType === 'audio') {
if (m.includes('mpeg')) return 'mp3'
if (m.includes('mp4') || m.includes('m4a')) return 'm4a'
if (m.includes('ogg')) return 'ogg'
if (m.includes('opus')) return 'opus'
return 'ogg'
}
if (fallbackType === 'image') {
if (m.includes('png')) return 'png'
if (m.includes('webp')) return 'webp'
return 'jpg'
}
if (fallbackType === 'video') {
if (m.includes('quicktime')) return 'mov'
if (m.includes('mkv')) return 'mkv'
return 'mp4'
}

return 'bin'
}

const getRepoMimeByExt = (file = '', type = '') => {
const lower = String(file || '').toLowerCase()

if (type === 'audio') {
if (lower.endsWith('.mp3')) return 'audio/mpeg'
if (lower.endsWith('.m4a')) return 'audio/mp4'
if (lower.endsWith('.ogg')) return 'audio/ogg'
if (lower.endsWith('.opus')) return 'audio/ogg; codecs=opus'
return 'audio/mpeg'
}

if (type === 'image') {
if (lower.endsWith('.png')) return 'image/png'
if (lower.endsWith('.webp')) return 'image/webp'
return 'image/jpeg'
}

if (type === 'video') {
if (lower.endsWith('.mov')) return 'video/quicktime'
if (lower.endsWith('.mkv')) return 'video/x-matroska'
return 'video/mp4'
}

if (type === 'sticker') return 'image/webp'
return 'application/octet-stream'
}

const saveAutorepoMediaFile = async (jid, gatilho, tipo, quotedMsg) => {
ensureAutorepoStore()

let mediaObj = null
let mediaType = null

const img = quotedMsg?.imageMessage || quotedMsg?.viewOnceMessage?.message?.imageMessage || quotedMsg?.viewOnceMessageV2?.message?.imageMessage
const vid = quotedMsg?.videoMessage || quotedMsg?.viewOnceMessage?.message?.videoMessage || quotedMsg?.viewOnceMessageV2?.message?.videoMessage
const aud = quotedMsg?.audioMessage
const stk = quotedMsg?.stickerMessage

if (tipo === 'image') {
if (!img) return null
mediaObj = img
mediaType = 'image'
} else if (tipo === 'video') {
if (!vid) return null
mediaObj = vid
mediaType = 'video'
} else if (tipo === 'audio') {
if (!aud) return null
mediaObj = aud
mediaType = 'audio'
} else if (tipo === 'sticker') {
if (!stk) return null
mediaObj = stk
mediaType = 'sticker'
} else {
return null
}

const buffer = await getFileBuffer(mediaObj, mediaType)
if (!buffer || !Buffer.isBuffer(buffer)) return null

const ext = getRepoExtFromMime(mediaObj?.mimetype, mediaType)
const fileName = `${jid}_${Date.now()}_${Math.random().toString(16).slice(2)}_${gatilho.replace(/\s+/g, '_')}.${ext}`
const fullPath = `${AUTOREPO_MEDIA_DIR}/${fileName}`

fs.writeFileSync(fullPath, buffer)

return {
file: fileName,
mimetype: mediaObj?.mimetype || getRepoMimeByExt(fileName, mediaType)
}
}

const { registrarNoPrefix, removerNoPrefix, getComandoNoPrefix,registrarFigSticker, removerFigSticker, getComandoFig, listarFigStickers, listarNoPrefix } = require('./arquivos/funcoes/command.js')

const Yutasticker = (Object.keys(info.message || {})[0] === "stickerMessage" && info.message?.stickerMessage?.fileSha256)
? info.message.stickerMessage.fileSha256.toString('base64')
: ""

if (Yutasticker) {
const comandoFig = getComandoFig(Yutasticker)

if (comandoFig && typeof comandoFig === "string") {
isCmd = true

const realFull = String(comandoFig || "").trim()
const realParts = realFull.split(/\s+/).filter(Boolean)

const cmdReal = normNP(realParts[0] || "")
const argsFixos = realParts.slice(1).join(" ")

command = cmdReal

const novoQFig = String(argsFixos || "").trim()

q = novoQFig

const novosArgs = novoQFig ? novoQFig.split(/\s+/).filter(Boolean) : []
args.splice(0, args.length, ...novosArgs)
}
}

function normNP(str) {
return String(str || "")
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "")
.replace(/\s+/g, " ")
.trim()
}

if (!isCmd) {
const bodyOriginalNP = String(budy2 || "")
const bodyN = normNP(bodyOriginalNP)

let hitNoPrefix = null
let novoQ = null

try {
const listaNP = listarNoPrefix() || []

const ordenada = listaNP
.filter(x => x?.cmdSemPrefixo && x?.comandoOriginal)
.map(x => {
const g = normNP(x.cmdSemPrefixo)
return {
...x,
gatilhoN: g,
palavras: g.split(" ").filter(Boolean).length,
len: g.length
}
})
.filter(x => x.gatilhoN)
.sort((a, b) => {
if (b.palavras !== a.palavras) return b.palavras - a.palavras
return b.len - a.len
})

for (const item of ordenada) {
const g = item.gatilhoN
if (!g) continue

if (g.length === 1) {
if (bodyN === g || bodyN.startsWith(g + " ")) {
hitNoPrefix = item
break
}
continue
}

if (bodyN === g || bodyN.startsWith(g + " ")) {
hitNoPrefix = item
break
}
}
} catch (e) { console.error('[erro]', e) }

if (hitNoPrefix && hitNoPrefix.comandoOriginal) {
isCmd = true

const realFull = String(hitNoPrefix.comandoOriginal || "").trim()
const realParts = realFull.split(/\s+/).filter(Boolean)

const cmdReal = normNP(realParts[0] || "")
const argsFixos = realParts.slice(1).join(" ")

command = cmdReal

const gLen = normNP(hitNoPrefix.cmdSemPrefixo).length
const restoUser = bodyN.slice(gLen).trim()

novoQ = [argsFixos, restoUser].filter(Boolean).join(" ").trim()

q = novoQ

const novosArgs = novoQ ? novoQ.split(/\s+/).filter(Boolean) : []
args.splice(0, args.length, ...novosArgs)}}

if (!global.menuAzAtivos) global.menuAzAtivos = {};

if (!isCmd && global.menuAzAtivos[sender]) {
const escolha = (body || '').trim();

if (escolha === '0') {
delete global.menuAzAtivos[sender];
return reply(`*ᴏᴋ ꜱᴇɴʜᴏʀ(ᴀ), ᴄᴀꜱᴏ ǫᴜᴇɪʀᴀ ꜱᴀʙᴇʀ ꜱᴇ ᴏꜱ ᴄᴏᴍᴀɴᴅᴏꜱ ꜰᴏʀᴀᴍ ᴀᴛɪᴠᴏꜱ, ᴜꜱᴇ →『 ${prefix}status 』 ᴇ ᴏʟʜᴇ ᴀᴛᴇɴᴛᴀᴍᴇɴᴛᴇ ᴛᴏᴅᴀꜱ ᴀꜱ ᴏᴩᴄᴏᴇꜱ*`);
}

const opcoes = {
'1': { cmd: 'antiaudio' },
'2': { cmd: 'antivideo' },
'3': { cmd: 'antiimg' },
'4': { cmd: 'autosticker' },

'5': { cmd: 'bemvindo', arg: 'texto' },
'6': { cmd: 'bemvindo', arg: 'foto' },
'7': { cmd: 'bemvindo', arg: 'audio' },
'8': { cmd: 'bemvindo', arg: 'video' },
'9': { cmd: 'bemvindo', arg: 'sticker' },

'10': { cmd: 'antilink' },
'11': { cmd: 'antilinkgp' },
'12': { cmd: 'antilinkeasy' },
'13': { cmd: 'anticatalogo' },
'14': { cmd: 'antistatus' },
'15': { cmd: 'antifake' },
'16': { cmd: 'anticontato' },
'17': { cmd: 'antiloc' },
'18': { cmd: 'antiddd' },
'19': { cmd: 'so_adm' },
'20': { cmd: 'x9adm' },
'22': { cmd: 'ativartudo' },
'23': { cmd: 'autodl' },
'24': { cmd: 'multiprefixo' },
'25': { cmd: 'antinotas' },
'26': { cmd: 'antipalavra' },
'27': { cmd: 'antipalavrao' },
'28': { cmd: 'modobn' }
};

if (opcoes[escolha]) {
command = opcoes[escolha].cmd;
args = opcoes[escolha].arg ? [opcoes[escolha].arg] : [];
isCmd = true;
prefix = '';}}

if (budy.startsWith('<')) {
try {
if (info.key.fromMe) return;
if (!SoDono && !isnit && !issupre && !ischyt) return;
console.log('[', colors.cyan('EVAL'), ']', colors.yellow(moment(info.messageTimestamp * 1000).format('DD/MM HH:mm:ss')), colors.green(q));
let res = JSON.stringify(eval(q.slice(1)), null, '\t');
return reply(res);
} catch (e) {
return reply(String(e));
}
}
if (budy2.startsWith('(>')) {
try {
if (info.key.fromMe) return;
if (!isnit && !issupre && !ischyt) return;
var konsol = q.slice(3);
Return = (sul) => {
var sat = JSON.stringify(sul, null, 2);
var bang = sat === undefined ? util.format(sul) : util.format(sat);
return reply(bang);
};
reply(util.format(eval(`;(async () => { ${konsol} })()`)));
} catch (e) {
reply(String(e));}}

if (budy.startsWith('$')) {
if (info.key.fromMe) return;
if (!SoDono && !isnit && !issupre && !ischyt) return;
const comando = q.slice(1).trim();
exec(comando, (err, stdout, stderr) => {
if (err) return reply(String(err));
if (stderr) return reply(String(stderr));
if (stdout) return reply(String(stdout));
reply(`*ᴏ ᴄᴏᴍᴀɴᴅᴏ → 「 ${comando} 」 ꜰᴏɪ ᴇxᴇᴄᴜᴛᴀᴅᴏ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ ꜱᴇɴʜᴏʀ(ᴀ)*`);});}

if (/^\d+$/.test(body) && ultimosNicks[sender]) {
const lista = ultimosNicks[sender]
const index = Number(body) - 1
if (!lista[index]) {
reply("❌ Número inválido.")
} else {
reply(`${lista[index]}`)}
delete ultimosNicks[sender]
return}

 const versionBaileys = require("@whiskeysockets/baileys/package.json").version;
const firstV = speed();
const secondV = speed() - firstV;
const timestamp = speed();
const fast = speed() - timestamp;
const uptimeBot = TimeCount(process.uptime());

async function EnviarBtnLista(kiimorizinha, from, texto, titulo, secoes, midia = null, quoted = null) {
try {
const buttonParamsJson = JSON.stringify({ title: titulo, sections: secoes });
const button = [{ name: "single_select", buttonParamsJson }];
let payload;
if (midia) {
payload = {
text: texto,
[midia.type]: { url: midia.url },
interactiveButtons: button
};
} else {
payload = {
interactiveMessage: {
body: { text: texto },
nativeFlowMessage: {
buttons: button,
messageParamsJson: "{}"
}
}
};
}
await sendInteractiveMessage(kiimorizinha, from, payload, quoted ? { quoted } : {});
} catch (e) {
console.log('[EnviarBtnLista ERROR]', e);
}
}

async function EnviaBtnReply(kiimorizinha, from, texto, botoes, midia = null, quoted = null) {
try {
const buttons = botoes.map(b => ({
name: "quick_reply",
buttonParamsJson: JSON.stringify({ display_text: b.display_text, id: b.id })
}));
let payload;
if (midia) {
payload = {
text: texto,
[midia.type]: { url: midia.url },
interactiveButtons: buttons
};
} else {
payload = {
interactiveMessage: {
body: { text: texto },
nativeFlowMessage: {
buttons,
messageParamsJson: "{}"
}
}
};
}
await sendInteractiveMessage(kiimorizinha, from, payload, quoted ? { quoted } : {});
} catch (e) {
console.log('[EnviaBtnReply ERROR]', e);
}
}

function getPath(obj, path) {
return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj)
}
function setPath(obj, path, value) {
const parts = path.split('.')
const last = parts.pop()
const target = parts.reduce((o, k) => (o[k] ??= {}), obj)
target[last] = value
}

async function toggleGroupFeature(key, texts, buttonId) {
setPath(dataGp[0], key, !getPath(dataGp[0], key))
setGp(dataGp)
const enabled = getPath(dataGp[0], key)
const idBase = buttonId || key
if (isBotoes) {
const label = enabled ? `『❌』𝔻𝔼𝕊𝔸𝕋𝕀𝕍𝔸ℝ ${texts.label}『❌』` : `『✅』𝔸𝕋𝕀𝕍𝔸ℝ ${texts.label}『✅』`
await EnviaBtnReply(kiimorizinha, from, enabled ? texts.onMsg : texts.offMsg,
[{ display_text: label, id: `${prefix}${idBase}` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }])
} else {
reply(enabled ? texts.onPlain : texts.offPlain)
}
return enabled
}

async function toggleNescessarioFeature(key, texts, buttonId) {
setPath(nescessario, key, !getPath(nescessario, key))
setNes(nescessario)
const enabled = getPath(nescessario, key)
const idBase = buttonId || key
if (isBotoes) {
const label = enabled ? `『❌』𝔻𝔼𝕊𝔸𝕋𝕀𝕍𝔸ℝ ${texts.label}『❌』` : `『✅』𝔸𝕋𝕀𝕍𝔸ℝ ${texts.label}『✅』`
await EnviaBtnReply(kiimorizinha, from, enabled ? texts.onMsg : texts.offMsg,
[{ display_text: label, id: `${prefix}${idBase}` },
{ display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`, id: `${prefix}menu` }])
} else {
reply(enabled ? texts.onPlain : texts.offPlain)
}
return enabled
}

if (!isGroup && typeof body === 'string' && body.includes('https://chat.whatsapp.com/')) {
const esperaAluguel = getEsperaLink(senderNumeroReal);
if (esperaAluguel) {
try {
const URL_ID = body.split('https://chat.whatsapp.com/')[1]?.split(/[?\s]/)[0];
const metadataConvite = await kiimorizinha.groupAcceptInvite(URL_ID);
const grupoId = typeof metadataConvite === 'string' ? metadataConvite : metadataConvite?.id;
ativarAluguel(grupoId, esperaAluguel.dias, esperaAluguel.horas);
limparEsperaLink(senderNumeroReal);
await reply(`Entrei no grupo e ativei o aluguel por *${esperaAluguel.dias} dia(s)*! `);
} catch (e) {
console.error('[aluguel via link]', e);
await reply('Não consegui entrar nesse grupo (talvez o link esteja errado ou expirado). Manda o link de novo.');
}
continue;
}
}

const comandoExterno = getExternalCommand(command)

if (comandoExterno) {
try {
await comandoExterno.execute({
kiimorizinha, info, from, sender, isGroup, isStatus, isBot,
command, args, prefix, emojii, botNome: NomeDoBot,
reply, reagir, EnviaBtnReply, sendInteractiveMessage,
pushname, quoted, selo, q,
groupMetadata, groupName, groupMembers, groupAdmins,
isGroupAdmins, isBotGroupAdmins, SoDono, isVip, isBotoes,
dataGp, setGp, mess, setting, nescessario, setNes,
readJSON, writeJSON, getCached, setCached, mutateCached,
isChVip, isCargo, BotVersion, isBotoff, isAudioMenu,
sendAudioMenu, sendMenu, ChannelContextNewsLetter, ErroCase,
toggleGroupFeature, toggleNescessarioFeature,
isQuotedImage, isQuotedVideo, isQuotedMsg, isQuotedMsg2,
isQuotedDocument, isQuotedDocW, isQuotedAudio, isQuotedSticker,
setAntideleteFlag, getAntideleteFlag,
isAutoDl, isAutofigu, isAntiPorn, isAnticatalogo,
isBanchat, isModobn, isMultiP, isPalavrao, isPalavras,
getBuffer, TimeCount, msToTime, moment, dattofc, hourofc,
countMessage, getGroupIndex, pushnames, vip, ban, namoro1, namoro2,
joguinhodavelhajs, joguinhodavelhajs2, forca, frames, palavras,
upload, getFileBuffer, downloadContentFromMessage, convertSticker,
writeExifImg, sendImageAsSticker, sendVideoAsSticker,
sendImageAsSticker2, sendVideoAsSticker2, DLT_FL,
fetchJson, axios, exec, fs,
ANT_SP, directory, listanegraG, muted, anotar, somembros,
isAntiFlood, isLimitec, limitefl, isAntistatus, isWelcomePrivate,
isVisualizar, isConsole, IS_DELETE, isx9, isX9VisuUnica,
isAntilinkgp, isAntiLinkHard, isAntiLinkEasy, isAntifake,
isAntiDDD, isAntiNotas, isAntiCtt, Antidoc, isAntiSticker,
isAntiImg, isAntiVid, isAntiAudio, So_Adm, isCmdVip, isblockCmdG,
isListaBrancaG, isModoAluguel, isVerificado,
isAnticall, isAntiPv, isAntiPv2, isAntiPv3, isCmd,
getAntiRouboData, checkAntiRouboActive, extractTargetJids,
saveAntiRouboData, clearPermissions, addPermission, removePermission,
getResolvedPhoneList, loadGroupAutorepo,
saveGroupAutorepo, normalizeRepoKey, AUTOREPO_MEDIA_DIR,
getRepoExtFromMime, getRepoMimeByExt, saveAutorepoMediaFile,
readTakeDB, writeTakeDB, userKeyFromJid, applyTakeStickerFromBuffer,
__FAM_load, __FAM_save, __FAM_jid, __FAM_isMarriedInGroup,
__FAM_makeId, __FAM_findFamilyByMember, __FAM_pickTargetJid,
aluguelDB, aluguelSave, aluguelPlanos, findPlano, ativarAluguel, formatBRL,
desativarAluguel, isAluguelAtivo, tempoRestante, listarGruposAlugados,
seguirCanalAuto, reagirCanalAuto, CANAL_AUTO_JID,
isnit, menc_jid2, senderNumeroReal, marc_tds, menc_os2, nmrdn, 
sender_ou_n, sendPoll, prepareMentions, formatJid, blcp, 
saveBanList, issupre, ischyt, mention, tools, 
replyWithReaction, nmrdnlid, sendMentions, getComandoBlock, 
addComandos, deleteComandos, PaymentCardDiv, botNumberLID, 
numerodono, ownerName, isAutorepo, botNumber, normalizar, 
isQuotedGif, isMedia, NumeroDoBot, ownerNumber, horarios, 
definirFechamento, definirAbertura, removerHorarios, 
qrcode, mentions, budy, nmrdn, isUrl, getCommandCount, 
jidNormalizedUser, menc_prt, arrayDDDs, getQuotedMessageRepo, 
rmLetras, extractAnyTextRepo, grupoMute, ADVT, limparContadorUsuariosFora, getBaileysVersion, measureEventLoop, createPingMessage, body
})
} catch (err) {
console.error(`[COMANDO] Erro ao executar ${prefix}${command}:`, err)
try { reply('Ocorreu um erro ao executar este comando: ' + (err?.message || err)) } catch (e2) { console.error('[erro]', e2) }
}
continue
}

switch(command) {


case 'gojoyaoi':
case 'narutoyaoi':
case 'kakashiyaoi':
case 'sasukeyaoi':
case 'luffyyaoi':
case 'gokuyaoi':
case 'jirayayaoi':
case 'saitamayaoi':
case 'tanjiroyaoi':
case 'todorokiyaoi':
case 'vegetayaoi':
try {
const characterMap = {
'gojoyaoi': { name: 'Gojo Satoru', emoji: '👁️', endpoint: 'gojo' },
'narutoyaoi': { name: 'Naruto Uzumaki', emoji: '🍥', endpoint: 'naruto' },
'kakashiyaoi': { name: 'Kakashi Hatake', emoji: '📖', endpoint: 'kakashi' },
'sasukeyaoi': { name: 'Sasuke Uchiha', emoji: '🥷', endpoint: 'sasuke' },
'luffyyaoi': { name: 'Monkey D. Luffy', emoji: '🏴‍☠️', endpoint: 'luffy' },
'gokuyaoi': { name: 'Son Goku', emoji: '🐉', endpoint: 'goku' },
'jirayayaoi': { name: 'Jiraiya', emoji: '🐸', endpoint: 'jiraya' },
'saitamayaoi': { name: 'Saitama', emoji: '👊', endpoint: 'saitama' },
'tanjiroyaoi': { name: 'Tanjiro Kamado', emoji: '🗡️', endpoint: 'tanjiro' },
'todorokiyaoi': { name: 'Shoto Todoroki', emoji: '❄️', endpoint: 'todoroki' },
'vegetayaoi': { name: 'Vegeta', emoji: '🔥', endpoint: 'vegeta' }
};

const character = characterMap[command];
const imageUrl = `${API_KIMORI_URL}/api/yaoi/images/${character.endpoint}/random?apikey=${APIKEY_KIMORI}`;

const payload = {
text: `> 🔞${character.emoji} ${character.name}`,
image: { url: imageUrl },
interactiveButtons: [{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "⏭️ Próxima",
id: `${prefix+command}`
})
}]
};

await sendInteractiveMessage(kiimorizinha, sender, payload, {});
await reagir(from, '✅');

} catch (error) {
console.error('Erro:', error);
await reply(`❌ Ocorreu um erro no ${prefix+command}! Verifique o terminal, ou o site da API: ${API_KIMORI_URL}`);
await reagir(from, '❌');
}
break;

case 'aline':
case 'alinefx':
case 'alycia':
case 'amiichan':
case 'aninha':
case 'belle':
case 'brenda':
case 'cami':
case 'carniello':
case 'celestine':
case 'clowniac':
case 'feh':
case 'giovanna':
case 'gotica':
case 'isa':
case 'isadora':
case 'lay':
case 'leticia':
case 'marina':
case 'maru':
case 'meladinha':
case 'nath':
case 'nega':
case 'polonesa':
case 'princesa':
case 'victoria':
case 'rute':
case 'amador':
case 'egirlvid':
case 'onlyfans':
case 'pornovid': {
try {
const url = `${API_KIMORI_URL}/api/porno/${command}?apikey=${APIKEY_KIMORI}`;
const response = await axios.get(url, {
responseType: 'arraybuffer'});
const buffer = Buffer.from(response.data);
const contentType = response.headers['content-type'] || '';
if (contentType.startsWith('video/')) {
reply(`*🤫🔞 Já estou enviando no seu privado olha lá 🔞*`)
await kiimorizinha.sendMessage(
sender,
{
video: buffer,
mimetype: 'video/mp4'},
{ quoted: selo });
} else {
reply(`*🤫🔞 Já estou enviando no seu privado olha lá 🔞*`)
await kiimorizinha.sendMessage(
sender,
{
image: buffer},
{ quoted: selo });}
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
break;
}


default:

if(isGroup && isBotGroupAdmins && !isGroupAdmins) {
if(isAntiCtt || Antiloc || isAnticatalogo) {
if(type === 'contactMessage' || type === 'contactsArrayMessage' || type === 'locationMessage' || type === 'productMessage') {
if(isGroupAdmins) return await kiimorizinha.sendMessage(from, {text: mess.antisRandomMessage()}, {quoted: selo})
if(IS_DELETE) {
setTimeout(async() => {
await kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
}, 500)
}
if(!JSON.stringify(groupMembers).includes(sender)) return
await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove')
await kiimorizinha.sendMessage(from, {text: `🗑${"\n".repeat(255)}🗑️\n✅️ A limpeza de chat foi concluída com sucesso.`, contextInfo: {forwardingScore: 500, isForwarded:true}});
await kiimorizinha.sendMessage(from, {text: 'Por favor, reporte aos adminstradores do grupo sobre o ocorrido.', mentions: groupAdmins})
}
}
}

if(isGroup && isAntiFlood && !SoDono && !isVip && !isnit && isBotGroupAdmins && !isGroupAdmins && !isBot) {
if(isLimitec == null){var limitefl = limitefll.limitefl} else {var limitefl = isLimitec};
if(budy.length >= limitefl){
setTimeout(async() => {
reply(mess.charactersAnti());
console.log(colors.red(`[SPAM DETECTED IN THE GROUP]`), 'Grupo:', colors.yellow(`${groupName}`), colors.white(`Ocorrência: ${hourofc} ${dattofc}`));
}, 100);
setTimeout(async() => {
 if(IS_DELETE) {
setTimeout(async() => {
kiimorizinha.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
}, 500);
}
 if(!JSON.stringify(groupMembers).includes(sender)) return
 await kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove')
 }, 1000)
}
}

if (isGroup && isAutorepo && !isCmd && !info.key.fromMe) {
try {
const textoMsg = String(
body ||
budy ||
info.message?.conversation ||
info.message?.extendedTextMessage?.text ||
info.message?.imageMessage?.caption ||
info.message?.videoMessage?.caption ||
''
).trim()

if (textoMsg) {
const key = normalizeRepoKey(textoMsg)
const repos = loadGroupAutorepo(from)
const achado = repos.find(r => normalizeRepoKey(r?.trigger) === key)

if (achado) {
if (achado.type === 'text') {
await kiimorizinha.sendMessage(from, { text: achado.text || '' }, { quoted: selo })
return
}

if (!achado.file) return

const filePath = `${AUTOREPO_MEDIA_DIR}/${achado.file}`
if (!fs.existsSync(filePath)) return

if (achado.type === 'image') {
await kiimorizinha.sendMessage(from, {
image: { url: filePath },
caption: achado.caption || ''
}, { quoted: selo })
return
}

if (achado.type === 'video') {
await kiimorizinha.sendMessage(from, {
video: { url: filePath },
caption: achado.caption || '',
gifPlayback: false
}, { quoted: selo })
return
}

if (achado.type === 'audio') {
await kiimorizinha.sendMessage(from, {
audio: { url: filePath },
mimetype: achado.mimetype || getRepoMimeByExt(achado.file, 'audio'),
ptt: false
}, { quoted: selo })
return
}

if (achado.type === 'sticker') {
await kiimorizinha.sendMessage(from, {
sticker: fs.readFileSync(filePath)
}, { quoted: selo })
return
}
}
}
} catch (e) {
console.log('erro no gatilho do autorepo:', e)
}
}

if(isGroup && isPalavrao && isBotGroupAdmins && !SoDono && !isGroupAdmins) {
if(dataGp[0].antipalavrao.palavras.some(i => budy2.includes(i.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")))) {
setTimeout(() => {
if(!JSON.stringify(groupMembers).includes(sender)) return
kiimorizinha.groupParticipantsUpdate(from, [sender], 'remove');
setTimeout(() => {kiimorizinha.sendMessage(from, {delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})}, 500)
}, 2000);
kiimorizinha.sendMessage(from, {text: mess.permissionDenied_rUser()}, {quoted: selo});
}
}

const CmdInvalidMedia = () => {
const pastaLogos = './config-bot/logos';
const imagemPath = `${pastaLogos}/cmdinvalid.png`;
const videoPath = `${pastaLogos}/cmdinvalid.mp4`;

if (fs.existsSync(imagemPath))
return { tipo: 'image', path: imagemPath };

if (fs.existsSync(videoPath))
return { tipo: 'video', path: videoPath };

return null;
};

const privateCmd = (cmdDigitado, sugestao, porcentagem) => {
return `┏°𝄪⸗.⠡∝┅°.ᰔᩚ.°┅∝⠡.⸗𝄪°┓
┋${emojii}⃟°‧․ʿ⇢Digitado: \`${cmdDigitado}\`
┋${emojii}⃟°‧․ʿ⇢Sugestão: \`${sugestao}\`
┋${emojii}⃟°‧․ʿ⇢Precisão: ${porcentagem}%
┗°𝄪⸗.⠡∝┅°.ᰔᩚ.°┅∝⠡.⸗𝄪°┛`;
};

if (isCmd) {
const AB = similarityCmd(command);
const comandoDigitado = prefix + command;
let sugestao = AB[0].comando.replace(prefix, "");
sugestao = prefix + sugestao;
const notcmd = privateCmd(comandoDigitado, sugestao, AB[0].porcentagem);

const media = CmdInvalidMedia();

if (isBotoes) {
const quickButtons = [
{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: `『${emojii}』𝕄𝔼ℕ𝕌『${emojii}』`,
id: `${prefix}menu`
})
}
];
try {
if (media) {
const payload = {
text: notcmd,
interactiveButtons: quickButtons,
contextInfo: { ...ChannelContextNewsLetter }
};
if (media.tipo === 'image') {
payload.image = fs.readFileSync(media.path);
} else {
payload.video = fs.readFileSync(media.path);
payload.gifPlayback = true;
}
await sendInteractiveMessage(kiimorizinha, from, payload, { quoted: selo });
} else {
const payload = {
interactiveMessage: {
body: { text: notcmd },
nativeFlowMessage: {
buttons: quickButtons,
messageParamsJson: "{}"
}
}
};

await sendInteractiveMessage(kiimorizinha, from, payload, { quoted: selo });
}
} catch (e) {
console.error('[CmdInvalid BOTOES ERROR]', e);
await kiimorizinha.sendMessage(from, { text: notcmd }, { quoted: selo });
}
} else {
if (media) {
if (media.tipo === 'image') {
await kiimorizinha.sendMessage(from, {
image: fs.readFileSync(media.path),
caption: notcmd
}, { quoted: selo });
} else {
await kiimorizinha.sendMessage(from, {
video: fs.readFileSync(media.path),
gifPlayback: true,
caption: notcmd
}, { quoted: selo });
}
} else {
await kiimorizinha.sendMessage(from, {
text: notcmd
}, { quoted: selo });
}
}
}

if (budy2 === "prefixo") {
reply(`『${emojii}』 Meu prefixo é 『 ${prefix} 』, use ele para executar os meus comandos, use ${prefix}menu para ver o menu principal!! 🙃✨`);
}

if(budy2.includes("kimori")) {
await reagir(from, "☺️");
}

if(budy2.includes("📍")) {
if (JSON.stringify(info).includes("videoMessage")) {
var Xoxota = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
var video = Xoxota?.videoMessage || info.message?.videoMessage ||
Xoxota?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage ||
info.message?.viewOnceMessage?.message?.videoMessage || Xoxota?.viewOnceMessage?.message?.videoMessage;

if (video) {
video.viewOnce = false;
video.video = { url: video.url };
kiimorizinha.sendMessage(nmrdnlid, video, { quoted: selo });
}
} else if (JSON.stringify(info).includes("imageMessage")) {
var Xoxota = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
var image = Xoxota?.imageMessage || info.message?.imageMessage ||
Xoxota?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage ||
info.message?.viewOnceMessage?.message?.imageMessage || Xoxota?.viewOnceMessage?.message?.imageMessage;

if (image) {
image.viewOnce = false;
image.image = { url: image.url };
kiimorizinha.sendMessage(nmrdnlid, image, { quoted: selo });
}
} else if (JSON.stringify(info).includes("audioMessage") || info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2Extension?.message?.audioMessage) {
var audio = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage;

if (audio) {
if (!audio.mimetype) return;

let buffAudio = await getFileBuffer(audio, 'audio');
let audioFile = getRandom('.mp3');
fs.writeFileSync(audioFile, buffAudio);

let audioBuffer = fs.readFileSync(audioFile);
kiimorizinha.sendMessage(nmrdnlid, { audio: audioBuffer, mimetype: 'audio/mpeg', ptt: false }, { quoted: selo });

fs.rmSync(audioFile);
}
} else {
reply("");
}
}

}
}
}

async function forTemporaryVip() {
if(vip.length > 0) {
for (y of vip) {
if(y.save != Number(moment.tz('America/Sao_Paulo').format('DD'))) {
y.save = Number(moment.tz('America/Sao_Paulo').format('DD'));
fs.writeFileSync("./database/usuarios/vip.json", JSON.stringify(vip));
if(y.infinito == false) {
if(y.dias > 1) {
y.dias -= 1;
fs.writeFileSync("./database/usuarios/vip.json", JSON.stringify(vip));
} else {
kiimorizinha.sendMessage(y.id, {text: `*sᴇᴜs ᴅɪᴀs ᴅᴇ ᴜsᴜᴀʀɪᴏ(ᴀ) ᴠɪᴘ ᴀᴄᴀʙᴀʀᴀᴍ 🙅‍♂️*`});
AB = vip.map(b => b.id).indexOf(y.id);
vip.splice(AB, 1);
fs.writeFileSync("./database/usuarios/vip.json", JSON.stringify(vip));
}
}
}
}
}
}
forTemporaryVip().catch((error) => {console.log(error)});

startFunctionNaga().catch(async(error) => {
if(JSON.stringify(error).includes(API_KEY_KIMORI2)) {} else if(String(error).includes("Erro: aborted")) {
fileStart = require.resolve("./arquivos/connect.js");
delete require.cache[fileStart];
require(fileStart);
} else if(String(error).includes("nativeFlowResponseMessage")) {
} else {
return console.log('O servidor-geral caiu ou não foi possivel executar esta ação.', error);
}
})
}
}

fs.watchFile(require.resolve(__filename), () => {
fs.unwatchFile(require.resolve(__filename));
console.log(colors.white(`Alterações salvas, aguarde que estou carregando :) - '${__filename}'`));
delete require.cache[require.resolve(__filename)]
require(require.resolve(__filename))
})

module.exports = startconexao;