import { loadRpgDB, getPlayer, ensureAllFields, saveRpgDB } from '../../arquivos/funcoes/rpg/core.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

export default {
name: 'rankrecompensa',
category: 'rpg',
description: 'Mostra o top 10 de jogadores com maior recompensa (bounty) no MenuRpg.',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();

const top10 = [...db]
.filter(p => (p.recompensa || 0) > 0)
.sort((a, b) => (b.recompensa || 0) - (a.recompensa || 0))
.slice(0, 10);

if (!top10.length) {
return responder(ctx, `*ɴɪɴɢᴜᴇ́ᴍ ᴛᴇᴍ ʀᴇᴄᴏᴍᴘᴇɴsᴀ ᴀɪɴᴅᴀ*\n\n> Derrote chefes ou vença duelos pra ser o primeiro do ranking.`, null);
}

const medalhas = ['🥇', '🥈', '🥉'];
const texto = `*☠️『 𝗧𝗼𝗽 𝟭𝟬 — 𝗠𝗮𝗶𝘀 𝗣𝗿𝗼𝗰𝘂𝗿𝗮𝗱𝗼𝘀 』☠️*\n\n` +
top10.map((p, i) => {
const pos = medalhas[i] || `${i + 1}º`;
const voce = p.jid === sender ? ' (você)' : '';
return `${pos} *${p.nome}*${voce} — ฿ ${(p.recompensa || 0).toLocaleString('pt-BR')}`;
}).join('\n');

await responder(ctx, texto, [{ display_text: '☠️ Minha Recompensa', id: `${prefix}recompensa` }]);
},
};
