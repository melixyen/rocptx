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

`src/main.js` 目前對外匯出共 **16** 個鍵：

- `data`
- `datax`
- `bus`
- `metro`
- `trtc`
- `tmrt`
- `krtc`
- `tymc`
- `klrt`
- `thsr`
- `tra`
- `afr`
- `router`
- `jsSHA`
- `id`
- `common`

若只計 **直接對應 TDX 運輸 API 的公開模組**，目前共有 **10 個**：

1. `bus`
2. `metro`
3. `trtc`
4. `tmrt`
5. `krtc`
6. `tymc`
7. `klrt`
8. `thsr`
9. `tra`
10. `afr`

若把版本化子命名空間也拆開視為主要 API 面，則可視為 **11 個主要 SDK API 面**：

1. `bus`
2. `metro`
3. `trtc`
4. `tmrt`
5. `krtc`
6. `tymc`
7. `klrt`
8. `thsr.v2`
9. `tra`（主要對應 v2）
10. `tra.v3`
11. `afr.v3`

補充：

- **捷運營運商封裝模組**共 **5 個**：`trtc` / `tmrt` / `krtc` / `tymc` / `klrt`
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
| `公共運輸_軌道_v2.json` | 79 | 對應 `metro` / `trtc` / `tmrt` / `krtc` / `tymc` / `klrt` / `thsr.v2` / `tra(v2)` | 部分對應 |
| `公共運輸_軌道_v3.json` | 49 | 對應 `tra.v3`、`afr.v3` | 已對應 |
| `公共運輸_公車_v2.json` | 79 | 對應 `bus`，但僅覆蓋 route / station / ETA / realtime 等核心群組 | 部分對應 |
| `公共運輸_公車_v3.json` | 55 | 對應 `bus.v3`（一般 `CityBus`、`DRTS`、`Shuttle/Hospital`） | 已對應 |
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
   - 對應模組：`metro` + `trtc` + `tmrt` + `krtc` + `tymc` + `klrt`
   - 對應文件：`公共運輸_軌道_v2.json` 的 `v2/Rail/Metro/*`

2. **高鐵（THSR v2）**
   - 對應模組：`thsr.v2`
   - 對應文件：`公共運輸_軌道_v2.json` 的 `v2/Rail/THSR/*`

3. **台鐵（TRA v2 / v3）**
   - 對應模組：`tra`、`tra.v3`
   - 對應文件：
     - `公共運輸_軌道_v2.json` 的 `v2/Rail/TRA/*`
     - `公共運輸_軌道_v3.json` 的 `v3/Rail/TRA/*`

4. **AFR（v3）**
   - 對應模組：`afr.v3`
   - 對應文件：`公共運輸_軌道_v3.json` 的 `v3/Rail/AFR/*`

5. **公車（Bus v2 部分）**
   - 對應模組：`bus`
   - 對應文件：`公共運輸_公車_v2.json`

#### 5.2 部分對應到的細項

#### Metro v2

SDK 已涵蓋的主要群組：

- `Alert`
- `FirstLastTimetable`
- `Frequency`
- `Line`
- `LineTransfer`
- `LiveBoard`
- `LivePosition`
- `ODFare`
- `Route`
- `S2STravelTime`
- `Shape`
- `Station`
- `StationExit`
- `StationFacility`
- `StationOfLine`
- `StationOfRoute`
- `StationTimeTable`
- `StationTransfer`

文件有、SDK 尚未完整建立的群組：

- `News`
- `StationPlatform`
- `StoppingPattern`

備註：`Network` 雖出現在 `src/metro.js` URL 定義中，但目前不是像其他捷運群組那樣完整封裝成一般對外使用面。

#### THSR v2

SDK 已涵蓋的主要群組：

- `Station`
- `StationOfLine`
- `StationExit`
- `ODFare`
- `GeneralTimetable`
- `DailyTrainInfo`
- `DailyTimetable`
- `AlertInfo`
- `News`
- `Shape`
- `AvailableSeatStatus`（OD）
- `AvailableSeatStatus`（Leg）
- `AvailableSeatStatusList`
- `DailyFreeSeatingCar`

