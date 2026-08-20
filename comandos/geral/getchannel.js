const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
name: 'getchannel',
aliases: ['infoch'],
category: 'geral',
description: 'Mostra informações públicas de um canal do WhatsApp a partir do link.',
async execute(ctx) {
const { reply, q, prefix, command, reagir, from, kiimorizinha, selo, emojii } = ctx;

if (!q) return reply(`• Por favor, forneça o link do canal.\n\n> exemplo: ${prefix + command} https://whatsapp.com/channel/0029ValLKgUAO7RCUU0dO03k`);
await reagir(from, `${emojii}`);
try {
let channelId;
if (q.includes('whatsapp.com/channel/')) {
channelId = q.split('whatsapp.com/channel/')[1].split('/')[0];
} else if (q.includes('wa.me/channel/')) {
channelId = q.split('wa.me/channel/')[1].split('/')[0];
} else {
channelId = text;}
const idNewsletter = await kiimorizinha.newsletterMetadata('invite', channelId);
const response = await axios.get(q);
const $ = cheerio.load(response.data);
const title = $('title').text() || 'Nome não encontrado';
const img = $('img._9vx6').attr('src');
const subs = $('h5._9vd5._9scy').text() || 'Seguidores não encontrados';
const description = $('h4._9vd5._9scb').text() || 'Descrição não encontrada';
await kiimorizinha.sendMessage(from, {
image: { url: img },
caption: `- 🌟 *Nome*: ${title}\n- 👤 *Seguidores*: ${subs}\n- 🎭 *Id Channel*: ${idNewsletter.id}\n- 🔗 *Link*: ↴\n${q}\n- 🌃 *Descrição*: ↴\n\n${description}`,
}, { quoted: selo });
} catch (e) {
reply('Ocorreu um erro ao tentar obter as informações do canal.');
console.log(e);}
},
};
