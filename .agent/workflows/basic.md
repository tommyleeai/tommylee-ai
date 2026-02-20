---
description: 新增基礎格子 section 的完整性 SOP，確保 state 初始化、分頁、排序都正確
---
// turbo-all

# 新增基礎格子 Section SOP

當新增一個帶有分頁格子的 section（如服裝、頭飾、風格等）時，必須檢查以下所有項目。

## 1. State 初始化（script.js）

在 `const state = { ... }` 區塊內新增對應的分頁 key：

```javascript
// 位置：script.js 第 61~72 行附近
xxxPage: 1,  // 分頁狀態
```

> ⚠️ 如果缺少這個初始化，`renderPaginatedGrid` 會因為 `state[pageKey]` 為 `undefined` 導致 NaN，格子完全不顯示。

## 2. Section 定義（options-data.js）

在 `TAB_SECTIONS` 內確認 section 定義包含 `count` 屬性：

```javascript
{ id: 'xxx', title: { zh: '中文名', en: 'English' }, data: XXX_DATA, count: 30 }
```

- `count` 用於其他邏輯判斷（非直接用於分頁），建議與資料筆數一致
- 若不設 `count`，某些 UI 邏輯可能異常

## 3. 資料排序（options-data.js）

基礎格子的資料陣列必須按受歡迎程度排序：
- 最熱門的項目排在陣列最前面
- 這樣分頁第一頁就會顯示最常用的選項

## 4. Section 特殊處理（script.js renderTabContent）

在 `renderTabContent` 函數內加入 section 的特殊處理：

```javascript
if (section.id === 'xxx') {
    // 1. 加入魔法按鈕（若有 Magic Modal）
    // 2. 加入已選 badge
    // 3. 加入 Advanced 橫幅
    // 4. 呼叫 renderPaginatedGrid(sectionEl, section, section.data, 'xxxPage')
    // 5. Advanced 啟用時灰化 grid
    tabContent.appendChild(sectionEl);
    return;
}
```

## 5. 分頁計算

`renderPaginatedGrid` 使用以下常數：
- `RACE_MAX_ROWS = 3`（最多 3 行）
- `RACE_COLS = 10`（每行 10 個）
- `RACE_PER_PAGE = 30`（每頁 30 個）

若需要不同的分頁大小，要在函數內做條件分支。

## 6. 瀏覽器驗證

修改完成後必須：
1. Hard Reload（Ctrl+Shift+R）
2. 切換到對應 tab
3. 確認格子顯示正常
4. 確認分頁按鈕正常（右下角 < 1/N > ）
5. 確認選項排序正確
6. 確認沒有 JS 錯誤

## 檢查清單

- [ ] `state.xxxPage: 1` 已加入 state 初始化
- [ ] section 定義有 `count` 屬性
- [ ] 資料陣列按人氣排序
- [ ] `renderPaginatedGrid` 呼叫正確
- [ ] 瀏覽器驗證格子顯示正常
- [ ] 分頁功能正常
