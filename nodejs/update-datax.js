/**
 * datax 層靜態資料更新（會直接打包進 rocptx library 的資料）
 *
 * 用法：
 *   node nodejs/update-datax.js                    # 更新全部 datax 層資料包
 *   node nodejs/update-datax.js --only trtc        # 只更新檔名含 trtc 的包
 *   node nodejs/update-datax.js --only line,tra    # 逗號分隔多關鍵字
 *   node nodejs/update-datax.js --dry-run          # 只抓取與驗證，不寫檔
 *   node nodejs/update-datax.js --list             # 列出此層全部資料包
 *
 * out_data 層（票價 / 大型時刻表）請用 nodejs/catch_out_data.js。
 * manifest 與流程定義在 nodejs/datax-runner.js。
 */
const { runUpdate } = require('./datax-runner');

runUpdate({ location: 'datax', argv: process.argv }).catch((e) => { console.error(e); process.exit(1); });
