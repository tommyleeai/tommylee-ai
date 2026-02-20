// ============================================
// AI Prompt Generator — Hair Magic Modal
// openHairMagicModal() 函式
// 混合模式：推桿 + Chip Grid
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.HairMagicModal = (function () {
    // Dependencies injected via setup()
    let state, sfx, DATA, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        DATA = deps.HAIR_MAGIC_DATA;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    // === 📋 最近使用 (localStorage) ===
    const RECENT_KEY = 'hmm_recent_hair';
    function getRecent() {
        try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; }
    }
    function addRecent(id) {
        let recent = getRecent().filter(r => r !== id);
        recent.unshift(id);
        if (recent.length > 10) recent = recent.slice(0, 10);
        localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    }

    // === 判斷 Tab 是否用推桿 ===
    const SLIDER_TABS = new Set(['ponytail']);

    // ========================================
    // openHairMagicModal — 主函式
    // ========================================
    function openHairMagicModal() {
        const existing = document.getElementById('hair-magic-modal');
        if (existing) existing.remove();

        const ITEMS = DATA.ITEMS;
        const CATEGORIES = DATA.CATEGORIES;
        const SLIDERS = DATA.SLIDERS;
        const HOT_ITEMS = DATA.HOT_ITEMS;
        const PRESETS = DATA.PRESETS;
        const CONFLICTS = DATA.CONFLICTS;

        // 狀態
        let selectedItems = new Set();
        let activeCat = 'hot';
        let searchQuery = '';
        let filterLetter = null;
        let sliderValues = {
            hair_length: state.hairAdvanced?.hair_length || 4,
            ponytail_height: state.hairAdvanced?.ponytail_height || 3,
            ponytail_count: state.hairAdvanced?.ponytail_count || 1
        };
        let lengthSliderActive = !!(state.hairAdvanced?.hair_length);

        // 恢復已選項目
        if (state.hairAdvanced?.selectedItems) {
            state.hairAdvanced.selectedItems.forEach(id => selectedItems.add(id));
        }

        // === 衝突判斷 ===
        function isItemBlocked(item) {
            // 檢查推桿衝突
            for (const rule of CONFLICTS) {
                if (rule.slider === 'hair_length' && lengthSliderActive) {
                    if (sliderValues.hair_length === rule.sliderValue && rule.blockedCats.includes(item.cat)) {
                        return rule.reason;
                    }
                }
                if (rule.itemA && selectedItems.has(rule.itemA) && rule.blockedCats.includes(item.cat)) {
                    return rule.reason;
                }
            }
            return null;
        }

        // === 建立 DOM ===
        const overlay = document.createElement('div');
        overlay.id = 'hair-magic-modal';
        overlay.innerHTML = `
    <div class="hmm-particles" id="hmm-particles"></div>
    <div class="hmm-container">
      <div class="hmm-dice-overlay" id="hmm-dice-overlay">
        <span class="hmm-dice-emoji" id="hmm-dice-emoji">🎲</span>
      </div>
      <div class="hmm-header">
        <div class="hmm-title-row">
          <div class="hmm-title">✂️ 高級魔法・髮型大全</div>
          <div class="hmm-toolbar">
            <button class="hmm-tool-btn" id="hmm-dice" title="隨機選取"><span class="hmm-tool-icon">🎲</span> 隨機</button>
          </div>
        </div>
        <div class="hmm-search-row">
          <div class="hmm-search-wrap">
            <i class="fa-solid fa-magnifying-glass hmm-search-icon"></i>
            <input type="text" class="hmm-search" id="hmm-search" placeholder="搜尋髮型 Search hairstyle...">
          </div>
        </div>
      </div>
      <div class="hmm-tabs" id="hmm-tabs"></div>
      <div class="hmm-fantasy-banner" id="hmm-fantasy-banner">
        <span class="icon">🔮</span>
        <span>已進入<strong>幻想級別</strong>！推桿包含超現實描述。</span>
      </div>
      <div class="hmm-body">
        <div class="hmm-main">
          <div class="hmm-grid-wrap" id="hmm-grid-wrap">
            <div id="hmm-content-area"></div>
          </div>
        </div>
        <div class="hmm-az" id="hmm-az"></div>
      </div>
      <div class="hmm-footer">
        <div class="hmm-status" id="hmm-status"></div>
        <div class="hmm-actions">
          <button class="hmm-btn hmm-btn-cancel" id="hmm-cancel">❌ 取消</button>
          <button class="hmm-btn hmm-btn-apply" id="hmm-apply">✨ 套用</button>
        </div>
      </div>
    </div>`;

        document.body.appendChild(overlay);

        // === 粒子 ===
        const pc = document.getElementById('hmm-particles');
        const pcolors = ['#fbbf24', '#a855f7', '#7c3aed', '#f59e0b', '#c084fc', '#fff', '#e879f9'];
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'hmm-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 4 + 's';
            p.style.animationDuration = (3 + Math.random() * 4) + 's';
            p.style.background = pcolors[Math.floor(Math.random() * pcolors.length)];
            const s = 2 + Math.random() * 4;
            p.style.width = p.style.height = s + 'px';
            p.style.boxShadow = `0 0 ${s * 2}px ${p.style.background}`;
            pc.appendChild(p);
        }

        // === 流星 ===
        for (let i = 0; i < 4; i++) {
            const m = document.createElement('div');
            m.className = 'hmm-meteor';
            m.style.top = (Math.random() * 30) + '%';
            m.style.left = (50 + Math.random() * 50) + '%';
            m.style.animationDelay = (0.5 + Math.random() * 3) + 's';
            m.style.animationDuration = (1 + Math.random() * 1.5) + 's';
            overlay.appendChild(m);
        }

        playOpenSound();

        // === Tabs ===
        const tabsEl = document.getElementById('hmm-tabs');
        CATEGORIES.forEach(c => {
            let count;
            if (c.id === 'all') count = ITEMS.length;
            else if (c.id === 'hot') count = HOT_ITEMS.length;
            else if (c.id === 'recent') count = getRecent().length;
            else if (SLIDER_TABS.has(c.id)) count = '⚙️';
            else count = ITEMS.filter(it => it.cat === c.id).length;

            const tab = document.createElement('div');
            tab.className = 'hmm-tab' + (c.id === activeCat ? ' active' : '');
            tab.dataset.cat = c.id;
            tab.innerHTML = `<span class="hmm-tab-icon">${c.icon}</span><span class="hmm-tab-zh">${c.label}</span><span class="hmm-tab-en">${c.en}</span><span class="hmm-tab-count">${count}</span>`;
            tab.addEventListener('click', () => {
                activeCat = c.id;
                filterLetter = null;
                document.getElementById('hmm-az').querySelectorAll('.hmm-az-letter').forEach(l => l.classList.remove('active'));
                tabsEl.querySelectorAll('.hmm-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderContent();
            });
            tabsEl.appendChild(tab);
        });

        // === A-Z 索引 ===
        const azEl = document.getElementById('hmm-az');
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const el = document.createElement('div');
            el.className = 'hmm-az-letter';
            el.textContent = letter;
            el.addEventListener('click', () => {
                filterLetter = letter;
                searchQuery = '';
                document.getElementById('hmm-search').value = '';
                activeCat = 'all';
                tabsEl.querySelectorAll('.hmm-tab').forEach(t => t.classList.remove('active'));
                tabsEl.querySelector('.hmm-tab').classList.add('active');
                azEl.querySelectorAll('.hmm-az-letter').forEach(l => l.classList.remove('active'));
                el.classList.add('active');
                renderContent();
            });
            azEl.appendChild(el);
        });

        // === 搜尋 ===
        document.getElementById('hmm-search').addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            filterLetter = null;
            azEl.querySelectorAll('.hmm-az-letter').forEach(l => l.classList.remove('active'));
            if (searchQuery) activeCat = 'all';
            renderContent();
        });

        // === 🎲 隨機選取 ===
        let diceAnimating = false;
        document.getElementById('hmm-dice').addEventListener('click', function () {
            if (diceAnimating) return;
            diceAnimating = true;

            const overlayDice = document.getElementById('hmm-dice-overlay');
            const diceEl = document.getElementById('hmm-dice-emoji');
            const btn = this;

            btn.classList.add('hmm-dice-spinning');
            diceEl.className = 'hmm-dice-emoji';
            void diceEl.offsetWidth;
            overlayDice.classList.add('active');
            playDiceSound();

            setTimeout(() => { diceEl.classList.add('rolling'); }, 400);

            setTimeout(() => {
                diceEl.classList.remove('rolling');
                diceEl.classList.add('exit');

                // 隨機選一個 chip 項目
                selectedItems.clear();
                const randomItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
                selectedItems.add(randomItem.id);

                // 隨機推桿
                sliderValues.hair_length = Math.floor(Math.random() * 6) + 2; // 2-7
                lengthSliderActive = true;

                activeCat = randomItem.cat;
                filterLetter = null;
                tabsEl.querySelectorAll('.hmm-tab').forEach(t => t.classList.remove('active'));
                const targetTab = tabsEl.querySelector(`[data-cat="${randomItem.cat}"]`);
                if (targetTab) targetTab.classList.add('active');

                playSelectSound();
                renderContent();

                setTimeout(() => {
                    const selEl = document.querySelector('.hmm-item-chip.selected');
                    if (selEl) selEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 80);

                setTimeout(() => {
                    overlayDice.classList.remove('active');
                    btn.classList.remove('hmm-dice-spinning');
                    diceAnimating = false;
                }, 350);
            }, 1400);
        });

        // === 取得篩選後的項目 ===
        function getFilteredItems() {
            let filtered = ITEMS;
            const recent = getRecent();

            if (activeCat === 'recent') {
                filtered = recent.map(id => ITEMS.find(it => it.id === id)).filter(Boolean);
            } else if (activeCat === 'hot') {
                filtered = ITEMS.filter(it => HOT_ITEMS.includes(it.id));
            } else if (activeCat !== 'all' && !SLIDER_TABS.has(activeCat)) {
                filtered = filtered.filter(it => it.cat === activeCat);
            }

            if (searchQuery) {
                filtered = filtered.filter(it =>
                    it.name.includes(searchQuery) || it.en.toLowerCase().includes(searchQuery) || it.value.toLowerCase().includes(searchQuery)
                );
            }
            if (filterLetter) {
                filtered = filtered.filter(it => it.en.charAt(0).toUpperCase() === filterLetter);
            }
            return filtered;
        }

        // === 渲染內容（核心分支邏輯）===
        function renderContent() {
            const area = document.getElementById('hmm-content-area');

            if (activeCat === 'ponytail') {
                // 馬尾 Tab：顯示推桿 + 相關 chip
                renderPonytailTab(area);
            } else {
                // 其餘：Chip Grid
                renderChipGrid(area);
            }

            updateStatus();
            updateFantasyBanner();
        }

        // === 渲染 Chip Grid ===
        function renderChipGrid(area) {
            const filtered = getFilteredItems();
            const recent = getRecent();

            let html = `<div class="hmm-grid">`;
            if (!filtered.length) {
                html += `<div class="hmm-empty">🔍 沒有找到符合的髮型</div>`;
            } else {
                filtered.forEach(item => {
                    const blocked = isItemBlocked(item);
                    const sel = selectedItems.has(item.id);
                    const cls = `hmm-item-chip${sel ? ' selected' : ''}${blocked ? ' disabled' : ''}`;
                    const hot = HOT_ITEMS.includes(item.id) ? `<span class="hmm-hot-badge">🔥</span>` : '';
                    const rec = recent.includes(item.id) ? `<span class="hmm-recent-badge">📋</span>` : '';
                    const tip = blocked ? ` title="${blocked}"` : '';
                    html += `<div class="${cls}" data-id="${item.id}"${tip}>
                        <span class="hmm-chip-icon">${item.icon}</span>
                        <div class="hmm-chip-text">
                            <span class="hmm-chip-zh">${item.name}</span>
                            <span class="hmm-chip-en">${item.en}</span>
                        </div>${hot}${rec}
                    </div>`;
                });
            }
            html += `</div>`;

            // 預設組合區
            html += renderPresetsSection();

            // 長度推桿（永遠在底部顯示）
            html += renderLengthSlider();

            area.innerHTML = html;

            // 綁定事件：Chip
            area.querySelectorAll('.hmm-item-chip:not(.disabled)').forEach(chip => {
                chip.addEventListener('click', () => {
                    const id = chip.dataset.id;
                    if (selectedItems.has(id)) {
                        selectedItems.delete(id);
                    } else {
                        selectedItems.add(id);
                    }
                    playSelectSound();
                    renderContent();
                });
            });

            // 綁定事件：預設
            area.querySelectorAll('.hmm-preset-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const key = btn.dataset.preset;
                    const preset = PRESETS[key];
                    if (!preset) return;
                    selectedItems.clear();
                    preset.items.forEach(id => selectedItems.add(id));
                    sliderValues.hair_length = preset.length;
                    lengthSliderActive = true;
                    playSelectSound();
                    renderContent();
                });
            });

            // 綁定事件：長度推桿
            bindLengthSlider(area);
        }

        // === 渲染馬尾 Tab（推桿模式）===
        function renderPonytailTab(area) {
            const htSl = SLIDERS.PONYTAIL_HEIGHT;
            const ctSl = SLIDERS.PONYTAIL_COUNT;
            const htVal = sliderValues.ponytail_height;
            const ctVal = sliderValues.ponytail_count;
            const htData = htSl.levels[htVal];
            const ctData = ctSl.levels[ctVal];

            let html = `<div class="hmm-slider-panel">`;

            // 馬尾高度推桿
            html += `<div class="hmm-slider-group">
                <div class="hmm-slider-header">
                    <span class="hmm-slider-label"><span class="hmm-slider-label-icon">${htSl.icon}</span> ${htSl.label} (${htSl.en})</span>
                    <span class="hmm-slider-value" id="hmm-val-pheight">${htData.zh}</span>
                </div>
                <div class="hmm-scale">${htSl.scaleLabels.map(l => `<span${l.includes('🔮') ? ' class="fantasy-label"' : ''}>${l}</span>`).join('')}</div>
                <div class="hmm-slider-wrap">
                    <input type="range" id="hmm-sl-pheight" min="1" max="${Object.keys(htSl.levels).length}" value="${htVal}" step="1">
                </div>
                <div class="hmm-slider-prompt" id="hmm-prompt-pheight"><strong>prompt:</strong> ${htData.positive.join(', ')}</div>
            </div>`;

            // 馬尾數量推桿
            html += `<div class="hmm-slider-group">
                <div class="hmm-slider-header">
                    <span class="hmm-slider-label"><span class="hmm-slider-label-icon">${ctSl.icon}</span> ${ctSl.label} (${ctSl.en})</span>
                    <span class="hmm-slider-value${ctData.fantasy ? ' fantasy' : ''}" id="hmm-val-pcount">${ctData.zh}</span>
                </div>
                <div class="hmm-scale">${ctSl.scaleLabels.map(l => `<span${l.includes('🔮') ? ' class="fantasy-label"' : ''}>${l}</span>`).join('')}</div>
                <div class="hmm-slider-wrap">
                    <input type="range" id="hmm-sl-pcount" min="1" max="${Object.keys(ctSl.levels).length}" value="${ctVal}" step="1"${ctData.fantasy ? ' class="in-fantasy"' : ''}>
                </div>
                <div class="hmm-slider-prompt" id="hmm-prompt-pcount"><strong>prompt:</strong> ${ctData.positive.join(', ')}</div>
            </div>`;

            html += `</div>`;

            // 也顯示馬尾類的 chip
            const ponytailItems = ITEMS.filter(it => it.cat === 'ponytail');
            html += `<div style="padding: 0 20px 14px;"><div class="hmm-grid">`;
            ponytailItems.forEach(item => {
                const blocked = isItemBlocked(item);
                const sel = selectedItems.has(item.id);
                const cls = `hmm-item-chip${sel ? ' selected' : ''}${blocked ? ' disabled' : ''}`;
                html += `<div class="${cls}" data-id="${item.id}">
                    <span class="hmm-chip-icon">${item.icon}</span>
                    <div class="hmm-chip-text">
                        <span class="hmm-chip-zh">${item.name}</span>
                        <span class="hmm-chip-en">${item.en}</span>
                    </div>
                </div>`;
            });
            html += `</div></div>`;

            area.innerHTML = html;

            // 綁定推桿事件
            const slPH = document.getElementById('hmm-sl-pheight');
            const slPC = document.getElementById('hmm-sl-pcount');

            if (slPH) slPH.addEventListener('input', () => {
                sliderValues.ponytail_height = parseInt(slPH.value);
                const d = htSl.levels[slPH.value];
                document.getElementById('hmm-val-pheight').textContent = d.zh;
                document.getElementById('hmm-prompt-pheight').innerHTML = `<strong>prompt:</strong> ${d.positive.join(', ')}`;
                updateFantasyBanner();
            });

            if (slPC) slPC.addEventListener('input', () => {
                sliderValues.ponytail_count = parseInt(slPC.value);
                const d = ctSl.levels[slPC.value];
                document.getElementById('hmm-val-pcount').textContent = d.zh;
                document.getElementById('hmm-val-pcount').classList.toggle('fantasy', d.fantasy);
                slPC.classList.toggle('in-fantasy', d.fantasy);
                document.getElementById('hmm-prompt-pcount').innerHTML = `<strong>prompt:</strong> ${d.positive.join(', ')}`;
                updateFantasyBanner();
            });

            // 綁定 chip 事件
            area.querySelectorAll('.hmm-item-chip:not(.disabled)').forEach(chip => {
                chip.addEventListener('click', () => {
                    const id = chip.dataset.id;
                    if (selectedItems.has(id)) selectedItems.delete(id);
                    else selectedItems.add(id);
                    playSelectSound();
                    renderContent();
                });
            });
        }

        // === 長度推桿（嵌入在 Chip Grid 底部）===
        function renderLengthSlider() {
            const sl = SLIDERS.HAIR_LENGTH;
            const val = sliderValues.hair_length;
            const data = sl.levels[val];

            return `<div class="hmm-slider-panel" style="border-top: 1px solid rgba(148,163,184,.1); margin-top: 10px;">
                <div class="hmm-slider-group">
                    <div class="hmm-slider-header">
                        <span class="hmm-slider-label">
                            <span class="hmm-slider-label-icon">${sl.icon}</span>
                            ${sl.label} (${sl.en})
                            <label style="margin-left:12px;font-size:.7rem;color:#94a3b8;cursor:pointer;">
                                <input type="checkbox" id="hmm-length-toggle" ${lengthSliderActive ? 'checked' : ''} style="accent-color:#a855f7;"> 啟用
                            </label>
                        </span>
                        <span class="hmm-slider-value${data.fantasy ? ' fantasy' : ''}" id="hmm-val-length">${data.zh}</span>
                    </div>
                    <div class="hmm-scale">${sl.scaleLabels.map(l => `<span${l.includes('🔮') ? ' class="fantasy-label"' : ''}>${l}</span>`).join('')}</div>
                    <div class="hmm-slider-wrap">
                        <input type="range" id="hmm-sl-length" min="1" max="7" value="${val}" step="1"${data.fantasy ? ' class="in-fantasy"' : ''}>
                    </div>
                    <div class="hmm-slider-prompt" id="hmm-prompt-length"><strong>prompt:</strong> ${lengthSliderActive ? data.positive.join(', ') : '（未啟用）'}</div>
                </div>
            </div>`;
        }

        function bindLengthSlider(area) {
            const sl = SLIDERS.HAIR_LENGTH;
            const slEl = document.getElementById('hmm-sl-length');
            const toggle = document.getElementById('hmm-length-toggle');

            if (toggle) toggle.addEventListener('change', () => {
                lengthSliderActive = toggle.checked;
                if (lengthSliderActive) {
                    const d = sl.levels[sliderValues.hair_length];
                    document.getElementById('hmm-prompt-length').innerHTML = `<strong>prompt:</strong> ${d.positive.join(', ')}`;
                } else {
                    document.getElementById('hmm-prompt-length').innerHTML = `<strong>prompt:</strong> （未啟用）`;
                }
                updateFantasyBanner();
                // 重新渲染以更新衝突
                renderContent();
            });

            if (slEl) slEl.addEventListener('input', () => {
                // 拖動即啟用：使用者一移動推桿就自動啟用
                if (!lengthSliderActive) {
                    lengthSliderActive = true;
                    if (toggle) toggle.checked = true;
                }
                sliderValues.hair_length = parseInt(slEl.value);
                const d = sl.levels[slEl.value];
                document.getElementById('hmm-val-length').textContent = d.zh;
                document.getElementById('hmm-val-length').classList.toggle('fantasy', d.fantasy);
                slEl.classList.toggle('in-fantasy', d.fantasy);
                document.getElementById('hmm-prompt-length').innerHTML = `<strong>prompt:</strong> ${d.positive.join(', ')}`;
                updateFantasyBanner();
            });
        }

        // === 預設區 ===
        function renderPresetsSection() {
            const presetKeys = Object.keys(PRESETS);
            const genderPresets = presetKeys; // 未來可按性別篩選
            if (!genderPresets.length) return '';

            let html = `<div class="hmm-presets-section">
                <div class="hmm-presets-title">⚡ 快速預設 (Quick Presets)</div>
                <div class="hmm-presets-grid">`;
            genderPresets.forEach(key => {
                const p = PRESETS[key];
                html += `<button class="hmm-preset-btn" data-preset="${key}" title="${p.desc}">${p.label}</button>`;
            });
            html += `</div></div>`;
            return html;
        }

        // === 更新狀態列 ===
        function updateStatus() {
            const selNames = [...selectedItems].map(id => {
                const item = ITEMS.find(it => it.id === id);
                return item ? item.name : id;
            }).join('、');
            const selText = selectedItems.size ? ` | 已選：<b>${selNames}</b>` : '';
            const lengthText = lengthSliderActive ? ` | 長度：<b>${SLIDERS.HAIR_LENGTH.levels[sliderValues.hair_length].zh}</b>` : '';
            document.getElementById('hmm-status').innerHTML =
                `共 ${ITEMS.length} 種髮型${selText}${lengthText}`;
        }

        // === 幻想橫幅 ===
        function updateFantasyBanner() {
            let hasFantasy = false;
            if (lengthSliderActive) {
                const d = SLIDERS.HAIR_LENGTH.levels[sliderValues.hair_length];
                if (d.fantasy) hasFantasy = true;
            }
            const pcData = SLIDERS.PONYTAIL_COUNT.levels[sliderValues.ponytail_count];
            if (pcData && pcData.fantasy) hasFantasy = true;

            document.getElementById('hmm-fantasy-banner').classList.toggle('show', hasFantasy);
        }

        // === 收集所有 prompt ===
        function collectPrompts() {
            let positive = [];
            let negative = [];

            // 長度推桿
            if (lengthSliderActive) {
                const d = SLIDERS.HAIR_LENGTH.levels[sliderValues.hair_length];
                positive.push(...d.positive);
                if (d.negative) negative.push(...d.negative);
            }

            // 馬尾推桿（只有在有合法馬尾項被選中時加入）
            const hasPonytail = [...selectedItems].some(id => {
                const it = ITEMS.find(i => i.id === id);
                return it && it.cat === 'ponytail';
            });
            if (hasPonytail) {
                const htD = SLIDERS.PONYTAIL_HEIGHT.levels[sliderValues.ponytail_height];
                const ctD = SLIDERS.PONYTAIL_COUNT.levels[sliderValues.ponytail_count];
                // 用馬尾數量的 prompt 替代通用馬尾
                positive.push(...ctD.positive);
                // 加入高度描述（但避免重複）
                const heightExtra = htD.positive.filter(p => !ctD.positive.some(cp => cp.includes(p)));
                positive.push(...heightExtra);
                if (htD.negative) negative.push(...htD.negative);
                if (ctD.negative) negative.push(...ctD.negative);
            }

            // Chip 選中的項目
            selectedItems.forEach(id => {
                const item = ITEMS.find(it => it.id === id);
                if (item && !hasPonytail || (item && item.cat !== 'ponytail')) {
                    // 非馬尾類別的 chip 直接加入
                    positive.push(item.value);
                }
            });

            // 去重
            positive = [...new Set(positive)];
            negative = [...new Set(negative)];

            return { positive, negative };
        }

        renderContent();

        // === Close ===
        function closeModal() {
            overlay.style.animation = 'hmm-fadeIn .3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }

        document.getElementById('hmm-cancel').addEventListener('click', closeModal);

        document.getElementById('hmm-apply').addEventListener('click', () => {
            // 儲存進階設定
            state.hairAdvanced = {
                hair_length: lengthSliderActive ? sliderValues.hair_length : null,
                ponytail_height: sliderValues.ponytail_height,
                ponytail_count: sliderValues.ponytail_count,
                selectedItems: [...selectedItems]
            };

            // 將收集的 prompt 存入 state
            const prompts = collectPrompts();
            state.hairMagicPrompts = prompts;

            // 記錄到最近使用
            selectedItems.forEach(id => addRecent(id));

            generatePrompt();
            saveState();
            renderTabContent();
            closeModal();
        });

        overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
        const escH = e => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escH); } };
        document.addEventListener('keydown', escH);
    }

    // === 音效 ===
    function playOpenSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;
            // 類似剪刀剪切的聲音
            const drone = ctx.createOscillator();
            const droneG = ctx.createGain();
            drone.connect(droneG); droneG.connect(ctx.destination);
            drone.type = 'sine';
            drone.frequency.setValueAtTime(120, now);
            drone.frequency.exponentialRampToValueAtTime(220, now + 0.5);
            droneG.gain.setValueAtTime(0, now);
            droneG.gain.linearRampToValueAtTime(0.04, now + 0.15);
            droneG.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
            drone.start(now); drone.stop(now + 0.8);
            [440, 523.25, 659.25, 783.99, 880, 1046.5].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.connect(g); g.connect(ctx.destination);
                osc.type = 'triangle'; osc.frequency.value = freq;
                const t = now + 0.1 + i * 0.08;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.035, t + 0.02);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                osc.start(t); osc.stop(t + 0.3);
            });
        } catch (e) { }
    }

    function playSelectSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;
            [1200, 1800, 2400].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.connect(g); g.connect(ctx.destination);
                osc.type = 'sine'; osc.frequency.value = freq;
                const t = now + i * 0.04;
                g.gain.setValueAtTime(0.035, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
                osc.start(t); osc.stop(t + 0.2);
            });
        } catch (e) { }
    }

    function playDiceSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;
            const rumble = ctx.createOscillator();
            const rumbleG = ctx.createGain();
            rumble.connect(rumbleG); rumbleG.connect(ctx.destination);
            rumble.type = 'sawtooth';
            rumble.frequency.setValueAtTime(80, now);
            rumble.frequency.linearRampToValueAtTime(40, now + 1);
            rumbleG.gain.setValueAtTime(0.08, now);
            rumbleG.gain.linearRampToValueAtTime(0.02, now + 0.8);
            rumbleG.gain.linearRampToValueAtTime(0, now + 1);
            rumble.start(now); rumble.stop(now + 1);
        } catch (e) { }
    }

    return {
        setup,
        openHairMagicModal
    };
})();
