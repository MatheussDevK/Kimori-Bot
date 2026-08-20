module.exports = {
name: 'perfil',
category: 'geral',
description: 'Mostra um cartão de perfil (foto, bio, conselho aleatório, estatísticas do grupo).',
async execute(ctx) {
const {
kiimorizinha, sender, imgperfil, advices, isGroup, from, groupIdscount,
countMessage, mess, pushname, emojii, isChVip, isCargo, botNome: NomeDoBot,
ChannelContextNewsLetter, selo, reply,
} = ctx;

try {
let avatarUrl;
try {
const ppUrl = await kiimorizinha.profilePictureUrl(sender, "image");
avatarUrl = ppUrl || imgperfil;
} catch (e) {
avatarUrl = imgperfil;
}

let status;
try {
const recadoUser = await kiimorizinha.fetchStatus(sender);
status = recadoUser[0]?.status?.status || "sem bio";
} catch {
status = "bio oculta ou indisponivel";
}
const conselho = (advices?.commonAdvices?.length)
? advices.commonAdvices[Math.floor(Math.random() * advices.commonAdvices.length)]
: "nao confie nem na sua sombra...";
const num = () => Math.floor(Math.random() * 9) + 1;
const pct = () => `${num()}${num()}%`;
const programa = (Math.floor(Math.random() * 9000) + 1000).toLocaleString('pt-BR');
let dadosUser = { messages: 0, cmd_messages: 0, figus: 0, imagens: 0, videos: 0, audios: 0, documentos: 0 };
if (isGroup && groupIdscount.includes(from)) {
const indGrupo = groupIdscount.indexOf(from);
const grupoData = countMessage[indGrupo];
const userData = grupoData.numbers.find(u => u.id === sender);
if (userData) {
dadosUser = {
messages: userData.messages || 0,
cmd_messages: userData.cmd_messages || 0,
figus: userData.figus || 0,
imagens: userData.imagens || 0,
videos: userData.videos || 0,
audios: userData.audios || 0,
documentos: userData.documentos || 0
};}}
await kiimorizinha.sendMessage(from, {
image: { url: avatarUrl },
caption: mess.perfilyuta(pushname, emojii, sender, status, isChVip, isCargo, dadosUser, pct, programa, conselho, NomeDoBot),
contextInfo: { ...ChannelContextNewsLetter }
}, { quoted: selo })
} catch (e) {
console.log(e);
reply("❌ Erro ao processar, verifique o terminal!")
}
},
};
