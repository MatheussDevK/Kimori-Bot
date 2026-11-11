import { loadRpgDB, saveRpgDB, getPlayer, ensureItensFields, gastarItem } from '../../arquivos/funcoes/rpg/core.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'cavar',
category: 'rpg',
description: 'Usa um Mapa do Tesouro (achado explorando) pra desenterrar uma recompensa grande.',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureItensFields(player);

if (!gastarItem(player, 'mapa_tesouro', 1)) {
saveRpgDB(db);
return responder(ctx,
`*🗺️ ᴠᴏᴄᴇ̂ ɴᴀᴏ ᴛᴇᴍ ɴᴇɴʜᴜᴍ ᴍᴀᴘᴀ ᴅᴏ ᴛᴇsᴏᴜʀᴏ*\n\n> Consiga um explorando ilhas com ${prefix}explorar.`,
[{ display_text: '🧭 Explorar', id: `${prefix}explorar` }]);
}

// Recompensa maior que a média de "explorar" — é isso que torna o mapa
// valioso. Berries base + chance extra de fragmentos.
const berriesGanho = Math.round(80 + player.nivel * 4 + Math.random() * 120);
player.berries += berriesGanho;

let texto = `*⛏️『 ᴄᴀᴠᴀɴᴅᴏ... 』⛏️*\n\n💰 Você desenterrou um baú com *฿ ${berriesGanho}* berries!`;

if (Math.random() < 0.35) {
const fragmentosGanho = 1 + Math.floor(Math.random() * 3);
player.fragmentos = (player.fragmentos || 0) + fragmentosGanho;
texto += `\n💎 E também tinha *${fragmentosGanho} fragmento(s)* no fundo do baú!`;
}

saveRpgDB(db);

await responder(ctx, texto, [
{ display_text: '🧭 Explorar de Novo', id: `${prefix}explorar` },
{ display_text: '👤 Ver Perfil', id: `${prefix}perfilrpg` },
]);
},
};
