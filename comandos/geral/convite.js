module.exports = {
name: 'convite',
category: 'geral',
description: 'Envia um convite pro dono, pedindo pra ele adicionar o bot num grupo via link.',
async execute(ctx) {
const { reply, mess, budy, args, kiimorizinha, nmrdn, sender, prefix, selo } = ctx;

if(!budy.includes("chat.whatsapp.com")) return reply("Cadê o link do grupo que você deseja que eu entre?")
const cnvt = args.join(" ")
reply(`O convite para o bot entrar em seu grupo, foi enviado, espere o dono aceitar..`)
await kiimorizinha.sendMessage(nmrdn, {text: mess.groupInvitation(sender, cnvt, prefix)}, {quoted: selo})
},
};
