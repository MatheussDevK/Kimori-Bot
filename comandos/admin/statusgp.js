module.exports = {
name: 'statusgp',
category: 'admin',
description: 'Posta um status de texto (amarelo) em nome do grupo.',
async execute(ctx) {
const {
reply, mess, isGroupAdmins, SoDono, q, prefix,
sendInteractiveMessage, kiimorizinha, from,
} = ctx;

if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!q || !q.trim()) return reply(`use: ${prefix}statusgp textoaqui`);
await sendInteractiveMessage(kiimorizinha, from, {
extendedTextMessage: {
text: q.trim(),
textArgb: 4294967040,
backgroundArgb: 4280669030,
font: 5,
previewType: "NONE",
contextInfo: {
featureEligibilities: {
canReceiveMultiReact: true},
statusSourceType: "TEXT",
statusAttributions: [{
type: 10}],
isGroupStatus: true},
inviteLinkGroupTypeV2: "DEFAULT"
}}, {});
},
};
