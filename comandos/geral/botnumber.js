module.exports = {
name: 'botnumber',
category: 'geral',
description: 'Mostra o número normal (JID) do bot.',
async execute(ctx) {
const { reply, kiimorizinha } = ctx;
const botNumero = String(kiimorizinha.user.id).replace(/:.*?(?=@)/, '').replace(/@.*/, '').replace(/\D/g, '');
reply(`${botNumero}@s.whatsapp.net`);
},
};
