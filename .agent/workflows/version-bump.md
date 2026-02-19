---
description: how to bump the version number when making changes
language: zh-TW
---

> 📌 提醒：本專案一律使用繁體中文溝通。

# Version Bump Workflow

Every time a feature is added, a bug is fixed, or any meaningful change is made to the AI Prompt Generator, the version number MUST be updated in ALL of the following locations:

// turbo-all

1. **`index.html` line ~7** — `<title>AI Prompt Generator vX.X</title>`
2. **`index.html` line ~27-28** — `<span class="version">vX.X</span>`
3. **`index.html` CSS cache bust** — `styles.css?v=X.X`
4. **`index.html` JS cache bust** — `script.js?v=X.X`
5. **`script.js` changelog array** — Add a new entry at the TOP of the `changelog` array with version, date, and changes

## Version numbering rules
- Bug fix / 微調 / 加搜尋 bar 等小改動 → 第三位遞增 (e.g. v7.4 → v7.4.1 → v7.4.2)
- 新功能模組（如新增一整個 Magic Modal） → 第二位遞增 (e.g. v7.4 → v7.5)
- 大改版 / 架構重構 → 第一位遞增 (e.g. v7.5 → v8.0)

## IMPORTANT
- Always update ALL 5 locations — never leave any behind
- The changelog date format is `YYYY-MM-DD`
- Search for the old version string across all files to make sure nothing is missed

## 備份與上傳（改版後必做）
// turbo-all

1. `git add index.html script.js styles.css .agent/` — 加入變更
2. `git commit -m "vX.X: 簡述改動"` — 提交
3. `git push` — 推送到 GitHub
4. 大改版（+0.1 或 +1.0）時，額外建立本地備份：
   - `New-Item -ItemType Directory -Path "backups/vX.X_snapshot" -Force`
   - `Copy-Item index.html, script.js, styles.css -Destination "backups/vX.X_snapshot/"`

