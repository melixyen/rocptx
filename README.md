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
- `doc/tdx_docs/upgrade_plan.md`：SDK 與 TDX Swagger 的差異、缺口與升級順序
- `doc/tdx_docs/*.json`：TDX 原始 Swagger / OpenAPI 規格

## 現況說明

- 文件目前已以 `src/*.js` 為準完成一輪同步
- Bus P1 第一批缺口已補上：`Operator` / `RouteFare` / `Shape` / `Schedule` / `Vehicle`
- 後續擴充建議請直接看 `doc/tdx_docs/upgrade_plan.md`

## 相關工具

- [車站路線 ID 列表查詢](https://melixyen.github.io/rocptx/app/list_data.html)