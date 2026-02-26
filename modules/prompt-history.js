// ============================================
// Prompt 雲端存檔 & 歷史記錄模組
// Firestore CRUD + 歷史 Modal UI
// ============================================
window.PromptGen = window.PromptGen || {};

window.PromptGen.PromptHistory = (function () {
    'use strict';

    const COLLECTION = 'prompts'; // users/{uid}/prompts/{id}
    let modalEl = null;
    let _getStateFn = null; // 從 script.js 注入的 getState 函數

    // === 從 value 反查中文 label ===
    function findLabel(dataArray, value) {
        if (!dataArray || !value) return null;
        const item = dataArray.find(d => d.value === value);
        return item ? item.label : null;
    }

    // === 名稱中性別符號上色 ===
    function formatNameWithGender(name) {
        if (!name) return '未命名';
        if (name.startsWith('♀')) {
            return `<span style="color:#f472b6;font-weight:700">♀</span>${name.substring(1)}`;
        }
        if (name.startsWith('♂')) {
            return `<span style="color:#60a5fa;font-weight:700">♂</span>${name.substring(1)}`;
        }
        return name;
    }

    // === 智慧命名：從 state 提取有意義的中文名稱 ===
    function generateSmartName() {
        const state = _getStateFn ? _getStateFn() : null;
        if (!state || !state.selections) return '未命名';

        const DATA = window.PromptGen.Data;
        if (!DATA) return '未命名';

        const parts = [];

        // 表情或心情（作為形容詞）
        let adjective = null;
        const actionSections = DATA.TAB_SECTIONS && DATA.TAB_SECTIONS.action;
        if (actionSections) {
            // 優先用表情
            if (state.selections.expression) {
                const exprSection = actionSections.find(s => s.id === 'expression');
                if (exprSection && exprSection.data) {
                    adjective = findLabel(exprSection.data, state.selections.expression);
                }
            }
            // 沒有表情就用心情
            if (!adjective && state.selections.mood) {
                const moodSection = actionSections.find(s => s.id === 'mood');
                if (moodSection && moodSection.data) {
                    adjective = findLabel(moodSection.data, state.selections.mood);
                }
            }
        }
        if (adjective) parts.push(adjective + '的');

        // 種族
        if (state.selections.race && DATA.RACES) {
            const label = findLabel(DATA.RACES, state.selections.race);
            if (label) parts.push(label);
        }

        // 職業
        if (state.selections.job && DATA.JOBS) {
            const label = findLabel(DATA.JOBS, state.selections.job);
            if (label) parts.push(label);
        }

        // ★ 如果種族和職業都沒選，嘗試其他欄位作為 fallback
        if (!state.selections.race && !state.selections.job) {
            // 嘗試動漫風格
            if (state.selections.animeStyle && DATA.ANIME_STYLES) {
                const label = findLabel(DATA.ANIME_STYLES, state.selections.animeStyle);
                if (label) parts.push(label.replace(/\\n/g, ' '));
            }
            // 嘗試藝術風格
            if (state.selections.artStyle && DATA.ART_STYLES) {
                const label = findLabel(DATA.ART_STYLES, state.selections.artStyle);
                if (label) parts.push(label);
            }
            // 嘗試服裝
            if (parts.length === 0 || (parts.length === 1 && adjective)) {
                if (state.selections.outfit && DATA.OUTFITS) {
                    const label = findLabel(DATA.OUTFITS, state.selections.outfit);
                    if (label) parts.push(label);
                }
            }
            // 嘗試場景
            if (parts.length === 0 || (parts.length === 1 && adjective)) {
                if (state.selections.scene && DATA.SCENES) {
                    const label = findLabel(DATA.SCENES, state.selections.scene);
                    if (label) parts.push(label);
                }
            }
        }

        // 性別符號放最前面
        const genderSymbol = state.gender === 'female' ? '♀ ' : state.gender === 'male' ? '♂ ' : '';

        if (parts.length > 0) {
            return genderSymbol + parts.join('');
        }
        return genderSymbol ? genderSymbol.trim() : '未命名';
    }

    // === 產生中文預覽摘要 ===
    function generateChineseSummary() {
        const state = _getStateFn ? _getStateFn() : null;
        if (!state || !state.selections) return '';

        const DATA = window.PromptGen.Data;
        if (!DATA) return '';

        const items = [];
        const dimMap = { 'anime': '二次元', 'realistic': '寫實', 'fantasy': '幻想', '2.5d': '2.5D' };
        if (state.dimension) items.push('【' + (dimMap[state.dimension] || state.dimension) + '】');

        const genderMap = { 'female': '♀ 女性', 'male': '♂ 男性' };
        if (state.gender) items.push(genderMap[state.gender] || state.gender);

        if (state.age) items.push(state.age + '歲');

        // 種族
        if (state.selections.race && DATA.RACES) {
            const label = findLabel(DATA.RACES, state.selections.race);
            if (label) items.push('種族:' + label);
        }

        // 職業
        if (state.selections.job && DATA.JOBS) {
            const label = findLabel(DATA.JOBS, state.selections.job);
            if (label) items.push('職業:' + label);
        }

        // 各分頁 section 嘗試反查
        const sectionLabels = {
            expression: '表情', pose: '動作', hairstyle: '髮型',
            bodyType: '體型', outfit: '服裝', headwear: '頭飾',
            handItems: '手持物', animeStyle: '動漫風格', artStyle: '畫風',
            artist: '繪師', scene: '場景', hairColor: '髮色'
        };

        for (const [key, zhLabel] of Object.entries(sectionLabels)) {
            if (!state.selections[key]) continue;
            // 嘗試從各 TAB_SECTIONS 找到中文 label
            let found = false;
            if (DATA.TAB_SECTIONS) {
                for (const tabSections of Object.values(DATA.TAB_SECTIONS)) {
                    if (!Array.isArray(tabSections)) continue;
                    const section = tabSections.find(s => s.id === key);
                    if (section && section.data) {
                        const label = findLabel(section.data, state.selections[key]);
                        if (label) {
                            items.push(zhLabel + ':' + label);
                            found = true;
                            break;
                        }
                    }
                }
            }
            // 如果找不到就跳過（不顯示英文 value）
        }

        return items.join(' ｜ ');
    }

    // === Firestore 參考 ===
    function getUserPromptRef() {
        const user = window.PromptGen.currentUser;
        if (!user) return null;
        const db = window.PromptGen.FirebaseInit.getDb();
        return db.collection('users').doc(user.uid).collection(COLLECTION);
    }

    // === 取得精簡版 state（排除背景圖等大型資料）===
    function getCleanState() {
        const fullState = _getStateFn ? _getStateFn() : null;
        if (!fullState) return null;

        // 複製一份，排除不必要的大型資料
        const clean = { ...fullState };
        delete clean.background;       // 背景圖 base64 太大
        delete clean.spellMode;        // 咒語模式是顯示設定，不需保存
        delete clean.spellEffect;      // 同上
        delete clean.conflictWarningsEnabled; // 使用者偏好，非角色設定
        delete clean.conflictAutoResolution;  // 同上
        return clean;
    }

    // === 存檔 ===
    async function savePrompt() {
        const user = window.PromptGen.currentUser;
        if (!user) {
            alert('請先登入才能存檔！');
            return;
        }

        const finalPrompt = document.getElementById('final-prompt');
        const finalNegative = document.getElementById('final-negative');
        const yaml = finalPrompt ? finalPrompt.textContent.trim() : '';
        if (!yaml) {
            alert('目前沒有生成的提示詞可以存檔！');
            return;
        }

        try {
            const ref = getUserPromptRef();

            // 智慧命名
            const smartName = generateSmartName();
            // 中文預覽摘要
            const summary = generateChineseSummary();
            // 取得精簡版完整選項狀態（供載入時還原）
            const cleanState = getCleanState();

            const docData = {
                name: smartName,
                yaml: yaml,
                negative: finalNegative ? finalNegative.value.trim() : '',
                starred: false,
                dimension: getDimensionLabel(),
                summary: summary,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            // 加入完整選項狀態（如果取得成功）
            if (cleanState) {
                docData.state = cleanState;
            }

            await ref.add(docData);

            // 存檔成功動畫
            const btn = document.getElementById('btn-save-prompt');
            if (btn) {
                const origHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> 已存檔！';
                btn.classList.add('save-success');
                setTimeout(() => {
                    btn.innerHTML = origHTML;
                    btn.classList.remove('save-success');
                }, 1500);
            }
            console.log('[History] ✅ Prompt 已存檔（含完整 state）');
        } catch (error) {
            console.error('[History] ❌ 存檔失敗:', error);
            alert('存檔失敗：' + error.message);
        }
    }

    // === 取得次元標籤 ===
    function getDimensionLabel() {
        const dims = { 'anime': '二次元', 'realistic': '寫實', 'fantasy': '幻想混合', '2.5d': '2.5D' };
        const dimBtns = document.querySelectorAll('.dim-btn.active');
        if (dimBtns.length > 0) {
            const key = dimBtns[0].dataset.dim;
            return dims[key] || key || '未指定';
        }
        return '未指定';
    }

    // === 讀取歷史 ===
    async function getPrompts(starredOnly = false) {
        const ref = getUserPromptRef();
        if (!ref) return [];

        try {
            let query = ref.orderBy('createdAt', 'desc').limit(50);
            const snapshot = await query.get();
            const results = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                if (starredOnly && !data.starred) return;
                results.push({ id: doc.id, ...data });
            });
            return results;
        } catch (error) {
            console.error('[History] ❌ 讀取失敗:', error);
            return [];
        }
    }

    // === 刪除 ===
    async function deletePrompt(id) {
        const ref = getUserPromptRef();
        if (!ref) return;
        try {
            await ref.doc(id).delete();
            console.log('[History] 🗑️ 已刪除:', id);
        } catch (error) {
            console.error('[History] ❌ 刪除失敗:', error);
        }
    }

    // === 切換收藏 ===
    async function toggleStar(id, currentStarred) {
        const ref = getUserPromptRef();
        if (!ref) return;
        try {
            await ref.doc(id).update({ starred: !currentStarred });
        } catch (error) {
            console.error('[History] ❌ 切換收藏失敗:', error);
        }
    }

    // === 重新命名 ===
    async function renamePrompt(id, newName) {
        const ref = getUserPromptRef();
        if (!ref) return;
        try {
            await ref.doc(id).update({ name: newName });
        } catch (error) {
            console.error('[History] ❌ 重新命名失敗:', error);
        }
    }

    // === 載入 prompt 到輸出區（含完整 state 還原）===
    function loadPrompt(yaml, negative, savedState) {
        closeModal();

        // 如果有完整 state，透過 _applySharedState 還原所有選項
        if (savedState && window.PromptGen._applySharedState) {
            window.PromptGen._applySharedState(savedState, '📂 已載入存檔的角色設定！');
            console.log('[History] ✅ Prompt 已載入（完整 state 還原）');
        } else {
            // 舊版存檔沒有 state，只能替換文字（向下相容）
            const finalPrompt = document.getElementById('final-prompt');
            const finalNegative = document.getElementById('final-negative');

            if (finalPrompt) {
                finalPrompt.textContent = yaml;
            }
            if (finalNegative) finalNegative.value = negative || '';
            console.log('[History] ⚠️ Prompt 已載入（僅文字，舊版存檔無 state）');
        }

        // 載入成功音效
        if (window.PromptGen.SoundManager) {
            window.PromptGen.SoundManager.playSuccess();
        }

        // 載入成功的視覺反饋
        const finalPrompt = document.getElementById('final-prompt');
        if (finalPrompt) {
            finalPrompt.classList.add('load-flash');
            setTimeout(() => finalPrompt.classList.remove('load-flash'), 1200);
        }

        // 自動捲動到輸出區域
        setTimeout(() => {
            const outputSection = document.querySelector('.output-section');
            if (outputSection) {
                outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (finalPrompt) {
                finalPrompt.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
    }

    // === Modal UI ===
    function openModal() {
        if (!window.PromptGen.currentUser) {
            alert('請先登入才能查看歷史記錄！');
            return;
        }
        if (!modalEl) createModal();
        modalEl.classList.add('active');
        document.body.style.overflow = 'hidden';
        // 註冊到 ModalRegistry（統一 ESC 關閉）
        window.PromptGen.ModalRegistry.register('prompt-history-modal', closeModal);
        renderList();
    }

    function closeModal() {
        if (modalEl) modalEl.classList.remove('active');
        document.body.style.overflow = '';
        window.PromptGen.ModalRegistry.unregister('prompt-history-modal');
    }

    function createModal() {
        modalEl = document.createElement('div');
        modalEl.className = 'history-modal-overlay';
        modalEl.innerHTML = `
            <div class="history-modal">
                <div class="history-modal-header">
                    <h2><i class="fa-solid fa-clock-rotate-left"></i> 歷史記錄</h2>
                    <div class="history-modal-tabs">
                        <button class="hist-tab active" data-filter="all">全部</button>
                        <button class="hist-tab" data-filter="starred">⭐ 收藏</button>
                    </div>
                    <button class="history-modal-close" id="btn-history-close">&times;</button>
                </div>
                <div class="history-modal-body" id="history-list">
                    <div class="history-loading">載入中...</div>
                </div>
            </div>
        `;
        document.body.appendChild(modalEl);

        // 關閉
        modalEl.querySelector('#btn-history-close').addEventListener('click', closeModal);
        modalEl.addEventListener('click', (e) => {
            if (e.target === modalEl) closeModal();
        });

        // Tab 切換
        modalEl.querySelectorAll('.hist-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                modalEl.querySelectorAll('.hist-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderList(tab.dataset.filter === 'starred');
            });
        });
    }

    async function renderList(starredOnly = false) {
        const listEl = document.getElementById('history-list');
        if (!listEl) return;
        listEl.innerHTML = '<div class="history-loading"><i class="fa-solid fa-spinner fa-spin"></i> 載入中...</div>';

        const prompts = await getPrompts(starredOnly);

        if (prompts.length === 0) {
            listEl.innerHTML = `<div class="history-empty">
                <i class="fa-solid fa-inbox"></i>
                <p>${starredOnly ? '還沒有收藏的 prompt' : '還沒有存檔的 prompt'}</p>
                <p class="history-empty-hint">生成 prompt 後，點擊「💾 存檔」按鈕即可保存</p>
            </div>`;
            return;
        }

        listEl.innerHTML = prompts.map(p => {
            const date = p.createdAt ? p.createdAt.toDate().toLocaleString('zh-TW') : '未知';
            // 優先使用中文摘要，沒有的話截取 YAML 前 120 字元
            const preview = p.summary || (p.yaml || '').substring(0, 120).replace(/\n/g, ' ');
            return `
                <div class="history-item" data-id="${p.id}">
                    <div class="history-item-header">
                        <button class="hist-star ${p.starred ? 'starred' : ''}" data-id="${p.id}" data-starred="${p.starred}" title="收藏">
                            <i class="fa-${p.starred ? 'solid' : 'regular'} fa-star"></i>
                        </button>
                        <span class="hist-name" data-id="${p.id}" title="點擊重新命名">${formatNameWithGender(p.name || '未命名')}</span>
                        <span class="hist-dim">${p.dimension || ''}</span>
                        <span class="hist-date">${date}</span>
                    </div>
                    <div class="history-item-preview">${preview}</div>
                    <div class="history-item-actions">
                        <button class="hist-load" data-id="${p.id}" title="載入此 prompt">
                            <i class="fa-solid fa-download"></i> 載入
                        </button>
                        <button class="hist-delete" data-id="${p.id}" title="刪除">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // 綁定事件
        listEl.querySelectorAll('.hist-star').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                const starred = btn.dataset.starred === 'true';
                await toggleStar(id, starred);
                const activeTab = modalEl.querySelector('.hist-tab.active');
                renderList(activeTab && activeTab.dataset.filter === 'starred');
            });
        });

        listEl.querySelectorAll('.hist-load').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = prompts.find(p => p.id === btn.dataset.id);
                if (item) loadPrompt(item.yaml, item.negative, item.state || null);
            });
        });

        listEl.querySelectorAll('.hist-delete').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (!confirm('確定要刪除這筆記錄嗎？')) return;
                await deletePrompt(btn.dataset.id);
                const activeTab = modalEl.querySelector('.hist-tab.active');
                renderList(activeTab && activeTab.dataset.filter === 'starred');
            });
        });

        listEl.querySelectorAll('.hist-name').forEach(span => {
            span.addEventListener('click', async () => {
                const newName = prompt('重新命名：', span.textContent);
                if (newName && newName.trim()) {
                    await renamePrompt(span.dataset.id, newName.trim());
                    span.textContent = newName.trim();
                }
            });
        });
    }

    // === 初始化 ===
    let _initialized = false;
    function init(deps) {
        // 注入 getState 函數（若有傳入）
        if (deps && deps.getState) {
            _getStateFn = deps.getState;
        }

        // 防止按鈕事件重複綁定
        if (_initialized) return;
        _initialized = true;

        // 存檔按鈕
        const saveBtn = document.getElementById('btn-save-prompt');
        if (saveBtn) saveBtn.addEventListener('click', savePrompt);

        // 歷史按鈕
        const histBtn = document.getElementById('btn-history');
        if (histBtn) histBtn.addEventListener('click', openModal);
    }

    return { init, savePrompt, openModal, closeModal };
})();
