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
| `src/main.js` 公開匯出 | 16 | `rocptx` 預設 export 掛載的模組 / namespace |
| `rocptx` 根命名空間 helper | 16 | `src/ptx.js` 的認證、查詢與共用工具 |
| transport-facing API surface | 12 | `bus`、`bus.v3`、`metro`、5 個 metro wrapper、`thsr.v2`、`tra`、`tra.v3`、`afr.v3` |
| support-facing surface | 5 | `data`、`datax`、`router`、`id`、`common` |
| `doc/tdx_docs` 規格來源 | 19 | `tdx.md` 1 份 + Swagger / JSON 18 份 |
| Bus P1 目前累計新增 | 30 | 已補完 Bus v2 主要 helper：`Operator`、`RouteFare`、`Shape`、`Schedule`、`Vehicle`、`Alert`、`Stop`、`DisplayStopOfRoute`、`DailyTimeTable`、`RouteNetwork`、`DailyStopTimeTable`、`DataVersion`、`FirstLastTripInfo`、`News`、`RealTimeByFrequency`、`RealTimeByFrequency/Streaming`、`StationGroup`、`S2STravelTime`、`RouteTPASS` |
| Bus v3 規格對應路徑 | 55 | 已補完 `公共運輸_公車_v3.json` 的一般 `CityBus` 27、`DRTS` 22、`Shuttle/Hospital` 6 |

### 主要命名空間公開項目量

> 註：此表以「本檔列出的公開可用成員」計數；`metro` 家族包含 `urls` / `companyTag` 等公開成員，不只計算函式。

| 命名空間 / 家族 | 數量 | 計算方式 |
|---|---:|---|
| `rocptx` root helper | 16 | `src/ptx.js` 的基礎 helper |
| `common` | 26 | 工具 12 + TDX 常數 7 + API 根路徑 7 |
| `bus` | 47 | 46 個 v2 直接公開方法 + `v3` 子命名空間 |
| `bus.v3` | 59 | convenience 27 + `_Xxx` 27 + metadata 5（含 `drts`、`shuttleHospital` 子命名空間） |
| `bus.v3.drts` | 48 | convenience 23 + `_Xxx` 22 + metadata 3 |
| `bus.v3.shuttleHospital` | 14 | convenience 6 + `_Xxx` 6 + metadata 2 |
| `metro` | 61 | 基底成員 5 + `_Xxx` 18 + convenience 19 + `catchData` 19 |
| `trtc` | 73 | 繼承 `metro` 61 + 額外 helper 12 |
| `tmrt` | 71 | 繼承 `metro` 61 + 額外 helper 10 |
| `krtc` | 71 | 繼承 `metro` 61 + 額外 helper 10 |
| `tymetro` | 71 | 繼承 `metro` 61 + 額外 helper 10 |
| `klrt` | 71 | 繼承 `metro` 61 + 額外 helper 10 |
| `thsr.v2` | 48 | convenience 15 + `_Xxx` 28 + `catchData` 5 |
| `tra` | 46 | convenience 11 + `_Xxx` 25 + `catchData` 10 |
| `tra.v3` | 55 | convenience 8 + `_Xxx` 34 + `catchData` 13 |
| `afr.v3` | 29 | convenience 13 + `_Xxx` 14 + metadata 2 |
| `router` | 19 | `router.bus` 1 + `router.v1` 0 + `router.v2` 18 |
| `id` | 23 | top-level 7 + 子工具方法 16 |

## 目前公開匯出（`src/main.js`）

`rocptx` 的 default export 以 `ptx` 為基底，再掛上 16 個公開模組 / 命名空間：

| 匯出 | 來源 | 說明 |
|---|---|---|
| `data` | `src/data.js` | 靜態人工資料 |
| `datax` | `src/datax.js` | 擴增資料快取 |
| `bus` | `src/bus.js` | 公車查詢 |
| `metro` | `src/metro.js` | 捷運基底 namespace |
| `trtc` | `src/trtc.js` | 台北捷運 wrapper |
| `tmrt` | `src/tmrt.js` | 台中捷運 wrapper |
| `krtc` | `src/krtc.js` | 高雄捷運 wrapper |
| `tymetro` | `src/tymetro.js` | 桃園捷運 wrapper |
| `klrt` | `src/klrt.js` | 高雄輕軌 wrapper |
| `thsr` | `src/thsr.js` | 高鐵 namespace |
| `tra` | `src/tra.js` | 台鐵 v2 / v3 |
| `afr` | `src/afr.js` | AFR v3 namespace |
| `router` | `src/router.js` | 路由規劃 namespace |
| `jsSHA` | `src/jsSHA` | SHA 工具 |
| `id` | `src/id.js` | ID 轉換工具 |
| `common` | `src/common.js` | 共用工具與常數 |

## `rocptx` 根命名空間（`src/ptx.js`）

除了上述模組外，`rocptx` 本身還帶有基礎認證 / 查詢工具：

- `throwError`
- `initToken`
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

## 模組方法索引

