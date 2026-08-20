module.exports = {
name: 'recusar_convite',
category: 'dono',
description: 'Envia uma mensagem padrão recusando o convite de alguém, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, q, kiimorizinha, selo } = ctx;

if(!SoDono) return reply(mess.onlyOwner());
await kiimorizinha.sendMessage(`${q}@s.whatsapp.net`, {text: `Olá amigo(a), sinto muito dizer, mas seu convite foi recusado.`}, {quoted: selo});
},
};
