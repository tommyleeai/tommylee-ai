---
description: 生成預覽圖的標準流程 — 使用 xAI Grok API 圖生圖，禁止使用 generate_image
---

// turbo-all

# 預覽圖生成標準流程

> ⚠️ **禁止使用 `generate_image` 工具生成預覽圖**（每次只能呼叫一次、無法圖生圖、效率極低）

## 工具

`tools/generate-preview.js` — 使用 xAI Grok API 將基底圖轉換為指定風格

## 前置條件

- `.env` 檔案中需要有 `XAI_API_KEY`（使用者已取得）
- 基底圖放在 `assets/previews/base/` 目錄

## 用法

### 單張生成（指定風格預設）
```bash
node tools/generate-preview.js --style "miyazaki" --output "./assets/previews/anime/miyazaki.png"
```

### 單張生成（自訂 prompt）
```bash
node tools/generate-preview.js --prompt "Transform into watercolor style" --output "./assets/previews/art/watercolor.png"
```

### 批量生成
```bash
node tools/generate-preview.js --batch --category anime
```

## 風格預設

28 位漫畫家已內建於 `STYLE_PRESETS` 物件中，key 對應漫畫家英文名（如 miyazaki, shinkai, toriyama）。

## 注意事項

1. 生成前先確認 `.env` 中 API key 有效
2. 輸出路徑要對應 `options-data.js` 中的 `image` 屬性路徑
3. 圖片格式統一為 PNG
4. 基底圖應為統一構圖的動漫女孩，確保風格轉換的一致性
