// :setarkey sua_key — troca a key da OrbitalApis da bot (APIKEY_KIMORI no config.json).
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import axios from 'axios';
import { loadJSON } from '../../arquivos/funcoes/jsonCache.js';
const CONFIG_URL = new URL('../../config-bot/config.json', import.meta.url);
const config = loadJSON(CONFIG_URL);

export default {
name: 'setarkey',
aliases: ['setkey', 'trocarkey'],
category: 'dono',
description: 'Salva/troca a key da OrbitalApis usada pela bot. Apenas dono.',
async execute(ctx) {
const { reply, SoDono, mess, prefix, q, from, info, kiimorizinha, isGroup } = ctx;
if (!SoDono) return reply(mess.onlyOwner());
const key = String(q || '').replace(/^[\s"'`“”‘’]+|[\s"'`“”‘’]+$/g, '').trim();
if (!key || /\s/.test(key) || key.length < 6) return reply(`*Use:* ${prefix}setarkey sua_key\n_De preferência no privado._`);
if (isGroup) await kiimorizinha.sendMessage(from, { delete: info.key }).catch(() => {});

const site = String(config.API_KIMORI_URL || 'https://api.orbitalcode.online').replace(/\/+$/, '');
let d = null, status = 0;
try {
const r = await axios.get(`${site}/api/status`, { params: { apikey: key }, timeout: 15000, validateStatus: () => true });
status = r.status; d = r.data && typeof r.data === 'object' ? r.data : null;
} catch {}
if ([401, 403, 404].includes(status)) return reply(`❌ Key não aceita: ${d?.message || d?.error || 'API Key não encontrada'}`);

config.APIKEY_KIMORI = key;
fs.writeFileSync(fileURLToPath(CONFIG_URL), JSON.stringify(config, null, 2) + '\n');
const masc = key.length <= 8 ? '****' : `${key.slice(0, 4)}****${key.slice(-4)}`;
return reply(status === 200 && d?.success
? `✅ Key ${masc} salva e funcionando!\n🎟️ Restantes: *${d.ilimitado ? 'ilimitado' : Number(d.requests_restantes || 0).toLocaleString('pt-BR')}*`
: `⚠️ Key ${masc} salva, mas não consegui confirmar agora. Use *${prefix}apistatus* depois.`);
},
};
