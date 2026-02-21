# 🔮 Magic Modal 統一設計規範 v1.1

> 本文件整理自所有現有 Magic Modal（種族/職業/表情/姿勢/服裝/頭飾/手持物/髮型/身材/場景/動漫風格/藝術風格/藝術家）的設計模式，
> 作為後續新增 Tab 內 section 的標準參考。

---

## 一、三大架構模式

目前所有 Magic Modal 可歸類為 **三種主架構**，新功能應從中選擇最適合的模式：

### A 型：分類 Grid + Bonus Traits（選一個 + 可選加分特徵）

| 代表 | 檔案 | CSS 前綴 |
|------|------|---------|
| 種族 | `race-magic-modal.js` | `rmm-` |
| 職業 | `job-magic-modal.js` | `jmm-` |
| 服裝 | `outfit-magic-modal.js` | `cmm-` |
| 頭飾 | `headwear-magic-modal.js` | `hwmm-` |
| 手持物 | `hand-items-magic-modal.js` | `himm-` |

**結構**：
```
Header（標題 + 骰子隨機 + 搜尋）
 ├── 分類 Tabs（全部/最近/熱門/分類1/分類2...）
 ├── Grid（4欄 chip，icon + 中文 + 英文）
 ├── A-Z 索引（右側垂直）
 ├── Bonus Panel（選項後出現的加分特徵金色 tag）
 └── Footer（狀態文字 + 取消/套用按鈕）
```

**特點**：
- 有 🎲 骰子隨機選取（含動畫 + 音效）
- 有最近使用記錄（localStorage 最多 10 筆）
- 有熱門 Top 20（🔥 badge）
- 選中後可附加 Bonus Traits（加分特徵）
- 選項支援 **toggle**：再點一次取消

---

### B 型：Grid + 推桿控制 + 特效勾選

| 代表 | 檔案 | CSS 前綴 |
|------|------|---------|
| 表情 | `expression-magic-modal.js` | `emm-` |
| 姿勢 | `pose-magic-modal.js` | `pmm-` |

**結構**：
```
Header（標題 + 重設）
 ├── 分類 Tabs（分類 icon + 文字）
 ├── 搜尋 bar
 ├── Grid（2-3欄 chip，中文 + 英文）
 ├── 控制區（推桿/重心/視線/特效勾選）
 ├── 預覽區（即時 prompt 預覽）
 └── Footer（狀態文字 + 取消/套用按鈕）
```

**B 型變體差異**：

| 差異點 | 表情 Modal | 姿勢 Modal |
|--------|-----------|-----------|
| 控制區 | 強度推桿（7級）+ 8個特效勾選 | 重心位置 chip + 視線方向 chip |
| 特效 | `Set<effectId>`，多選 | 重心和視線各 **單選（可為空）** |
| 預覽 | prompt 文字 + 權重指示器 | prompt tag |

---

### C 型：純推桿控制

| 代表 | 檔案 | CSS 前綴 |
|------|------|---------|
| 髮型 | `hair-magic-modal.js` | `hmm-` |
| 身材 | `body-magic-modal.js` | `bmm-` |

**結構**：
```
Header（標題）
 ├── 分類 Tabs / 預設按鈕
 ├── Grid（chip 選擇） + 推桿控制（長度/高度/數量/部位...）
 ├── 幻想橫幅（推桿超過閾值時出現）
 └── Footer（取消/套用按鈕）
```

---

## 二、統一 UI 元件規範

### 2.1 選項 Chip

所有 Modal 共用同一設計語言的 chip：

```css
/* 正常態 */
background: rgba(30, 41, 59, 0.4~0.6);
border: 1px solid rgba(148, 163, 184, 0.1);
border-radius: 8px;
color: #e2e8f0;

/* Hover */
border-color: rgba(168, 85, 247, 0.5);
transform: translateY(-1px);
color: #c084fc;

/* Selected / Active */
background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.2));
border-color: #a855f7;
color: #fff;
box-shadow: 0 0 10px rgba(168,85,247,0.3);
```

**互動規則**：
- ✅ 點選 = 選取（發光）
- ✅ 再點同一個 = **取消選取**（toggle off）
- ✅ 點另一個 = 切換到新選項

### 2.2 分類 Tabs

```css
/* Tab 三態同 magic-modal-style.md 定義 */
正常: background rgba(30,41,59,.4), color #94a3b8
Hover: color #c084fc, translateY(-2px), border-bottom 紫
Active: gradient 背景, color #f3e8ff, border-bottom 3px #a855f7
```

