import { loadRpgDB, saveRpgDB, getPlayer, ensureMarFields, marLiberado } from '../../arquivos/funcoes/rpg/core.js';
import { SEAS, listaIlhasDoMar, ilhaAcessivel } from '../../arquivos/funcoes/rpg/ilhas.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'mares',
aliases: ['seas', 'mar'],
category: 'rpg',
description: 'Mostra os 3 mares do MenuRpg, quais estão liberados e como desbloquear o próximo.',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureMarFields(player);
saveRpgDB(db);

let texto = `*🌊『 𝗠𝗮𝗿𝗲𝘀 𝗱𝗼 𝗠𝗲𝗻𝘂𝗥𝗽𝗴 』🌊*\n\n`;

for (const [seaNum, seaInfo] of Object.entries(SEAS)) {
const sea = Number(seaNum);
const liberado = marLiberado(sea, player);
const ilhas = listaIlhasDoMar(sea);
const acessiveis = ilhas.filter(([, i]) => ilhaAcessivel(i, player)).length;

texto += `${liberado ? seaInfo.emoji : '🔒'} *${seaInfo.nome}*\n`;
texto += liberado
? `└ ${acessiveis}/${ilhas.length} ilhas já liberadas pro seu nível\n\n`
: `└ Bloqueado — derrote o chefe final do mar anterior pra ganhar o Log Pose\n\n`;
}

texto += `> Use *${prefix}ilhas <1|2|3>* pra ver o mapa de um mar específico.`;

await responder(ctx, texto, [
{ display_text: '🗺️ Ver Mapa Atual', id: `${prefix}ilhas` },
{ display_text: '👤 Ver Perfil', id: `${prefix}perfilrpg` },
]);
},
};
