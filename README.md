# rocptx
Dynamic public traffic library of Taiwan and Kinmen, Lienchiang 
* 作者: Melix Yen
* Mail: melixyen@gmail.com
* 用途: 操作 [TDX API](https://tdx.transportdata.tw/) 之捷運、公車等內容取得及整理用

註：操作 [PTX API](https://ptx.transportdata.tw/PTX/) 之捷運、公車等內容取得及整理用途請移動到 branch ptx, master 將給 TDX 用

# 命名區

[車站路線 ID 列表查詢](https://melixyen.github.io/rocptx/app/list_data.html)

## CDN
[https://melixyen.github.io/rocptx/dist/ptx.js](https://melixyen.github.io/rocptx/dist/ptx.js)

直接引用
```html
<script type="text/javascript" src="https://melixyen.github.io/rocptx/dist/ptx.js"></script>
<!-- 若要最小化檔案可用下方 url -->
<script type="text/javascript" src="https://melixyen.github.io/rocptx/dist/ptx.min.js"></script>
```

設定 key
```javascript
//在 include ptx.js 之後請指定你的 TDX client_id 到 AppID , client_secret 到 AppKey 會自動為你取得 token 存取
rocptx.AppID = 'PleAseSeTyoUrAppIDintHIsPlace';
rocptx.AppKey = 'PleAseSeTyoUrAppKeyintHIsPlace';

// 或是用 initToken 傳參數 client_id, client_secret 執行取 Token，回傳 Promise 成功後即可開始
rocptx.initToken('client_id', "client_secret").then((e) => { console.log(e); });
```

操作
```javascript
//ptx.js 為 UMD 格式輸出檔，單獨使用 Global Name 為 rocptx
rocptx.trtc.getStation('BL01').then(function(json){
    console.info(json);
})
//rocptx.捷運公司.getStation(車站代號).then(Promise resolve function);

//搭配接軌時刻 library 時會將 Global Name 註冊到 $trainTaiwanLib 下
$trainTaiwanLib.ptx.trtc.getStationTime('R','R12',3,function(data){
    console.info(data);
})
//$trainTaiwanLib.ptx.捷運公司.getStationTime(路線,車站,星期,Callback)

```
### ES6 Module
```javascript
// 進入點 src/main.js
import common from './common.js';//通用工具及設定項
import ptx from './ptx.js';//基礎程式
import data from './data.js';//人工輸入 data
import datax from './datax.js';//以本程式開發之抓取工具取得捷運路線及車站資料後匯入擴增資料
import bus from './bus.js';//公車
import metro from './metro.js';//捷運路線基礎 Function
import trtc from './trtc.js';//繼承自 metro 對台北捷運的操作
import krtc from './krtc.js';//繼承自 metro 對高雄捷運的操作
import tymetro from './tymetro.js';//繼承自 metro 對桃園捷運的操作
import klrt from './klrt.js';//繼承自 metro 對高雄輕軌的操作
import tra from './tra.js';//台鐵
import jsSHA from './jsSHA';
var combine = {
	data: data,
	datax: datax,
	bus: bus,
	metro: metro,
	trtc: trtc,
	krtc: krtc,
	tymetro: tymetro,
	klrt: klrt,
	tra: tra,
	jsSHA: jsSHA,
	common: common
}
for(var k in combine){
	ptx[k] = combine[k];
}
export default ptx;//將 import 項目加到 ptx 後以 ptx 為基礎對外輸出

```

# common
```javascript
rocptx.common.{功能或變數名稱}
```
#### 名稱
Name | Type | Description
-----|------|-------------
CONST_PTX_API_SUCCESS | String | 伺服器回應成功常數
CONST_PTX_API_FAIL | String | 伺服器回應失敗常數
defaultCrossDayTime | String | 預設換日時間 04:00，在此之前均算前一天列車
transTime2Sec | Functin | (String, Boolean) 傳入 String 值回應一個秒數，Boolean 為 true 則凌晨以換日時間決定輸出值是否超過 86400 秒，超過代表跨日收班列車

# datax
透過抓取路線及車站資料存成 json 後擴曾於 ptx 資料內，提供工具存取固定資料。

Name | Method | Description
-----|------|-------------
getLine | getLine(uid) | 抓取固定資料中的路線，uid 格式請參考範例
getStation | getStation(uid) | 抓取固定資料中的車站，uid 格式請參考範例

```javascript
//uid 格式為{公司}_{路線} 或 {公司}-{路線}，小寫為接軌時刻用法，大寫為 ptx 格式
rocptx.datax.getLine('tymetro_A')
rocptx.datax.getLine('TYMC-A')
//以上兩種寫法均可傳回機場捷運的路線資料

rocptx.datax.getLine('tra_TL-N')
rocptx.datax.getLine('TRA-TL-N')
//以上兩種寫法均可傳回台鐵西部幹線北段的路線資料

rocptx.datax.getStation('TRTC-BL04')
rocptx.datax.getStation('trtc_L04')
//以上兩種寫法均可傳回板南線海山站的路線資料
```
請注意接軌時刻的捷運站 id 為不分路線的共同編號故不能在此直接使用

# metro
```javascript
rocptx.metro.{功能或變數名稱}
```
Name | Type | Description
-----|------|-------------
urls | String | 對應 PTX 操作之 API 位置
_{ urls.Name } | String | (companyTag, cfg) 操作指定公司之 API，用底線加上 urls 名稱組合，回傳均為一個 Promise
baseMethod | Class | 透過 new 產生各捷運公司之對應操作 Function。rocptx.trtc (.krtc / .tymetro) 均為預設 new 此 Class 產生之

#### urls 對應位置及 companyTag 對應公司名
```javascript
const urls = {
    Network: metroURL + '/Network', //取得捷運路網資料
    Line: metroURL + '/Line/', //取得捷運路線基本資料
    Station: metroURL + '/Station/', //取得捷運車站基本資料
    StationOfLine: metroURL + '/StationOfLine/', //取得捷運路線車站基本資料
    LineTransfer: metroURL + '/LineTransfer/', //取得捷運路線站間轉乘基本資料
    StationFacility: metroURL + '/StationFacility/', //取得捷運車站設施資料
    StationExit: metroURL + '/StationExit/', //取得捷運車站出入口基本資料
    Route: metroURL + '/Route/', //取得捷運營運路線基本資料
    StationOfRoute: metroURL + '/StationOfRoute/', //取得捷運營運路線車站基本資料
    FirstLastTimetable: metroURL + '/FirstLastTimetable/', //取得捷運首末班車時刻表資料
    Frequency: metroURL + '/Frequency/', //取得捷運路線發車班距頻率資料
    S2STravelTime: metroURL + '/S2STravelTime/', //取得捷運列車站間運行時間資料
    ODFare: metroURL + '/ODFare/', //取得捷運起迄站間票價資料
    LiveBoard: metroURL + '/LiveBoard/', //取得捷運起迄站間票價資料
    StationTimeTable: metroURL + '/StationTimeTable/', //取得捷運站別時刻表資料
    Shape: metroURL + '/Shape/' //取得指定營運業者之軌道路網實體路線圖資資料
}
const companyTag = {
    trtc: 'TRTC',
    tymetro: 'TYMC',
    klrt: 'KLRT',
    krtc: 'KRTC'
}
```

#### 呼叫範例
```javascript
//呼叫法，以 Line 為例
rocptx.metro._Line('trtc').then(function(data){
    console.info(data);
})

//new 基礎 class 後操作不需再帶入 companyTag
var trtc = new rocptx.metro.baseMethod('trtc');

trtc._Line().then(function(data){
    console.info(data);
})
```

## metro config
ptx function 的 config 在 trtc、krtc與 tymetro 等繼承自 metro 的操作行為部分是相同的

Name | Format | Description
-----|------|-------------
selectField | Array | 要讀取的欄位，例如傳入 ["StationID","LineID","RouteID"] 則回傳值只顯示這些資料，排除不必要訊息縮小傳輸量
filterBy | String | 過濾條件，如 StationID eq 'BL11'，可用 ptx.filterParam 傳入陣列自動組合篩選條件
orderBy | String | 傳入欄位與升降冪，如 StationID desc
top | Number | 數值，一次要讀取的最大筆數
format | String | 回應格式，預設為 JSON
```javascript
//使用 filterParam 組合過濾參數

rocptx.trtc._Line({
    filterBy: rocptx.filterParam("LineID","==","G"),//只回傳松山信義線
    selecteField: ['LineID','LineName']//只許 ID 和路線名稱
}).then(e=>{console.info(e.data)})

rocptx.trtc._Line({
    filterBy: rocptx.filterParam("LineID","==",["BR","BL"], "or")//回傳文湖線與板南線
}).then(e=>{console.info(e.data)})
```

# trtc (or krtc / tymetro)

使用 new rocptx.metro.baseMethod 後除產生對應 urls 的低階 PTX API 外還會增加對應各公司操作之 API

```javascript
rocptx.trtc.getRoute('BL').then(function(data){console.info(data)})
```

Name | Method | Description
-----|------|-------------
getRoute | getRoute(LineID, cfg) 回應 Promise。 | 取得該路線的營運路由。
getLineFrequency | getLineFrequency(LineID, cfg) 回應 Promise。 | 取得該路線發車頻率。
getLineTransfer | getLineTransfer(LineID, cfg) 回應 Promise。 | 取得該路線轉乘站。
getFirstLastTimetable | getFirstLastTimetable(LineID, cfg) 回應 Promise。 | 取得該路線首末班車。
getS2STravelTime | getS2STravelTime(LineID, cfg) 回應 Promise。 | 取得該路線站間行駛時間。
getStationOfLine | getStationOfLine(LineID, cfg) 回應 Promise。 | 取得該路線的車站列表。
getStationOfRoute | getStationOfRoute(LineID, cfg) 回應 Promise。 | 取得該路線各路由的車站列表。
getFromToFare | getFromToFare(fromID, toID, cfg) 回應 Promise。 | 取得兩個 StationID 間的車資
getFromToTravelTime | getFromToTravelTime(fromID, toID, cfg) 回應 Promise。 | 取得兩個 StationID 間的乘車時間
getStation | getStation(StationID, cfg) 回應 Promise。 | 取得車站資料。
getStationTimeTable | getStationTimeTable(StationID, cfg) 回應 Promise。 | 取得該站時刻表。
getStationFacility | getStationFacility(StationID, cfg) 回應 Promise。 | 取得車站設施資料。
getStationFirstLastTimetable | getStationFirstLastTimetable(StationID, cfg) 回應 Promise。 | 取得車站首末班車資料。
getStationExit | getStationExit(StationID, cfg) 回應 Promise。 | 取得車站出入口資料。
getStationFare | getStationFare(StationID, cfg) 回應 Promise。 | 取得該站至所有車站的票價。
getStationLiveBoard | getStationLiveBoard(StationID, cfg) 回應 Promise。 | 取得車站看板資料。
catchData | catchData.{Object functions} | 抓資料及讀取已嵌入 datax 之固定資料的 Function 集合。

#### catchData
```javascript
rocptx.trtc.catchData.getDataXLineObj('BL');
//取回值為 rocptx library 內台北捷運板南線的基本資料，不會連到 PTX API
```
Name | Method | Description
-----|------|-------------
calcStationDayTimeBySimple | calcStationDayTimeBySimple(timeObj, week) | 運用 TimeSimple Format 計算一個車站每週每日往兩方向的所有班次資訊 (運用於 app/station_time.html)
calcStationTimeByHeadWays | calcStationTimeByHeadWays(LineObj, StationID, RouteID, Direction) | 運用 LineObj.Frequency 資料計算該站每週每日班次 (運用於 trtc calcBRLineTime)
getDataXLineObj | getDataXLineObj(LineID) | 取得路線基本資料
getDataXLineMainSub | getDataXLineMainSub(LineID) | 取得路線主要幹線及支線路由
getDataXRouteDirectionInfo | getDataXRouteDirectionInfo(LineID, RouteID, Direction) | 取得指定路由方向資料
getDataXRouteMainTerminal | getDataXRouteMainTerminal(LineID) | 回傳一個幹線起迄點陣列
getDataXStationData | getDataXStationData(StationID) | 取得車站基本資料
getDataXStationName | getDataXStationName(StationID, isEn) | 取得車站名稱，isEn == true 時回傳英文站名
getDataXTransferOfLine | getDataXTransferOfLine(LineID) | 取得該線上的轉乘站
getDataXTransferStation | getDataXTransferStation(FromLineID, ToLineID) | 取得兩線間的轉乘站


```javascript
rocptx.trtc.catchData.Line(console.log).then(function(data){console.info(data)})
//用 console.log 監看進度，會傳進度字串到 progeressFn(String)。會連續呼叫 PTX API，回應為一個 Promise。 
```
Name | Method | Description
-----|------|-------------
Line | Line(progressFn) | 向 PTX API 下載所有路線資料，可傳入 progressFn 監看進度
Station | Station(progressFn) | 向 PTX API 下載所有車站資料，可傳入 progressFn 監看進度
TimeTable | TimeTable(progressFn) | 向 PTX API 下載所有車站時刻表，可傳入 progressFn 監看進度
TimeSimple | TimeSimple(progressFn) | 向 PTX API 下載所有車站時刻表精簡資料，可傳入 progressFn 監看進度
Fare | Fare(progressFn) | 向 PTX API 下載所有車站票價資料，可傳入 progressFn 監看進度


# thsr
台灣高鐵的相關操作

```javascript
rocptx.thsr.{功能或變數名稱}

rocptx.tra.v2.{功能或變數名稱}//對應 PTX 官網 v2 版相關 API
```

Name | Type | Description
-----|------|-------------
urls | String | 對應 PTX 操作之 API 位置
_{ urls.Name } | String | (cfg) 操作無變數之 API，用底線加上 urls 名稱組合，回傳均為一個 Promise
_{ urls.Name } | String | (arg1, arg2,...,cfg) 操作有變數之 API，用底線加上 urls 名稱組合，變數按照 PTX 組合 API 的順序依序傳入，最後一個參數為設定檔，回傳均為一個 Promise

#### urls 對應位置及動態參數傳遞方式
```javascript
const urls = {
    Station: thsrV2URL + '/Station/', //取得車站基本資料
    ODFare: thsrV2URL + '/ODFare/', //取得票價資料
    GeneralTimetable: thsrV2URL + '/GeneralTimetable/', //取得所有車次的定期時刻表資料
    DailyTrainInfo_Today: thsrV2URL + '/DailyTrainInfo/Today/', //取得當天所有車次的車次資料
    DailyTimetable_Today: thsrV2URL + '/DailyTimetable/Today/', //取得當天所有車次的時刻表資料
    AlertInfo: thsrV2URL + '/AlertInfo', //取得即時通阻事件資料
    News: thsrV2URL + '/News', //取得高鐵最新消息資料
    Shape: thsrV2URL + '/Shape/', //取得指定營運業者之軌道路網實體路線圖資資料
    StationExit: thsrV2URL + '/StationExit/', //取得車站基本資料
    //以下為帶有變數的 API
    ODFareFromTo: thsrV2URL + '/ODFare/{OriginStationID}/to/{DestinationStationID}', //取得指定[起訖站間]之票價資料
    GeneralTimetable_TrainNo: thsrV2URL + '/GeneralTimetable/TrainNo/{TrainNo}', //取得指定[車次]的定期時刻表資料
    DailyTrainInfo_Today_TrainNo: thsrV2URL + '/DailyTrainInfo/Today/TrainNo/{TrainNo}', //取得當天指定[車次]的車次資料
    DailyTrainInfo_TrainNo_TrainDate: thsrV2URL + '/DailyTrainInfo/TrainNo/{TrainNo}/TrainDate/{TrainDate}', //取得指定[日期]與[車次]的車次資料
    DailyTimetable_Today_TrainNo: thsrV2URL + '/DailyTimetable/Today/TrainNo/{TrainNo}', //取得當天指定[車次]的時刻表資料
    DailyTimetable_TrainDate_TrainDate: thsrV2URL + '/DailyTimetable/TrainDate/{TrainDate}', //取得指定[日期]所有車次的時刻表資料
    DailyTimetable_TrainNo_TrainDate: thsrV2URL + '/DailyTimetable/TrainNo/{TrainNo}/TrainDate/{TrainDate}', //取得指定[日期],[車次]的時刻表資料
    DailyTimetable_Station_TrainDate: thsrV2URL + '/DailyTimetable/Station/{StationID}/{TrainDate}', //取得指定[日期],[車站]的站別時刻表資料
    DailyTimetable_OD_TrainDate: thsrV2URL + '/DailyTimetable/OD/{OriginStationID}/to/{DestinationStationID}/{TrainDate}',//取得指定[日期],[起迄站間]之站間時刻表資料
    AvailableSeatStatusList: thsrV2URL + '/AvailableSeatStatusList/{StationID}' //取得動態指定[車站]的對號座剩餘座位資訊看板資料
}
```

#### 呼叫範例
```javascript
//呼叫無參數 API 方法，以 Station 為例
rocptx.thsr.v2._Station().then(function(data){
    console.info(data);
})

//呼叫有參數 API 方法
rocptx.thsr.v2._DailyTimetable_OD_TrainDate('1000','1040','2019-08-30',{top:20}).then(function(data){
    console.info(data);
})

rocptx.thsr.v2._DailyTimetable_TrainDate_TrainDate('2019-08-30').then(function(data){
    console.info(data);
})

```

#### 操作方法

Name | Method | Description
-----|------|-------------
getStationOfLine | getStationOfLine(LineID, cfg) 回應 Promise。 | 取得台灣高鐵的車站列表。
getFromToFare | getFromToFare(fromID, toID, cfg) 回應 Promise。 | 取得兩個 StationID 間的車資
getStation | getStation(StationID, cfg) 回應 Promise。 | 取得車站資料。
getStationTodayTimeTable | getStationTodayTimeTable(StationID, cfg) 回應 Promise。 | 取得該站今天時刻表。
getStationFare | getStationFare(StationID, cfg) 回應 Promise。 | 取得該站至所有車站的票價。
catchData | catchData.{Object functions} | 抓資料及讀取已嵌入 datax 之固定資料的 Function 集合。


#### catchData
```javascript
rocptx.thsr.v2.catchData.getDataXStationName('1000');
//取回值為 rocptx library 內台鐵西部幹線北段的基本資料，不會連到 PTX API
```
Name | Method | Description
-----|------|-------------
getDataXStationData | getDataXStationData(StationID) | 取得車站基本資料
getDataXStationName | getDataXStationName(StationID, isEn) | 取得車站名稱，isEn == true 時回傳英文站名


# tra
台灣鐵路局火車的相關操作

```javascript
rocptx.tra.{功能或變數名稱}

rocptx.tra.v3.{功能或變數名稱}//對應 PTX 官網 v3 版相關 API
```
Name | Type | Description
-----|------|-------------
urls | String | 對應 PTX 操作之 API 位置
_{ urls.Name } | String | (cfg) 操作無變數之 API，用底線加上 urls 名稱組合，回傳均為一個 Promise
_{ urls.Name } | String | (arg1, arg2,...,cfg) 操作有變數之 API，用底線加上 urls 名稱組合，變數按照 PTX 組合 API 的順序依序傳入，最後一個參數為設定檔，回傳均為一個 Promise

#### urls 對應位置及動態參數傳遞方式
```javascript
const urls = {
    Network: traURL + '/Network', //取得臺鐵路網資料
    Line: traURL + '/Line/', //取得路線基本資料
    Station: traURL + '/Station/', //取得車站基本資料
    StationOfLine: traURL + '/StationOfLine/', //取得路線車站基本資料
    TrainType: traURL + '/TrainType',//取得所有列車車種資料
    ODFare: traURL + '/ODFare/', //取得票價資料
    Shape: traURL + '/Shape/', //取得指定營運業者之軌道路網實體路線圖資資料
    GeneralTrainInfo: traURL + '/GeneralTrainInfo/', //取得所有車次的定期車次資料
    GeneralTimetable: traURL + '/GeneralTimetable/', //取得所有車次的定期時刻表資料
    DailyTrainInfo_Today: traURL + '/DailyTrainInfo/Today/', //取得當天所有車次的車次資料
    DailyTimetable_Today: traURL + '/DailyTimetable/Today/', //取得當天所有車次的時刻表資料
    LiveBoard: traURL + '/LiveBoard/', //取得車站別列車即時到離站電子看板
    LiveTrainDelay: traURL + '/LiveTrainDelay/', //取得列車即時準點/延誤時間資料
    //以下為帶有變數的 API
    ODFareFromTo: traURL + '/ODFare/{OriginStationID}/to/{DestinationStationID}', //取得指定[起訖站間]之票價資料
    GeneralTrainInfo_TrainNo: traURL + '/GeneralTrainInfo/TrainNo/{TrainNo}', //取得指定[車次]的定期車次資料
    GeneralTimetable_TrainNo: traURL + '/GeneralTimetable/TrainNo/{TrainNo}', //取得指定[車次]的定期時刻表資料
    DailyTrainInfo_Today_TrainNo: traURL + '/DailyTrainInfo/Today/TrainNo/{TrainNo}', //取得當天指定[車次]的車次資料
    DailyTrainInfo_TrainDate: traURL + '/DailyTrainInfo/TrainDate/{TrainDate}', //取得指定[日期]所有車次的車次資料 yyyy-MM-dd
    DailyTrainInfo_TrainNo_TrainDate: traURL + '/DailyTrainInfo/TrainNo/{TrainNo}/TrainDate/{TrainDate}', //取得指定[日期]與[車次]的車次資料
    DailyTimetable_Today_TrainNo: traURL + '/DailyTimetable/Today/TrainNo/{TrainNo}', //取得當天指定[車次]的時刻表資料
    DailyTimetable_TrainDate_TrainNo: traURL + '/DailyTimetable/TrainDate/{TrainDate}', //取得指定[日期]所有車次的時刻表資料
    DailyTimetable_TrainNo_TrainDate: traURL + '/DailyTimetable/TrainNo/{TrainNo}/TrainDate/{TrainDate}', //取得指定[日期],[車次]的時刻表資料
    DailyTimetable_Station_TrainDate: traURL + '/DailyTimetable/Station/{StationID}/{TrainDate}', //取得指定[日期],[車站]的站別時刻表資料
    DailyTimetable_OD_TrainDate: traURL + '/DailyTimetable/OD/{OriginStationID}/to/{DestinationStationID}/{TrainDate}',//取得指定[日期],[起迄站間]之站間時刻表資料
    LiveBoard_Station: traURL + '/LiveBoard/Station/{StationID}' //取得指定[車站]列車即時到離站電子看板(動態前後30分鐘的車次)
}

```

#### V3 版 urls 對應位置及動態參數傳遞方式，需使用 v3 版 StationID
```javascript
const v3urls = {
    Network: traV3URL + '/Network', //取得臺鐵路網資料
    Station: traV3URL + '/Station/', //取得車站基本資料
    StationExit: traV3URL + '/StationExit/', //取得車站出入口資料
    StationFacility: traV3URL + '/StationFacility/', //取得車站設施資料
    Line: traV3URL + '/Line/', //取得路線基本資料
    StationOfLine: traV3URL + '/StationOfLine/', //取得路線車站基本資料
    TrainType: traV3URL + '/TrainType',//取得所有列車車種資料
    GeneralTrainTimetable: traV3URL + '/GeneralTrainTimetable/', //取得所有車次的定期時刻表資料
    GeneralStationTimetable: traV3URL + '/GeneralStationTimetable', //取得各站的定期站別時刻表資料
    SpecificTrainTimetable : traV3URL + '/SpecificTrainTimetable', //取得所有特殊車次時刻表資料
    DailyTrainTimetable_Today: traV3URL + '/DailyTrainTimetable/Today/', //取得當天車次時刻表資料
    DailyStationTimetable_Today: traV3URL + '/DailyStationTimetable/Today/', //取得當天各站站別時刻表資料
    StationLiveBoard: traV3URL + '/StationLiveBoard/', //取得列車即時到離站資料
    TrainLiveBoard: traV3URL + '/TrainLiveBoard/', //取得列車即時位置動態資料
    LineTransfer: traV3URL + '/LineTransfer/', //取得內部路線轉乘資料
    StationTransfer: traV3URL + '/StationTransfer/', //取得車站跨運具轉乘資訊
    News: traV3URL + '/News/', //取得最新消息
    Alert: traV3URL + '/Alert/', //取得營運通阻資料
    Shape: traV3URL + '/Shape/', //取得線型基本資料
    //以下為帶有變數的 API
    ODFareFromTo: traV3URL + '/ODFare/{OriginStationID}/to/{DestinationStationID}', //取得指定[起訖站間]之票價資料
    GeneralTimetable_TrainNo: traV3URL + '/GeneralTimetable/TrainNo/{TrainNo}', //取得指定[車次]的定期時刻表資料
    GeneralStationTimetable_Station: traV3URL + '/GeneralStationTimetable/Station/{StationID}', //取得指定[車站]的定期站別時刻表資料
    SpecificTrainTimetable_TrainNo : traV3URL + '/SpecificTrainTimetable/TrainNo/{TrainNo}', //取得指定[車次]的特殊車次時刻表資料
    DailyTrainTimetable_Today_TrainNo: traV3URL + '/DailyTrainTimetable/Today/TrainNo/{TrainNo}', //取得當天指定[車次]的時刻表資料
    DailyTrainTimetable_TrainDate: traV3URL + '/DailyTrainTimetable/TrainDate/{TrainDate}', //取得指定[日期]所有車次的時刻表資料(台鐵提供近60天每日時刻表)
    DailyTrainTimetable_OD_TrainDate: traV3URL + '/DailyTrainTimetable/OD/{OriginStationID}/to/{DestinationStationID}/{TrainDate}', //取得指定[日期],[起迄站]之站間時刻表資料
    DailyTrainTimetable_OD_Inclusive_TrainDate: traV3URL + '/DailyTrainTimetable/OD/Inclusive/{OriginStationID}/to/{DestinationStationID}/{TrainDate}', //取得指定[日期],[起迄站間]之站間全經過站時刻表資料
    DailyStationTimetable_Today_Station: traV3URL + '/DailyStationTimetable/Today/Station/{StationID}', //取得當天指定[車站]的時刻表資料
    DailyStationTimetable_TrainDate: traV3URL + '/DailyStationTimetable/TrainDate/{TrainDate}', //取得各站每日站別時刻表資料 yyyy-MM-dd
    StationLiveBoard_Station: traV3URL + '/StationLiveBoard/Station/{StationID}', //取得指定[車站]列車即時到離站電子看板(動態前後30分鐘的車次)
    TrainLiveBoard_TrainNo: traV3URL + '/TrainLiveBoard/TrainNo/{TrainNo}' //取得指定[車次]的列車即時位置動態資料
}

```

#### 呼叫範例
```javascript
//呼叫無參數 API 方法，以 Line 為例
rocptx.tra._Line().then(function(data){
    console.info(data);
})
rocptx.tra.v3._Line().then(function(data){
    console.info(data);
})

//呼叫有參數 API 方法
rocptx.tra._DailyTimetable_OD_TrainDate('1005','1120','2019-03-30',{top:20}).then(function(data){
    console.info(data);
})

rocptx.tra._DailyTrainInfo_TrainDate('2019-03-30').then(function(data){
    console.info(data);
})

rocptx.tra.v3._DailyTrainTimetable_TrainDate('2019-05-30').then(function(data){
    console.info(data);
})

```

#### 操作方法

Name | Method | Description
-----|------|-------------
getStationOfLine | getStationOfLine(LineID, cfg) 回應 Promise。 | 取得該路線的車站列表。
getFromToFare | getFromToFare(fromID, toID, cfg) 回應 Promise。 | 取得兩個 StationID 間的車資
getStation | getStation(StationID, cfg) 回應 Promise。 | 取得車站資料。
getStationTodayTimeTable | getStationTodayTimeTable(StationID, cfg) 回應 Promise。 | 取得該站今天時刻表。
getStationFare | getStationFare(StationID, cfg) 回應 Promise。 | 取得該站至所有車站的票價。
getStationLiveBoard | getStationLiveBoard(rpStationID, cfg) 回應 Promise。 | 取得車站看板資料，若不輸入 rpStationID 則回應全線可取得所有資料。
getTrainLiveBoard | getTrainLiveBoard(Array TrainNo, cfg) 回應 Promise。 | 傳入 TrainNo 陣列，若有資料則回傳該列車動態。
getFromToTimeTable | getFromToTimeTable(from rpStationID, to rpStationID, date, Inclusive=false, cfg) 回應 Promise。 | 取得旅行起迄兩站間列車資料，Inclusive為 true 時會包含經過車站時刻表。
getLiveFromToTimeTable | getLiveFromToTimeTable(from rpStationID, to rpStationID, length=20, Inclusive=false) 回應 Promise。 | 取得旅行起迄兩站間即時列車資料，length 預設最近 20 筆，Inclusive為 true 時會包含經過車站
catchData | catchData.{Object functions} | 抓資料及讀取已嵌入 datax 之固定資料的 Function 集合。


#### catchData
```javascript
rocptx.tra.catchData.getDataXLineObj('TL-N');
//取回值為 rocptx library 內台鐵西部幹線北段的基本資料，不會連到 PTX API
```
Name | Method | Description
-----|------|-------------
getDataXLineObj | getDataXLineObj(LineID) | 取得路線基本資料
getDataXStationData | getDataXStationData(StationID) | 取得車站基本資料
getDataXStationName | getDataXStationName(StationID, isEn) | 取得車站名稱，isEn == true 時回傳英文站名
getDataXTrain | getDataXTrain(TrainTypeID) | 取得車種基本資料

## 台鐵 V3 版工具


#### 方法

Name | Method | Description
-----|------|-------------
v2Sv3 | v2Sv3(StationID) | 用 V2 StationID 取得 V3 StationID
v3Sv2 | v3Sv2(StationID) | 用 V3 StationID 取得 V2 StationID

#### 呼叫範例
```javascript
rocptx.tra.v2Sv3("1005"); //回應 "0960"

rocptx.tra.v3Sv2("7000"); //回應 "1715"


```

# router

rocptx.router 下提供交通運具路網轉乘功能路由查詢

## v2

#### MRT (trtc / krtc 等)

使用 PTX 捷運系統車站 ID (rocptx id 可透過 getPTXV2 function 取得車站 ID) 查詢兩站間的轉乘路由
```javascript
rocptx.router.v2.trtc.getAllLineRoute('R22A','BR24')
```

#### 方法

Name | Method | Description
-----|------|-------------
getAllLineRoute | getAllLineRoute(from, to) | 用 rocptx id 找起站(from)至目的地(to) 間走法
getBlockData | getBlockData() | 取得捷運路網一般站與轉乘站區塊化資料
getStationBlockByID | getStationBlockByID(StationID) | 取得車站所屬區塊資料
getMRTThrough | getMRTThrough(from, to) | 取得同線同 RouteID 時兩站間的方向與經過車站資料


# id 轉換工具

rocptx.id 下依照各營運公司不同而有不同 id 轉換工具

```javascript
rocptx.id.tra.getPTXV3byV2('1006');//Return 0980
```

#### tra 方法

Name | Method | Description
-----|------|-------------
getPTXV2 | getPTXV2(id) | 用 rocptx id 取 PTX V2 版 StationID
getPTXV3 | getPTXV3(id) | 用 rocptx id 取 PTX V3 版 StationID
getPTXV3byV2 | getPTXV3byV2(StationID) | 用 PTX V2 版 StationID 取 PTX V3 版 StationID
getPTXV2byV3 | getPTXV2byV3(StationID) | 用 PTX V3 版 StationID 取 PTX V2 版 StationID
getRPIDbyPTXV2 | getRPIDbyPTXV2(StationID) | 用 PTX V2 版 StationID 取 rocptx tra id
getRPIDbyPTXV3 | getRPIDbyPTXV3(StationID) | 用 PTX V3 版 StationID 取 rocptx tra id

#### trtc 方法

Name | Method | Description
-----|------|-------------
getPTXV2 | getPTXV2(id) | 用 rocptx id 取 PTX V2 版 StationID
getRPIDbyPTXV2 | getRPIDbyPTXV2(StationID) | 用 PTX V2 版 StationID 取 rocptx id
getLINE_LineIDbyRPID | getLINE_LineIDbyRPID(id) | 路線 ID，用 rocptx id 取 PTX V2 版 LineID
getLINE_RPIDbyLineID | getLINE_RPIDbyLineID(LineID) | 路線 ID，用 PTX V2 版 LineID 取 rocptx id

#### tymetro 方法

Name | Method | Description
-----|------|-------------
getPTXV2 | getPTXV2(id) | 用 rocptx id 取 PTX V2 版 StationID
getRPIDbyPTXV2 | getRPIDbyPTXV2(StationID) | 用 PTX V2 版 StationID 取 rocptx id
getLINE_LineIDbyRPID | getLINE_LineIDbyRPID(id) | 路線 ID，用 rocptx id 取 PTX V2 版 LineID
getLINE_RPIDbyLineID | getLINE_RPIDbyLineID(LineID) | 路線 ID，用 PTX V2 版 LineID 取 rocptx id

## idTrans 車站 id 轉換 Function

```javascript
rocptx.id.idTrans({
    value: "1005",//要轉換的 id 值
    fromType: "id",//要搜尋的資料欄位名
    company: "tra",//營運公司
    toType: "v3id"//要回應的資料欄位名
})
```



# 實作 Web App
### 工具及範例

* [資料抓取](https://melixyen.github.io/rocptx/app/dradra.html)
* [各營運業者車站時刻表整理](https://melixyen.github.io/rocptx/app/station_time.html)

其他使用到 rocptx library 之頁面
* [接軌時刻](https://melixyen.github.io/railtime/)
* [公車路線 QR CODE 雲端看板](http://melixyen.github.io/railtime/busp.html#/)
