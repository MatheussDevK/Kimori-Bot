import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { spawn, execFile } from 'node:child_process';
import webp from 'node-webpmux';
import { pastaTemp } from './midiaTemp.js';

// Converte figurinha (webp, animada ou não) em vídeo mp4 para enviar como gif.
//
// Substitui a versão ofuscada anterior, que além de ilegível desativava o console.log
// do processo inteiro assim que era carregada (o terminal do bot parava de mostrar logs).
//
// Como funciona: o node-webpmux decodifica cada quadro em RGBA, os quadros são montados
// numa "tela" respeitando posição, mistura (blend) e descarte (dispose), e o resultado vai
// direto para o ffmpeg pelo stdin. Não precisa de serviço externo.

const FPS = 25;
const MS_POR_QUADRO = 1000 / FPS;

let libPronta = null;
function iniciarLib() {
if (!libPronta) libPronta = webp.Image.initLib();
return libPronta;
}

// temporários na pasta comum (limpa automaticamente se algo sobrar)
function caminhoTemp(ext) {
return path.join(pastaTemp(), `togif_${Date.now()}_${crypto.randomBytes(4).toString('hex')}${ext}`);
}

// ffmpeg exige largura/altura pares para yuv420p
const par = (n) => (n % 2 === 0 ? n : n + 1);

function rodarFfmpeg(args, entrada) {
return new Promise((resolve, reject) => {
const proc = spawn('ffmpeg', args, { stdio: ['pipe', 'ignore', 'pipe'] });
proc.stdin.on('error', () => {}); // erro de escrita aparece no código de saída do ffmpeg
let erro = '';
proc.stderr.on('data', (d) => { erro = (erro + d).slice(-2000); });
proc.on('error', reject);
proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg saiu com código ${code}: ${erro}`))));
if (entrada) entrada(proc.stdin).then(() => proc.stdin.end(), (e) => { proc.stdin.destroy(); reject(e); });
else proc.stdin.end();
});
}

function escrever(stream, buffer) {
return new Promise((resolve) => {
if (stream.write(buffer)) return resolve();
stream.once('drain', resolve);
});
}

// Cola o quadro (RGBA) na tela, na posição (x, y), com ou sem mistura de alfa
function comporQuadro(tela, larguraTela, alturaTela, quadro, fr) {
const ox = fr.x * 2; // no formato WebP o deslocamento é guardado dividido por 2
const oy = fr.y * 2;
for (let y = 0; y < fr.height; y++) {
const ty = oy + y;
if (ty >= alturaTela) break;
for (let x = 0; x < fr.width; x++) {
const tx = ox + x;
if (tx >= larguraTela) break;
const s = (y * fr.width + x) * 4;
const d = (ty * larguraTela + tx) * 4;
const a = quadro[s + 3];
if (!fr.blend || a === 255) {
tela[d] = quadro[s]; tela[d + 1] = quadro[s + 1]; tela[d + 2] = quadro[s + 2]; tela[d + 3] = a;
} else if (a > 0) {
const ad = tela[d + 3];
const inv = 255 - a;
const outA = a + (ad * inv) / 255;
for (let c = 0; c < 3; c++) {
tela[d + c] = Math.round((quadro[s + c] * a + (tela[d + c] * ad * inv) / 255) / outA);
}
tela[d + 3] = Math.round(outA);
}
}
}
}

function limparRegiao(tela, larguraTela, alturaTela, fr) {
const ox = fr.x * 2, oy = fr.y * 2;
for (let y = oy; y < Math.min(alturaTela, oy + fr.height); y++) {
tela.fill(0, (y * larguraTela + ox) * 4, (y * larguraTela + Math.min(larguraTela, ox + fr.width)) * 4);
}
}

async function animadaParaMp4(img, saida) {
const largura = img.width;
const altura = img.height;
const tela = Buffer.alloc(largura * altura * 4);
const frames = img.frames;
const filtro = `pad=${par(largura)}:${par(altura)}:0:0:color=white,format=yuv420p`;

await rodarFfmpeg([
'-y', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${largura}x${altura}`, '-r', String(FPS), '-i', 'pipe:0',
'-vf', filtro, '-c:v', 'libx264', '-preset', 'veryfast', '-movflags', '+faststart', '-an', saida
], async (stdin) => {
let tempoAcumulado = 0;
let quadrosEscritos = 0;
for (let i = 0; i < frames.length; i++) {
const fr = frames[i];
const rgba = Buffer.from(await img.getFrameData(i));
comporQuadro(tela, largura, altura, rgba, fr);
// repete o quadro conforme o tempo dele (os quadros podem ter durações diferentes)
tempoAcumulado += Math.max(fr.delay || 100, 20);
const alvo = Math.max(quadrosEscritos + 1, Math.round(tempoAcumulado / MS_POR_QUADRO));
while (quadrosEscritos < alvo) {
await escrever(stdin, tela);
quadrosEscritos++;
}
if (fr.dispose) limparRegiao(tela, largura, altura, fr);
}
});
}

function estaticaParaMp4(arquivo, saida) {
return new Promise((resolve, reject) => {
execFile('ffmpeg', [
'-y', '-loop', '1', '-t', '2', '-i', arquivo,
'-vf', 'pad=ceil(iw/2)*2:ceil(ih/2)*2:0:0:color=white,format=yuv420p',
'-c:v', 'libx264', '-preset', 'veryfast', '-r', String(FPS), '-movflags', '+faststart', '-an', saida
], (err) => (err ? reject(err) : resolve()));
});
}

// Recebe o caminho (ou buffer) de um .webp e devolve o caminho do .mp4 gerado
async function FiguMp4OuGif(entrada) {
await iniciarLib();
const img = new webp.Image();
await img.load(entrada);
const saida = caminhoTemp('.mp4');

try {
if (img.hasAnim && img.frames?.length) {
await animadaParaMp4(img, saida);
} else {
let arquivo = entrada;
let temporario = null;
if (Buffer.isBuffer(entrada)) {
temporario = caminhoTemp('.webp');
fs.writeFileSync(temporario, entrada);
arquivo = temporario;
}
try {
await estaticaParaMp4(arquivo, saida);
} finally {
if (temporario) fs.rm(temporario, { force: true }, () => {});
}
}
} catch (e) {
fs.rm(saida, { force: true }, () => {}); // falhou: não deixa o mp4 pela metade no disco
throw e;
}

// apaga o mp4 temporário depois de um tempo (dá tempo do envio terminar)
setTimeout(() => fs.rm(saida, { force: true }, () => {}), 2 * 60 * 1000).unref?.();
return saida;
}

export default { FiguMp4OuGif };

export { FiguMp4OuGif };
