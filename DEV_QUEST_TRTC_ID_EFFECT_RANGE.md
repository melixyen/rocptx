# 台北捷運 ID 體系與 railtime 離線查詢：現況調查與待討論問題

- 調查日期：2026-10-15
- 調查範圍：`rocptx`（`src/data.js`、`src/trtc.js`、`src/datatdx.js`）與 `railtime`（`ttlib/data.js`、`ttlib/fn.js`、`ronnywang_trtc.json`）
- 調查性質：**只讀取與比對，未修改任何檔案**
- 目的：釐清手動維護的捷運靜態 ID 與 TDX `StationUID` 的差異、影響範圍，以及 railtime 是否仍以自有離線資料進行查詢

---

## 1. 結論摘要

1. railtime **仍保有離線資料，但三種運具都已把 TDX 設為第一順位**，離線資料降為 fallback（桃園機捷例外，仍直接讀離線 JSON）。
2. 台北捷運的 ID 體系有**三層**（內部 ID / TDX `StationID` / TDX `StationUID`），railtime 自己的資料只有第一層，第二、三層完全依賴 rocptx。
3. 「環狀線與三鶯線掛在 `trtc_*` 之下」是**刻意設計且已正確處理**跨公司 TDX 查詢（透過 `operator` 欄位），不是缺陷。
4. 真正待討論的是 **`data.trtc` 與 `data.ntmc` 有 26 站完整重複**所造成的 ID 歧義，以及若干資料同步與 fallback 品質問題（詳見第 6 節，共 6 項）。

---

## 2. 架構全貌：railtime ↔ rocptx 的分工

```
railtime/ttlib/
├── ptx.js       ← rocptx dist/ptx.js 原樣複製（856KB，依 AGENTS.md 不可在此修改）
├── data.js      ← railtime 自己手動維護的靜態資料（174KB）
├── fn.js        ← 查詢調度邏輯（186KB）
└── defined.js   ← usePTX 等開關
```

railtime 的 `TT.data` 只含三家運具：**`tra`、`trtc`、`tymetro`**（外加 `transStation` / `routeMap` / `routeSystem`）。

| 專案 | 資料頂層鍵 |
|---|---|
| railtime `TT.data` | `tra, trtc, tymetro, transStation, routeMap, routeSystem` |
| rocptx `pData` | `sect_ary, bus, trtc, tymc, ntmc, krtc, tmrt, klrt, thsr, tra, transStation, routeMap, routeSystem` |

railtime **完全沒有使用** rocptx 的 `ntmc` / `krtc` / `tmrt` / `klrt` / `tymc` wrapper（全專案零引用，僅 `klrt.html` 有一個同名 CSS class 不相關）。台北都會區的所有捷運／輕軌路線，railtime 一律歸在 `trtc` 之下。

---

## 3. ID 編碼現況：三層體系

以台北車站為例：

| 層 | 值 | 用途 |
|---|---|---|
| 內部 ID（手動維護） | `trtc_051` | railtime 與 rocptx 共用的主鍵 |
| TDX `StationID` | `["R10","BL12"]` | 呼叫 TDX API 用；**共站為陣列** |
| TDX `StationUID` | `["TRTC-R10","TRTC-BL12"]` | 全域唯一鍵 |

### 3.1 欄位差異（關鍵耦合點）

| 專案 | `trtc.station_ary` 欄位 | 站數 |
|---|---|---:|
| railtime `ttlib/data.js` | `id, name, estring` | 129 |
| rocptx `src/data.js` | `id, StationID, StationUID, name, estring` | 131 |

**railtime 自己的資料沒有 `StationID`、也沒有 `StationUID`**，因此所有「內部 ID → TDX 站碼」轉換都必須經過 rocptx：

- `TT.ptx.id.trtc.getPTXV2(stationID, line)`（`fn.js:3204`）
- `TT.ptx.trtc.getStationIDAry(stationID)`（`fn.js:3224`）
- `TT.ptx.trtc.getLineData(line)`（`fn.js:3224`）

這是兩專案最關鍵的耦合點：rocptx 的 `data.js` 是 TDX 站碼的唯一真相來源。

### 3.2 共站（一個實體站對多個 TDX StationID）

rocptx `data.trtc` 共 **17 站**為共站，其中 4 站跨公司：

