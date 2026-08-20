module.exports = {
name: 'listatm',
category: 'dono',
description: 'Lista os grupos/usuários registrados para receber transmissões.',
async execute(ctx) {
const { reply, mess, SoDono, readJSON, prefix } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
const rgp = readJSON('./database/func/tmgroup.json', []);
if (rgp.length === 0) return reply(`Não contém nenhum registro de transmissão, utilize ${prefix}rgtm no grupo que deseja que ele receba as transmissões do bot..`);
let bl = '';
for (let i = 0; i < rgp.length; i++) {
bl += `( ${i + 1} ) - ID: ${rgp[i].id}\n• Nome do Usuário(a) ou Grupo: ${rgp[i].infonome}\n-\n`;
}
reply(bl);
},
};
