const os = require('os');
const v8 = require('v8');

module.exports = {
name: 'ping',
category: 'geral',
description: 'Mostra estatísticas de performance do bot (CPU, RAM, heap, ping, grupos).',
async execute(ctx) {
const {
kiimorizinha, from, getBaileysVersion, getCommandCount, measureEventLoop,
createPingMessage, botNome: NomeDoBot, ChannelContextNewsLetter, selo, reply,
} = ctx;

try {
const startTime = Date.now();
const [ cpus, mem, heap, load, freeRam, totalRam, groups, baileysVer, totalCmd, loopDelay ] = await Promise.all([ Promise.resolve(os.cpus()), Promise.resolve(process.memoryUsage()), Promise.resolve(v8.getHeapStatistics()), Promise.resolve(os.loadavg()), Promise.resolve(os.freemem()), Promise.resolve(os.totalmem()), kiimorizinha.groupFetchAllParticipating().catch(() => ({})), getBaileysVersion(), getCommandCount(), measureEventLoop() ]);
const cpuCores = cpus.length || 1;
const cpuSpeed = cpus[0]?.speed ? (cpus[0].speed / 1000).toFixed(2) + 'GHz' : '📱 ARM';
const cpuUsage = process.cpuUsage();
const cpuPercent = cpuCores > 0 ? ((cpuUsage.user + cpuUsage.system) / 1000000 / cpuCores).toFixed(2) : '0.00';
const loadStatus = load[0] > cpuCores * 2 ? '⚠️' : '✅';
const heapUsed = (mem.heapUsed / 1024 / 1024).toFixed(2);
const heapTotal = (mem.heapTotal / 1024 / 1024).toFixed(2);
const heapLimit = (heap.heap_size_limit / 1024 / 1024).toFixed(2);
const heapPercent = ((mem.heapUsed / heap.heap_size_limit) * 100).toFixed(1);
const rss = (mem.rss / 1024 / 1024).toFixed(2);
const freeRamGB = (freeRam / 1024 / 1024 / 1024).toFixed(2);
const totalRamGB = (totalRam / 1024 / 1024 / 1024).toFixed(2);
const ramPercent = (((totalRam - freeRam) / totalRam) * 100).toFixed(1);
const wsPing = Date.now() - startTime;
const ping = (Date.now() - startTime).toFixed(2);
const allGroups = await kiimorizinha.groupFetchAllParticipating();
const groupCount = Object.values(allGroups);
const msg = createPingMessage({ ping, wsPing, cpuCores, cpuSpeed, cpuPercent, load, loadStatus, heapUsed, heapTotal, heapPercent, heapLimit, rss, freeRam: freeRamGB, totalRam: totalRamGB, ramPercent, loopDelay, groupCount, baileysVer, totalCmd, botNome: NomeDoBot });
await kiimorizinha.sendMessage(from, { text: msg, contextInfo: { ...ChannelContextNewsLetter, mentionedJid: [from] } }, { quoted: selo });
} catch (e) {
console.error('[PING ERROR]', e);
await reply("❌ Erro ao processar ping."+ e);
}
},
};
