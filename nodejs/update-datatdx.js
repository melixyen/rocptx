/**
 * src/datatdx.js 更新工具：直接打 TDX API，把原始回應寫進 datatdx.js（不裁剪、不改寫欄位）
 *
 * 用法：
 *   node nodejs/update-datatdx.js              # 抓取全部並覆寫 src/datatdx.js
 *   node nodejs/update-datatdx.js --dry-run    # 只抓取並列出與現有檔案的筆數差異，不寫檔
 *
 * 金鑰：ROCPTX_APP_ID / ROCPTX_APP_KEY 環境變數，未設定時用 nodejs/runtime.js 內建金鑰。
 * 安全機制（同 datax-runner）：任一端點抓取失敗、回傳 0 筆，或筆數低於現有檔案 60%（縮水保護）
 * 即中止，不寫檔，避免把舊資料洗掉。
 */
const fs = require('node:fs');
const path = require('node:path');
const { resolveCredentials } = require('./runtime');

const TARGET = path.join(__dirname, '..', 'src', 'datatdx.js');
const TOKEN_URL = 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token';
const API_BASE = 'https://tdx.transportdata.tw/api/basic';

// 順序即輸出順序；pick 用於 v3 包了一層物件的回應（Stations / Lines）
const metro = (name, comment) => ({
    name, comment,
    station: { url: `/v2/Rail/Metro/Station/${name}` },
    line: { url: `/v2/Rail/Metro/Line/${name}` }
});
const SYSTEMS = [
    { name: 'TRA', comment: '臺灣鐵路（v3）', station: { url: '/v3/Rail/TRA/Station', pick: 'Stations' }, line: { url: '/v3/Rail/TRA/Line', pick: 'Lines' } },
    { name: 'AFR', comment: '阿里山林業鐵路（v3）', station: { url: '/v3/Rail/AFR/Station', pick: 'Stations' }, line: { url: '/v3/Rail/AFR/Line', pick: 'Lines' } },
    { name: 'THSR', comment: '臺灣高鐵（v2，無 v3）', station: { url: '/v2/Rail/THSR/Station' }, line: { url: '/v2/Rail/THSR/StationOfLine' } },
    metro('TRTC', '臺北捷運'),
    metro('KRTC', '高雄捷運'),
    metro('TYMC', '桃園捷運'),
    metro('TMRT', '臺中捷運'),
    metro('NTMC', '新北捷運（環狀線、三鶯線）'),
    metro('KLRT', '高雄輕軌'),
    metro('NTDLRT', '新北淡海輕軌'),
    metro('NTALRT', '新北安坑輕軌')
];

const HEADER = `/**
 * datatdx.js — 全台軌道運輸（鐵路 / 捷運 / 輕軌）車站與路線原始資料
 *
 * 資料來源：TDX 運輸資料流通服務。鐵路優先採用 V3 版（THSR 無 v3，採 v2）。
 * name    ：TDX 業者代號 / RailSystem 代號。KLRT、NTDLRT、NTALRT、AFR 未列於
 *           /v2/Rail/Operator，但屬軌道運輸且 data.js 亦分列為獨立系統，故一併收錄。
 * contents：TDX API 回應的原始物件，未做欄位裁剪或改寫。
 *
 * 與 src/data.js 的對應關係（可直接交叉比對）：
 *   - 捷運 / 輕軌 / THSR：contents[].StationID  ↔  data.js  <公司>.station_ary[].StationID（陣列）
 *   - 臺鐵 TRA          ：contents[].StationID  ↔  data.js  tra.station_ary[].v3id（v3 站碼）
 *   - 路線              ：contents[].LineID     ↔  data.js  <公司>.line[].LineID
 *                         臺鐵為 data.js  tra.line[].v3LineID
 *
 * 更新方式：node nodejs/update-datatdx.js（此檔由該工具自動產生，請勿手動編輯）。
 */
`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getToken() {
    const { appId, appKey } = resolveCredentials();
    const res = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ grant_type: 'client_credentials', client_id: appId, client_secret: appKey })
    });
    if (!res.ok) throw new Error(`取得 token 失敗：HTTP ${res.status}`);
    return (await res.json()).access_token;
}

