const fs = require('fs');
const { status } = require('../../config-bot/logos/links_img.json');

module.exports = {
name: 'status',
category: 'geral',
description: 'Mostra o status de todas as ativações e proteções do grupo.',
async execute(ctx) {
const { reply, mess, isGroup, from, dataGp, emojii, sendMenu, selo } = ctx;
if (!isGroup) return reply(mess.onlyGroup());

const pathGp2 = `./database/grupos/ATIVAÇÕES-GRUPO/TESTE/${from}.json`;
let welcomeStatus = false, welcomeModo = null;
if (fs.existsSync(pathGp2)) {
const dataGp2 = JSON.parse(fs.readFileSync(pathGp2));
welcomeStatus = dataGp2.welcome?.status || false;
welcomeModo = dataGp2.welcome?.modo || null;
}

const on = v => v ? '✅' : '❌';
const g = dataGp[0];
const linha = (label, valor) => `┋°‧․ˑ${emojii}⃟⠥ʿ⇢${label}: *${valor}*`;
const sep = () => `┃╌─────────────╌`;

const texto =
`┏═•✭｡ﾟ✧| ${emojii} |✧ﾟ｡•✭•═┓
┃╭ ≪ ❖ ◦ ✦ ◦ ❖ ≫ ╮
┃✦ 𝆺𝅥˚ ஓீᤢ✧ *STATUS DO GRUPO*
${sep()}
${linha('🖼️ Anti Imagem', on(g.antiimg))}
${linha('🎬 Anti Vídeo', on(g.antivideo))}
${linha('🎧 Anti Áudio', on(g.antiaudio))}
${linha('🧩 Anti Figurinha', on(g.antisticker))}
${linha('📄 Anti Documento', on(g.antidoc))}
${linha('🔞 Anti Pornô', on(g.antiporn))}
${sep()}
${linha('📇 Anti Contato', on(g.antictt))}
${linha('📍 Anti Localização', on(g.antiloc))}
${linha('🚫 Anti DDD', on(g.ANTI_DDD?.active))}
${linha('👁️ Anti Status', on(g.Antistatus))}
${linha('🚫 Anti Número Fake', on(g.antifake))}
${sep()}
${linha('⚔️ Anti Link (Hard)', on(g.antilinkhard))}
${linha('🔗 Anti Link Grupo', on(g.antilinkgp))}
${linha('⚙️ Anti Link (Easy)', on(g.antilinkeasy))}
${linha('🛒 Anti Catálogo', on(g.anticatalogo))}
${linha('🧾 Anti Notas Fakes', on(g.antinotas))}
${linha('💢 Anti Palavrão', on(g.antipalavrao?.active))}
${sep()}
${linha('👑 Só Admin', on(g.soadm))}
${linha('🕵️ X9 Admin', on(g.x9))}
${linha('👁️ X9 Visu Única', on(g.visuUnica))}
${linha('🚫 Grupo Banido', on(g.bangp))}
${sep()}
${linha('🪄 Auto Figurinha', on(g.autosticker))}
${linha('📲 Auto Download', on(g.autodl))}
${linha('💬 Auto Resposta', on(g.autoresposta))}
${linha('🎮 Modo Brincadeira', on(g.jogos))}
${linha('💠 Multi Prefixo', on(g.multiprefix))}
${sep()}
${linha('🌊 Anti Flood', on(g.limitec?.active))} ${g.limitec?.active ? `(${g.limitec.quantidade}x)` : ''}
${linha('📉 Limitar Comando', on(g.Limitar_CMD?.active))}
${linha('🛡️ Anti Spam', on(g.antispam?.active))}
${sep()}
${linha('👋 Bem-vindo', on(welcomeStatus))} ${welcomeModo ? `(${welcomeModo})` : ''}
┃╰── ≪ ❖ ◦ ✦ ◦ ❖ ≫ ──╯
┗═•✭｡ﾟ✧| ${emojii} |✧ﾟ｡•✭•═┛`;

await sendMenu(from, selo, {
reaction: `${emojii}`,
videoUrl: status,
caption: texto,
isAdminRequired: true
});
},
};
