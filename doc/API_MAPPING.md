# rocptx SDK 方法總表與 TDX 對照

## 文件定位

本檔以目前 `src/*.js` 實作為準，整理 **rocptx 現行公開 SDK 方法、命名空間與 TDX 對應**。

- SDK 實作依據：`src/main.js` 與各模組原始碼
- TDX 文件依據：`doc/tdx_docs/*.json`、`doc/tdx_docs/tdx.md`
- 差異與補齊計劃：`doc/tdx_docs/upgrade_plan.md`
- 本檔只列 **公開命名空間 / 便利方法 / 自動產生的 `_Xxx` API 方法**，不列內部私有 helper

## 統計摘要

### 規模總覽

| 指標 | 數量 | 說明 |
|---|---:|---|
| `src/main.js` 公開匯出 | 18 | `rocptx` 預設 export 掛載的模組 / namespace |
| `rocptx` 根命名空間 helper | 16 | `src/ptx.js` 的認證、查詢與共用工具 |
| transport-facing API surface | 14 | `bus`、`bus.v3`、`metro`、6 個 metro wrapper、`thsr.v2`、`tra`、`tra.v3`、`afr.v3`、`rail.v2` |
| support-facing surface | 5 | `data`、`datax`、`router`、`id`、`common` |
| `doc/tdx_docs` 規格來源 | 19 | `tdx.md` 1 份 + Swagger / JSON 18 份 |
| Bus P1 目前累計新增 | 30 | 已補完 Bus v2 主要 helper：`Operator`、`RouteFare`、`Shape`、`Schedule`、`Vehicle`、`Alert`、`Stop`、`DisplayStopOfRoute`、`DailyTimeTable`、`RouteNetwork`、`DailyStopTimeTable`、`DataVersion`、`FirstLastTripInfo`、`News`、`RealTimeByFrequency`、`RealTimeByFrequency/Streaming`、`StationGroup`、`S2STravelTime`、`RouteTPASS` |
| Bus v3 規格對應路徑 | 75 | 已補完 `公共運輸_公車_v3.json` 的一般 `CityBus` 27、`DRTS` 33、`Shuttle/Hospital` 6、`Shuttle/SciencePark` 9 |

### 主要命名空間公開項目量

> 註：此表以「本檔列出的公開可用成員」計數；`metro` 家族包含 `urls` / `companyTag` 等公開成員，不只計算函式。

| 命名空間 / 家族 | 數量 | 計算方式 |
|---|---:|---|
| `rocptx` root helper | 16 | `src/ptx.js` 的基礎 helper |
| `common` | 26 | 工具 12 + TDX 常數 7 + API 根路徑 7 |
| `bus` | 51 | 50 個 v2 直接公開方法 + `v3` 子命名空間 |
| `bus.v3` | 60 | convenience 27 + `_Xxx` 27 + metadata 6（含 `drts`、`shuttleHospital`、`shuttleSciencePark` 子命名空間） |
| `bus.v3.drts` | 70 | convenience 34 + `_Xxx` 33 + metadata 3 |
| `bus.v3.shuttleHospital` | 14 | convenience 6 + `_Xxx` 6 + metadata 2 |
| `bus.v3.shuttleSciencePark` | 20 | convenience 9 + `_Xxx` 9 + metadata 2 |
| `metro` | 65 | 基底成員 5 + `_Xxx` 22 + convenience 19 + `catchData` 19 |
| `trtc` | 77 | 繼承 `metro` 65 + 額外 helper 12 |
| `tmrt` | 75 | 繼承 `metro` 65 + 額外 helper 10 |
| `krtc` | 75 | 繼承 `metro` 65 + 額外 helper 10 |
| `tymc` | 75 | 繼承 `metro` 65 + 額外 helper 10 |
| `klrt` | 75 | 繼承 `metro` 65 + 額外 helper 10 |
| `ntmc` | 77 | 繼承 `metro` 65 + 額外 helper 12 |
| `thsr.v2` | 52 | convenience 17 + `_Xxx` 30 + `catchData` 5 |
| `tra` | 46 | convenience 11 + `_Xxx` 25 + `catchData` 10 |
| `tra.v3` | 55 | convenience 8 + `_Xxx` 34 + `catchData` 13 |
| `afr.v3` | 29 | convenience 13 + `_Xxx` 14 + metadata 2 |
| `rail.v2` | 13 | convenience 6（含 `getFromToFare` alias）+ `_Xxx` 5 + metadata 2 |
| `router` | 19 | `router.bus` 1 + `router.v1` 0 + `router.v2` 18 |
| `id` | 23 | top-level 7 + 子工具方法 16 |

## 目前公開匯出（`src/main.js`）

`rocptx` 的 default export 以 `ptx` 為基底，再掛上 18 個公開模組 / 命名空間：

