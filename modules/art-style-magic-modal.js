// ============================================================
// art-style-magic-modal.js — 藝術風格 Magic Modal
// v7.5 — A 型架構（Grid + 無 Bonus）
// CSS 前綴: smm- （共用 style-magic-modal.css）
// ============================================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.ArtStyleMagicModal = (function () {
    let state, sfx, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function getData() {
        return window.PromptGen.ArtStyleMagicData || {};
    }

    const RECENT_KEY = 'arsmm_recent';
    function getRecentItems() {
        try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; }
    }
    function addRecentItem(id) {
        let recent = getRecentItems().filter(r => r !== id);
        recent.unshift(id);
        if (recent.length > 10) recent = recent.slice(0, 10);
        localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    }

    function openArtStyleMagicModal() {
        const data = getData();
        const TABS = data.TABS || [];
        const ITEMS = data.ITEMS || [];
        const HOT_ITEMS = data.HOT_ITEMS || [];

        const items = ITEMS.map(item => ({
            ...item,
            isHot: HOT_ITEMS.includes(item.id)
        }));

        const existing = document.getElementById('arsmm-modal');
        if (existing) existing.remove();

        let selectedItem = null;
        let activeTab = 'hot';
        let searchQuery = '';
        let filterLetter = null;

        if (state.artStyleAdvanced) {
            const found = items.find(i => i.value === state.artStyleAdvanced.selectedValue);
            if (found) selectedItem = found;
        }

        const overlay = document.createElement('div');
        overlay.id = 'arsmm-modal';
        overlay.className = 'smm-overlay';
        overlay.innerHTML = `
    <div class="smm-flash"></div>
    <div class="smm-magic-circle">
      <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="#f59e0b" stroke-width=".5"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#d97706" stroke-width=".3"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#fbbf24" stroke-width=".3"/>
      <polygon points="100,15 178,145 22,145" fill="none" stroke="#f59e0b" stroke-width=".4"/>
      <polygon points="100,185 22,55 178,55" fill="none" stroke="#d97706" stroke-width=".4"/>
      <text x="100" y="105" text-anchor="middle" fill="#f59e0b" font-size="8" opacity=".4">✦ ART ✦</text></svg>
    </div>
    <div class="smm-particles" id="arsmm-particles"></div>
    <div class="smm-container">
      <div class="smm-dice-overlay" id="arsmm-dice-overlay">
        <span class="smm-dice-emoji" id="arsmm-dice-emoji">🎲</span>
      </div>
      <div class="smm-header">
        <div class="smm-title-row">
          <div class="smm-title">🎨 高級魔法・藝術風格大全</div>
          <div class="smm-toolbar">
            <button class="smm-tool-btn" id="arsmm-dice" title="隨機選取"><span class="smm-tool-icon">🎲</span> 隨機</button>
          </div>
        </div>
        <div class="smm-search-row">
          <div class="smm-search-wrap">
            <span class="smm-search-icon">🔍</span>
            <input type="text" class="smm-search" id="arsmm-search" placeholder="搜尋藝術風格 Search art style...">
          </div>
        </div>
      </div>
      <div class="smm-tabs" id="arsmm-tabs"></div>
      <div class="smm-body">
        <div class="smm-main">
          <div class="smm-grid-wrap" id="arsmm-grid-wrap"><div class="smm-grid" id="arsmm-grid"></div></div>
        </div>
        <div class="smm-az" id="arsmm-az"></div>
      </div>
      <div class="smm-footer">
        <div class="smm-status" id="arsmm-status"></div>
        <div class="smm-actions">
          <button class="smm-btn smm-btn-cancel" id="arsmm-cancel">❌ 取消</button>
          <button class="smm-btn smm-btn-apply" id="arsmm-apply">✨ 套用魔法</button>
        </div>
      </div>
    </div>
  `;
        document.body.appendChild(overlay);

        // Particles
        const pc = document.getElementById('arsmm-particles');
        const colors = ['#fbbf24', '#f59e0b', '#d97706', '#eab308', '#a3e635', '#fff', '#fcd34d'];
        for (let i = 0; i < 35; i++) {
            const p = document.createElement('div');
            p.className = 'smm-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 4 + 's';
            p.style.animationDuration = (3 + Math.random() * 4) + 's';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            const s = 2 + Math.random() * 4;
            p.style.width = p.style.height = s + 'px';
            p.style.boxShadow = `0 0 ${s * 2}px ${p.style.background}`;
            pc.appendChild(p);
        }
        for (let i = 0; i < 3; i++) {
            const m = document.createElement('div');
            m.className = 'smm-meteor';
            m.style.top = (Math.random() * 30) + '%';
            m.style.left = (50 + Math.random() * 50) + '%';
            m.style.animationDelay = (0.5 + Math.random() * 3) + 's';
            m.style.animationDuration = (1 + Math.random() * 1.5) + 's';
            overlay.appendChild(m);
        }

        playOpenSound();

        // Tabs
        const tabsEl = document.getElementById('arsmm-tabs');
        TABS.forEach(tab => {
            let count;
            if (tab.id === 'all') count = items.length;
            else if (tab.id === 'hot') count = HOT_ITEMS.length;
            else if (tab.id === 'recent') count = getRecentItems().length;
            else count = items.filter(o => o.category === tab.id).length;

            const el = document.createElement('div');
            el.className = 'smm-tab' + (tab.id === activeTab ? ' active' : '');
            el.dataset.cat = tab.id;
            el.innerHTML = `<span class="smm-tab-icon">${tab.icon}</span><span class="smm-tab-zh">${tab.label}</span><span class="smm-tab-en">${tab.en}</span><span class="smm-tab-count">${count}</span>`;
            el.addEventListener('click', () => {
                activeTab = tab.id;
                filterLetter = null;
                document.getElementById('arsmm-az').querySelectorAll('.smm-az-letter').forEach(l => l.classList.remove('active'));
                tabsEl.querySelectorAll('.smm-tab').forEach(t => t.classList.remove('active'));
                el.classList.add('active');
                renderGrid();
            });
            tabsEl.appendChild(el);
        });

        // A-Z
        const azEl = document.getElementById('arsmm-az');
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const el = document.createElement('div');
            el.className = 'smm-az-letter';
            el.textContent = letter;
            el.addEventListener('click', () => {
                filterLetter = letter;
                searchQuery = '';
                document.getElementById('arsmm-search').value = '';
                activeTab = 'all';
                tabsEl.querySelectorAll('.smm-tab').forEach(t => t.classList.remove('active'));
                tabsEl.querySelector('.smm-tab').classList.add('active');
                azEl.querySelectorAll('.smm-az-letter').forEach(l => l.classList.remove('active'));
                el.classList.add('active');
                renderGrid();
            });
            azEl.appendChild(el);
        });

        // Search
        document.getElementById('arsmm-search').addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            filterLetter = null;
            azEl.querySelectorAll('.smm-az-letter').forEach(l => l.classList.remove('active'));
            renderGrid();
        });

        // Dice
        let diceAnimating = false;
        document.getElementById('arsmm-dice').addEventListener('click', function () {
            if (diceAnimating) return;
            diceAnimating = true;
            const overlayDice = document.getElementById('arsmm-dice-overlay');
            const diceEl = document.getElementById('arsmm-dice-emoji');
            const btn = this;
            btn.classList.add('smm-dice-spinning');
            diceEl.className = 'smm-dice-emoji';
            void diceEl.offsetWidth;
            overlayDice.classList.add('active');
            playDiceRollSound();
            setTimeout(() => diceEl.classList.add('rolling'), 400);
            setTimeout(() => {
                diceEl.classList.remove('rolling');
                diceEl.classList.add('exit');
                const randomItem = items[Math.floor(Math.random() * items.length)];
                selectedItem = randomItem;
                activeTab = randomItem.category;
                filterLetter = null;
                tabsEl.querySelectorAll('.smm-tab').forEach(t => t.classList.remove('active'));
                const targetTab = tabsEl.querySelector(`[data-cat="${randomItem.category}"]`);
                if (targetTab) targetTab.classList.add('active');
                playSelectSound();
                renderGrid();
                setTimeout(() => {
                    const selectedEl = document.querySelector('.smm-chip.selected');
                    if (selectedEl) {
                        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        selectedEl.classList.add('random-pick');
                    }
                }, 80);
                setTimeout(() => {
                    overlayDice.classList.remove('active');
                    btn.classList.remove('smm-dice-spinning');
                    diceAnimating = false;
                }, 350);
            }, 1400);
        });

        renderGrid();

        // Close
        function closeModal() {
            overlay.style.animation = 'smm-fadeIn .3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }
        document.getElementById('arsmm-cancel').addEventListener('click', closeModal);
        document.getElementById('arsmm-apply').addEventListener('click', () => {
            if (selectedItem) {
                addRecentItem(selectedItem.id);
                const recentTab = tabsEl.querySelector('[data-cat="recent"]');
                if (recentTab) recentTab.querySelector('.smm-tab-count').textContent = getRecentItems().length;

                selectOption('artStyle', selectedItem.value, { label: selectedItem.label, en: selectedItem.en, value: selectedItem.value });
                state.artStyleAdvanced = {
                    selectedLabel: selectedItem.label,
                    selectedEn: selectedItem.en,
                    selectedValue: selectedItem.value
                };
                generatePrompt();
                saveState();
                renderTabContent();
            }
            closeModal();
        });
        overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
        const escH = e => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escH); } };
        document.addEventListener('keydown', escH);

        // Filtered items
        function getFilteredItems() {
            let filtered = items;
            const recent = getRecentItems();
            if (activeTab === 'recent') {
                filtered = recent.map(id => items.find(o => o.id === id)).filter(Boolean);
            } else if (activeTab === 'hot') {
                filtered = items.filter(o => o.isHot);
            } else if (activeTab !== 'all') {
                filtered = filtered.filter(o => o.category === activeTab);
            }
            if (searchQuery) {
                filtered = filtered.filter(o =>
                    o.label.includes(searchQuery) || o.en.toLowerCase().includes(searchQuery) || o.value.toLowerCase().includes(searchQuery)
                );
            }
            if (filterLetter) {
                filtered = filtered.filter(o => o.en.charAt(0).toUpperCase() === filterLetter);
            }
            return filtered;
        }

        function renderGrid() {
            const grid = document.getElementById('arsmm-grid');
            const filtered = getFilteredItems();
            const total = items.length;
            const shown = filtered.length;
            const selText = selectedItem ? ` | 已選：<b>${selectedItem.label}</b>` : '';
            document.getElementById('arsmm-status').innerHTML = `已載入 ${total} 藝術風格 | 顯示 ${shown}/${total}${selText}`;

            grid.innerHTML = '';
            if (!filtered.length) {
                grid.innerHTML = '<div class="smm-empty">🔍 沒有找到符合的藝術風格</div>';
                return;
            }
            const recent = getRecentItems();
            filtered.forEach(item => {
                const chip = document.createElement('div');
                chip.className = 'smm-chip' + (selectedItem && selectedItem.id === item.id ? ' selected' : '');
                chip.innerHTML = `
                    <div class="smm-chip-text">
                        <span class="smm-chip-zh">${item.label}</span>
                        <span class="smm-chip-en">${item.en}</span>
                    </div>
                    ${item.isHot ? '<span class="smm-hot-badge">🔥</span>' : ''}
                    ${recent.includes(item.id) ? '<span class="smm-recent-badge">📋</span>' : ''}
                `;
                chip.addEventListener('click', () => {
                    if (selectedItem && selectedItem.id === item.id) {
                        selectedItem = null;
                    } else {
                        selectedItem = item;
                    }
                    playSelectSound();
                    renderGrid();
                });
                grid.appendChild(chip);
            });
            document.getElementById('arsmm-grid-wrap').scrollTop = 0;
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
            drone.frequency.setValueAtTime(120, now);
            drone.frequency.exponentialRampToValueAtTime(240, now + 0.5);
            droneG.gain.setValueAtTime(0, now);
            droneG.gain.linearRampToValueAtTime(0.05, now + 0.15);
            droneG.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
            drone.start(now); drone.stop(now + 0.8);
            [440, 523.25, 587.33, 659.25, 783.99, 880, 987.77, 1046.5].forEach((freq, i) => {
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

    return { setup, openArtStyleMagicModal };
})();
