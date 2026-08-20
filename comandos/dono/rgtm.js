module.exports = {
name: 'rgtm',
category: 'dono',
description: 'Registra o grupo/usuário atual para receber transmissões.',
async execute(ctx) {
const { reply, mess, SoDono, readJSON, writeJSON, from, isGroup, groupName, pushname } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
const rgp = readJSON('./database/func/tmgroup.json', []);
if (JSON.stringify(rgp).includes(from)) return reply('Este grupo/usuário já está registrado na lista de transmissão');
rgp.push({ id: from, infonome: `${isGroup ? groupName : pushname}` });
writeJSON('./database/func/tmgroup.json', rgp);
reply('Registrado com sucesso, quando for realizada as transmissões, esse grupo/usuário estará na lista.');
},
};