| 匯出 | 來源 | 說明 |
|---|---|---|
| `data` | `src/data.js` | 靜態人工資料 |
| `datax` | `src/datax.js` | 擴增資料快取 |
| `bus` | `src/bus.js` | 公車查詢 |
| `metro` | `src/metro.js` | 捷運基底 namespace |
| `trtc` | `src/trtc.js` | 台北捷運 wrapper |
| `tmrt` | `src/tmrt.js` | 台中捷運 wrapper |
| `krtc` | `src/krtc.js` | 高雄捷運 wrapper |
| `tymc` | `src/tymc.js` | 桃園捷運 wrapper |
| `klrt` | `src/klrt.js` | 高雄輕軌 wrapper |
| `ntmc` | `src/ntmc.js` | 新北捷運 wrapper |
| `thsr` | `src/thsr.js` | 高鐵 namespace |
| `tra` | `src/tra.js` | 台鐵 v2 / v3 |
| `afr` | `src/afr.js` | AFR v3 namespace |
| `rail` | `src/rail.js` | 跨軌道系統共用查詢（v2） |
| `router` | `src/router.js` | 路由規劃 namespace |
| `jsSHA` | `src/jsSHA` | SHA 工具 |
| `id` | `src/id.js` | ID 轉換工具 |
| `common` | `src/common.js` | 共用工具與常數 |

## `rocptx` 根命名空間（`src/ptx.js`）

除了上述模組外，`rocptx` 本身還帶有基礎認證 / 查詢工具：

- `throwError`
- `initToken`
- `req`（通用 API 呼叫器，見下方說明）
- `rateLimitRetry`（429 自動重試設定，見下方說明）
- `filterParam`
- `filterFn`
- `orderByFn`
- `spatialFilterFn`
- `topFn`
- `selectFieldFn`
- `GetAuthorizationHeaderTDX`
- `GetAuthorizationHeader`
- `getTakeMRTTimeTable`
- `getURL`
- `getPromiseURL`
- `getStationLiveInfo`
- `getStationTodayTime`
- `sortByTTSortTime`

### `rocptx.req`（通用 API 呼叫器）

`req(path, parameters, options)` 讓使用者可以直接照 `doc/tdx_docs/*.json`（或 `tdx.md`）的 Swagger path 打任何 TDX API，不需要等該 endpoint 被包成專屬模組——特別適合還沒被 SDK 封裝的領域（自行車、航空、航運、停車、GIS、觀光、路況、有聲號誌等）或臨時測試新端點。

- `path`（必填）：Swagger path，例如 `'/v2/Rail/TRA/Station'`；含樣板變數的路徑照樣可用，如 `'/v2/Rail/TRA/ODFare/{OriginStationID}/to/{DestinationStationID}'`。也可以直接傳完整 `http(s)://` URL，此時忽略 `options.level` / `options.baseURL`
- `parameters`（選填）：物件，key 直接對應 TDX 文件 Parameters 表的 **Name** 欄——path 樣板變數（如 `OriginStationID`）直接照文件命名帶入即可；查詢參數支援文件原生的 `$select` / `$filter` / `$orderby` / `$top` / `$skip` / `$format`，也支援不帶 `$` 的簡寫 `select` / `filter` / `orderby` / `top` / `skip` / `format`
- `options`（選填）：`{ level='basic', baseURL, format='JSON', method='GET', param, timeout, head, processJSON, query }`
  - `level`：`'basic' | 'advanced' | 'premium' | 'historical' | 'maas'`，對應 `common.CONST_TDX_LEVEL_*`
  - `baseURL`：完全覆蓋預設 base（略過 level 機制）
  - `query`：附加在組好的查詢字串後面的原始字串（逃生艙）
  - 其餘欄位直接透傳給 `ptx.getPromiseURL` 的 cfg（`param` 為 POST body、`processJSON` 為回應轉換 hook）
- 回傳值：同其他模組方法一樣是 Promise，resolve 出的物件帶 `.data`（已解析的 JSON）

```javascript
// 直接照文件 path 查詢，不需要 tra 模組已封裝該群組
const res = await rocptx.req('/v2/Rail/TRA/Station', { top: 5 });

// path 樣板參數
const fare = await rocptx.req(
  '/v2/Rail/TRA/ODFare/{OriginStationID}/to/{DestinationStationID}',
  { OriginStationID: '1000', DestinationStationID: '1020' }
);

// 呼叫尚未封裝的領域（有聲號誌）並切換城市
const aps = await rocptx.req('/v1/Traffic/Road/APS/City/{City}', { City: 'Taoyuan', top: 10 });

// advanced 服務層級
const poi = await rocptx.req('/v1/POI', { top: 5 }, { level: 'advanced' });
```

缺少樣板參數、未知 `level`、`path` 缺漏等錯誤都會讓回傳的 Promise reject，可直接用 `.catch()` 或 `try/await/catch` 處理，不需額外包 try/catch 呼叫本身。

### `rocptx.rateLimitRetry`（TDX rate limit 自動重試）

TDX 對任一 API 都可能回 `429 API rate limit exceeded`。rocptx 在**底層**（`getURL` 與 `getPromiseURL`）攔截這類回應並自動重試，所以所有模組（`bus` / `metro` / `tra` / `thsr` / `afr` / `rail` / `req` / `catchData` / 資料更新器）都自動受惠，整個重試機制跑完才會 callback 或 resolve / reject——使用端不需要自己處理 429。

