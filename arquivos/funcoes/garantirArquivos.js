// Roda ANTES de qualquer outro módulo (é o primeiro import do connect.js e do exports.js).
// Cria os arquivos de banco de dados que faltarem com um valor vazio, para o bot não cair com
// "ENOENT: no such file or directory" numa instalação nova ou com a pasta database incompleta.
// Arquivos de CONTEÚDO (perguntas, frases, palavras da forca...) e as configs não são inventados:
// se faltarem, o bot avisa exatamente quais são e para.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// raiz do projeto (o bot lê tudo com caminhos relativos a ela)
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
if (process.cwd() !== RAIZ) {
try { process.chdir(RAIZ); } catch {}
}

const PASTAS = [
'database/usuarios',
'database/func',
'database/grupos/ATIVAÇÕES-GRUPO/TESTE',
'database/grupos/games/gartic',
'database/grupos/games/quiz-futebol',
'database/grupos/games/quiz-animais',
'database/grupos/games/anagrama',
'database/grupos/games/enigma',
'database/grupos/games/wmusic',
'database/data/autorepo',
'database/data/media/forca/database',
'database/data/media/sticker/dados',
'database/data/media/poll',
'database/kimoriai',
'database/cache/play',
'database/rpg',
'arquivos/tictactoe/db',
];

// dados que o próprio bot vai preenchendo: podem começar vazios
const DADOS = {
'database/antispam.json': [],
'database/anti_sp.json': {},
'database/canal_auto.json': {},
'database/comandos.json': [],
'database/countmsg.json': [],
'database/diario.json': [],
'database/fig.json': [],
'database/noprefix.json': [],
'database/takes.json': {},
'database/data/totalcmd.json': [{ totalcmd: 0 }],
'database/func/aluguel_db.json': {},
'database/func/anotar.json': [],
'database/func/espera_link_aluguel.json': {},
'database/func/familia_db.json': { families: {}, pend: {} },
'database/func/giftcodes.json': {},
'database/func/limitarcmd.json': [],
'database/func/namoro1.json': [],
'database/func/namoro2.json': [],
'database/func/parceria.json': [],
'database/func/tmgroup.json': [],
'database/grupos/muted.json': [],
'database/kimoriai/memoria_kimori.json': { historico: [] },
'database/kimoriai/memoria_user.json': {},
'database/rpg/personagens.json': [],
'database/usuarios/banned.json': [],
'database/usuarios/compras_pendentes.json': {},
'database/usuarios/diario.json': [],
'database/usuarios/flood.json': {},
'database/usuarios/joguinhodavelha.json': [],
'database/usuarios/joguinhodavelha2.json': [],
'database/usuarios/kimocoins.json': {},
'database/usuarios/muted.json': [],
'database/usuarios/take.json': [],
'database/usuarios/users.json': [],
'database/usuarios/vip.json': [],
'arquivos/tictactoe/grupo.json': {},
'arquivos/tictactoe/grupos_com_aluguel.json': [],
};

const ARQUIVOS_VAZIOS = ['database/data/docf.txt'];

// conteúdo/config que vem com o bot: não dá pra inventar
const OBRIGATORIOS = [
'config-bot/config.json',
'config-bot/nescessario.json',
'config-bot/logos/links_img.json',
'database/advices.json',
'database/questions.json',
'database/sotoy.json',
'database/tools.json',
'database/vab.json',
'database/data/media/forca/palavras.json',
'database/data/media/forca/frames.json',
];

let criados = 0;
for (const pasta of PASTAS) {
try { fs.mkdirSync(pasta, { recursive: true }); } catch {}
}
for (const [arquivo, padrao] of Object.entries(DADOS)) {
try {
if (fs.existsSync(arquivo) && fs.statSync(arquivo).size > 0) continue;
fs.mkdirSync(path.dirname(arquivo), { recursive: true });
fs.writeFileSync(arquivo, JSON.stringify(padrao, null, 2));
criados++;
} catch (e) {
console.error(`[ARQUIVOS] Não consegui criar ${arquivo}:`, e.message);
}
}
for (const arquivo of ARQUIVOS_VAZIOS) {
try { if (!fs.existsSync(arquivo)) { fs.writeFileSync(arquivo, ''); criados++; } } catch {}
}
if (criados) console.log(`[ARQUIVOS] ${criados} arquivo(s) de banco de dados criados vazios.`);

const faltando = OBRIGATORIOS.filter(a => !fs.existsSync(a));
if (faltando.length) {
console.error('\n❌ Estão faltando arquivos que vêm junto com o bot:\n' + faltando.map(a => '   - ' + a).join('\n') +
'\n\nExtraia o projeto COMPLETO (não só os arquivos alterados) e tente de novo.\n');
process.exit(1);
}

export default true;
