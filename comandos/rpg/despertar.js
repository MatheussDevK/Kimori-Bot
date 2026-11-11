import { loadRpgDB, saveRpgDB, getPlayer, ensureAllFields } from '../../arquivos/funcoes/rpg/core.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

const NIVEL_MINIMO = 50;
const CUSTO_FRAGMENTOS = 1000;
const HABILIDADES_MINIMAS = 3;
const CHANCE_SUCESSO = 0.7;

export default {
name: 'despertar',
category: 'rpg',
description: 'Tenta despertar sua transformação (desbloqueia o golpe V, mais forte de todos).',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureAllFields(player);

if (player.transformacaoDesbloqueada) {
saveRpgDB(db);
return responder(ctx, `*ᴠᴏᴄᴇ̂ ᴊᴀ́ ᴅᴇsᴘᴇʀᴛᴏᴜ sᴜᴀ ᴛʀᴀɴsғᴏʀᴍᴀᴄᴀᴏ!*\n\n> Use ${prefix}golpe V no próximo combate.`, null);
}

const habilidades = (player.habilidades || []).length;
if (player.nivel < NIVEL_MINIMO || habilidades < HABILIDADES_MINIMAS) {
saveRpgDB(db);
return responder(ctx,
`*🔒 ᴠᴏᴄᴇ̂ ᴀɪɴᴅᴀ ɴᴀᴏ ᴇsᴛᴀ́ ᴘʀᴏɴᴛᴏ ᴘʀᴀ ᴅᴇsᴘᴇʀᴛᴀʀ*\n\n` +
`⭐ Nível exigido: ${NIVEL_MINIMO} (você: ${player.nivel})\n` +
`✨ Habilidades exigidas: ${HABILIDADES_MINIMAS} (você: ${habilidades})\n\n` +
`> Suba de nível em ${prefix}atacar e colha mais frutos em ${prefix}coletarfrutos.`,
[{ display_text: '🌾 Meus Frutos', id: `${prefix}meusfrutos` }]);
}

if (player.fragmentos < CUSTO_FRAGMENTOS) {
saveRpgDB(db);
return responder(ctx,
`*💎 ғʀᴀɢᴍᴇɴᴛᴏs ɪɴsᴜғɪᴄɪᴇɴᴛᴇs*\n\nCusto: ${CUSTO_FRAGMENTOS}\nVocê tem: ${player.fragmentos}`,
[{ display_text: '👤 Ver Perfil', id: `${prefix}perfilrpg` }]);
}

player.fragmentos -= CUSTO_FRAGMENTOS;
const sucesso = Math.random() < CHANCE_SUCESSO;

if (!sucesso) {
saveRpgDB(db);
return responder(ctx,
`*💥 ᴏ ᴅᴇsᴘᴇʀᴛᴀʀ ғᴀʟʜᴏᴜ...*\n\n` +
`Você perdeu ${CUSTO_FRAGMENTOS} fragmentos, mas pode tentar de novo.\n💎 Fragmentos restantes: ${player.fragmentos}`,
[{ display_text: '🔁 Tentar de Novo', id: `${prefix}despertar` }]);
}

player.transformacaoDesbloqueada = true;
saveRpgDB(db);

await responder(ctx,
`*🔥 ᴠᴏᴄᴇ̂ ᴅᴇsᴘᴇʀᴛᴏᴜ sᴜᴀ ᴛʀᴀɴsғᴏʀᴍᴀᴄᴀᴏ!*\n\n` +
`A partir de agora você pode usar o golpe *V* (Transformação) em combate — o mais forte de todos — além de um bônus permanente de +8% de ataque.\n\n` +
`💎 Fragmentos restantes: ${player.fragmentos}`,
[{ display_text: '⚔️ Atacar', id: `${prefix}atacar` }, { display_text: '👤 Ver Perfil', id: `${prefix}perfilrpg` }]);
},
};