### `common`

公開工具與常數：

- 工具：`today`、`inBrowser`、`assign`、`assignIf`、`clone`
- 陣列 / 時間工具：`findArrayTarget`、`findAllArrayarget`、`transTime2Date`、`weekArray2WeekStr`、`appendNumber0`、`transTime2Sec`、`transSec2Time`
- TDX 常數：`CONST_TDX_GET_TOKEN`、`CONST_TDX_API_URL`、`CONST_TDX_LEVEL_BASIC`、`CONST_TDX_LEVEL_ADVANCED`、`CONST_TDX_LEVEL_PREMIUM`、`CONST_TDX_LEVEL_HISTORICAL`、`CONST_TDX_LEVEL_MAAS`
- API 根路徑：`metroURL`、`busURL`、`busV3URL`、`traURL`、`traV3URL`、`afrV3URL`、`thsrV2URL`

### `data` / `datax`

- `data`：人工維護的基礎資料庫
- `datax`：目前包含 `trtc`、`krtc`、`tymetro`、`tmrt`、`klrt`、`thsr`、`tra`、`trav3` 等擴增資料

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
- `tymetro -> TYMC`
- `tmrt -> TMRT`
- `klrt -> KLRT`
- `krtc -> KRTC`

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

### `trtc` / `tmrt` / `krtc` / `tymetro` / `klrt`

這五個模組都繼承 `metro.baseMethod`，因此都具有上面列出的低階 `_Xxx` 方法、便利方法與 `catchData`。

各自額外 helper 如下：

| 模組 | 額外公開 helper |
|---|---|
| `trtc` | `checkRouteIdOnUse`、`getLineData`、`getLineID`、`getOriginalLineByLineID`、`getStationData`、`getStationIDAry`、`getStationID`、`getStationIDInWhatLine`、`getStationTime`、`getFormatStationTime`、`getOriginalStationID`、`getByStationID` |
| `tmrt` | `checkRouteIdOnUse`、`getLineData`、`getLineID`、`getOriginalLineByLineID`、`getStationIDAry`、`getStationID`、`getStationIDInWhatLine`、`getStationTime`、`getFormatStationTime`、`getOriginalStationID` |
| `krtc` | `checkRouteIdOnUse`、`getLineData`、`getLineID`、`getOriginalLineByLineID`、`getStationIDAry`、`getStationID`、`getStationIDInWhatLine`、`getStationTime`、`getFormatStationTime`、`getOriginalStationID` |
| `tymetro` | `checkRouteIdOnUse`、`getLineData`、`getLineID`、`getOriginalLineByLineID`、`getStationIDAry`、`getStationID`、`getStationIDInWhatLine`、`getStationTime`、`getFormatStationTime`、`getOriginalStationID` |
| `klrt` | `checkRouteIdOnUse`、`getLineData`、`getLineID`、`getOriginalLineByLineID`、`getStationIDAry`、`getStationID`、`getStationIDInWhatLine`、`getStationTime`、`getFormatStationTime`、`getOriginalStationID` |

### `bus`

目前 `bus` v2 直接公開方法（46）：

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
- `getBusStationGroup`
- `getBusS2STravelTime`
- `getBusRouteTPASS`
- `getBusRouteTPASSByNumber`

補充：Bus v2 目前主要規格群組已補齊，新增對應 `Operator` / `RouteFare` / `Shape` / `Schedule` / `Vehicle` / `Alert` / `Stop` / `DisplayStopOfRoute` / `DailyTimeTable` / `RouteNetwork` / `DailyStopTimeTable` / `DataVersion` / `FirstLastTripInfo` / `News` / `RealTimeByFrequency` / `RealTimeByFrequency/Streaming` / `StationGroup` / `S2STravelTime` / `RouteTPASS`；其中 `RouteFare`、`Shape`、`Schedule`、`DisplayStopOfRoute`、`DailyTimeTable`、`RouteNetwork`、`DailyStopTimeTable`、`FirstLastTripInfo`、`RealTimeByFrequency`、`RealTimeByFrequency/Streaming`、`RouteTPASS` 另提供 `ByNumber` 版以對應 `{RouteName}` 端點。當 `cfg.manageBy = 'InterCity'` 時，`Alert`、`Stop`、`DailyTimeTable`、`DataVersion`、`FirstLastTripInfo`、`News`、`RealTimeByFrequency`、`RealTimeByFrequency/Streaming`、`StationGroup`、`S2STravelTime`、`RouteTPASS` 會自動切到 `InterCity` 路徑，`getBusVehicle` 則會走通用 `/v2/Bus/Vehicle`；`DisplayStopOfRoute`、`RouteNetwork`、`DailyStopTimeTable` 與 `getBusFirstLastTripInfoByNumber` 目前依 Swagger 僅支援 `City` 版，`getBusS2STravelTime` 依 Swagger 使用 `RouteID` 作為必要參數。另於同一命名空間下新增 `bus.v3` 子模組。

### `bus.v3`

目前 `bus.v3` 直接公開成員（59）：

