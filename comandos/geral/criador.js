module.exports = {
name: 'criador',
category: 'geral',
description: 'Mostra o nome e o número de contato do criador do bot.',
async execute(ctx) {
const { reagir, from, kiimorizinha, selo } = ctx;
await reagir(from, `🥹`);
await reagir(from, `😘`);
await reagir(from, `😍`);
await reagir(from, `🤩`);
await kiimorizinha.sendMessage(from, { text: `☺️ O Nome do meu criador é </Matheus>, é aqui está o número dele: +55 38 9116-4328 ✨` }, { quoted: selo });
},
};
