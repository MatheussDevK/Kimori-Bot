// update check | update start — atualizações da Kimori pela OrbitalApis.
// check: grátis. start: consome 100 requests da key (APIKEY_KIMORI), devolvidos pela API se falhar.
import { consultarAtualizacao, instalarAtualizacao, notasPendentes, formatarTamanho } from '../../arquivos/funcoes/kimoriUpdate.js';

let instalando = false;

export default {
name: 'update',
category: 'dono',
description: 'Verifica (check) ou instala (start) a atualização mais recente da Kimori pela OrbitalApis. Apenas dono.',
async execute(ctx) {
const { reply, mess, SoDono, q, prefix, from } = ctx;

if (!SoDono) return reply(mess.onlyOwner());

const acao = String(q || '').trim().toLowerCase();
if (acao !== 'check' && acao !== 'start') {
return reply(`*Use:*\n• ${prefix}update check\n• ${prefix}update start _(consome 100 requests)_`);
}

let r;
try {
r = await consultarAtualizacao();
} catch (e) {
return reply(`*Não consegui verificar as atualizações.*\n> ${e.message}`);
}

if (!r.info) return reply('*𝙽𝚎𝚗𝚑𝚞𝚖𝚊 𝚊𝚝𝚞𝚊𝚕𝚒𝚣𝚊𝚌̧𝚊̃𝚘 𝚍𝚒𝚜𝚙𝚘𝚗𝚒𝚟𝚎𝚕.*');

if (!r.tem) {
return reply(`*✅ 𝚅𝚘𝚌𝚎̂ 𝚓𝚊́ 𝚎𝚜𝚝𝚊́ 𝚗𝚊 𝚞𝚕𝚝𝚒𝚖𝚊 𝚟𝚎𝚛𝚜𝚊̃𝚘.*\n\nVersão atual: ${r.atual}`);
}

const qtd = r.info.pending?.length || 1;
if (acao === 'check') {
return reply(
`*『𝙉𝙀𝙒 𝙐𝙋𝘿𝘼𝙏𝙀』*\n\n` +
`• Versão atual: ${r.atual}\n` +
`• Nova versão: ${r.info.version}${qtd > 1 ? ` _(${qtd} versões de uma vez)_` : ''}\n` +
`• Tamanho: ${formatarTamanho(r.info.sizeBytesTotal ?? r.info.sizeBytes)}\n` +
`• Publicada em: ${new Date(r.info.releaseDate).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}\n\n` +
`*Notas da atualização:*\n${notasPendentes(r.info)}\n\n` +
`> Use ${prefix}update start pra instalar (consome ${r.info.cost || 100} requests da sua key).`
);
}

// start
if (instalando) return reply('*Já tem uma atualização sendo instalada, aguarde.*');
instalando = true;
try {
await reply(`*『⬇️』 𝙱𝚊𝚒𝚡𝚊𝚗𝚍𝚘 𝚊𝚝𝚞𝚊𝚕𝚒𝚣𝚊𝚌̧𝚊̃𝚘 ${r.atual} ➜ ${r.info.version}...*`);
const res = await instalarAtualizacao({ from });
let msg = `*『✅』𝙰𝚝𝚞𝚊𝚕𝚒𝚣𝚊𝚍𝚊 𝚙𝚊𝚛𝚊 ${res.para}!* (${res.arquivos} arquivo(s))`;
if (res.ignorados.length) msg += `\n> ${res.ignorados.length} arquivo(s) protegido(s) não foram mexidos.`;
if (res.npm && !res.npm.ok) msg += `\n\n⚠️ As dependências novas não instalaram sozinhas. Rode *npm install* no servidor.\n> ${res.npm.erro}`;
else if (res.npm?.ok) msg += '\n> Dependências novas instaladas.';
if (res.restante) msg += `\n> Requests restantes na key: ${res.restante}`;
msg += '\n\n*𝙴𝚜𝚝𝚘𝚞 𝚛𝚎𝚒𝚗𝚒𝚌𝚒𝚊𝚗𝚍𝚘...*';
await reply(msg);
// o aviso "atualizado com sucesso" vai depois do reinício (connect.js lê o marcador)
setTimeout(() => process.exit(0), 1500);
} catch (e) {
instalando = false;
console.log('[UPDATE]', e);
reply(`*❌ ᴇʀʀᴏ ᴀᴏ ɪɴsᴛᴀʟᴀʀ ᴀ ᴀᴛᴜᴀʟɪᴢᴀᴄ̧ᴀ̃ᴏ:* ${e.message}`);
}
},
};
