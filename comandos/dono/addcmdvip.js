module.exports = {
name: 'addcmdvip',
category: 'dono',
description: 'Adiciona um comando à lista de comandos exclusivos de VIP.',
async execute(ctx) {
const { reply, mess, SoDono, args, isCmdVip, nescessario, setNes } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
const tp = args.join(" ");
if (tp.includes("addcmdvip addcmdvip") || tp.includes("addcmdvipaddcmdvip")) return reply(`Tá louco maluco? Não tem como adicionar o mesmo comando.`);
if (isCmdVip.includes(args[0])) return reply('Este comando já está incluso na lista de comandos VIP, verifique.');
isCmdVip.push(args[0]);
setNes(nescessario);
reply(`O comando *${args[0]}* foi adicionado na lista de comandos VIP.`);
},
};
