import { loadRpgDB, saveRpgDB, getPlayer, ensureAllFields } from '../../arquivos/funcoes/rpg/core.js';
import { loadBandos, getBandoDoJogador, MEMBROS_MAX } from '../../arquivos/funcoes/rpg/bando.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'bando',
category: 'rpg',
description: 'Mostra os dados do seu bando: membros, capitão e convites pendentes.',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureAllFields(player);
saveRpgDB(db);

const bandos = loadBandos();
const bando = getBandoDoJogador(bandos, sender);
if (!bando) {
return responder(ctx,
`*ᴠᴏᴄᴇ ɴᴀᴏ ᴇsᴛᴀ́ ᴇᴍ ɴᴇɴʜᴜᴍ ʙᴀɴᴅᴏ*\n\n> Use ${prefix}criarbando <nome> pra fundar o seu.`,
[{ display_text: '⛵ Criar Bando', id: `${prefix}criarbando` }]);
}

const membros = bando.membros.map(jid => {
const p = getPlayer(db, jid);
const tag = jid === bando.capitao ? '👑' : '⚓';
return `${tag} ${p ? p.nome : jid.split('@')[0]} — Nv. ${p ? p.nivel : '?'}`;
}).join('\n');

let texto = `*🏴‍☠️『 ${bando.nome} 』🏴‍☠️*\n\n` +
`🆔 ID: \`${bando.id}\`\n👥 Membros: ${bando.membros.length}/${MEMBROS_MAX}\n\n` +
`*Tripulação:*\n${membros}`;

if (bando.capitao === sender && bando.convites.length) {
texto += `\n\n*✉️ Convites pendentes:*\n` + bando.convites.map(j => `• ${j.split('@')[0]}`).join('\n');
}

const botoes = [{ display_text: '🏃 Sair do Bando', id: `${prefix}sairbando` }];
if (bando.capitao === sender) botoes.unshift({ display_text: '✉️ Convidar', id: `${prefix}convidarbando` });

await responder(ctx, texto, botoes);
},
};
