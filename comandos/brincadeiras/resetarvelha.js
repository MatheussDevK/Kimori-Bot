const fs = require('fs');

module.exports = {
name: 'resetarvelha',
aliases: ['resetavelha', 'resetarv', 'resetav', 'resetvelha', 'rv'],
category: 'brincadeiras',
description: 'Reseta a partida de jogo da velha em andamento no grupo.',
async execute(ctx) {
const {
reply, isJoguin, isGroupAdmins, from,
joguinhodavelhajs, joguinhodavelhajs2, DLT_FL,
} = ctx;

if(!isJoguin && !isGroupAdmins) return reply(`Fale com quem iniciou o jogo, só ele pode resetar, ou então algum admin.`)
if(fs.existsSync("./arquivos/tictactoe/db/" + from + ".json")) {
DLT_FL("./arquivos/tictactoe/db/" + from + ".json");
reply(`Jogo da velha resetado com sucesso nesse grupo!`);
joguinhodavelhajs.splice([])
fs.writeFileSync('./database/usuarios/joguinhodavelha.json', JSON.stringify(joguinhodavelhajs))
joguinhodavelhajs2.splice([])
fs.writeFileSync('./database/usuarios/joguinhodavelha2.json', JSON.stringify(joguinhodavelhajs2))
} else {
reply(`Não a nenhuma sessão em andamento...`);
}
},
};
