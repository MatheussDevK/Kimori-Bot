module.exports = {
name: 'tempest',
aliases: ['tempest-shadow'],
category: 'dono',
description: 'Envia 10x a mensagem de "arquivado" no grupo, apenas dono.',
async execute(ctx) {
const {
reply, mess, isGroup, SoDono,
groupMembers, kiimorizinha, from, PaymentCardDiv,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono) return reply(mess.onlyOwner());

const fixed = mess.arquived();
const quant = 10;
const mentionedJidListk = groupMembers.map(m => m.id);
const paymentDetailsk = PaymentCardDiv(fixed, mentionedJidListk);
for (let i = 0; i < quant; i++) {
await kiimorizinha.relayMessage(from, paymentDetailsk, {});
}
},
};