目前依 `公共運輸_軌道_v2.json` 的 `THSR` 路徑，SDK 已完成對應。

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
- `StationFacility`
- `StationTransfer`
- `TrainLiveBoard`
- `TrainType`
- `News`

結論：**TRA v3 已對應 `公共運輸_軌道_v3.json` 中 TRA 的主要公開群組。**

#### AFR v3

SDK 已涵蓋的主要群組：

- `Network`
- `Station`
- `Line`
- `Operator`
- `GeneralTrainTimetable`
- `ODFare`
- `Route`
- `StationOfLine`
- `TrainType`
- `StationOfRoute`
- `News`
- `Shape`

另外兩條含 path parameter 的 AFR 路徑也已對應：

- `GeneralTrainTimetable/TrainNo/{TrainNo}`
- `ODFare/{OriginStationID}/to/{DestinationStationID}`

結論：**AFR v3 已對應 `公共運輸_軌道_v3.json` 中 AFR 的全部 14 條路徑。**

#### Bus v2

SDK 已涵蓋的主要能力：

- `Alert`
- `DailyStopTimeTable`
- `DailyTimeTable`
- `DataVersion`
- `EstimatedTimeOfArrival`
- `DisplayStopOfRoute`
- `FirstLastTripInfo`
- `News`
- `RealTimeNearStop`
- `RealTimeByFrequency`
- `RealTimeByFrequency/Streaming`
- `Route`
- `Operator`
- `RouteFare`
- `RouteTPASS`
- `RouteNetwork`
- `S2STravelTime`
- `Schedule`
- `Shape`
- `Station`
- `StationGroup`
- `Stop`
- `StopOfRoute`
- `Vehicle`
- 路線 / 站牌 / 站序查詢的便利方法
- `RouteFare` / `Shape` / `Schedule` / `DisplayStopOfRoute` / `DailyTimeTable` / `RouteNetwork` / `DailyStopTimeTable` / `FirstLastTripInfo` / `RealTimeByFrequency` / `RealTimeByFrequency/Streaming` / `RouteTPASS` 已補 route-name 版 helper
- `DisplayStopOfRoute` / `RouteNetwork` / `DailyStopTimeTable` 目前依 Swagger 僅有 `City` 路徑，因此 SDK 也只提供 City 版封裝
- `FirstLastTripInfo` 的 base 查詢支援 `InterCity`，但 route-name 版目前依 Swagger 僅有 `City/{City}/{RouteName}`
- `S2STravelTime` 依 Swagger 使用 `RouteID` 作為必要參數

文件有、SDK 尚未建立或未完整抽象化的剩餘群組：

- Bus v2 主要規格群組目前已補齊

另有文件面已擴展，SDK 已先跟進且目前已完成對應的範圍：

- `bus.v3` 一般 `CityBus` 群組：`Network`、`Stop`、`Station`、`Route`、`SubRoute`、`FirstLastTripInfo`、`Depot`、`StopOfRoute`、`DisplayStopOfRoute`、`RouteFare`、`Schedule`、`DailyTimeTable`、`Alert`、`News`、`Operator`、`Vehicle`、`VehicleDepot`、`VehicleRoute`、`Shape`、`RouteNetwork`、`S2STravelTime`
- 一般 `CityBus` 的 `RealTimeByFrequency`、`RealTimeNearStop`、`EstimatedTimeOfArrival` 已補 route-name 版 helper
- `bus.v3.drts`：已補 `Stop`、`Station`、`Operator`、`Route`、`BookingRule`、`StopOfRoute`、`RouteFare`、`Schedule`、`Shape`、`S2STravelTime`、`Vehicle`、`Alert` 與 3 組動態資料；支援 Swagger 既有 route-name 變體
- `bus.v3.shuttleHospital`：已補 `Authority`、`Operator`、`Stop`、`Route`、`StopOfRoute`、`Schedule`

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
### 6. 尚未建立的類別 / 模組建議

由於本專案目前主要是以模組 / namespace 提供 API，因此「沒創建的類別」更準確地說是**尚未建立的公開模組**。建議清單如下。

#### 6.1 先補齊既有交通主軸

`afr` 已於本輪建立為 `rocptx.afr.v3`；目前同主軸剩餘建議為：

1. `rail.common` 或 `railOperator`
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