| 內部 ID | 站名 | StationID | StationUID |
|---|---|---|---|
| `trtc_051` | 台北車站 | `["R10","BL12"]` | `["TRTC-R10","TRTC-BL12"]` |
| `trtc_031` | 南港展覽館 | `["BL23","BR24"]` | `["TRTC-BL23","TRTC-BR24"]` |
| `trtc_076` | 頂埔 | `["BL01","LB01"]` | `["TRTC-BL01","NTMCC-LB01"]` |
| `trtc_047` | 景安 | `["O02","Y11"]` | `["TRTC-O02","NTMCC-Y11"]` |
| `trtc_123` | 頭前庄 | `["O17","Y18"]` | `["TRTC-O17","NTMCC-Y18"]` |
| `trtc_036` | 大坪林 | `["G04","Y07"]` | `["TRTC-G04","NTMCC-Y07"]` |

其餘 11 站為 TRTC 內部換乘站（忠孝復興、忠孝新生、西門、民權西路、中山、東門、大安、南京復興、松江南京、中正紀念堂、古亭）。

### 3.3 `data.trtc` 內實際屬於 NTMC 的車站

共 **26 站**的 `StationUID` 前綴為 `NTMCC-` 而非 `TRTC-`：

- 環狀線 Y：11 站純 Y（`trtc_y08`～`trtc_y20`）+ 3 站共站（`trtc_047`、`trtc_123`、`trtc_036`）= 14 站
- 三鶯線 LB：11 站純 LB（`trtc_lb02`～`trtc_lb12`）+ 1 站共站（`trtc_076` 頂埔）= 12 站

### 3.4 `data.trtc.line` 的 7 條線

| 內部 ID | LineID | 名稱 | 站數 | `operator` |
|---|---|---|---:|---|
| `trtc_1` | BR | 文湖線(1) | 24 | （未設→預設 TRTC） |
| `trtc_2` | R | 淡水信義線(2) | 28 | （未設→預設 TRTC） |
| `trtc_3` | G | 松山新店線(3) | 19 | （未設→預設 TRTC） |
| `trtc_4` | O | 中和新蘆線(4) | 26 | （未設→預設 TRTC） |
| `trtc_5` | BL | 板南線(5) | 23 | （未設→預設 TRTC） |
| `trtc_6` | Y | 環狀線(6) | 14 | **NTMC** |
| `trtc_7` | LB | 三鶯線(LB) | 12 | **NTMC** |

railtime 的 `ttlib/data.js` 有完全相同的 7 條線與相同的 Y / LB 站 ID。

### 3.5 TDX 實際歸屬（決定查詢要用哪個 RailSystem）

依 `src/datatdx.js`（TDX 原始資料）：

| TDX RailSystem | 站數 | 含 Y 開頭 | 含 LB 開頭 |
|---|---:|---:|---:|
| `TRTC` | 122 | **0** | **0** |
| `NTMC` | 26 | 14（Y07–Y20） | 12（LB01–LB12） |

→ Y / LB 站在 TDX **只存在於 NTMC**，用 `RailSystem=TRTC` 查不到。

---

## 4. railtime 是否仍用離線資料查詢

**結論：是，但都已降為 fallback（桃園機捷除外）。**

| 運具 | 離線資料 | TDX 優先？ | 調度位置 |
|---|---|---|---|
| 台鐵 | `w0.json`～`w6.json` | ✅ `usePTX` 為真走 TDX，否則讀 w*.json | `fn.js:2886` |
| 台北捷運 | `ronnywang_trtc.json` | ✅ TDX 第一順位，失敗才用離線 | `fn.js:3032` |
| 桃園機捷 | `time_tymetro.json` | ❌ 由 `fn_tymetro.js` 直接讀，未走 TDX | `fn_tymetro.js` |

`TT.defined.usePTX` 預設為 `true`（`defined.js:63`），`index.html:448` 與 `tratrtc.html:448` 提供 checkbox 可切換。

### 4.1 台北捷運時刻表的完整優先序（`fn.js:3032` `getTRTC_stationTime`）

```
1. TDX（經 rocptx getFormatStationTime）                    ← 第一順位
   閘門：TT.defined.usePTX && checkTRTC_ptxHasStation()
2. trtc_7 三鶯線 → getTRTC_headwayCalc_stationTime 班距推算
3. trtc_r01 廣慈/奉天宮 → 由象山 trtc_099 ±120 秒推算
4. ronnywang_trtc.json 離線時刻表                            ← fallback
5. 離線資料不足時的替代推算：
   trtc_071 淡水   ← trtc_070 −3 分
   trtc_048 南勢角 ← trtc_047 −2 分
   trtc_076 頂埔   ← trtc_077 −3 分
   trtc_1 文湖線   → rocptx catchData.calcBRLineTime() 班距推算
   trtc_6 環狀線   → 用「三和國中 trtc_177」（中和新蘆線）時刻表替代全線所有站
```

