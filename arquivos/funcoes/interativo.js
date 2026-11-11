// sendInteractiveMessage com suporte a imagem/vídeo no topo da mensagem de botões.
//
// O baileys_helpers ignora "image"/"video" no conteúdo: a mensagem chegava só com texto e
// botões (por isso o /play aparecia sem a capa da música). Aqui a mídia é enviada para o
// WhatsApp e vai no header do interactiveMessage.
import { prepareWAMessageMedia } from '@whiskeysockets/baileys';
import * as helpers from 'baileys_helpers';
import crypto from 'node:crypto';
import fs from 'node:fs';

// capas já enviadas ao WhatsApp: url -> mídia preparada (evita reenviar a mesma imagem)
const CACHE_MAX = 200;
const CACHE_TTL = 6 * 60 * 60 * 1000;
const cacheMidia = new Map();

function lerCache(chave) {
const c = cacheMidia.get(chave);
if (!c) return null;
if (Date.now() - c.t > CACHE_TTL) { cacheMidia.delete(chave); return null; }
cacheMidia.delete(chave);
cacheMidia.set(chave, c);
return c.midia;
}

function salvarCache(chave, midia) {
cacheMidia.set(chave, { midia, t: Date.now() });
while (cacheMidia.size > CACHE_MAX) cacheMidia.delete(cacheMidia.keys().next().value);
}

// chave do cache: link -> o próprio link; arquivo local -> caminho + data de modificação;
// buffer -> hash do conteúdo. Assim a mesma imagem (ex.: foto do menu) é enviada ao WhatsApp
// uma vez só, em vez de ser criptografada e reenviada a cada mensagem com botões.
function chaveDaMidia(tipo, fonte) {
try {
if (Buffer.isBuffer(fonte)) return `${tipo}|buf|${crypto.createHash('sha1').update(fonte).digest('hex')}`;
const url = fonte?.url;
if (typeof url !== 'string') return null;
if (/^https?:/i.test(url)) return `${tipo}|${url}`;
return `${tipo}|arq|${url}|${fs.statSync(url).mtimeMs}`;
} catch {
return null;
}
}

async function prepararHeader(sock, conteudo) {
const tipo = conteudo.image ? 'image' : conteudo.video ? 'video' : null;
if (!tipo) return null;
const fonte = conteudo[tipo];
const chave = chaveDaMidia(tipo, fonte);
let preparada = chave ? lerCache(chave) : null;
if (!preparada) {
const entrada = { [tipo]: fonte };
if (tipo === 'video' && conteudo.gifPlayback) entrada.gifPlayback = true;
preparada = await prepareWAMessageMedia(entrada, { upload: sock.waUploadToServer });
if (chave) salvarCache(chave, preparada);
}
return { title: conteudo.title || '', subtitle: conteudo.subtitle || '', hasMediaAttachment: true, ...preparada };
}

async function sendInteractiveMessage(sock, jid, conteudo, opcoes = {}) {
const temMidia = conteudo && Array.isArray(conteudo.interactiveButtons) && (conteudo.image || conteudo.video);
if (!temMidia) return helpers.sendInteractiveMessage(sock, jid, conteudo, opcoes);

let header = null;
// tenta a mídia principal e depois as alternativas (ex.: capa do YouTube se a da API falhar)
const alternativas = [conteudo.image ? { image: conteudo.image } : { video: conteudo.video, gifPlayback: conteudo.gifPlayback },
...[].concat(conteudo.imagemAlternativa || []).filter(Boolean).map(url => ({ image: { url } }))];
for (const tentativa of alternativas) {
try {
header = await prepararHeader(sock, { ...tentativa, title: conteudo.title, subtitle: conteudo.subtitle });
break;
} catch (e) {
console.error('[INTERATIVO] não consegui anexar a mídia:', tentativa.image?.url || tentativa.video?.url || '(buffer)', '-', e?.message || e);
}
}

const interactiveMessage = {
body: { text: conteudo.text || conteudo.caption || '' },
nativeFlowMessage: {
buttons: conteudo.interactiveButtons.map(b => ({ name: b.name || 'quick_reply', buttonParamsJson: b.buttonParamsJson })),
},
};
if (header) interactiveMessage.header = header;
else if (conteudo.title || conteudo.subtitle) interactiveMessage.header = { title: conteudo.title || conteudo.subtitle || '' };
if (conteudo.footer) interactiveMessage.footer = { text: conteudo.footer };
if (conteudo.contextInfo) interactiveMessage.contextInfo = conteudo.contextInfo;

return helpers.sendInteractiveMessage(sock, jid, { interactiveMessage }, opcoes);
}

const { sendButtons, sendAlbumMessage, sendInteractiveButtonsBasic } = helpers;

export { sendInteractiveMessage, sendButtons, sendAlbumMessage, sendInteractiveButtonsBasic };
export default { sendInteractiveMessage, sendButtons, sendAlbumMessage, sendInteractiveButtonsBasic };
