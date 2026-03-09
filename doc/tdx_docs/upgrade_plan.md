## rocptx × TDX 文件升級計畫

### 1. 目的

本文件用來對照目前 `rocptx` Node.js SDK 已提供的 API 模組，與 `doc/tdx_docs/` 底下的 TDX Swagger 匯出文件（`tdx.md` + 各 JSON）之間的關係，整理出：

- 已對應到的模組 / API 群組
- 僅部分對應到的模組 / API 群組
- 尚未對應到的文件主題
- 尚未建立的 SDK 類別 / 模組
- 文件與程式之間已出現的增刪差異

### 2. 盤點口徑

- **SDK 口徑**：以 `src/main.js` 對外匯出的公開模組為主，必要時再拆到版本化子命名空間（如 `thsr.v2`、`tra.v3`）。
- **文件口徑**：以 `doc/tdx_docs/*.json` 為 API 覆蓋範圍的主要依據；`tdx.md` 視為這些 JSON 的彙整版 markdown。
- **類別定義**：本專案大多以 object / namespace 形式輸出，並非大量使用 ES class；因此下文的「類別」以**公開模組 / 命名空間**為主，真正可辨識的共用 class 主要是 `metro.baseMethod`。

### 3. 目前 SDK API 模組與數量

`src/main.js` 目前對外匯出共 **15** 個鍵：

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
- `router`
- `jsSHA`
- `id`
- `common`

若只計 **直接對應 TDX 運輸 API 的公開模組**，目前共有 **9 個**：

1. `bus`
2. `metro`
3. `trtc`
4. `tmrt`
5. `krtc`
6. `tymetro`
7. `klrt`
8. `thsr`
9. `tra`

若把版本化子命名空間也拆開視為主要 API 面，則可視為 **10 個主要 SDK API 面**：

1. `bus`
2. `metro`
3. `trtc`
4. `tmrt`
5. `krtc`
6. `tymetro`
7. `klrt`
8. `thsr.v2`
9. `tra`（主要對應 v2）
10. `tra.v3`

補充：

- **捷運營運商封裝模組**共 **5 個**：`trtc` / `tmrt` / `krtc` / `tymetro` / `klrt`
- **明確可辨識的共用 base class** 主要為 **1 個**：`metro.baseMethod`

### 4. `doc/tdx_docs` 文件與 JSON 資源數量

目前 `doc/tdx_docs/` 共有：

- **1 份**總覽 markdown：`tdx.md`
- **18 份** Swagger / OpenAPI JSON
- JSON 合計約 **661 條 path**

#### 4.1 `tdx.md` 與 JSON 的關係

- `tdx.md`：人類可讀的彙整版文件
- `*.json`：機器可讀的 Swagger / OpenAPI 規格，較適合作為比對 SDK 覆蓋率的主依據

因此本次對照以 **JSON 為準**，`tdx.md` 作為索引與人工閱讀補充。

#### 4.2 各文件主題盤點

| 文件 | 路徑數 | 與目前 SDK 關係 | 判定 |
|---|---:|---|---|
| `公共運輸_軌道_v2.json` | 79 | 對應 `metro` / `trtc` / `tmrt` / `krtc` / `tymetro` / `klrt` / `thsr.v2` / `tra(v2)` | 部分對應 |
| `公共運輸_軌道_v3.json` | 49 | 對應 `tra.v3`；`AFR` 尚未建立 | 部分對應 |
| `公共運輸_公車_v2.json` | 79 | 對應 `bus`，但僅覆蓋 route / station / ETA / realtime 等核心群組 | 部分對應 |
| `公共運輸_公車_v3.json` | 55 | 無專屬 `bus.v3` 模組；DRTS / Shuttle 尚未建立 | 未對應 |
| `共通資料_公共運輸_v2.json` | 4 | 無對應公開模組 | 未對應 |
| `共通資料_行政區_v2.json` | 6 | 無對應公開模組 | 未對應 |
| `共通資料_道路_v2.json` | 10 | 無對應公開模組 | 未對應 |
| `公共運輸_自行車_v2.json` | 3 | 無對應公開模組 | 未對應 |
| `公共運輸_航空_v2.json` | 20 | 無對應公開模組 | 未對應 |
| `公共運輸_航運_v3.json` | 40 | 無對應公開模組 | 未對應 |
| `GIS圖資_v3.json` | 34 | 無對應公開模組 | 未對應 |
| `停車資訊_v1.json` | 73 | 無對應公開模組 | 未對應 |
| `有聲號誌_v1.json` | 2 | 無對應公開模組 | 未對應 |
| `綠色運輸_充電樁_v1.json` | 49 | 無對應公開模組 | 未對應 |
| `觀光資訊_v2.json` | 30 | 無對應公開模組 | 未對應 |
| `路段編碼_v2.json` | 44 | 無對應公開模組 | 未對應 |
| `路況資訊_v2.json` | 79 | 無對應公開模組 | 未對應 |
| `道路事件_v1.json` | 5 | 無對應公開模組 | 未對應 |

