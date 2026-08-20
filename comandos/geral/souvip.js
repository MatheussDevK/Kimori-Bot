module.exports = {
name: 'souvip',
category: 'geral',
description: 'Mostra seu JID e status de VIP.',
async execute(ctx) {
const { reply, info, isChVip } = ctx;
const jid = (
info?.key?.participantPn ||
info?.key?.senderPn ||
info?.participantPn ||
'Sem JID'
);
reply(`${jid}\nVIP: ${isChVip}`);
},
};
