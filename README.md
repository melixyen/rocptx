# rocptx

Dynamic public traffic library of Taiwan and Kinmen, Lienchiang.

- 作者：Melix Yen
- Mail：melixyen@gmail.com
- 用途：操作 [TDX API](https://tdx.transportdata.tw/) 的捷運、公車、台鐵、高鐵、AFR 與路由規劃資料

> 舊版 PTX API 使用請改看 `ptx` branch；目前 `master` 以 TDX 為主。

## 這個套件提供什麼

`rocptx` 是一個以 JavaScript / Node.js 為主的 TDX SDK，目前已整理成以下公開命名空間：

- `bus` / `bus.v3`：公車 v2 / v3 查詢
- `metro`：捷運共同底層能力
- `trtc` / `tmrt` / `krtc` / `tymc` / `klrt` / `ntmc`：各捷運系統 wrapper
- `thsr.v2`：台灣高鐵
- `tra` / `tra.v3`：台鐵 v2 / v3
- `afr.v3`：AFR rail v3 查詢
- `rail.v2`：跨軌道系統站間距離 / 票價查詢
- `router.bus` / `router.v1` / `router.v2`：路由規劃工具
- `id`：車站 / 路線 ID 轉換工具
- `data` / `datax` / `common`：靜態資料與共用 helper

完整方法清單與數量統計請看 `doc/API_MAPPING.md`。

## 安裝與載入

### npm

`npm install rocptx`

### CDN

- `https://melixyen.github.io/rocptx/dist/ptx.js`
- `https://melixyen.github.io/rocptx/dist/ptx.min.js`

## 快速開始

### 1. 設定 TDX token

```javascript
rocptx.AppID = 'your_client_id';
rocptx.AppKey = 'your_client_secret';

rocptx.initToken('your_client_id', 'your_client_secret').then(function(){
    console.info('token ready');
});
```

### 2. 查詢捷運站資料（Promise）

```javascript
rocptx.trtc.getStation('BL01').then(function(result){
    console.info(result);
});
```

### 3. 查詢公車路線（callback）

```javascript
rocptx.bus.searchBusByNumber('307', 'Taipei', {
    cbFn: function(result){
        console.info(result);
    }
});
```

### 4. 查詢高鐵車站 / 票價（Promise）

```javascript
rocptx.thsr.v2.getStation('0990').then(function(result){
    console.info(result);
});

rocptx.thsr.v2.getStationFare('0990').then(function(result){
    console.info(result);
});
```

### 5. 做車站 ID 轉換

```javascript
rocptx.id.thsr.getRPIDbyPTXV2('0990');
rocptx.id.tra.getPTXV3('1008');
```

### 6. 呼叫尚未封裝的 API（`rocptx.req`）

不是每個 TDX 端點都已包成專屬模組，遇到還沒封裝的領域（如自行車、航空、有聲號誌）或想臨時測試新端點時，可以直接照 `doc/tdx_docs/*.json` 的 Swagger path 打：

```javascript
// path 直接照文件寫，parameters 的 key 對應文件 Parameters 表的 Name
const res = await rocptx.req(
    '/v2/Rail/TRA/ODFare/{OriginStationID}/to/{DestinationStationID}',
    { OriginStationID: '1000', DestinationStationID: '1020' }
);
console.info(res.data);
```

細節與更多範例見 `doc/API_MAPPING.md` 的「`rocptx.req`（通用 API 呼叫器）」章節。

### 7. TDX rate limit（429）自動重試

TDX 任一 API 都可能回 `429 API rate limit exceeded`。rocptx 已在底層自動攔截並以指數退避重試（1s→2s→4s→8s→16s→32s，仍失敗才回傳失敗），所有模組與 callback / Promise 兩種風格都自動受惠，不需要自己處理：

```javascript
rocptx.rateLimitRetry.enabled = false; // 若要關閉自動重試
```

判斷優先序與設定細節見 `doc/API_MAPPING.md` 的「`rocptx.rateLimitRetry`」章節。

## ESM / 原始碼入口

套件入口是 `src/main.js`，會把以下公開模組掛到 `ptx` 後再 default export：

- `data`
- `datax`
- `bus`
- `metro`
- `trtc`
- `tmrt`
- `krtc`
- `tymc`
- `klrt`
- `ntmc`
- `thsr`
- `tra`
- `afr`
- `rail`
- `router`
- `jsSHA`
- `id`
- `common`

## 主要命名空間速覽

### `bus`

目前 `bus`（v2）已封裝的重點包含：

- `EstimatedTimeOfArrival`
- `RealTimeNearStop`
- `Route` / `Station` / `StopOfRoute`
- `Operator`
- `RouteFare`
- `Shape`
- `Schedule`
- `Vehicle`

其中 `RouteFare`、`Shape`、`Schedule` 已提供 `ByNumber` helper；`cfg.manageBy = 'InterCity'` 時可切到城際公車路徑（2026-07 起所有 v2 方法皆已正確支援 InterCity，不再需要城市參數）。另補齊 `RealTimeNearStop/Streaming` 與 `EstimatedTimeOfArrival/Streaming` 封裝。

`bus.v3` 現已提供 Promise 風格的公車 v3 wrapper，包含：

- 一般 `CityBus`：`Network`、`Stop`、`Station`、`Route`、`SubRoute`
- 一般 `CityBus`：`FirstLastTripInfo`、`Depot`、`StopOfRoute`、`DisplayStopOfRoute`
- 一般 `CityBus`：`RouteFare`、`Schedule`、`DailyTimeTable`、`Alert`
- 一般 `CityBus`：`News`、`Operator`
- 一般 `CityBus`：`Vehicle`、`VehicleDepot`、`VehicleRoute`、`Shape`、`RouteNetwork`、`S2STravelTime`
- 一般 `CityBus` 動態資料：`RealTimeByFrequency`、`RealTimeNearStop`、`EstimatedTimeOfArrival`
- `bus.v3.drts`：DRTS `Stop`、`Station`、`StationGroup`、`Operator`、`Route`、`SubRoute`、`BookingRule`、`StopOfRoute`、`RouteFare`、`Schedule`、`DailyTimeTable`、`GeneralStopTimeTable`、`DailyStopTimeTable`、`Location`、`LocationGroup`、`Shape`、`S2STravelTime`、`Vehicle`、`Alert` 與動態資料（營運城市現為台北、新北、台中、台南）
- `bus.v3.shuttleHospital`：`Authority`、`Operator`、`Stop`、`Route`、`StopOfRoute`、`Schedule`
- `bus.v3.shuttleSciencePark`：科學園區接駁車 `Authority`、`Operator`、`Stop`、`Route`、`StopOfRoute`、`Schedule` 與 `RealTimeByFrequency`、`RealTimeNearStop`、`EstimatedTimeOfArrival`

其中一般 `CityBus` 的動態資料與 `DRTS` 的 route-name 端點皆已提供 `ByRouteName` helper；低階 `_Xxx` wrapper 與 `urls` 也一併公開，方便直接組查詢。

> 注意：依 TDX Swagger 與實測，一般 `CityBus` v3 目前僅支援 `Tainan`；其他城市的公車查詢請用 `bus`（v2）。

### `metro` family

- `metro` 提供各捷運系統共用的 `_Xxx` 低階 API 與 `baseMethod`
- `trtc` / `tmrt` / `krtc` / `tymc` / `klrt` / `ntmc` 提供更方便的公司別 wrapper
- 常用能力包括：`getRoute`、`getStation`、`getStationOfLine`、`getLineTransfer`、`getAlert`、`getLivePosition`、`getStationTransfer`、`getFromToFare`、`getStationTimeTable`
- 新增 `_TransferStations`：捷運共站站點查詢（`RailSystem` 依 Swagger 僅支援 `TRTC_NTMC`、`KRTC`）
- 新增 `_News`、`_StationPlatform`、`_StoppingPattern`（各營運商支援度依 Swagger 而異），Metro v2 規格群組已全數覆蓋

### `thsr`

高鐵能力位於 `rocptx.thsr.v2`，目前包含：

- `getStationOfLine`
- `getStation`
- `getStationExit`
- `getStationFare`
- `getStationTodayTimeTable`
- `getAvailableSeatStatusList`
- `getAvailableSeatStatusListByStation`
- `getAvailableSeatStatusToday`
- `getAvailableSeatStatusByDate`
- `getAvailableSeatStatusODByDate`
- `getAvailableSeatStatusODFromToByDate`
- `getAvailableSeatStatusODFromToByDateTrainNo`
- `getDailyFreeSeatingCarToday`
- `getDailyFreeSeatingCarByDate`
- `getDailyTimetableDates`
- `getDailyTrainInfoByDate`
- `getFromToFare`

THSR v2 的 30 條規格路徑已全數覆蓋。

> 注意：依 2026-07 版 TDX 規格，`AvailableSeatStatus*` 回應的資料陣列屬性已由 `Items` 更名為 `AvailableSeats`，`DailyFreeSeatingCar*` 更名為 `FreeSeatingCars`；`DailyTrainInfo` 亦新增 `Overnight` 欄位。SDK 回傳原始 JSON，使用端若有解析 `Items` 請改用新屬性名。

### `tra`

- `rocptx.tra`：台鐵 v2 wrapper
- `rocptx.tra.v3`：台鐵 v3 wrapper
- `tra.v3` 目前已補上 `News`、`StationFacility`，與 `公共運輸_軌道_v3.json` 的 TRA 群組對齊
- 已是目前專案覆蓋度最高的 transport 模組之一

### `afr`

- `rocptx.afr.v3`：AFR v3 wrapper
- 已對應 `Network`、`Station`、`Line`、`Operator`、`GeneralTrainTimetable`
- 亦提供 `ODFare`、`Route`、`StationOfLine`、`TrainType`、`StationOfRoute`、`News`、`Shape`
- 低階 `_Xxx` wrapper、`urls` 與 `getFromToFare` alias 也已公開

### `rail`

- `rocptx.rail.v2`：跨軌道系統共用查詢
- 提供 `getOperator`、`getS2SDistance`、`getODDistance`、`getODDistanceFromTo`、`getODFareFromTo`（`getFromToFare` alias）
- `RailSystem` 支援 `TRTC`、`KRTC`、`TYMC`、`TMRT`、`NTDLRT`、`NTMC`、`NTALRT`、`KLRT`、`TRA`、`THSR`、`AFR`（各端點略有差異；OD 類端點台北捷運需用 `TRTC_NTMC`）

### `router`

目前公開結構：

- `rocptx.router.bus`
- `rocptx.router.v1`
- `rocptx.router.v2`

### `id`

目前公開結構：

- `rocptx.id.idTrans`
- `rocptx.id.mrtLineTrans`
- `rocptx.id.thsr`
- `rocptx.id.tra`
- `rocptx.id.trtc`
- `rocptx.id.tymc`
- `rocptx.id.getMRTStationIDInWhatLine`

## 文件導覽

- `doc/API_MAPPING.md`：目前 SDK 公開方法總表與方法數量統計
- `doc/README.md`：文件索引與維護規則
- `doc/AGENT_SKILL.md`：與本 README 同一套規則，但改寫成給 AI Agent 執行的格式
- `doc/tdx_docs/upgrade_plan.md`：SDK 與 TDX Swagger 的差異、缺口與升級順序
- `doc/tdx_docs/*.json`：TDX 原始 Swagger / OpenAPI 規格

## 開發與擴充指南（給維護者）

這一節是給人看的開發導覽；如果是要給 AI Agent 自動讀取與執行，請看 `doc/AGENT_SKILL.md`。

兩份文件的規則應保持一致，差別只在表達方式：

- `README.md`：偏導讀、解釋、讓人快速理解
- `doc/AGENT_SKILL.md`：偏決策順序、限制條件、checklist

### 先用 5 個問題決定新 API 放哪裡

1. **它屬於哪個運具領域？**
   - Bus → `src/bus.js`
   - Metro 共用能力 → `src/metro.js`
   - Metro 公司特化 → `src/trtc.js`、`src/tmrt.js`、`src/krtc.js`、`src/tymc.js`、`src/klrt.js`、`src/ntmc.js`
   - THSR → `src/thsr.js`
   - TRA → `src/tra.js`
   - AFR → `src/afr.js`
   - 跨軌道系統共用 → `src/rail.js`

2. **它是 v2 還是 v3？**
   - 版本直接決定 namespace，例如 `thsr.v2`、`tra.v3`、`bus.v3`

3. **它是 raw endpoint，還是高階操作方法？**
   - raw endpoint：先補 `urls` / `v2urls` / `v3urls`，讓 `_Xxx` 先成立
   - 高階方法：再評估是否需要 `getXxx(...)`、`ByRouteName`、`ByNumber` 這類 helper

4. **它是共用邏輯，還是 operator-specific？**
   - 共用 metro 邏輯應放 `src/metro.js`
   - 只有單一業者需要的整理或查詢，才放公司 wrapper

5. **它需要額外的轉換或搜尋能力嗎？**
   - 只是一般查詢：留在 transport module
   - 需要 ID 轉換：評估 `src/id.js`
   - 需要二次整理資料：評估 `catchData`
   - 需要路網推導 / 轉乘搜尋：才評估 `router*`

### 依既有骨架擴充，不要先發明新架構

這個 repo 的主體不是大型 class hierarchy，而是：

- `common.js` / `ptx.js` 提供共用常數、query helper 與 request helper
- transport module 負責包裝 API 與公開 namespace
- `id.js`、`router*`、`datax` 負責補足轉換、路網與靜態資料
- `src/main.js` 負責把公開模組掛到最終輸出

新增 API 時，建議遵守這個順序：

1. 先補 endpoint mapping（`urls` / `v2urls` / `v3urls`）
2. 讓低階 `_Xxx` wrapper 可以使用
3. 視需要再包高階 `getXxx(...)`
4. 若有資料重整需求，再補 `catchData`
5. 若有跨版本 / 跨系統 ID 差異，再補 `src/id.js`
6. 若真的需要路徑搜尋或轉乘推導，再補 `router*`

### 什麼時候該加 convenience method

不是每條 endpoint 都值得包裝成高階 helper。通常只有在下列情況才建議新增：

- 某種 filter 會反覆出現，例如 `StationID`、`RouteID`、`TrainNo`
- path parameter 需要包成更穩定、易用的 API，例如 `getFromToFare(from, to)`
- 需要補日期預設值，例如 today timetable
- 需要幫使用者處理 ID 轉換
- 需要提供更語意化的 alias

如果新方法只是單純轉呼叫 `_Xxx`，又沒有提升可讀性，通常可以先不包。

### 各 transport family 的實作重點

#### Bus

- `bus` v2 延續 callback / `ptx.getURL` 風格
- `bus.v3`、`bus.v3.drts`、`bus.v3.shuttleHospital` 延續 Promise / auto-generated `_Xxx` 風格
- 常見高階查詢是 `ByRouteName`、`ByNumber` 與 City / InterCity 切換
- 如果 Swagger 只有 City 版，就不要硬補 InterCity 版本

#### Metro

- 共用能力先放 `src/metro.js`
- 公司別差異與整理邏輯放各自 wrapper
- 延續 `new metro.baseMethod(companyTag)` 的建立方式
- 搜尋 / 檢索擴充通常落在公司 wrapper 或 `catchData`

#### THSR / TRA / AFR

- 三者的模式都很接近：先補 endpoint mapping，再補查詢 helper
- `catchData` 用在資料重整，不是 raw wrapper
- 若涉及 v2 / v3 或 RP / PTX station ID 差異，要同步檢查 `src/id.js`
- `tra` / `tra.v3` 共存時，要特別留意版本橋接與 station ID 轉換

### 文件、匯出與打包要一起檢查

如果是要公開給使用者使用的新 namespace 或新能力，至少要同步檢查：

1. `src/main.js` 是否有匯出
2. `doc/API_MAPPING.md` 是否要補公開方法清單
3. `README.md` 是否要補對外說明
4. `doc/README.md` 是否要補文件索引
5. `doc/tdx_docs/upgrade_plan.md` 是否要更新覆蓋率或缺口

打包時則遵守兩個原則：

- 入口以 `src/main.js` 為準，輸出由 `rollup.config.js` 與 `package.json` 控制
- 不要直接手改 `dist`，應該讓 source 與 export 正確後再打包

### 靜態資料（datax）更新流程

預抓的靜態資料（路線、車站、轉乘、時刻表、票價）可取代直接呼叫 API 節省流量，分兩層存放：

| 層 | 位置 | 用途 | 更新指令 |
|---|---|---|---|
| **datax** | `src/datax/` | **直接打包進 library**，`rocptx.datax.<company>.<pack>` 載入即用（line / station / transfer / train / afr / rail.operator，共約 170KB） | `npm run datax:update` |
| **out_data** | `out_data/` | **不 import 進 library**，純資料保存（各公司票價 fare、THSR / TRA 時刻表 time，約 5MB）；打包時 clone 到 `dist/out_data/`，由使用端按需載入 | `npm run outdata:update` |

之後要把某個資料包在兩層之間搬移：改 `nodejs/datax-runner.js` manifest 的 `location` 欄位、移動 JSON 檔案，若進出 datax 層再同步增減 `src/datax.js` 的 import。

定期更新一個指令完成：

```bash
npm run datax:refresh   # 兩層全部抓取 → 契約驗證 → 離線測試 → 全部重新打包（含 clone out_data 到 dist）
```

分步驟操作（兩個下載器參數相同：`--only 關鍵字[,關鍵字]`、`--dry-run`、`--list`）：

```bash
npm run datax:update                         # 只更新 datax 層
npm run outdata:update                       # 只更新 out_data 層
node nodejs/catch_out_data.js --only fare    # 只更新票價包
```

安全機制（確保更新不會破壞舊版行為，兩層共用）：

1. **資料格式契約**（`nodejs/datax-schema.js`）：記錄 SDK 實際讀取的每個欄位；抓回的新資料必須通過契約驗證才會寫入，TDX 改格式時會在更新階段被擋下
2. **縮水保護**：新資料量低於舊檔 60% 時拒絕寫入（防 API 異常回空包）
3. **契約測試**（`nodejs/datax-contract.test.js`）：兩層每個 JSON 都必須有契約且通過驗證，且同一包不得同時存在於兩層

### out_data 按需載入

`out_data` 資料不會自動載入，需要時透過 `rocptx.datax` 的接口讀進記憶體（兩個 loader 都有打包，跨環境呼叫錯誤會以 reject 回報、不會拋出未捕捉錯誤）：

**Node.js — File API 讀取：**
```javascript
const rocptx = require('rocptx');
// list 省略時載入目錄內全部 JSON
await rocptx.datax.loadOutDataByFile('node_modules/rocptx/out_data', ['tra.fare', 'thsr.time']);
rocptx.datax.tra.fare['1000']['4400']; // {成自:994, 成莒:767, 成復:640, 成普:394}
```

**Web — URL 讀取（fetch）：**
```javascript
await rocptx.datax.loadOutDataByURL('https://melixyen.github.io/rocptx/dist/out_data', ['trtc.fare']);
rocptx.datax.trtc.fare['BL12']['BL15']; // 20
```

也可以自行取得 JSON 後手動塞入：`rocptx.datax.attachData('tra.fare', json)`。

各公司可用的資料包依 TDX 供應而異（例如僅 TRTC/KRTC/NTMC 有 LineTransfer），完整清單見 `nodejs/datax-runner.js` 的 manifest 與 `nodejs/datax-schema.js`。

已知限制與注意事項：

- **捷運站別時刻表（metro time 包）不在自動更新範圍**：TDX 的 `StationTimeTable` 需逐站呼叫、速度過慢且會無回應卡死；repo 內保留的 `src/datax/trtc/krtc/tymc.time.json` 為歷史資料，僅供 `dist/line_time.js` 相容使用（原有資料不動原則）
- **TRA 站 ID 已為 v3 格式**：2026-07 起 TDX 的 TRA v2 API 改回傳 v3 站 ID（台北 = `1000`），datax 的 tra 各包一致採 v3 ID；`tra.catchData.getDataXStationData` 有相容層，傳 v2 ID（如 `1008`）會自動轉換
- **TRA 票價為中文票種巢狀映射**：`{起站:{迄站:{成自:994, 成莒:767, ...}}}`（成人非折扣票種）

### 測試

- `npm run test:unit`：離線單元測試（秒級、不需 token、不打 API），共 6 支：
  - `url-builder.test.js`：全部公開方法的 URL 組合與參數映射
  - `spec-coverage.test.js`：SDK 全部 `urls` map ↔ Swagger 規格一致性
  - `helpers.test.js`：query helper 與 common 工具純函式
  - `id-data.test.js`：ID 轉換與 data / datax 靜態資料完整性
  - `catch-data.test.js`：catchData 查找、計算與抓取整合邏輯（fixture）
  - `router.test.js`：router.v2 block 推導 / 路徑搜尋與 router.bus 直達公車（fixture）
- `npm run test:nodejs`：live smoke 測試（打真實 TDX API，約 5 分鐘）
- `npm run test:all`：兩者依序全跑
- 新增 / 修改 endpoint 後至少要跑 `test:unit`；其中 `spec-coverage.test.js` 會比對所有 `urls` map 與 `doc/tdx_docs/*.json`，刷新規格檔後跑一次即可發現 TDX 改版造成的路徑失效

### 最後只要記住 6 件事

1. 先分類，再寫 code。
2. 先補 `urls`，再補 `_Xxx`，最後才補 `getXxx`。
3. 沿用同檔案既有風格，不要硬統一整個 repo。
4. 需要資料整理時用 `catchData`；需要 ID 互轉時用 `id.js`；需要路徑推導時才用 `router`。
5. 要公開就記得接到 `src/main.js`。
6. 新增功能後，文件與打包流程要一起檢查。

## 現況說明

- 文件目前已以 `src/*.js` 為準完成一輪同步
- 2026-07-10 已依 TDX 線上最新 Swagger 完成規格刷新與缺口補齊：`bus.v3` 補齊 DRTS 新群組與 `Shuttle/SciencePark`、`metro` 補 `TransferStations` / `News` / `StationPlatform` / `StoppingPattern`、新增 `rail.v2` 跨系統查詢（含 `Operator`）、THSR 30 條路徑全數覆蓋、Bus v2 InterCity 路徑組法修正
- 規格層級的格式 / 參數變更明細請看 `doc/tdx_docs/upgrade_plan.md` 第 7.3 節
- 核心運輸主軸（Bus / Metro / THSR / TRA / AFR / Rail）與 TDX 規格已無已知缺口；後續擴充建議請直接看 `doc/tdx_docs/upgrade_plan.md`

## 相關工具

- [車站路線 ID 列表查詢](https://melixyen.github.io/rocptx/app/list_data.html)