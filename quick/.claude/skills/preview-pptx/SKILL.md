# Skill：preview-pptx — 簡報預覽

## 觸發條件

- 使用者說「預覽簡報」、「幫我預覽」、「我想看一下」
- 生成完 .pptx 後，Claude 主動詢問「要預覽嗎？」並得到確認
- 使用者執行 `/project:preview`

---

## 預覽流程（優先使用）

生成簡報時，Claude 會同步產出 `index.html`（HTML 版投影片）存放在同一個 output 子資料夾。
預覽時使用這份 HTML，不需要轉換 PPTX。

### 步驟

1. 確認 `output/` 裡對應資料夾有 `index.html`
   - 若沒有 → 重新生成（補產 HTML 版）

2. 呼叫 `mcp__Claude_Preview__preview_start`，URL 為：
   ```
   http://localhost:3456
   ```

3. Claude Code 內建 Preview 面板會自動開啟

4. 呼叫 `mcp__Claude_Preview__preview_screenshot` 截圖，顯示在對話裡

5. 詢問使用者：「要繼續看下一頁嗎？還是有需要調整的地方？」

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
1. 行銷簡報／（2026-03-28）
2. 產品介紹／（2026-03-20）

要預覽哪一個？
```

---

## 備用方案（HTML 預覽失敗時）

用系統程式直接開啟 PPTX：

```bash
cmd.exe /c start "" "output\專案名稱\檔案.pptx"
```

---

## 注意事項

- 伺服器設定在 `.claude/launch.json`，port 3456
- 若 port 被佔用：`$env:PORT=3457; node templates/preview/server.cjs output/xxx`
- `server.cjs` 會同時服務 output 子資料夾與 assets/ 裡的圖片素材
