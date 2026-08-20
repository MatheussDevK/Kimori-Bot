module.exports = {
name: 'ddd',
category: 'geral',
description: 'Lista as cidades atendidas por um DDD.',
async execute(ctx) {
const { reply, args, prefix, command, kiimorizinha, from, selo, ChannelContextNewsLetter, axios } = ctx;
const ddd = (args[0] || '').replace(/\D/g, '');
if (!ddd) return reply(`Use ${prefix + command} 81`);
try {
const ddds = await axios.get(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);
let dddlist = `Lista de Cidades de ${ddds.data.state} com o DDD ${ddd}:\n\n`;
for (let i = 0; i < ddds.data.cities.length; i++) dddlist += `${i + 1} ⪧ *${ddds.data.cities[i]}*\n`;
await kiimorizinha.sendMessage(from, { text: dddlist, contextInfo: { ...ChannelContextNewsLetter } }, { quoted: selo });
} catch (e) {
reply('DDD inválido ou não encontrado.');
}
},
};
