// rota nova da API: /api/download/youtube-beta/audio (ver arquivos/funcoes/youtube.js)
import { comandoYoutube } from '../../arquivos/funcoes/youtube.js';

export default comandoYoutube({
name: "systemaudio",
description: "Baixa o áudio de um vídeo do YouTube (botão do play, com cache).",
tipo: "audio",
aceitaId: true,
});
