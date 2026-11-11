import fs from 'node:fs';

const TEMPO_LIMITE_MS = 5 * 60 * 1000;

export default {
name: 'jogov',
aliases: ['jogodavelha'],
category: 'brincadeiras',
description: 'Desafia um membro marcado para uma partida de jogo da velha.',
async execute(ctx) {
const {
reply, mess, isGroup, isModobn, prefix, command, from, sender,
menc_jid, joguinhodavelhajs, joguinhodavelhajs2,
setGame, mentions, encerrarJogoVelha, writeJSON,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isModobn) return reply(mess.onlyGroupFun(prefix));

const arquivo = `./arquivos/tictactoe/db/${from}.json`;
const num = (v) => String(v || '').split('@')[0];
const jid = (v) => { const s = String(v || ''); return s.includes('@') ? s : `${s}@lid`; };

if (fs.existsSync(arquivo)) {
const boardnow = setGame(`${from}`);
const msg = `*『 🎮 』ᒍOᘜO ᗪᗩ ᐯᗴᒪᕼᗩ『 🕹 』*\n
💢 Já existe uma partida em andamento!\n
👥 Disputa atual:\n@${num(boardnow.X)} VS @${num(boardnow.O)}
\nAguardem o fim desta rodada antes de iniciar outra.`;
return await mentions(msg, [jid(boardnow.X), jid(boardnow.O)]);
}

if (!menc_jid) return reply(`Marque junto com o comando o @ do usuário que deseja desafiar. Ex: ${prefix + command} @membro`);
if (num(menc_jid) === num(sender)) return reply('Você não pode desafiar a si mesmo.');

const boardnow = setGame(`${from}`);
boardnow.status = false;
// guarda o JID completo (antes cortava o "@lid" e quebrava para quem usa @s.whatsapp.net)
boardnow.X = sender;
boardnow.O = menc_jid;
boardnow.criadoEm = Date.now();
fs.writeFileSync(arquivo, JSON.stringify(boardnow, null, 2));

if (!joguinhodavelhajs.includes(sender)) joguinhodavelhajs.push(sender);
if (!joguinhodavelhajs2.includes(from)) joguinhodavelhajs2.push(from);
writeJSON('./database/usuarios/joguinhodavelha.json', joguinhodavelhajs, false);
writeJSON('./database/usuarios/joguinhodavelha2.json', joguinhodavelhajs2, false);

const mensagem = `*『 ⚠ 』ᗴՏᑭᗴᖇᗩᑎᗪO O OᑭOᑎᗴᑎTᗴ『 ⚠ 』* 
• *_「 @${num(sender)} 」 Está te convidando para jogar um jogo da velha【 👩🏻‍🦳】_*\n\n• *_『 @${num(menc_jid)} 』 Use 『 S 』 pra aceitar 『 N 』 pra rejeitar._*\n
> Caso queira cancelar use o 『 ${prefix}rv』`;
await mentions(mensagem, [sender, menc_jid]);

// cancela esta partida (e só ela) se o desafiado não aceitar em 5 minutos
const criadoEm = boardnow.criadoEm;
setTimeout(() => {
try {
if (!fs.existsSync(arquivo)) return;
const atual = JSON.parse(fs.readFileSync(arquivo));
if (atual.criadoEm !== criadoEm || atual.status) return;
encerrarJogoVelha(atual);
reply(`O *jogo da velha* foi cancelado porque o desafiado não aceitou no prazo de 5 minutos.`);
} catch (e) { console.error('[JOGO DA VELHA timeout]', e); }
}, TEMPO_LIMITE_MS);
},
};
