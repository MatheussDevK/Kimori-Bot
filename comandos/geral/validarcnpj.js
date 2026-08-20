const { fetchJson } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'validarcnpj',
category: 'geral',
description: 'Valida se um CNPJ é válido.',
async execute(ctx) {
const { reply, mess, q, nescessario } = ctx;

if(!q) return reply("Digite um CNPJ para realizar a verificação se é válido ou inválido!")
if(q.length < 14) return reply("Você digitou um CNPJ que não tem 14 dígitos, verifique se colocou pontuação, se estiver retire.")
try {
const data = await fetchJson(`https://api.invertexto.com/v1/validator?token=${nescessario.API_KEY_INVERTEXTO}&value=${q}`)
if(data.valid == true) return reply("Válido.")
if(data.valid == false) return reply("Inválido.")
} catch(error) {reply(mess.error())}
},
};
