/**
 * out_data 層靜態資料下載器（不打包進 library、純資料保存的大體積 JSON）
 *
 * 下載目標：out_data/（打包時由 copy-out-data.js clone 到 dist/out_data/）
 * 內容：各公司票價 fare 包、THSR / TRA 定期時刻表 time 包
 * 使用端載入方式見 src/datax.js 的 loadOutDataByURL / loadOutDataByFile。
 *
 * 用法：
 *   node nodejs/catch_out_data.js                  # 下載全部 out_data 層資料包
 *   node nodejs/catch_out_data.js --only fare      # 只更新檔名含 fare 的包
 *   node nodejs/catch_out_data.js --only tra,thsr  # 逗號分隔多關鍵字
 *   node nodejs/catch_out_data.js --dry-run        # 只抓取與驗證，不寫檔
 *   node nodejs/catch_out_data.js --list           # 列出此層全部資料包
 *
 * 與 datax 層共用同一套契約驗證（nodejs/datax-schema.js）與縮水保護，
 * manifest 與流程定義在 nodejs/datax-runner.js。
 */
const { runUpdate } = require('./datax-runner');

runUpdate({ location: 'out_data', argv: process.argv }).catch((e) => { console.error(e); process.exit(1); });
