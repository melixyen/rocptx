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
- `trtc` / `tmrt` / `krtc` / `tymetro` / `klrt`：各捷運系統 wrapper
- `thsr.v2`：台灣高鐵
- `tra` / `tra.v3`：台鐵 v2 / v3
- `afr.v3`：AFR rail v3 查詢
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

## ESM / 原始碼入口

套件入口是 `src/main.js`，會把以下公開模組掛到 `ptx` 後再 default export：

- `data`
- `datax`
- `bus`
- `metro`
- `trtc`
- `tmrt`
- `krtc`
- `tymetro`
- `klrt`
- `thsr`
- `tra`
- `afr`
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

其中 `RouteFare`、`Shape`、`Schedule` 已提供 `ByNumber` helper；`cfg.manageBy = 'InterCity'` 時可切到城際公車路徑。

`bus.v3` 現已提供 Promise 風格的公車 v3 wrapper，包含：

- 一般 `CityBus`：`Network`、`Stop`、`Station`、`Route`、`SubRoute`
- 一般 `CityBus`：`FirstLastTripInfo`、`Depot`、`StopOfRoute`、`DisplayStopOfRoute`
- 一般 `CityBus`：`RouteFare`、`Schedule`、`DailyTimeTable`、`Alert`
- 一般 `CityBus`：`News`、`Operator`
- 一般 `CityBus`：`Vehicle`、`VehicleDepot`、`VehicleRoute`、`Shape`、`RouteNetwork`、`S2STravelTime`
- 一般 `CityBus` 動態資料：`RealTimeByFrequency`、`RealTimeNearStop`、`EstimatedTimeOfArrival`
- `bus.v3.drts`：DRTS `Stop`、`Station`、`Operator`、`Route`、`BookingRule`、`StopOfRoute`、`RouteFare`、`Schedule`、`Shape`、`S2STravelTime`、`Vehicle`、`Alert` 與動態資料
- `bus.v3.shuttleHospital`：`Authority`、`Operator`、`Stop`、`Route`、`StopOfRoute`、`Schedule`

其中一般 `CityBus` 的動態資料與 `DRTS` 的 route-name 端點皆已提供 `ByRouteName` helper；低階 `_Xxx` wrapper 與 `urls` 也一併公開，方便直接組查詢。

### `metro` family

- `metro` 提供各捷運系統共用的 `_Xxx` 低階 API 與 `baseMethod`
- `trtc` / `tmrt` / `krtc` / `tymetro` / `klrt` 提供更方便的公司別 wrapper
- 常用能力包括：`getRoute`、`getStation`、`getStationOfLine`、`getLineTransfer`、`getAlert`、`getLivePosition`、`getStationTransfer`、`getFromToFare`、`getStationTimeTable`

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
- `getFromToFare`

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
- `rocptx.id.tymetro`
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
   - Metro 公司特化 → `src/trtc.js`、`src/tmrt.js`、`src/krtc.js`、`src/tymetro.js`、`src/klrt.js`
   - THSR → `src/thsr.js`
   - TRA → `src/tra.js`
   - AFR → `src/afr.js`

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

### 最後只要記住 6 件事

1. 先分類，再寫 code。
2. 先補 `urls`，再補 `_Xxx`，最後才補 `getXxx`。
3. 沿用同檔案既有風格，不要硬統一整個 repo。
4. 需要資料整理時用 `catchData`；需要 ID 互轉時用 `id.js`；需要路徑推導時才用 `router`。
5. 要公開就記得接到 `src/main.js`。
6. 新增功能後，文件與打包流程要一起檢查。

## 現況說明

- 文件目前已以 `src/*.js` 為準完成一輪同步
- Bus P1 第一批缺口已補上：`Operator` / `RouteFare` / `Shape` / `Schedule` / `Vehicle`
- 後續擴充建議請直接看 `doc/tdx_docs/upgrade_plan.md`

## 相關工具

- [車站路線 ID 列表查詢](https://melixyen.github.io/rocptx/app/list_data.html)