- **判斷優先序**：① HTTP status `429` → ② response header 可識別項目（`x-ratelimit-remaining-minute: 0` 或 `ratelimit-remaining: 0`）→ ③ response message 含 `API rate limit exceeded`（瀏覽器 CORS 讀不到 header 時的防線）。只對失敗回應做判斷，成功回應即使配額歸零也不受影響
- **退避序列**：1s → 2s → 4s → 8s → 16s → 32s（共 6 次重試），32 秒那次仍失敗才回傳失敗；若回應帶 `Retry-After` header 且秒數大於當前退避值，改用 header 值
- **設定**（都可在執行期調整）：

```javascript
rocptx.rateLimitRetry.enabled = true;                              // 關閉自動重試設 false
rocptx.rateLimitRetry.delays = [1000,2000,4000,8000,16000,32000]; // 退避序列（毫秒）
rocptx.rateLimitRetry.useRetryAfterHeader = true;                  // 是否尊重 Retry-After header
```

- 成功回應的 event 物件帶 `retryCount` 欄位，可得知該次呼叫實際重試了幾次
- Node 端的 XHR shim（`nodejs/runtime.js`）原本自帶的一層 429 重試已移除，統一由 library 這層負責，避免兩層疊加

## 模組方法索引

### `common`

公開工具與常數：

- 工具：`today`、`inBrowser`、`assign`、`assignIf`、`clone`
- 陣列 / 時間工具：`findArrayTarget`、`findAllArrayarget`、`transTime2Date`、`weekArray2WeekStr`、`appendNumber0`、`transTime2Sec`、`transSec2Time`
- TDX 常數：`CONST_TDX_GET_TOKEN`、`CONST_TDX_API_URL`、`CONST_TDX_LEVEL_BASIC`、`CONST_TDX_LEVEL_ADVANCED`、`CONST_TDX_LEVEL_PREMIUM`、`CONST_TDX_LEVEL_HISTORICAL`、`CONST_TDX_LEVEL_MAAS`
- API 根路徑：`railV2URL`、`metroURL`、`busURL`、`busV3URL`、`traURL`、`traV3URL`、`afrV3URL`、`thsrV2URL`

### `data` / `datax`

- `data`：人工維護的基礎資料庫
- `datax`：預抓的靜態資料。主包含 `trtc` / `krtc` / `tymc` / `ntmc` / `tmrt` / `klrt` 的 line・station（＋trtc/krtc/ntmc transfer）、`thsr.station`、`tra` line・station・train、`afr` 全套（line/station/train/time/fare）、`rail.operator`
- 大體積資料（各家時刻表 time 與票價 fare）在獨立 bundle `dist/rocptx.datax.heavy.js`，以 `datax.attachHeavy(...)` 掛載
- 更新流程：`npm run datax:refresh`（契約驗證見 `nodejs/datax-schema.js`）

### `metro`

`metro` 是所有捷運 operator wrapper 的共同基底。

#### 基礎公開成員

- `getCompanyTag`
- `getStationOnWhatLineID`
- `urls`
- `companyTag`
- `baseMethod`

`companyTag` 目前對應：

- `trtc -> TRTC`
- `tymc -> TYMC`
- `tmrt -> TMRT`
- `klrt -> KLRT`
- `krtc -> KRTC`
- `ntmc -> NTMC`

#### 自動產生的低階 API 方法

`metro.urls` 目前除 `Network` 外，會對應為下列 `_Xxx(companyTag, cfg)`：

- `_Line`
- `_Station`
- `_StationOfLine`
- `_LineTransfer`
- `_Alert`
- `_StationFacility`
- `_StationExit`
- `_Route`
- `_StationOfRoute`
- `_FirstLastTimetable`
- `_Frequency`
- `_S2STravelTime`
- `_ODFare`
- `_LiveBoard`
- `_LivePosition`
- `_StationTimeTable`
- `_StationTransfer`
- `_TransferStations`（依 Swagger `RailSystem` 目前僅支援 `TRTC_NTMC`、`KRTC`）
- `_News`（依 Swagger 支援 `TRTC`、`KRTC`、`TYMC`、`KLRT`、`TMRT`）
- `_StationPlatform`（依 Swagger 目前僅支援 `KLRT`）
- `_StoppingPattern`（依 Swagger 目前僅支援 `TYMC`）
- `_Shape`

#### `new metro.baseMethod(company)` 會額外帶入的便利方法

- `getRoute`
- `getAlert`
- `getLineFrequency`
- `getLineTransfer`
- `getFirstLastTimetable`
- `getS2STravelTime`
- `getStationOfLine`
- `getStationOfRoute`
- `getFromToFare`
- `getFromToTravelTime`
- `getStation`
- `getStationTimeTable`
- `getStationFacility`
- `getStationFirstLastTimetable`
- `getStationExit`
- `getStationTransfer`
- `getStationFare`
- `getStationLiveBoard`
- `getLivePosition`

#### `baseMethod.catchData` 公開方法

