import { jidNormalizedUser } from '@whiskeysockets/baileys';

function normalizarJid(alvo) {
if (!alvo) return null;
let s = String(alvo).trim();
s = s.replace(/:.*(?=@)/, '');
if (!s.includes('@')) {
const numeros = s.replace(/\D/g, '');
return numeros ? numeros + '@s.whatsapp.net' : null;
}
return s;
}

function normalizar(alvo) {
if (!alvo) return '';
const alvoStr = String(alvo).trim();
if (alvoStr.includes('@')) return alvoStr;
const numeros = alvoStr.replace(/\D/g, '');
if (!numeros) return '';
return numeros + '@s.whatsapp.net';
}

// Mantém o LID como está: "1234@lid" virar "1234@s.whatsapp.net" gerava um JID que não existe
// (o número do LID não é o telefone) e a menção não marcava ninguém.
function normalizarJidX9(jid = '') {
jid = String(jid || '');
if (!jid) return '';
return jid.replace(/:\d+(?=@)/, '');
}

function normalizeJidPromotions(raw) {
if (!raw) return '';
if (typeof raw === 'object' && raw !== null) {
return raw.id ?? raw.jid ?? '';
}
if (typeof raw === 'string' && raw.startsWith('{')) {
try {
const parsed = JSON.parse(raw);
return parsed.id ?? parsed.jid ?? raw;
} catch {
return raw;
}
}
return raw;
}

function getNumero(jid) {
return jid?.split('@')?.[0] ?? '';
}

function resolverJidReal(info, fallbackJid) {
const alt = info?.key?.participantAlt || info?.key?.remoteJidAlt || null;
if (alt) return alt;
if (fallbackJid && !String(fallbackJid).endsWith('@lid')) return fallbackJid;
return info?.key?.participant || info?.key?.remoteJid || fallbackJid || null;
}

function resolverNumeroReal(info, fallbackJid) {
return getNumero(resolverJidReal(info, fallbackJid));
}

function limparNumero(jid = '') {
return String(jid || '')
.replace(/@.+$/, '')
.replace(/[^\d]/g, '');
}

async function resolverMencaoReal(jid = '', kiimorizinha, from) {
try {
const base = String(jid || '').split('@')[0];
if (!base) return normalizarJidX9(jid);

const metadata = await kiimorizinha.groupMetadata(from).catch(() => null);
const participantes = Array.isArray(metadata?.participants) ? metadata.participants : [];

const achado = participantes.find(p => {
const candidatos = [p?.id, p?.jid, p?.participant, p?.participantPn, p?.phoneNumber, p?.lid]
.filter(Boolean)
.map(x => String(x));
return candidatos.some(x => x === jid || x.split('@')[0] === base);
});

// o id do participante é o JID que o grupo usa para menções (LID ou número)
const real = achado?.id || achado?.jid || achado?.participant || normalizarJidX9(jid);
return normalizarJidX9(real);
} catch {
return normalizarJidX9(jid);
}
}

function extrairMencao(info) {
const participant = info?.key?.participant || info?.key?.remoteJid || null;
const ctx = info?.message?.extendedTextMessage?.contextInfo ||
info?.message?.imageMessage?.contextInfo ||
info?.message?.videoMessage?.contextInfo ||
info?.message?.stickerMessage?.contextInfo ||
null;
const mentioned = ctx?.mentionedJid?.[0] || null;
const ctxParticipant = ctx?.participant || null;
return mentioned || ctxParticipant || participant;
}

function toNum(v) {
return String(v || '').replace(/\D/g, '');
}

// Descobre o número de telefone (só dígitos) de um JID que pode ser LID.
// Ordem: já é número -> metadados do grupo (phoneNumber) -> mapa LID->PN do Baileys -> dígitos do LID.
async function resolverNumeroDeJid(jid, kiimorizinha, groupMetadata) {
const s = String(jid || '');
if (!s) return '';
if (!s.endsWith('@lid')) return getNumero(s).replace(/:\d+$/, '').replace(/\D/g, '');
const participantes = Array.isArray(groupMetadata?.participants) ? groupMetadata.participants : [];
const p = participantes.find(x => x?.id === s || x?.lid === s);
const pn = p?.phoneNumber || p?.jid || p?.participantPn;
if (pn && !String(pn).endsWith('@lid')) return toNum(getNumero(pn));
try {
const mapeado = await kiimorizinha?.signalRepository?.lidMapping?.getPNForLID?.(s);
if (mapeado) return toNum(getNumero(String(mapeado)).replace(/:\d+$/, ''));
} catch {}
return toNum(getNumero(s));
}

export default {
normalizarJid,
normalizar,
normalizarJidX9,
normalizeJidPromotions,
getNumero,
resolverJidReal,
resolverNumeroReal,
limparNumero,
resolverMencaoReal,
extrairMencao,
toNum,
resolverNumeroDeJid,
jidNormalizedUser
};
export { normalizarJid, normalizar, normalizarJidX9, normalizeJidPromotions, getNumero, resolverJidReal, resolverNumeroReal, limparNumero, resolverMencaoReal, extrairMencao, toNum, resolverNumeroDeJid, jidNormalizedUser };
