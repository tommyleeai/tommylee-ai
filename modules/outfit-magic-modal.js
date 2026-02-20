// ============================================
// AI Prompt Generator — Outfit Magic Modal
// openOutfitMagicModal() 函式
// 模組化自 race-magic-modal.js 模版
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.OutfitMagicModal = (function () {
    // Dependencies injected via setup()
    let state, sfx, OUTFITS_RAW, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        OUTFITS_RAW = deps.OUTFITS;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    // === 讀取外部資料 ===
    function getData() {
        return window.PromptGen.OutfitMagicData || {};
    }

    // === 📋 最近使用（localStorage）===
    const RECENT_KEY = 'cmm_recent_outfits';
    function getRecentOutfits() {
        try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; }
    }
    function addRecentOutfit(id) {
        let recent = getRecentOutfits().filter(r => r !== id);
        recent.unshift(id);
        if (recent.length > 10) recent = recent.slice(0, 10);
        localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    }

    // ========================================
    // openOutfitMagicModal — 主函式
    // ========================================
    function openOutfitMagicModal() {
        const data = getData();
        const CATEGORIES = data.CATEGORIES || [];
        const ITEMS = data.ITEMS || [];
        const HOT_ITEMS = data.HOT_ITEMS || [];
        const BONUS_TRAITS = data.BONUS_TRAITS || {};

        // 加入熱門標記
        const outfits = ITEMS.map(item => ({
            ...item,
            isHot: HOT_ITEMS.includes(item.id)
        }));

        const existing = document.getElementById('outfit-magic-modal');
        if (existing) existing.remove();

        let selectedOutfit = null;
        let selectedBonuses = new Map();
        let activeCat = 'hot';
        let searchQuery = '';
        let filterLetter = null;

        const overlay = document.createElement('div');
        overlay.id = 'outfit-magic-modal';
        overlay.innerHTML = `
    <div class="cmm-flash"></div>
    <div class="cmm-magic-circle">
      <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="#a855f7" stroke-width=".5"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#7c3aed" stroke-width=".3"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#c084fc" stroke-width=".3"/>
      <polygon points="100,15 178,145 22,145" fill="none" stroke="#a855f7" stroke-width=".4"/>
      <polygon points="100,185 22,55 178,55" fill="none" stroke="#7c3aed" stroke-width=".4"/>
      <text x="100" y="105" text-anchor="middle" fill="#a855f7" font-size="8" opacity=".4">✦ MAGIC ✦</text></svg>
    </div>
    <div class="cmm-particles" id="cmm-particles"></div>
    <div class="cmm-container">
      <div class="cmm-dice-overlay" id="cmm-dice-overlay">
        <span class="cmm-dice-emoji" id="cmm-dice-emoji">🎲</span>
      </div>
      <div class="cmm-header">
        <div class="cmm-title-row">
          <div class="cmm-title">🔮 高級魔法・服裝大全</div>
          <div class="cmm-toolbar">
            <button class="cmm-tool-btn" id="cmm-dice" title="隨機選取"><span class="cmm-tool-icon">🎲</span> 隨機</button>
          </div>
        </div>
        <div class="cmm-search-row">
          <div class="cmm-search-wrap">
            <i class="fa-solid fa-magnifying-glass cmm-search-icon"></i>
            <input type="text" class="cmm-search" id="cmm-search" placeholder="搜尋服裝 Search outfit...">
          </div>
        </div>
      </div>
      <div class="cmm-tabs" id="cmm-tabs"></div>
      <div class="cmm-body">
        <div class="cmm-main">
          <div class="cmm-grid-wrap" id="cmm-grid-wrap"><div class="cmm-grid" id="cmm-grid"></div></div>
        </div>
        <div class="cmm-az" id="cmm-az"></div>
      </div>
      <div class="cmm-bonus" id="cmm-bonus">
        <div class="cmm-bonus-title">⭐ 點選增加特徵 — <span id="cmm-bonus-name"></span></div>
        <div class="cmm-bonus-tags" id="cmm-bonus-tags"></div>
      </div>
      <div class="cmm-footer">
        <div class="cmm-status" id="cmm-status"></div>
        <div class="cmm-actions">
          <button class="cmm-btn cmm-btn-cancel" id="cmm-cancel">❌ 取消</button>
          <button class="cmm-btn cmm-btn-apply" id="cmm-apply">✨ 套用</button>
        </div>
      </div>
    </div>
  `;
        document.body.appendChild(overlay);

        // === Particles ===
        const pc = document.getElementById('cmm-particles');
        const colors = ['#fbbf24', '#a855f7', '#7c3aed', '#f59e0b', '#c084fc', '#fff', '#e879f9'];
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'cmm-particle';
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
            m.className = 'cmm-meteor';
            m.style.top = (Math.random() * 30) + '%';
            m.style.left = (50 + Math.random() * 50) + '%';
            m.style.animationDelay = (0.5 + Math.random() * 3) + 's';
            m.style.animationDuration = (1 + Math.random() * 1.5) + 's';
            overlay.appendChild(m);
        }

        playOpenSound();

        // === Tabs ===
        const tabsEl = document.getElementById('cmm-tabs');
        CATEGORIES.forEach(c => {
            let count;
            if (c.id === 'all') count = outfits.length;
            else if (c.id === 'hot') count = HOT_ITEMS.length;
            else if (c.id === 'recent') count = getRecentOutfits().length;
            else count = outfits.filter(o => o.cat === c.id).length;

            const tab = document.createElement('div');
            tab.className = 'cmm-tab' + (c.id === activeCat ? ' active' : '');
            tab.dataset.cat = c.id;
            tab.innerHTML = `<span class="cmm-tab-icon">${c.icon}</span><span class="cmm-tab-zh">${c.label}</span><span class="cmm-tab-en">${c.en}</span><span class="cmm-tab-count">${count}</span>`;
            tab.addEventListener('click', () => {
                activeCat = c.id;
                filterLetter = null;
                document.getElementById('cmm-az').querySelectorAll('.cmm-az-letter').forEach(l => l.classList.remove('active'));
                tabsEl.querySelectorAll('.cmm-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderGrid();
            });
            tabsEl.appendChild(tab);
        });

        // === A-Z ===
        const azEl = document.getElementById('cmm-az');
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const el = document.createElement('div');
            el.className = 'cmm-az-letter';
            el.textContent = letter;
            el.addEventListener('click', () => {
                filterLetter = letter;
                searchQuery = '';
                document.getElementById('cmm-search').value = '';
                activeCat = 'all';
                tabsEl.querySelectorAll('.cmm-tab').forEach(t => t.classList.remove('active'));
                tabsEl.querySelector('.cmm-tab').classList.add('active');
                azEl.querySelectorAll('.cmm-az-letter').forEach(l => l.classList.remove('active'));
                el.classList.add('active');
                renderGrid();
            });
            azEl.appendChild(el);
        });

        // === Search ===
        document.getElementById('cmm-search').addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            filterLetter = null;
            azEl.querySelectorAll('.cmm-az-letter').forEach(l => l.classList.remove('active'));
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
        document.getElementById('cmm-dice').addEventListener('click', function () {
            if (diceAnimating) return;
            diceAnimating = true;

            const overlayDice = document.getElementById('cmm-dice-overlay');
            const diceEl = document.getElementById('cmm-dice-emoji');
            const btn = this;

            btn.classList.add('cmm-dice-spinning');
            diceEl.className = 'cmm-dice-emoji';
            void diceEl.offsetWidth;
            overlayDice.classList.add('active');
            playDiceRollSound();

            setTimeout(() => {
                diceEl.classList.add('rolling');
            }, 400);

            setTimeout(() => {
                diceEl.classList.remove('rolling');
                diceEl.classList.add('exit');

                const randomOutfit = outfits[Math.floor(Math.random() * outfits.length)];
                selectedOutfit = randomOutfit;
                selectedBonuses.clear();

                activeCat = randomOutfit.cat;
                filterLetter = null;
                tabsEl.querySelectorAll('.cmm-tab').forEach(t => t.classList.remove('active'));
                const targetTab = tabsEl.querySelector(`[data-cat="${randomOutfit.cat}"]`);
                if (targetTab) targetTab.classList.add('active');

                playSelectSound();
                renderGrid();
                renderBonus(randomOutfit);

                setTimeout(() => {
                    const selectedEl = document.querySelector('.cmm-race-chip.selected');
                    if (selectedEl) {
                        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        selectedEl.classList.add('random-pick');
                    }
                }, 80);

                setTimeout(() => {
                    overlayDice.classList.remove('active');
                    btn.classList.remove('cmm-dice-spinning');
                    diceAnimating = false;
                }, 350);

            }, 1400);
        });

        renderGrid();

        // === Close ===
        function closeModal() {
            overlay.style.animation = 'cmm-fadeIn .3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }
        document.getElementById('cmm-cancel').addEventListener('click', closeModal);
        document.getElementById('cmm-apply').addEventListener('click', () => {
            if (selectedOutfit) {
                addRecentOutfit(selectedOutfit.id);
                // 更新 Recent tab 計數
                const recentTab = tabsEl.querySelector('[data-cat="recent"]');
                if (recentTab) {
                    recentTab.querySelector('.cmm-tab-count').textContent = getRecentOutfits().length;
                }
                // ★ 整合關鍵：呼叫主頁面的 selectOption 更新服裝選擇
                selectOption('outfit', selectedOutfit.value, { label: selectedOutfit.name, en: selectedOutfit.en, value: selectedOutfit.value });
                // 如果有加分特徵，存入 state.outfitAdvanced
                const bonusArr = [...selectedBonuses.keys()];
                const bonusZhArr = [...selectedBonuses.values()];
                if (bonusArr.length) {
                    state.outfitAdvanced = {
                        selectedOutfit: selectedOutfit.name + ' ' + selectedOutfit.en,
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

        // === 取得篩選後的服裝 ===
        function getFilteredOutfits() {
            let filtered = outfits;
            const recent = getRecentOutfits();

            if (activeCat === 'recent') {
                filtered = recent.map(id => outfits.find(o => o.id === id)).filter(Boolean);
            } else if (activeCat === 'hot') {
                filtered = outfits.filter(o => o.isHot);
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
            const grid = document.getElementById('cmm-grid');
            const filtered = getFilteredOutfits();
            const recent = getRecentOutfits();
            const total = outfits.length;
            const shown = filtered.length;
            const selText = selectedOutfit ? ` | 已選：<b>${selectedOutfit.name}</b>` : '';
            document.getElementById('cmm-status').innerHTML = `已載入 ${total} 服裝 | 顯示 ${shown}/${total}${selText}`;

            grid.innerHTML = '';
            if (!filtered.length) {
                grid.innerHTML = '<div class="cmm-empty">🔍 沒有找到符合的服裝</div>';
                return;
            }

            filtered.forEach(outfit => {
                const chip = document.createElement('div');
                chip.className = 'cmm-race-chip' + (selectedOutfit && selectedOutfit.id === outfit.id ? ' selected' : '');
                chip.innerHTML = `
                    <span class="cmm-chip-icon">${outfit.icon}</span>
                    <div class="cmm-chip-text">
                        <span class="cmm-chip-zh">${outfit.name}</span>
                        <span class="cmm-chip-en">${outfit.en}</span>
                    </div>
                    ${outfit.isHot ? '<span class="cmm-hot-badge">🔥</span>' : ''}
                    ${recent.includes(outfit.id) ? '<span class="cmm-recent-badge">📋</span>' : ''}
                `;
                chip.addEventListener('click', () => {
                    if (selectedOutfit && selectedOutfit.id === outfit.id) {
                        selectedOutfit = null;
                        selectedBonuses.clear();
                    } else {
                        selectedOutfit = outfit;
                        selectedBonuses.clear();
                    }
                    playSelectSound();
                    renderGrid();
                    renderBonus(selectedOutfit);
                });
                grid.appendChild(chip);
            });

            document.getElementById('cmm-grid-wrap').scrollTop = 0;
        }

        function renderBonus(outfit) {
            const panel = document.getElementById('cmm-bonus');
            const tagsEl = document.getElementById('cmm-bonus-tags');
            const nameEl = document.getElementById('cmm-bonus-name');
            if (!outfit) { panel.classList.remove('show'); return; }
            const traits = BONUS_TRAITS[outfit.cat] || [];
            if (!traits.length) { panel.classList.remove('show'); return; }
            nameEl.textContent = outfit.name + ' ' + outfit.en;
            tagsEl.innerHTML = '';
            traits.forEach(trait => {
                const tag = document.createElement('button');
                tag.className = 'cmm-bonus-tag' + (selectedBonuses.has(trait.en) ? ' active' : '');
                tag.innerHTML = `<span class="cmm-chip-icon">${trait.icon}</span> ${trait.zh}`;
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
        openOutfitMagicModal
    };
})();
