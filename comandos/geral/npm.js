const fs = require('fs');

module.exports = {
name: 'npm',
category: 'geral',
description: 'Instala/consulta/pesquisa pacotes npm e envia o resultado como .zip (nenhuma checagem de dono no original).',
async execute(ctx) {
const {
reply, q, prefix, reagir, from, kiimorizinha, selo, ErroCase, command,
botNome: NomeDoBot, NPM_TEMP_DIR, execNpm,
} = ctx;

const args = q.trim().split(/\s+/);
const subCmd = args[0]?.toLowerCase() || '';
const pacote = args.slice(1).join(' ').trim();
const erro = async (msg) => {
await reagir(from, '❌');
return reply(msg);};
if (!q?.trim() || ['help', 'ajuda'].includes(subCmd)) {
return reply(
`📦 *NPM - GERENCIADOR DE MÓDULOS*\n\n` +
`1️⃣ Instalar:\n${prefix}npm install <nome>\n${prefix}npm i <nome>\nEx: ${prefix}npm install axios\n\n` +
`2️⃣ Versão específica:\n${prefix}npm install <nome>@<versao>\nEx: ${prefix}npm install axios@1.6.0\n\n` +
`3️⃣ Informações:\n${prefix}npm info <nome>\nEx: ${prefix}npm info axios\n\n` +
`4️⃣ Buscar:\n${prefix}npm search <termo>\nEx: ${prefix}npm search express`);}
if (['install', 'i'].includes(subCmd)) {
if (!pacote)
return erro(`❌ USE: ${prefix}npm install <nome>`);
await reagir(from, '📦');
const limpar = () => setTimeout(() => {
try {
fs.readdirSync(NPM_TEMP_DIR).forEach(f => {
const p = `${NPM_TEMP_DIR}${f}`;
fs.statSync(p).isDirectory()
? fs.rmSync(p, { recursive: true, force: true })
: fs.unlinkSync(p);
});
} catch (e) { console.error('[erro]', e) }
}, 3000);
try {
let nome = pacote; let versao = 'latest';
if (pacote.startsWith('@')) {
const ultimoArroba = pacote.lastIndexOf('@');
if (ultimoArroba > pacote.indexOf('/')) {
nome = pacote.slice(0, ultimoArroba);
versao = pacote.slice(ultimoArroba + 1);}
} else if (pacote.includes('@')) {
const split = pacote.split('@');
nome = split[0];
versao = split[1] || 'latest';}
const nomeZip = nome.replace(/^@[^/]+\//, '');
fs.writeFileSync(
`${NPM_TEMP_DIR}package.json`,
JSON.stringify({
name: "temp-npm-install",
version: "1.0.0",
private: true,
dependencies: {
[nome]: versao}
}, null, 2));
await execNpm(
`npm install --no-audit --no-fund --loglevel=error --no-bin-links --force`,
NPM_TEMP_DIR);
const modulePath = `${NPM_TEMP_DIR}node_modules/${nome}`;
if (!fs.existsSync(modulePath))
return erro(`❌ Não foi possível instalar ${pacote}`);
const zipPath = `${NPM_TEMP_DIR}${nomeZip}.zip`;
const archiver = require('archiver');
await new Promise((resolve, reject) => {
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', {
zlib: { level: 9 } });
output.on('close', resolve);
archive.on('error', reject);
archive.pipe(output);
archive.directory(modulePath, nomeZip);
archive.finalize(); });
await kiimorizinha.sendMessage(from, {
document: fs.readFileSync(zipPath),
mimetype: 'application/zip',
fileName: `${nomeZip}.zip`,
caption:
`📦 ${nome}\n` +
`📌 ${versao}\n` +
`📊 ${(fs.statSync(zipPath).size/1024).toFixed(2)} KB\n\n` +
`✅ Instalado com sucesso.`
}, { quoted: selo });
await reagir(from, '✅');
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
} finally {
limpar(); }
return;
}
if (subCmd === 'info') {
if (!pacote)
return erro(`❌ USE: ${prefix}npm info <nome>\nEX: ${prefix}npm info axios`);
await reagir(from, '🔍');
try {
const { stdout } = await execNpm(
`npm info ${pacote} --json` );
const data = JSON.parse(stdout);
const deps = data.dependencies ? Object.entries(data.dependencies) : [];
const info = [
`📦 ${data.name}`,
`📌 Versão: ${data.version || 'N/A'}`,
`📌 Descrição: ${data.description || 'N/A'}`,
`📌 Autor: ${data.author?.name || data.author || 'N/A'}`,
`📌 Licença: ${data.license || 'N/A'}`,
`📌 Homepage: ${data.homepage || 'N/A'}`,
`📌 Repositório: ${data.repository?.url || 'N/A'}`,
deps.length
? `\n📚 Dependências:\n${deps
.slice(0, 20)
.map(([d, v]) => `└─ ${d}@${v}`)
.join('\n')}`
: '',
`\n📝 Instalar:\n${prefix}npm install ${data.name}`
].filter(Boolean).join('\n');
await reply(info);
await reagir(from, '✅');
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
return;
}
if (subCmd === 'search') {
if (!pacote)
return erro(`❌ USE: ${prefix}npm search <termo>\nEX: ${prefix}npm search express`);
await reagir(from, '🔎');
try {
const { stdout } = await execNpm(
`npm search ${pacote} --json --limit=10` );
const data = JSON.parse(stdout);
if (!Array.isArray(data) || !data.length)
return erro(`❌ Nenhum resultado encontrado.`);
const resultado =
`🔎 RESULTADOS PARA: ${pacote}\n\n` +
data.slice(0, 10).map((pkg, i) => {
const desc = pkg.description ? pkg.description.length > 60 ? pkg.description.slice(0, 60) + '...' : pkg.description : 'Sem descrição';
return ( `${i + 1}. 📦 ${pkg.name}\n` +
`   📌 v${pkg.version}\n` +
`   📝 ${desc}` );
}).join('\n\n') +
`\n\n💡 Use:\n${prefix}npm info <nome>`;
await reply(resultado);
await reagir(from, '✅');
} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot); }
return;
}
await erro(
`❌ Subcomando inválido!\n\n` +
`${prefix}npm help`
);
},
};
