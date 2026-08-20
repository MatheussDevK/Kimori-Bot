const fs = require('fs');
const { toNum, normalizarJid } = require('./jidUtils.js');

const GRUPO_ATIVACOES_DIR = './database/grupos/ATIVAÇÕES-GRUPO';

function getAntiRouboData(from) {
const pathAtiv = `${GRUPO_ATIVACOES_DIR}/${from}.json`;

if (!fs.existsSync(pathAtiv)) {
fs.writeFileSync(pathAtiv, JSON.stringify([{}], null, 2));
}

let data;
try {
data = JSON.parse(fs.readFileSync(pathAtiv));
if (!Array.isArray(data)) data = [data];
if (!data[0]) data[0] = {};
} catch {
data = [{}];
}

return { data, pathAtiv };
}

function checkAntiRouboActive(data, prefix) {
if (!data[0]?.antiroubo) {
return {
ok: false,
errorMsg: `*ᴠᴏᴄᴇ ᴘʀᴇᴄɪsᴀ ᴀᴛɪᴠᴀʀ ᴏ ᴀɴᴛɪ ᴀʀǫᴜɪᴠᴀᴍᴇɴᴛᴏ ᴘʀɪᴍᴇɪʀᴏ 🤷‍♂️\n> ᴜsᴇ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix}ᴀɴᴛɪᴀʀǫᴠ`
};
}
return { ok: true };
}

async function extractTargetJids(info, from, kiimorizinha) {
const ctx = info.message?.extendedTextMessage?.contextInfo || {};
const texto = info.message?.conversation || info.message?.extendedTextMessage?.text || '';

let alvoRaw = ctx.participant || ctx.mentionedJid?.[0] || null;

const typedMatch = texto.match(/@\s*(\d{8,15})/);
const typedNum = typedMatch?.[1] ? toNum(typedMatch[1]) : '';
if (!alvoRaw && typedNum) alvoRaw = typedNum;

if (!alvoRaw && texto) {
const num = (texto.match(/\d{8,15}/g) || [])[0];
if (num) alvoRaw = num;
}

if (!alvoRaw) return { telNum: '', lidNum: '' };

let meta;
try { meta = await kiimorizinha.groupMetadata(from); } catch { meta = null; }
const parts = meta?.participants || [];

const phoneToLid = new Map();
const lidToPhone = new Map();
for (const p of parts) {
const jid = p?.id || p?.jid || '';
const lid = p?.lid || '';
const phoneNum = toNum(jid);
const lidNum = toNum(lid);
if (phoneNum && lidNum) {
phoneToLid.set(phoneNum, lidNum);
lidToPhone.set(lidNum, phoneNum);
}
}

const rawStr = String(alvoRaw);
let telNum = '';
let lidNum = '';

if (rawStr.includes('@lid')) {
lidNum = toNum(rawStr);
telNum = lidToPhone.get(lidNum) || '';
} else if (rawStr.includes('@s.whatsapp.net')) {
telNum = toNum(rawStr);
lidNum = phoneToLid.get(telNum) || '';
} else {
telNum = toNum(rawStr);
lidNum = phoneToLid.get(telNum) || '';
}

if (!lidNum && typedNum && typedNum !== telNum) {
lidNum = typedNum;
}

return { telNum, lidNum };
}

function saveAntiRouboData(pathAtiv, data) {
fs.writeFileSync(pathAtiv, JSON.stringify(data, null, 2));
}

function clearPermissions(data) {
if (!Array.isArray(data[0].ar_permitidos)) data[0].ar_permitidos = [];
if (!Array.isArray(data[0].ar_permitidos_lid)) data[0].ar_permitidos_lid = [];
data[0].ar_permitidos = [];
data[0].ar_permitidos_lid = [];
return data;
}

function addPermission(data, telNum, lidNum) {
if (!Array.isArray(data[0].ar_permitidos)) data[0].ar_permitidos = [];
if (!Array.isArray(data[0].ar_permitidos_lid)) data[0].ar_permitidos_lid = [];

const jaTel = telNum && data[0].ar_permitidos.includes(telNum);
const jaLid = lidNum && data[0].ar_permitidos_lid.includes(lidNum);

if (jaTel || jaLid) {
return { addedTel: false, addedLid: false, alreadyExists: true };
}

let addedTel = false;
let addedLid = false;
if (telNum && !jaTel) {
data[0].ar_permitidos.push(telNum);
addedTel = true;
}
if (lidNum && !jaLid) {
data[0].ar_permitidos_lid.push(lidNum);
addedLid = true;
}

return { addedTel, addedLid, alreadyExists: false };
}

function removePermission(data, telNum, lidNum) {
if (!Array.isArray(data[0].ar_permitidos)) data[0].ar_permitidos = [];
if (!Array.isArray(data[0].ar_permitidos_lid)) data[0].ar_permitidos_lid = [];

const tinhaTel = telNum && data[0].ar_permitidos.map(toNum).includes(telNum);
const tinhaLid = lidNum && data[0].ar_permitidos_lid.map(toNum).includes(lidNum);

if (!tinhaTel && !tinhaLid) {
return { removedTel: false, removedLid: false, found: false };
}

if (telNum) {
data[0].ar_permitidos = data[0].ar_permitidos.map(toNum).filter(v => v && v !== telNum);
}
if (lidNum) {
data[0].ar_permitidos_lid = data[0].ar_permitidos_lid.map(toNum).filter(v => v && v !== lidNum);
}

return { removedTel: !!telNum && tinhaTel, removedLid: !!lidNum && tinhaLid, found: true };
}

function getResolvedPhoneList(data, participants) {

let permitTel = data[0].ar_permitidos || [];
permitTel = permitTel.map(toNum).filter(Boolean);

let permitLid = data[0].ar_permitidos_lid || [];
permitLid = permitLid.map(toNum).filter(Boolean);

const lidToPhone = new Map();
for (const p of participants || []) {
const lid = p?.lid ? String(p.lid) : '';
const id = p?.id ? String(p.id) : '';
if (!lid.includes('@lid')) continue;
if (!id.endsWith('@s.whatsapp.net')) continue;
const lidNum = toNum(lid);
const phoneNum = toNum(id);
if (lidNum && phoneNum) lidToPhone.set(lidNum, phoneNum);
}

const phonesSet = new Set();
for (const tel of permitTel) phonesSet.add(tel);
for (const lidNum of permitLid) {
const phone = lidToPhone.get(lidNum);
if (phone) phonesSet.add(phone);
}

return Array.from(phonesSet)
.filter(n => n && n.length >= 8 && n.length <= 15)
.sort((a, b) => a.localeCompare(b));
}

module.exports = {
getAntiRouboData,
checkAntiRouboActive,
extractTargetJids,
saveAntiRouboData,
clearPermissions,
addPermission,
removePermission,
getResolvedPhoneList,
GRUPO_ATIVACOES_DIR
};