// Sessão do WhatsApp em arquivos (substitui o useMultiFileAuthState do Baileys).
//
// O do Baileys grava direto por cima do arquivo. Se o disco enche no meio (ENOSPC), o
// creds.json fica vazio/cortado e o bot perde a sessão (precisa parear de novo).
// Aqui cada gravação vai para um .tmp e só depois troca pelo arquivo real (rename é atômico),
// então o arquivo antigo continua inteiro se a gravação falhar. Também:
// - não regrava o creds.json se nada mudou (o Baileys chama saveCreds o tempo todo);
// - mantém uma cópia creds.json.bak e usa ela se o creds.json estiver corrompido.
import fs from 'node:fs';
import path from 'node:path';
import { initAuthCreds, BufferJSON, proto } from '@whiskeysockets/baileys';

const filas = new Map();
// serializa operações no mesmo arquivo (equivalente ao Mutex do Baileys, sem dependência)
function naFila(arquivo, fn) {
const anterior = filas.get(arquivo) || Promise.resolve();
const atual = anterior.catch(() => {}).then(fn);
const fim = atual.catch(() => {}).finally(() => { if (filas.get(arquivo) === fim) filas.delete(arquivo); });
filas.set(arquivo, fim);
return atual;
}

const fixFileName = (file) => file?.replace(/\//g, '__')?.replace(/:/g, '-');

async function gravarAtomico(destino, texto) {
const tmp = `${destino}.${process.pid}.${Math.random().toString(36).slice(2, 8)}.tmp`;
try {
await fs.promises.writeFile(tmp, texto);
await fs.promises.rename(tmp, destino);
} catch (e) {
fs.promises.unlink(tmp).catch(() => {});
if (e?.code === 'ENOSPC') global.__kimoriLimpezaEmergencia?.();
throw e;
}
}

export async function useAtomicAuthState(folder) {
await fs.promises.mkdir(folder, { recursive: true });
const caminho = (file) => path.join(folder, fixFileName(file));

const writeData = (data, file) => {
const destino = caminho(file);
return naFila(destino, () => gravarAtomico(destino, JSON.stringify(data, BufferJSON.replacer)))
.catch(e => {
console.error(`[SESSÃO] não consegui gravar ${file}: ${e?.code || e?.message || e}`);
throw e; // o Baileys tenta a transação de novo (transactionOpts.maxCommitRetries)
});
};

const readData = async (file) => {
const destino = caminho(file);
return naFila(destino, async () => {
try {
const texto = await fs.promises.readFile(destino, 'utf-8');
if (!texto.trim()) return null;
return JSON.parse(texto, BufferJSON.reviver);
} catch { return null; }
});
};

const removeData = (file) => {
const destino = caminho(file);
return naFila(destino, () => fs.promises.unlink(destino).catch(() => {}));
};

// creds: arquivo principal -> cópia de segurança -> novo
let creds = await readData('creds.json');
if (!creds) {
const bak = await readData('creds.json.bak');
if (bak) {
console.log('[SESSÃO] creds.json estava vazio/corrompido: restaurado da cópia de segurança.');
creds = bak;
}
}
creds ||= initAuthCreds();

let ultimoCreds = '';
let ultimoBak = 0;
const saveCreds = async () => {
const texto = JSON.stringify(creds, BufferJSON.replacer);
if (texto === ultimoCreds) return;
const destino = caminho('creds.json');
await naFila(destino, async () => {
await gravarAtomico(destino, texto);
ultimoCreds = texto;
// cópia de segurança no máximo a cada 10 min
if (Date.now() - ultimoBak > 10 * 60 * 1000) {
ultimoBak = Date.now();
await gravarAtomico(caminho('creds.json.bak'), texto).catch(() => {});
}
}).catch(e => console.error(`[SESSÃO] não consegui gravar creds.json: ${e?.code || e?.message || e}`));
};

return {
state: {
creds,
keys: {
get: async (type, ids) => {
const data = {};
await Promise.all(ids.map(async (id) => {
let value = await readData(`${type}-${id}.json`);
if (type === 'app-state-sync-key' && value) {
value = proto.Message.AppStateSyncKeyData.fromObject(value);
}
data[id] = value;
}));
return data;
},
set: async (data) => {
const tarefas = [];
for (const category in data) {
for (const id in data[category]) {
const value = data[category][id];
const file = `${category}-${id}.json`;
tarefas.push(value ? writeData(value, file) : removeData(file));
}
}
await Promise.all(tarefas);
}
}
},
saveCreds
};
}

export default { useAtomicAuthState };
