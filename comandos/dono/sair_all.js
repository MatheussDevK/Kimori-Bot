module.exports = {
name: 'sair_all',
category: 'dono',
description: 'Faz o bot sair de todos os grupos em que está, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, info, kiimorizinha } = ctx;

if (!SoDono && !info.key.fromMe) return reply(mess.onlyOwner())
try {
const grupos = await kiimorizinha.groupFetchAllParticipating();
for (let idGrupo in grupos) {
await kiimorizinha.groupLeave(grupos[idGrupo].id);
}
reply("O bot saiu de todos os grupos com sucesso.");
} catch (erro) {
reply("Erro ao tentar sair dos grupos: " + String(erro));
}
},
};
