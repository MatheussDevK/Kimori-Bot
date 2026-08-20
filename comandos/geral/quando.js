module.exports = {
name: 'quando',
category: 'geral',
description: 'Responde de forma aleatória e engraçada a uma pergunta de "quando".',
async execute(ctx) {
const { reply, args, body } = ctx;

if (args.length < 1) return reply('Digite a pergunta!')
const meupirul = ['Hoje', 'Amanhã', 'Nunca', 'dia', 'semana', 'mês', 'ano']
const meupirul2 = ['dias', 'semanas', 'meses', 'anos']
const randomm = meupirul[Math.floor(Math.random() * meupirul.length)]
const random2 = `${Math.floor(Math.random() * 11) + 1}`
let texto;
if (randomm == 'Hoje' || randomm == 'Amanhã' || randomm == 'Nunca') {
texto = `Pergunta: ${body.slice(1)}\nResposta: ${randomm}`
} else if (random2 == 1) {
texto = `Pergunta: ${body.slice(1)}\nResposta:1 ${randomm}`
} else {
const random3 = meupirul2[Math.floor(Math.random() * meupirul2.length)]
texto = `Pergunta: ${body.slice(1)}\nResposta: ${random2} ${random3}`
}
reply(texto)
},
};
