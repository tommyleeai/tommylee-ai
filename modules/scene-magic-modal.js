// ============================================
// AI Prompt Generator — Scene Magic Modal
// openSceneMagicModal() 函式
// 場景（環境 Tab）專用 A 型 Magic Modal
// CSS 前綴: scmm-
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.SceneMagicModal = (function () {
    // Dependencies injected via setup()
    let state, sfx, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    // === 讀取外部資料 ===
    function getData() {
        return window.PromptGen.SceneMagicData;
    }

    // === 📋 最近使用（localStorage）===
    const RECENT_KEY = 'scmm_recent_scenes';
    function getRecentScenes() {
        try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; }
    }
    function addRecentScene(id) {
        let recent = getRecentScenes().filter(r => r !== id);
        recent.unshift(id);
        if (recent.length > 15) recent = recent.slice(0, 15);
        localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    }

    // ========================================
    // openSceneMagicModal — 主函式
    // ========================================
    function openSceneMagicModal() {
        const data = getData();
        const TABS = data.TABS;
        const HOT_ITEMS = data.HOT_ITEMS;
        const ITEMS = data.ITEMS;
        const BONUS_TRAITS = data.BONUS_TRAITS;

        const existing = document.getElementById('scene-magic-modal');
        if (existing) existing.remove();

        let selectedScene = null;
        let selectedBonuses = new Map(); // en → zh
        let activeCat = 'hot';
        let searchQuery = '';
        let filterLetter = null;

        // 如果已有 sceneAdvanced 狀態，預設載入
        if (state.sceneAdvanced) {
            const prev = state.sceneAdvanced;
            selectedScene = ITEMS.find(s => s.id === prev.selectedScene?.id) || null;
            if (prev.bonusTraits && prev.bonusTraitsZh) {
                prev.bonusTraits.forEach((en, i) => {
                    selectedBonuses.set(en, prev.bonusTraitsZh[i] || en);
                });
            }
        }

        const overlay = document.createElement('div');
        overlay.id = 'scene-magic-modal';
        overlay.innerHTML = `
    <div class="scmm-flash"></div>
    <div class="scmm-magic-circle">
      <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="#a855f7" stroke-width=".5"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#7c3aed" stroke-width=".3"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#c084fc" stroke-width=".3"/>
      <polygon points="100,15 178,145 22,145" fill="none" stroke="#a855f7" stroke-width=".4"/>
      <polygon points="100,185 22,55 178,55" fill="none" stroke="#7c3aed" stroke-width=".4"/>
      <text x="100" y="105" text-anchor="middle" fill="#a855f7" font-size="8" opacity=".4">✦ SCENE ✦</text></svg>
    </div>
    <div class="scmm-particles" id="scmm-particles"></div>
    <div class="scmm-container">
      <div class="scmm-dice-overlay" id="scmm-dice-overlay">
        <span class="scmm-dice-emoji" id="scmm-dice-emoji">🎲</span>
      </div>
      <div class="scmm-header">
        <div class="scmm-title-row">
          <div class="scmm-title">🌍 高級魔法・場景大全</div>
          <div class="scmm-toolbar">
            <button class="scmm-tool-btn" id="scmm-dice" title="隨機選取"><span class="scmm-tool-icon">🎲</span> 隨機</button>
            <button class="scmm-tool-btn scmm-clear-btn" id="scmm-clear" title="清除選取"><span class="scmm-tool-icon">🗑️</span> 清除</button>
          </div>
        </div>
        <div class="scmm-search-row">
          <div class="scmm-search-wrap">
            <i class="fa-solid fa-magnifying-glass scmm-search-icon"></i>
            <input type="text" class="scmm-search" id="scmm-search" placeholder="搜尋場景 Search scene...">
          </div>
        </div>
      </div>
      <div class="scmm-tabs" id="scmm-tabs"></div>
      <div class="scmm-body">
        <div class="scmm-main">
          <div class="scmm-grid-wrap" id="scmm-grid-wrap"><div class="scmm-grid" id="scmm-grid"></div></div>
        </div>
        <div class="scmm-az" id="scmm-az"></div>
      </div>
      <div class="scmm-bonus" id="scmm-bonus">
        <div class="scmm-bonus-title">⭐ 點選增加環境特徵 — <span id="scmm-bonus-scene"></span></div>
        <div class="scmm-bonus-tags" id="scmm-bonus-tags"></div>
      </div>
      <div class="scmm-footer">
        <div class="scmm-status" id="scmm-status"></div>
        <div class="scmm-actions">
          <button class="scmm-btn scmm-btn-cancel" id="scmm-cancel">❌ 取消</button>
          <button class="scmm-btn scmm-btn-apply" id="scmm-apply">✨ 套用</button>
        </div>
      </div>
    </div>
  `;
        document.body.appendChild(overlay);

        // === Particles ===
        const pc = document.getElementById('scmm-particles');
        const colors = ['#22d3ee', '#a855f7', '#7c3aed', '#06b6d4', '#c084fc', '#fff', '#e879f9'];
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'scmm-particle';
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
            m.className = 'scmm-meteor';
            m.style.top = (Math.random() * 30) + '%';
            m.style.left = (50 + Math.random() * 50) + '%';
            m.style.animationDelay = (0.5 + Math.random() * 3) + 's';
            m.style.animationDuration = (1 + Math.random() * 1.5) + 's';
            overlay.appendChild(m);
        }

        playOpenSound();

        // === Tabs ===
        const tabsEl = document.getElementById('scmm-tabs');
        TABS.forEach(c => {
            let count;
            if (c.id === 'all') count = ITEMS.length;
            else if (c.id === 'hot') count = HOT_ITEMS.length;
            else if (c.id === 'recent') count = getRecentScenes().length;
            else count = ITEMS.filter(s => s.category === c.id).length;

            const tab = document.createElement('div');
            tab.className = 'scmm-tab' + (c.id === activeCat ? ' active' : '');
            tab.dataset.cat = c.id;
            tab.innerHTML = `<span class="scmm-tab-icon">${c.icon}</span><span class="scmm-tab-zh">${c.label}</span><span class="scmm-tab-en">${c.en}</span><span class="scmm-tab-count">${count}</span>`;
            tab.addEventListener('click', () => {
                activeCat = c.id;
                filterLetter = null;
                document.getElementById('scmm-az').querySelectorAll('.scmm-az-letter').forEach(l => l.classList.remove('active'));
                tabsEl.querySelectorAll('.scmm-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderGrid();
            });
            tabsEl.appendChild(tab);
        });

        // === A-Z ===
        const azEl = document.getElementById('scmm-az');
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const el = document.createElement('div');
            el.className = 'scmm-az-letter';
            el.textContent = letter;
            el.addEventListener('click', () => {
                filterLetter = letter;
                searchQuery = '';
                document.getElementById('scmm-search').value = '';
                activeCat = 'all';
                tabsEl.querySelectorAll('.scmm-tab').forEach(t => t.classList.remove('active'));
                tabsEl.querySelector('.scmm-tab').classList.add('active');
                azEl.querySelectorAll('.scmm-az-letter').forEach(l => l.classList.remove('active'));
                el.classList.add('active');
                renderGrid();
            });
            azEl.appendChild(el);
        });

        // === Search ===
        document.getElementById('scmm-search').addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            filterLetter = null;
            azEl.querySelectorAll('.scmm-az-letter').forEach(l => l.classList.remove('active'));
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
        document.getElementById('scmm-dice').addEventListener('click', function () {
            if (diceAnimating) return;
            diceAnimating = true;

            const overlayDice = document.getElementById('scmm-dice-overlay');
            const diceEl = document.getElementById('scmm-dice-emoji');
            const btn = this;

            btn.classList.add('scmm-dice-spinning');
            diceEl.className = 'scmm-dice-emoji';
            void diceEl.offsetWidth;
            overlayDice.classList.add('active');
            playDiceRollSound();

            setTimeout(() => {
                diceEl.classList.add('rolling');
            }, 400);

            setTimeout(() => {
                diceEl.classList.remove('rolling');
                diceEl.classList.add('exit');

                const randomScene = ITEMS[Math.floor(Math.random() * ITEMS.length)];
                selectedScene = randomScene;
                selectedBonuses.clear();

                activeCat = randomScene.category;
                filterLetter = null;
                tabsEl.querySelectorAll('.scmm-tab').forEach(t => t.classList.remove('active'));
                const targetTab = tabsEl.querySelector(`[data-cat="${randomScene.category}"]`);
                if (targetTab) targetTab.classList.add('active');

                playSelectSound();
                renderGrid();
                renderBonus(randomScene);

                setTimeout(() => {
                    const selectedEl = document.querySelector('.scmm-scene-chip.selected');
                    if (selectedEl) {
                        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        selectedEl.classList.add('random-pick');
                    }
                }, 80);

                setTimeout(() => {
                    overlayDice.classList.remove('active');
                    btn.classList.remove('scmm-dice-spinning');
                    diceAnimating = false;
                }, 350);

            }, 1400);
        });

        // === 🗑️ 清除按鈕 ===
        document.getElementById('scmm-clear').addEventListener('click', () => {
            selectedScene = null;
            selectedBonuses.clear();
            renderGrid();
            renderBonus(null);
        });

        renderGrid();
        // 如果有預設選取，顯示 Bonus
        if (selectedScene) renderBonus(selectedScene);

        // === Close ===
        function closeModal() {
            overlay.style.animation = 'scmm-fadeIn .3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }
        document.getElementById('scmm-cancel').addEventListener('click', closeModal);
        document.getElementById('scmm-apply').addEventListener('click', () => {
            if (selectedScene) {
                addRecentScene(selectedScene.id);
                // 更新 Recent tab 計數
                const recentTab = tabsEl.querySelector('[data-cat="recent"]');
                if (recentTab) {
                    recentTab.querySelector('.scmm-tab-count').textContent = getRecentScenes().length;
                }
                // ★ 整合：呼叫主頁面的 selectOption 更新場景選擇
                selectOption('scene', selectedScene.value, { label: selectedScene.label, en: selectedScene.en, value: selectedScene.value });
                // ★ 加分特徵 → 存入 state.sceneAdvanced
                const bonusEn = [...selectedBonuses.keys()];
                const bonusZh = [...selectedBonuses.values()];
                state.sceneAdvanced = {
                    selectedScene: { id: selectedScene.id, label: selectedScene.label, en: selectedScene.en, value: selectedScene.value },
                    bonusTraits: bonusEn,
                    bonusTraitsZh: bonusZh
                };
                generatePrompt();
                saveState();
                renderTabContent();
            } else {
                // 沒有選取 → 清除 advanced 狀態
                delete state.sceneAdvanced;
                generatePrompt();
                saveState();
                renderTabContent();
            }
            closeModal();
        });
        overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
        const escH = e => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escH); } };
        document.addEventListener('keydown', escH);

        // === 取得篩選後的場景 ===
        function getFilteredScenes() {
            let filtered = ITEMS;
            const recent = getRecentScenes();

            if (activeCat === 'recent') {
                filtered = recent.map(id => ITEMS.find(s => s.id === id)).filter(Boolean);
            } else if (activeCat === 'hot') {
                filtered = ITEMS.filter(s => HOT_ITEMS.includes(s.id));
            } else if (activeCat !== 'all') {
                filtered = filtered.filter(s => s.category === activeCat);
            }

            if (searchQuery) {
                filtered = filtered.filter(s =>
                    s.label.includes(searchQuery) || s.en.toLowerCase().includes(searchQuery) || s.value.toLowerCase().includes(searchQuery)
                );
            }
            if (filterLetter) {
                filtered = filtered.filter(s => s.en.charAt(0).toUpperCase() === filterLetter);
            }
            return filtered;
        }

        function renderGrid() {
            const grid = document.getElementById('scmm-grid');
            const filtered = getFilteredScenes();
            const recent = getRecentScenes();
            const total = ITEMS.length;
            const shown = filtered.length;
            const selText = selectedScene ? ` | 已選：<b>${selectedScene.icon} ${selectedScene.label}</b>` : '';
            document.getElementById('scmm-status').innerHTML = `已載入 ${total} 場景 | 顯示 ${shown}/${total}${selText}`;

            grid.innerHTML = '';
            if (!filtered.length) {
                grid.innerHTML = '<div class="scmm-empty">🔍 沒有找到符合的場景</div>';
                return;
            }

            filtered.forEach(scene => {
                const chip = document.createElement('div');
                chip.className = 'scmm-scene-chip' + (selectedScene && selectedScene.id === scene.id ? ' selected' : '');
                const isHot = HOT_ITEMS.includes(scene.id);
                chip.innerHTML = `
                    <span class="scmm-chip-icon">${scene.icon}</span>
                    <div class="scmm-chip-text">
                        <span class="scmm-chip-zh">${scene.label}</span>
                        <span class="scmm-chip-en">${scene.en}</span>
                    </div>
                    ${isHot ? '<span class="scmm-hot-badge">🔥</span>' : ''}
                    ${recent.includes(scene.id) ? '<span class="scmm-recent-badge">📋</span>' : ''}
                `;
                chip.addEventListener('click', () => {
                    if (selectedScene && selectedScene.id === scene.id) {
                        selectedScene = null;
                        selectedBonuses.clear();
                    } else {
                        selectedScene = scene;
                        selectedBonuses.clear();
                    }
                    playSelectSound();
                    renderGrid();
                    renderBonus(selectedScene);
                });
                grid.appendChild(chip);
            });

            document.getElementById('scmm-grid-wrap').scrollTop = 0;
        }

        function renderBonus(scene) {
            const panel = document.getElementById('scmm-bonus');
            const tagsEl = document.getElementById('scmm-bonus-tags');
            const nameEl = document.getElementById('scmm-bonus-scene');
            if (!scene) { panel.classList.remove('show'); return; }
            const traits = BONUS_TRAITS[scene.category] || [];
            if (!traits.length) { panel.classList.remove('show'); return; }
            nameEl.textContent = scene.icon + ' ' + scene.label + ' ' + scene.en;
            tagsEl.innerHTML = '';
            traits.forEach(trait => {
                const tag = document.createElement('button');
                tag.className = 'scmm-bonus-tag' + (selectedBonuses.has(trait.en) ? ' active' : '');
                tag.innerHTML = `<span class="scmm-chip-icon">${trait.icon}</span> ${trait.zh}`;
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
        openSceneMagicModal
    };
})();