### 4.2 `ronnywang_trtc.json` 覆蓋範圍

- 577 筆記錄、**83 個相異車站代碼**（129 站中的 64%）
- `車站代碼` 為 3 位數字（如 `011`），經 `fn.js:3342` 轉為 `trtc_` + 代碼 → 與內部數字 ID 相容
- `方向名稱` 以中文正則對應到 line（`fn.js:3316` 起），**只涵蓋 4 條線**：
  - `trtc_5` 板南、`trtc_2` 淡水信義、`trtc_3` 松山新店、`trtc_4` 中和新蘆
- **文湖線（BR）與環狀線（Y）完全不在離線資料內**，三鶯線（LB）亦無

### 4.3 TDX 查詢的完整呼叫鏈

```
railtime fn.js:652  checkRouteAryTime
  └─ 以 checkTRTC_ptxHasStation() 過濾可查的站
  └─ TT.ptx.getTakeMRTTimeTable(mrtPTXAry, w, cb)     [rocptx ptx.js]
       └─ trtc.getStationTime(LineID, [stID, targetID], w, cb)   [rocptx trtc.js:216]
            └─ URL: metroURL + '/StationTimeTable/' + getLineOperator(LineID)
            └─ 寫入快取 ptx.tempTimeTable.trtc[LineID][StationID][w]
railtime fn.js:3217 getTRTC_ptx_stationTime
  └─ TT.ptx.trtc.getFormatStationTime(stID, line, dir, w)  ← 讀上述快取
```

---

## 5. 已妥善處理、不構成問題的部分

### 5.1 跨公司 TDX 路由已解決

rocptx `trtc.js:151` 的 `getLineOperator(id)` 會讀 `data.trtc.line` 的 `operator` 欄位決定 RailSystem，`getStationTime`（`trtc.js:227`）據此組 URL。實測：

```
getLineOperator('trtc_1') → TRTC      getLineOperator('trtc_6') → NTMC
getLineOperator('trtc_5') → TRTC      getLineOperator('trtc_7') → NTMC
getLineOperator('Y')      → NTMC      getLineOperator('LB')     → NTMC
```

→ 查環狀線／三鶯線時會正確打到 `RailSystem=NTMC`。**「Y / LB 掛在 trtc 之下」是符合使用者視角（台北都會區捷運）的刻意設計，且 TDX 查詢不會打錯系統。**

### 5.2 共站消歧義正常

`getStationID(id, line)` 帶 line 即可正確解析，且 `getFormatStationTime` 確實有傳 line：

```
trtc_051 + trtc_2 → R10      trtc_051 + trtc_5 → BL12
trtc_036 + trtc_3 → G04      trtc_036 + trtc_6 → Y07
```

### 5.3 StationUID 可唯一反查

`id.getStationDataByStationUID()` 運作正常，且能跨公司定位：

```
'NTMCC-Y08'  → ntmc_y08 十四張
'NTMCC-LB06' → ntmc_lb06 三峽
'TRTC-BL12'  → trtc_051 台北車站
```

---

## 6. 待討論問題

### 問題 1：`data.trtc` 與 `data.ntmc` 有 26 站完整重複，造成 ID 歧義

環狀線 14 站 + 三鶯線 12 站同時存在於兩個 namespace，`data.ntmc.station_ary` 的 26 站全部是副本。同一個 TDX 站碼因此有兩個「正確」的內部 ID：

```
id.trtc.getRPIDbyPTXV2('Y08')  → trtc_y08
id.ntmc.getRPIDbyPTXV2('Y08')  → ntmc_y08
id.trtc.getRPIDbyPTXV2('LB01') → trtc_076   （頂埔，共站）
id.ntmc.getRPIDbyPTXV2('LB01') → ntmc_lb01
```

- **現況影響**：railtime 只用 `trtc_*` 一套，目前不受影響。
- **風險**：rocptx 的其他使用者若混用兩個 namespace，會拿到不一致的 ID；`trtc_076` / `ntmc_lb01` 這種共站更容易誤判。
- **討論點**：`data.ntmc` 是否保留？若保留，是否在文件明確定義主從關係（例如「`trtc_*` 為台北都會區正規鍵，`ntmc_*` 僅用於按 TDX 業者分類的場景」），並說明共站應以哪一邊為準。

