# 簡報生成器（規格書版）

## Why
適合需要重複製作同類型簡報的情境（例如：30堂課的課程簡報、固定格式的月報、有品牌規範的提案）。
把「每次都一樣的東西」存成規格書，之後每次只需要告訴 Claude「這次的內容是什麼」就好。

## What
- 引導使用者建立規格書（`specs/my-spec.md`）→ 往後每次生成時自動套用
- 視覺風格：`specs/style-guide.md`
- 內容參考：`specs/` 下的 industry-knowledge、company-guidelines、content-principles、slide-types
- 素材：`assets/` ｜ 範本：`templates/` ｜ 輸出：`output/`

## How

直接說就好：

| 你說什麼 | Claude 會做什麼 |
|---------|----------------|
| 「介紹這個專案」 | 顯示使用說明與建議流程 |
| 「幫我檢查環境」 | 確認 Node.js、pptxgenjs 安裝狀態 |
| 「我想討論規格」 | 引導建立規格書，並幫你釐清哪些該放進去 |
| 「幫我生成簡報」 | 依規格書 + 本次輸入生成 `.pptx` |
| 「預覽簡報」 | 在 Claude 對話裡直接顯示成品 |

## 工具規則
- 生成 `.pptx`：使用 `pptxgenjs`（Node.js）
- 預覽：生成 PPTX 同時產出 HTML 版，用 `preview_start` 啟動伺服器，`preview_screenshot` 截圖顯示在對話裡
- 規格書不存在時：先引導討論建立，再生成
- 有範本在 `templates/`：解析後套用，可覆蓋 style-guide 預設值
- 缺素材：留佔位色塊，告知後繼續生成
- 成品放 `output/`
