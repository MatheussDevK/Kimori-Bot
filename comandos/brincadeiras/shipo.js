module.exports = {
name: 'shipo',
category: 'brincadeiras',
description: 'Sorteia um par do grupo pro alvo marcado.',
async execute(ctx) {
const { isGroup, isModobn, mess, prefix, menc_os2, reply, kiimorizinha, from, ChannelContextNewsLetter, selo, groupMembers } = ctx;
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2) return reply('Marque uma pessoa do grupo para encontrar o par dela.')
const parceiro = groupMembers[Math.floor(Math.random() * groupMembers.length)].id
const porcentagem = Math.floor(Math.random() * 100)
await kiimorizinha.sendMessage(from, {
text: `💘 𝐄𝐔 𝐒𝐇𝐈𝐏𝐎:\n@${parceiro.split('@')[0]}\n\n@${menc_os2.split("@")[0]}\n\n𝐂𝐎𝐌 𝐔𝐌𝐀 𝐏𝐎𝐑𝐂𝐄𝐍𝐓𝐀𝐆𝐄𝐌 𝐃𝐄: *${porcentagem}%*`,
contextInfo: {...ChannelContextNewsLetter, mentionedJid: [parceiro, menc_os2]}
}, {quoted: selo})
}
};