- `calcStationDayTimeBySimple`
- `calcStationTimeByHeadWays`
- `calcLineTimeByFirstStation`
- `getDataXLineObj`
- `getDataXLineMainSub`
- `getDataXRouteDirectionInfo`
- `getDataXRouteMainTerminal`
- `getDataXS2STravelTime`
- `getDataXStationData`
- `getDataXStationName`
- `getDataXTransferOfLine`
- `getDataXTransferStation`
- `getStationByTimeSimpleArray`
- `Line`
- `Station`
- `Transfer`
- `Fare`
- `TimeTable`
- `TimeSimple`

### `trtc` / `tmrt` / `krtc` / `tymc` / `klrt` / `ntmc`

這六個模組都繼承 `metro.baseMethod`，因此都具有上面列出的低階 `_Xxx` 方法、便利方法與 `catchData`。

各自額外 helper 如下：

| 模組 | 額外公開 helper |
|---|---|
| `trtc` | `checkRouteIdOnUse`、`getLineData`、`getLineID`、`getOriginalLineByLineID`、`getStationData`、`getStationIDAry`、`getStationID`、`getStationIDInWhatLine`、`getStationTime`、`getFormatStationTime`、`getOriginalStationID`、`getByStationID` |
| `tmrt` | `checkRouteIdOnUse`、`getLineData`、`getLineID`、`getOriginalLineByLineID`、`getStationIDAry`、`getStationID`、`getStationIDInWhatLine`、`getStationTime`、`getFormatStationTime`、`getOriginalStationID` |
| `krtc` | `checkRouteIdOnUse`、`getLineData`、`getLineID`、`getOriginalLineByLineID`、`getStationIDAry`、`getStationID`、`getStationIDInWhatLine`、`getStationTime`、`getFormatStationTime`、`getOriginalStationID` |
| `tymc` | `checkRouteIdOnUse`、`getLineData`、`getLineID`、`getOriginalLineByLineID`、`getStationIDAry`、`getStationID`、`getStationIDInWhatLine`、`getStationTime`、`getFormatStationTime`、`getOriginalStationID` |
| `klrt` | `checkRouteIdOnUse`、`getLineData`、`getLineID`、`getOriginalLineByLineID`、`getStationIDAry`、`getStationID`、`getStationIDInWhatLine`、`getStationTime`、`getFormatStationTime`、`getOriginalStationID` |
| `ntmc` | `checkRouteIdOnUse`、`getLineData`、`getLineID`、`getOriginalLineByLineID`、`getStationData`、`getStationIDAry`、`getStationID`、`getStationIDInWhatLine`、`getStationTime`、`getFormatStationTime`、`getOriginalStationID`、`getByStationID` |

NTMC（新北捷運）依最新 Swagger 已支援絕大多數 Metro v2 端點（含 `StationTimeTable`、`TransferStations` 的 `TRTC_NTMC`），但 `LiveBoard`、`News`、`Alert`、`LivePosition` 尚未提供 NTMC。

### `bus`

目前 `bus` v2 直接公開方法（50）：

- `setDefaultCfg`
- `getCityData`
- `getBusArriveTime`
- `getBusRouteArriveTime`
- `getBusRouteInfo`
- `getBusRealtimeNearStop`
- `getBusRoute`
- `getBusStation`
- `getPositionBusStation`
- `getPromisePositionBusStation`
- `getBusStopRoute`
- `getPromiseBusStopRoute`
- `getPromiseMultiBusStopRoute`
- `getBusStopRouteByNumber`
- `getEstimatedTimeOfArrival`
- `searchBusByNumber`
- `getBusOperator`
- `getBusRouteFare`
- `getBusRouteFareByNumber`
- `getBusShape`
- `getBusShapeByNumber`
- `getBusSchedule`
- `getBusScheduleByNumber`
- `getBusVehicle`
- `getBusAlert`
- `getBusStop`
- `getBusDisplayStopRoute`
- `getBusDisplayStopRouteByNumber`
- `getBusDailyTimeTable`
- `getBusDailyTimeTableByNumber`
- `getBusRouteNetwork`
- `getBusRouteNetworkByNumber`
- `getBusDailyStopTimeTable`
- `getBusDailyStopTimeTableByNumber`
- `getBusDataVersion`
- `getBusFirstLastTripInfo`
- `getBusFirstLastTripInfoByNumber`
- `getBusNews`
- `getBusRealTimeByFrequency`
- `getBusRealTimeByFrequencyByNumber`
- `getBusRealTimeByFrequencyStreaming`
- `getBusRealTimeByFrequencyStreamingByNumber`
- `getBusRealTimeNearStopStreaming`
- `getBusRealTimeNearStopStreamingByNumber`
- `getBusEstimatedTimeOfArrivalStreaming`
- `getBusEstimatedTimeOfArrivalStreamingByNumber`
- `getBusStationGroup`
- `getBusS2STravelTime`
- `getBusRouteTPASS`
- `getBusRouteTPASSByNumber`

