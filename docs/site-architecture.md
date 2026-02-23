# 🏗️ 網站分類架構總覽

> 本文件記錄 AI Prompt Generator 的完整分類架構，包含所有分頁、區塊、基礎選項、高級魔法 Modal 及其子分類。

---

## 一、主分頁 (TABS)

| Tab ID | 中文名 | 英文名 | Icon |
|--------|--------|--------|------|
| `base` | 基本 | Basic | `fa-user` |
| `appearance` | 外觀 | Appearance | `fa-shirt` |
| `action` | 動作 | Action | `fa-bolt` |
| `style` | 風格 | Style | `fa-palette` |
| `environment` | 環境 | Environment | `fa-cloud-sun` |
| `camera` | 攝影 | Camera | `fa-camera` |

---

## 二、各分頁區塊 (SECTIONS)

### 🧑 基本 (`base`)

| Section ID | 中文名 | 類型 | 基礎選項數 | 高級魔法資料檔 | advancedKey |
|-----------|--------|------|-----------|--------------|-------------|
| `genderAge` | 基本設定 | 性別/年齡 | — | — | — |
| `race` | 種族 | 分頁格子 (20/頁) | ~233 | `race-magic-data.js` | `raceAdvanced` |
| `job` | 職業 | 分頁格子 (30/頁) | ~258 | `job-magic-data.js` | `jobAdvanced` |
| `hairstyle` | 髮型 | 分頁格子 (30/頁) | 性別相依 | `hair-magic-data.js` | `hairAdvanced` |
| `bodyType` | 身材 | 分頁格子 (40/頁) | 性別相依 | `body-magic-data.js` | `bodyAdvanced` |

### 👗 外觀 (`appearance`)

| Section ID | 中文名 | 類型 | 基礎選項數 | 高級魔法資料檔 | advancedKey |
|-----------|--------|------|-----------|--------------|-------------|
| `hairColor` | 髮色 | 色盤 | — | — | — |
| `eyeColorLeft` | 左眼色 | 色盤 | — | — | — |
| `eyeColorRight` | 右眼色 | 色盤 | — | — | — |
| `outfit` | 服飾 | 分頁格子 (31/頁) | — | `outfit-magic-data.js` | `outfitAdvanced` |
| `headwear` | 頭飾 | 分頁格子 (30/頁) | — | `headwear-magic-data.js` | `headwearAdvanced` |
| `handItems` | 手持物品 | 分頁格子 (30/頁) | — | `hand-items-magic-data.js` | `handItemsAdvanced` |

### ⚡ 動作 (`action`)

| Section ID | 中文名 | 類型 | 基礎選項數 | 高級魔法資料檔 | advancedKey |
|-----------|--------|------|-----------|--------------|-------------|
| `expression` | 表情 | 分頁格子 | — | `expression-magic-data.js` | `expressionAdvanced` |
| `mood` | 情緒 | 分頁格子 (28/頁) | — | — | — |
| `pose` | 動作姿勢 | 分頁格子 (30/頁) | — | `pose-magic-data.js` | `poseAdvanced` |

### 🎨 風格 (`style`)

| Section ID | 中文名 | 類型 | 基礎選項數 | 高級魔法資料檔 | advancedKey |
|-----------|--------|------|-----------|--------------|-------------|
| `animeStyle` | 動漫風格 | 分頁格子 (28/頁) | — | `anime-style-magic-data.js` | `animeStyleAdvanced` |
| `artStyle` | 藝術風格 | 分頁格子 (28/頁) | — | `art-style-magic-data.js` | `artStyleAdvanced` |
| `artist` | 藝術家 | 分頁格子 (15/頁) | — | `artist-magic-data.js` | `artistAdvanced` |
| `quality` | 品質 | 多選 tag | — | — | — |

### 🌤️ 環境 (`environment`)

| Section ID | 中文名 | 類型 | 基礎選項數 | 高級魔法資料檔 | advancedKey |
|-----------|--------|------|-----------|--------------|-------------|
| `scene` | 場景 | 分頁格子 (26/頁) | — | `scene-magic-data.js` | `sceneAdvanced` |
| `atmosphere` | 時間氛圍 | tag 選擇 | — | `atmosphere-magic-data.js` | `atmosphereAdvanced` |
| `lighting` | 光影 | tag 選擇 | — | — | — |

### 📷 攝影 (`camera`)

| Section ID | 中文名 | 類型 | 基礎選項數 | 高級魔法資料檔 | advancedKey |
|-----------|--------|------|-----------|--------------|-------------|
| `cameraAngle` | 角度 | 分頁格子 (20/頁) | — | `camera-magic-data.js` | `cameraAdvanced` |
| `shotSize` | 鏡頭 | tag 選擇 | — | ↑ 由運鏡魔法覆蓋 | — |
| `focalLength` | 焦段 | tag 選擇 | — | ↑ 由運鏡魔法覆蓋 | — |
| `aperture` | 光圈 | tag 選擇 | — | ↑ 由運鏡魔法覆蓋 | — |
| `lensEffect` | 鏡頭效果 | 分頁格子 (20/頁) | — | ↑ 由運鏡魔法覆蓋 | — |

