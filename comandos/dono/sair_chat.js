module.exports = {
name: 'sair_chat',
aliases: ['sairdogp'],
category: 'dono',
description: 'Faz o bot sair de um grupo específico pelo número da lista do "listagp".',
async execute(ctx) {
const { reply, mess, SoDono, q, prefix, kiimorizinha } = ctx;

if (!SoDono) {
return reply(mess.onlyOwner());
}
if (!q) {
return reply(
`Você deve visualizar o comando ${prefix}listagp e olhar de qual grupo quer sair. Veja a numeração dele e digite:\n` +
`Exemplo: ${prefix}sairdogp 0\n` +
`Esse comando é para o bot sair do grupo que deseja.`
);
}

try {
const getGroups = await kiimorizinha.groupFetchAllParticipating();
const groups = Object.entries(getGroups).map(entry => entry[1]);
if (isNaN(q) || q < 0 || q >= groups.length) {
return reply(`Número inválido. Use o comando ${prefix}listagp para conferir as numerações dos grupos.`);
}
const selectedGroup = groups[q];
await kiimorizinha.sendMessage(selectedGroup.id, { text: "Irei sair do grupo, por ordem do meu dono, adeus..." });
setTimeout(async () => {
try {
await kiimorizinha.groupLeave(selectedGroup.id);
reply("Pronto meu dono, saí do grupo que você queria. Em caso de dúvidas, use o comando listagp para verificar.");
} catch (leaveError) {
reply(`Erro ao tentar sair do grupo: ${String(leaveError)}`);
}
}, 5000);
} catch (erro) {
reply(`Erro ao processar a solicitação: ${String(erro)}`);
}
},
};
