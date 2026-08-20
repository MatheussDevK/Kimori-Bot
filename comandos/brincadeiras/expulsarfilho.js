module.exports = {
name: 'expulsarfilho',
aliases: ['expulsar_filho'],
category: 'brincadeiras',
description: 'Expulsa um child da família.',
async execute(ctx) {
const { reply, reagir, mess, isGroup, sender, from, info, menc_os2, namoro1, kiimorizinha, selo, ChannelContextNewsLetter, __FAM_load, __FAM_save, __FAM_makeId, __FAM_isMarriedInGroup, __FAM_pickTargetJid } = ctx;

try {
if (!isGroup) return reply(mess.onlyGroup());

const casal = __FAM_isMarriedInGroup(sender, from, namoro1);
if (!casal) return reply('*❌ sᴏ́ qᴜᴇᴍ ᴇsᴛᴀ́ ɴᴀᴍᴏʀᴀɴᴅᴏ ᴘᴏᴅᴇ ᴇxᴘᴜʟsᴀʀ ᴄʜɪʟᴅ.*');

const db = __FAM_load();
const fid = __FAM_makeId(casal.a, casal.b, from);
const fam = db.families?.[fid];
if (!fam) return reply('*❌ ᴠᴏᴄês ɴãᴏ ᴛêᴍ ᴜᴍᴀ ғᴀᴍíʟɪᴀ ᴄʀɪᴀᴅᴀ ɴᴇsᴛᴇ ɢʀᴜᴘᴏ.*');

const alvo = __FAM_pickTargetJid(info, menc_os2);
if (!alvo) return reply('*❌ ᴍᴀʀqᴜᴇ ᴏ ᴄʜɪʟᴅ ᴘʀᴀ ᴇxᴘᴜʟsᴀʀ.*');

fam.filhos = Array.isArray(fam.filhos) ? fam.filhos : [];
if (!fam.filhos.includes(alvo)) return reply('*⚠️ ᴇssᴀ ᴘᴇssᴏᴀ ɴãᴏ ᴇ́ ᴜᴍ ᴄʜɪʟᴅ ᴅᴇssᴀ ғᴀᴍíʟɪᴀ.*');

fam.filhos = fam.filhos.filter(j => String(j) !== String(alvo));
db.families[fid] = fam;
__FAM_save(db);

await reagir(from, "🚫");
return kiimorizinha.sendMessage(from, {
text: `*✅ ᴄʜɪʟᴅ ᴇxᴘᴜʟsᴏ ᴅᴀ ғᴀᴍíʟɪᴀ.*\n*• ʀᴇᴍᴏᴠɪᴅᴏ:* @${alvo.split("@")[0]}`,
contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [alvo] }
}, { quoted: selo }).catch(() => reply('*✅ ᴄʜɪʟᴅ ᴇxᴘᴜʟsᴏ ᴅᴀ ғᴀᴍíʟɪᴀ.*'));
} catch (e) {
console.log(e);
reply(mess.error?.() || '*❌ dᴇᴜ ᴇʀʀᴏ ᴀᴏ ᴇxᴘᴜʟsᴀʀ ᴏ ᴄʜɪʟᴅ.*');
}
},
};
