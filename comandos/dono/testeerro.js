export default {
name: 'testeerro',
category: 'dono',
description: 'Força um erro proposital para testar o sistema de tratamento de erros.',
async execute(ctx) {
const { reply, SoDono, prefix, command, botNome, ErroCase, mess } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
try {
// erro proposital (antes usava uma variável inexistente, que aparecia como bug no lint)
throw new Error('Erro de teste disparado pelo comando testeerro');
} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