補充：Bus v2 目前主要規格群組已補齊，新增對應 `Operator` / `RouteFare` / `Shape` / `Schedule` / `Vehicle` / `Alert` / `Stop` / `DisplayStopOfRoute` / `DailyTimeTable` / `RouteNetwork` / `DailyStopTimeTable` / `DataVersion` / `FirstLastTripInfo` / `News` / `RealTimeByFrequency` / `RealTimeByFrequency/Streaming` / `StationGroup` / `S2STravelTime` / `RouteTPASS`；其中 `RouteFare`、`Shape`、`Schedule`、`DisplayStopOfRoute`、`DailyTimeTable`、`RouteNetwork`、`DailyStopTimeTable`、`FirstLastTripInfo`、`RealTimeByFrequency`、`RealTimeByFrequency/Streaming`、`RouteTPASS` 另提供 `ByNumber` 版以對應 `{RouteName}` 端點。當 `cfg.manageBy = 'InterCity'` 時，`Alert`、`Stop`、`DailyTimeTable`、`DataVersion`、`FirstLastTripInfo`、`News`、`RealTimeByFrequency`、`RealTimeByFrequency/Streaming`、`StationGroup`、`S2STravelTime`、`RouteTPASS` 會自動切到 `InterCity` 路徑，`getBusVehicle` 則會走通用 `/v2/Bus/Vehicle`；`DisplayStopOfRoute`、`RouteNetwork`、`DailyStopTimeTable` 與 `getBusFirstLastTripInfoByNumber` 目前依 Swagger 僅支援 `City` 版，`getBusS2STravelTime` 依 Swagger 使用 `RouteID` 作為必要參數。另於同一命名空間下新增 `bus.v3` 子模組。

2026-07 InterCity 修正與補齊：

- 舊核心方法（`getBusRouteInfo`、`getBusRealtimeNearStop`、`getBusRoute`、`getBusStation`、`getPositionBusStation`、`getBusStopRoute` 系列、`getEstimatedTimeOfArrival`、`searchBusByNumber` 等）原本在 `cfg.manageBy='InterCity'` 時會組出錯誤的 `/InterCity/{City}` 路徑，現已統一改走 `buildBusURL`，InterCity 時正確省略城市段
- 新增 `RealTimeNearStop/Streaming` 與 `EstimatedTimeOfArrival/Streaming` 封裝（含 `ByNumber` 版），City / InterCity 皆支援
- 至此 Bus v2 的 35 條 InterCity 路徑已全部可透過 `cfg.manageBy='InterCity'` 存取

### `bus.v3`

目前 `bus.v3` 直接公開成員（60）：

- metadata：`urls`、`getCityData`、`drts`、`shuttleHospital`、`shuttleSciencePark`、`ptxAutoBusV3FunctionKey`
- 一般 `CityBus` convenience helper（27）：`getNetwork`、`getStop`、`getStation`、`getRoute`、`getSubRoute`、`getFirstLastTripInfo`、`getDepot`、`getStopOfRoute`、`getDisplayStopOfRoute`、`getRouteFare`、`getSchedule`、`getDailyTimeTable`、`getRealTimeByFrequency`、`getRealTimeByFrequencyByRouteName`、`getRealTimeNearStop`、`getRealTimeNearStopByRouteName`、`getEstimatedTimeOfArrival`、`getEstimatedTimeOfArrivalByRouteName`、`getAlert`、`getNews`、`getOperator`、`getVehicle`、`getVehicleDepot`、`getVehicleRoute`、`getShape`、`getRouteNetwork`、`getS2STravelTime`
- 同名 `_Xxx` 低階 wrapper（27）：對應上述一般 `CityBus` v3 路徑與 route-name 變體

補充：`bus.v3` 現已對應 `公共運輸_公車_v3.json` 的完整公開路徑（75 條），除一般 `CityBus` 外，另提供三個子命名空間：

> **重要限制**：依 Swagger enum 與實測（2026-07），一般 `CityBus` v3 端點目前僅支援 `Tainan` 一個城市（其他城市回 400）；DRTS 反而支援 `Taipei` / `NewTaipei` / `Taichung` / `Tainan` 四城。城市大範圍查詢請仍用 `bus`（v2）。

- `bus.v3.drts` 公開成員（70）：`urls`、`getCityData`、33 組 DRTS convenience helper、33 組同名 `_Xxx` 低階 wrapper，以及 `ptxAutoBusV3DRTSFunctionKey`；其中 `StopOfRoute`、`RouteFare`、`Schedule`、`Shape`、`SubRoute`、`DailyTimeTable`、`GeneralStopTimeTable`、`DailyStopTimeTable`、`RealTimeByFrequency`、`RealTimeNearStop`、`EstimatedTimeOfArrival` 另提供 `ByRouteName` helper；新增 `StationGroup`、`Location`、`LocationGroup` 查詢；依最新 Swagger，DRTS 營運城市為 `Taipei`、`NewTaipei`、`Taichung`、`Tainan`
- `bus.v3.shuttleHospital` 公開成員（14）：`urls`、6 組 Shuttle/Hospital convenience helper、6 組同名 `_Xxx` 低階 wrapper，以及 `ptxAutoBusV3ShuttleHospitalFunctionKey`；注意最新規格中 `Schedule` 回應的 `Frequencies` 已移除 `OperatorID`、`RouteID`、`Direction` 欄位
- `bus.v3.shuttleSciencePark` 公開成員（20）：`urls`、9 組 Shuttle/SciencePark convenience helper（`getAuthority`、`getOperator`、`getStop`、`getRoute`、`getStopOfRoute`、`getSchedule`、`getRealTimeByFrequency`、`getRealTimeNearStop`、`getEstimatedTimeOfArrival`）、9 組同名 `_Xxx` 低階 wrapper，以及 `ptxAutoBusV3ShuttleScienceParkFunctionKey`
- 回傳型態比照 `tra.v3` 採 Promise 風格，`cfg` 支援 `selectField`、`filterBy`、`orderBy`、`orderDir`、`top`

