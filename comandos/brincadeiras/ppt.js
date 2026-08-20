module.exports = {
name: 'ppt',
category: 'brincadeiras',
description: 'Joga pedra, papel ou tesoura contra o bot.',
async execute(ctx) {
const { reply, args, prefix, botNome: NomeDoBot } = ctx;

if(args.length < 1) return reply(`Você deve digitar ${prefix}ppt pedra, ${prefix}ppt papel ou ${prefix}ppt tesoura`);
const ppt = ["pedra", "papel", "tesoura"];
const ppy = ppt[Math.floor(Math.random() * ppt.length)];
const pptb = ppy
let vit
if((pptb == "pedra" && args == "papel") ||
(pptb == "papel" && args == "tesoura") ||
(pptb == "tesoura" && args == "pedra")) {
vit = "vitoria"
} else if((pptb == "pedra" && args == "tesoura") ||
(pptb == "papel" && args == "pedra") ||
(pptb == "tesoura" && args == "papel")) {
vit = "derrota"
} else if((pptb == "pedra" && args == "pedra") ||
(pptb == "papel" && args == "papel") ||
(pptb == "tesoura" && args == "tesoura")) {
vit = "empate"
} else if(vit = "undefined") {
return reply(`Você deve digitar ${prefix}ppt pedra, ${prefix}ppt papel ou ${prefix}ppt tesoura`)
}
let tes
if(vit == "vitoria") {tes = "Vitória do jogador"}
if(vit == "derrota") {tes = "A vitória é do BOT"}
if(vit == "empate") {tes = "O jogo terminou em empate"}
reply(`*${NomeDoBot}* jogou ${pptb}, o jogador jogou: ${args} -> *${tes}*`);
},
};