### 5. 已對應 / 部分對應 / 未對應

#### 5.1 已對應到的主軸

目前 SDK 明確已經建立出可對應到 TDX 文件的主軸如下：

1. **捷運（Metro v2）**
   - 對應模組：`metro` + `trtc` + `tmrt` + `krtc` + `tymetro` + `klrt`
   - 對應文件：`公共運輸_軌道_v2.json` 的 `v2/Rail/Metro/*`

2. **高鐵（THSR v2）**
   - 對應模組：`thsr.v2`
   - 對應文件：`公共運輸_軌道_v2.json` 的 `v2/Rail/THSR/*`

3. **台鐵（TRA v2 / v3）**
   - 對應模組：`tra`、`tra.v3`
   - 對應文件：
     - `公共運輸_軌道_v2.json` 的 `v2/Rail/TRA/*`
     - `公共運輸_軌道_v3.json` 的 `v3/Rail/TRA/*`

4. **公車（Bus v2 部分）**
   - 對應模組：`bus`
   - 對應文件：`公共運輸_公車_v2.json`

#### 5.2 部分對應到的細項

#### Metro v2

SDK 已涵蓋的主要群組：

- `FirstLastTimetable`
- `Frequency`
- `Line`
- `LiveBoard`
- `ODFare`
- `Route`
- `S2STravelTime`
- `Shape`
- `Station`
- `StationExit`
- `StationFacility`
- `StationOfLine`
- `StationTimeTable`

文件有、SDK 尚未完整建立的群組：

- `Alert`
- `LineTransfer`
- `LivePosition`
- `News`
- `StationOfRoute`
- `StationPlatform`
- `StationTransfer`
- `StoppingPattern`

備註：`Network` 雖出現在 `src/metro.js` URL 定義中，但目前不是像其他捷運群組那樣完整封裝成一般對外使用面。

#### THSR v2

SDK 已涵蓋的主要群組：

- `Station`
- `ODFare`
- `GeneralTimetable`
- `DailyTrainInfo`
- `DailyTimetable`
- `AlertInfo`
- `News`
- `Shape`
- `AvailableSeatStatusList`（部分）

文件有、SDK 尚未完整建立的群組：

- `AvailableSeatStatus`
- `DailyFreeSeatingCar`
- `StationExit`
- `StationOfLine`

#### TRA v2

`tra`（v2）是目前覆蓋率最高的模組之一，已對應到下列主要群組：

- `Network`
- `Line`
- `Station`
- `StationOfLine`
- `TrainType`
- `ODFare`
- `Shape`
- `GeneralTrainInfo`
- `GeneralTimetable`
- `DailyTrainInfo`
- `DailyTimetable`
- `LiveBoard`
- `LiveTrainDelay`

結論：**TRA v2 在群組層級幾乎完整對應**，是目前最成熟的 rail 模組。

#### TRA v3

SDK 已涵蓋的主要群組：

