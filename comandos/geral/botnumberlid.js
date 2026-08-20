module.exports = {
name: 'botnumberlid',
category: 'geral',
description: 'Mostra o LID (identificador alternativo) do bot no grupo atual.',
async execute(ctx) {
const { reply, kiimorizinha, groupMetadata } = ctx;
const botNumero = String(kiimorizinha.user.id).replace(/:.*?(?=@)/, '').replace(/@.*/, '').replace(/\D/g, '');
const botParticipant = (groupMetadata?.participants || []).find(p => {
const byPhone = (p?.phoneNumber || '').replace(/@.*/, '').replace(/\D/g, '');
const byId = (p?.id || '').replace(/:.*?(?=@)/, '').replace(/@.*/, '').replace(/\D/g, '');
return byPhone === botNumero || byId === botNumero;
});
reply(botParticipant?.id || null);
},
};