// TDX 配額為固定 60 秒窗口：429 時依退避序列（Retry-After 更長則採用）重試，累計等待超過 90 秒才放棄
const RETRY_DELAYS = [2000, 5000, 10000, 15000, 20000];
const RETRY_BUDGET_MS = 90 * 1000;

async function fetchJSON(token, url) {
    let waited = 0;
    for (let attempt = 0; ; attempt++) {
        const res = await fetch(`${API_BASE}${url}?$format=JSON`, { headers: { authorization: `Bearer ${token}` } });
        if (res.ok) return res.json();
        const retryable = res.status === 429 || res.status >= 500;
        let delay = RETRY_DELAYS[Math.min(attempt, RETRY_DELAYS.length - 1)];
        const retryAfter = parseInt(res.headers.get('retry-after'), 10);
        if (retryAfter * 1000 > delay) delay = retryAfter * 1000;
        if (!retryable || waited + delay > RETRY_BUDGET_MS) throw new Error(`${url} HTTP ${res.status}`);
        process.stdout.write(`  ${url} HTTP ${res.status}，${delay / 1000}s 後重試\n`);
        await sleep(delay);
        waited += delay;
    }
}

function renderSection(key, results) {
    const groups = SYSTEMS.map((sys) => {
        const rows = results[sys.name][key].map((o) => `            ${JSON.stringify(o)}`).join(',\n');
        return `{
            //${sys.comment}
            name: "${sys.name}",
            contents: [
${rows}
            ]
        }`;
    });
    return `    ${key.toUpperCase()}: [
        ${groups.join(',         ')}
    ]`;
}

function render(results) {
    return `${HEADER}var dataTDX = {
${renderSection('station', results)},
${renderSection('line', results)}
}

export default dataTDX;
`;
}

// 從現有 datatdx.js 讀出各群組筆數，用於差異報告
async function loadCurrentCounts() {
    if (!fs.existsSync(TARGET)) return null;
    const src = fs.readFileSync(TARGET, 'utf8').replace('export default dataTDX;', 'return dataTDX;');
    const data = new Function(src)();
    const counts = {};
    for (const key of ['STATION', 'LINE']) {
        for (const g of data[key] || []) counts[`${key}:${g.name}`] = g.contents.length;
    }
    return counts;
}

async function main() {
    const dryRun = process.argv.includes('--dry-run');
    console.log('連線 TDX 取得 token...');
    const token = await getToken();

    const results = {};
    for (const sys of SYSTEMS) {
        results[sys.name] = {};
        for (const key of ['station', 'line']) {
            const { url, pick } = sys[key];
            const body = await fetchJSON(token, url);
            const rows = pick ? body[pick] : body;
            if (!Array.isArray(rows) || !rows.length) throw new Error(`${url} 回傳 0 筆或格式不符，中止（未寫檔）`);
            results[sys.name][key] = rows;
            console.log(`✓ ${sys.name.padEnd(6)} ${key.padEnd(7)} ${String(rows.length).padStart(4)} 筆  ${url}`);
            await sleep(1200);
        }
    }

    const before = await loadCurrentCounts();
    const shrunk = [];
    if (before) {
        console.log('\n========== 筆數差異（現有 → 新） ==========');
        for (const sys of SYSTEMS) {
            for (const key of ['station', 'line']) {
                const k = `${key.toUpperCase()}:${sys.name}`;
                const now = results[sys.name][key].length;
                const old = before[k] ?? 0;
                if (old !== now) console.log(`${k.padEnd(16)} ${old} → ${now}`);
                if (now < old * 0.6) shrunk.push(`${k} ${old} → ${now}`);
            }
        }
    }
    if (shrunk.length) throw new Error(`縮水保護：新資料低於現有 60%，中止（未寫檔）：${shrunk.join('、')}`);

    if (dryRun) {
        console.log('\n--dry-run：未寫檔');
        return;
    }
    fs.writeFileSync(TARGET, render(results));
    console.log(`\n已寫入 ${path.relative(process.cwd(), TARGET)}`);
}

main().catch((e) => { console.error(e.message || e); process.exit(1); });
