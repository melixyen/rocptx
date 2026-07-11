/**
 * 靜態資料下載共用核心：manifest 定義 + 抓取 / 契約驗證 / 寫檔執行器
 *
 * 每個資料包以 location 決定存放位置與用途：
 * - 'datax'    → src/datax/    直接打包進 rocptx library（小體積、載入即用）
 * - 'out_data' → out_data/     純資料保存，不 import 進 library；打包時 clone 到 dist/out_data/，
 *                              由使用端以 datax.loadOutDataByURL / loadOutDataByFile 按需載入
 *
 * 之後要把某個包在兩層之間搬移：改這裡的 location、移動 JSON 檔案，
 * 若進出 datax 層則同步增減 src/datax.js 的 import 即可。
 *
 * CLI 入口：
 * - nodejs/update-datax.js    → 更新 location='datax' 的包
 * - nodejs/catch_out_data.js  → 更新 location='out_data' 的包
 */
const fs = require('fs');
const path = require('path');
const schemas = require('./datax-schema');
const { validate, checkShrink } = require('./datax-validate');

const DIRS = {
    datax: path.resolve(__dirname, '../src/datax'),
    out_data: path.resolve(__dirname, '../out_data')
};

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// 由 v2 ODFare 陣列整理為 {Origin: {Destination: 全票價}} 映射（同 metro catchData.Fare 邏輯）
function toFareMap(list) {
    const map = {};
    for (const od of list) {
        const full = (od.Fares || []).find((f) => f.TicketType == 1 && f.FareClass == 1);
        if (!full) continue;
        if (!map[od.OriginStationID]) map[od.OriginStationID] = {};
        map[od.OriginStationID][od.DestinationStationID] = full.Price;
    }
    return map;
}

// TRA v2 ODFare 的 TicketType 為中文票種（成自/成莒/成復/成普...），
// 保留全部成人非折扣票種：{Origin: {Destination: {票種: 價}}}
function toTraFareMap(list) {
    const map = {};
    for (const od of list) {
        const fares = {};
        for (const f of od.Fares || []) {
            if (/^成/.test(f.TicketType) && !/折/.test(f.TicketType)) fares[f.TicketType] = f.Price;
        }
        if (!Object.keys(fares).length) continue;
        if (!map[od.OriginStationID]) map[od.OriginStationID] = {};
        map[od.OriginStationID][od.DestinationStationID] = fares;
    }
    return map;
}

function buildManifest(rocptx) {
    const jobs = [];
    const add = (location, file, fetch) => jobs.push({ location, file, fetch });

    // ===== Metro 六家（各家可用的包依 TDX Swagger enum 而異）=====
    // 註：站別時刻表（time 包 / catchData.TimeSimple）需對 StationTimeTable 逐站呼叫，
    //     TDX 端速度過慢且會無回應卡死，無法穩定自動下載，不在更新範圍。
    //     舊有 trtc / krtc / tymc 的 time 檔仍保留於 src/datax 供 line_time bundle 使用。
    const metroPacks = {
        trtc: ['line', 'station', 'transfer', 'fare'],
        krtc: ['line', 'station', 'transfer', 'fare'],
        tymc: ['line', 'station', 'fare'],
        ntmc: ['line', 'station', 'transfer', 'fare'],
        tmrt: ['line', 'station', 'fare'],
        klrt: ['line', 'station', 'fare']
    };
    const packFn = { line: 'Line', station: 'Station', transfer: 'Transfer', fare: 'Fare' };
    for (const [co, packs] of Object.entries(metroPacks)) {
        for (const pack of packs) {
            add(pack === 'fare' ? 'out_data' : 'datax', `${co}.${pack}.json`,
                () => rocptx[co].catchData[packFn[pack]]((msg) => process.stdout.write(`\r  ${co}.${pack}: ${msg}          `)));
        }
    }

    // ===== THSR =====
    add('datax', 'thsr.station.json', () => rocptx.thsr.v2.catchData.Station());
    add('out_data', 'thsr.time.json', () => rocptx.thsr.v2.catchData.SimpleTimetable());
    add('out_data', 'thsr.fare.json', () => rocptx.thsr.v2._ODFare({ top: 10000 }).then((e) => toFareMap(e.data)));

    // ===== TRA（v2 為主；2026-07 起 TDX 的 TRA v2 API 已改回傳 v3 站 ID）=====
    add('datax', 'tra.line.json', () => rocptx.tra.catchData.SimpleLine());
    add('datax', 'tra.station.json', () => rocptx.tra.catchData.Station());
    add('datax', 'tra.train.json', () => rocptx.tra.catchData.TrainType());
    add('out_data', 'tra.time.json', () => rocptx.tra.catchData.SimpleTimetable());
    add('out_data', 'tra.fare.json', () => rocptx.tra._ODFare({ top: 100000 }).then((e) => toTraFareMap(e.data)));

    // ===== AFR（阿里山林鐵，v3 wrapper payload）=====
    add('datax', 'afr.line.json', () => rocptx.afr.v3._Line().then((e) => e.data.Lines));
    add('datax', 'afr.station.json', () => rocptx.afr.v3._Station().then((e) => e.data.Stations));
    add('datax', 'afr.train.json', () => rocptx.afr.v3._TrainType().then((e) => e.data.TrainTypes));
    add('datax', 'afr.time.json', () => rocptx.afr.v3._GeneralTrainTimetable().then((e) => e.data.TrainTimetables));
    add('out_data', 'afr.fare.json', () => rocptx.afr.v3._ODFare().then((e) => toFareMap(e.data.ODFares)));

    // ===== Rail 共通 =====
    add('datax', 'rail.operator.json', () => rocptx.rail.v2.getOperator({ top: 100 }).then((e) => e.data));

    return jobs;
}