### `thsr`

高鐵不是預留模組，**目前已實作於 `rocptx.thsr.v2`**。

#### `rocptx.thsr.v2` 便利方法

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
- `getFromToFare`（`_ODFareFromTo` alias）

#### `rocptx.thsr.v2` 自動產生 `_Xxx`

- `_Station`
- `_StationOfLine`
- `_ODFare`
- `_GeneralTimetable`
- `_DailyTrainInfo_Today`
- `_DailyTrainInfo_TrainDate`
- `_DailyTimetable_Today`
- `_DailyTimetable_TrainDates`
- `_AlertInfo`
- `_News`
- `_Shape`
- `_StationExit`
- `_AvailableSeatStatusList_All`
- `_AvailableSeatStatus_Today`
- `_DailyFreeSeatingCar_Today`
- `_ODFareFromTo`
- `_GeneralTimetable_TrainNo`
- `_DailyTrainInfo_Today_TrainNo`
- `_DailyTrainInfo_TrainNo_TrainDate`
- `_DailyTimetable_Today_TrainNo`
- `_DailyTimetable_TrainDate_TrainDate`
- `_DailyTimetable_TrainNo_TrainDate`
- `_DailyTimetable_Station_TrainDate`
- `_DailyTimetable_OD_TrainDate`
- `_AvailableSeatStatusList`
- `_AvailableSeatStatus_TrainDate`
- `_AvailableSeatStatus_OD_TrainDate`
- `_AvailableSeatStatus_OD_OriginStationID_to_DestinationStationID_TrainDate`
- `_AvailableSeatStatus_OD_OriginStationID_to_DestinationStationID_TrainDate_TrainNo`
- `_DailyFreeSeatingCar_TrainDate`

#### `rocptx.thsr.v2.catchData`

- `getDataXStationData`
- `getDataXStationName`
- `GeneralTimetable`
- `Station`
- `SimpleTimetable`

#### THSR 最新規格注意事項（2026-07 版 Swagger）

- `AvailableSeatStatus*` 系列回應的資料陣列屬性由 `Items` 更名為 `AvailableSeats`
- `DailyFreeSeatingCar*` 系列回應的資料陣列屬性由 `Items` 更名為 `FreeSeatingCars`
- `DailyTrainInfo` / `GeneralTrainInfo` 回應新增 `Overnight`（跨夜車班標記）欄位
- SDK 皆回傳原始 JSON，程式面不受影響，但使用端若有解析 `Items` 需改用新屬性名
- 2026-07 已補上原缺漏的 `DailyTimetable/TrainDates` 與 `DailyTrainInfo/TrainDate/{TrainDate}`，**THSR v2 的 30 條規格路徑現已全數覆蓋**

### `tra`

#### `rocptx.tra`（v2 為主、部分行為橋接 v3）

便利 / 封裝方法：

- `getStationOfLine`
- `getStation`
- `getStationFare`
- `getStationTodayTimeTable`
- `getStationLiveBoard`
- `getTrainLiveBoard`
- `getFromToTimeTable`
- `getLiveFromToTimeTable`
- `getFromToFare`（`_ODFareFromTo` alias）
- `v2Sv3`
- `v3Sv2`

自動產生 `_Xxx`（v2）：

- `_Network`
- `_Line`
- `_Station`
- `_StationOfLine`
- `_TrainType`
- `_ODFare`
- `_Shape`
- `_GeneralTrainInfo`
- `_GeneralTimetable`
- `_DailyTrainInfo_Today`
- `_DailyTimetable_Today`
- `_LiveBoard`
- `_LiveTrainDelay`
- `_ODFareFromTo`
- `_GeneralTrainInfo_TrainNo`
- `_GeneralTimetable_TrainNo`
- `_DailyTrainInfo_Today_TrainNo`
- `_DailyTrainInfo_TrainDate`
- `_DailyTrainInfo_TrainNo_TrainDate`
- `_DailyTimetable_Today_TrainNo`
- `_DailyTimetable_TrainDate_TrainNo`
- `_DailyTimetable_TrainNo_TrainDate`
- `_DailyTimetable_Station_TrainDate`
- `_DailyTimetable_OD_TrainDate`
- `_LiveBoard_Station`

`tra.catchData`：

- `getDataXLineObj`
- `getDataXStationData`
- `getDataXTrain`
- `getDataXStationName`
- `Line`
- `GeneralTimetable`
- `Station`
- `TrainType`
- `SimpleLine`
- `SimpleTimetable`

#### `rocptx.tra.v3`

便利方法：

- `getStationOfLine`
- `getStation`
- `getStationTodayTimeTable`
- `getDailyTrainTimetableDates`
- `getOperator`
- `getLineNetwork`
- `getNews`
- `getStationFacility`