> **📌 注意**：攝影頁的 `shotSize`、`focalLength`、`aperture`、`lensEffect` 四個子區塊，在 `cameraAdvanced` 啟用時會被自動覆蓋並灰化。

---

## 三、高級魔法 Modal (Magic Modal) 分類架構

每個高級魔法 Modal 有自己的分類 Tab 系統。資料檔位於 `data/` 目錄。

### 種族魔法 (`race-magic-data.js`)
使用 `CATEGORIES` + `autoClassify` 結構。分類 Tab：
- 全部 / 最近 / 熱門 / 人類 / 精靈 / 獸耳 / 日本妖怪 / 神話聖域 / 元素精靈 / 不死族 / 龍族 / 惡魔系 / 天族神族 / 植物自然 / 水棲海洋 / 混血亞種 / 科幻機械 / 異形變異

### 職業魔法 (`job-magic-data.js`)
使用 `CATEGORIES` + `autoClassify` 結構。分類 Tab：
- 全部 / 最近 / 熱門 / 日常 / 演藝 / 戰鬥 / 魔法 / 暗黑 / 王族 / 服務 / 技藝 / 冒險

### 髮型魔法 (`hair-magic-data.js`)
使用 `CATEGORIES` 結構。特殊：含三軸滑桿（髮長/馬尾高度/馬尾數量）。

### 體型魔法 (`body-magic-data.js`)
使用三軸滑桿（胸圍/體格/身高），無分類 Tab。

### 服飾魔法 (`outfit-magic-data.js`)
使用 `CATEGORIES` + `autoClassify` 結構。

### 頭飾魔法 (`headwear-magic-data.js`)
使用 `CATEGORIES` + `autoClassify` 結構。

### 手持物品魔法 (`hand-items-magic-data.js`)
使用 `CATEGORIES` + `autoClassify` 結構。

### 表情魔法 (`expression-magic-data.js`)
使用 `category` 欄位。分類 Tab：
- joy / shy / surprise / cool / sadness / anger / battle / comedy / mad

### 姿勢魔法 (`pose-magic-data.js`)
使用 `category` 欄位。分類 Tab：
- standing / sitting / cute / dominant / combat / emotional / camera / interact / movement

### 動漫風格魔法 (`anime-style-magic-data.js`)
使用 `category` 欄位。分類 Tab：
- all / shoujo / shonen / slice / fantasy / scifi / mecha / dark / retro / chibi / game / studio

### 藝術風格魔法 (`art-style-magic-data.js`)
使用 `category` 欄位。分類 Tab：
- digital / photo / print / medium / technique / movement / theme

### 藝術家魔法 (`artist-magic-data.js`)
使用 `category` 欄位。分類 Tab：
- manga / illustrator / anime_dir / digital / concept / modern / classic

### 場景魔法 (`scene-magic-data.js`)
使用 `category` 欄位。分類 Tab：
- daily / nature / urban / fantasy / scifi / classic / dark / abstract / special

### 運鏡魔法 (`camera-magic-data.js`)
使用 `category` 欄位。分類 Tab：
- distance / vAngle / hAngle / movement / lens / dof / composition

### 時間氛圍魔法 (`atmosphere-magic-data.js`)
使用 `category` 欄位。分類 Tab：
- light / rain / storm / wind / mist / temperature / seasonal / celestial / fantasy

---

## 四、其他系統

### 衝突規則 (`CONFLICT_RULES`)
定義於 `options-data.js`，規則類型：
- **種族 × 職業** (A)：亡靈 vs 神聖、惡魔 vs 神聖、非實體 vs 物理職業、水棲 vs 陸地等
- **種族 × 服裝** (B)：幽靈 vs 盔甲、史萊姆 vs 服裝、人魚 vs 褲裝等
- **職業 × 服裝** (C)：騎士 vs 比基尼、忍者 vs 板甲等
- **性別相關** (D)：男性 vs 女性限定服裝/種族/職業

### 維度系統 (`dimension`)
- `anime` — 二次元
- `realistic` — 寫實
- `fantasy` — 幻想混合
- `2.5d` — 2.5D
- `fate` — 命運之輪（隨機）

---

## 五、檔案架構對照

```
data/
├─ options-data.js          # 基礎選項定義 + TAB_SECTIONS + 衝突規則
├─ race-magic-data.js       # 種族魔法
├─ job-magic-data.js        # 職業魔法
├─ hair-magic-data.js       # 髮型魔法
├─ body-magic-data.js       # 體型魔法
├─ outfit-magic-data.js     # 服飾魔法
├─ headwear-magic-data.js   # 頭飾魔法
├─ hand-items-magic-data.js # 手持物品魔法
├─ expression-magic-data.js # 表情魔法
├─ pose-magic-data.js       # 姿勢魔法
├─ anime-style-magic-data.js# 動漫風格魔法
├─ art-style-magic-data.js  # 藝術風格魔法
├─ artist-magic-data.js     # 藝術家魔法
├─ scene-magic-data.js      # 場景魔法
├─ camera-magic-data.js     # 運鏡魔法
└─ atmosphere-magic-data.js # 時間氛圍魔法
```

---

*最後更新：2026-02-23*
