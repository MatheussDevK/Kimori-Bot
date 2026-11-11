export default {
name: 'convite',
category: 'geral',
description: 'Envia um convite pro dono, pedindo pra ele adicionar o bot num grupo via link.',
async execute(ctx) {
const { reply, mess, budy, args, kiimorizinha, nmrdn, nmrdnlid, sender, prefix, selo } = ctx;

if(!budy.includes("chat.whatsapp.com")) return reply("Cadê o link do grupo que você deseja que eu entre?")
const cnvt = args.join(" ")
reply(`O convite para o bot entrar em seu grupo, foi enviado, espere o dono aceitar..`)
// antes mandava para "nmrdn" (só os dígitos, não é um JID) e o dono nunca recebia
const donoJid = nmrdnlid || (nmrdn ? `${nmrdn}@s.whatsapp.net` : null)
if (!donoJid) return reply('O número do dono não está configurado no config.json.')
await kiimorizinha.sendMessage(donoJid, {text: mess.groupInvitation(sender, cnvt, prefix), mentions: [sender]})
},
};
