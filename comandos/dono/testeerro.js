module.exports = {
name: 'testeerro',
category: 'dono',
description: 'Força um erro proposital para testar o sistema de tratamento de erros.',
async execute(ctx) {
const { reply, SoDono, prefix, command, botNome, ErroCase, mess } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
try {
reply(botNumerLID);
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
