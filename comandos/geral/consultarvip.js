export default {
name: 'consultar_vip',
aliases: ['consultarvip'],
category: 'geral',
description: 'Mostra a expiração do vip de quem usou o comando.',
async execute(ctx) {
const { reply, sender, vip, kiimorizinha, from, selo, ChannelContextNewsLetter } = ctx;
// procura pelo JID ou pelo número (antes o includes passava e o indexOf dava -1 -> erro)
const meuNum = String(sender).split('@')[0];
const AB = vip.findIndex(i => i?.id === sender || String(i?.id || '').split('@')[0] === meuNum);
if (AB === -1) return reply('Você não está incluso atualmente na lista de usuários vip(s)..');
const texto = `Usuário: @${vip[AB].id.split('@')[0]}\n• Expiração: ${vip[AB].infinito === false ? `*Seu vip irá expirar em ${vip[AB].dias} dia${vip[AB].dias > 1 ? 's' : ''}.*` : '*Não existe um dia de expiração do seu vip.*'}`;
await kiimorizinha.sendMessage(from, { text: texto.trim(), mentions: [vip[AB].id], contextInfo: { ...ChannelContextNewsLetter } }, { quoted: selo });
},
};
