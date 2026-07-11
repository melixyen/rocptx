/**
 * 打包流程用：把 out_data/*.json clone 一份到 dist/out_data/
 * 由 npm run build:all 呼叫，讓發佈的 dist 直接帶著可供 URL 載入的外部資料。
 */
const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '../out_data');
const DEST = path.resolve(__dirname, '../dist/out_data');

if (!fs.existsSync(SRC)) {
    console.error('out_data/ 不存在，略過複製');
    process.exit(0);
}
fs.mkdirSync(DEST, { recursive: true });

let count = 0, bytes = 0;
for (const f of fs.readdirSync(SRC).filter((f) => f.endsWith('.json'))) {
    fs.copyFileSync(path.join(SRC, f), path.join(DEST, f));
    bytes += fs.statSync(path.join(SRC, f)).size;
    count++;
}
console.log(`out_data → dist/out_data：複製 ${count} 檔，共 ${(bytes / 1024).toFixed(0)}KB`);
