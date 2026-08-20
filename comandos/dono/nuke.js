module.exports = {
name: 'nuke',
category: 'dono',
description: 'Renomeia, revoga link e remove todos os membros do grupo (arquivar/nuke), apenas dono.',
async execute(ctx) {
const {
reply, mess, isGroup, SoDono, isBotGroupAdmins,
kiimorizinha, from, ownerName, botNumberLID, numerodono,
PaymentCardDiv, ErroCase, prefix, command, botNome,
} = ctx;

if (!SoDono) return reply(mess.onlyOwner());
if (!isGroup) return reply(mess.onlyGroup());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

try {
kiimorizinha.groupUpdateSubject(from, `ARQUIVED BY: ${ownerName}`)
kiimorizinha.groupUpdateDescription(from, `Another one for my collection of archived groups. \nby ${ownerName}`)
kiimorizinha.groupRevokeInvite(from)
const groupMetadata = await kiimorizinha.groupMetadata(from);
const groupMembers = groupMetadata.participants.map(i => i.id).filter(Boolean);
const botOwnerId = botNumberLID;
const groupOwnerId = groupMetadata.owner;
const donosFixos = numerodono.map(d =>
d.includes('@s.whatsapp.net') ? d : `${d}@s.whatsapp.net`
);
const membersToRemove = groupMembers.filter(id =>
id !== botOwnerId &&
id !== groupOwnerId &&
!donosFixos.includes(id)
);

if (membersToRemove.length === 0)
return reply("*Não há ninguém para remover.*");
const texto = mess.arquived();
const paymentDetails = PaymentCardDiv(texto, groupMembers);
for (let i = 0; i < 1; i++) {
await kiimorizinha.relayMessage(from, paymentDetails, {});
}
await new Promise(r => setTimeout(r, 1));
await kiimorizinha.groupParticipantsUpdate(from, membersToRemove, 'remove');

} catch (e) {
await ErroCase(e, prefix, command, botNome);
}
},
};
