import fs from 'node:fs';
import path from 'node:path';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
import { BASE_DIR } from '../../arquivos/funcoes/commandLoader.js';

// Testa todos os links de imagem/vídeo fixos do bot (links_img.json + comandos) e lista os quebrados.
// Link morto = comando que manda só o texto (o connect.js avisa no terminal com [MÍDIA]).
const RE_MIDIA = /https?:\/\/[^\s'"`<>)]+?\.(?:jpe?g|png|gif|webp|mp4|mp3|ogg)(?:\?[^\s'"`<>)]*)?(?=[\s'"`<>)]|$)/gi;

function coletarLinks() {
const usos = new Map(); // url -> Set(onde)
const add = (url, onde) => { if (!usos.has(url)) usos.set(url, new Set()); usos.get(url).add(onde); };
const imgs = loadJSON(new URL('../../config-bot/logos/links_img.json', import.meta.url), {});
for (const [chave, url] of Object.entries(imgs)) if (typeof url === 'string' && /^https?:/.test(url)) add(url, `links_img.json → ${chave}`);
for (const cat of fs.readdirSync(BASE_DIR, { withFileTypes: true }).filter(d => d.isDirectory())) {
for (const arq of fs.readdirSync(path.join(BASE_DIR, cat.name)).filter(f => f.endsWith('.js'))) {
const texto = fs.readFileSync(path.join(BASE_DIR, cat.name, arq), 'utf8');
for (const m of texto.matchAll(RE_MIDIA)) if (!m[0].includes('${')) add(m[0], `${cat.name}/${arq}`);
}
}
return usos;
}

async function testar(axios, url) {
const opcoes = { timeout: 15000, maxRedirects: 5, validateStatus: () => true, headers: { 'User-Agent': 'Mozilla/5.0' } };
try {
let r = await axios.head(url, opcoes);
if (r.status === 405 || r.status === 403) r = await axios.get(url, { ...opcoes, responseType: 'stream', headers: { ...opcoes.headers, Range: 'bytes=0-0' } }).then(x => { x.data?.destroy?.(); return x; });
const tipo = String(r.headers?.['content-type'] || '');
if (r.status >= 400) return `HTTP ${r.status}`;
if (tipo.includes('text/html')) return 'devolveu uma página, não o arquivo';
return null;
} catch (e) {
return e.code || e.message;
}
}

export default {
name: 'checklinks',
aliases: ['testarlinks', 'linksquebrados'],
category: 'dono',
description: 'Testa os links fixos de imagens/vídeos dos comandos e mostra quais estão fora do ar.',
async execute(ctx) {
const { reply, SoDono, mess, axios, reagir, from } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
const usos = coletarLinks();
const urls = [...usos.keys()];
await reagir(from, '⏳');
await reply(`🔎 Testando ${urls.length} links de mídia, aguarde...`);
const quebrados = [];
let i = 0;
const trabalhador = async () => {
while (i < urls.length) {
const url = urls[i++];
const erro = await testar(axios, url);
if (erro) quebrados.push({ url, erro, onde: [...usos.get(url)] });
}
};
await Promise.all(Array.from({ length: 6 }, trabalhador));
await reagir(from, quebrados.length ? '⚠️' : '✅');
if (!quebrados.length) return reply(`✅ Todos os ${urls.length} links de mídia estão funcionando.`);
let txt = `⚠️ *${quebrados.length} de ${urls.length} links fora do ar*\n(esses comandos vão mandar só o texto até você trocar o link)\n\n`;
for (const q of quebrados) txt += `• ${q.onde.slice(0, 3).join(', ')}\n  ${q.url}\n  motivo: ${q.erro}\n\n`;
txt += `Para trocar: edite *config-bot/logos/links_img.json* (ou o arquivo do comando) com um link novo.`;
return reply(txt.slice(0, 60000));
},
};