- `Alert`
- `DailyStationTimetable`
- `DailyTrainTimetable`
- `GeneralStationTimetable`
- `GeneralTrainTimetable`
- `Line`
- `LineNetwork`
- `LineTransfer`
- `Network`
- `ODFare`
- `Operator`
- `Shape`
- `SpecificTrainTimetable`
- `Station`
- `StationExit`
- `StationLiveBoard`
- `StationOfLine`
- `StationTransfer`
- `TrainLiveBoard`
- `TrainType`

文件有、SDK 尚未建立的群組：

- `News`
- `StationFacility`

#### Bus v2

SDK 已涵蓋的主要能力：

- `EstimatedTimeOfArrival`
- `RealTimeNearStop`
- `Route`
- `Station`
- `StopOfRoute`
- 路線 / 站牌 / 站序查詢的便利方法

文件有、SDK 尚未建立或未完整抽象化的群組：

- `Alert`
- `DailyStopTimeTable`
- `DailyTimeTable`
- `DataVersion`
- `DisplayStopOfRoute`
- `FirstLastTripInfo`
- `News`
- `Operator`
- `RealTimeByFrequency`
- `RouteFare`
- `RouteNetwork`
- `RouteTPASS`
- `S2STravelTime`
- `Schedule`
- `Shape`
- `StationGroup`
- `Stop`
- `Vehicle`

另有文件面已擴展但 SDK 尚未跟進的範圍：

- `InterCity` 系列
- `Streaming` 系列
- **整個 `公共運輸_公車_v3.json`**（包含 `DRTS`、`Shuttle/Hospital`、`Depot`、`VehicleDepot`、`VehicleRoute` 等）

#### 5.3 未對應到的文件主題

下列文件目前都沒有對應的公開 SDK 模組：

- `共通資料_公共運輸_v2.json`
- `共通資料_行政區_v2.json`
- `共通資料_道路_v2.json`
- `公共運輸_自行車_v2.json`
- `公共運輸_航空_v2.json`
- `公共運輸_航運_v3.json`
- `GIS圖資_v3.json`
- `停車資訊_v1.json`
- `有聲號誌_v1.json`
- `綠色運輸_充電樁_v1.json`
- `觀光資訊_v2.json`
- `路段編碼_v2.json`
- `路況資訊_v2.json`
- `道路事件_v1.json`
- `公共運輸_軌道_v3.json` 中的 `AFR`
- `公共運輸_公車_v3.json` 中的 `DRTS` / `Shuttle`

### 6. 尚未建立的類別 / 模組建議

由於本專案目前主要是以模組 / namespace 提供 API，因此「沒創建的類別」更準確地說是**尚未建立的公開模組**。建議清單如下。

#### 6.1 先補齊既有交通主軸

1. `bus.v3` 或獨立 `bus3`
2. `afr`（對應 `v3/Rail/AFR/*`）
3. `rail.common` 或 `railOperator`
   - 對應 `v2/Rail/Operator`

#### 6.2 新增缺漏的領域模組

1. `basic`
   - 對應 `共通資料_公共運輸_v2.json`
2. `district`
   - 對應 `共通資料_行政區_v2.json`
3. `road`
   - 對應 `共通資料_道路_v2.json`
4. `bike`
   - 對應 `公共運輸_自行車_v2.json`
5. `air`
   - 對應 `公共運輸_航空_v2.json`
6. `ship` 或 `ferry`
   - 對應 `公共運輸_航運_v3.json`
7. `parking`
   - 對應 `停車資訊_v1.json`
8. `gis`
   - 對應 `GIS圖資_v3.json`
9. `tourism`
   - 對應 `觀光資訊_v2.json`
10. `ev`
    - 對應 `綠色運輸_充電樁_v1.json`
11. `traffic`
    - 對應 `路況資訊_v2.json`
12. `roadcode`
    - 對應 `路段編碼_v2.json`
13. `roadevent`
    - 對應 `道路事件_v1.json`
14. `aps` 或 `audibleSignal`
    - 對應 `有聲號誌_v1.json`

### 7. 文件與程式之間的增刪差異

