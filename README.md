# rocptx
Dynamic public traffic library of Taiwan and Kinmen, Lienchiang 
* 作者: Melix Yen
* Mail: melixyen@gmail.com
* 用途: 操作 [PTX API](https://ptx.transportdata.tw/PTX/) 之捷運、公車等內容取得及整理用

# 命名區

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
//在 include ptx.js 之後請指定你的 PTX ID 與 Key 值，設定方式如下，程式內建 SHA 計算 header
rocptx.AppID = 'PleAseSeTyoUrAppIDintHIsPlace';
rocptx.AppKey = 'PleAseSeTyoUrAppKeyintHIsPlace';
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


# tra
台灣鐵路局火車的相關操作

```javascript
rocptx.tra.{功能或變數名稱}
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

#### 呼叫範例
```javascript
//呼叫無參數 API 方法，以 Line 為例
rocptx.tra._Line().then(function(data){
    console.info(data);
})

//呼叫有參數 API 方法
rocptx.tra._DailyTimetable_OD_TrainDate('1005','1120','2019-03-30',{top:20}).then(function(data){
    console.info(data);
})

rocptx.tra._DailyTrainInfo_TrainDate('2019-03-30').then(function(data){
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
getStationLiveBoard | getStationLiveBoard(StationID, cfg) 回應 Promise。 | 取得車站看板資料。
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



# 實作 Web App
### 工具及範例

* [資料抓取](https://melixyen.github.io/rocptx/app/dradra.html)
* [各營運業者車站時刻表整理](https://melixyen.github.io/rocptx/app/station_time.html)

其他使用到 rocptx library 之頁面
* [接軌時刻](https://melixyen.github.io/railtime/)
* [公車路線 QR CODE 雲端看板](http://melixyen.github.io/railtime/busp.html#/)
