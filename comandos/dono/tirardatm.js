module.exports = {
name: 'tirardatm',
category: 'dono',
description: 'Remove um grupo/usuário da lista de transmissão.',
async execute(ctx) {
const { reply, mess, SoDono, readJSON, writeJSON, from, q } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
const rgp = readJSON('./database/func/tmgroup.json', []);
if (!JSON.stringify(rgp).includes(from)) return reply('Este grupo/usuário não está registrado para ser tirado da lista de transmissão');
const alvo = q.trim().length > 4 ? q.trim() : from;
const ustm = rgp.map(i => i.id).indexOf(alvo);
rgp.splice(ustm, 1);
writeJSON('./database/func/tmgroup.json', rgp);
reply('Grupo/Usuário tirado da lista de transmissão com sucesso!');
},
};
