// ============================================================
// magic-modal-base.js — 通用 Magic Modal 基底模組
// 所有 grid-based Magic Modal 的共用邏輯
// 統一使用 mm- CSS prefix
// ============================================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.MagicModalBase = (function () {

    // ============================
    // 共用音效
    // ============================
    function playOpenSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;
            const drone = ctx.createOscillator();
            const droneG = ctx.createGain();
            drone.connect(droneG); droneG.connect(ctx.destination);
            drone.type = 'sine';
            drone.frequency.setValueAtTime(100, now);
            drone.frequency.exponentialRampToValueAtTime(200, now + 0.5);
            droneG.gain.setValueAtTime(0, now);
            droneG.gain.linearRampToValueAtTime(0.05, now + 0.15);
            droneG.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
            drone.start(now); drone.stop(now + 0.8);
            [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.connect(g); g.connect(ctx.destination);
                osc.type = 'triangle'; osc.frequency.value = freq;
                const t = now + 0.1 + i * 0.07;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.04, t + 0.02);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                osc.start(t); osc.stop(t + 0.3);
            });
            [1318.51, 1567.98, 2093].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.connect(g); g.connect(ctx.destination);
                osc.type = 'sine'; osc.frequency.value = freq;
                const t = now + 0.7 + i * 0.03;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.025, t + 0.02);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
                osc.start(t); osc.stop(t + 0.5);
            });
        } catch (e) { console.warn('Sound error:', e); }
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

    function playDiceRollSound() {
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
            for (let i = 0; i < 5; i++) {
                const t = now + i * 0.18 + Math.random() * 0.05;
                const click = ctx.createOscillator();
                const clickG = ctx.createGain();
                click.connect(clickG); clickG.connect(ctx.destination);
                click.type = 'square';
                click.frequency.setValueAtTime(800 + Math.random() * 600, t);
                click.frequency.exponentialRampToValueAtTime(200, t + 0.04);
                clickG.gain.setValueAtTime(0.06, t);
                clickG.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
                click.start(t); click.stop(t + 0.06);
            }
        } catch (e) { }
    }

    // ============================
    // 最近使用管理
    // ============================
    function getRecent(key) {
        try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
    }

    function addRecent(key, id, max) {
        max = max || 10;
        let recent = getRecent(key).filter(r => r !== id);
        recent.unshift(id);
        if (recent.length > max) recent = recent.slice(0, max);
        localStorage.setItem(key, JSON.stringify(recent));
    }

    // ============================
    // createModal — 通用 modal 工廠函式（統一使用 mm- prefix）
    // ============================
    function createModal(config) {
        const deps = config.deps;
        const state = deps.state;
        const selectOption = deps.selectOption;
        const generatePrompt = deps.generatePrompt;
        const saveState = deps.saveState;
        const renderTabContent = deps.renderTabContent;

        const catField = config.catField || 'cat';
        const idField = config.idField || 'en';
        const hasBonus = config.hasBonus !== false;
        const hasClearBtn = config.hasClearBtn || false;
        const hasIcon = config.hasIcon !== false;
        const particleColors = config.particleColors || ['#fbbf24', '#a855f7', '#7c3aed', '#f59e0b', '#c084fc', '#fff', '#e879f9'];
        const particleCount = config.particleCount || 40;
        const meteorCount = config.meteorCount || 4;
        const magicCircleText = config.magicCircleText || '✦ MAGIC ✦';
        const emptyText = config.emptyText || '🔍 沒有找到符合的項目';
        const applyText = config.applyText || '✨ 套用';
        const bonusTitle = config.bonusTitle || '⭐ 點選增加特徵 —';

        // 讀取資料
        const rawData = config.getData();
        const CATEGORIES = rawData.CATEGORIES || rawData.TABS;
        const HOT_ITEMS_LIST = rawData.HOT_ITEMS || [];
        const BONUS_TRAITS = hasBonus ? (rawData.BONUS_TRAITS || {}) : {};

        // 建構 items
        let ITEMS;
        if (config.buildItems) {
            ITEMS = config.buildItems(rawData);
        } else if (rawData.ITEMS) {
            ITEMS = rawData.ITEMS.map(item => ({
                ...item,
                isHot: HOT_ITEMS_LIST.includes(item[idField] || item.id)
            }));
        } else if (deps.rawData) {
            ITEMS = deps.rawData.map(r => ({
                ...r,
                [catField]: rawData.autoClassify ? rawData.autoClassify(r.en) : r[catField],
                icon: rawData.getIcon ? rawData.getIcon(r.en) : (r.icon || ''),
                isHot: HOT_ITEMS_LIST.includes(r[idField] || r.en)
            }));
        } else {
            ITEMS = [];
        }

        // 移除舊的
        const existing = document.getElementById(config.modalId);
        if (existing) existing.remove();

        let selectedItem = null;
        let selectedBonuses = new Map();
        let activeCat = 'hot';
        let searchQuery = '';
        let filterLetter = null;

        // 如果有已存的 advanced 狀態，預選
        if (config.restoreSelection) {
            const restored = config.restoreSelection(ITEMS, state);
            if (restored) {
                if (restored.selectedItem) selectedItem = restored.selectedItem;
                if (restored.selectedBonuses) selectedBonuses = restored.selectedBonuses;
            }
        }

        // === 建立 HTML（統一 mm- prefix）===
        const clearBtnHtml = hasClearBtn ? `<button class="mm-tool-btn mm-clear-btn" id="mm-clear" title="清除選取"><span class="mm-tool-icon">🗑️</span> 清除</button>` : '';
        const bonusHtml = hasBonus ? `
      <div class="mm-bonus" id="mm-bonus">
        <div class="mm-bonus-title">${bonusTitle} <span id="mm-bonus-name"></span></div>
        <div class="mm-bonus-tags" id="mm-bonus-tags"></div>
      </div>` : '';

        const overlay = document.createElement('div');
        overlay.id = config.modalId;
        overlay.className = 'mm-overlay';
        overlay.innerHTML = `
    <div class="mm-flash"></div>
    <div class="mm-magic-circle">
      <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="#a855f7" stroke-width=".5"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#7c3aed" stroke-width=".3"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#c084fc" stroke-width=".3"/>
      <polygon points="100,15 178,145 22,145" fill="none" stroke="#a855f7" stroke-width=".4"/>
      <polygon points="100,185 22,55 178,55" fill="none" stroke="#7c3aed" stroke-width=".4"/>
      <text x="100" y="105" text-anchor="middle" fill="#a855f7" font-size="8" opacity=".4">${magicCircleText}</text></svg>
    </div>
    <div class="mm-particles" id="mm-particles"></div>
    <div class="mm-container">
      <div class="mm-dice-overlay" id="mm-dice-overlay">
        <span class="mm-dice-emoji" id="mm-dice-emoji">🎲</span>
      </div>
      <div class="mm-header">
        <div class="mm-title-row">
          <div class="mm-title">${config.title}</div>
          <div class="mm-toolbar">
            <button class="mm-tool-btn" id="mm-dice" title="隨機選取"><span class="mm-tool-icon">🎲</span> 隨機</button>
            ${clearBtnHtml}
          </div>
        </div>
        <div class="mm-search-row">
          <div class="mm-search-wrap">
            <i class="fa-solid fa-magnifying-glass mm-search-icon"></i>
            <input type="text" class="mm-search" id="mm-search" placeholder="${config.searchPlaceholder}">
          </div>
        </div>
      </div>
      <div class="mm-tabs" id="mm-tabs"></div>
      <div class="mm-body">
        <div class="mm-main">
          <div class="mm-grid-wrap" id="mm-grid-wrap"><div class="mm-grid" id="mm-grid"></div></div>
        </div>
        <div class="mm-az" id="mm-az"></div>
      </div>
      ${bonusHtml}
      <div class="mm-footer">
        <div class="mm-status" id="mm-status"></div>
        <div class="mm-actions">
          <button class="mm-btn mm-btn-cancel" id="mm-cancel">❌ 取消</button>
          <button class="mm-btn mm-btn-apply" id="mm-apply">${applyText}</button>
        </div>
      </div>
    </div>
  `;
        document.body.appendChild(overlay);

        // === Particles ===
        const pc = document.getElementById('mm-particles');
        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.className = 'mm-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 4 + 's';
            p.style.animationDuration = (3 + Math.random() * 4) + 's';
            p.style.background = particleColors[Math.floor(Math.random() * particleColors.length)];
            const s = 2 + Math.random() * 4;
            p.style.width = p.style.height = s + 'px';
            p.style.boxShadow = `0 0 ${s * 2}px ${p.style.background}`;
            pc.appendChild(p);
        }

        // === Meteors ===
        for (let i = 0; i < meteorCount; i++) {
            const m = document.createElement('div');
            m.className = 'mm-meteor';
            m.style.top = (Math.random() * 30) + '%';
            m.style.left = (50 + Math.random() * 50) + '%';
            m.style.animationDelay = (0.5 + Math.random() * 3) + 's';
            m.style.animationDuration = (1 + Math.random() * 1.5) + 's';
            overlay.appendChild(m);
        }

        playOpenSound();

        // === Tabs ===
        const tabsEl = document.getElementById('mm-tabs');
        CATEGORIES.forEach(c => {
            let count;
            if (c.id === 'all') count = ITEMS.length;
            else if (c.id === 'hot') count = HOT_ITEMS_LIST.length;
            else if (c.id === 'recent') count = getRecent(config.recentKey).length;
            else count = ITEMS.filter(r => r[catField] === c.id || r.category === c.id).length;

            const tab = document.createElement('div');
            tab.className = 'mm-tab' + (c.id === activeCat ? ' active' : '');
            tab.dataset.cat = c.id;
            tab.innerHTML = `<span class="mm-tab-icon">${c.icon}</span><span class="mm-tab-zh">${c.label}</span><span class="mm-tab-en">${c.en}</span><span class="mm-tab-count">${count}</span>`;
            tab.addEventListener('click', () => {
                activeCat = c.id;
                filterLetter = null;
                document.getElementById('mm-az').querySelectorAll('.mm-az-letter').forEach(l => l.classList.remove('active'));
                tabsEl.querySelectorAll('.mm-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderGrid();
            });
            tabsEl.appendChild(tab);
        });

        // === A-Z ===
        const azEl = document.getElementById('mm-az');
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const el = document.createElement('div');
            el.className = 'mm-az-letter';
            el.textContent = letter;
            el.addEventListener('click', () => {
                filterLetter = letter;
                searchQuery = '';
                document.getElementById('mm-search').value = '';
                activeCat = 'all';
                tabsEl.querySelectorAll('.mm-tab').forEach(t => t.classList.remove('active'));
                tabsEl.querySelector('.mm-tab').classList.add('active');
                azEl.querySelectorAll('.mm-az-letter').forEach(l => l.classList.remove('active'));
                el.classList.add('active');
                renderGrid();
            });
            azEl.appendChild(el);
        });

        // === Search ===
        document.getElementById('mm-search').addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            filterLetter = null;
            azEl.querySelectorAll('.mm-az-letter').forEach(l => l.classList.remove('active'));
            renderGrid();
        });

        // === 🎲 隨機選取（完整動畫流程）===
        let diceAnimating = false;
        document.getElementById('mm-dice').addEventListener('click', function () {
            if (diceAnimating) return;
            diceAnimating = true;

            const overlayDice = document.getElementById('mm-dice-overlay');
            const diceEl = document.getElementById('mm-dice-emoji');
            const btn = this;

            btn.classList.add('mm-dice-spinning');
            diceEl.className = 'mm-dice-emoji';
            void diceEl.offsetWidth;
            overlayDice.classList.add('active');
            playDiceRollSound();

            setTimeout(() => {
                diceEl.classList.add('rolling');
            }, 400);

            setTimeout(() => {
                diceEl.classList.remove('rolling');
                diceEl.classList.add('exit');

                const randomItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
                selectedItem = randomItem;
                selectedBonuses.clear();

                const itemCat = randomItem[catField] || randomItem.category;
                activeCat = itemCat;
                filterLetter = null;
                tabsEl.querySelectorAll('.mm-tab').forEach(t => t.classList.remove('active'));
                const targetTab = tabsEl.querySelector(`[data-cat="${itemCat}"]`);
                if (targetTab) targetTab.classList.add('active');

                playSelectSound();
                renderGrid();
                if (hasBonus) renderBonus(randomItem);

                setTimeout(() => {
                    const selectedEl = document.querySelector('.mm-chip.selected');
                    if (selectedEl) {
                        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        selectedEl.classList.add('random-pick');
                    }
                }, 80);

                setTimeout(() => {
                    overlayDice.classList.remove('active');
                    btn.classList.remove('mm-dice-spinning');
                    diceAnimating = false;
                }, 350);

            }, 1400);
        });

        // === 🗑️ 清除按鈕（如果有）===
        if (hasClearBtn) {
            const clearBtn = document.getElementById('mm-clear');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    selectedItem = null;
                    selectedBonuses.clear();
                    renderGrid();
                    if (hasBonus) renderBonus(null);
                });
            }
        }

        renderGrid();

        // 如果有預存的選取，顯示 bonus
        if (selectedItem && hasBonus) renderBonus(selectedItem);

        // === Close ===
        function closeModal() {
            overlay.style.animation = 'mm-fadeIn .3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }
        document.getElementById('mm-cancel').addEventListener('click', closeModal);

        // === Apply ===
        document.getElementById('mm-apply').addEventListener('click', () => {
            if (config.onApply) {
                config.onApply(selectedItem, selectedBonuses, closeModal);
            } else {
                // 標準套用邏輯
                if (selectedItem) {
                    addRecent(config.recentKey, selectedItem[idField] || selectedItem.id, config.recentMax);
                    const recentTab = tabsEl.querySelector('[data-cat="recent"]');
                    if (recentTab) {
                        recentTab.querySelector('.mm-tab-count').textContent = getRecent(config.recentKey).length;
                    }
                    selectOption(config.stateKey, selectedItem.value, { label: selectedItem.label, en: selectedItem.en, value: selectedItem.value });
                    const bonusEn = [...selectedBonuses.keys()];
                    const bonusZh = [...selectedBonuses.values()];
                    if (hasBonus && bonusEn.length) {
                        const advObj = {
                            bonusTraits: bonusEn,
                            bonusTraitsZh: bonusZh
                        };
                        if (idField === 'id') {
                            advObj.selectedScene = { id: selectedItem.id, label: selectedItem.label, en: selectedItem.en, value: selectedItem.value };
                        } else {
                            advObj['selected' + config.stateKey.charAt(0).toUpperCase() + config.stateKey.slice(1)] = { label: selectedItem.label, en: selectedItem.en, value: selectedItem.value };
                        }
                        state[config.advancedKey] = advObj;
                    } else if (hasBonus) {
                        delete state[config.advancedKey];
                    }
                    generatePrompt();
                    saveState();
                    renderTabContent();
                }
                closeModal();
            }
        });
        overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
        const escH = e => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escH); } };
        document.addEventListener('keydown', escH);

        // === 篩選邏輯 ===
        function getFilteredItems() {
            let filtered = ITEMS;
            const recent = getRecent(config.recentKey);

            if (activeCat === 'recent') {
                filtered = recent.map(id => ITEMS.find(r => (r[idField] || r.id) === id)).filter(Boolean);
            } else if (activeCat === 'hot') {
                filtered = ITEMS.filter(r => r.isHot);
            } else if (activeCat !== 'all') {
                filtered = filtered.filter(r => (r[catField] === activeCat) || (r.category === activeCat));
            }

            if (searchQuery) {
                filtered = filtered.filter(r =>
                    r.label.includes(searchQuery) || r.en.toLowerCase().includes(searchQuery) || r.value.toLowerCase().includes(searchQuery)
                );
            }
            if (filterLetter) {
                filtered = filtered.filter(r => r.en.charAt(0).toUpperCase() === filterLetter);
            }
            return filtered;
        }

        // === renderGrid ===
        function renderGrid() {
            const grid = document.getElementById('mm-grid');
            const filtered = getFilteredItems();
            const recent = getRecent(config.recentKey);
            const total = ITEMS.length;
            const shown = filtered.length;
            const itemId = idField;

            let selText = '';
            if (selectedItem) {
                const iconPart = (hasIcon && selectedItem.icon) ? selectedItem.icon + ' ' : '';
                selText = ` | 已選：<b>${iconPart}${selectedItem.label}</b>`;
            }
            document.getElementById('mm-status').innerHTML = `已載入 ${total} ${config.itemLabel} | 顯示 ${shown}/${total}${selText}`;

            grid.innerHTML = '';
            if (!filtered.length) {
                grid.innerHTML = `<div class="mm-empty">${emptyText}</div>`;
                return;
            }

            filtered.forEach(item => {
                const chip = document.createElement('div');
                const itemIdVal = item[itemId] || item.id;
                const selIdVal = selectedItem ? (selectedItem[itemId] || selectedItem.id) : null;
                chip.className = 'mm-chip' + (selectedItem && selIdVal === itemIdVal ? ' selected' : '');

                const iconHtml = hasIcon ? `<span class="mm-chip-icon">${item.icon || ''}</span>` : '';
                const hotBadge = item.isHot ? `<span class="mm-hot-badge">🔥</span>` : '';
                const recentBadge = recent.includes(itemIdVal) ? `<span class="mm-recent-badge">📋</span>` : '';

                chip.innerHTML = `
                    ${iconHtml}
                    <div class="mm-chip-text">
                        <span class="mm-chip-zh">${item.label}</span>
                        <span class="mm-chip-en">${item.en}</span>
                    </div>
                    ${hotBadge}
                    ${recentBadge}
                `;
                chip.addEventListener('click', () => {
                    const cItemIdVal = item[itemId] || item.id;
                    const cSelIdVal = selectedItem ? (selectedItem[itemId] || selectedItem.id) : null;
                    if (selectedItem && cSelIdVal === cItemIdVal) {
                        selectedItem = null;
                        selectedBonuses.clear();
                    } else {
                        selectedItem = item;
                        selectedBonuses.clear();
                    }
                    playSelectSound();
                    renderGrid();
                    if (hasBonus) renderBonus(selectedItem);
                });
                grid.appendChild(chip);
            });

            document.getElementById('mm-grid-wrap').scrollTop = 0;
        }

        // === renderBonus ===
        function renderBonus(item) {
            if (!hasBonus) return;
            const panel = document.getElementById('mm-bonus');
            const tagsEl = document.getElementById('mm-bonus-tags');
            const nameEl = document.getElementById('mm-bonus-name');
            if (!item) { panel.classList.remove('show'); return; }
            const itemCat = item[catField] || item.category;
            const traits = BONUS_TRAITS[itemCat] || [];
            if (!traits.length) { panel.classList.remove('show'); return; }
            const iconPart = item.icon ? item.icon + ' ' : '';
            nameEl.textContent = iconPart + item.label + ' ' + item.en;
            tagsEl.innerHTML = '';
            traits.forEach(trait => {
                const tag = document.createElement('button');
                tag.className = 'mm-bonus-tag' + (selectedBonuses.has(trait.en) ? ' active' : '');
                tag.innerHTML = `<span class="mm-chip-icon">${trait.icon}</span> ${trait.zh}`;
                tag.addEventListener('click', () => {
                    if (selectedBonuses.has(trait.en)) selectedBonuses.delete(trait.en);
                    else selectedBonuses.set(trait.en, trait.zh);
                    tag.classList.toggle('active');
                });
                tagsEl.appendChild(tag);
            });
            panel.classList.add('show');
        }
    }

    return {
        createModal,
        playOpenSound,
        playSelectSound,
        playDiceRollSound,
        getRecent,
        addRecent
    };
})();
