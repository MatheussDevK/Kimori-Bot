module.exports = {
name: 'criarfamilia',
aliases: ['criar_familia'],
category: 'brincadeiras',
description: 'Cria uma família no grupo (apenas para quem já está namorando).',
async execute(ctx) {
const { reply, reagir, mess, isGroup, sender, from, namoro1, kiimorizinha, selo, ChannelContextNewsLetter, __FAM_load, __FAM_save, __FAM_makeId, __FAM_isMarriedInGroup } = ctx;

try {
if (!isGroup) return reply(mess.onlyGroup());

const casal = __FAM_isMarriedInGroup(sender, from, namoro1);
if (!casal) return reply('*❌ sᴏ́ qᴜᴇᴍ ᴇsᴛᴀ́ ɴᴀᴍᴏʀᴀɴᴅᴏ ᴘᴏᴅᴇ ᴄʀɪᴀʀ ғᴀᴍíʟɪᴀ.*');

const db = __FAM_load();
const fid = __FAM_makeId(casal.a, casal.b, from);

if (db.families[fid]) {
return reply('*⚠️ ᴠᴏᴄês ᴊá ᴛêᴍ ᴜᴍᴀ ғᴀᴍíʟɪᴀ ᴄʀɪᴀᴅᴀ ɴᴇsᴛᴇ ɢʀᴜᴘᴏ.*');
}

db.families[fid] = {
a: casal.a,
b: casal.b,
grupo: String(from),
criadoEm: Date.now(),
filhos: []
};
__FAM_save(db);

await reagir(from, "👨‍👩‍👧‍👦");
return kiimorizinha.sendMessage(from, {
text: `*✅ ғᴀᴍíʟɪᴀ ᴄʀɪᴀᴅᴀ сᴏᴍ sᴜᴄᴇssᴏ!*`,
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [casal.a, casal.b] }
}, { quoted: selo }).catch(() => reply('*✅ ғᴀᴍíʟɪᴀ ᴄʀɪᴀᴅᴀ сᴏᴍ sᴜᴄᴇssᴏ!*'));
} catch (e) {
console.log(e);
reply(mess.error?.() || '*❌ dᴇᴜ ᴇʀʀᴏ ᴀᴏ ᴄʀɪᴀʀ ғᴀᴍíʟɪᴀ.*');
}
},
};
