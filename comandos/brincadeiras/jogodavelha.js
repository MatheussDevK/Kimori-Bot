const fs = require('fs');

module.exports = {
name: 'jogov',
aliases: ['jogodavelha'],
category: 'brincadeiras',
description: 'Desafia um membro marcado para uma partida de jogo da velha.',
async execute(ctx) {
const {
reply, mess, isGroup, isModobn, prefix, command, from, sender,
menc_jid, argss, joguinhodavelhajs, joguinhodavelhajs2,
setGame, normalizar, mentions,
} = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if (!menc_jid) return reply("Marque junto com o comando o @ do usuário que deseja desafiar..");
joguinhodavelhajs.push(sender);
fs.writeFileSync('./database/usuarios/joguinhodavelha.json', JSON.stringify(joguinhodavelhajs));
joguinhodavelhajs2.push(from);
fs.writeFileSync('./database/usuarios/joguinhodavelha2.json', JSON.stringify(joguinhodavelhajs2));
if (fs.existsSync(`./arquivos/tictactoe/db/${from}.json`)) {
const boardnow = setGame(`${from}`);
const jogadorX = normalizar(boardnow.X + '@lid');
const jogadorO = normalizar(boardnow.O + '@lid');
const matrix = boardnow._matrix;

const msg = `*『 🎮 』ᒍOᘜO ᗪᗩ ᐯᗴᒪᕼᗩ『 🕹 』*\n
💢 Já existe uma partida em andamento!\n
👥 Disputa atual:\n@${jogadorX.split('@')[0]} VS @${jogadorO.split('@')[0]}
\nAguardem o fim desta rodada antes de iniciar outra.`;
return await mentions(msg, [jogadorX, jogadorO], true);
}
if (argss.length === 1)
return reply(`Jogue com alguém, para iniciar a partida: ${prefix + command} @membro.`);
const boardnow = setGame(`${from}`);
boardnow.status = false;
boardnow.X = sender.replace("@lid", "");
boardnow.O = menc_jid.replace("@lid", "").replace("@", "");

fs.writeFileSync(`./arquivos/tictactoe/db/${from}.json`, JSON.stringify(boardnow, null, 2));
const jogadorX = normalizar(boardnow.X + '@lid');
const jogadorO = normalizar(boardnow.O + '@lid');

const mensagem = `*『 ⚠ 』ᗴՏᑭᗴᖇᗩᑎᗪO O OᑭOᑎᗴᑎTᗴ『 ⚠ 』* 
• *_「 @${jogadorX.split('@')[0]} 」 Está te convidando para jogar um jogo da velha【 👩🏻‍🦳】_*\n\n• *_『 @${jogadorO.split('@')[0]} 』 Use 『 S 』 pra aceitar 『 N 』 pra rejeitar._*\n
> Caso queira cancelar use o 『 ${prefix}rv』`;
await mentions(mensagem, [jogadorX, jogadorO], true);
},
};
