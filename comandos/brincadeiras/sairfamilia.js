module.exports = {
name: 'sairfamilia',
aliases: ['sair_familia'],
category: 'brincadeiras',
description: 'Sai da família da qual você é child.',
async execute(ctx) {
const { reply, reagir, mess, isGroup, sender, from, __FAM_load, __FAM_save, __FAM_findFamilyByMember } = ctx;

try {
if (!isGroup) return reply(mess.onlyGroup());

const db = __FAM_load();
const found = __FAM_findFamilyByMember(db, sender, from);
if (!found) return reply('*❌ ᴠᴏᴄê ɴãᴏ ᴇsᴛá ᴇᴍ ɴᴇɴʜᴜᴍᴀ ғᴀᴍíʟɪᴀ.*');

if (found.role === "casal") {
return reply('*⚠️ ᴘᴀɪs ɴãᴏ ᴜsᴀᴍ sᴀɪʀ_ғᴀᴍíʟɪᴀ. ᴜsᴇ dᴇʟᴇᴛᴀʀ_ғᴀᴍíʟɪᴀ sᴇ ɢᴏsᴛᴀʀ.*');
}

const fam = found.fam;
fam.filhos = (fam.filhos || []).filter(j => String(j) !== String(sender));
db.families[found.fid] = fam;
__FAM_save(db);

await reagir(from, "🚪");
return reply('*✅ ᴠᴏᴄê sᴀɪᴜ ᴅᴀ ғᴀᴍíʟɪᴀ.*');
} catch (e) {
console.log(e);
reply(mess.error?.() || '*❌ dᴇᴜ ᴇʀʀᴏ ᴀᴏ sᴀɪʀ ᴅᴀ ғᴀᴍíʟɪᴀ.*');
}
},
};
