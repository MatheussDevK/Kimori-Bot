// Ajuste automático de menções para TODAS as mensagens enviadas pelo bot.
//
// Problemas que isso resolve:
// 1. Em grupos com LID, o texto vinha com "@<telefone>" mas a menção era o LID (ou o contrário):
//    o WhatsApp notificava, mas mostrava o número cru em vez do nome (menção "quebrada").
// 2. Menção com JID de telefone (numero@s.whatsapp.net) num grupo que usa LID.
// 3. "mentions" com null/undefined (ex.: [menc_os2] sem ninguém marcado) — o Baileys podia dar erro.
// 4. "mentions" e "contextInfo.mentionedJid" diferentes: o contextInfo sobrescrevia o mentions.
// 5. Texto com "@numero" mandado por reply() (sem lista de menções): ninguém era marcado.

const RE_DIGITOS = /@(\d{5,})(?!\d)/g;

function normalizarJid(valor) {
if (!valor) return null;
let s = String(valor).trim();
if (!s) return null;
s = s.replace(/:\d+(?=@)/, ''); // remove o sufixo de aparelho (123:4@s.whatsapp.net)
if (!s.includes('@')) {
const d = s.replace(/\D/g, '');
if (!d) return null;
// LIDs têm 14+ dígitos; números de telefone têm até 13
return d.length >= 14 ? `${d}@lid` : `${d}@s.whatsapp.net`;
}
const [user, server] = s.split('@');
if (!user || !server) return null;
return `${user}@${server}`;
}

const usuario = (jid) => String(jid || '').split('@')[0];

function trocarNoTexto(texto, de, para) {
if (!de || !para || de === para) return texto;
return texto.replace(new RegExp(`@${de}(?!\\d)`, 'g'), `@${para}`);
}

// Índices dos participantes do grupo: id -> jid, telefone -> jid usado no grupo
function indexarParticipantes(participantes) {
const porUsuario = new Map(); // dígitos do id/lid -> jid do grupo
const porTelefone = new Map(); // dígitos do telefone -> jid do grupo
for (const p of participantes || []) {
const id = normalizarJid(p?.id || p?.jid);
if (!id) continue;
porUsuario.set(usuario(id), id);
const lid = normalizarJid(p?.lid);
if (lid) porUsuario.set(usuario(lid), id);
const tel = normalizarJid(p?.phoneNumber || (id.endsWith('@s.whatsapp.net') ? id : null));
if (tel) porTelefone.set(usuario(tel), id);
}
return { porUsuario, porTelefone };
}

/**
* Devolve uma cópia do conteúdo com menções coerentes.
* @param {string} chatJid destino da mensagem
* @param {object} conteudo o mesmo objeto do sendMessage
* @param {Array} participantes participantes do grupo (do cache), se houver
*/
function ajustarMencoes(chatJid, conteudo, participantes = []) {
if (!conteudo || typeof conteudo !== 'object' || Array.isArray(conteudo)) return conteudo;
const chaveTexto = typeof conteudo.text === 'string' ? 'text' : typeof conteudo.caption === 'string' ? 'caption' : null;
const ci = conteudo.contextInfo && typeof conteudo.contextInfo === 'object' ? conteudo.contextInfo : null;
const listaOriginal = [
...(Array.isArray(conteudo.mentions) ? conteudo.mentions : []),
...(Array.isArray(ci?.mentionedJid) ? ci.mentionedJid : []),
];
let texto = chaveTexto ? conteudo[chaveTexto] : '';
const temArrobaNoTexto = chaveTexto && /@\d{5,}/.test(texto);
const tinhaCampoDeMencao = 'mentions' in conteudo || (ci && 'mentionedJid' in ci);
if (!listaOriginal.length && !temArrobaNoTexto && !tinhaCampoDeMencao) return conteudo;

const ehGrupo = String(chatJid || '').endsWith('@g.us');
const { porUsuario, porTelefone } = indexarParticipantes(ehGrupo ? participantes : []);

let lista = listaOriginal.map(normalizarJid).filter(Boolean);

// JID de telefone num grupo que usa LID -> troca pelo JID do participante (e o texto junto)
lista = lista.map(jid => {
const u = usuario(jid);
if (jid.endsWith('@s.whatsapp.net') && porTelefone.has(u)) {
const doGrupo = porTelefone.get(u);
if (chaveTexto) texto = trocarNoTexto(texto, u, usuario(doGrupo));
return doGrupo;
}
if (porUsuario.has(u)) return porUsuario.get(u);
return jid;
});

if (chaveTexto) {
// menção é o LID, mas o texto tem o telefone -> escreve o @ com os dígitos certos
for (const jid of lista) {
const u = usuario(jid);
if (new RegExp(`@${u}(?!\\d)`).test(texto)) continue;
for (const [tel, idGrupo] of porTelefone) {
if (idGrupo === jid && new RegExp(`@${tel}(?!\\d)`).test(texto)) { texto = trocarNoTexto(texto, tel, u); break; }
}
}
// "@numero" no texto sem menção correspondente -> menciona quem é do grupo.
// Se a mensagem não trazia lista nenhuma (ex.: reply), menciona mesmo quem não está no grupo.
for (const m of [...texto.matchAll(RE_DIGITOS)]) {
const d = m[1];
if (lista.some(j => usuario(j) === d)) continue;
if (porUsuario.has(d)) lista.push(porUsuario.get(d));
else if (porTelefone.has(d)) {
const doGrupo = porTelefone.get(d);
texto = trocarNoTexto(texto, d, usuario(doGrupo));
lista.push(doGrupo);
} else if (!listaOriginal.length && d.length >= 10) {
lista.push(normalizarJid(d));
}
}
}

lista = [...new Set(lista)];
const saida = { ...conteudo };
if (chaveTexto) saida[chaveTexto] = texto;
if (lista.length) {
saida.mentions = lista;
if (ci) saida.contextInfo = { ...ci, mentionedJid: lista };
} else {
delete saida.mentions;
if (ci && 'mentionedJid' in ci) {
saida.contextInfo = { ...ci };
delete saida.contextInfo.mentionedJid;
}
}
return saida;
}

export { ajustarMencoes, normalizarJid };
export default { ajustarMencoes, normalizarJid };
