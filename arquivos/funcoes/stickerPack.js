// Envia várias figurinhas de uma vez como PACOTE (stickerPackMessage), igual ao "pacote de
// figurinhas" que o próprio WhatsApp manda. A Baileys oficial não tem isso pronto, então aqui é
// feito na mão: zip das webp + capa, criptografa, sobe no servidor de mídia do WhatsApp e
// manda a mensagem com os mesmos campos que o celular manda.
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { proto, generateWAMessageFromContent, generateMessageID } from '@whiskeysockets/baileys';

const MAX_PACK = 60;
const MAX_STICKER_BYTES = 1024 * 1024;

const sha256 = (b) => crypto.createHash('sha256').update(b).digest();
const isWebp = (b) => Buffer.isBuffer(b) && b.length > 12 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP';
// webp animada: tem chunk VP8X com o bit de animação, ou chunk ANIM
const isAnimatedWebp = (b) => {
  if (!isWebp(b)) return false;
  if (b.toString('ascii', 12, 16) === 'VP8X' && (b[20] & 0x02)) return true;
  return b.includes(Buffer.from('ANIM'));
};

// ---------- zip simples (sem compressão, webp já é comprimida) ----------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function makeZip(files) {
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const { name, data } of files) {
    const nameBuf = Buffer.from(name, 'utf8');
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6); // nomes em utf-8
    local.writeUInt16LE(0, 8); // stored
    local.writeUInt32LE(0x00210000, 10); // 01/01/1980 (data 0 é inválida pra alguns leitores)
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, nameBuf, data);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt32LE(0x00210000, 12);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, nameBuf);
    offset += 30 + nameBuf.length + data.length;
  }
  const centralBuf = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, centralBuf, end]);
}

// ---------- criptografia de mídia do WhatsApp ----------
function encryptMedia(plain, hkdfName, mediaKey = crypto.randomBytes(32)) {
  const expanded = Buffer.from(crypto.hkdfSync('sha256', mediaKey, Buffer.alloc(0), `WhatsApp ${hkdfName} Keys`, 112));
  const iv = expanded.subarray(0, 16);
  const cipherKey = expanded.subarray(16, 48);
  const macKey = expanded.subarray(48, 80);
  const cipher = crypto.createCipheriv('aes-256-cbc', cipherKey, iv);
  const enc = Buffer.concat([cipher.update(plain), cipher.final()]);
  const mac = crypto.createHmac('sha256', macKey).update(iv).update(enc).digest().subarray(0, 10);
  const body = Buffer.concat([enc, mac]);
  return { body, mediaKey, fileSha256: sha256(plain), fileEncSha256: sha256(body), fileLength: plain.length };
}

async function uploadToWhatsApp(sock, body, fileEncSha256, mediaPath, timeoutMs = 60000) {
  if (typeof sock.refreshMediaConn !== 'function') throw new Error('socket sem refreshMediaConn');
  const token = encodeURIComponent(fileEncSha256.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''));
  let lastError;
  for (let round = 0; round < 2; round++) {
    const info = await sock.refreshMediaConn(round > 0);
    for (const { hostname } of info.hosts || []) {
      try {
        const url = `https://${hostname}${mediaPath}/${token}?auth=${encodeURIComponent(info.auth)}&token=${token}`;
        const res = await fetch(url, {
          method: 'POST',
          body,
          headers: { 'Content-Type': 'application/octet-stream', Origin: 'https://web.whatsapp.com' },
          signal: AbortSignal.timeout(timeoutMs)
        });
        const json = await res.json().catch(() => ({}));
        if (json?.direct_path || json?.url) return { directPath: json.direct_path, url: json.url };
        lastError = new Error(`upload recusado (${res.status}): ${JSON.stringify(json).slice(0, 200)}`);
      } catch (err) {
        lastError = err;
      }
    }
  }
  throw lastError || new Error('falha no upload do pacote');
}

