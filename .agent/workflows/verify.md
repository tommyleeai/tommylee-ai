---
description: 修改後在瀏覽器中驗證效果的標準流程
language: zh-TW
---

> 📌 提醒：本專案一律使用繁體中文溝通。

# 瀏覽器驗證 Workflow

// turbo-all

## 0. 確認伺服器狀態（不要盲目重啟！）

> ⚠️ **http-server `-c-1` 不需要重啟就能提供最新檔案**。只需確認它還在跑。

檢查 port 5050 是否有程序在監聽：
```
netstat -aon | findstr ":5050" | findstr "LISTENING"
```

- **有 LISTENING** → 伺服器已在跑，**直接跳到步驟 2**
- **沒有結果** → 需要啟動，執行步驟 1

## 1. 啟動伺服器（僅在未運行時執行）

```
cmd /c "cd /d c:\Users\tommy\OneDrive\AI Studio\new\New_Project && npx http-server -p 5050 -c-1"
```

## 2. 驗證（按優先順序）

### 方式 A：Node.js 無頭驗證（功能檢查首選）

> ⚠️ **純功能/內容驗證一律用這個**，秒回且 100% 可靠。

```
node -e "fetch('http://localhost:5050').then(r=>r.text()).then(h=>{const m=h.match(/version['\u0022]?>v([\d.]+)/);console.log('版本:',m?m[1]:'找不到');console.log('HTML長度:',h.length)})"
```

### 方式 B：Puppeteer 截圖（UI 外觀驗證首選）

> ⚠️ **需要看 UI 外觀時用這個**，100% 可靠，取代 browser_subagent。

```
node screenshot.js http://localhost:5050          # 全頁截圖
node screenshot.js http://localhost:5050 header   # 只截頂部 800px
```

截圖存在 `screenshot.png`，用 `view_file` 查看。

### 方式 C：browser_subagent（最後手段）

> ⚠️ **只在需要互動操作（點擊、輸入）時才用**，失敗一次就放棄改用方式 A/B。

## 3. 關閉伺服器（僅在必要時）

> 一般情況下**不需要關閉**，讓伺服器一直跑著即可。
> 只有換專案或 port 衝突時才需要關閉。

```
netstat -aon | findstr ":5050" | findstr "LISTENING"
taskkill /F /PID <PID>
```

## 常見問題

| 問題 | 解法 |
|------|------|
| npx 被 PowerShell 擋 | 用 `cmd /c` 包裝 |
| EADDRINUSE | 伺服器已經在跑，直接用不用重啟 |
| 看到舊版內容 | `-c-1` 已禁快取，問題在瀏覽器端，用 Puppeteer 截圖不會有快取問題 |
