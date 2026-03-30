# /project:check-env

確認這個專案需要的所有工具都已安裝，若有缺少則引導使用者安裝。
**生成簡報前至少需要 Node.js + pptxgenjs**。

## Step 1：檢查 Node.js

執行：
```
node -v
```

- **有版本號** → 繼續
- **找不到指令** → 告知：「需要先安裝 Node.js。請前往 https://nodejs.org 下載 LTS 版本安裝後，重新開啟終端機再執行一次。」然後停止。

## Step 2：檢查 pptxgenjs（必需）

執行：
```
node -e "require('pptxgenjs')" 2>&1
```

- **無輸出** → 已安裝，繼續
- **MODULE_NOT_FOUND** → 執行安裝：
  ```
  npm install pptxgenjs
  ```
  安裝後確認：`node -e "require('pptxgenjs'); console.log('OK')"`

## Step 3：檢查 python-docx（選用，生成 .docx 用）

執行：
```
python -c "import docx"
```
若 python 不通，試 `py -c "import docx"`

- **無輸出** → 已安裝
- **ModuleNotFoundError** → 問使用者：「python-docx 未安裝，這個套件用來生成 Word 文件。不需要的話可以跳過。要安裝嗎？」
  - 確認 → `pip install python-docx --break-system-packages`
  - 跳過 → 記下「docx 功能不可用」，繼續

## Step 4：確認預覽伺服器

執行（PowerShell）：
```
Test-Path templates\preview\server.cjs
```

- **True** → 預覽功能可用
- **False** → 告知：「預覽伺服器檔案不存在，請確認 `templates/preview/server.cjs` 是否存在。」

## Step 5：輸出報告

用以下格式列出結果：
```
✅ Node.js        vXX.X.X  — 已就緒
✅ pptxgenjs      X.X.X    — 已就緒
✅ python-docx    —        — 已就緒
✅ 預覽伺服器     —        — 已就緒

環境檢查完成！輸入 /project:discuss-spec 開始規劃你的簡報。
```

若有項目未就緒：
```
⚠️ python-docx 未安裝（已跳過）— Word 文件生成功能不可用
```

## 注意事項

- Windows PowerShell 環境，不用 Unix 語法（`&&`、`pbcopy` 等）
- `npm install` 不加 `-g`，安裝在專案本地
