const { fetchJson, capitalizeFirstLetter } = require('../../arquivos/funcoes/exports.js');

module.exports = {
name: 'dinextenso',
category: 'geral',
description: 'Converte um valor numérico (com centavos) para números por extenso.',
async execute(ctx) {
const { reply, mess, q, prefix, nescessario } = ctx;

if(!q.includes(".")) return reply(`❌️ - Coloque apenas números para realizar a transformação de digitos numérico para números em extenso.\nPor exemplo: *${prefix}dinextenso 500.00 ou 756.50*, tudo que você colocar os valores deve colocar um ponto(.) para converter os valores.`)
try {
const data = await fetchJson(`https://api.invertexto.com/v1/number-to-words?token=${nescessario.API_KEY_INVERTEXTO}&number=${q}&language=pt&currency=BRL`);
reply(`*${q}* : ${capitalizeFirstLetter(data.text)}`);
} catch(error) {
reply(mess.error())
}
},
};
