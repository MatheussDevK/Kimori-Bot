module.exports = {
name: 'aceitaradocao',
aliases: ['aceitar_adocao'],
category: 'brincadeiras',
description: 'Aceita um pedido de adoção pendente.',
async execute(ctx) {
const { reply, reagir, mess, isGroup, sender, from, kiimorizinha, selo, ChannelContextNewsLetter, __FAM_load, __FAM_save } = ctx;

try {
if (!isGroup) return reply(mess.onlyGroup());

const db = __FAM_load();
const pend = db.pend?.[String(sender)];
if (!pend) return reply('*❌ ᴠᴏᴄê ɴãᴏ ᴛᴇᴍ ɴᴇɴʜᴜᴍ ᴘᴇᴅɪᴅᴏ ᴅᴇ ᴀᴅᴏçãᴏ ᴘᴇɴᴅᴇɴᴛᴇ.*');

const fam = db.families?.[pend.familyId];
if (!fam || String(fam.grupo) !== String(from)) {
delete db.pend[String(sender)];
__FAM_save(db);
return reply('*⚠️ ᴇssᴇ ᴘᴇᴅɪᴅᴏ ɴãᴏ ᴇ́ ᴍᴀɪs ᴠáʟɪᴅᴏ.*');
}

fam.filhos = Array.isArray(fam.filhos) ? fam.filhos : [];
if (!fam.filhos.includes(String(sender))) fam.filhos.push(String(sender));

delete db.pend[String(sender)];
db.families[pend.familyId] = fam;
__FAM_save(db);

await reagir(from, "✅");

const p1 = fam.a.split("@")[0];
const p2 = fam.b.split("@")[0];

return kiimorizinha.sendMessage(from, {
text:
`*✅ ᴀᴅᴏçãᴏ ᴀᴄᴇɪᴛᴀ!*\n\n` +
`*• ғᴀᴍíʟɪᴀ:* @${p1} & @${p2}\n` +
`*• ɴᴏᴠᴏ ᴄʜɪʟᴅ:* @${String(sender).split("@")[0]}`,
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [fam.a, fam.b, String(sender)] }
}, { quoted: selo }).catch(() => reply('*✅ ᴀᴅᴏçãᴏ ᴀᴄᴇɪᴛᴀ!*'));
} catch (e) {
console.log(e);
reply(mess.error?.() || '*❌ dᴇᴜ ᴇʀʀᴏ ᴀᴏ ᴀᴄᴇɪᴛᴀʀ ᴀᴅᴏçãᴏ.*');
}
},
};
