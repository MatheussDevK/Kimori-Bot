import { loadRpgDB, saveRpgDB, getPlayer, ensureEstaminaFields, gastarEstamina, minutosParaProximoPonto, darItem } from '../../arquivos/funcoes/rpg/core.js';
import { ISLANDS, ensureIlhaFields } from '../../arquivos/funcoes/rpg/ilhas.js';
import { statsDoJogador, statsDoAlvo } from '../../arquivos/funcoes/rpg/combate.js';
import { responder } from '../../arquivos/funcoes/rpg/frutas.js';

const CUSTO_ESTAMINA = 15;

// Tabela de eventos aleatórios ao explorar uma ilha. Pesos somam 100.
const EVENTOS = [
{ tipo: 'nada', peso: 25 },
{ tipo: 'berries', peso: 25 },
{ tipo: 'fragmento', peso: 15 },
{ tipo: 'mapa', peso: 12 },
{ tipo: 'emboscada', peso: 23 },
];

function sortearEvento() {
const total = EVENTOS.reduce((s, e) => s + e.peso, 0);
let alvo = Math.random() * total;
for (const e of EVENTOS) {
if (alvo < e.peso) return e.tipo;
alvo -= e.peso;
}
return 'nada';
}

export default {
name: 'explorar',
category: 'rpg',
description: 'Explora a ilha atual em busca de berries, fragmentos, mapas do tesouro — ou uma emboscada.',
async execute(ctx) {
const { prefix, sender } = ctx;

const db = loadRpgDB();
const player = getPlayer(db, sender);
if (!player) {
return responder(ctx, `*ᴠᴏᴄᴇ ᴀɪɴᴅᴀ ɴᴀᴏ ᴛᴇᴍ ᴜᴍ ᴘᴇʀsᴏɴᴀɢᴇᴍ*\n\n> Use ${prefix}criarrpg pra criar o seu.`,
[{ display_text: '🎮 Criar Personagem', id: `${prefix}criarrpg` }]);
}
ensureIlhaFields(player);
ensureEstaminaFields(player);

if (player.combate) {
saveRpgDB(db);
return responder(ctx, `*ᴠᴏᴄᴇ ᴇsᴛᴀ́ ᴇᴍ ᴄᴏᴍʙᴀᴛᴇ* — termine com ${prefix}golpe ou ${prefix}fugir antes de explorar.`, null);
}

if (!gastarEstamina(player, CUSTO_ESTAMINA)) {
saveRpgDB(db);
const minutos = Math.ceil(minutosParaProximoPonto(player));
return responder(ctx,
`*⚡ ᴇsᴛᴀᴍɪɴᴀ ɪɴsᴜғɪᴄɪᴇɴᴛᴇ*\n\nExplorar custa ${CUSTO_ESTAMINA} de estamina.\n🔋 Você tem: ${player.estamina}/100\n⏳ Próximo ponto em: ${minutos}min`,
[{ display_text: '⚡ Ver Estamina', id: `${prefix}estamina` }]);
}

const ilha = ISLANDS[player.ilhaAtual];
let evento = sortearEvento();
if (evento === 'emboscada' && (!ilha.npcs || !ilha.npcs.length)) evento = 'berries';

let texto = `*🧭『 ᴇxᴘʟᴏʀᴀɴᴅᴏ ${ilha.emoji} ${ilha.nome} 』🧭*\n\n`;

if (evento === 'nada') {
texto += `_Você vasculhou a ilha, mas não achou nada de interessante dessa vez._`;
}

if (evento === 'berries') {
const ganho = Math.round(15 + player.nivel * 1.5 + Math.random() * 30);
player.berries += ganho;
texto += `💰 Você achou um saquinho de berries perdido!\n*+฿ ${ganho}*`;
}

if (evento === 'fragmento') {
const ganho = 1 + Math.floor(Math.random() * 2);
player.fragmentos = (player.fragmentos || 0) + ganho;
texto += `💎 Você encontrou fragmentos escondidos numa fenda!\n*+${ganho} fragmento(s)*`;
}

if (evento === 'mapa') {
darItem(player, 'mapa_tesouro', 1);
texto += `🗺️ Você achou um *Mapa do Tesouro* enterrado!\n> Use ${prefix}cavar pra desenterrar o que ele indica.`;
}

if (evento === 'emboscada') {
const npc = ilha.npcs[Math.floor(Math.random() * ilha.npcs.length)];
const alvo = { ...npc, tipo: 'npc' };
const jogadorStats = statsDoJogador(player);
const alvoStats = statsDoAlvo(alvo);

player.combate = {
ilha: player.ilhaAtual,
alvoTipo: alvo.tipo,
alvoKey: alvo.key,
alvoNome: alvo.nome,
alvoNivel: alvo.nivel,
respawnMin: null,
hpJogador: Math.round(jogadorStats.hpMax),
hpJogadorMax: Math.round(jogadorStats.hpMax),
hpAlvo: alvoStats.hpMax,
hpAlvoMax: alvoStats.hpMax,
};

texto += `⚠️ *EMBOSCADA!*\n\n👤 *${alvo.nome}* (Lv. ${alvo.nivel}) apareceu do nada e já parte pra cima!\n\n` +
`Escolha seu golpe: *C* / *X* / *F* / *O*${player.transformacaoDesbloqueada ? ' / *V*' : ''}`;
}

saveRpgDB(db);

const botoes = evento === 'emboscada'
? [{ display_text: '👊 Golpe C', id: `${prefix}golpe C` }, { display_text: '🏃 Fugir', id: `${prefix}fugir` }]
: [{ display_text: '🧭 Explorar de Novo', id: `${prefix}explorar` }];

await responder(ctx, texto, botoes);
},
};
