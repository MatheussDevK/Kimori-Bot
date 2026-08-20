const { deathcmd } = require('../../config-bot/logos/links_img.json');
module.exports = {
name: 'morte',
aliases: ['death'],
category: 'brincadeiras',
description: 'Prevê a idade de morte de um nome usando a API agify.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, command, args, axios, kiimorizinha, from, ChannelContextNewsLetter, sender, selo, reply } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if (args.length == 0) return reply(`Está faltando o nome da pessoa! Por exemplo: ${prefix+command} Matheus`)
const predea = await axios.get(`https://api.agify.io/?name=${encodeURIComponent(args[0])}`);
if (predea.data.age == null) return reply(`Você inseriu um nome invalido, certifique-se de inserir um sem acentos, emojis, números e outros.`);
await kiimorizinha.sendMessage(from, {
video: {url: deathcmd}, gifPlayback: true,
caption: `Pessoas com este nome citado "${predea.data.name}" tendem a morrer aos ${predea.data.age} anos.`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [sender]}
}, {quoted: selo})
}
};
