// Ajudante (não é comando): manda uma mensagem e vai editando com o texto que chega da API.
// O WhatsApp limita edições, então atualiza no máximo a cada 1,5 s e sempre manda o texto final.
export async function respostaAoVivo(sock, from, quoted, titulo, rodar) {
const enviada = await sock.sendMessage(from, { text: `${titulo}\n\n✍️ _pensando..._` }, { quoted });
let texto = '';
let ultimo = 0;
let pendente = null;
const editar = async (final = false) => {
const corpo = `${titulo}\n\n${texto || '…'}${final ? '' : ' ✍️'}`;
try { await sock.sendMessage(from, { text: corpo, edit: enviada.key }); } catch (e) { console.log('[IA-AO-VIVO] edição falhou:', e?.message); }
};
const atualizar = (novo, completo) => {
texto = completo ? novo : texto + novo;
const agora = Date.now();
if (agora - ultimo >= 1500) { ultimo = agora; editar(false); }
else if (!pendente) pendente = setTimeout(() => { pendente = null; ultimo = Date.now(); editar(false); }, 1500 - (agora - ultimo));
};
try {
await rodar(atualizar);
} finally {
if (pendente) clearTimeout(pendente);
}
if (!texto) texto = '❌ A IA não mandou resposta.';
await editar(true);
}
export default { respostaAoVivo };
