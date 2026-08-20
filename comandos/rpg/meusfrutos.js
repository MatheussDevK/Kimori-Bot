const { loadRpgDB, saveRpgDB, getPlayer } = require('../../arquivos/funcoes/rpg/core.js');
const { FRUTAS, ensureFarmFields, formatTempoRestante, responder } = require('../../arquivos/funcoes/rpg/frutas.js');

module.exports = {
name: 'meusfrutos',
category: 'rpg',
description: 'Mostra suas sementes, frutos colhidos, plantações em andamento e habilidades.',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureFarmFields(player);
saveRpgDB(db);

const agora = Date.now();
let texto = `*🌾『 𝗠𝗲𝘂𝘀 𝗙𝗿𝘂𝘁𝗼𝘀 』🌾*\n\n💰 Berries: *${player.berries}*\n\n`;

const sementes = Object.entries(player.sementes).filter(([, q]) => q > 0);
texto += `*🌱 Sementes:*\n`;
texto += sementes.length
? sementes.map(([f, q]) => `${FRUTAS[f].emoji} ${FRUTAS[f].nome}: ${q}`).join('\n')
: '_nenhuma_';

const frutos = Object.entries(player.frutos).filter(([, q]) => q > 0);
texto += `\n\n*🧺 Frutos colhidos:*\n`;
texto += frutos.length
? frutos.map(([f, q]) => `${FRUTAS[f].emoji} ${FRUTAS[f].nome}: ${q}`).join('\n')
: '_nenhum_';

texto += `\n\n*⏳ Plantações em andamento:*\n`;
texto += player.plantacoes.length
? player.plantacoes.map(p => {
const status = p.prontoEm <= agora ? 'pronta pra colher! 🧺' : formatTempoRestante(p.prontoEm - agora);
const vidaRestante = formatTempoRestante(p.mortoEm - agora);
return `${FRUTAS[p.fruta].emoji} ${FRUTAS[p.fruta].nome}: ${status} • morre em ${vidaRestante}`;
}).join('\n')
: '_nenhuma_';

texto += `\n\n*✨ Habilidades desbloqueadas:*\n`;
texto += player.habilidades.length
? player.habilidades.map(f => `${FRUTAS[f].emoji} ${FRUTAS[f].habilidade}`).join('\n')
: '_nenhuma ainda — colha frutos pra desbloquear_';

await responder(ctx, texto, [
{ display_text: '🌱 Comprar Semente', id: `${prefix}comprarsemente` },
{ display_text: '🪴 Plantar', id: `${prefix}plantarfruto` },
{ display_text: '🧺 Colher', id: `${prefix}coletarfrutos` },
]);
},
};
