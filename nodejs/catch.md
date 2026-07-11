# catch.js 使用說明

`catch.js` 是一個 Node.js 命令列工具，用於操作 `rocptx.js` 底層 API。支援兩種主要動作：下載整包靜態資料 (`--catch`) 或呼叫單一 API 端點 (`--urls`)。

## 前置準備

在使用前需先編譯 SDK：
```bash
npm run umd3
```
此指令會將 `src/` 下的原始碼編譯為 `dist/ptx.js`，供 `catch.js` 的 runtime 載入使用。

## 執行方式

```bash
node catch.js [主要動作] [選項]
```

## 主要動作 (必須且只能選擇其一)

| 參數 | 說明 |
|---|---|
| `--help` | 顯示說明 |
| `--catch <type>` | 下載指定類型的靜態資料包 |
| `--urls <API> [$Key=Value ...]` | 呼叫指定的 API 端點，可傳入動態 URL 變數 |

> 若未指定任何主要動作、或同時指定兩個以上，程式會報錯退出。

## 選項

| 參數 | 說明 |
|---|---|
| `--company <name>` | **(必填)** 指定交通公司/系統 |
| `--download` | 將結果儲存為 JSON 檔案。若未加此參數，結果直接印在終端 |
| `--ver <num>` | 配合 `--urls` 使用，指定 API 版本。例如 `--ver 3` 呼叫 `v3urls` |
| `--filename <name>` | 自訂輸出的 JSON 檔案名稱。預設為 `{company}.{action}.json` |
| `--AppID <id>` | (選填) 設定 PTX API 的 AppID，未填則使用內建 Token |
| `--AppKey <key>` | (選填) 設定 PTX API 的 AppKey |

## 支援的 `--company` 值

| 值 | 說明 |
|---|---|
| `trtc` | 台北捷運 |
| `krtc` | 高雄捷運 |
| `tymc` | 桃園捷運 |
| `ntmc` | 新北捷運 |
| `tmrt` | 台中捷運 |
| `klrt` | 高雄輕軌 |
| `thsrv2` | 高鐵 (V2 API) |
| `tra` | 台鐵 (V2 API) |
| `trav3` | 台鐵 (V3 API) |

## `--catch` 支援的資料類型

### 捷運類 (`trtc`, `krtc`, `tymc`, `ntmc`, `tmrt`, `klrt`)
- `line` : 路線包
- `station` : 車站包
- `fare` : 票價包
- `timetable` : 時刻表包
- `timesimple` : 時刻簡易包
- `transfer` : 轉乘包

### 高鐵 (`thsrv2`)
- `station` : 車站包
- `timetable` : 時刻表包
- `timesimple` : 時刻簡易包

### 台鐵 (`tra` / `trav3`)
- `line` : 路線包
- `linesimple` : 路線簡易包
- `station` : 車站包
- `traintype` : 車種包
- `timetable` : 時刻表包
- `timesimple` : 時刻簡易包

## `--urls` 用法

`--urls` 後接 API 端點名稱（對應 `urls` 或 `v3urls` 中定義的 key），再緊接 `$Key=Value` 格式的變數替換參數。

### 變數替換規則
- `$Key=Value` 必須緊接在 `--urls <API>` 之後，中間不可插入其他 `--` 參數
- `$` 開頭的字串為 key，`=` 後面為要替換的 value
- 所有傳入的 `$Key` 都必須對應到 API URL 結構中的 `{Key}`，只要有一個沒對應就會報錯
- 若 API URL 中含有 `{Key}` 而沒有提供對應的 `$Key=Value`，也會報錯

### 搭配 `--ver` 使用
- 不加 `--ver` 時，呼叫預設版本的 `urls`
- `--ver 3` 時，呼叫 `v3urls` 版本的端點

## 範例

### 下載整包資料 (--catch)

下載台北捷運路線資料並存檔：
```bash
node catch.js --download --catch line --company trtc
```

使用自訂 AppID / AppKey 下載高鐵車站資料，自訂檔名：
```bash
node catch.js --download --AppID your_id --AppKey your_key --catch station --company thsrv2 --filename thsr_stations.json
```

### 呼叫單一 API (--urls)

查詢台鐵 V3 八堵到五堵站間票價（直接印出 JSON）：
```bash
node catch.js --urls ODFareFromTo $OriginStationID=0920 $DestinationStationID=0950 --company tra --ver 3
```

查詢台鐵 V3 指定車次的時刻表（直接印出 JSON）：
```bash
node catch.js --urls GeneralTrainTimetable_TrainNo $TrainNo=110 --company tra --ver 3
```

查詢高鐵指定起訖站票價並存檔：
```bash
node catch.js --download --urls ODFareFromTo $OriginStationID=0990 $DestinationStationID=1070 --company thsrv2
```

> **PowerShell 注意事項**：在 PowerShell 中 `$` 為特殊字元，需用單引號包裹，例如 `'$OriginStationID=0920'`。