**Tab 統一四層結構**（v1.1 起所有 Modal 必須使用）：
```html
<button class="xxx-tab">
    <span class="xxx-tab-icon">🎭</span>     <!-- 第 1 層：Emoji icon -->
    <span class="xxx-tab-zh">分類名</span>    <!-- 第 2 層：中文標籤 -->
    <span class="xxx-tab-en">English</span>   <!-- 第 3 層：英文標籤 -->
    <span class="xxx-tab-count">12</span>     <!-- 第 4 層：項目數量 -->
</button>
```

**Tab 四層 CSS 統一樣式**：
```css
.xxx-tab-icon   { font-size: .95rem; transition: transform .25s ease, filter .25s ease }
.xxx-tab-zh     { font-size: .65rem; font-weight: 500 }
.xxx-tab-en     { font-size: .55rem; color: #64748b }
.xxx-tab-count  { font-size: .55rem; color: #64748b; transition: color .25s ease }
/* Active 狀態 */
.xxx-tab.active .xxx-tab-icon  { transform: scale(1.15); filter: drop-shadow(0 0 6px rgba(主題色, .6)) }
.xxx-tab.active .xxx-tab-count { color: 主題淺色; font-weight: 600 }
```

### 2.3 搜尋 Bar

```css
width: 100%;
padding: 8px 12px;
background: rgba(255,255,255,0.06);
border: 1px solid rgba(255,255,255,0.12);
border-radius: 8px;
color: #e2e8f0;
font-size: 13px;
/* focus 時 border-color 變為主題色 */
```

- 支援**中文 + 英文**即時過濾
- 過濾邏輯：`label.includes(query) || en.toLowerCase().includes(query)`

### 2.4 控制區 Chip（重心/視線/特效等附加選項）

```css
/* 正常態 */
background: rgba(30, 41, 59, 0.5);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 20px;
padding: 6px 14px;
color: #94a3b8;

/* Active（選中時） */
background: rgba(168, 85, 247, 0.25);
border-color: #a855f7;
color: #e2e8f0;
box-shadow: 0 0 8px rgba(168, 85, 247, 0.3);
```

**互動規則**：
- 預設為 **不選擇**（null），不是預選某個值
- 點擊 = 選取，再點同一個 = 取消（回到 null）
- 用於「可選可不選」的輔助控制

### 2.5 Footer

```html
<div class="xxx-footer">
    <div class="xxx-status">已選：**項目名**</div>
    <div class="xxx-actions">
        <button class="xxx-btn xxx-btn-cancel">❌ 取消</button>
        <button class="xxx-btn xxx-btn-apply">✨ 套用魔法</button>
    </div>
</div>
```

---

## 三、狀態管理規範

### 3.1 State 儲存格式

所有 Modal 的進階狀態都統一存在 `state.{category}Advanced`：

| Modal | State Key | 內容 |
|-------|-----------|------|
| 種族 | `state.raceAdvanced` | `{ selectedRace, bonusTraits[], bonusTraitsZh[] }` |
| 職業 | `state.jobAdvanced` | `{ selectedJob, bonusTraits[], bonusTraitsZh[] }` |
| 服裝 | `state.outfitAdvanced` | `{ selectedOutfit, bonusTraits[], bonusTraitsZh[] }` |
| 頭飾 | `state.headwearAdvanced` | `{ selectedHeadwear, bonusTraits[], bonusTraitsZh[] }` |
| 手持物 | `state.handItemsAdvanced` | `{ selectedHandItem, bonusTraits[], bonusTraitsZh[] }` |
| 表情 | `state.expressionAdvanced` | `{ expression, intensity, effects[] }` |
| 姿勢 | `state.poseAdvanced` | `{ pose, gravity, gaze }` |
| 髮型 | `state.hairAdvanced` | `{ style, length, ponytail, ... }` |
| 身材 | `state.bodyAdvanced` | `{ bodyType, params{} }` |

### 3.2 localStorage 持久化

在 `loadState()` 中讀取、在 `saveState()` 中寫入。
**注意**：所有 `xxxAdvanced` 都必須在 `loadState()` 中有對應的讀取行，否則頁面重載後橫幅會消失。

```javascript
// loadState() 範例
state.expressionAdvanced = parsed.expressionAdvanced || undefined;
state.poseAdvanced = parsed.poseAdvanced || undefined;
// ⚠ 千萬不能漏掉，否則重載後 banner 消失
```

### 3.3 清除邏輯

```javascript
// 清除按鈕
delete state.xxxAdvanced;
renderTabContent();
generatePrompt();
saveState();
```

---

