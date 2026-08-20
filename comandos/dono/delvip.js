const { writeJSON } = require('../../arquivos/funcoes/database.js');

module.exports = {
name: 'delvip',
category: 'dono',
description: 'Remove um usuário da lista de VIP.',
async execute(ctx) {
const { reply, mess, SoDono, marc_tds, vip, kiimorizinha, from, selo } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
if (!marc_tds) return reply("*💫 Mencione a mensagem ou use @ do usuário para remover da lista do VIP.*");
const usur = marc_tds;
const idx = vip.map(i => i.id).indexOf(usur);
if (idx < 0) return reply("Este número não está incluso atualmente na lista de usuários VIP.");
vip.splice(idx, 1);
writeJSON('./database/usuarios/vip.json', vip);
await kiimorizinha.sendMessage(from, { text: `*🗑️ @${usur.split("@")[0]} Foi removido da lista de usuários VIP's com sucesso!*`, mentions: [usur] }, { quoted: selo });
},
};
