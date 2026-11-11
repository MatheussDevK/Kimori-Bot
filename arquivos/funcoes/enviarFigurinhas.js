// Busca N figurinhas numa rota da OrbitalApis e manda tudo num PACOTE de figurinhas
// (stickerPackMessage). 1 figurinha vai normal; se o pacote falhar, manda uma por uma.
import { apiMedia, textoDoErro } from './orbitalApi.js';
import { sendStickerPack } from './stickerPack.js';

export const MAX_FIGURINHAS = 20;
const BUSCAS_JUNTAS = 4;
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

export async function enviarFigurinhasApi(ctx, rota, nomePack) {
  const { reply, args, kiimorizinha, from, selo, pushname, botNome } = ctx;
  let qtd = parseInt(args?.[0]) || 1;
  if (qtd < 1) qtd = 1;
  if (qtd > MAX_FIGURINHAS) {
    return reply(`『⚠️』O máximo é ${MAX_FIGURINHAS} figurinhas por vez.`);
  }
  await reply(`*Enviando ${qtd} figurinha(s) ${nomePack}*`);

  // busca 4 por vez, sem repetir a mesma figurinha no pedido
  const figus = [];
  const vistas = new Set();
  let erro = null;
  let proxima = 0;
  const trabalhador = async () => {
    while (proxima < qtd && !erro?.fatal) {
      proxima++;
      for (let tentativa = 0; tentativa < 3; tentativa++) {
        try {
          const { buffer } = await apiMedia(rota);
          const id = buffer.length + ':' + buffer.subarray(0, 64).toString('base64');
          if (vistas.has(id) && tentativa < 2) continue;
          vistas.add(id);
          figus.push(buffer);
          break;
        } catch (e) {
          erro = e;
          if ([401, 402, 403].includes(e?.status)) { erro.fatal = true; return; }
        }
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(BUSCAS_JUNTAS, qtd) }, trabalhador));

  if (!figus.length) return reply(`『❌』Erro ao enviar figurinha: ${textoDoErro(erro || new Error('a API não mandou nada'))}`);

  if (figus.length > 1) {
    try {
      await sendStickerPack(kiimorizinha, from, figus, {
        name: `${nomePack} • ${botNome || 'Kimori'}`,
        publisher: pushname || botNome || 'Kimori',
        description: `Pedido por ${pushname || 'você'}`,
        quoted: selo
      });
      return;
    } catch (e) {
      console.log('[figurinhas] pacote falhou, mandando uma por uma:', e.message);
    }
  }

  for (const sticker of figus) {
    await kiimorizinha.sendMessage(from, { sticker }, { quoted: selo }).catch(() => {});
    await espera(500);
  }
}
