# Skill：preview-pptx — 簡報預覽

## 觸發條件

- 使用者說「預覽簡報」、「幫我預覽」、「我想看一下」
- 生成完 .pptx 後，Claude 主動詢問「要預覽嗎？」並得到確認

---

## 預覽流程

生成簡報時，Claude 會同步產出 `index.html`（HTML 版投影片）存放在同一個 output 子資料夾。
預覽時直接用 `preview_start` 開啟這份 HTML，**不需要啟動伺服器，不需要轉換 PPTX**。

### 步驟

1. 確認 `output/[專案名稱]/index.html` 存在
   - 若沒有 → 重新生成（補產 HTML 版）

2. 呼叫 `mcp__Claude_Preview__preview_start`，傳入 HTML 檔案的**本機絕對路徑**：
   ```
   file:///C:/Users/.../output/[專案名稱]/index.html
   ```
   Claude Code Desktop 會直接在側邊 Preview 面板開啟

3. 呼叫 `mcp__Claude_Preview__preview_screenshot` 截圖，顯示在對話裡

4. 詢問使用者：「要繼續看下一頁嗎？還是有需要調整的地方？」

---

## HTML 版投影片規格

生成 PPTX 時，同步產出 `output/[專案名稱]/index.html`：

- 每張投影片對應一個 `<section>`，使用 CSS 模擬投影片版面
- 比例固定 16:9（寬 960px × 高 540px）
- 色碼、字型與 PPTX 一致
- 用左右鍵或螢幕上的箭頭切換頁面
- 不需要外部套件，純 HTML + CSS + 少量 JS

---

## 若 output/ 有多個資料夾

列出讓使用者選：

```
output/ 裡有以下簡報：
1. 行銷簡報（2026-03-28）
2. 產品介紹（2026-03-20）

要預覽哪一個？
```

---

## 備用方案（HTML 預覽失敗時）

用系統程式直接開啟 PPTX：

```bash
cmd.exe /c start "" "output\專案名稱\檔案.pptx"
```

---

## ⚠️ 預覽與實際成品的差異

HTML 預覽版與最終 `.pptx` 可能有以下落差，屬正常現象：

- **字型**：若使用者電腦未安裝 `Mochiy Pop One`，瀏覽器會自動替換字型，顯示效果會不同
- **字距 / 行距**：HTML 渲染與 PowerPoint 的排版引擎不同，可能有細微差異
- **圖片位置**：複雜的圖文排版在 HTML 版可能略有偏移
- **以 .pptx 為準**：預覽僅供快速確認內容與結構，正式成品請用 PowerPoint 開啟 `.pptx` 確認
