module.exports = {
name: 'anotacao',
aliases: ['anotacoes', 'nota', 'notas'],
category: 'geral',
description: 'Puxa uma anotação salva pelo título (anotacao/nota), ou lista todas (anotacoes/notas).',
async execute(ctx) {
const { reply, isGroup, command, q, anotar, from, groupName, mentions } = ctx;

if(!isGroup) return reply(`Só em grupo pode utilizar este comando.`)
if(command == "anotacao" || command == "nota") {
if(!q) return reply("Digite o título da anotação que deseja puxar..")
if(!JSON.stringify(anotar).includes(from)) return reply("Este grupo não tem nenhuma anotação...")
const i2 = anotar.map(i => i.grupo).indexOf(from)
if(!JSON.stringify(anotar[i2].puxar).includes(q)) return reply("Não contém nenhuma anotação com este título.")
const i3 = anotar[i2].puxar.map(i => i.nota).indexOf(q)
mentions(`〈 ${anotar[i2].puxar[i3].anotacao} 〉`)
} else {
const i2 = anotar.map(i => i.grupo).indexOf(from)
if(anotar[i2].puxar.length == 0) return reply("Este grupo não tem nenhuma anotação...")
const antr = anotar[i2].puxar
let txtin = `Aqui está todas as anotações registradas em minha database do grupo: *[ ${groupName} ]*\n`
for (let i = 0; i < antr.length; i++) {
txtin += `\n↝ Anotação: ⟮ ${anotar[i2].puxar[i].nota} ⟯ - 〈 ${anotar[i2].puxar[i].anotacao} 〉\n`}
txtin += ""
reply(txtin)}
},
};