// capa 252x252 em jpeg pela ffmpeg do sistema (não funciona em webp animada → tenta a próxima)
function ffmpegThumb(webp) {
  return new Promise(async (resolve) => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'spk-')).catch(() => null);
    if (!dir) return resolve(null);
    const input = path.join(dir, 'in.webp');
    const output = path.join(dir, 'out.jpg');
    const done = async (buf) => {
      await fs.rm(dir, { recursive: true, force: true }).catch(() => {});
      resolve(buf);
    };
    try {
      await fs.writeFile(input, webp);
      const p = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-i', input, '-vf',
        'scale=252:252:force_original_aspect_ratio=decrease,pad=252:252:(ow-iw)/2:(oh-ih)/2:color=white',
        '-frames:v', '1', output], { stdio: 'ignore' });
      const timer = setTimeout(() => p.kill('SIGKILL'), 15000);
      p.on('error', () => { clearTimeout(timer); done(null); });
      p.on('close', async (code) => {
        clearTimeout(timer);
        if (code !== 0) return done(null);
        done(await fs.readFile(output).catch(() => null));
      });
    } catch {
      done(null);
    }
  });
}

/**
 * Manda as figurinhas num pacote só.
 * @param sock socket da Baileys
 * @param jid chat
 * @param stickers Buffer[] (webp)
 * @param opts { name, publisher, description, quoted, emojis }
 */
export async function sendStickerPack(sock, jid, stickers, opts = {}) {
  const webps = stickers.filter((b) => isWebp(b) && b.length <= MAX_STICKER_BYTES).slice(0, MAX_PACK);
  if (!webps.length) throw new Error('nenhuma figurinha válida pro pacote');

  const packId = generateMessageID();
  const used = new Set();
  const files = [];
  const meta = [];
  for (const webp of webps) {
    const fileName = `${sha256(webp).toString('base64').replace(/\//g, '-')}.webp`;
    if (used.has(fileName)) continue; // repetida: o zip não aceita o mesmo nome 2x
    used.add(fileName);
    files.push({ name: fileName, data: webp });
    meta.push({
      fileName,
      isAnimated: isAnimatedWebp(webp),
      emojis: opts.emojis || ['✨'],
      accessibilityLabel: '',
      isLottie: false,
      mimetype: 'image/webp'
    });
  }

  // capa da bandeja: primeira figurinha parada (ou a primeira mesmo)
  const cover = files.map((f) => f.data).find((b) => !isAnimatedWebp(b)) || files[0].data;
  const trayIconFileName = `${packId}.webp`;
  files.push({ name: trayIconFileName, data: cover });

  const zip = makeZip(files);
  const enc = encryptMedia(zip, 'Sticker Pack');
  const up = await uploadToWhatsApp(sock, enc.body, enc.fileEncSha256, '/mms/sticker-pack');

  const pack = {
    stickerPackId: packId,
    name: opts.name || 'Figurinhas',
    publisher: opts.publisher || '',
    packDescription: opts.description || '',
    stickers: meta,
    fileLength: enc.fileLength,
    fileSha256: enc.fileSha256,
    fileEncSha256: enc.fileEncSha256,
    mediaKey: enc.mediaKey,
    directPath: up.directPath,
    mediaKeyTimestamp: Math.floor(Date.now() / 1000),
    trayIconFileName,
    stickerPackSize: zip.length,
    stickerPackOrigin: proto.Message.StickerPackMessage.StickerPackOrigin.USER_CREATED
  };

  // miniatura (opcional: sem ela o pacote vai do mesmo jeito)
  try {
    let thumb = null;
    for (const f of files) {
      thumb = await ffmpegThumb(f.data);
      if (thumb) break;
    }
    if (thumb) {
      const tEnc = encryptMedia(thumb, 'Sticker Pack Thumbnail', enc.mediaKey);
      const tUp = await uploadToWhatsApp(sock, tEnc.body, tEnc.fileEncSha256, '/mms/thumbnail-sticker-pack');
      Object.assign(pack, {
        thumbnailDirectPath: tUp.directPath,
        thumbnailSha256: tEnc.fileSha256,
        thumbnailEncSha256: tEnc.fileEncSha256,
        thumbnailHeight: 252,
        thumbnailWidth: 252,
        imageDataHash: sha256(thumb).toString('base64')
      });
    }
  } catch {}

  const msg = generateWAMessageFromContent(jid, { stickerPackMessage: pack }, {
    userJid: sock.user?.id,
    quoted: opts.quoted
  });
  await sock.relayMessage(jid, msg.message, { messageId: msg.key.id });
  return { msg, count: meta.length };
}