- metadata：`urls`、`getCityData`、`drts`、`shuttleHospital`、`ptxAutoBusV3FunctionKey`
- 一般 `CityBus` convenience helper（27）：`getNetwork`、`getStop`、`getStation`、`getRoute`、`getSubRoute`、`getFirstLastTripInfo`、`getDepot`、`getStopOfRoute`、`getDisplayStopOfRoute`、`getRouteFare`、`getSchedule`、`getDailyTimeTable`、`getRealTimeByFrequency`、`getRealTimeByFrequencyByRouteName`、`getRealTimeNearStop`、`getRealTimeNearStopByRouteName`、`getEstimatedTimeOfArrival`、`getEstimatedTimeOfArrivalByRouteName`、`getAlert`、`getNews`、`getOperator`、`getVehicle`、`getVehicleDepot`、`getVehicleRoute`、`getShape`、`getRouteNetwork`、`getS2STravelTime`
- 同名 `_Xxx` 低階 wrapper（27）：對應上述一般 `CityBus` v3 路徑與 route-name 變體

補充：`bus.v3` 現已對應 `公共運輸_公車_v3.json` 的完整公開路徑，除一般 `CityBus` 外，另提供兩個子命名空間：

- `bus.v3.drts` 公開成員（48）：`urls`、`getCityData`、22 組 DRTS convenience helper、22 組同名 `_Xxx` 低階 wrapper，以及 `ptxAutoBusV3DRTSFunctionKey`；其中 `StopOfRoute`、`RouteFare`、`Schedule`、`Shape`、`RealTimeByFrequency`、`RealTimeNearStop`、`EstimatedTimeOfArrival` 另提供 `ByRouteName` helper
- `bus.v3.shuttleHospital` 公開成員（14）：`urls`、6 組 Shuttle/Hospital convenience helper、6 組同名 `_Xxx` 低階 wrapper，以及 `ptxAutoBusV3ShuttleHospitalFunctionKey`
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
- `getFromToFare`（`_ODFareFromTo` alias）

#### `rocptx.thsr.v2` 自動產生 `_Xxx`

- `_Station`
- `_StationOfLine`
- `_ODFare`
- `_GeneralTimetable`
- `_DailyTrainInfo_Today`
- `_DailyTimetable_Today`
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
- `_GeneralTimetable_TrainNo`
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

### `router`

`src/router.js` 本身只是一層 namespace export，**沒有額外平面方法**，目前只有：

- `router.bus`
- `router.v1`
- `router.v2`

各子 namespace 狀態：

- `router.bus`：`findDirectBus`
- `router.v1`：目前為空物件 placeholder
- `router.v2`：目前提供 `trtc`、`krtc`、`tymetro`

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
- `tymetro`
- `getMRTStationIDInWhatLine`

各子工具方法：

- `id.thsr`：`getPTXV2`、`getRPIDbyPTXV2`
- `id.tra`：`getPTXV2`、`getPTXV3`、`getPTXV3byV2`、`getPTXV2byV3`、`getRPIDbyPTXV2`、`getRPIDbyPTXV3`
- `id.trtc`：`getPTXV2`、`getRPIDbyPTXV2`、`getLINE_LineIDbyRPID`、`getLINE_RPIDbyLineID`
- `id.tymetro`：`getPTXV2`、`getRPIDbyPTXV2`、`getLINE_LineIDbyRPID`、`getLINE_RPIDbyLineID`

## 和既有文件 / TDX docs 的同步結果

### 已對應

- `src/main.js` 的 16 個公開匯出已整理入本檔
- `metro` 與五個 operator wrapper 的實際公開方法已重新對齊
- `bus.js` 已補上 Bus v2 主要群組：`Operator`、`RouteFare`、`Shape`、`Schedule`、`Vehicle`、`Alert`、`Stop`、`DisplayStopOfRoute`、`DailyTimeTable`、`RouteNetwork`、`DailyStopTimeTable`、`DataVersion`、`FirstLastTripInfo`、`News`、`RealTimeByFrequency`、`RealTimeByFrequency/Streaming`、`StationGroup`、`S2STravelTime`、`RouteTPASS`
- `thsr.v2` 已列為正式實作，不再標示為預留
- `tra` / `tra.v3` 已按目前原始碼重列，包含新增的 `TrainDates`、`Operator`、`LineNetwork`、`News`、`StationFacility`
- `afr` / `afr.v3` 已按目前原始碼補入，對應 AFR v3 全部 14 條路徑
- `router` 已改按實際結構描述為 `bus / v1 / v2` 三個 namespace

### 部分對應

- `doc/tdx_docs/公共運輸_公車_v2.json` 的主要 Bus v2 規格群組已可對應到 `bus.js`
- 目前 Bus 主要剩餘擴充範圍已轉到 `公共運輸_公車_v3.json` 與更高階 helper
- `router.v2` 目前僅支援 `trtc`、`krtc`、`tymetro`，尚未擴到 `tmrt` / `klrt`
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
