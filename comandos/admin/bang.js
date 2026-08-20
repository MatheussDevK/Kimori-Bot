module.exports = {
name: 'bang',
category: 'admin',
description: 'Bane do grupo todos os membros que estiverem na lista negra (local ou global).',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, SoDono, isBotGroupAdmins, q,
dataGp, listanegraG, groupMembers, normalizar, kiimorizinha, from,
ErroCase, prefix, command, botNome: NomeDoBot,
} = ctx;

if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!SoDono) return reply(mess.onlyOwner());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if (!q || (q !== 'local' && q !== 'global')) {
return reply(`*ᴜsᴇ: ʙᴀɴɢ ʟᴏᴄᴀʟ* — ʙᴀɴ ᴅᴀ ʟɪsᴛᴀ ɴᴇɢʀᴀ ʟᴏᴄᴀʟ\n*ᴏᴜ: ʙᴀɴɢ ɢʟᴏʙᴀʟ* — ʙᴀɴ ᴅᴀ ʟɪsᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ`);
}
try {
const lista = q === 'local' ? dataGp[0].listanegra : listanegraG;
const numerosNegros = lista.map(n => n.replace(/[^0-9]/g, ''));
const banidos = [];
for (const membro of groupMembers) {
const membroNormalizado = normalizar(membro.id);
const numero = membroNormalizado.replace(/[^0-9]/g, '');
const isInLista = numerosNegros.includes(numero);
const isNotAdmin = !membro.admin;
const isNotBot = membroNormalizado !== normalizar(kiimorizinha.user.id);
if (isInLista && isNotAdmin && isNotBot) {
banidos.push(membroNormalizado);
}
}
if (banidos.length === 0) {
return reply(`*ɴᴀᴏ ᴇɴᴄᴏɴᴛʀᴇɪ ɴᴇɴʜᴜᴍ ᴍᴇᴍʙʀᴏ ᴅᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ${q === 'local' ? 'ʟᴏᴄᴀʟ' : 'ɢʟᴏʙᴀʟ'} ɴᴇꜱᴛᴇ ɢʀᴜᴘᴏ *`);
}
await kiimorizinha.groupParticipantsUpdate(from, banidos, 'remove');
reply(`*ʙᴀɴɪ ᴜᴍ ᴛᴏᴛᴀʟ ᴅᴇ ${banidos.length} ɪɴɪᴍɪɢᴏ(ꜱ) ᴅᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ${q.toUpperCase()}*`);

} catch (e) {
await ErroCase(e, prefix, command, NomeDoBot);
}
},
};
