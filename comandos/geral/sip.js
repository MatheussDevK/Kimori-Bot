module.exports = {
name: 'sip',
aliases: ['ip'],
category: 'geral',
description: 'Consulta geolocalização aproximada de um IP e envia street view + location.',
async execute(ctx) {
const { reply, mess, q, prefix, command, axios, kiimorizinha, from, selo } = ctx;

if (!q) return reply(`Informe o ip que você deseja! *Exemplo:* ${prefix+command} 8.8.8.8`)
try {
const ip = await axios.get(`https://ipwhois.app/json/${encodeURIComponent(q)}`);
await kiimorizinha.sendMessage(from, {image: {url: `https://maps.googleapis.com/maps/api/streetview?size=1400x1400&location=${ip.data.latitude},%20${ip.data.longitude}&sensor=false&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg`}, caption: mess.searchIpAdress(ip)}, {quoted: selo});
await kiimorizinha.sendMessage(from, {location: {degreesLatitude: ip.data.latitude,degreesLongitude: ip.data.longitude, addrees: ''}}, {quoted: selo});
} catch(error) {
reply(mess.error())
}
},
};
