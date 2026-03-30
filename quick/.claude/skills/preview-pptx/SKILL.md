# Skill：preview-pptx — 簡報預覽

## 觸發條件

- 使用者執行 `/project:preview`
- 使用者說「幫我預覽」、「我想看一下簡報」、「開啟預覽」
- 生成完 .pptx 後，Claude 主動詢問「要預覽嗎？」並得到確認

---

## 背景說明

本專案的預覽方式分兩種，根據生成的產出類型決定：

| 產出類型 | 預覽方式 |
|---------|---------|
| `.pptx` 檔案 | 用系統預設程式開啟（PowerPoint / LibreOffice） |
| HTML 投影片預覽（若有生成） | 啟動 `templates/preview/server.cjs` 在瀏覽器預覽 |

---

## 執行流程

### 情況 A：在 Claude 對話裡直接預覽（優先使用）

1. 確認要預覽的 .pptx 檔案路徑（絕對路徑）
2. 用 Python COM 自動化把 .pptx 轉成 PDF（需要安裝 PowerPoint）：

```python
import comtypes.client

pptx = r'C:\完整路徑\檔案.pptx'
pdf  = pptx.replace('.pptx', '.pdf')

ppt = comtypes.client.CreateObject('PowerPoint.Application')
ppt.Visible = True
deck = ppt.Presentations.Open(pptx, ReadOnly=True)
deck.SaveAs(pdf, 32)   # 32 = ppSaveAsPDF
deck.Close()
ppt.Quit()
```

3. 用 `mcp__PDF_Tools_-_Fill__Analyze__Extract__View__display_pdf` 顯示 PDF

### 情況 B：用系統程式開啟（備用）

若 COM 自動化失敗：

```bash
cmd.exe /c start "" "output\你的檔案.pptx"
```

---

### 情況 B：啟動 HTML 預覽伺服器

若生成時同時產出了 HTML 預覽版（`output/xxx/index.html`）：

1. 確認 `templates/preview/server.cjs` 存在
2. 確認 `output/` 裡的目標資料夾有 `index.html`
3. 啟動伺服器：

```bash
node templates/preview/server.cjs output/你的資料夾名稱
```

4. 告知使用者：
   > 「預覽伺服器已啟動。請在瀏覽器開啟：http://localhost:3456」
   > 「關閉預覽時，按 Ctrl+C 停止伺服器。」

---

### 若 output/ 裡有多個檔案

列出所有可預覽的項目讓使用者選：

```
output/ 裡有以下項目：
1. 行銷簡報.pptx（2026-03-25）
2. 產品介紹.pptx（2026-03-20）

請問要預覽哪一個？
```

---

## 注意事項

- Windows 環境使用 `Start-Process`，不用 `open`（macOS 指令）
- 若使用者說「在瀏覽器看」，優先找 HTML 版；若沒有，開啟 .pptx 並說明
- 伺服器預設 port 3456，若被佔用可設環境變數：`$env:PORT=3457; node templates/preview/server.cjs output/xxx`
