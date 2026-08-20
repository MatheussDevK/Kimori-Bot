module.exports = {
name: 'advertir',
aliases: ['adverter'],
category: 'admin',
description: 'Aplica uma advertência a um usuário marcado; na 3ª ele é removido do grupo.',
async execute(ctx) {
const {
reply, mess, isGroup, isGroupAdmins, menc_os2, botNumberLID, nmrdn,
groupAdmins, groupMembers, ADVT, dataGp, setGp, sender, sleep, mentions,
kiimorizinha, from, selo, ChannelContextNewsLetter,
} = ctx;

if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(menc_os2 == botNumberLID) return reply("Não pode advertir o próprio bot.");
if(menc_os2 == nmrdn) return reply("Não pode advertir o próprio dono do bot.");
if(groupAdmins.includes(menc_os2)) return reply("Não é possível advertir adminstrador do grupo.");
if(!JSON.stringify(groupMembers).includes(menc_os2)) return reply("Não tem como advertir um usuário que não se encontra mais no grupo.")
ADVT.push(menc_os2); setGp(dataGp)
setTimeout(async() => {
const dfqn = ADVT.filter(x => x == menc_os2).length
const dfntxt = mess.warningAdvertencia(menc_os2, dfqn)
if(!dfntxt.includes("3/3")) {
if(!JSON.stringify(ADVT).includes(sender)) {
await sleep(1500);
await mentions(dfntxt, [menc_os2])
} else if(dfqn == 2) {
await sleep(1500);
await mentions(dfntxt, [menc_os2])
}} else {
await kiimorizinha.sendMessage(from, {text: mess.finishAdvertencia(menc_os2), contextInfo:{...ChannelContextNewsLetter, mentionedJid: [menc_os2]}}, {quoted: selo})
await sleep(1500)
await kiimorizinha.groupParticipantsUpdate(from, [menc_os2], "remove")
const i = ADVT.indexOf(menc_os2);
ADVT.splice(i, 3); setGp(dataGp)}}, 3000)
},
};
