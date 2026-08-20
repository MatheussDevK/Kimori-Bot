module.exports = {
name: 'divmsg',
aliases: ['div'],
category: 'dono',
description: 'Envia uma mensagem repetidamente no grupo (spam de card), apenas dono.',
async execute(ctx) {
const {
reply, mess, isGroup, SoDono, q, prefix, command,
groupMembers, kiimorizinha, from, PaymentCardDiv,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono) return reply(mess.onlyOwner());
if (!q) return reply(`Está faltando o texto e quantidade.\nExemplo: ${prefix + command} OIIIII | 10`);

const [texto, quantidade] = q.split(' | ');
const quantidadeEnvios = parseInt(quantidade);

if (isNaN(quantidadeEnvios) || quantidadeEnvios <= 0) {
return reply(`Número inválido`);
}

const mentionedJidList = groupMembers.map(m => m.id);
const paymentDetails = PaymentCardDiv(texto, mentionedJidList);

for (let i = 0; i < quantidadeEnvios; i++) {
await kiimorizinha.relayMessage(from, paymentDetails, {});
}
},
};
