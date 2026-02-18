---
description: 高級魔法 Modal 設計規範 — 種族大全的視覺風格、色彩、動畫、元件格式，可複用於職業、服飾等其他選擇器
---

# 高級魔法 Modal 設計規範

此 workflow 定義了「種族大全」Modal 的完整設計語言，作為所有同類選擇器（職業、服飾、配件等）的基準模版。

## 參考範本
- **HTML**: `demos/race_magic_demo.html`（完整可運行的獨立 demo）

---

## 1. 色彩系統

### 主色調（紫色系 Purple Palette）
| 用途 | 色碼 | 說明 |
|------|------|------|
| 主色 | `#a855f7` | 選中邊框、active 底線、badge |
| 深主色 | `#7c3aed` | 漸層起點、按鈕、box-shadow |
| 淺主色 | `#c084fc` | hover 文字、active count |
| 超淺主色 | `#f3e8ff` | active tab 文字 |

### 強調色
| 用途 | 色碼 |
|------|------|
| 金色（熱門/加分） | `#fbbf24` |
| 藍色（最近使用） | `#38bdf8` |
| 橘色（熱門 badge） | `#f59e0b` |

### 背景系統（深色 Dark Theme）
| 元素 | 色碼 |
|------|------|
| 容器背景 | `linear-gradient(135deg, rgba(15,23,42,.97), rgba(30,41,59,.97))` |
| 元件背景 | `rgba(30, 41, 59, .4~.6)` |
| 遮罩背景 | `rgba(0, 0, 0, .6)` |
| 邊框 | `rgba(148, 163, 184, .1~.15)` |

### 文字色階
| 層級 | 色碼 | 用途 |
|------|------|------|
| 主文字 | `#e2e8f0` | 正常、可讀 |
| 次要文字 | `#94a3b8` | 標籤、說明 |
| 弱文字 | `#64748b` | 英文名、count |
| 最弱文字 | `#475569` | A-Z 索引 |

---

## 2. 元件規格

### 2.1 Container（外框）
```css
width: 92vw; max-width: 860px; height: 68vh;
border-radius: 16px;
border: 1px solid rgba(148, 163, 184, .15);
box-shadow: 0 0 50px rgba(124,58,237,.2), 0 0 100px rgba(124,58,237,.08);
```
- 固定高度 flex column 佈局
- 入場動畫: `scale(.5→1)` + `cubic-bezier(.34, 1.56, .64, 1)` 彈性

### 2.2 Header
- 標題: 漸層文字 `gold → purple → purple → gold`，`background-size: 300%` + 流動動畫
- 工具列按鈕: `border-radius: 8px`, 半透明背景, hover 時紫色邊框 + 上浮

### 2.3 分類 Tabs
- 容器: `display: flex; gap: 4px; overflow-x: auto;`
- Tab 形狀: `border-radius: 8px 8px 0 0`（上圓下方）
- **三態**:
  - **正常**: `background: rgba(30,41,59,.4); color: #94a3b8; border-bottom: 2px solid transparent;`
  - **Hover**: `color: #c084fc; background: rgba(124,58,237,.15); border-bottom-color: rgba(168,85,247,.5); transform: translateY(-2px);`
  - **Active**: `background: linear-gradient(180deg, rgba(124,58,237,.2), rgba(30,41,59,.9)); color: #f3e8ff; border-bottom: 3px solid #a855f7; box-shadow 發光;`
  - Active 的 icon: `scale(1.15) + drop-shadow 紫色光暈`
- Tab 內容: icon + 中文標籤 + 英文 + count

### 2.4 選項 Chip（Grid 項目）
- Grid: `grid-template-columns: repeat(4, 1fr); gap: 5px;`
- Chip: `border-radius: 8px; padding: 7px 9px;`
- 結構: `icon + 中文名 + 英文名`（flex row，文字 flex column）
- **三態**:
  - **正常**: 半透明深色背景 + 灰白文字
  - **Hover**: 紫色邊框 + 上浮 1px + 文字加亮
  - **Selected**: 紫色背景+邊框 + 白色文字 + box-shadow 光暈

