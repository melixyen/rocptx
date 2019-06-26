# PTX 座談會展示

* 作者: Melix Yen
* Mail: melixyen@gmail.com

## 主題: 交通資料查詢 JavaScript Library 與 Web 前端應用

# rocptx library
[https://github.com/melixyen/rocptx](https://github.com/melixyen/rocptx)

直接引用
```html
<script type="text/javascript" src="https://melixyen.github.io/rocptx/dist/ptx.js"></script>
<!-- 若要最小化檔案可用下方 url -->
<script type="text/javascript" src="https://melixyen.github.io/rocptx/dist/ptx.min.js"></script>
```

設定 key
```javascript
//在 include ptx.js 之後請指定你的 PTX ID 與 Key 值，設定方式如下，程式內建 SHA 計算 header
rocptx.AppID = '%SetYourPTXAppID%';
rocptx.AppKey = '%SetYourPTXAppKey%';
```

操作
```javascript
//ptx.js 為 UMD 格式輸出檔，單獨使用 Global Name 為 rocptx，使用 Promise 呼叫
rocptx.trtc.getStation('BL01').then(function(json){
    console.info(json);
})
//rocptx.捷運公司.getStation(車站代號).then(Promise resolve function);

//操作台鐵 v2 及 v3 版 ID 轉換
rocptx.tra.v2Sv3("1005"); //回應 "0960" 汐止
rocptx.tra.v3Sv2("7000"); //回應 "1715" 花蓮

```

### 工具及範例

* [資料抓取](https://melixyen.github.io/rocptx/app/dradra.html)
* [各營運業者車站時刻表整理](https://melixyen.github.io/rocptx/app/station_time.html)


<br><br><br><br>

# 公車運輸 QR CODE 雲端看板

[公車運輸 QR CODE 雲端看板](http://melixyen.github.io/railtime/busp.html#/)

## 訴求

使用 QR Code 方便現代人利用智慧型手機掃碼後取得公車資訊，或是製作 QR Code 用於對顧客、訪客、參加典禮者之交通資訊的提供。

* 所在公車站牌公車動態查詢
* 所在公車站牌前往目的可搭的所有路線查詢
* 建築物周邊前往其他觀光景點所有可搭乘路線及站牌位置查詢
* 印刷文宣、喜帖、官網之公車路線查詢

<br><br><br><br>

# 這班車有到嗎？台鐵列車速查

[台鐵列車速查](http://melixyen.github.io/railtime/ft.html)

## 訴求

由於新聞

[高雄、屏東一定有停，別再問了](https://www.chinatimes.com/realtimenews/20180819001101-260405?chdtv)

事件，加上本身居住汐止搭火車通勤經驗，台鐵捷運化政策下卻不像捷運的列車停靠模式單純，擁有多種列車等級（區間快、莒光、各式自強）且停靠站不一，印刷停靠站別表難以表達，時刻表也不易表示列車停靠站，故開發此系統模擬裝設於台鐵月台或剪票口，旅客候車且列車馬上進站時可以直接查詢該班車是否可到目的地，不能的話最近一班列車是哪一班車。

* 速查系統由上方指定固定的上車站
* 速查系統只列出鄰近的十幾個車站，通勤旅客最多的區域
* 旅客只要點目的地車站就可以獲得資訊，不設計過多按鈕或步驟也不提供多餘資訊
* 只以不用轉乘可直達的列車顯示
* 若將進站列車未停靠目的地車站則列出最近一班有停靠該站的列車是哪班

## 應用方式

查詢系統單純，只是一般 RWD Web 網頁，且旅客一般只按一個按鈕，所以從廉價的舊平板電腦到新的大型觸控螢幕都可以執行這個程式，甚至在無人站可貼一張 QR Code 掃完打開就能查詢該站，在硬體水平不同的情況下仍可以達成資訊提供統一化。

針對人潮較多的車站，可以投入 Pepper 類型的機器人，因為人在月台上還是比裝在牆上的平板電腦明顯。由於系統單純，依靠 Pepper 胸前的平板觸控即可回答旅客資訊。Pepper 對接近的旅客用語音提示按他胸前的目的地車站便可查詢有停靠之列車資訊，回到文字也可用語音提示，使旅客感受到更人性化的服務感。

![Pepper](https://i.imgur.com/CTmTKCd.jpg)

<br><br><br><br>

# 接軌時刻

[接軌時刻](https://melixyen.github.io/railtime/)

## 訴求

跨火車、捷運的通勤路線轉乘查詢系統，用於研究不同轉乘模式所花的時間。

<br><br><br><br>

# 對 PTX 的期取

* 車站 ID 有統一固定格式，否則像台鐵更新一次就要將依賴 code 全改
* 公車操作 StationID 的 API 可以不分縣市主管機關去 query
* 希望捷運能像火車、高鐵提供常態班次之列車運行時刻表，確實查詢該班車到目的地的時間而非用站間行駛時間推算
* 台鐵 V3 的臺北-環島站可以用別的方式處理掉環島列車停站資訊問題而不是在西部幹線列出這樣一個車站

[參考 公車 StationID](https://ptx.transportdata.tw/MOTC#!/CityBus/CityBusApi_Station) filter = StationID eq '1001113'

## StationID 可以印在全國公車站牌上

如新加坡作法，此數字可增加查尋#便利度及作為定位依據，不會因 GPS 飄移至對向站牌 (同向 StationID 才會一樣)，輸入數字也較輸入站牌名稱更容易。


![參考 SG StationID](https://i.imgur.com/CEVHf7L.jpg)
![參考 SG StationID](https://i.imgur.com/TFS1BQQ.jpg)