自動產生 `_Xxx`（v3）：

- `_Network`
- `_Station`
- `_StationExit`
- `_StationFacility`
- `_Line`
- `_StationOfLine`
- `_TrainType`
- `_GeneralTrainTimetable`
- `_GeneralStationTimetable`
- `_SpecificTrainTimetable`
- `_DailyTrainTimetable_Today`
- `_DailyStationTimetable_Today`
- `_StationLiveBoard`
- `_TrainLiveBoard`
- `_LineTransfer`
- `_StationTransfer`
- `_News`
- `_Alert`
- `_Shape`
- `_ODFareFromTo`
- `_GeneralTrainTimetable_TrainNo`（2026-07 修正：原 `_GeneralTimetable_TrainNo` 指向不存在的 v3 路徑）
- `_GeneralStationTimetable_Station`
- `_SpecificTrainTimetable_TrainNo`
- `_DailyTrainTimetable_Today_TrainNo`
- `_DailyTrainTimetable_TrainDate`
- `_DailyTrainTimetable_OD_TrainDate`
- `_DailyTrainTimetable_OD_Inclusive_TrainDate`
- `_DailyStationTimetable_Today_Station`
- `_DailyStationTimetable_TrainDate`
- `_StationLiveBoard_Station`
- `_TrainLiveBoard_TrainNo`
- `_DailyTrainTimetable_TrainDates`
- `_Operator`
- `_LineNetwork`

`tra.v3.catchData`：

- `getDataXLineObj`
- `getDataXStationData`
- `getDataXTrain`
- `getDataXStationName`
- `Line`
- `GeneralTrainTimetable`
- `Station`
- `TrainType`
- `SimpleLine`
- `TrainDates`
- `Operator`
- `LineNetwork`
- `SimpleTimetable`

### `afr`

AFR 目前實作於 `rocptx.afr.v3`。

#### `rocptx.afr.v3` 便利方法

- `getNetwork`
- `getStation`
- `getLine`
- `getOperator`
- `getGeneralTrainTimetable`
- `getODFare`
- `getRoute`
- `getStationOfLine`
- `getTrainType`
- `getStationOfRoute`
- `getNews`
- `getShape`
- `getFromToFare`（`_ODFare_OriginStationID_to_DestinationStationID` alias）

#### `rocptx.afr.v3` 自動產生 `_Xxx`

- `_Network`
- `_Station`
- `_Line`
- `_Operator`
- `_GeneralTrainTimetable`
- `_ODFare`
- `_Route`
- `_StationOfLine`
- `_TrainType`
- `_StationOfRoute`
- `_News`
- `_Shape`
- `_GeneralTrainTimetable_TrainNo`
- `_ODFare_OriginStationID_to_DestinationStationID`

其他公開成員：`urls`、`ptxAutoAFRFunctionKey`

### `rail`

跨軌道系統共用查詢，實作於 `rocptx.rail.v2`，對應 `公共運輸_軌道_v2.json` 的 `/v2/Rail/*` 跨系統路徑。

#### `rocptx.rail.v2` 便利方法

- `getOperator(cfg)`：取得軌道營運業者基本資料
- `getS2SDistance(RailSystem, cfg)`：取得指定軌道系統相鄰兩站站間距離
- `getODDistance(RailSystem, cfg)`：取得指定軌道系統起迄站間距離
- `getODDistanceFromTo(RailSystem, OriginStationName, DestinationStationName, cfg)`：取得指定起迄站站間距離
- `getODFareFromTo(RailSystem, OriginStationName, DestinationStationName, cfg)`：取得指定起迄站站間票價
- `getFromToFare`（`getODFareFromTo` alias）

#### `rocptx.rail.v2` 自動產生 `_Xxx`

- `_Operator`
- `_S2SDistance`
- `_ODDistance`
- `_ODDistance_OriginStationName_to_DestinationStationName`
- `_ODFare_OriginStationName_to_DestinationStationName`

`RailSystem` 依 Swagger 支援 `TRTC`、`KRTC`、`TYMC`、`TMRT`、`NTDLRT`、`NTMC`、`NTALRT`、`KLRT`、`TRA`、`THSR`、`AFR`（各端點略有差異；OD 類端點台北捷運需使用 `TRTC_NTMC`，`ODFare` 不支援 `AFR`）。

其他公開成員：`urls`、`ptxAutoRailFunctionKey`

### `router`

`src/router.js` 本身只是一層 namespace export，**沒有額外平面方法**，目前只有：

- `router.bus`
- `router.v1`
- `router.v2`

各子 namespace 狀態：

- `router.bus`：`findDirectBus`
- `router.v1`：目前為空物件 placeholder
- `router.v2`：目前提供 `trtc`、`krtc`、`tymc`、`ntmc`

`router.v2` 各公司實際可用度（2026-07 測試盤點）：

