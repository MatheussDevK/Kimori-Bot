module.exports = {
name: 'recusar',
aliases: ['negar', '❌'],
category: 'admin',
description: 'Recusa todas as solicitações de entrada pendentes no grupo.',
async execute(ctx) {
const {
reply, isGroup, isGroupAdmins, isBotGroupAdmins, kiimorizinha, from, mess,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

const pendentes = await kiimorizinha.groupRequestParticipantsList(from);
const total = pendentes?.length || 0;
if (total === 0) {
return reply('*Não há nenhuma solicitação pendente para recusar!*');
}

for (const p of pendentes) {
await kiimorizinha.groupRequestParticipantsUpdate(from, [p.jid], 'reject');
}

return reply(`*${total} Solicitações foram recusadas com sucesso!*`);
},
};
