/**
 * datax 資料格式契約
 *
 * 這份檔案記錄「SDK 程式實際會讀取的欄位」，是 update-datax.js 寫檔前的驗證依據：
 * 抓回來的新資料必須通過對應契約（欄位存在、筆數合理）才允許覆蓋舊檔，
 * 確保定期更新不會因 TDX 改格式 / 缺資料而破壞既有版本的行為。
 *
 * 欄位來源對照（誰在用）：
 * - metro line：metro.catchData.getDataXLineObj / getDataXS2STravelTime / calcStationTimeByHeadWays、router.v2 block 推導
 * - metro station：metro.catchData.getDataXStationData / getDataXStationName / calcStationTimeByHeadWays(FirstLast)
 * - metro transfer：metro.catchData.getDataXTransferOfLine / getDataXTransferStation、router.v2.findTransfer
 * - metro time：line_time / calcStationDayTimeBySimple（StationID / LineID / Direction[dir][].To/RouteID/weekStr/Timetables）
 * - metro fare：{OriginStationID: {DestinationStationID: 全票價}} 映射
 * - thsr/tra station：thsr.v2.catchData / tra.catchData 的 getDataXStationData（StationID/name/ename/lat）
 * - thsr/tra time：SimpleTimetable 輸出（weekStr / stopTime[].ID/Dep/name / info.TrainNo）
 * - tra line：SimpleLine 輸出（LineID / dir / station[].ID/name/TD）
 * - tra train：TrainType（TrainTypeID / name）
 * - afr.*：afr.v3 wrapper payload 原始陣列
 * - rail operator：/v2/Rail/Operator 原始陣列
 *
 * 路徑語法：
 * - 'A.B'    ：每個項目的 A.B 必須有定義（0 / false / '' 視為有值）
 * - 'A[]'    ：A 必須是非空陣列
 * - 'A[].B'  ：A 是非空陣列且每個元素都有 B
 * - 'A'      ：A 有定義即可（空陣列也算）
 * 規則欄位：
 * - type     ：'array' | 'object'
 * - minItems ：陣列最少筆數（防止 API 異常回空包）
 * - minKeys  ：物件最少 key 數
 * - every    ：每個項目都必須通過的路徑
 * - anyOfEvery：每個項目至少要通過其中一組路徑（例如站間時間有兩種來源格式）
 * - some     ：至少一個項目要通過的路徑
 * - custom   ：(data) => string[]，回傳錯誤訊息陣列
 */

// noFrequency：KRTC / NTMC / KLRT 的 Frequency 依 API 現況為空陣列（Swagger enum 無或無資料），
// 僅要求欄位存在；有班距資料的公司則要求至少一條線有 Headways（calcStationTimeByHeadWays 依賴）
const metroLine = (minItems, opts = {}) => ({
    type: 'array',
    minItems,
    every: ['LineID', 'Route[]', 'Route[].RouteID', 'Route[].Direction', 'Route[].Stations[]', 'Transfer', 'Frequency'],
    anyOfEvery: [['Route[].TravelTime.RunTime[]'], ['TravelTimeBetween']],
    some: opts.noFrequency ? [] : ['Frequency[].Headways[]']
});

const metroStation = (minItems) => ({
    type: 'array',
    minItems,
    every: ['StationID', 'name', 'lat'],
    some: ['FirstLast[].To', 'FirstLast[].Time[]']
});

const metroTransfer = (minItems) => ({
    type: 'array',
    minItems,
    every: ['FromLineID', 'FromStationID', 'ToLineID', 'ToStationID', 'TransferTime']
});

const metroTime = (minItems) => ({
    type: 'array',
    minItems,
    every: ['StationID', 'LineID', 'Direction'],
    custom: (data) => {
        const errs = [];
        let hasEntry = false;
        data.forEach((st, i) => {
            if (!Array.isArray(st.Direction)) { errs.push(`[${i}].Direction 應為陣列`); return; }
            st.Direction.forEach((dir, d) => {
                (dir || []).forEach((r, j) => {
                    hasEntry = true;
                    if (r.To === undefined || r.RouteID === undefined || typeof r.weekStr !== 'string' || !Array.isArray(r.Timetables)) {
                        errs.push(`[${i}].Direction[${d}][${j}] 缺 To/RouteID/weekStr/Timetables`);
                    }
                });
            });
        });
        if (!hasEntry) errs.push('所有車站的 Direction 皆為空');
        return errs.slice(0, 5);
    }
});

// {OriginStationID: {DestinationStationID: price}} 全票票價映射
const fareMap = (minKeys) => ({
    type: 'object',
    minKeys,
    custom: (data) => {
        const errs = [];
        for (const [o, dests] of Object.entries(data)) {
            if (typeof dests !== 'object' || Array.isArray(dests)) { errs.push(`${o} 的值應為物件`); break; }
            for (const [d, price] of Object.entries(dests)) {
                if (typeof price !== 'number') { errs.push(`${o}->${d} 票價應為數字`); break; }
            }
            if (errs.length) break;
        }
        return errs;
    }
});

const simpleTimetable = (minItems) => ({
    type: 'array',
    minItems,
    every: ['weekStr', 'stopTime[]', 'stopTime[].ID', 'stopTime[].Dep', 'stopTime[].name', 'info.TrainNo']
});

