// rota nova da API: /api/download/youtube-beta/video (ver arquivos/funcoes/youtube.js)
import { comandoYoutube } from '../../arquivos/funcoes/youtube.js';

export default comandoYoutube({
name: "systemvideo",
description: "Baixa um vídeo do YouTube (botão do play, com cache).",
tipo: "video",
aceitaId: true,
});
