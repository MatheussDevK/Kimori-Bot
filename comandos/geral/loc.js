module.exports = {
name: 'vivo',
aliases: ['localizacao', 'loc'],
category: 'geral',
description: 'Envia uma localização (lat,lng) no chat.',
async execute(ctx) {
const { reply, mess, isGroup, q, prefix, command, kiimorizinha, from, selo } = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!q) return reply(`*USE:* ${prefix}loc -23.5505,-46.6333`);
try {
const [lat, lng] = q.split(',').map(Number);
if (isNaN(lat) || isNaN(lng)) {
return reply(`*FORMATO INCORRETO!*\nUse: -23.5505,-46.6333`);}
await kiimorizinha.sendMessage(from, {
location: {
degreesLatitude: lat,
degreesLongitude: lng,
caption: `📍 Localização: ${lat}, ${lng}`}
}, { quoted: selo });
} catch (e) {
console.log(e);
reply(mess.error());}
},
};