module.exports = {
    // ===== Metro 六家 =====
    'trtc.line.json': metroLine(5),
    'trtc.station.json': metroStation(100),
    'trtc.transfer.json': metroTransfer(10),
    'trtc.time.json': metroTime(90),
    'trtc.fare.json': fareMap(90),

    'krtc.line.json': metroLine(2, { noFrequency: true }),
    'krtc.station.json': metroStation(30),
    'krtc.transfer.json': metroTransfer(2),
    'krtc.time.json': metroTime(30),
    'krtc.fare.json': fareMap(30),

    'tymc.line.json': metroLine(1),
    'tymc.station.json': metroStation(20),
    'tymc.time.json': metroTime(20),
    'tymc.fare.json': fareMap(20),

    'ntmc.line.json': metroLine(1, { noFrequency: true }),
    'ntmc.station.json': metroStation(14),
    'ntmc.transfer.json': metroTransfer(1),
    'ntmc.fare.json': fareMap(14),

    'tmrt.line.json': metroLine(1),
    'tmrt.station.json': metroStation(18),
    'tmrt.fare.json': fareMap(18),
    // tmrt 無 StationTimeTable（Swagger enum 不含 TMRT），無 time 包
    // tmrt / tymc / klrt 無 LineTransfer（Swagger enum 僅 TRTC/KRTC/NTMC），無 transfer 包

    'klrt.line.json': metroLine(1, { noFrequency: true }),
    'klrt.station.json': metroStation(30),
    'klrt.fare.json': fareMap(30),

    // ===== THSR =====
    'thsr.station.json': {
        type: 'array',
        minItems: 12,
        every: ['StationID', 'name', 'lat']
    },
    'thsr.time.json': {
        type: 'array',
        minItems: 100,
        every: ['weekStr', 'stopTime[]', 'stopTime[].ID', 'stopTime[].name', 'info.TrainNo'],
        // THSR 終站僅有 ArrivalTime：每站需 Dep 或 Arr 擇一，首站必有 Dep
        custom: (data) => {
            const errs = [];
            data.some((tr, i) => {
                if (tr.stopTime[0].Dep === undefined) { errs.push(`[${i}] 首站缺 Dep`); return true; }
                const bad = tr.stopTime.findIndex((st) => st.Dep === undefined && st.Arr === undefined);
                if (bad !== -1) { errs.push(`[${i}].stopTime[${bad}] Dep / Arr 皆缺`); return true; }
                return false;
            });
            return errs;
        }
    },
    'thsr.fare.json': fareMap(12),

    // ===== TRA =====
    'tra.line.json': {
        type: 'array',
        minItems: 10,
        every: ['LineID', 'dir', 'station[]', 'station[].ID', 'station[].name', 'station[].TD']
    },
    'tra.station.json': {
        type: 'array',
        minItems: 200,
        // 個別特殊車站（如調車場）無座標，lat 僅要求多數存在
        every: ['StationID', 'name'],
        some: ['lat'],
        // 哨兵：2026-07 起 TDX 的 TRA v2 API 已改回傳 v3 站 ID（台北=1000）。
        // 若未來 ID 體系再變（台北站 ID 不是 1000），這裡會擋下要求人工確認相容層。
        custom: (data) => {
            const tp = data.find((c) => c.name === '臺北' || c.name === '台北');
            if (!tp) return ['找不到臺北站，資料疑似異常'];
            if (tp.StationID !== '1000') return [`臺北站 StationID 為 ${tp.StationID}（預期 v3 格式 1000），ID 體系可能又已變更`];
            return [];
        }
    },
    'tra.train.json': {
        type: 'array',
        minItems: 10,
        every: ['TrainTypeID', 'name']
    },
    'tra.time.json': simpleTimetable(500),
    // TRA 票價為中文票種巢狀映射 {起站:{迄站:{成自:34, 成莒:26, ...}}}
    'tra.fare.json': {
        type: 'object',
        minKeys: 200,
        custom: (data) => {
            const errs = [];
            for (const [o, dests] of Object.entries(data)) {
                for (const [d, fares] of Object.entries(dests)) {
                    if (typeof fares !== 'object' || Array.isArray(fares) || !Object.keys(fares).length) {
                        errs.push(`${o}->${d} 應為票種價目物件`);
                    } else {
                        for (const [tk, price] of Object.entries(fares)) {
                            if (typeof price !== 'number') errs.push(`${o}->${d} ${tk} 票價應為數字`);
                        }
                    }
                    if (errs.length) return errs;
                }
            }
            return errs;
        }
    },

    // ===== AFR（阿里山林鐵，v3 wrapper payload 原始陣列）=====
    'afr.line.json': {
        type: 'array',
        minItems: 1,
        every: ['LineID', 'LineName']
    },
    'afr.station.json': {
        type: 'array',
        minItems: 5,
        every: ['StationID', 'StationName']
    },
    'afr.train.json': {
        type: 'array',
        minItems: 1,
        every: ['TrainTypeID']
    },
    'afr.time.json': {
        type: 'array',
        minItems: 1,
        every: ['TrainInfo.TrainNo', 'StopTimes[]', 'StopTimes[].StationID']
    },
    'afr.fare.json': fareMap(10),

    // ===== Rail 共通 =====
    'rail.operator.json': {
        type: 'array',
        minItems: 8,
        every: ['OperatorID', 'OperatorName']
    }
};
