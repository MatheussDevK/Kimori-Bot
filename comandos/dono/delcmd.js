const { removerNoPrefix } = require('../../arquivos/funcoes/command.js');

module.exports = {
name: 'delcmd',
category: 'dono',
description: 'Remove um gatilho customizado (sem prefixo) registrado, apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, q } = ctx;

if (!SoDono) return reply(mess.onlyOwner())
if (!q) return reply('*ɪɴꜰᴏʀᴍᴇ ᴏ ᴄᴏᴍᴀɴᴅᴏ ꜱᴇᴍ ᴘʀᴇꜰɪxᴏ ǫᴜᴇ ᴅᴇꜱᴇᴊᴀ ʀᴇᴍᴏᴠᴇʀ*')
const sucesso = removerNoPrefix(q.toLowerCase())
if (sucesso) {
reply('*ᴄᴏᴍᴀɴᴅᴏ ʀᴇᴍᴏᴠɪᴅᴏ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ *')
} else {
reply('*ᴇꜱꜱᴇ ᴄᴏᴍᴀɴᴅᴏ ɴᴀ̃ᴏ ᴇꜱᴛᴀ́ ʀᴇɢɪꜱᴛʀᴀᴅᴏ*')}
},
};
