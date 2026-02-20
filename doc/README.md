# 📚 rocptx 文檔目錄索引

## 目錄結構

```
doc/
├── API_MAPPING.md       # 📖 rocptx 與 TDX API 對應說明
└── README.md            # 📑 本文檔
```

---

## 📖 文檔說明

### **API_MAPPING.md** - rocptx 與 TDX API 對應表

**用途**：了解專案架構與 API 的關聯

**內容**：
- rocptx 專案概述
- 核心配置與認證流程
- 各模組與 API 的詳細對應
- 實際 API 呼叫流程示例
- OData 查詢參數說明

**適合閱讀對象**：
- 初次使用 rocptx 的開發者
- 需要了解 API 整體結構的人
- 進行系統設計和架構規劃的人

---

## 🚀 快速開始

### 對於初次使用者
```
1. 打開 API_MAPPING.md 了解 rocptx 架構
2. 查看 src/tra.js 的 JSDoc 註解學習新 API
3. 運行代碼示例進行測試
```

### 對於老用戶
```
1. 查看 src/tra.js (lines 73-75, 508-541, 697-742) 了解新增的 3 個 API
2. 檢查 getOperator()、getLineNetwork()、getDailyTrainTimetableDates() 的用法
3. 完成整合！
```

---

## 📝 新增 API 快速參考

### 三個新增的 TRA V3 API

| API | 功能 | 方法 |
|-----|------|------|
| DailyTrainTimetable/TrainDates | 列車日期範圍查詢 | `tra.v3.getDailyTrainTimetableDates()` |
| Operator | 營運業者資訊 | `tra.v3.getOperator()` |
| LineNetwork | 路線網路拓撲 | `tra.v3.getLineNetwork()` |

### API 回應格式

**TrainDates**
```javascript
{
  TrainDates: [],           // 日期陣列
  StartDate: "2026-01-01",
  EndDate: "2026-12-31",
  Count: 366,
  UpdateTime: "2026-02-20T07:29:54+08:00",
  UpdateInterval: 14400,
  AuthorityCode: "TRA"
}
```

**Operator**
```javascript
{
  Operators: [              // 營運業者陣列
    {
      OperatorCode: "TRA",
      OperatorName: { Zh_tw: "國營臺灣鐵路...", En: "Taiwan Railway..." },
      // ... 其他欄位
    }
  ],
  UpdateTime: "2026-02-20T07:29:54+08:00",
  UpdateInterval: 14400,
  SrcUpdateTime: "2026-02-20T04:00:00+08:00",
  SrcUpdateInterval: 86400,
  AuthorityCode: "TRA"
}
```

**LineNetwork**
```javascript
{
  LineNetworks: [           // 路線網路陣列
    {
      LineID: "WL",
      LineName: { Zh_tw: "西部幹線", En: "Western Main Line" },
      LineSegments: [       // 路線區段陣列
        {
          LineSegmentID: "0900-0910",
          LineSegmentName: { ... },
          FromStationID: "0900",
          ToStationID: "0910",
          SegmentType: "M",
          Distance: 1.5
        }
        // ... 更多區段
      ]
    }
    // ... 更多路線
  ],
  UpdateTime: "2026-02-20T07:29:54+08:00",
  UpdateInterval: 14400,
  SrcUpdateTime: "2026-02-20T04:00:00+08:00",
  SrcUpdateInterval: 86400,
  AuthorityCode: "TRA"
}
```

---

## 💻 代碼位置參考

### 在 src/tra.js 中的位置

**API 端點定義**（第 73-75 行）
```javascript
v3urls: {
    // ...
    DailyTrainTimetable_TrainDates: '/v3/Rail/TRA/DailyTrainTimetable/TrainDates',
    Operator: '/v3/Rail/TRA/Operator',
    LineNetwork: '/v3/Rail/TRA/LineNetwork'
}
```

**便利方法**（第 508-541 行）
```javascript
tra.v3 = {
    getDailyTrainTimetableDates: function(progressFn) { ... },
    getOperator: function(progressFn) { ... },
    getLineNetwork: function(progressFn) { ... }
}
```

**數據處理方法**（第 697-742 行）
```javascript
catchV3Data = {
    TrainDates: function(progressFn) { ... },
    Operator: function(progressFn) { ... },
    LineNetwork: function(progressFn) { ... }
}
```

---

## 📋 實裝檢查清單

- ✅ DailyTrainTimetable/TrainDates API 實裝
- ✅ Operator API 實裝
- ✅ LineNetwork API 實裝
- ✅ 三個便利方法已添加到 `tra.v3` 對象
- ✅ 三個數據處理方法已添加到 `catchV3Data` 對象
- ✅ 所有回應格式已驗證
- ✅ 編譯完成（dist/ptx.js）

---

## 📞 文檔維護信息

- **最後更新**：2026 年 2 月 20 日
- **當前版本**：v1.0
- **rocptx 版本**：v0.0.8+
- **TDX API 版本**：v2/v3

---

## ✅ 實裝驗證

所有新增 API 均已：
- ✅ 添加到 v3urls 對象
- ✅ 創建便利方法在 tra.v3 中
- ✅ 創建數據處理方法在 catchV3Data 中
- ✅ 根據真實 TDX API 回應格式進行驗證
- ✅ 包含在編譯後的 UMD 模組中

---

**祝您使用愉快！** 🎉

如有任何問題，請檢查源代碼中的 JSDoc 註解或參考 src/tra.js 的實裝。
