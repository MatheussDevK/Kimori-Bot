module.exports = {
name: 'meupn',
category: 'dono',
description: 'Mostra o pushname (nome de exibição) atual, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, info, pushname } = ctx;

if (!SoDono) return reply(mess.onlyOwner())

const pn = (
info?.pushName ||
pushname ||
'Sem Pushname'
)

reply(`${pn}`)
},
};
