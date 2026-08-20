const { obeso } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'obesidade',
aliases: ['obeso'],
category: 'geral',
description: 'Calcula o IMC a partir de peso/altura.',
async execute(ctx) {
const { reply, q, prefix, command, info, replyWithReaction } = ctx;

if(!q.includes("/")) return reply(`Ex.: *${prefix+command} peso/altura*`)
const [peso, altura] = q.split("/");
const resultado = await obeso(peso, altura)
if (resultado <= 17 || resultado <= 18.4) {
await replyWithReaction(`• Seu índice de massa corporal é de: *${resultado}* -> Você está abaixo do peso.`, {react: {text: '😸', key: info.key}});
} else if (resultado <= 18.5 || resultado <= 24.9) {
await replyWithReaction(`• Seu índice de massa corporal é: *${resultado}* -> Você está no peso ideal.`, {react: {text: '👍', key: info.key}});
} else if (resultado <= 25 || resultado <= 29.9) {
await replyWithReaction(`• Seu índice de massa corporal é: *${resultado}* -> Você está com sobrepeso.`, {react: {text: '🫤', key: info.key}});
} else if (resultado <= 30 || resultado <= 39.9) {
await replyWithReaction(`• Seu índice de massa corporal é: *${resultado}* -> Em situção de Obesidade.`, {react: {text: '🤨', key: info.key}});
} else if (resultado > 40) {
await replyWithReaction(`• Seu índice de massa corporal é: *${resultado}* -> Obesidade mórbida!`, {react: {text: `😵`, key: info.key}});
}
},
};
