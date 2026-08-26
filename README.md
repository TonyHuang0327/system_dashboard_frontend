# System Dashboard（前端）

系統資源儀表板：即時顯示 CPU、RAM、Disk 使用率，點擊 KPI 可切換對應折線圖。後端為獨立專案：[system_dashboard_backend](https://github.com/TonyHuang0327/system_dashboard_backend)。

## 技術

- React 19 + TypeScript + Vite
- MUI + `@mui/x-charts` 折線圖
- TanStack Query 輪詢（成功每 1 秒、失敗每 5 秒）
- 開發時 MSW 模擬高負載與斷線

## 啟動

1. 安裝依賴：`npm install`
2. 複製環境變數：`cp .env.example .env.local`
3. 啟動後端（預設 `http://localhost:3001`）
4. 啟動前端：`npm start`（等同 `npm run dev`，預設 `http://localhost:5173`）

`.env.local` 說明：


| 變數                    | 說明                                        |
| --------------------- | ----------------------------------------- |
| `VITE_API_BASE`       | API 前綴，例如 `http://localhost:3001/api`     |
| `VITE_ENABLE_MOCKING` | 開發環境設 `true` 才會啟動 MSW；`false` 時無法模擬高負載／斷線 |


環境變數變更後需重開 Vite。

## 測試場景

標題旁三顆按鈕（開發時 `VITE_ENABLE_MOCKING=true`）：


| 按鈕            | 行為                                          |
| ------------- | ------------------------------------------- |
| **Normal**    | MSW `passthrough()`，打真實後端。後端需開著。            |
| **High load** | MSW 回傳三項使用率 ≥ 80%；KPI 顯示 High，折線改為紅色。不依賴後端。 |
| **Offline**   | MSW 模擬斷線。不依賴後端。                             |


切換情境會 `resetQueries()`，避免留下上一筆快取。

## 畫面

- 三張 KPI（CPU / RAM / Disk），使用率 ≥ 80% 標為 High
- 點 KPI 切換折線圖；前端自行累積最近約 10 筆
- RWD：小螢幕直向堆疊，`sm`（600px）起 KPI 與圖表並排



## API

前端對 `VITE_API_BASE` 發 GET：

- `/cpu`：`cpuName`、`coreNumber`、`usage`（0–100）、`timestamp`
- `/ram`：`total`、`used`（byte）、`timestamp`
- `/disk`：`total`、`used`（byte）、`timestamp`

請求會帶 `?scenario=`（後端可忽略）。