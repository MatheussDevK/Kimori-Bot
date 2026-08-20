const fs = require('fs');
const path = require('path');
const { KIMORI_UPDATES_URL } = require('../../config-bot/config.json');

function compararVersoes(a, b) {
const pa = String(a).split('.').map(Number);
const pb = String(b).split('.').map(Number);
for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
const na = pa[i] || 0;
const nb = pb[i] || 0;
if (na !== nb) return na - nb;
}
return 0;
}

function formatarTamanho(bytes) {
if (bytes === undefined || bytes === null) return '—';
const unidades = ['B', 'KB', 'MB', 'GB'];
let i = 0;
let valor = bytes;
while (valor >= 1024 && i < unidades.length - 1) {
valor /= 1024;
i++;
}
return `${valor.toFixed(valor < 10 && i > 0 ? 1 : 0)} ${unidades[i]}`;
}

module.exports = {
name: 'update',
category: 'dono',
description: 'Verifica (check) ou instala (start) a atualização mais recente do bot, publicada no site Kimori Updates. Apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, q, prefix, axios, from } = ctx;

if (!SoDono) return reply(mess.onlyOwner());

const acao = String(q || '').trim().toLowerCase();
if (acao !== 'check' && acao !== 'start') {
return reply(`*Use:*\n• ${prefix}update check\n• ${prefix}update start`);
}

if (!KIMORI_UPDATES_URL) {
return reply('*A url do site de atualizações não está configurada.*\n\n> Adicione "KIMORI_UPDATES_URL": "URL.com", no config-bot/config.json');
}

const pkgPath = path.join(process.cwd(), 'package.json');
let pkg;
try {
pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
} catch (e) {
return reply('*Não consegui ler o package.json da(o) bot.*');
}
const versaoAtual = pkg.version || '0.0.0';

let info;
try {
const resp = await axios.get(`${KIMORI_UPDATES_URL}/api/version`);
info = resp.data;
} catch (e) {
return reply('*Não consegui conectar ao site de atualizações.*');
}

if (!info?.version) {
return reply('*𝙽𝚎𝚗𝚑𝚞𝚖𝚊 𝚊𝚝𝚞𝚊𝚕𝚒𝚣𝚊𝚌̧𝚊̃𝚘 𝚍𝚒𝚜𝚙𝚘𝚗𝚒𝚟𝚎𝚕.*');
}

const temAtualizacao = compararVersoes(info.version, versaoAtual) > 0;

if (acao === 'check') {
if (!temAtualizacao) {
return reply(`*✅ 𝚅𝚘𝚌𝚎̂ 𝚓𝚊́ 𝚎𝚜𝚝𝚊́ 𝚗𝚊 𝚞𝚕𝚝𝚒𝚖𝚊 𝚟𝚎𝚛𝚜𝚊̃𝚘.*\n\nVersão atual: ${versaoAtual}`);
}

return reply(
`*『𝙉𝙀𝙒 𝙐𝙋𝘿𝘼𝙏𝙀』*\n\n` +
`• Versão atual: ${versaoAtual}\n` +
`• Nova versão: ${info.version}\n` +
`• Tamanho: ${formatarTamanho(info.sizeBytes)}\n` +
`• Publicada em: ${new Date(info.releaseDate).toLocaleString('pt-BR')}\n\n` +
`*Notas da atualização:*\n${info.changelog || 'sem notas.'}\n\n` +
`> Use ${prefix}update start pra instalar.`
);
}

// acao === 'start'
if (!temAtualizacao) {
return reply('*『✅』 𝚅𝚘𝚌𝚎̂ 𝚓𝚊́ 𝚎𝚜𝚝𝚊́ 𝚗𝚊 𝚞𝚕𝚝𝚒𝚖𝚊 𝚟𝚎𝚛𝚜𝚊̃𝚘, 𝚗𝚊𝚍𝚊 𝚙𝚛𝚊 𝚊𝚝𝚞𝚊𝚕𝚒𝚣𝚊𝚛.*');
}

let AdmZip;
try {
AdmZip = require('adm-zip');
} catch (e) {
return reply('*ᴏ ᴘᴀᴄᴏᴛᴇ "adm-zip" ɴᴀᴏ ᴇsᴛᴀ ɪɴsᴛᴀʟᴀᴅᴏ.*\n\n> Rode no servidor: npm install adm-zip\n> Depois reinicie o bot e tente de novo.');
}

const tmpZipPath = path.join(process.cwd(), `update-${info.version}.zip`);
const marcadorPath = path.join(process.cwd(), 'database', 'update-pendente.json');

try {
await reply(`*『⬇️』 𝙱𝚊𝚒𝚡𝚊𝚗𝚍𝚘 𝚊𝚝𝚞𝚊𝚕𝚒𝚣𝚊𝚌̧𝚊̃𝚘 ${info.version} (${formatarTamanho(info.sizeBytes)})...*`);

const resposta = await axios.get(`${KIMORI_UPDATES_URL}${info.downloadUrl}`, { responseType: 'arraybuffer' });
fs.writeFileSync(tmpZipPath, resposta.data);

fs.mkdirSync(path.dirname(marcadorPath), { recursive: true });
fs.writeFileSync(marcadorPath, JSON.stringify({
from,
versaoAntiga: versaoAtual,
versaoNova: info.version,
quando: Date.now(),
}));

const zip = new AdmZip(tmpZipPath);
zip.extractAllTo(process.cwd(), true);
fs.unlinkSync(tmpZipPath);

const pkgAtualizado = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
pkgAtualizado.version = info.version;
fs.writeFileSync(pkgPath, JSON.stringify(pkgAtualizado, null, 2));

await reply(`*『✅』𝚅𝚎𝚛𝚜𝚊̃𝚘 𝚊𝚝𝚞𝚊𝚕𝚒𝚣𝚊𝚍𝚊 𝚙𝚊𝚛𝚊 𝚊 𝚖𝚊𝚒𝚜 𝚛𝚎𝚌𝚎𝚗𝚝𝚎 𝚍𝚒𝚜𝚙𝚘𝚗𝚒𝚟𝚎𝚕: ${info.version}! 𝙴𝚜𝚝𝚘𝚞 𝚛𝚎𝚒𝚗𝚒𝚌𝚒𝚊𝚗𝚍𝚘...*`);
try { fs.unlinkSync(marcadorPath); } catch {}

setTimeout(() => process.exit(0), 1500);
} catch (e) {
console.log(e);
if (fs.existsSync(tmpZipPath)) { try { fs.unlinkSync(tmpZipPath); } catch {} }
reply(`*❌ ᴇʀʀᴏ ᴀᴏ ɪɴsᴛᴀʟᴀʀ ᴀ ᴀᴛᴜᴀʟɪᴢᴀᴄᴀ̃ᴏ:* ${e.message}`);
}
},
};
