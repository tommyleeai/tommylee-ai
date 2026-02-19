// ============================================
// AI Prompt Generator — Hand Items Magic Modal
// openHandItemsMagicModal() 函式
// 模組化自 headwear-magic-modal.js 模版
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.HandItemsMagicModal = (function () {
    // Dependencies injected via setup()
    let state, sfx, HAND_ITEMS_RAW, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        HAND_ITEMS_RAW = deps.HAND_ITEMS;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    // === 讀取外部資料 ===
    function getData() {
        return window.PromptGen.HandItemsMagicData || {};
    }

    // === 📋 最近使用（localStorage）===
    const RECENT_KEY = 'him_recent_handItems';
    function getRecentItems() {
        try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; }
    }
    function addRecentItem(id) {
        let recent = getRecentItems().filter(r => r !== id);
        recent.unshift(id);
        if (recent.length > 10) recent = recent.slice(0, 10);
        localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    }

    // ========================================
    // openHandItemsMagicModal — 主函式
    // ========================================
    function openHandItemsMagicModal() {
        const data = getData();
        const CATEGORIES = data.CATEGORIES || [];
        const ITEMS = data.ITEMS || [];
        const HOT_ITEMS = data.HOT_ITEMS || [];
        const BONUS_TRAITS = data.BONUS_TRAITS || {};

        // 加入熱門標記
        const items = ITEMS.map(item => ({
            ...item,
            isHot: HOT_ITEMS.includes(item.id)
        }));

        const existing = document.getElementById('hand-items-magic-modal');
        if (existing) existing.remove();

        let selectedItem = null;
        let selectedBonuses = new Map();
        let activeCat = 'hot';
        let searchQuery = '';
        let filterLetter = null;

        const overlay = document.createElement('div');
        overlay.id = 'hand-items-magic-modal';
        overlay.innerHTML = `
    <div class="him-flash"></div>
    <div class="him-magic-circle">
      <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="#a855f7" stroke-width=".5"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#7c3aed" stroke-width=".3"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#c084fc" stroke-width=".3"/>
      <polygon points="100,15 178,145 22,145" fill="none" stroke="#a855f7" stroke-width=".4"/>
      <polygon points="100,185 22,55 178,55" fill="none" stroke="#7c3aed" stroke-width=".4"/>
      <text x="100" y="105" text-anchor="middle" fill="#a855f7" font-size="8" opacity=".4">✦ MAGIC ✦</text></svg>
    </div>
    <div class="him-particles" id="him-particles"></div>
    <div class="him-container">
      <div class="him-dice-overlay" id="him-dice-overlay">
        <span class="him-dice-emoji" id="him-dice-emoji">🎲</span>
      </div>
      <div class="him-header">
        <div class="him-title-row">
          <div class="him-title">🖐️ 高級魔法・手持物件大全</div>
          <div class="him-toolbar">
            <button class="him-tool-btn" id="him-dice" title="隨機選取"><span class="him-tool-icon">🎲</span> 隨機</button>
          </div>
        </div>
        <div class="him-search-row">
          <div class="him-search-wrap">
            <i class="fa-solid fa-magnifying-glass him-search-icon"></i>
            <input type="text" class="him-search" id="him-search" placeholder="搜尋手持物件 Search hand items...">
          </div>
        </div>
      </div>
      <div class="him-tabs" id="him-tabs"></div>
      <div class="him-body">
        <div class="him-main">
          <div class="him-grid-wrap" id="him-grid-wrap"><div class="him-grid" id="him-grid"></div></div>
        </div>
        <div class="him-az" id="him-az"></div>
      </div>
      <div class="him-bonus" id="him-bonus">
        <div class="him-bonus-title">⭐ 點選增加特徵 — <span id="him-bonus-name"></span></div>
        <div class="him-bonus-tags" id="him-bonus-tags"></div>
      </div>
      <div class="him-footer">
        <div class="him-status" id="him-status"></div>
        <div class="him-actions">
          <button class="him-btn him-btn-cancel" id="him-cancel">❌ 取消</button>
          <button class="him-btn him-btn-apply" id="him-apply">✨ 套用</button>
        </div>
      </div>
    </div>
  `;
        document.body.appendChild(overlay);

        // === Particles ===
        const pc = document.getElementById('him-particles');
        const colors = ['#fbbf24', '#a855f7', '#7c3aed', '#f59e0b', '#c084fc', '#fff', '#e879f9'];
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'him-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 4 + 's';
            p.style.animationDuration = (3 + Math.random() * 4) + 's';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            const s = 2 + Math.random() * 4;
            p.style.width = p.style.height = s + 'px';
            p.style.boxShadow = `0 0 ${s * 2}px ${p.style.background}`;
            pc.appendChild(p);
        }

        // === Meteors ===
        for (let i = 0; i < 4; i++) {
            const m = document.createElement('div');
            m.className = 'him-meteor';
            m.style.top = (Math.random() * 30) + '%';
            m.style.left = (50 + Math.random() * 50) + '%';
            m.style.animationDelay = (0.5 + Math.random() * 3) + 's';
            m.style.animationDuration = (1 + Math.random() * 1.5) + 's';
            overlay.appendChild(m);
        }

        playOpenSound();

        // === Tabs ===
        const tabsEl = document.getElementById('him-tabs');
        CATEGORIES.forEach(c => {
            let count;
            if (c.id === 'all') count = items.length;
            else if (c.id === 'hot') count = HOT_ITEMS.length;
            else if (c.id === 'recent') count = getRecentItems().length;
            else count = items.filter(o => o.cat === c.id).length;

            const tab = document.createElement('div');
            tab.className = 'him-tab' + (c.id === activeCat ? ' active' : '');
            tab.dataset.cat = c.id;
            tab.innerHTML = `<span class="him-tab-icon">${c.icon}</span><span class="him-tab-label">${c.label}<br>${c.en}</span><span class="him-tab-count">${count}</span>`;
            tab.addEventListener('click', () => {
                activeCat = c.id;
                filterLetter = null;
                document.getElementById('him-az').querySelectorAll('.him-az-letter').forEach(l => l.classList.remove('active'));
                tabsEl.querySelectorAll('.him-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderGrid();
            });
            tabsEl.appendChild(tab);
        });

        // === A-Z ===
        const azEl = document.getElementById('him-az');
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const el = document.createElement('div');
            el.className = 'him-az-letter';
            el.textContent = letter;
            el.addEventListener('click', () => {
                filterLetter = letter;
                searchQuery = '';
                document.getElementById('him-search').value = '';
                activeCat = 'all';
                tabsEl.querySelectorAll('.him-tab').forEach(t => t.classList.remove('active'));
                tabsEl.querySelector('.him-tab').classList.add('active');
                azEl.querySelectorAll('.him-az-letter').forEach(l => l.classList.remove('active'));
                el.classList.add('active');
                renderGrid();
            });
            azEl.appendChild(el);
        });

        // === Search ===
        document.getElementById('him-search').addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            filterLetter = null;
            azEl.querySelectorAll('.him-az-letter').forEach(l => l.classList.remove('active'));
            renderGrid();
        });

        // === 🎲 骰子滾動音效 ===
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

        // === 🎲 隨機選取（完整動畫流程）===
        let diceAnimating = false;
        document.getElementById('him-dice').addEventListener('click', function () {
            if (diceAnimating) return;
            diceAnimating = true;

            const overlayDice = document.getElementById('him-dice-overlay');
            const diceEl = document.getElementById('him-dice-emoji');
            const btn = this;

            btn.classList.add('him-dice-spinning');
            diceEl.className = 'him-dice-emoji';
            void diceEl.offsetWidth;
            overlayDice.classList.add('active');
            playDiceRollSound();

            setTimeout(() => {
                diceEl.classList.add('rolling');
            }, 400);

            setTimeout(() => {
                diceEl.classList.remove('rolling');
                diceEl.classList.add('exit');

                const randomItem = items[Math.floor(Math.random() * items.length)];
                selectedItem = randomItem;
                selectedBonuses.clear();

                activeCat = randomItem.cat;
                filterLetter = null;
                tabsEl.querySelectorAll('.him-tab').forEach(t => t.classList.remove('active'));
                const targetTab = tabsEl.querySelector(`[data-cat="${randomItem.cat}"]`);
                if (targetTab) targetTab.classList.add('active');

                playSelectSound();
                renderGrid();
                renderBonus(randomItem);

                setTimeout(() => {
                    const selectedEl = document.querySelector('.him-race-chip.selected');
                    if (selectedEl) {
                        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        selectedEl.classList.add('random-pick');
                    }
                }, 80);

                setTimeout(() => {
                    overlayDice.classList.remove('active');
                    btn.classList.remove('him-dice-spinning');
                    diceAnimating = false;
                }, 350);

            }, 1400);
        });

        renderGrid();

        // === Close ===
        function closeModal() {
            overlay.style.animation = 'him-fadeIn .3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }
        document.getElementById('him-cancel').addEventListener('click', closeModal);
        document.getElementById('him-apply').addEventListener('click', () => {
            if (selectedItem) {
                addRecentItem(selectedItem.id);
                // 更新 Recent tab 計數
                const recentTab = tabsEl.querySelector('[data-cat="recent"]');
                if (recentTab) {
                    recentTab.querySelector('.him-tab-count').textContent = getRecentItems().length;
                }
                // ★ 整合關鍵：呼叫主頁面的 selectOption 更新手持物件選擇
                selectOption('handItems', selectedItem.value, { label: selectedItem.name, en: selectedItem.en, value: selectedItem.value });
                // 如果有加分特徵，存入 state.handItemsAdvanced
                const bonusArr = [...selectedBonuses.keys()];
                const bonusZhArr = [...selectedBonuses.values()];
                if (bonusArr.length) {
                    state.handItemsAdvanced = {
                        selectedItem: selectedItem.name + ' ' + selectedItem.en,
                        bonusTraits: bonusArr,
                        bonusTraitsZh: bonusZhArr
                    };
                }
                generatePrompt();
                saveState();
                renderTabContent();
            }
            closeModal();
        });
        overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
        const escH = e => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escH); } };
        document.addEventListener('keydown', escH);

        // === 取得篩選後的手持物件 ===
        function getFilteredItems() {
            let filtered = items;
            const recent = getRecentItems();

            if (activeCat === 'recent') {
                filtered = recent.map(id => items.find(o => o.id === id)).filter(Boolean);
            } else if (activeCat === 'hot') {
                filtered = items.filter(o => o.isHot);
            } else if (activeCat !== 'all') {
                filtered = filtered.filter(o => o.cat === activeCat);
            }

            if (searchQuery) {
                filtered = filtered.filter(o =>
                    o.name.includes(searchQuery) || o.en.toLowerCase().includes(searchQuery) || o.value.toLowerCase().includes(searchQuery)
                );
            }
            if (filterLetter) {
                filtered = filtered.filter(o => o.en.charAt(0).toUpperCase() === filterLetter);
            }
            return filtered;
        }

        function renderGrid() {
            const grid = document.getElementById('him-grid');
            const filtered = getFilteredItems();
            const recent = getRecentItems();
            const total = items.length;
            const shown = filtered.length;
            const selText = selectedItem ? ` | 已選：<b>${selectedItem.name}</b>` : '';
            document.getElementById('him-status').innerHTML = `已載入 ${total} 手持物件 | 顯示 ${shown}/${total}${selText}`;

            grid.innerHTML = '';
            if (!filtered.length) {
                grid.innerHTML = '<div class="him-empty">🔍 沒有找到符合的手持物件</div>';
                return;
            }

            filtered.forEach(item => {
                const chip = document.createElement('div');
                chip.className = 'him-race-chip' + (selectedItem && selectedItem.id === item.id ? ' selected' : '');
                chip.innerHTML = `
                    <span class="him-chip-icon">${item.icon}</span>
                    <div class="him-chip-text">
                        <span class="him-chip-zh">${item.name}</span>
                        <span class="him-chip-en">${item.en}</span>
                    </div>
                    ${item.isHot ? '<span class="him-hot-badge">🔥</span>' : ''}
                    ${recent.includes(item.id) ? '<span class="him-recent-badge">📋</span>' : ''}
                `;
                chip.addEventListener('click', () => {
                    if (selectedItem && selectedItem.id === item.id) {
                        selectedItem = null;
                        selectedBonuses.clear();
                    } else {
                        selectedItem = item;
                        selectedBonuses.clear();
                    }
                    playSelectSound();
                    renderGrid();
                    renderBonus(selectedItem);
                });
                grid.appendChild(chip);
            });

            document.getElementById('him-grid-wrap').scrollTop = 0;
        }

        function renderBonus(item) {
            const panel = document.getElementById('him-bonus');
            const tagsEl = document.getElementById('him-bonus-tags');
            const nameEl = document.getElementById('him-bonus-name');
            if (!item) { panel.classList.remove('show'); return; }
            const traits = BONUS_TRAITS[item.cat] || [];
            if (!traits.length) { panel.classList.remove('show'); return; }
            nameEl.textContent = item.name + ' ' + item.en;
            tagsEl.innerHTML = '';
            traits.forEach(trait => {
                const tag = document.createElement('button');
                tag.className = 'him-bonus-tag' + (selectedBonuses.has(trait.en) ? ' active' : '');
                tag.innerHTML = `<span class="him-chip-icon">${trait.icon}</span> ${trait.zh}`;
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

    // === 音效 ===
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

    return {
        setup,
        openHandItemsMagicModal
    };
})();
