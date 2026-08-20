module.exports = {
name: 'consultar_vip',
aliases: ['consultarvip'],
category: 'geral',
description: 'Mostra a expiração do vip de quem usou o comando.',
async execute(ctx) {
const { reply, sender, vip, kiimorizinha, from, selo, ChannelContextNewsLetter } = ctx;
if (!JSON.stringify(vip).includes(sender)) return reply('Você não está incluso atualmente na lista de usuários vip(s)..');
const AB = vip.map(i => i.id).indexOf(sender);
const texto = `Usuário: @${vip[AB].id.split('@')[0]}\n• Expiração: ${vip[AB].infinito === false ? `*Seu vip irá expirar em ${vip[AB].dias} dia${vip[AB].dias > 1 ? 's' : ''}.*` : '*Não existe um dia de expiração do seu vip.*'}`;
await kiimorizinha.sendMessage(from, { text: texto.trim(), mentions: [sender], contextInfo: { ...ChannelContextNewsLetter } }, { quoted: selo });
},
};
