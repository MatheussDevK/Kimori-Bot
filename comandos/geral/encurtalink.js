module.exports = {
name: 'encurtalink',
aliases: ['tinyurl'],
category: 'geral',
description: 'Encurta um link usando o TinyURL.',
async execute(ctx) {
const { reply, mess, args, q, prefix, command, axios } = ctx;

if(args.length < 1) return reply(`❌️ *Forma incorreta, use está como exemplo:* ${prefix + command} https://instagram.com/sla.wpp`)
try {
const anu = await axios.get(`https://tinyurl.com/api-create.php?url=${q}`)
reply(`*Link encurtado com sucesso, aqui está:* ${anu.data}`)
} catch (error) {
reply(mess.error())
}
},
};