#### 7.1 程式已新增，但舊人工文件未同步

1. **THSR 已實作，不是預留**
   - `doc/API_MAPPING.md` 仍把高鐵列為「(預留)」
   - 實際上 `src/thsr.js` 已提供 `thsr.v2`

2. **TMRT 已存在於實作與匯出面**
   - `src/main.js` 已匯出 `tmrt`
   - `src/metro.js` 的 `companyTag` 已包含 `TMRT`
   - `doc/API_MAPPING.md` 的主表仍只列 `metro.js, trtc.js, krtc.js, tymetro.js, klrt.js`

3. **TRA v3 已新增 3 個重要 API**
   - `DailyTrainTimetable/TrainDates`
   - `Operator`
   - `LineNetwork`
   - `doc/README.md` 已記錄這些新增，但其他人工文件未完全同步

#### 7.2 文件已新增，但 SDK 尚未跟進

1. Swagger 文件已涵蓋大量非目前 SDK 範圍的主題：
   - Basic / District / Road / GIS / Parking / Bike / Air / Ship / Tourism / EV / Traffic / RoadEvent

2. 既有主題中，文件版本也已超前於 SDK：
   - Bus 已有 v3、DRTS、Shuttle 等新分支
   - Rail v3 已有 `AFR`
   - Metro / THSR / TRA v3 文件仍有若干群組尚未補齊

#### 7.3 關於「刪除」

本次比對中，**沒有看到明確證據顯示某個既有公開 SDK 模組已被程式刪除、但文件仍保留**。目前的主要問題比較像是：

- **人工文件落後於程式**
- **Swagger 文件範圍大於目前 SDK**

若要精準追蹤「曾經有、後來被刪掉」的項目，建議再以 git history 另做一次歷史比對。

### 8. 建議升級順序

#### P0：先同步人工文件

1. 更新 `doc/API_MAPPING.md`
   - 把 THSR 從「預留」改成已實作
   - 把 `tmrt.js` 補回主表
   - 補上 `tra.v3` 新增的 3 個 API

2. 更新 `README.md`
   - 補齊 `metro.companyTag` 範例中的 `tmrt`
   - 檢查範例是否仍與目前 `src/*` 相符

#### P1：補齊既有 transport 模組缺口

1. **Bus**
   - 先補 `Operator` / `RouteFare` / `Shape` / `Schedule` / `Vehicle`
   - 再考慮 `InterCity` 與 `Streaming`

2. **Metro**
   - 補 `Alert` / `LineTransfer` / `LivePosition` / `StationTransfer`

3. **THSR**
   - 補 `StationExit` / `StationOfLine` / `AvailableSeatStatus` / `DailyFreeSeatingCar`

4. **TRA v3**
   - 補 `News` / `StationFacility`

#### P2：擴張到新公開模組

建議依需求與實作成本排序：

1. `bus.v3`
2. `afr`
3. `basic`
4. `bike`
5. `air`
6. `ship`

#### P3：長尾資料域

可視專案目標再擴展：

- `parking`
- `gis`
- `tourism`
- `ev`
- `traffic`
- `roadcode`
- `roadevent`
- `aps`

### 9. 最終結論

目前 `rocptx` 的 SDK 核心已集中在：

- Metro v2
- Bus v2（部分）
- THSR v2（部分）
- TRA v2 / v3（其中 TRA v2、v3 為目前最完整）

相對地，`doc/tdx_docs/` 所代表的 TDX 文件版圖遠大於目前 SDK 範圍。整體關係可簡化成：

- **Rail / Bus 是已有基礎、但尚未補齊的核心區**
- **Basic / Road / GIS / Parking / Bike / Air / Ship / Tourism / EV / Traffic 等仍屬未建模區**
- **人工文件存在落後於程式的問題，需先補文檔再擴 API**

因此最務實的升級策略是：

1. **先修正人工文件落差**
2. **再補齊 Bus / Metro / THSR / TRA v3 缺口**
3. **最後按需求逐步建立新領域模組**