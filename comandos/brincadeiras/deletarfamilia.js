module.exports = {
name: 'deletarfamilia',
aliases: ['deletar_familia'],
category: 'brincadeiras',
description: 'Deleta a família criada pelo casal no grupo.',
async execute(ctx) {
const { reply, reagir, mess, isGroup, sender, from, namoro1, __FAM_load, __FAM_save, __FAM_makeId, __FAM_isMarriedInGroup } = ctx;

try {
if (!isGroup) return reply(mess.onlyGroup());

const casal = __FAM_isMarriedInGroup(sender, from, namoro1);
if (!casal) return reply('*❌ sᴏ́ qᴜᴇᴍ ᴇsᴛᴀ́ ɴᴀᴍᴏʀᴀɴᴅᴏ ᴘᴏᴅᴇ ᴅᴇʟᴇᴛᴀʀ ғᴀᴍíʟɪᴀ.*');

const db = __FAM_load();
const fid = __FAM_makeId(casal.a, casal.b, from);

if (!db.families[fid]) return reply('*❌ ᴠᴏᴄê ɴãᴏ ᴛêᴍ ғᴀᴍíʟɪᴀ ᴄʀɪᴀᴅᴀ ɴᴇsᴇ ɢʀᴜᴘᴏ.*');

delete db.families[fid];

for (const [k, v] of Object.entries(db.pend || {})) {
if (v?.familyId === fid) delete db.pend[k];
}

__FAM_save(db);
await reagir(from, "🗑️");
return reply('*✅ ғᴀᴍíʟɪᴀ ᴅᴇʟᴇᴛᴀᴅᴀ сᴏᴍ sᴜᴄᴇssᴏ.*');
} catch (e) {
console.log(e);
reply(mess.error?.() || '*❌ dᴇᴜ ᴇʀʀᴏ ᴀᴏ ᴅᴇʟᴇᴛᴀʀ ғᴀᴍíʟɪᴀ.*');
}
},
};
