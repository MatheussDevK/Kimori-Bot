module.exports = {
name: 'rmadv',
category: 'admin',
description: 'Remove uma advertência do usuário marcado no grupo.',
async execute(ctx) {
const { reply, mess, isGroup, isGroupAdmins, marc_tds, dataGp, setGp } = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!marc_tds) return reply("Você esqueceu de mencionar o alvo após o comando.")
const adv = dataGp[0].advertir.map(i => i).indexOf(marc_tds)
if(adv < 0) return reply("Este usuário não contém nenhuma advertência no grupo.")
dataGp[0].advertir.splice(adv, 1)
setGp(dataGp)
reply("A advertência do usuário neste grupo foi retirada com sucesso!")
},
};