### 問題 2：同一站在兩個 namespace 的顯示名稱不一致

```
trtc_y16 → 「板橋（環狀）」
ntmc_y16 → 「板橋」
```

- 全部 26 組重複站中只有這 1 筆名稱不同，其餘內容一致。
- **影響**：UI 若混用兩個來源，同一站會出現兩種名稱。
- **討論點**：以哪個為準？`trtc_y16` 的「（環狀）」是為了和板南線板橋站 `trtc_082` 區分，有其用意。

### 問題 3：railtime 的 trtc 比 rocptx 少 2 站

rocptx 有、railtime 沒有：

| 內部 ID | 站名 | 所屬 |
|---|---|---|
| `trtc_g03a` | 小碧潭 | 松山新店線支線（TDX RouteID `G-3`） |
| `trtc_r22a` | 新北投 | 淡水信義線支線（TDX RouteID `R-3`） |

- railtime 停在 129 站，rocptx 為 131 站。
- **影響**：railtime 無法查詢／顯示這兩個支線站。
- **討論點**：railtime 是否補上？若補，`ttlib/data.js` 的 `trtc.line` 站序陣列是否也要納入（rocptx 現行設計是支線站不列入主線 `station` 陣列）。

### 問題 4：環狀線 fallback 用鄰線車站時刻表替代全線

`fn.js:3069`：`trtc_6` 在 TDX 失敗時，用「三和國中 `trtc_177`」（中和新蘆線 `trtc_4` 上的站）的時刻表替代**環狀線全部 14 站**。

- TDX 可用時不會觸發；但 TDX 中斷或配額用盡時，環狀線任一站都會顯示同一份鄰線時刻表。
- rocptx 現已有 NTMC 完整靜態資料（`datax.ntmc` 的 line 含 `TravelTime`），三鶯線 `trtc_7` 已改用班距推算（`getTRTC_headwayCalc_stationTime`）。
- **討論點**：環狀線是否比照三鶯線改用班距推算，取代鄰線替代？

### 問題 5：`ronnywang_trtc.json` 的覆蓋率與更新機制

- 覆蓋 83 / 129 站（64%），缺文湖線、環狀線、三鶯線。
- 資料來源為第三方彙整，**沒有自動更新腳本**；對比台鐵的 `w0`–`w6.json` 有 `nodejs_script/get_trc_week_timetable.js` 可更新。
- **討論點**：（a）比照台鐵寫一支更新腳本；（b）改以 rocptx 的班距資料推算全面取代離線 JSON；（c）維持現狀但在文件標註資料鮮度風險。

### 問題 6：兩專案的 ID 同步沒有自動檢核

railtime `ttlib/data.js` 與 rocptx `src/data.js` 必須維持同一套內部 ID（`AGENTS.md` 與專案 memory 均有記錄此規則），但目前**沒有任何測試或腳本會比對兩邊**。

- 本次調查是以臨時腳本手動比對才發現少 2 站。
- 台鐵剛完成 v2→v3 大規模換碼（commit `216f45b`），此類跨 repo 漂移風險升高。
- **討論點**：是否在 rocptx 增設一支比對腳本（讀取 railtime 的 `ttlib/data.js`，輸出 ID／站名差異報告），或納入 `npm run test:unit`（需處理 railtime 路徑非固定的問題）。

---

## 7. 附錄：本次驗證數據一覽

| 驗證項 | 結果 |
|---|---|
| railtime trtc 站數 | 129 |
| rocptx trtc 站數 | 131（多 `trtc_g03a`、`trtc_r22a`） |
| 兩邊同 ID 站名不一致 | 0 筆 |
| rocptx trtc 共站數 | 17 / 131 |
| rocptx trtc 內 `StationUID` 非 `TRTC-` 的站 | 26 |
| `data.ntmc` 站數 | 26（與 trtc 完整重複） |
| 重複站名稱不一致 | 1 筆（`y16`） |
| TDX RailSystem=TRTC | 122 站（0 個 Y／LB） |
| TDX RailSystem=NTMC | 26 站（Y 14 + LB 12） |
| `ronnywang_trtc.json` | 577 筆／83 相異站／4 條線 |
| `getLineOperator` 跨公司路由 | 正確（`trtc_6`、`trtc_7` → NTMC） |
| 共站消歧義 | 正確（帶 line 時） |
| `getStationDataByStationUID` | 正確 |
| railtime 使用 rocptx 的 ntmc/krtc/tmrt/klrt/tymc wrapper | 零引用 |