- `trtc` / `tymc` / `krtc`：可用，block 推導與路徑搜尋正常（krtc 靜態資料已於 2026-07 補入 `data.js` / `id.js`，紅橘線經美麗島 `meilidao1` 轉乘）
- `krtc` 已知限制：橘線端點大寮 `OT1` 的站碼前綴無法被 `getMRTStationIDInWhatLine` 解析（兩字母加一位數字），`getMRTThrough` / `getAllLineRoute` 以 `OT1` 為起訖點時查不到路徑
- `ntmc`：可用（2026-07 補入環狀線 Y07~Y20 靜態資料至 `data.js` 與 `datax/ntmc.line.json`、`datax/ntmc.station.json`），block 推導、`getMRTThrough`、`getAllLineRoute` 正常
- `ntmc` 已知限制：TDX 的 NTMC 僅含環狀線（安坑、淡海輕軌屬 `NTDLRT`，不在此 wrapper 範圍）；環狀線 5 個轉乘站（Y07/Y11/Y16/Y17/Y18）皆轉往北捷（跨公司），`getAllLineRoute` 會略過這些跨公司轉乘目標，跨公司路徑搜尋需另行組合 `router.v2.trtc`；TDX 未提供 NTMC 的 `Frequency`，datax line 無班距資料

`router.v2.<company>` 目前方法：

- `getBlockData`
- `getAllLineRoute`
- `getStationBlockByID`
- `findBlock`
- `getMRTThrough`
- `findTransfer`

### `id`

`rocptx.id` 目前公開結構：

- `idTrans`
- `mrtLineTrans`
- `thsr`
- `tra`
- `trtc`
- `krtc`
- `tymc`
- `ntmc`
- `getMRTStationIDInWhatLine`

各子工具方法：

- `id.thsr`：`getPTXV2`、`getRPIDbyPTXV2`
- `id.tra`：`getPTXV2`、`getPTXV3`、`getPTXV3byV2`、`getPTXV2byV3`、`getRPIDbyPTXV2`、`getRPIDbyPTXV3`
- `id.trtc`：`getPTXV2`、`getRPIDbyPTXV2`、`getLINE_LineIDbyRPID`、`getLINE_RPIDbyLineID`
- `id.krtc`：`getPTXV2`、`getRPIDbyPTXV2`、`getLINE_LineIDbyRPID`、`getLINE_RPIDbyLineID`
- `id.tymc`：`getPTXV2`、`getRPIDbyPTXV2`、`getLINE_LineIDbyRPID`、`getLINE_RPIDbyLineID`
- `id.ntmc`：`getPTXV2`、`getRPIDbyPTXV2`、`getLINE_LineIDbyRPID`、`getLINE_RPIDbyLineID`

## 和既有文件 / TDX docs 的同步結果

### 已對應

- `src/main.js` 的 18 個公開匯出已整理入本檔（含 `ntmc`、`rail`）
- 2026-07 已依最新 TDX Swagger 完成一輪盤點：`bus.v3` 補齊 DRTS 新群組與 `Shuttle/SciencePark`，`metro` 補 `TransferStations`，新增 `rail.v2` 跨系統查詢
- `metro` 與五個 operator wrapper 的實際公開方法已重新對齊
- `bus.js` 已補上 Bus v2 主要群組：`Operator`、`RouteFare`、`Shape`、`Schedule`、`Vehicle`、`Alert`、`Stop`、`DisplayStopOfRoute`、`DailyTimeTable`、`RouteNetwork`、`DailyStopTimeTable`、`DataVersion`、`FirstLastTripInfo`、`News`、`RealTimeByFrequency`、`RealTimeByFrequency/Streaming`、`StationGroup`、`S2STravelTime`、`RouteTPASS`
- `thsr.v2` 已列為正式實作，不再標示為預留
- `tra` / `tra.v3` 已按目前原始碼重列，包含新增的 `TrainDates`、`Operator`、`LineNetwork`、`News`、`StationFacility`
- `afr` / `afr.v3` 已按目前原始碼補入，對應 AFR v3 全部 14 條路徑
- `router` 已改按實際結構描述為 `bus / v1 / v2` 三個 namespace

### 部分對應

- `doc/tdx_docs/公共運輸_公車_v2.json` 的主要 Bus v2 規格群組已可對應到 `bus.js`
- 目前 Bus 主要剩餘擴充範圍已轉到 `公共運輸_公車_v3.json` 與更高階 helper
- `router.v2` 目前支援 `trtc`、`krtc`、`tymc`、`ntmc`，尚未擴到 `tmrt` / `klrt`
- 多數 rail / metro Swagger 端點已能透過自動產生 `_Xxx` 存取，但並非每個端點都已有高階 convenience wrapper

### 尚未完整建立

- 以 `doc/tdx_docs/*.json` 為準，旅運規劃與更多進階資料集仍有大量端點未形成獨立 SDK 類別 / 模組
- `router.v1` 目前仍是空命名空間
- 進一步缺口、增刪與優先順序請參考 `doc/tdx_docs/upgrade_plan.md`

## 維護規則

後續新增 / 調整 SDK 時，建議同步更新：

1. `src/main.js`：公開匯出面
2. `doc/API_MAPPING.md`：方法總表
3. `README.md`：對外使用說明
4. `doc/README.md`：文件索引
5. `doc/tdx_docs/upgrade_plan.md`：若涉及 TDX 文件覆蓋差異
