# 次元繪師網域搬遷 — 2026-10-22

- 應用正式網址： https://draw.tommylee.ai/
- Cloudflare Pages 專案：tommylee-ai；GitHub：tommyleeai/tommylee-ai，main 分支自動部署。
- 保留原 Firebase 專案 tommylee-ai 與既有使用者/收藏/分享資料。
- Firebase Authentication 授權網域及 Google OAuth JavaScript origin 須包含 draw.tommylee.ai。
- 搜尋引擎 canonical、Open Graph、結構化資料、robots 與 sitemap 改為 draw 子網域。
- tommylee.ai 首頁由獨立 Worker tommylee-studio-home 顯示樓頂工作室 Logo 影片。
- 主網域 /?s=... 與 /index.html?s=... 轉到 draw 並保留查詢字串；其他既有路徑仍交由原 Pages 處理。
- 瀏覽器本機設定及 Gemini Key 依 origin 隔離，不自動搬移；雲端收藏保留，換網址後可能需要重新登入。
- 首頁來源保存在相鄰「樓頂工作室首頁」專案；這兩個專案可獨立更新。

狀態：子網域已提交啟用；首頁 Worker 預覽已部署並確認 960×960 / 10.04 秒影片播放。正式路由與登入驗證待完成。