## 四、紫色橫幅（Banner）規範

當 Magic 啟用時，在基礎 grid 上方顯示紫色摘要橫幅：

### 4.1 HTML 結構

```javascript
const summaryBar = document.createElement('div');
summaryBar.className = 'body-advanced-summary';  // ← 統一 class

const summaryText = document.createElement('span');
summaryText.innerHTML = `🔮 XXX魔法啟用中：${detailText}`;

const editBtn = document.createElement('button');
editBtn.className = 'body-summary-action';       // ← 統一 class
editBtn.textContent = '編輯';

const clearBtn = document.createElement('button');
clearBtn.className = 'body-summary-action clear'; // ← 統一 class
clearBtn.textContent = '清除';
```

### 4.2 橫幅文字格式

| Modal | 橫幅格式 |
|-------|---------|
| 種族/職業 | `🔮 種族魔法啟用中：精靈 Elf — ⭐ 尖耳朵、✨ 發光` |
| 表情 | `🔮 表情魔法啟用中：開懷大笑 (標準) — 💧 淚水、😰 汗珠` |
| 姿勢 | `🔮 姿勢魔法啟用中：叉腰站立 ⚖️ 後仰 👁️ 斜視` |
| 服裝/頭飾/手持物 | `🔮 服裝魔法啟用中：旗袍 — ⭐ 特徵1、特徵2` |

**規則**：
- 列出**具體名稱**，不用 `+N特效` 這種數量摘要
- 用 `—`（em dash）分隔主項目和附加特徵
- 用 `、`（頓號）分隔多個特徵

### 4.3 Grid 灰化

Magic 橫幅啟用時，底下的基礎 grid 加上 disabled 效果：

```javascript
const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
if (tagGrid) tagGrid.classList.add('body-section-disabled');
```

```css
.body-section-disabled {
    pointer-events: none;
    opacity: 0.35;
    filter: grayscale(0.3);
}
```

---

## 五、色彩系統

### 主色（紫色系 — 全域魔法主題色）
| 色碼 | 用途 |
|------|------|
| `#a855f7` | 主色：選中邊框、active 底線、banner |
| `#7c3aed` | 深主色：漸層起點、按鈕 |
| `#c084fc` | 淺主色：hover 文字 |
| `#f3e8ff` | 超淺：active tab 文字 |

### 強調色
| 色碼 | 用途 |
|------|------|
| `#fbbf24` | 金色：Bonus Traits、熱門 |
| `#38bdf8` | 藍色：最近使用 |
| `#22d3ee` | 青色：姿勢 Modal 主題色 |

### 深色主題背景
| 元素 | 色值 |
|------|------|
| 容器背景 | `linear-gradient(135deg, rgba(15,23,42,.97), rgba(30,41,59,.97))` |
| 元件背景 | `rgba(30, 41, 59, .4~.6)` |
| 遮罩 | `rgba(0, 0, 0, .6)` |
| 邊框 | `rgba(148, 163, 184, .1~.15)` |

### 5.4 全站顏色等級系統（Color Tier System）

> [!IMPORTANT]
> 顏色等級代表稀有度/重要度，所有 UI 元素必須遵循此規則。禁止用高等級顏色標示低重要度元素。

| 等級 | 顏色 | 用途 |
|------|------|------|
| ★☆☆☆☆☆ | **淺灰色** `#94a3b8` | 未選中選項、次要文字、disabled 狀態 |
| ★★☆☆☆☆ | **白色** `#e2e8f0` | 已選中的基礎選項、正常文字 |
| ★★★☆☆☆ | **紫色** `#a855f7` | 進階功能、Active 狀態、魔法主題 |
| ★★★★☆☆ | **金色** `#fbbf24` | 高級/稀有項目（如高級魔法師按鈕、Bonus Traits） |
| ★★★★★☆ | **金色流轉動畫** | 傳說級項目（`@keyframes` 金色漸層位移） |
| ★★★★★★ | **彩色流轉動畫** | 神話級項目（`@keyframes` 彩虹漸層位移） |

---

## 六、動畫規範

### 通用 Transition
```css
transition: all 0.2s ease;
```

### Modal 入場
- Overlay: `fadeIn 0.3s`
- Container: `scale(0.5→1)` + `cubic-bezier(.34, 1.56, .64, 1)` 0.5s
- 標題: `blur(8px→0)` 延遲 0.3s

### 互動回饋
- Hover: `translateY(-1px~-2px)` + 邊框高亮
- 點選: 紫色 border + box-shadow
- 關閉: 反向 `fadeIn 0.3s reverse`

