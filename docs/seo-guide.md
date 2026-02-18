# SEO 上線後操作指南

## 1️⃣ Google Search Console — 提交 Sitemap

### 步驟

1. 前往 [Google Search Console](https://search.google.com/search-console)
2. 登入你的 Google 帳號
3. 點選左側「新增資源」→ 選擇「網址前置字元」→ 輸入 `https://tommylee.ai`
4. **驗證網域所有權**（選一種）：
   - 推薦用「HTML 標記」：Google 會給你一段 `<meta name="google-site-verification" content="...">` ，加到 `index.html` 的 `<head>` 裡
   - 也可以用 DNS TXT 記錄驗證（看你 domain provider 是哪家）
5. 驗證成功後，點左側選單的 **Sitemap**
6. 輸入 `sitemap.xml` → 點「提交」
7. 完成！Google 通常 2-7 天內開始收錄

### 額外建議
- 提交後可以用「網址檢查」工具，輸入 `https://tommylee.ai/` 點「要求建立索引」，加速首次收錄
- 定期回來看「成效」報告，了解搜尋流量

---

## 2️⃣ OG 分享預覽圖（1200×630px）

目前分享預覽圖用的是 `assets/logo.png`，在 LINE / Facebook / Discord 分享時會顯示但可能尺寸不理想。

### 建議做法
1. 製作一張 **1200×630px** 的專用圖片
2. 內容建議放：
   - 標題「次元繪師 · 角色招喚の禁忌魔導書」
   - 副標題「AI 繪圖提示詞產生器」
   - 搭配一些 UI 截圖或角色預覽
   - 深色背景 + 紫色系漸層（跟網站風格統一）
3. 存為 `assets/og-image.png`
4. 更新 `index.html` 中的兩行：
   ```html
   <meta property="og:image" content="https://tommylee.ai/assets/og-image.png">
   <meta name="twitter:image" content="https://tommylee.ai/assets/og-image.png">
   ```
5. Push 後用 Facebook Sharing Debugger 刷新快取（見下方第 3 點）

---

## 3️⃣ Facebook Sharing Debugger — 驗證分享預覽

### 步驟

1. 前往 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. 輸入 `https://tommylee.ai/`
3. 點「偵錯」
4. 確認顯示的資訊：
   - **og:title** → 次元繪師 · 角色招喚の禁忌魔導書
   - **og:description** → 最強 AI 繪圖角色提示詞產生器...
   - **og:image** → 你的預覽圖
5. 如果顯示的是舊資料，點「再次抓取」清除快取

> ⚠️ 每次更新 OG 標籤後，都要回來點「再次抓取」才會生效。LINE 和 Discord 沒有手動刷新工具，通常幾小時到一天後自動更新。