async function runUpdate({ location, argv }) {
    const args = argv.slice(2);
    const dryRun = args.includes('--dry-run');
    const listOnly = args.includes('--list');
    const onlyIdx = args.indexOf('--only');
    const only = onlyIdx !== -1 ? args[onlyIdx + 1] : null;

    const filterByLocation = (jobs) => jobs.filter((j) => j.location === location);

    if (listOnly) {
        const dummy = new Proxy(function () {}, { get: () => dummy, apply: () => dummy });
        filterByLocation(buildManifest(dummy)).forEach((j) => {
            console.log(`${j.file}${schemas[j.file] ? '' : '  (!! 缺 schema 契約)'}`);
        });
        return;
    }

    console.log('連線 TDX 取得 token...');
    const { getRocptx } = require('./runtime');
    const rocptx = await getRocptx();
    let jobs = filterByLocation(buildManifest(rocptx));
    if (only) {
        const keys = only.split(',').map((s) => s.trim()).filter(Boolean);
        jobs = jobs.filter((j) => keys.some((k) => j.file.includes(k)));
    }
    if (!jobs.length) {
        console.error('沒有符合條件的資料包');
        process.exit(1);
    }

    const report = [];
    for (const job of jobs) {
        const schema = schemas[job.file];
        const target = path.join(DIRS[job.location], job.file);
        const row = { file: job.file, status: 'OK', note: '' };
        try {
            if (!schema) throw new Error('缺 schema 契約，拒絕更新（請先在 nodejs/datax-schema.js 定義使用欄位）');
            process.stdout.write(`抓取 ${job.file} ...`);
            const started = Date.now();
            const data = await job.fetch();
            process.stdout.write(`\r`);
            if (data == null || (data && data.status === 'fail')) throw new Error('抓取失敗（無資料）');

            const errs = validate(data, schema, job.file);
            if (fs.existsSync(target)) {
                const oldData = JSON.parse(fs.readFileSync(target, 'utf8'));
                errs.push(...checkShrink(data, oldData, job.file));
            }
            if (errs.length) throw new Error(errs.join('; '));

            const jsonStr = JSON.stringify(data);
            const count = Array.isArray(data) ? data.length : Object.keys(data).length;
            row.note = `${count} 筆 / ${(jsonStr.length / 1024).toFixed(0)}KB / ${((Date.now() - started) / 1000).toFixed(1)}s`;
            if (dryRun) {
                row.status = 'DRY';
            } else {
                fs.writeFileSync(target, jsonStr);
            }
        } catch (e) {
            row.status = 'FAIL';
            row.note = (e && e.message) || String(e);
        }
        report.push(row);
        console.log(`${row.status === 'FAIL' ? '✗' : '✓'} ${row.file}  ${row.note}`);
        await sleep(1200);
    }

    console.log('\n========== 更新報告 ==========');
    for (const r of report) {
        console.log(`${r.status.padEnd(5)} ${r.file.padEnd(22)} ${r.note}`);
    }
    const fails = report.filter((r) => r.status === 'FAIL');
    console.log(`\n[${location}] 共 ${report.length} 包，成功 ${report.length - fails.length}，失敗 ${fails.length}`);
    if (fails.length) process.exit(1);
}

module.exports = { buildManifest, runUpdate, DIRS, toFareMap, toTraFareMap };
