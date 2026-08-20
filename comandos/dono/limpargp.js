const fs = require('fs');

module.exports = {
name: 'limpargp',
aliases: ['limpargp-cnt'],
category: 'dono',
description: 'Remove do contador de mensagens quem não está mais no grupo, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, isGroup, from, groupMembers, countMessage, limparContadorUsuariosFora } = ctx;

if (!SoDono) return reply(mess.onlyOwner())
if (!isGroup) return reply(mess.onlyGroup())

const removidos = limparContadorUsuariosFora(from, groupMembers)

fs.writeFileSync(
'./database/countmsg.json',
JSON.stringify(countMessage, null, 2)
)

reply(
`*CONTADOR ATUALIZADO ✅*\n\n` +
`Usuários que não estão mais no grupo removidos: ${removidos}.`
)
},
};
