module.exports = {
name: 'familia',
aliases: ['minha_familia', 'minhafamilia'],
category: 'brincadeiras',
description: 'Mostra a família da qual você faz parte no grupo.',
async execute(ctx) {
const { reply, reagir, mess, isGroup, sender, from, kiimorizinha, selo, ChannelContextNewsLetter, __FAM_load, __FAM_findFamilyByMember } = ctx;

try {
if (!isGroup) return reply(mess.onlyGroup());

const db = __FAM_load();
const found = __FAM_findFamilyByMember(db, sender, from);
if (!found) return reply('*❌ ᴠᴏᴄê ɴãᴏ ғᴀᴢ ᴘᴀʀᴛᴇ ᴅᴇ ɴᴇɴʜᴜᴍᴀ ғᴀᴍíʟɪᴀ ɴᴇsᴇ ɢʀᴜᴘᴏ.*');

const fam = found.fam;
const p1 = fam.a.split("@")[0];
const p2 = fam.b.split("@")[0];

const filhos = Array.isArray(fam.filhos) ? fam.filhos : [];
const listaFilhos = filhos.length
? filhos.map((j, i) => `*${i + 1}.* @${String(j).split("@")[0]}`).join("\n")
: '*ɴᴇɴʜᴜᴍ ᴄʜɪʟᴅ ᴀᴅᴏᴛᴀᴅᴏ ᴀᴜɴᴅᴀ.*';

const txt =
`*👨‍👩‍👧‍👦 ғᴀᴍíʟɪᴀ ᴅᴇ @${p1} & @${p2}*\n\n` +
`*• ᴘᴀɪs:* @${p1} & @${p2}\n` +
`*• ᴄʜɪʟᴅs:* ${filhos.length}\n\n` +
`${listaFilhos}`;

const mentions = [fam.a, fam.b, ...filhos];
await reagir(from, "👨‍👩‍👧‍👦");

return kiimorizinha.sendMessage(from, {
text: txt,
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: mentions }
}, { quoted: selo }).catch(() => reply(txt));
} catch (e) {
console.log(e);
reply(mess.error?.() || '*❌ dᴇᴜ ᴇʀʀᴏ ᴀᴏ ᴍᴏsᴛʀᴀʀ ғᴀᴍíʟɪᴀ.*');
}
},
};
