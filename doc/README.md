# rocptx 文件索引

## 目錄結構

```text
doc/
├── API_MAPPING.md              # 目前 SDK 公開方法總表與 TDX 對照
├── README.md                   # 本索引
└── tdx_docs/
    ├── upgrade_plan.md         # SDK 與 TDX docs 差異、缺口與升級順序
    ├── tdx.md                  # TDX 文件說明整理
    └── *.json                  # TDX Swagger / OpenAPI 原始規格
```

## 建議閱讀順序

### 想知道「現在 SDK 有什麼」

先看 `doc/API_MAPPING.md`：

- `src/main.js` 的公開匯出
- 各模組目前可用的方法
- `metro` / `thsr` / `tra` / `router` / `id` 的實際結構

### 想知道「TDX docs 和 SDK 差在哪裡」

看 `doc/tdx_docs/upgrade_plan.md`：

- 已對應項目
- 部分對應項目
- 尚未建立的類別 / 模組
- 文件與程式的增刪差異
- 後續優先順序

### 想追原始 TDX 規格

看 `doc/tdx_docs/*.json` 與 `doc/tdx_docs/tdx.md`。

## 各文件角色

| 文件 | 角色 | 應以什麼為準 |
|---|---|---|
| `README.md` | 對外使用說明 / 快速上手 | 可讀性與主要入口 |
| `doc/API_MAPPING.md` | 內部維護用方法總表 | `src/*.js` 原始碼 |
| `doc/tdx_docs/upgrade_plan.md` | 缺口盤點與升級規劃 | `src/*.js` + `tdx_docs/*.json` |
| `doc/tdx_docs/*.json` | TDX 原始規格 | TDX 文件本身 |

## 維護原則

1. **SDK 原始碼優先**：方法名、命名空間與匯出結構以 `src/*.js` 為準
2. **TDX 規格次之**：覆蓋率與缺口以 `doc/tdx_docs/*.json` 為準
3. **README 不做全文方法表**：完整方法索引統一放在 `doc/API_MAPPING.md`
4. **有結構變更就同步三處**：`README.md`、`doc/API_MAPPING.md`、`doc/README.md`
5. **若新增 TDX 對應能力**：同步更新 `doc/tdx_docs/upgrade_plan.md`

## 本輪已整理的重點

- 補回 `tmrt`、`thsr`、`router`、`id` 等實際公開模組說明
- 將 `API_MAPPING.md` 改為目前 SDK 的方法索引，而非舊版概述文
- 將 `router` 改為實際的 `bus / v1 / v2` 結構描述
- 明確標示 `thsr.v2` 為已實作，不再視為預留
- 將 `tra.v3` 新增的 `TrainDates`、`Operator`、`LineNetwork` 納入文件索引

## 維護建議

未來若有新 API / 模組加入，建議依序檢查：

1. `src/main.js` 是否已公開匯出
2. `doc/API_MAPPING.md` 是否已列出方法與 namespace
3. `README.md` 是否有對外說明需要同步
4. `doc/tdx_docs/upgrade_plan.md` 是否需要更新缺口與優先級

最後更新：2026-03-09
