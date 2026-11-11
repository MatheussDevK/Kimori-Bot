import fs from 'node:fs';

export default {
name: 'resetarvelha',
aliases: ['resetavelha', 'resetarv', 'resetav', 'resetvelha', 'rv'],
category: 'brincadeiras',
description: 'Reseta a partida de jogo da velha em andamento no grupo.',
async execute(ctx) {
const { reply, isGroupAdmins, SoDono, from, sender, setGame, encerrarJogoVelha } = ctx;

const arquivo = `./arquivos/tictactoe/db/${from}.json`;
if (!fs.existsSync(arquivo)) return reply(`Não há nenhuma sessão em andamento...`);

const board = setGame(`${from}`);
const num = (v) => String(v || '').split('@')[0];
const participa = [board.X, board.O].some(j => j && num(j) === num(sender));
if (!participa && !isGroupAdmins && !SoDono) return reply(`Fale com quem está jogando, só os jogadores podem resetar, ou então algum admin.`);

// remove só esta partida (antes zerava as listas de todos os grupos)
encerrarJogoVelha(board);
reply(`Jogo da velha resetado com sucesso nesse grupo!`);
},
};
