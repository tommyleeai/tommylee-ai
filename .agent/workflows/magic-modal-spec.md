---
description: 新增 Magic Modal section 時的統一設計規範，包含架構模式、UI元件、狀態管理、橫幅等標準
---

# Magic Modal 設計規範

當使用者要新增 tab 內的 section（如風格、環境、攝影等），或修改現有 Magic Modal 時，
**必須先讀取設計規範文件**，確保所有新功能遵循統一風格。

// turbo-all

## 步驟

1. 讀取設計規範：`docs/magic-modal-design-spec.md`
2. 根據功能需求，判斷使用 **A 型**（Grid+Bonus）、**B 型**（Grid+控制區）、或 **C 型**（純推桿）架構
3. 遵循規範中的：
   - UI 元件規範（chip 三態、tab 三態、搜尋 bar、控制區 chip）
   - 色彩系統（紫色系主題）
   - 狀態管理（`state.xxxAdvanced` 格式 + localStorage 持久化）
   - 橫幅規範（`body-advanced-summary` class + 具體名稱列表）
   - Grid 灰化（`body-section-disabled`）
   - 模組化結構（IIFE + data 分離 + CSS 前綴）
   - 動畫與音效規範
4. 按照規範底部的「新建 Section Checklist」逐項完成
5. 修改前執行 `/css-safety`
6. 完成後執行 `/version-bump`
