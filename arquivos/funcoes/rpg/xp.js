const NIVEL_MAX = 2800;

// XP necessário pra sair do nível N pro N+1. Crescimento linear — dá pra
// evoluir rápido no começo e fica mais longo conforme sobe, sem virar um
// número astronômico nem no nível 2800.
function xpParaProximoNivel(nivel) {
return 80 + nivel * 15;
}

// Adiciona XP ao jogador e sobe quantos níveis o XP acumulado permitir
// (nunca passa de NIVEL_MAX). Retorna quantos níveis subiram nessa chamada.
function addXp(player, quantidade) {
if (typeof player.nivel !== 'number') player.nivel = 1;
if (typeof player.xp !== 'number') player.xp = 0;

if (player.nivel >= NIVEL_MAX) {
player.nivel = NIVEL_MAX;
player.xp = 0;
return 0;
}

player.xp += Math.max(0, Math.floor(quantidade));
let subiu = 0;

while (player.nivel < NIVEL_MAX && player.xp >= xpParaProximoNivel(player.nivel)) {
player.xp -= xpParaProximoNivel(player.nivel);
player.nivel += 1;
subiu += 1;
}

if (player.nivel >= NIVEL_MAX) {
player.nivel = NIVEL_MAX;
player.xp = 0;
}

return subiu;
}

module.exports = {
NIVEL_MAX,
xpParaProximoNivel,
addXp,
};
