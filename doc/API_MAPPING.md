# rocptx 專案與 TDX API 關聯說明

## 專案概述

**rocptx** 是一個用於操作 [TDX (台灣交通資料雲) API](https://tdx.transportdata.tw/api-service/swagger) 的 JavaScript Library，提供便利的接口來取得和整理台灣、金門、馬祖的捷運、公車、台鐵等大眾運輸資料。

- **主要用途**：動態公共交通資料庫（Dynamic public traffic library of Taiwan and Kinmen, Lienchiang）
- **API 版本**：主要使用 TDX API v2/v3
- **輸出格式**：UMD 模組 + ES6 Module

---

## 整體架構與 API 對應

### 核心配置 ([src/common.js](src/common.js))

```javascript
// TDX API 基本設定
CONST_TDX_GET_TOKEN = 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token'
CONST_TDX_API_URL = 'https://tdx.transportdata.tw/api'

// API 服務等級
CONST_TDX_LEVEL_BASIC = '/basic'
CONST_TDX_LEVEL_ADVANCED = '/advanced'
CONST_TDX_LEVEL_PREMIUM = '/premium'
```

### TDX API 端點對應表

| 運輸類型 | 模組 | TDX API 端點 | 用途 |
|---------|------|-------------|------|
| **捷運** | metro.js, trtc.js, krtc.js, tymetro.js, klrt.js | `https://tdx.transportdata.tw/api/basic/v2/Rail/Metro` | 捷運路線、車站、時刻表等資料 |
| **公車** | bus.js | `https://tdx.transportdata.tw/api/basic/v2/Bus` | 公車路線、站牌、即時資訊等資料 |
| **台鐵 v2** | tra.js | `https://tdx.transportdata.tw/api/basic/v2/Rail/TRA` | 台鐵時刻表、票價等資料 |
| **台鐵 v3** | tra.js | `https://tdx.transportdata.tw/api/basic/v3/Rail/TRA` | 台鐵新版 API 資料 |
| **高鐵** | (預留) | `https://tdx.transportdata.tw/api/basic/v2/Rail/THSR` | 高鐵相關資料 |

---

## 模組結構與 API 對應

### 1. **ptx.js** - 基礎框架
**功能**：核心 API 呼叫機制、Token 管理、通用工具

**對應 TDX API**：
```
認證端點：
  POST /auth/realms/TDXConnect/protocol/openid-connect/token
  └─ 用途：OAuth2 Token 取得
  
通用參數構建：
  - selectField(): 欄位選擇
  - filterFn(): 資料過濾
  - orderByFn(): 排序
  - topFn(): 分頁
```

**使用示例**：
```javascript
rocptx.AppID = 'your_client_id';
rocptx.AppKey = 'your_client_secret';
rocptx.initToken('client_id', 'client_secret').then((token) => {
    // 取得 Token 後可進行 API 呼叫
});
```

---

### 2. **metro.js** - 捷運通用模組
**繼承自**：無，為基礎模組

**對應 TDX API 端點** (`/Rail/Metro/{OperatorCode}`):

| 方法 | API 端點 | 功能 | TDX 對應路徑 |
|-----|---------|------|-----------|
| `getNetwork()` | `/Network` | 取得捷運路網資料 | `/Rail/Metro/Network` |
| `getLine(uid)` | `/Line/{uid}` | 取得路線基本資料 | `/Rail/Metro/Line/TRTC` |
| `getStation(uid)` | `/Station/{uid}` | 取得車站基本資料 | `/Rail/Metro/Station/TRTC` |
| `getStationOfLine()` | `/StationOfLine/{uid}` | 取得路線站點 | `/Rail/Metro/StationOfLine/TRTC` |
| `getStationFacility()` | `/StationFacility/{uid}` | 取得車站設施 | `/Rail/Metro/StationFacility/TRTC` |
| `getStationExit()` | `/StationExit/{uid}` | 取得出入口資訊 | `/Rail/Metro/StationExit/TRTC` |
| `getRoute()` | `/Route/{uid}` | 取得營運路線 | `/Rail/Metro/Route/TRTC` |
| `getFirstLastTimetable()` | `/FirstLastTimetable/{uid}` | 取得首末班車 | `/Rail/Metro/FirstLastTimetable/TRTC` |
| `getFrequency()` | `/Frequency/{uid}` | 取得發車班距 | `/Rail/Metro/Frequency/TRTC` |
| `getS2STravelTime()` | `/S2STravelTime/{uid}` | 取得站間運行時間 | `/Rail/Metro/S2STravelTime/TRTC` |
| `getODFare()` | `/ODFare/{uid}` | 取得票價資訊 | `/Rail/Metro/ODFare/TRTC` |
| `getLiveBoard()` | `/LiveBoard/{uid}` | 取得即時電子看板 | `/Rail/Metro/LiveBoard/TRTC` |
| `getStationTimeTable()` | `/StationTimeTable/{uid}` | 取得站別時刻表 | `/Rail/Metro/StationTimeTable/TRTC` |
| `getShape()` | `/Shape/{uid}` | 取得路網圖資 | `/Rail/Metro/Shape/TRTC` |

**OperatorCode 對應表**：
```javascript
TRTC  = 台北捷運
TYMC  = 桃園捷運
TMRT  = 台中捷運
KRTC  = 高雄捷運
KLRT  = 高雄輕軌
```

---

### 3. **trtc.js, krtc.js, tymetro.js, klrt.js** - 捷運系統特定模組
**繼承自**：metro.js

**功能**：針對各捷運系統的便捷包裝，預設設定業者代碼

**使用示例**：
```javascript
// 台北捷運 (TRTC)
rocptx.trtc.getStation('BL01').then(json => console.log(json));

// 高雄捷運 (KRTC)
rocptx.krtc.getStation('R12').then(json => console.log(json));

// 桃園捷運 (TYMC)
rocptx.tymetro.getStation('A12').then(json => console.log(json));
```

**TDX 對應**：
```
rocptx.trtc.getStation('BL01')
  ↓ (實際呼叫)
GET https://tdx.transportdata.tw/api/basic/v2/Rail/Metro/Station/TRTC?
  $filter=StationID eq 'BL01'&$top=50000&$format=JSON
```

---

### 4. **bus.js** - 公車模組
**對應 TDX API 端點** (`/Bus/{ManageBy}/{City}`):

| 方法 | 功能 | API 端點 | TDX 對應路徑 |
|-----|------|---------|-----------|
| `getBusRoute()` | 取得公車路線 | `/Route/City/{City}` | `/Bus/Route/City/台北市` |
| `getBusStation()` | 取得公車站牌 | `/Station/City/{City}` | `/Bus/Station/City/台北市` |
| `getEstimatedTimeOfArrival()` | 取得預估到站時間 | `/EstimatedTimeOfArrival/City/{City}` | `/Bus/EstimatedTimeOfArrival/City/台北市` |
| `getBusRealtimeNearStop()` | 取得即時接近站牌資訊 | `/RealTimeNearStop/City/{City}` | `/Bus/RealTimeNearStop/City/台北市` |
| `getPositionBusStation()` | 位置查詢公車站牌 | `/Station/City/{City}` + 空間篩選 | `/Bus/Station/City/台北市?$spatialFilter=...` |

**ManageBy 類型**：
```javascript
City       = 市區公車 (CityBus)
InterCity  = 公路客運 (InterCityBus)
```

**使用示例**：
```javascript
// 取得台北市公車路線 101
rocptx.bus.getBusRoute('Taipei_101', {manageBy: 'City'}, 'Taipei');

// 取得公車站牌即時資訊
rocptx.bus.getEstimatedTimeOfArrival(filterStr, 'Taipei', cfg);

// 位置查詢附近公車站
rocptx.bus.getPositionBusStation('Taipei', latitude, longitude, {far: 500});
```

**TDX 對應**：
```
rocptx.bus.getBusRoute('Taipei_101')
  ↓ (實際呼叫)
GET https://tdx.transportdata.tw/api/basic/v2/Bus/Route/City/臺北市?
  $filter=RouteUID eq 'Taipei_101'&$top=3000&$format=JSON
```

---

### 5. **tra.js** - 台鐵模組

#### **v2 API 端點** (`/Rail/TRA`):

| 方法 | 功能 | API 端點 | 說明 |
|-----|------|---------|------|
| `getNetwork()` | 路網資料 | `/Network` | 取得台鐵路網 |
| `getStation()` | 車站基本資料 | `/Station` | 所有車站 |
| `getTrainType()` | 列車車種 | `/TrainType` | 車種資訊 (自強、莒光等) |
| `getGeneralTimetable()` | 定期時刻表 | `/GeneralTimetable` | 固定時刻表 |
| `getGeneralTimetableByTrainNo()` | 指定車次時刻表 | `/GeneralTimetable/TrainNo/{TrainNo}` | 特定車次 |
| `getDailyTimetableToday()` | 當天時刻表 | `/DailyTimetable/Today` | 當日營運 |
| `getDailyTimetableByTrainNo()` | 當日車次時刻表 | `/DailyTimetable/Today/TrainNo/{TrainNo}` | 當日特定車次 |
| `getLiveBoard()` | 即時電子看板 | `/LiveBoard` | 所有站的即時資訊 |
| `getLiveBoardByStation()` | 站別即時資訊 | `/LiveBoard/Station/{StationID}` | 特定站即時看板 |
| `getLiveTrainDelay()` | 即時延誤資訊 | `/LiveTrainDelay` | 列車延誤狀態 |
| `getODFare()` | 票價資訊 | `/ODFare/{Origin}/to/{Dest}` | 起迄站票價 |

#### **v3 API 端點** (`/Rail/TRA`):

| 方法 | 功能 | API 端點 | 說明 |
|-----|------|---------|------|
| `getStationV3()` | 車站資料(v3) | `/Station` | 新版車站資訊 |
| `getLineV3()` | 路線資料(v3) | `/Line` | 新版路線資訊 |
| `getGeneralTrainTimetableV3()` | 定期時刻表(v3) | `/GeneralTrainTimetable` | 新版定期時刻 |
| `getGeneralStationTimetableV3()` | 站別定期時刻(v3) | `/GeneralStationTimetable` | 站別時刻表 |
| `getDailyTrainTimetableV3()` | 當日時刻表(v3) | `/DailyTrainTimetable/Today` | 新版當日時刻 |
| `getDailyStationTimetableV3()` | 當日站別時刻(v3) | `/DailyStationTimetable/Today` | 當日站別時刻 |
| `getStationLiveBoardV3()` | 即時看板(v3) | `/StationLiveBoard` | 新版電子看板 |
| `getTrainLiveBoardV3()` | 列車動態位置(v3) | `/TrainLiveBoard` | 即時位置資訊 |
| `getStationTransferV3()` | 轉乘資訊(v3) | `/StationTransfer` | 跨運具轉乘 |
| `getAlertV3()` | 營運通阻(v3) | `/Alert` | 營運異常資訊 |

**ID 轉換功能**：
```javascript
// v2 和 v3 車站代碼轉換
rocptx.tra.v2Sv3("1005");  // v2代碼 → v3代碼 (汐止: 1005 → 0960)
rocptx.tra.v3Sv2("7000");  // v3代碼 → v2代碼 (花蓮: 7000 → 1715)
```

**TDX 對應**：
```
rocptx.tra.getGeneralTimetable()
  ↓ (實際呼叫)
GET https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/GeneralTimetable?
  $top=10000&$format=JSON

rocptx.tra.getLiveBoardByStationV3('1000')
  ↓ (實際呼叫)
GET https://tdx.transportdata.tw/api/basic/v3/Rail/TRA/StationLiveBoard/Station/1000
```

---

### 6. **common.js** - 通用工具與設定

**主要功能**：
- 時間轉換函數 (時刻表時間處理)
- 跨日列車識別 (預設凌晨 04:00 為換日時間)
- 陣列查詢工具
- API 參數構建輔助

**API 相關常數**：
```javascript
CONST_PTX_API_SUCCESS   = 'success'
CONST_PTX_API_FAIL      = 'fail'
defaultCrossDayTime     = '04:00'  // 跨日識別時間
transTime2Sec()         // 時間轉秒數
transSec2Time()         // 秒數轉時間
```

---

### 7. **datax.js** - 擴增資料模組

**功能**：提供預先整理的固定資料查詢

**預置資料檔案** ([src/datax/](src/datax/)):
```
krtc.line.json          # 高雄捷運路線
krtc.station.json       # 高雄捷運車站
krtc.time.json          # 高雄捷運時刻
krtc.transfer.json      # 高雄捷運轉乘

thsr.station.json       # 高鐵車站
thsr.time.json          # 高鐵時刻

tmrt.station.json       # 台中捷運車站

tra.line.json           # 台鐵路線
tra.station.json        # 台鐵車站
tra.time.json           # 台鐵時刻
tra.train.json          # 台鐵列車

trtc.line.json          # 台北捷運路線
trtc.station.json       # 台北捷運車站
trtc.time.json          # 台北捷運時刻
trtc.transfer.json      # 台北捷運轉乘

tymetro.line.json       # 桃園捷運路線
tymetro.station.json    # 桃園捷運車站
tymetro.time.json       # 桃園捷運時刻
```

**使用示例**：
```javascript
rocptx.datax.getLine('TRTC_BL');  // 取得台北捷運藍線資訊
```

---

### 8. **data.js** - 人工資料庫

**功能**：提供預定義的查詢資料 (城市代碼、營運商等)

**使用示例**：
```javascript
rocptx.data.bus.city  // 公車城市列表
```

---

## 實際 API 呼叫流程

### 流程示例 1：查詢台北捷運板南線車站

```
用戶代碼：
  rocptx.trtc.getStation('BL01')

內部流程：
  1. ptx.js 中 getPromiseURL()
  2. 構建 TDX API URL：
     https://tdx.transportdata.tw/api/basic/v2/Rail/Metro/Station/TRTC
  3. 添加參數：
     ?$filter=StationID eq 'BL01'&$top=50000&$format=JSON
  4. 使用 Token 發送 HTTP GET 請求
  5. 返回 JSON 資料

實際 HTTP 請求：
  GET /api/basic/v2/Rail/Metro/Station/TRTC?
      $filter=StationID eq 'BL01'&$top=50000&$format=JSON
  Host: tdx.transportdata.tw
  Authorization: Bearer {access_token}
  Accept: application/json
```

### 流程示例 2：查詢台北市公車路線

```
用戶代碼：
  rocptx.bus.getBusRoute('Taipei_1', {manageBy: 'City'})

內部流程：
  1. bus.js 中解析路由 UID 提取城市代碼 'Taipei'
  2. 構建 TDX API URL：
     https://tdx.transportdata.tw/api/basic/v2/Bus/Route/City/臺北市
  3. 添加過濾參數：
     ?$filter=RouteUID eq 'Taipei_1'&$top=3000&$format=JSON
  4. 發送 HTTP 請求

實際 HTTP 請求：
  GET /api/basic/v2/Bus/Route/City/臺北市?
      $filter=RouteUID eq 'Taipei_1'&$top=3000&$format=JSON
  Host: tdx.transportdata.tw
  Authorization: Bearer {access_token}
```

### 流程示例 3：查詢當天台鐵時刻表

```
用戶代碼：
  rocptx.tra.getDailyTimetableTodayV3()

內部流程：
  1. tra.js 中獲取當日日期
  2. 構建 v3 API URL：
     https://tdx.transportdata.tw/api/basic/v3/Rail/TRA/DailyTrainTimetable/Today
  3. 發送 HTTP 請求
  4. 返回當日所有台鐵時刻表

實際 HTTP 請求：
  GET /api/basic/v3/Rail/TRA/DailyTrainTimetable/Today
  Host: tdx.transportdata.tw
  Authorization: Bearer {access_token}
```

---

## TDX API 認證流程

### OAuth 2.0 Token 取得

```
1. 首次設定：
   rocptx.AppID = 'your_client_id';
   rocptx.AppKey = 'your_client_secret';

2. 自動 Token 取得 (在 ptx.js 中)：
   POST https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token
   Content-Type: application/x-www-form-urlencoded
   
   grant_type=client_credentials
   &client_id={AppID}
   &client_secret={AppKey}

3. 回應取得 access_token：
   {
     "access_token": "eyJhbGci...",
     "token_type": "Bearer",
     "expires_in": 3600,
     ...
   }

4. 後續 API 請求使用 Token：
   GET {API_Endpoint}
   Authorization: Bearer {access_token}
```

---

## 前端應用範例

### 在網頁中使用

**HTML 引入**：
```html
<script src="https://melixyen.github.io/rocptx/dist/ptx.js"></script>

<script>
  // 設定認證
  rocptx.AppID = 'your_client_id';
  rocptx.AppKey = 'your_client_secret';
  
  // 查詢台北捷運
  rocptx.trtc.getStation('BL01').then(function(json) {
    console.log('車站資訊:', json);
  });
  
  // 搭配時刻表查詢
  rocptx.trtc.getStationTimeTable('BL01').then(function(json) {
    console.log('時刻表:', json);
  });
</script>
```

### 預置應用網頁

專案提供的應用範例 ([app/](app/)):

| 應用 | 檔案 | 功能 |
|-----|------|------|
| **車站路線查詢** | `list_data.html` | [ID 列表查詢工具](https://melixyen.github.io/rocptx/app/list_data.html) |
| **資料抓取工具** | `dradra.html` | 從 TDX API 抓取並整理資料 |
| **站別時刻表** | `station_time.html` | 各營運業者車站時刻表整理 |
| **公車看板** | `busp.html` | 公車運輸 QR Code 雲端看板 |
| **捷運即時** | `counter.html` | 捷運即時資訊展示 |
| **路線時刻** | `line_time.html` | 路線時刻表檢視 |

---

## API 費用與配額

根據 TDX 平台規定：

| 服務級別 | 特性 | 存取限制 |
|---------|------|--------|
| **訪客** | 瀏覽器模式 | 每日 20 次/IP |
| **基礎服務** | 會員訂閱 | 依方案而定 |
| **進階服務** | 會員訂閱 | 更高配額 |
| **加值服務** | 會員訂閱 | 特殊資料集 |

**計費方式**：
- 計次：1,500 次 = 1 點
- 計量：150 MB = 1 點

**詳見**：[TDX 訂閱收費](https://tdx.transportdata.tw/pricing)

---

## 重要參數說明

### OData 查詢參數

rocptx 使用 OData 協議構建查詢參數，常見參數：

```javascript
// 欄位篩選
$select=StationID,StationName

// 條件過濾
$filter=StationID eq 'BL01'
$filter=StationName like '%台北%'

// 排序
$orderby=StationID asc
$orderby=StationName desc

// 分頁
$top=100          # 取得前 100 筆
$skip=50          # 跳過前 50 筆

// 格式
$format=JSON
```

**在 rocptx 中使用**：
```javascript
rocptx.trtc.getStation({
  selectField: ['StationID', 'StationName'],
  filterBy: {field: 'StationID', op: 'eq', value: 'BL01'},
  orderBy: 'StationName',
  orderDir: false,  // ascending
  top: 100
});
```

---

## 開發建議

### 1. 了解 TDX API 文件
- 訪問 [TDX Swagger 文件](https://tdx.transportdata.tw/api-service/swagger)
- 理解各端點的請求/回應格式
- 查看資料欄位定義

### 2. 認証設定
- 在 [TDX 平台註冊](https://tdx.transportdata.tw/register)
- 訂閱適當的服務方案
- 在[會員中心](https://tdx.transportdata.tw/user/dataservice/key)取得 API 金鑰

### 3. 測試 API
- 使用 Swagger UI 進行 API 測試
- 驗證回應資料結構
- 檢查 Filter/Sort 語法

### 4. 使用 rocptx
- 選擇合適的模組 (bus, metro, tra 等)
- 根據需求調用相應方法
- 處理非同步 Promise 回應

### 5. 效能優化
- 合理使用 `$top` 參數限制回傳資料量
- 使用 `$select` 只取所需欄位
- 快取固定資料，減少 API 呼叫

---

## 主要檔案關聯總結

```
rocptx/
├── src/
│   ├── ptx.js              # 核心框架 → TDX Token 與基礎 API 呼叫
│   ├── common.js           # 工具函數 → 時間轉換、設定管理
│   ├── metro.js            # 捷運基類 → Rail/Metro/* API
│   ├── trtc.js             # 台北捷運 → Rail/Metro/TRTC
│   ├── krtc.js             # 高雄捷運 → Rail/Metro/KRTC
│   ├── tymetro.js          # 桃園捷運 → Rail/Metro/TYMC
│   ├── klrt.js             # 高雄輕軌 → Rail/Metro/KLRT
│   ├── tra.js              # 台鐵 → Rail/TRA (v2/v3)
│   ├── bus.js              # 公車 → Bus/* API
│   ├── datax.js            # 擴增資料 → 預置 JSON 資料
│   ├── data.js             # 人工資料 → 城市、營運商代碼
│   └── datax/              # 資料檔案
│       ├── *.line.json     # 路線資料
│       ├── *.station.json  # 車站資料
│       ├── *.time.json     # 時刻表資料
│       └── *.transfer.json # 轉乘資訊
└── app/                    # 前端應用網頁
    ├── index.html          # 首頁
    ├── list_data.html      # ID 查詢工具
    ├── station_time.html   # 時刻表整理工具
    └── ...
```

---

## 相關資源

- **rocptx GitHub**：https://github.com/melixyen/rocptx
- **TDX API 文件**：https://tdx.transportdata.tw/api-service/swagger
- **TDX 平台**：https://tdx.transportdata.tw/
- **樣本代碼**：https://github.com/tdxmotc/SampleCode
- **服務監控**：https://tdx.transportdata.tw/servicestatus

---

## 注意事項

1. **API 金鑰安全**：不要在前端代碼中硬編碼 AppID/AppKey，應透過後端伺服器管理
2. **Token 有效期**：Token 有 1 小時有效期，需要自動更新機制
3. **速率限制**：不同服務級別有不同的 API 呼叫限制，設計應避免頻繁請求
4. **資料準確性**：TDX API 資料由各營運業者提供，可能存在延遲或偏差
5. **跨日列車**：台鐵、捷運時刻表中的跨日列車須特別處理（預設凌晨 04:00 換日）

---

**文件建立日期**：2026 年 2 月 20 日  
**對應 rocptx 版本**：0.0.7  
**對應 TDX API 版本**：v2/v3 (basic service)
