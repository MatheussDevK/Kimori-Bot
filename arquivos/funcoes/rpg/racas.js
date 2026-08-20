// As 7 raças previstas pro sistema. `obtainable: true` são as que já podem
// ser sorteadas na criação do personagem ou no reroll — as demais ficam
// registradas aqui (pra já existir estrutura/nome/descrição) mas não saem
// no sorteio até serem liberadas.
const RACAS = {
human: {
nome: 'Humano',
emoji: '🧑',
obtainable: true,
descricao: 'Focado em dano bruto e versatilidade. Aumenta o dano de ataques conforme perde vida e concede bônus massivos de dano crítico e velocidade.',
combate: { critChance: 0.15, furiaBaixaVida: true },
},
mink: {
nome: 'Mink (Coelho)',
emoji: '🐰',
obtainable: true,
descricao: 'Focado em extrema agilidade. Concede aumento nativo na velocidade de movimento, corrida rápida aprimorada e capacidade de desviar ou criar ataques rápidos de raio/tornado.',
combate: { esquiva: 0.20 },
},
shark: {
nome: 'Tubarão (Shark)',
emoji: '🦈',
obtainable: true,
descricao: 'Focado em defesa. Garante imunidade a dano na água (não toma dano afogando) e cria um escudo protetor que reduz drasticamente o dano recebido e anula combos inimigos.',
combate: { reducaoDano: 0.25, bloqueioChance: 0.15 },
},
angel: {
nome: 'Anjo (Angel)',
emoji: '👼',
obtainable: true,
descricao: 'Focado em mobilidade aérea e controle. Melhora o pulo e o tempo de voo, além de curar o usuário, roubar energia e paralisar/enfraquecer inimigos próximos no estilo "Haki do Rei".',
combate: { curaPorTurno: 0.08, enfraquecerChance: 0.25 },
},
ghoul: {
nome: 'Ghoul',
emoji: '🩸',
obtainable: false,
descricao: 'Focado em roubo de vida (life steal). Permite recuperar HP com base no dano causado por estilos de luta, além de receber bônus de velocidade e força durante a noite.',
combate: { lifesteal: 0.20, bonusNoturno: 0.15 },
},
cyborg: {
nome: 'Cyborg',
emoji: '🤖',
obtainable: false,
descricao: 'Focado em energia e dano em área. Reduz o dano recebido, drena a energia ou o Instinto dos oponentes e gera pequenas explosões elétricas de dano ao redor do jogador.',
combate: { reducaoDano: 0.15, reduzCritInimigo: 0.10, aoeChance: 0.15 },
},
draco: {
nome: 'Draco',
emoji: '🐉',
obtainable: false,
descricao: 'Atributos ainda não definidos.',
combate: {},
},
};

function racasObtenveis() {
return Object.entries(RACAS).filter(([, r]) => r.obtainable).map(([key]) => key);
}

function sortearRaca() {
const disponiveis = racasObtenveis();
return disponiveis[Math.floor(Math.random() * disponiveis.length)];
}

module.exports = {
RACAS,
racasObtenveis,
sortearRaca,
};
