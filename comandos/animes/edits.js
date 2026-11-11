// Edits de anime (vídeo) — rotas /api/edit/<anime>
import { apiMedia } from '../../arquivos/funcoes/orbitalApi.js';

const EDITS = {
edit: ['aleatorios', '🎬 Edit aleatório'],
editaleatorio: ['aleatorios', '🎬 Edit aleatório'],
editbleach: ['bleach', '⚔️ Edit Bleach'],
editchainsaw: ['chainsaw', '🪚 Edit Chainsaw Man'],
editdemonslayer: ['demon_slayer', '🗡️ Edit Demon Slayer'],
editdragonball: ['dragonball', '🐉 Edit Dragon Ball'],
edithunter: ['hunter_x', '🎯 Edit Hunter x Hunter'],
editjujutsu: ['jujutsu_kaisen', '👁️ Edit Jujutsu Kaisen'],
editnaruto: ['naruto', '🍥 Edit Naruto'],
};

export default {
name: 'edit',
aliases: Object.keys(EDITS).filter(k => k !== 'edit'),
category: 'animes',
description: 'Manda um edit de anime aleatório (vídeo).',
async execute(ctx) {
const { command, reagir, from, kiimorizinha, selo, pushname, prefix, ErroCase, botNome } = ctx;
const [rota, titulo] = EDITS[command] || EDITS.edit;
reagir?.(from, '🎬');
try {
const { buffer } = await apiMedia(`/api/edit/${rota}`, {}, { timeout: 180000 });
await kiimorizinha.sendMessage(from, { video: buffer, mimetype: 'video/mp4', caption: `${titulo}\n👤 Pedido por: ${pushname}` }, { quoted: selo });
reagir?.(from, '✅');
} catch (e) {
reagir?.(from, '❌');
await ErroCase(e, prefix, command, botNome);
}
},
};