### 粒子背景
- 浮動光點：25-40 個，隨機位置/大小/延遲/色彩
- 流星（A 型 Modal 專屬）：3-4 條，斜向劃過

---

## 七、音效規範

| 事件 | 音效類型 | 實作方式 |
|------|---------|---------|
| Modal 開啟 | 上升琶音 | Web Audio API oscillator |
| 選項點擊 | 清脆叮聲 | `sfx.playClick()` |
| 套用魔法 | 施法音效（上升琶音 + 星光） | 自定義 oscillator 序列 |
| 骰子滾動 | 低頻隆隆 + 碰撞 | sawtooth + square burst |

---

## 八、模組化結構

### 檔案命名
```
modules/{feature}-magic-modal.js  ← JS 邏輯
data/{feature}-magic-data.js      ← 資料定義
styles/{feature}-magic-modal.css  ← CSS 樣式
```

### IIFE 模組模板
```javascript
window.PromptGen = window.PromptGen || {};
window.PromptGen.{Feature}MagicModal = (function () {
    let state, sfx, DATA, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        DATA = deps.DATA;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function open{Feature}MagicModal() {
        // 1. 移除舊 modal
        // 2. 讀取 saved state
        // 3. 建立 overlay DOM
        // 4. 粒子效果 + 音效
        // 5. 渲染 grid
        // 6. 綁定事件（tab/搜尋/選擇/控制/套用/取消/ESC/外部點擊）
    }

    return { setup, open{Feature}MagicModal };
})();
```

### 資料定義模板
```javascript
window.PromptGen = window.PromptGen || {};
window.PromptGen.{Feature}MagicData = {
    TABS: [
        { id: 'all', icon: '🌐', label: '全部', en: 'All' },
        { id: 'recent', icon: '📋', label: '最近', en: 'Recent' },
        { id: 'hot', icon: '🔥', label: '熱門', en: 'Hot' },
        { id: 'cat1', icon: '🎨', label: '分類1', en: 'Category1' },
        // ...
    ],
    ITEMS: [
        { id: 'item1', label: '中文名', en: 'English', value: 'prompt_value', category: 'cat1' },
        // ...
    ],
    // A 型特有：
    CATEGORIES: [...],
    HOT_ITEMS: [...],
    BONUS_TRAITS: { cat1: [{icon, zh, en}], ... },
    // B 型特有：
    INTENSITY: [...],    // 強度等級
    EFFECTS: [...],      // 特效選項
    GRAVITY: [...],      // 控制選項
    GAZE: [...],         // 控制選項
};
```

---

## 九、CSS 前綴命名規範

| Modal | 前綴 | 說明 |
|-------|------|------|
| 種族 | `rmm-` | Race Magic Modal |
| 職業 | `jmm-` | Job Magic Modal |
| 服裝 | `cmm-` | Costume Magic Modal |
| 頭飾 | `hmm-` | Headwear Magic Modal |
| 手持物 | `him-` | Hand Items Magic Modal |
| 表情 | `emm-` | Expression Magic Modal |
| 姿勢 | `pmm-` | Pose Magic Modal |
| 髮型 | `hmm-` | Hair Magic Modal |
| 身材 | `bmm-` | Body Magic Modal |
| 場景 | `scmm-` | Scene Magic Modal |
| 動漫/藝術/藝術家 | `smm-` | Style Magic Modal（三者共用） |

---

## 十、新建 Section 的 Checklist

1. ☐ 決定使用 **A / B / C 型**架構
2. ☐ 建立 `data/{feature}-magic-data.js`（定義 TABS、ITEMS 等）
3. ☐ 建立 `modules/{feature}-magic-modal.js`（IIFE 模組）
4. ☐ 建立 `styles/{feature}-magic-modal.css`（複製模板 + 換前綴）
5. ☐ 在 `index.html` 加入 CSS `<link>` 和 JS `<script>`（含 `?v=x.x`）
6. ☐ 在 `script.js` 中：
   - `setup()` 注入依賴
   - 渲染 section 時加入「高級魔法」按鈕
   - 橫幅邏輯（`body-advanced-summary`）
   - Grid 灰化邏輯（`body-section-disabled`）
   - `loadState()` 讀取 `state.xxxAdvanced`
   - `saveState()` 寫入 `state.xxxAdvanced`
   - `generatePrompt()` 加入 prompt 邏輯
7. ☐ 測試：搜尋、Tab 切換、選取 toggle、套用、清除、重載持久化
8. ☐ CSS 修改用 `/* === 功能名 START === */` 包裹
9. ☐ 執行 `/version-bump`
