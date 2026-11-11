import { loadRpgDB, saveRpgDB, getPlayer, ensureAllFields } from '../../arquivos/funcoes/rpg/core.js';
import { loadBandos, saveBandos, getBandoDoJogador, criarBando } from '../../arquivos/funcoes/rpg/bando.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'criarbando',
category: 'rpg',
description: 'Cria um bando (tripulação de verdade) e vira o capitão dele.',
async execute(ctx) {
const { q, prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureAllFields(player);

const bandos = loadBandos();
const bandoAtual = getBandoDoJogador(bandos, sender);
if (bandoAtual) {
saveRpgDB(db);
return responder(ctx,
`*ᴠᴏᴄᴇ ᴊᴀ́ ғᴀᴢ ᴘᴀʀᴛᴇ ᴅᴏ ʙᴀɴᴅᴏ "${bandoAtual.nome}"*\n\n> Use ${prefix}sairbando se quiser sair antes de criar outro.`,
[{ display_text: '⛵ Ver Bando', id: `${prefix}bando` }]);
}

const nome = String(q || '').trim();
if (!nome || nome.length < 3) {
saveRpgDB(db);
return responder(ctx, `*ᴇsᴄᴏʟʜᴀ ᴜᴍ ɴᴏᴍᴇ ᴘʀᴀ ᴏ sᴇᴜ ʙᴀɴᴅᴏ*\n\n> Use *${prefix}criarbando <nome>*\n> Exemplo: ${prefix}criarbando Chapéus de Palha`, null);
}

const bando = criarBando(bandos, nome, sender);
player.bandoId = bando.id;
saveBandos(bandos);
saveRpgDB(db);

await responder(ctx,
`*⛵ ʙᴀɴᴅᴏ ᴄʀɪᴀᴅᴏ!*\n\n` +
`🏴‍☠️ *${bando.nome}*\n👑 Capitão: ${player.nome}\n🆔 ID: \`${bando.id}\`\n\n` +
`> Convide gente com ${prefix}convidarbando @user (máx. de membros por bando: 6)`,
[{ display_text: '⛵ Ver Bando', id: `${prefix}bando` }]);
},
};
