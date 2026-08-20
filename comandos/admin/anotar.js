const fs = require('fs');

module.exports = {
name: 'anotar',
aliases: ['tirar_nota', 'rmnota'],
category: 'admin',
description: 'Cria (anotar) ou remove (tirar_nota/rmnota) uma anotação salva no grupo.',
async execute(ctx) {
const { reply, isGroup, isGroupAdmins, command, q, prefix, anotar, from } = ctx;

if(!isGroup) return reply(`Só em grupo pode utilizar este comando.`)
if(!isGroupAdmins) return reply(`Só adm pode utilizar este tipo de comando.`)
if(command == "anotar") {
const [q5, q10] = q.trim().split("|")
if(!q5 || !q10 || !q.includes("|")) return reply(`Digite o título da anotação e o texto que deseja anotar..\nExemplo: ${prefix}anotar Cachorro|Cachorros são bom pra comer na Venezuela...`)
let i2
if(JSON.stringify(anotar).includes(from)) {
i2 = anotar.map(i => i.grupo).indexOf(from)
if(JSON.stringify(anotar[i2].puxar).includes(q5)) {
const i3 = anotar[i2].puxar.map(i => i.nota).indexOf(q5)
if(anotar[i2].puxar[i3].nota == q5) return reply(`Esta anotação já está inclusa, utilize outro título.. Ou você pode tirar com\n${prefix}tirar_nota ${q5}`)
}
}
if(!JSON.stringify(anotar).includes(from)) {
anotar.push({grupo: from, puxar: [{nota: q5, anotacao: q10}]})
fs.writeFileSync("./database/func/anotar.json", JSON.stringify(anotar))
reply("Anotação registrada com sucesso...")
} else {
anotar[i2].puxar.push({nota: q5, anotacao: q10})
fs.writeFileSync("./database/func/anotar.json", JSON.stringify(anotar))
reply("Anotação registrada com sucesso...")
}
} else {
if(!q) return reply("Digite qual anotação deseja tirar pelo título..")
let i2, i3
if(JSON.stringify(anotar).includes(from)) {
i2 = anotar.map(i => i.grupo).indexOf(from)
if(JSON.stringify(anotar[i2].puxar).includes(q)) {
i3 = anotar[i2].puxar.map(i => i.nota).indexOf(q)
}
}
if(0 > anotar[i2].puxar.map(i => i.nota).indexOf(q)) return reply("Esta nota não está inclusa, verifique com atenção...")
anotar[i2].puxar.splice(i3, 1)
fs.writeFileSync("./database/func/anotar.json", JSON.stringify(anotar))
reply(`Anotação ${q} tirada com sucesso...`)
}
},
};
