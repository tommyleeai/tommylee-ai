// ============================================
// AI Prompt Generator — Race Magic Modal
// openRaceMagicModal() 函式
// 模組化自 demos/race_magic_demo.html
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.RaceMagicModal = (function () {
    // Dependencies injected via setup()
    let state, sfx, RACES_RAW, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        RACES_RAW = deps.RACES;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    // === 讀取外部資料 ===
    function getData() {
        return window.PromptGen.RaceMagicData;
    }

    // === 📋 最近使用（localStorage）===
    const RECENT_KEY = 'rmm_recent_races';
    function getRecentRaces() {
        try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; }
    }
    function addRecentRace(en) {
        let recent = getRecentRaces().filter(r => r !== en);
        recent.unshift(en);
        if (recent.length > 10) recent = recent.slice(0, 10);
        localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    }

    // ========================================
    // openRaceMagicModal — 主函式
    // ========================================
    function openRaceMagicModal() {
        const data = getData();
        const RACE_CATEGORIES = data.CATEGORIES;
        const HOT_RACES = data.HOT_ITEMS;
        const BONUS_TRAITS = data.BONUS_TRAITS;

        // 建構完整種族列表（加入分類、icon、熱門標記）
        const RACES = RACES_RAW.map(r => ({
            ...r,
            cat: data.autoClassify(r.en),
            icon: data.getIcon(r.en),
            isHot: HOT_RACES.includes(r.en)
        }));

        const existing = document.getElementById('race-magic-modal');
        if (existing) existing.remove();

        let selectedRace = null;
        let selectedBonuses = new Map(); // en → zh
        let activeCat = 'hot';
        let searchQuery = '';
        let filterLetter = null;

        const overlay = document.createElement('div');
        overlay.id = 'race-magic-modal';
        overlay.innerHTML = `
    <div class="rmm-flash"></div>
    <div class="rmm-magic-circle">
      <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="#a855f7" stroke-width=".5"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#7c3aed" stroke-width=".3"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#c084fc" stroke-width=".3"/>
      <polygon points="100,15 178,145 22,145" fill="none" stroke="#a855f7" stroke-width=".4"/>
      <polygon points="100,185 22,55 178,55" fill="none" stroke="#7c3aed" stroke-width=".4"/>
      <text x="100" y="105" text-anchor="middle" fill="#a855f7" font-size="8" opacity=".4">✦ MAGIC ✦</text></svg>
    </div>
    <div class="rmm-particles" id="rmm-particles"></div>
    <div class="rmm-container">
      <div class="rmm-dice-overlay" id="rmm-dice-overlay">
        <span class="rmm-dice-emoji" id="rmm-dice-emoji">🎲</span>
      </div>
      <div class="rmm-header">
        <div class="rmm-title-row">
          <div class="rmm-title">🔮 高級魔法・種族大全</div>
          <div class="rmm-toolbar">
            <button class="rmm-tool-btn" id="rmm-dice" title="隨機選取"><span class="rmm-tool-icon">🎲</span> 隨機</button>
          </div>
        </div>
        <div class="rmm-search-row">
          <div class="rmm-search-wrap">
            <i class="fa-solid fa-magnifying-glass rmm-search-icon"></i>
            <input type="text" class="rmm-search" id="rmm-search" placeholder="搜尋種族 Search race...">
          </div>
        </div>
      </div>
      <div class="rmm-tabs" id="rmm-tabs"></div>
      <div class="rmm-body">
        <div class="rmm-main">
          <div class="rmm-grid-wrap" id="rmm-grid-wrap"><div class="rmm-grid" id="rmm-grid"></div></div>
        </div>
        <div class="rmm-az" id="rmm-az"></div>
      </div>
      <div class="rmm-bonus" id="rmm-bonus">
        <div class="rmm-bonus-title">⭐ 點選增加特徵 — <span id="rmm-bonus-race"></span></div>
        <div class="rmm-bonus-tags" id="rmm-bonus-tags"></div>
      </div>
      <div class="rmm-footer">
        <div class="rmm-status" id="rmm-status"></div>
        <div class="rmm-actions">
          <button class="rmm-btn rmm-btn-cancel" id="rmm-cancel">❌ 取消</button>
          <button class="rmm-btn rmm-btn-apply" id="rmm-apply">✨ 套用</button>
        </div>
      </div>
    </div>
  `;
        document.body.appendChild(overlay);

        // === Particles ===
        const pc = document.getElementById('rmm-particles');
        const colors = ['#fbbf24', '#a855f7', '#7c3aed', '#f59e0b', '#c084fc', '#fff', '#e879f9'];
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'rmm-particle';
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
            m.className = 'rmm-meteor';
            m.style.top = (Math.random() * 30) + '%';
            m.style.left = (50 + Math.random() * 50) + '%';
            m.style.animationDelay = (0.5 + Math.random() * 3) + 's';
            m.style.animationDuration = (1 + Math.random() * 1.5) + 's';
            overlay.appendChild(m);
        }

        playOpenSound();

        // === Tabs ===
        const tabsEl = document.getElementById('rmm-tabs');
        RACE_CATEGORIES.forEach(c => {
            let count;
            if (c.id === 'all') count = RACES.length;
            else if (c.id === 'hot') count = HOT_RACES.length;
            else if (c.id === 'recent') count = getRecentRaces().length;
            else count = RACES.filter(r => r.cat === c.id).length;

            const tab = document.createElement('div');
            tab.className = 'rmm-tab' + (c.id === activeCat ? ' active' : '');
            tab.dataset.cat = c.id;
            tab.innerHTML = `<span class="rmm-tab-icon">${c.icon}</span><span class="rmm-tab-zh">${c.label}</span><span class="rmm-tab-en">${c.en}</span><span class="rmm-tab-count">${count}</span>`;
            tab.addEventListener('click', () => {
                activeCat = c.id;
                filterLetter = null;
                document.getElementById('rmm-az').querySelectorAll('.rmm-az-letter').forEach(l => l.classList.remove('active'));
                tabsEl.querySelectorAll('.rmm-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderGrid();
            });
            tabsEl.appendChild(tab);
        });

        // === A-Z ===
        const azEl = document.getElementById('rmm-az');
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const el = document.createElement('div');
            el.className = 'rmm-az-letter';
            el.textContent = letter;
            el.addEventListener('click', () => {
                filterLetter = letter;
                searchQuery = '';
                document.getElementById('rmm-search').value = '';
                activeCat = 'all';
                tabsEl.querySelectorAll('.rmm-tab').forEach(t => t.classList.remove('active'));
                tabsEl.querySelector('.rmm-tab').classList.add('active');
                azEl.querySelectorAll('.rmm-az-letter').forEach(l => l.classList.remove('active'));
                el.classList.add('active');
                renderGrid();
            });
            azEl.appendChild(el);
        });

        // === Search ===
        document.getElementById('rmm-search').addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            filterLetter = null;
            azEl.querySelectorAll('.rmm-az-letter').forEach(l => l.classList.remove('active'));
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
        document.getElementById('rmm-dice').addEventListener('click', function () {
            if (diceAnimating) return;
            diceAnimating = true;

            const overlayDice = document.getElementById('rmm-dice-overlay');
            const diceEl = document.getElementById('rmm-dice-emoji');
            const btn = this;

            btn.classList.add('rmm-dice-spinning');
            diceEl.className = 'rmm-dice-emoji';
            void diceEl.offsetWidth;
            overlayDice.classList.add('active');
            playDiceRollSound();

            setTimeout(() => {
                diceEl.classList.add('rolling');
            }, 400);

            setTimeout(() => {
                diceEl.classList.remove('rolling');
                diceEl.classList.add('exit');

                const randomRace = RACES[Math.floor(Math.random() * RACES.length)];
                selectedRace = randomRace;
                selectedBonuses.clear();

                activeCat = randomRace.cat;
                filterLetter = null;
                tabsEl.querySelectorAll('.rmm-tab').forEach(t => t.classList.remove('active'));
                const targetTab = tabsEl.querySelector(`[data-cat="${randomRace.cat}"]`);
                if (targetTab) targetTab.classList.add('active');

                playSelectSound();
                renderGrid();
                renderBonus(randomRace);

                setTimeout(() => {
                    const selectedEl = document.querySelector('.rmm-race-chip.selected');
                    if (selectedEl) {
                        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        selectedEl.classList.add('random-pick');
                    }
                }, 80);

                setTimeout(() => {
                    overlayDice.classList.remove('active');
                    btn.classList.remove('rmm-dice-spinning');
                    diceAnimating = false;
                }, 350);

            }, 1400);
        });

        renderGrid();

        // === Close ===
        function closeModal() {
            overlay.style.animation = 'rmm-fadeIn .3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }
        document.getElementById('rmm-cancel').addEventListener('click', closeModal);
        document.getElementById('rmm-apply').addEventListener('click', () => {
            if (selectedRace) {
                addRecentRace(selectedRace.en);
                // 更新 Recent tab 計數
                const recentTab = tabsEl.querySelector('[data-cat="recent"]');
                if (recentTab) {
                    recentTab.querySelector('.rmm-tab-count').textContent = getRecentRaces().length;
                }
                // ★ 整合關鍵：呼叫主頁面的 selectOption 更新種族選擇
                selectOption('race', selectedRace.value, { label: selectedRace.label, en: selectedRace.en, value: selectedRace.value });
                // ★ 加分特徵 → 存入 state.raceAdvanced（紫色橫幅顯示用）
                const bonusEn = [...selectedBonuses.keys()];
                const bonusZh = [...selectedBonuses.values()];
                if (bonusEn.length) {
                    state.raceAdvanced = {
                        selectedRace: { label: selectedRace.label, en: selectedRace.en, value: selectedRace.value },
                        bonusTraits: bonusEn,
                        bonusTraitsZh: bonusZh
                    };
                } else {
                    // 沒選加分特徵就清除
                    delete state.raceAdvanced;
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

        // === 取得篩選後的種族 ===
        function getFilteredRaces() {
            let filtered = RACES;
            const recent = getRecentRaces();

            if (activeCat === 'recent') {
                filtered = recent.map(en => RACES.find(r => r.en === en)).filter(Boolean);
            } else if (activeCat === 'hot') {
                filtered = RACES.filter(r => r.isHot);
            } else if (activeCat !== 'all') {
                filtered = filtered.filter(r => r.cat === activeCat);
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

        function renderGrid() {
            const grid = document.getElementById('rmm-grid');
            const filtered = getFilteredRaces();
            const recent = getRecentRaces();
            const total = RACES.length;
            const shown = filtered.length;
            const selText = selectedRace ? ` | 已選：<b>${selectedRace.label}</b>` : '';
            document.getElementById('rmm-status').innerHTML = `已載入 ${total} 種族 | 顯示 ${shown}/${total}${selText}`;

            grid.innerHTML = '';
            if (!filtered.length) {
                grid.innerHTML = '<div class="rmm-empty">🔍 沒有找到符合的種族</div>';
                return;
            }

            filtered.forEach(race => {
                const chip = document.createElement('div');
                chip.className = 'rmm-race-chip' + (selectedRace && selectedRace.en === race.en ? ' selected' : '');
                chip.innerHTML = `
                    <span class="rmm-chip-icon">${race.icon}</span>
                    <div class="rmm-chip-text">
                        <span class="rmm-chip-zh">${race.label}</span>
                        <span class="rmm-chip-en">${race.en}</span>
                    </div>
                    ${race.isHot ? '<span class="rmm-hot-badge">🔥</span>' : ''}
                    ${recent.includes(race.en) ? '<span class="rmm-recent-badge">📋</span>' : ''}
                `;
                chip.addEventListener('click', () => {
                    if (selectedRace && selectedRace.en === race.en) {
                        selectedRace = null;
                        selectedBonuses.clear();
                    } else {
                        selectedRace = race;
                        selectedBonuses.clear();
                    }
                    playSelectSound();
                    renderGrid();
                    renderBonus(selectedRace);
                });
                grid.appendChild(chip);
            });

            document.getElementById('rmm-grid-wrap').scrollTop = 0;
        }

        function renderBonus(race) {
            const panel = document.getElementById('rmm-bonus');
            const tagsEl = document.getElementById('rmm-bonus-tags');
            const nameEl = document.getElementById('rmm-bonus-race');
            if (!race) { panel.classList.remove('show'); return; }
            const traits = BONUS_TRAITS[race.cat] || [];
            if (!traits.length) { panel.classList.remove('show'); return; }
            nameEl.textContent = race.label + ' ' + race.en;
            tagsEl.innerHTML = '';
            traits.forEach(trait => {
                const tag = document.createElement('button');
                tag.className = 'rmm-bonus-tag' + (selectedBonuses.has(trait.en) ? ' active' : '');
                tag.innerHTML = `<span class="rmm-chip-icon">${trait.icon}</span> ${trait.zh}`;
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
        openRaceMagicModal
    };
})();
