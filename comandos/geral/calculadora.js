// Calculadora sem eval(): antes o texto do usuário ia direto para eval (dava pra executar código
// no servidor com truques de JS) e qualquer erro de digitação derrubava o comando.
function calcular(expr) {
const s = String(expr)
.replace(/[x×]/gi, '*')
.replace(/÷/g, '/')
.replace(/,/g, '.')
.replace(/\s+/g, '');
if (!s) throw new Error('vazio');
if (!/^[\d.+\-*/%^()]+$/.test(s)) throw new Error('caractere inválido');
let i = 0;
const peek = () => s[i];
const numero = () => {
const ini = i;
while (/[\d.]/.test(s[i] || '')) i++;
const n = Number(s.slice(ini, i));
if (ini === i || Number.isNaN(n)) throw new Error('número inválido');
return n;
};
const fator = () => {
if (peek() === '+') { i++; return fator(); }
if (peek() === '-') { i++; return -fator(); }
if (peek() === '(') {
i++;
const v = soma();
if (peek() !== ')') throw new Error('parêntese aberto');
i++;
return v;
}
return numero();
};
const potencia = () => {
const base = fator();
if (peek() === '^') { i++; return base ** potencia(); }
return base;
};
const produto = () => {
let v = potencia();
while (['*', '/', '%'].includes(peek())) {
const op = s[i++];
const d = potencia();
v = op === '*' ? v * d : op === '/' ? v / d : v % d;
}
return v;
};
const soma = () => {
let v = produto();
while (['+', '-'].includes(peek())) {
const op = s[i++];
const d = produto();
v = op === '+' ? v + d : v - d;
}
return v;
};
const r = soma();
if (i < s.length) throw new Error('expressão inválida');
return r;
}

export default {
name: 'calculadora',
aliases: ['calcular', 'calc'],
category: 'geral',
description: 'Calcula uma expressão matemática simples.',
async execute(ctx) {
const { reply, q, prefix, command } = ctx;
if (!q?.trim()) return reply(`Digite a conta. Exemplo: ${prefix + command} (2+3)x4÷2`);
try {
const r = calcular(q);
if (!Number.isFinite(r)) return reply('Resultado indefinido (divisão por zero?).');
return reply(`🧮 ${q.trim()} = *${Number(r.toFixed(10))}*`);
} catch {
return reply(`Não entendi essa conta. Use números e + - x ÷ ^ % ( ). Exemplo: ${prefix + command} (2+3)x4`);
}
},
};
