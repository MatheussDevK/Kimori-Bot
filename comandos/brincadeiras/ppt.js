export default {
name: 'ppt',
category: 'brincadeiras',
description: 'Joga pedra, papel ou tesoura contra o bot.',
async execute(ctx) {
const { reply, args, prefix, botNome: NomeDoBot } = ctx;

const ajuda = `Você deve digitar ${prefix}ppt pedra, ${prefix}ppt papel ou ${prefix}ppt tesoura`;
const ppt = ["pedra", "papel", "tesoura"];
// compara a string da jogada (antes comparava o array args inteiro com texto)
const jogador = String(args[0] || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
if (!ppt.includes(jogador)) return reply(ajuda);

const bot = ppt[Math.floor(Math.random() * ppt.length)];
const ganhaDe = { pedra: 'tesoura', papel: 'pedra', tesoura: 'papel' };

let tes;
if (jogador === bot) tes = "O jogo terminou em empate";
else if (ganhaDe[jogador] === bot) tes = "Vitória do jogador";
else tes = "A vitória é do BOT";

reply(`*${NomeDoBot}* jogou ${bot}, o jogador jogou: ${jogador} -> *${tes}*`);
},
};
