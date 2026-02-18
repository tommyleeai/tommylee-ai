---
description: 專案通用規則：溝通語言、檔案目錄、圖片生成等基本規範
---

# 專案通用規則

以下規則在所有操作中**必須**遵守，無例外。

## 1. 用中文溝通
- 所有對話、commit message、changelog、UI 文字皆使用**繁體中文**
- 程式碼中的變數名和註解可用英文，但面向使用者的文字一律中文

## 2. 圖片生成一律圖生圖
- 需要生成圖片時，**必須先確認基底圖**（`assets/base_template.png` 或使用者指定的圖片）
- 使用 `generate_image` 工具時，將基底圖傳入 `ImagePaths` 參數
- **禁止**在未確認基底圖的情況下直接生成全新圖片
- 每次只生成一張，等使用者確認後才生成下一張

## 3. 檔案目錄規範

| 檔案類型 | 存放目錄 | 範例 |
|----------|----------|------|
| 非程式碼文件（文檔、筆記、release notes） | `/docs` | `docs/v5.0_release_notes.md` |
| Demo / 測試用 HTML | `/demos` | `demos/body_type_demo.html` |
| 正式程式碼 | 根目錄 | `index.html`, `script.js`, `styles.css` |
| 靜態資源 | `/assets` | `assets/logo.png` |
| 備份 | `/backups` | `backups/v6.0_snapshot/` |

## 4. 大改版必須立刻備份
- 每次改版完成後，執行 `git add + commit + push`
- **大改版**（版號 +1.0 或 +0.1）時，額外建立 `backups/vX.X_snapshot/` 資料夾備份核心檔案
- 備份檔案至少包含：`index.html`, `script.js`, `styles.css`
- 不需要使用者提醒，改版完成後**自動執行**

## 5. Demos 目錄保護
- `/demos` 目錄中的檔案**禁止隨意刪除**
- 即使功能已整合至主頁面，原始 demo 檔案仍須保留作為參考和測試用途
- 如確實需要刪除，必須先取得使用者明確同意