### 2.5 加分特徵（Bonus Panel）
- 位於 grid 下方，選中項目後顯示
- 標題: `⭐ 點選增加特徵 — {名稱}`（金色高亮名稱）
- Tags: pill 形 `border-radius: 16px`，hover/active 金色

### 2.6 A-Z 索引
- 右側垂直排列，`font-size: .5rem`
- hover 紫色，active 紫色背景白字

### 2.7 Footer
- 左: 狀態文字（已載入 X / 顯示 Y / 已選 Z）
- 右: 取消 + 套用 按鈕
- 套用按鈕: `linear-gradient(135deg, #7c3aed, #a855f7)` + hover 上浮

---

## 3. 動畫規範

### 入場
- Overlay: `fadeIn .3s`
- Container: `scale(.5→1)` 彈性 `0.5s`
- 標題: `blur(8px→0)` 延遲 0.3s

### 互動
- 所有 `transition: all .2s~.25s ease`
- Hover 上浮: `translateY(-1px~-2px)`
- 點選回饋: 紫色 border + box-shadow

### 骰子隨機（可選功能）
- Phase 1: **掉落** `translateY(-200px→0)` 0.4s（帶回彈）
- Phase 2: **彈跳滾動** 上下震盪衰減 1s（6次彈跳）+ 旋轉 720°
- Phase 3: **彈出消失** 先微蹲→往上飛走 0.3s
- 元素: emoji `🎲`（80px）+ 紫色 drop-shadow 光暈
- 音效: Web Audio API 低頻隆隆聲 + burst clicks

### 粒子背景（氛圍）
- 浮動光點: `rmm-particle`（6個，隨機位置/大小/延遲）
- 流星: `rmm-meteor`（4條，斜向劃過）

---

## 4. 資料結構模板

### 分類定義
```javascript
const CATEGORIES = [
    { id: 'all', icon: '🌐', label: '全部', en: 'All' },
    { id: 'recent', icon: '📋', label: '最近', en: 'Recent' },
    { id: 'hot', icon: '🔥', label: '熱門', en: 'Hot' },
    // ... 自訂分類
];
```

### 選項定義
```javascript
const ITEMS = [
    { id: 'warrior', name: '戰士', en: 'Warrior', icon: '⚔️', cat: 'melee', bonus: ['劍術', '盾牌', '重甲'] },
    // ...
];
```

### 熱門列表
```javascript
const HOT_ITEMS = ['warrior', 'mage', 'archer', ...];
```

---

## 5. CSS 命名規範

全部使用 **rmm-** 前綴（Race Magic Modal），複用時替換為新前綴：
- 種族: `rmm-`（已完成）
- 職業: `jmm-`（Job Magic Modal）建議
- 服飾: `cmm-`（Costume Magic Modal）建議

| 元件 | Class 範例 |
|------|-----------|
| 外層 | `{prefix}overlay`, `{prefix}container` |
| 頭部 | `{prefix}header`, `{prefix}title`, `{prefix}toolbar` |
| Tab | `{prefix}tabs`, `{prefix}tab`, `{prefix}tab-icon` |
| Grid | `{prefix}grid`, `{prefix}race-chip` → `{prefix}item-chip` |
| Footer | `{prefix}footer`, `{prefix}btn`, `{prefix}status` |

---

## 6. 建立新選擇器的 Checklist

// turbo-all

1. 複製 `demos/race_magic_demo.html` 為新 demo，例如 `demos/job_magic_demo.html`
2. 全域替換 CSS 前綴（如 `rmm-` → `jmm-`）
3. 替換資料（CATEGORIES, ITEMS, HOT_ITEMS, BONUS 等）
4. 調整 grid 欄數（若項目較少可改為 `repeat(3, 1fr)`）
5. 調整標題、icon、色彩強調色（可選，或保持紫色統一）
6. 測試所有狀態: 搜尋、分類切換、hover/active、隨機骰子、A-Z 索引
7. 確認骰子隨機可正確從新資料中選取
8. 截圖確認所有 tab 畫面正常
9. 執行 `/version-bump` workflow
