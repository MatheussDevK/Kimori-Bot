const { concederVip } = require('../../arquivos/funcoes/lojinha.js');

module.exports = {
name: 'addvip',
category: 'dono',
description: 'Adiciona dias de VIP a um usuário (use 0 para VIP infinito).',
async execute(ctx) {
const { reply, mess, SoDono, q, menc_os2, nmrdn, prefix, command, kiimorizinha, from, selo } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
const barra = q.replace(" /", "/").replace("/ ", "/").replace(" / ", "/");
const [nmr, tempo50] = barra.split('/');
if (!nmr || !tempo50) {
await kiimorizinha.sendMessage(from, {
text: `*💫 ᴍᴇɴᴄɪᴏɴᴇ ᴏ ɴᴜ́ᴍᴇʀᴏ ᴅᴏ ᴜsᴜᴀʀɪᴏ ᴇ ᴀ ǫᴜᴀɴᴛɪᴅᴀᴅᴇ ᴅᴇ ᴅɪᴀs ᴅᴏ ᴠɪᴘ.*\n• Exemplo: *${prefix + command} @${nmrdn.split('@')[0]}/30*\n• Para VIP infinito, use *0*.`,
}, { quoted: selo });
return;
}
const usur = menc_os2 ? menc_os2 : (nmr.includes('@') ? nmr.split('@')[1] + "@s.whatsapp.net" : nmr + "@s.whatsapp.net");
const dias = Number(tempo50);
const infinito = dias > 0 ? false : true;
const resultado = concederVip(ctx.vip, usur, dias, infinito);
if (!resultado.ok) return reply("Não é possível adicionar dias a um usuário com VIP infinito.");
const texto = infinito
? `@${usur.split("@")[0]} Recebeu o vip infinito no bot ✨`
: `🗓️ ${dias} dia${dias > 1 ? 's' : ''} fo${dias > 1 ? 'ram' : 'i'} adicionado${dias > 1 ? 's' : ''} ao usuário @${usur.split("@")[0]}`;
await kiimorizinha.sendMessage(from, { text: texto, mentions: [usur] }, { quoted: selo });
},
};
