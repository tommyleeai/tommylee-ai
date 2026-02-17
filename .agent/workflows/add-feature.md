---
description: 新增功能、頁面、按鈕時的完整性檢查 SOP，防止未定義引用導致渲染崩潰
---

# 新增功能完整性檢查 SOP

每當新增功能、頁面、按鈕或 UI 元件時，**必須**依照以下步驟進行完整性檢查，確保不會因為缺失的依賴導致渲染崩潰。

> ⚠️ **歷史教訓**：bodyAdvanced 功能加入了 UI 渲染代碼，但遺漏了 `BODY_MAGIC_DATA`、`openBodyMagicModal`、`clearBodyMagic` 等核心數據和函數，導致 `renderTabContent` 靜默崩潰，所有後續 section 排版全部錯亂。

---

## 1. 依賴清單盤點（必要步驟）

新增任何功能前，先列出該功能需要的**所有依賴項**：

| 類型 | 範例 | 檢查方式 |
|------|------|----------|
| 常量/資料 | `BODY_MAGIC_DATA`, `RACES` | `grep` 確認已定義 |
| 函數 | `openBodyMagicModal()`, `clearBodyMagic()` | `grep` 確認已定義 |
| DOM 元素 | `#modal-overlay`, `.preview-container` | 確認存在於 `index.html` |
| CSS 類別 | `.body-advanced-summary`, `.body-section-disabled` | `grep` 確認存在於 `styles.css` |
| state 欄位 | `state.bodyAdvanced`, `state.ageEnabled` | 確認在 `state` 物件中初始化 |
| localStorage | `saveState()` / `loadState()` 中的欄位 | 確認雙向讀寫一致 |

### 操作步驟
```
// turbo
1. grep 搜尋新功能中引用的所有變量名、函數名、CSS class
2. 確認每一個都有對應的定義
3. 如果有缺失，必須先補齊再進行下一步
```

---

## 2. 安全防護（必要步驟）

所有新增的功能代碼**必須**加入安全防護，避免單一錯誤導致整個頁面崩潰：

### 2a. typeof 檢查
引用外部常量/函數前，加入存在性檢查：
```javascript
// ✅ 正確
if (typeof BODY_MAGIC_DATA !== 'undefined') {
    // 使用 BODY_MAGIC_DATA
}

// ❌ 錯誤 — 如果 BODY_MAGIC_DATA 不存在會直接 ReferenceError
const data = BODY_MAGIC_DATA.FEMALE_BUST[value];
```

### 2b. try-catch 保護
在渲染迴圈中的新功能代碼，用 try-catch 包裹：
```javascript
try {
    // 新功能渲染邏輯
} catch (err) {
    console.warn('功能名稱 render error:', err);
    // 回退到安全狀態
    state.newFeature = null;
}
```

### 2c. 函數存在性檢查
呼叫可能尚未定義的函數前：
```javascript
if (typeof clearBodyMagic === 'function') clearBodyMagic();
else { /* 內聯回退邏輯 */ }
```

---

## 3. state 持久化檢查（必要步驟）

如果新功能涉及 `state` 欄位：

- [ ] `state` 物件中有初始值（如 `bodyAdvanced: null`）
- [ ] `saveState()` 有包含該欄位
- [ ] `loadState()` 有讀取該欄位，且有合理的預設值
- [ ] 頁面載入時，即使該欄位有殘留值，也不會導致崩潰

### 特別注意
舊版 localStorage 可能沒有新欄位 → `loadState` 必須有 `|| defaultValue` 回退：
```javascript
state.newFeature = parsed.newFeature || null;
state.newToggle = parsed.newToggle !== false; // 預設 true
```

---

## 4. 渲染流程影響檢查

確認新功能不會中斷現有渲染流程：

- [ ] 新功能的錯誤不會阻止後續 section 渲染
- [ ] 新增的 DOM 元素不會影響既有的 flex/grid 佈局
- [ ] 新增的 CSS class 不與現有 class 衝突
- [ ] 如果新功能使用 `position: absolute/fixed`，確認不會遮蓋其他元素

---

## 5. 跨功能相容性

- [ ] 新功能與現有的性別切換（`state.gender`）相容
- [ ] 新功能與語言切換（`state.lang`）相容
- [ ] 新功能與格式切換（`state.format` plain/yaml）相容
- [ ] `generatePromptPlain` 和 `generatePromptYAML` 都已更新

---

## 6. 最終驗證清單

加入功能後，執行以下驗證：

```
// turbo
1. 在瀏覽器中開啟頁面，檢查 F12 Console 是否有紅色錯誤
2. 切換所有 tab（基本、外觀、場景、效果）確認渲染正常
3. 切換性別，確認所有 section 正常
4. 生成 prompt，確認輸出正確
5. 重新載入頁面，確認 localStorage 正常還原
6. 清除 localStorage 後重新載入，確認預設值正常
```
