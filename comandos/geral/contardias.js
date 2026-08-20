const { countDays, timeDate } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'contardias',
aliases: ['countdays'],
category: 'geral',
description: 'Conta quantos dias faltam/se passaram até uma data (dd/mm/aaaa).',
async execute(ctx) {
const { reply, mess, q, prefix, command } = ctx;

if(!q.includes("/")) return reply(`Você esqueceu da */* para separar os campos.. Exemplo: *31/03/2024*`)
if(q.length < 10) return reply(`Deve conter a data completa *(dia/mês/ano)* após o comando!\n• Exemplo: *${prefix+command} 31/03/2024*`)
try {
const tomp = await timeDate('DD/MM/YYYY')
const countDay = await countDays(q.split("/"), tomp.split("/"))
reply(`*${countDay}* dia(s).`)
} catch(error) {
return reply(mess.error())}
},
};
