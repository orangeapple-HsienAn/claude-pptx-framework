# Skill：check-env — 環境檢查與套件安裝

## 觸發條件

- 使用者執行 `/project:check-env`
- 使用者說「幫我檢查環境」、「安裝需要的套件」
- `plan-and-build` skill 在生成前發現缺少依賴時，也會呼叫此 skill

---

## 這個 Skill 的目標

確認這個專案需要的所有工具都已安裝，若有缺少則引導使用者安裝。
**生成簡報前至少需要 Node.js + pptxgenjs**。

---

## 執行流程

### Step 1：檢查 Node.js

```bash
node -v
```

- **有版本號** → Node.js 已安裝，繼續
- **報錯或找不到** → 告知使用者：
  > 「需要先安裝 Node.js。請前往 https://nodejs.org 下載 LTS 版本安裝後，重新開啟終端機再執行一次。」
  > 安裝完成前停止後續步驟。

---

### Step 2：檢查 pptxgenjs（生成 .pptx 必需）

```bash
node -e "require('pptxgenjs')" 2>&1
```

- **無輸出（無報錯）** → 已安裝，繼續
- **報錯 MODULE_NOT_FOUND** → 安裝：

```bash
npm install pptxgenjs
```

安裝完成後再次確認：
```bash
node -e "require('pptxgenjs'); console.log('OK')"
```

---

### Step 3：檢查 python-docx（生成 .docx 用，選用）

```bash
python -c "import docx" 2>&1
```

或（Windows 可能需要）：
```bash
python3 -c "import docx" 2>&1
```

- **無輸出** → 已安裝
- **ModuleNotFoundError** → 詢問使用者：
  > 「python-docx 未安裝，這個套件用來生成 Word 文件（.docx）。如果你不需要生成 Word 文件可以跳過。要安裝嗎？」
  - 使用者確認 → 執行：
    ```bash
    pip install python-docx --break-system-packages
    ```
  - 使用者跳過 → 記下「docx 生成功能不可用」，繼續

---

### Step 4：確認預覽伺服器

確認 `templates/preview/server.cjs` 存在：

```bash
# PowerShell
Test-Path templates\preview\server.cjs
```

- **True** → 預覽功能可用
- **False** → 告知使用者：
  > 「預覽伺服器檔案不存在，可能是資料夾結構不完整。請確認 `templates/preview/server.cjs` 是否存在。」

---

### Step 5：輸出檢查報告

用表格列出結果：

```
✅ Node.js        v22.x.x   — 已就緒
✅ pptxgenjs      3.x.x     — 已就緒
✅ python-docx    —         — 已就緒
✅ 預覽伺服器     —         — 已就緒

環境檢查完成，可以開始生成簡報。
跟我說「我想做一份簡報」開始規劃。
```

若有項目未就緒：
```
⚠️ python-docx 未安裝（已跳過）— Word 文件生成功能不可用
```

---

## 注意事項

- 這個 skill 在 Windows PowerShell 環境下執行
- 不要使用 Unix 語法（`&&`、`<`、`pbcopy` 等），改用 PowerShell 語法
- `npm install` 不加 `-g`，安裝在專案本地（`node_modules/`）
- 若使用者的 Python 指令是 `py` 而非 `python`，嘗試 `py -c "import docx"` 也可以
