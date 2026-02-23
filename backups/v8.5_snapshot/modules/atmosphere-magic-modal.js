// ============================================
// AI Prompt Generator — Time & Atmosphere Magic Modal
// openAtmosphereMagicModal() 函式
// 前綴：atmm-
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.AtmosphereMagicModal = (function () {
    let state, sfx, ATM_DATA, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        ATM_DATA = deps.ATM_DATA;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function openAtmosphereMagicModal() {
        const existing = document.getElementById('atmosphere-magic-modal');
        if (existing) existing.remove();

        // 讀取已儲存的狀態
        const saved = state.atmosphereAdvanced || {};
        let timeOfDay = saved.timeOfDay || null;    // 1-5，null = 未設定
        let weather = saved.weather || null;         // 1-5，null = 未設定
        let selectedEffects = new Set(saved.effects || []);
        let currentTab = 'all';
        let searchQuery = '';
        let filterLetter = null;

        const TABS = ATM_DATA.TABS;
        const ITEMS = ATM_DATA.ITEMS;
        const TIME = ATM_DATA.TIME_OF_DAY;
        const WEATHER = ATM_DATA.WEATHER_OPTIONS;
        const HOT_ITEMS = ATM_DATA.HOT_ITEMS;

        // 取得最近使用
        let recentItems = [];
        try {
            recentItems = JSON.parse(localStorage.getItem('atmm_recent') || '[]');
        } catch (e) { recentItems = []; }

        // === 建立 overlay ===
        const overlay = document.createElement('div');
        overlay.id = 'atmosphere-magic-modal';

        // Tab HTML（含 count）
        function buildTabsHtml() {
            return TABS.map(t => {
                let count = 0;
                if (t.id === 'all') count = ITEMS.length;
                else if (t.id === 'recent') count = recentItems.length;
                else if (t.id === 'hot') count = HOT_ITEMS.length;
                else count = ITEMS.filter(e => e.category === t.id).length;
                return `<button class="atmm-tab${t.id === currentTab ? ' active' : ''}" data-tab="${t.id}">
                    <span class="atmm-tab-icon">${t.icon}</span>
                    <span class="atmm-tab-zh">${t.label}</span>
                    <span class="atmm-tab-en">${t.en}</span>
                    <span class="atmm-tab-count">${count}</span>
                </button>`;
            }).join('');
        }

        // 時段推桿 HTML
        const timeLabelsHtml = TIME.map(t =>
            `<span class="atmm-slider-label">${t.icon}<br>${t.label}</span>`
        ).join('');

        // 天氣推桿 HTML
        const weatherLabelsHtml = WEATHER.map(w =>
            `<span class="atmm-slider-label">${w.icon}<br>${w.label}</span>`
        ).join('');

        overlay.innerHTML = `
            <div class="atmm-particles" id="atmm-particles"></div>
            <div class="atmm-container">
                <div class="atmm-header">
                    <div class="atmm-title-row">
                        <div class="atmm-title">⏰ 時間氛圍魔法系統 — Time & Atmosphere Magic</div>
                        <div class="atmm-toolbar">
                            <button class="cmm-tool-btn" id="atmm-dice" title="隨機骰子">🎲 隨機</button>
                            <button class="cmm-tool-btn" id="atmm-reset" title="重設">🔄 重設</button>
                        </div>
                    </div>
                </div>
                <div class="atmm-search-bar" style="padding:0 20px;margin-top:8px">
                    <input type="text" id="atmm-search" class="cmm-search-input" placeholder="🔍 搜尋天象特效（中文/英文）..." style="width:100%;padding:8px 12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:#e2e8f0;font-size:13px;outline:none;transition:border-color 0.2s" onfocus="this.style.borderColor='rgba(34,211,238,0.5)'" onblur="this.style.borderColor='rgba(255,255,255,0.12)'">
                </div>
                <div class="atmm-tabs" id="atmm-tabs">${buildTabsHtml()}</div>

                <div class="atmm-body">
                    <div class="atmm-main">
                        <div class="atmm-grid-wrap" id="atmm-grid-wrap">
                            <div class="atmm-grid" id="atmm-grid"></div>
                        </div>
                    </div>
                    <div class="atmm-az" id="atmm-az"></div>
                </div>

                <div class="atmm-controls">
                        <div class="atmm-controls-row">
                            <div class="atmm-slider-section">
                                <div class="atmm-slider-title">⏰ 時段推桿</div>
                                <div class="atmm-slider-labels">${timeLabelsHtml}</div>
                                <div class="atmm-slider-wrap">
                                    <input type="range" class="atmm-slider atmm-slider-time" id="atmm-time-slider" min="1" max="5" value="${timeOfDay || 3}" step="1" ${timeOfDay === null ? 'data-inactive="true"' : ''}>
                                </div>
                                <div class="atmm-slider-toggle">
                                    <label class="atmm-toggle-label">
                                        <input type="checkbox" id="atmm-time-toggle" ${timeOfDay !== null ? 'checked' : ''}>
                                        <span class="atmm-toggle-text">${timeOfDay !== null ? '✅ 已啟用' : '⬜ 未啟用'}</span>
                                    </label>
                                </div>
                            </div>

                            <div class="atmm-slider-section">
                                <div class="atmm-slider-title">🌤 天氣推桿</div>
                                <div class="atmm-slider-labels">${weatherLabelsHtml}</div>
                                <div class="atmm-slider-wrap">
                                    <input type="range" class="atmm-slider atmm-slider-weather" id="atmm-weather-slider" min="1" max="5" value="${weather || 1}" step="1" ${weather === null ? 'data-inactive="true"' : ''}>
                                </div>
                                <div class="atmm-slider-toggle">
                                    <label class="atmm-toggle-label">
                                        <input type="checkbox" id="atmm-weather-toggle" ${weather !== null ? 'checked' : ''}>
                                        <span class="atmm-toggle-text">${weather !== null ? '✅ 已啟用' : '⬜ 未啟用'}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                <div class="atmm-preview" id="atmm-preview-area">
                    <div class="atmm-preview-label">📝 提示詞預覽</div>
                    <div class="atmm-preview-text" id="atmm-preview-text"></div>
                </div>

                <div class="atmm-footer">
                    <div class="atmm-status" id="atmm-status">設定時段、天氣與天象特效</div>
                    <div class="atmm-actions">
                        <button class="atmm-btn atmm-btn-cancel" id="atmm-cancel">❌ 取消</button>
                        <button class="atmm-btn atmm-btn-apply" id="atmm-apply">✨ 套用魔法</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // === 粒子效果 ===
        const pc = document.getElementById('atmm-particles');
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'atmm-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 3 + 's';
            p.style.animationDuration = (2 + Math.random() * 3) + 's';
            const colors = ['#22d3ee', '#06b6d4', '#67e8f9', '#a5f3fc', '#0891b2'];
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
            pc.appendChild(p);
        }

        // === 開啟音效 ===
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            [600, 900, 1200, 1500].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.frequency.value = freq; osc.type = 'sine';
                gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);
                osc.start(ctx.currentTime + i * 0.12); osc.stop(ctx.currentTime + i * 0.12 + 0.3);
            });
        } catch (e) { }

        // === 渲染天象特效網格 ===
        function renderGrid() {
            const grid = document.getElementById('atmm-grid');
            let filtered = [];

            if (currentTab === 'all') {
                filtered = [...ITEMS];
            } else if (currentTab === 'recent') {
                filtered = recentItems.map(id => ITEMS.find(e => e.id === id)).filter(Boolean);
            } else if (currentTab === 'hot') {
                filtered = HOT_ITEMS.map(id => ITEMS.find(e => e.id === id)).filter(Boolean);
            } else {
                filtered = ITEMS.filter(e => e.category === currentTab);
            }

            // 搜尋過濾
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                filtered = filtered.filter(e =>
                    e.label.includes(searchQuery) || e.en.toLowerCase().includes(q) || e.value.toLowerCase().includes(q)
                );
            }

            // A-Z 字母過濾
            if (filterLetter) {
                filtered = filtered.filter(e => e.en.charAt(0).toUpperCase() === filterLetter);
            }

            if (filtered.length === 0) {
                grid.innerHTML = `<div class="atmm-empty">${searchQuery ? '找不到符合的天象特效' : (currentTab === 'recent' ? '尚無最近使用記錄' : '此分類暫無特效')}</div>`;
                return;
            }

            grid.innerHTML = filtered.map(e => {
                const sel = selectedEffects.has(e.id) ? ' selected' : '';
                const hot = HOT_ITEMS.includes(e.id) ? '<span class="atmm-hot-badge">🔥</span>' : '';
                return `<button class="atmm-effect-chip${sel}" data-id="${e.id}" data-value="${e.value}" data-label="${e.label}" data-en="${e.en}">
                    ${hot}
                    <span class="atmm-chip-zh">${e.label}</span>
                    <span class="atmm-chip-en">${e.en}</span>
                </button>`;
            }).join('');
        }

        // === 更新預覽 ===
        function updatePreview() {
            const previewText = document.getElementById('atmm-preview-text');
            const statusEl = document.getElementById('atmm-status');
            const timeSlider = document.getElementById('atmm-time-slider');
            const weatherSlider = document.getElementById('atmm-weather-slider');
            const timeToggle = document.getElementById('atmm-time-toggle');
            const weatherToggle = document.getElementById('atmm-weather-toggle');

            let promptParts = [];
            let statusParts = [];

            // 時段
            if (timeToggle.checked) {
                const tv = parseInt(timeSlider.value);
                const tData = TIME[tv - 1];
                promptParts.push(tData.value);
                statusParts.push(`⏰ ${tData.label}`);
                timeSlider.removeAttribute('data-inactive');
            } else {
                timeSlider.setAttribute('data-inactive', 'true');
            }

            // 天氣
            if (weatherToggle.checked) {
                const wv = parseInt(weatherSlider.value);
                const wData = WEATHER[wv - 1];
                promptParts.push(wData.value);
                statusParts.push(`🌤 ${wData.label}`);
                weatherSlider.removeAttribute('data-inactive');
            } else {
                weatherSlider.setAttribute('data-inactive', 'true');
            }

            // 天象特效
            selectedEffects.forEach(eid => {
                const ef = ITEMS.find(e => e.id === eid);
                if (ef) promptParts.push(ef.value);
            });
            if (selectedEffects.size > 0) {
                statusParts.push(`✨ 天象特效 × ${selectedEffects.size}`);
            }

            // 預覽文字
            if (promptParts.length === 0) {
                previewText.innerHTML = '<span style="color:#64748b">（請設定時段、天氣或選擇天象特效）</span>';
                statusEl.innerHTML = '設定時段、天氣與天象特效';
            } else {
                previewText.innerHTML = promptParts.map(p => `<span class="atmm-prompt-tag">${p}</span>`).join(', ');
                statusEl.innerHTML = statusParts.join(' | ');
            }

            // 更新 toggle 文字
            const timeToggleText = timeToggle.closest('.atmm-toggle-label').querySelector('.atmm-toggle-text');
            const weatherToggleText = weatherToggle.closest('.atmm-toggle-label').querySelector('.atmm-toggle-text');
            timeToggleText.textContent = timeToggle.checked ? '✅ 已啟用' : '⬜ 未啟用';
            weatherToggleText.textContent = weatherToggle.checked ? '✅ 已啟用' : '⬜ 未啟用';
        }

        // === 更新 Tab count ===
        function updateTabCounts() {
            overlay.querySelectorAll('.atmm-tab').forEach(tab => {
                const tid = tab.dataset.tab;
                let count = 0;
                if (tid === 'all') count = ITEMS.length;
                else if (tid === 'recent') count = recentItems.length;
                else if (tid === 'hot') count = HOT_ITEMS.length;
                else count = ITEMS.filter(e => e.category === tid).length;
                const countEl = tab.querySelector('.atmm-tab-count');
                if (countEl) countEl.textContent = count;
            });
        }

        // === A-Z 字母導航列 ===
        const azEl = document.getElementById('atmm-az');
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const el = document.createElement('div');
            el.className = 'atmm-az-letter';
            el.textContent = letter;
            el.addEventListener('click', () => {
                filterLetter = letter;
                searchQuery = '';
                document.getElementById('atmm-search').value = '';
                currentTab = 'all';
                overlay.querySelectorAll('.atmm-tab').forEach(t => t.classList.remove('active'));
                overlay.querySelector('.atmm-tab[data-tab="all"]').classList.add('active');
                azEl.querySelectorAll('.atmm-az-letter').forEach(l => l.classList.remove('active'));
                el.classList.add('active');
                renderGrid();
            });
            azEl.appendChild(el);
        });

        // === 初始渲染 ===
        renderGrid();
        updatePreview();

        // === 搜尋 ===
        document.getElementById('atmm-search').addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            filterLetter = null;
            azEl.querySelectorAll('.atmm-az-letter').forEach(l => l.classList.remove('active'));
            renderGrid();
        });

        // === Tab 切換 ===
        document.getElementById('atmm-tabs').addEventListener('click', (e) => {
            const tab = e.target.closest('.atmm-tab');
            if (!tab) return;
            sfx.playClick();
            currentTab = tab.dataset.tab;
            filterLetter = null;
            azEl.querySelectorAll('.atmm-az-letter').forEach(l => l.classList.remove('active'));
            overlay.querySelectorAll('.atmm-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            searchQuery = '';
            const searchInput = document.getElementById('atmm-search');
            if (searchInput) searchInput.value = '';
            renderGrid();
        });

        // === 天象特效選擇（多選 toggle）===
        document.getElementById('atmm-grid').addEventListener('click', (e) => {
            const chip = e.target.closest('.atmm-effect-chip');
            if (!chip) return;
            sfx.playClick();
            const eid = chip.dataset.id;

            if (selectedEffects.has(eid)) {
                selectedEffects.delete(eid);
                chip.classList.remove('selected');
            } else {
                selectedEffects.add(eid);
                chip.classList.add('selected');
            }

            updatePreview();
        });

        // === 時段推桿 ===
        document.getElementById('atmm-time-slider').addEventListener('input', () => {
            const toggle = document.getElementById('atmm-time-toggle');
            if (!toggle.checked) {
                toggle.checked = true;
            }
            updatePreview();
        });

        // === 天氣推桿 ===
        document.getElementById('atmm-weather-slider').addEventListener('input', () => {
            const toggle = document.getElementById('atmm-weather-toggle');
            if (!toggle.checked) {
                toggle.checked = true;
            }
            updatePreview();
        });

        // === Toggle 開關 ===
        document.getElementById('atmm-time-toggle').addEventListener('change', () => updatePreview());
        document.getElementById('atmm-weather-toggle').addEventListener('change', () => updatePreview());

        // === 骰子隨機 ===
        document.getElementById('atmm-dice').addEventListener('click', () => {
            sfx.playClick();
            // 隨機時段
            const timeToggle = document.getElementById('atmm-time-toggle');
            timeToggle.checked = true;
            const randomTime = Math.floor(Math.random() * 5) + 1;
            document.getElementById('atmm-time-slider').value = randomTime;

            // 隨機天氣
            const weatherToggle = document.getElementById('atmm-weather-toggle');
            weatherToggle.checked = true;
            const randomWeather = Math.floor(Math.random() * 5) + 1;
            document.getElementById('atmm-weather-slider').value = randomWeather;

            // 隨機選 1-3 個天象特效
            selectedEffects.clear();
            const shuffled = [...ITEMS].sort(() => Math.random() - 0.5);
            const count = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < count && i < shuffled.length; i++) {
                selectedEffects.add(shuffled[i].id);
            }

            renderGrid();
            updatePreview();
        });

        // === 重設 ===
        document.getElementById('atmm-reset').addEventListener('click', () => {
            sfx.playClick();
            timeOfDay = null;
            weather = null;
            selectedEffects.clear();
            searchQuery = '';
            currentTab = 'all';
            filterLetter = null;
            const searchInput = document.getElementById('atmm-search');
            if (searchInput) searchInput.value = '';
            document.getElementById('atmm-time-slider').value = 3;
            document.getElementById('atmm-time-slider').setAttribute('data-inactive', 'true');
            document.getElementById('atmm-weather-slider').value = 1;
            document.getElementById('atmm-weather-slider').setAttribute('data-inactive', 'true');
            document.getElementById('atmm-time-toggle').checked = false;
            document.getElementById('atmm-weather-toggle').checked = false;
            // 重置 tab
            overlay.querySelectorAll('.atmm-tab').forEach(t => t.classList.remove('active'));
            overlay.querySelector('.atmm-tab[data-tab="all"]').classList.add('active');
            renderGrid();
            updatePreview();
        });

        // === 關閉 helper ===
        function closeModal() {
            overlay.style.animation = 'atmm-fadeIn 0.3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }

        // === 取消 ===
        document.getElementById('atmm-cancel').addEventListener('click', closeModal);

        // === 套用 ===
        document.getElementById('atmm-apply').addEventListener('click', () => {
            const timeToggle = document.getElementById('atmm-time-toggle');
            const weatherToggle = document.getElementById('atmm-weather-toggle');
            const timeVal = timeToggle.checked ? parseInt(document.getElementById('atmm-time-slider').value) : null;
            const weatherVal = weatherToggle.checked ? parseInt(document.getElementById('atmm-weather-slider').value) : null;

            if (timeVal !== null || weatherVal !== null || selectedEffects.size > 0) {
                // 取得中文名稱（用於 banner 顯示）
                const effectsZh = [];
                selectedEffects.forEach(eid => {
                    const ef = ITEMS.find(e => e.id === eid);
                    if (ef) effectsZh.push(ef.label);
                });

                state.atmosphereAdvanced = {
                    timeOfDay: timeVal,
                    weather: weatherVal,
                    effects: Array.from(selectedEffects),
                    effectsZh: effectsZh
                };

                // 更新基礎選擇（清除舊 weather section）
                delete state.selections['atmosphere'];

                // 更新最近使用
                selectedEffects.forEach(eid => {
                    recentItems = recentItems.filter(r => r !== eid);
                    recentItems.unshift(eid);
                });
                recentItems = recentItems.slice(0, 10);
                try { localStorage.setItem('atmm_recent', JSON.stringify(recentItems)); } catch (e) { }
            } else {
                // 清除氛圍進階
                delete state.atmosphereAdvanced;
            }

            // 施法音效（清爽的風鈴音）
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain); gain.connect(ctx.destination);
                    osc.frequency.value = freq;
                    osc.type = i < 3 ? 'triangle' : 'sine';
                    const t = ctx.currentTime + i * 0.08;
                    gain.gain.setValueAtTime(0, t);
                    gain.gain.linearRampToValueAtTime(0.06, t + 0.02);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
                    osc.start(t); osc.stop(t + 0.4);
                });
            } catch (e) { }

            overlay.style.animation = 'atmm-fadeIn 0.3s ease reverse';
            setTimeout(() => {
                overlay.remove();
                renderTabContent();
                generatePrompt();
                saveState();
            }, 280);
        });

        // === 點擊外部關閉 ===
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

        // === ESC ===
        const escH = (e) => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escH); } };
        document.addEventListener('keydown', escH);
    }

    return {
        setup,
        openAtmosphereMagicModal
    };
})();
