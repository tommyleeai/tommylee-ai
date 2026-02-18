// ============================================
// AI Prompt Generator — 版本歷史資料
// 從 script.js 提取，掛載至 window.PromptGen.Changelog
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.Changelog = (function () {
    // Changelog Data
    const changelog = [
        {
            version: "v6.6",
            date: "2026-02-18",
            changes: [
                "✂️ 髮型高級魔法 Modal：76 種髮型 × 10 大分類（全部/最近/熱門/馬尾/包頭/辮子/瀏海/流行/龐克/動漫）",
                "⚙️ 混合渲染模式：Chip Grid + 推桿（頭髮長度 7 級、馬尾高度 5 級、馬尾數量 4 級）",
                "🔮 幻想級別推桿：拖地長髮、多馬尾等超現實描述 + 紫色幻想橫幅",
                "⚡ 11 組快速預設：學生妹/偶像/公主/女戰士/哥德/可愛/韓系 等一鍵套用",
                "🛡️ 髮型衝突規則：光頭不能搭配瀏海/馬尾/包頭/辮子",
                "🎲 髮型隨機骰子：隨機選取髮型 + 長度 + 旋轉動畫",
                "📋 最近使用記錄（localStorage 最多 10 筆）",
                "🔍 搜尋 + A-Z 索引：支援中英文即時過濾"
            ]
        },
        {
            version: "v6.5",
            date: "2026-02-18",
            changes: [
                "🔮 職業高級魔法 Modal：250 個職業 × 9 大分類（日常/演藝/戰鬥/魔法/黑暗/王族/服務/技藝/冒險）",
                "🔥 職業熱門 Tab：Top 20 人氣職業 + 火焰 badge",
                "📋 職業最近使用記錄（localStorage 最多 10 筆）",
                "🎲 職業隨機骰子選取 + 旋轉動畫 + 音效",
                "✨ 每個分類專屬加分特徵（Bonus Traits），選取後自動附加 prompt",
                "🔍 職業搜尋功能：支援中英文即時過濾",
                "📊 職業 section 升級為分頁式 Grid + 已選 badge"
            ]
        },
        {
            version: "v6.4",
            date: "2026-02-18",
            changes: [
                "🎲 骰子隨機選取功能：emoji 掉落 + 彈跳回彈動畫 + Web Audio 音效",
                "📂 分類 Tab 視覺大幅強化：Active 3px 紫色底線 + 漸層背景 + icon 光暈",
                "🎯 Tab Hover 效果：上浮 + 邊框高亮 + 陰影",
                "📋 新增 /magic-modal-style workflow：種族大全設計規範可複用於職業、服飾等",
                "🔧 骰子圖片改為 emoji 🎲，修正尺寸與動畫問題"
            ]
        },
        {
            version: "v6.3.1",
            date: "2026-02-18",
            changes: [
                "🔮 種族高級魔法 Modal Demo：10 大分類 tabs + 4 欄 grid + A-Z 索引 + 搜尋框",
                "👻 新增「亡靈 Undead」分類（吸血鬼、幽靈、殭屍、巫妖等 12 種）",
                "🎌 新增「妖怪 Yokai」分類（鬼、天狗、河童、雪女等 14 種）",
                "🔥 熱門 Tab 顯示 Top 20 + chip 火焰 badge",
                "🎲 隨機選取骰子按鈕 + 旋轉動畫",
                "📋 最近使用 Tab（localStorage 記錄最多 10 筆）",
                "📐 Modal 固定高度 68vh，切換分類不跳動",
                "🔄 種族 chip 點擊支援 toggle 取消選取"
            ]
        },
        {
            version: "v6.3",
            date: "2026-02-18",
            changes: [
                "🎯 種族選擇分頁系統：3×10 grid + 分頁導航（< 1/7 >）",
                "🏷️ 已選種族在標題旁顯示 badge（✓ 種族名 ✕ 一鍵取消）",
                "🔮 種族 & 身材區塊「高級魔法專用」按鈕與「自訂」按鈕靠右群組排列",
                "🌐 種族分頁 UI 完整支援中英文切換"
            ]
        },
        {
            version: "v6.2",
            date: "2026-02-18",
            changes: [
                "📦 Version bump：整合 v6.1 ~ v6.1.3 所有變更",
                "🔊 衝突警報音效時長減半（3秒→1.5秒）"
            ]
        },
        {
            version: "v6.1.3",
            date: "2026-02-17",
            changes: [
                "😈 新增 20 條惡魔系 vs 神聖職業衝突規則（惡魔/大惡魔/魅魔/小惡魔/夢魔/魔王/墮天使/夜叉/羅剎）",
                "📝 YAML 輸出格式新增衝突解決邏輯（dual/merge/ignore）",
                "💡 衝突選項改為 ⓘ hover-to-reveal 提示：hover 圖示才顯示說明文字",
                "🐛 修復衝突偵測 TDZ crash（改用完整模組路徑呼叫）"
            ]
        },
        {
            version: "v6.1.2",
            date: "2026-02-17",
            changes: [
                "🎨 CSS 外移：衝突偵測與 Body Magic Modal 的內嵌 CSS 移至 styles.css",
                "📁 減少 script.js 內嵌樣式，提升維護性"
            ]
        },
        {
            version: "v6.1",
            date: "2026-02-17",
            changes: [
                "⚙️ 程式碼模組化拆分：script.js 從 3906 行精簡至 1481 行（-62%）",
                "📦 獨立模組：conflict-system.js、body-magic-modal.js、sound-manager.js",
                "📂 資料分離：options-data.js、body-magic-data.js、changelog-data.js",
                "🔧 所有模組掛載至 window.PromptGen 命名空間"
            ]
        },
        {
            version: "v6.0",
            date: "2026-02-17",
            changes: [
                "⚙️ 設定面板新增「衝突偵測」區塊：啟用/停用 toggle + 自動處理方式顯示 + 重置按鈕",
                "🔮 設定面板新增「身材控制」區塊：顯示目前套用狀態 + 重置按鈕",
                "🐛 修復 Body Magic「套用魔法」後資料未傳至 Generated Prompt 的問題",
                "🐛 修復 YAML 格式下 bodyAdvanced 資料遺失問題",
                "🐛 修復負向提示詞(Negative Prompt)未包含 Body Magic 反向咒語的問題"
            ]
        },
        {
            version: "v5.9",
            date: "2026-02-17",
            changes: [
                "⚡ 衝突規則大幅擴展：32 條 → 130+ 條，涵蓋 race×job、race×outfit、job×outfit、gender 四大類",
                "👗 新增種族×服裝衝突（幽靈/史萊姆/人魚/妖精/半人馬等 vs 各種服裝）",
                "⚔️ 新增職業×服裝衝突（騎士×比基尼、忍者×重甲、修女×兔裝）",
                "⚧️ 新增性別相關衝突提醒（男×兔女郎、男×花魁、女×執事）",
                "🔧 checkAllConflicts 支援 outfit/bodyType/hairstyle 類別 + gender-aware 邏輯",
                "🔧 selectOption 觸發條件擴展到 5 個類別（race/job/outfit/bodyType/hairstyle）",
                "🔧 gender toggle 切換時也會觸發衝突檢查"
            ]
        },
        {
            version: "v5.8",
            date: "2026-02-17",
            changes: [
                "🛡️ 還原衝突偵測系統：種族×職業衝突警告、動態 modal、三選一解決方案",
                "🎂 還原進階年齡描述詞系統：1-100 歲男女專屬物理描述",
                "🔊 衝突警報音效（爆炸+金屬碰撞+警報）+ 畫面震動/閃爍",
                "💾 修復 loadState 正確恢復衝突系統設定",
                "🐛 加入 try-catch 安全防護與 console 診斷訊息"
            ]
        },
        {
            version: "v5.0",
            date: "2026-02-16",
            changes: [
                "🎉 重大改版：全新分頁式 UI（基本/外觀/動作/風格/環境/攝影）",
                "所有選項改為單選模式",
                "每個區塊新增「自訂」按鈕，可輸入自定義值",
                "新增性別切換（男/女髮型自動切換）",
                "新增髮色色票選擇器",
                "新增眼色圓形選擇器（支持異色瞳）",
                "新增種族、職業、場景、天氣等大量選項",
                "新增鏡頭效果（散景、魚眼、霧化等）",
                "提示詞生成邏輯全面更新",
                "保留：音效系統、圖片預覽、設定面板"
            ]
        },
        {
            version: "v4.92",
            date: "2026-02-16 00:13",
            changes: [
                "修正生成結果欄位寬度問題：鎖定寬度、長文字自動換行",
                "移除生成結果捲動條，內容隨行數自然延伸",
                "修正選取動漫風格等長字串選項時版面跳動問題"
            ]
        },
        {
            version: "v4.91",
            date: "2026-02-15 22:10",
            changes: [
                "實作互動式懸停預覽系統 (Hover Previews)",
                "新增預覽容器樣式與動畫效果",
                "滑鼠移開後自動恢復已選取項目之預覽"
            ]
        },
        {
            version: "v4.90",
            date: "2026-02-15 21:08",
            changes: [
                "應用程式圖標 (Logo) 放大兩倍",
                "版面視覺微調"
            ]
        },
        {
            version: "v4.89",
            date: "2026-02-15 21:05",
            changes: [
                "版本歷史紀錄新增時間顯示 (HH:MM)",
                "優化歷史紀錄顯示格式"
            ]
        },
        {
            version: "v4.88",
            date: "2026-02-15 21:00",
            changes: [
                "新增版本歷史紀錄功能 (Version History)",
                "新增頂部歷史紀錄按鈕"
            ]
        },
        {
            version: "v4.87",
            date: "2026-02-15 18:45",
            changes: [
                "設定面板介面緊湊化 (Compact Layout)",
                "優化輸入框與按鈕間距"
            ]
        },
        {
            version: "v4.86",
            date: "2026-02-15 18:40",
            changes: [
                "修正頂部按鈕圖示繼承透明文字的問題"
            ]
        },
        {
            version: "v4.85",
            date: "2026-02-15 18:35",
            changes: [
                "修正滑鼠懸停時圖示消失的問題"
            ]
        },
        {
            version: "v4.84",
            date: "2026-02-15 18:30",
            changes: [
                "修正設定面板無法捲動的問題",
                "新增設定面板卷軸"
            ]
        },
        {
            version: "v4.83",
            date: "2026-02-15 18:20",
            changes: [
                "新增音效音量控制 (Volume Control)",
                "音量設定自動儲存"
            ]
        },
        {
            version: "v4.82",
            date: "2026-02-15 18:10",
            changes: [
                "新增背景圖片上傳功能 (Custom Background)",
                "新增「貼上圖片」功能"
            ]
        },
        {
            version: "v4.80 - v4.81",
            date: "2026-02-15 00:00",
            changes: [
                "設定選項預設為收合狀態",
                "版本號與介面微調"
            ]
        }
    ];
    return changelog;
})();