#### 7.1 已完成同步的舊人工文件差異

下列項目原本是這次盤點時發現的歷史差異，**目前已完成同步**：

1. **THSR 已從舊文件的「預留」狀態修正為已實作**
   - `doc/API_MAPPING.md` 已改為 `rocptx.thsr.v2`

2. **TMRT 已補回人工文件主表與 README**
   - `src/main.js`、`src/metro.js`、`README.md`、`doc/API_MAPPING.md` 現已一致

3. **TRA v3 新增能力已同步到人工文件**
   - `DailyTrainTimetable/TrainDates`
   - `Operator`
   - `LineNetwork`
   - `News`
   - `StationFacility`

#### 7.2 文件已新增，但 SDK 尚未跟進

1. Swagger 文件已涵蓋大量非目前 SDK 範圍的主題：
   - Basic / District / Road / GIS / Parking / Bike / Air / Ship / Tourism / EV / Traffic / RoadEvent

2. 既有主題中，文件仍有部分版本 / 群組超前於 SDK：
   - Metro 仍有少數舊文件描述待再確認

#### 7.3 關於「刪除」

本次比對中，**沒有看到明確證據顯示某個既有公開 SDK 模組已被程式刪除、但文件仍保留**。目前的主要問題比較像是：

- **人工文件落後於程式**
- **Swagger 文件範圍大於目前 SDK**

若要精準追蹤「曾經有、後來被刪掉」的項目，建議再以 git history 另做一次歷史比對。

### 8. 建議升級順序

#### P0：先同步人工文件（已完成）

1. `doc/API_MAPPING.md` 已同步
   - THSR 已改為已實作
   - `tmrt.js` 已補回主表
   - `tra.v3` 新增的 5 個 API 已補上（`TrainDates`、`Operator`、`LineNetwork`、`News`、`StationFacility`）

2. `README.md` 已同步
   - `tmrt`、`thsr`、`router`、`id` 已反映目前結構
   - 首頁已改為精簡導覽型內容

#### P1：補齊既有 transport 模組缺口

1. **Bus**（Bus v2 主要群組已完成）
   - 已補 `Operator` / `RouteFare` / `Shape` / `Schedule` / `Vehicle`
   - 已再補 `Alert` / `DisplayStopOfRoute` / `DailyTimeTable` / `Stop` / `RouteNetwork`
   - 已再補 `DailyStopTimeTable` / `DataVersion` / `FirstLastTripInfo` / `News` / `RealTimeByFrequency`
   - 已再補 `RouteTPASS` / `S2STravelTime` / `StationGroup` / `RealTimeByFrequency/Streaming`
   - `bus.v3` 亦已補齊一般 `CityBus`、`DRTS`、`Shuttle/Hospital` 三個公開群組

2. **Metro**
   - 已補 `Alert` / `LivePosition` / `StationTransfer`
   - `LineTransfer` 原已存在，這輪已同步修正文檔

3. **THSR**
   - 已補 `StationExit` helper / `StationOfLine` / `AvailableSeatStatus`（Leg / OD / List）/ `DailyFreeSeatingCar`

#### P2：擴張到新公開模組

建議依需求與實作成本排序：

1. `basic`
2. `bike`
3. `air`
4. `ship`

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
- Bus v2 / v3（其中 `bus.v3` 已對齊 `公共運輸_公車_v3.json`）
- THSR v2（已對齊 `公共運輸_軌道_v2.json` 的 THSR 路徑）
- TRA v2 / v3
- AFR v3

相對地，`doc/tdx_docs/` 所代表的 TDX 文件版圖遠大於目前 SDK 範圍。整體關係可簡化成：

- **Rail / Bus 是已有基礎的核心區，其中 `bus.v3`、`tra.v3` 與 `afr.v3` 已完成主要對應**
- **Basic / Road / GIS / Parking / Bike / Air / Ship / Tourism / EV / Traffic 等仍屬未建模區**
- **人工文件存在落後於程式的問題，需先補文檔再擴 API**

因此最務實的升級策略是：

1. **先修正人工文件落差**
2. **再按需求釐清 Metro 舊文件描述與長尾項目**
3. **最後按需求逐步建立新領域模組**