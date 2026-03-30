# /project:preview

預覽 output/ 資料夾中生成好的簡報。

## 情況 A：預覽 .pptx 檔案（最常見）

1. 列出 `output/` 裡所有 .pptx 檔案
2. 若只有一個，直接開啟；若有多個，讓使用者選：
   ```
   output/ 裡有以下項目：
   1. 行銷簡報.pptx（最新）
   2. 產品介紹.pptx
   請問要預覽哪一個？
   ```
3. 用 PowerShell 開啟（不用 `open`，那是 macOS 指令）：
   ```powershell
   Start-Process "output\檔案名稱.pptx"
   ```
4. 告知：「已用系統預設程式開啟。沒有 PowerPoint 的話，可以用 LibreOffice Impress（免費）開啟 .pptx。」

## 情況 B：HTML 預覽版（若 output/ 裡有 index.html）

1. 確認 `templates/preview/server.cjs` 存在
2. 啟動伺服器：
   ```
   node templates/preview/server.cjs output/你的資料夾名稱
   ```
3. 告知：「預覽伺服器已啟動，請在瀏覽器開啟：http://localhost:3456，關閉時按 Ctrl+C。」

若使用者說「在瀏覽器看」，優先找 HTML 版；沒有的話開啟 .pptx。

port 被佔用時：`$env:PORT=3457; node templates/preview/server.cjs output/xxx`
