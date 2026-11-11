import { writeFile } from 'node:fs/promises';
import __undici from 'undici';

const { request } = __undici;

const BASE_URL = 'https://translate.google.com/translate_tts';
const MAX_CHARS = 100;

function Text2Speech(lang = 'pt') {
    const idioma = lang.toLowerCase();

    return {
        // Junta TODAS as partes num arquivo só e chama o callback uma vez.
        // (antes cada parte sobrescrevia o arquivo e o callback rodava várias vezes)
        save: async (filepath, text, callback) => {
            try {
                const partes = dividirTexto(text);
                const total = partes.length;
                const buffers = [];

                for (let i = 0; i < total; i++) {
                    const args = gerarArgs(idioma, partes[i], i, total);
                    const { statusCode, body } = await request(BASE_URL + args, {
                        method: 'GET',
                        headers: {
                            'User-Agent': 'Mozilla/5.0'
                        }
                    });
                    if (statusCode !== 200) {
                        await body.dump?.();
                        throw new Error(`Google TTS respondeu ${statusCode}`);
                    }
                    buffers.push(Buffer.from(await body.arrayBuffer()));
                }
                await writeFile(filepath, Buffer.concat(buffers));
                if (callback) await callback(null);
            } catch (err) {
                console.error('[GTTS]', err?.message || err);
                if (callback) await callback(err);
                else throw err;
            }
        }
    };
}

function gerarArgs(lang, text, index, total) {
    const encoded = encodeURIComponent(text);
    return `?ie=UTF-8&tl=${lang}&q=${encoded}&total=${total}&idx=${index}&client=tw-ob&textlen=${text.length}`;
}

function dividirTexto(text) {
    if (!text || !String(text).trim()) throw new Error('Texto vazio');
    const partes = [];
    let buffer = '';

    // (antes pulava a primeira palavra do texto)
    for (const palavra of String(text).split(/\s+/).filter(Boolean)) {
        if (buffer && (buffer + palavra).length > MAX_CHARS) {
            partes.push(buffer.trim());
            buffer = palavra + ' ';
        } else {
            buffer += palavra + ' ';
        }
    }
    if (buffer.trim()) partes.push(buffer.trim());
    return partes;
}

export default Text2Speech;