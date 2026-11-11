export default {
name: 'revelar',
aliases: ['rvisu', 'open'],
category: 'geral',
description: 'Revela uma mídia de visualização única (imagem, vídeo ou áudio) citada.',
async execute(ctx) {
const { reply, reagir, from, info, reenviarVisualizacaoUnica } = ctx;

await reagir(from, "👀");

// baixa e descriptografa a mídia antes de reenviar
// (antes reenviava a URL do arquivo criptografado e a mídia chegava corrompida)
const citada = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
try {
const enviado = await reenviarVisualizacaoUnica(from, citada || info.message);
if (!enviado) reply("• Marque uma Imagem, video ou áudio em visualização única.");
} catch (e) {
console.log('[REVELAR]', e?.message || e);
reply('Não consegui baixar essa mídia (ela pode ter expirado).');
}
},
};
