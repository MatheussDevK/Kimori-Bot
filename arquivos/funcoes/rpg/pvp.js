import { MOVES, statsDoJogador, calcularGolpe } from './combate.js';

const CUSTO_ESTAMINA_DUELO = 15;
const DESAFIO_VALIDADE_MIN = 5;
const TURNOS_MAX = 40;

// Sorteia um golpe pro turno automático do duelo — sem "V" a menos que o
// jogador já tenha despertado a transformação.
function sortearMove(player) {
const chaves = ['C', 'X', 'F', 'O'];
if (player.transformacaoDesbloqueada) chaves.push('V');
const escolhida = chaves[Math.floor(Math.random() * chaves.length)];
return { chave: escolhida, move: MOVES[escolhida] };
}

// Recalcula os stats de um jogador levando em conta o HP atual da
// simulação (importante pra raças como Humano, que ficam mais fortes
// perto da morte).
function statsComHp(player, hpAtual) {
return statsDoJogador({ ...player, combate: { hpJogador: hpAtual } });
}

// Simula um duelo inteiro, turno a turno, até alguém morrer ou bater o
// limite de turnos (nesse caso, ganha quem estiver com mais % de vida).
// Retorna um resumo com vencedor/perdedor e os HPs finais — não devolve
// o log completo pra não virar uma mensagem gigante no WhatsApp.
function simularDuelo(playerA, playerB) {
const hpMaxA = Math.round(statsDoJogador(playerA).hpMax);
const hpMaxB = Math.round(statsDoJogador(playerB).hpMax);
let hpA = hpMaxA;
let hpB = hpMaxB;

let golpesA = 0;
let golpesB = 0;
let turno = 0;

while (hpA > 0 && hpB > 0 && turno < TURNOS_MAX) {
turno += 1;

// A ataca B
const statsA = statsComHp(playerA, hpA);
const statsB = statsComHp(playerB, hpB);
const { move } = sortearMove(playerA);
const golpe = calcularGolpe(statsA, statsB, move);
if (golpe.dano > 0) golpesA += 1;
hpB = Math.max(0, hpB - golpe.dano);
if (hpB <= 0) break;

// B revida
const statsA2 = statsComHp(playerA, hpA);
const statsB2 = statsComHp(playerB, hpB);
const { move: moveB } = sortearMove(playerB);
const golpeB = calcularGolpe(statsB2, statsA2, moveB);
if (golpeB.dano > 0) golpesB += 1;
hpA = Math.max(0, hpA - golpeB.dano);
}

let vencedorKey;
if (hpA <= 0 && hpB <= 0) vencedorKey = golpesA >= golpesB ? 'A' : 'B';
else if (hpA <= 0) vencedorKey = 'B';
else if (hpB <= 0) vencedorKey = 'A';
else vencedorKey = (hpA / hpMaxA) >= (hpB / hpMaxB) ? 'A' : 'B';

return {
vencedorKey,
turnos: turno,
hpA, hpMaxA, hpB, hpMaxB,
};
}

export default {
CUSTO_ESTAMINA_DUELO,
DESAFIO_VALIDADE_MIN,
simularDuelo,
};

export { CUSTO_ESTAMINA_DUELO, DESAFIO_VALIDADE_MIN, simularDuelo };
