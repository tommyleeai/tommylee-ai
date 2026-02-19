// ============================================
// AI Prompt Generator — Job Magic Modal
// openJobMagicModal() 函式
// 模組化自種族大全結構
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.JobMagicModal = (function () {
    let state, sfx, JOBS_RAW, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        JOBS_RAW = deps.JOBS;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    // === 讀取外部資料 ===
    function getData() {
        return window.PromptGen.JobMagicData;
    }

    // === 📋 最近使用（localStorage）===
    const RECENT_KEY = 'jmm_recent_jobs';
    function getRecentJobs() {
        try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; }
    }
    function addRecentJob(en) {
        let recent = getRecentJobs().filter(r => r !== en);
        recent.unshift(en);
        if (recent.length > 10) recent = recent.slice(0, 10);
        localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    }

    // ========================================
    // openJobMagicModal — 主函式
    // ========================================
    function openJobMagicModal() {
        const data = getData();
        const JOB_CATEGORIES = data.CATEGORIES;
        const HOT_JOBS = data.HOT_ITEMS;
        const BONUS_TRAITS = data.BONUS_TRAITS;

        const JOBS = JOBS_RAW.map(j => ({
            ...j,
            cat: data.autoClassify(j.en),
            icon: data.getIcon(j.en),
            isHot: HOT_JOBS.includes(j.en)
        }));

        const existing = document.getElementById('job-magic-modal');
        if (existing) existing.remove();

        let selectedJob = null;
        let selectedBonuses = new Set();
        let activeCat = 'hot';
        let searchQuery = '';
        let filterLetter = null;

        const overlay = document.createElement('div');
        overlay.id = 'job-magic-modal';
        overlay.innerHTML = `
    <div class="jmm-flash"></div>
    <div class="jmm-magic-circle">
      <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="#a855f7" stroke-width=".5"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#7c3aed" stroke-width=".3"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#c084fc" stroke-width=".3"/>
      <polygon points="100,15 178,145 22,145" fill="none" stroke="#a855f7" stroke-width=".4"/>
      <polygon points="100,185 22,55 178,55" fill="none" stroke="#7c3aed" stroke-width=".4"/>
      <text x="100" y="105" text-anchor="middle" fill="#a855f7" font-size="8" opacity=".4">✦ MAGIC ✦</text></svg>
    </div>
    <div class="jmm-particles" id="jmm-particles"></div>
    <div class="jmm-container">
      <div class="jmm-dice-overlay" id="jmm-dice-overlay">
        <span class="jmm-dice-emoji" id="jmm-dice-emoji">🎲</span>
      </div>
      <div class="jmm-header">
        <div class="jmm-title-row">
          <div class="jmm-title">🔮 高級魔法・職業大全</div>
          <div class="jmm-toolbar">
            <button class="jmm-tool-btn" id="jmm-dice" title="隨機選取"><span class="jmm-tool-icon">🎲</span> 隨機</button>
          </div>
        </div>
        <div class="jmm-search-row">
          <div class="jmm-search-wrap">
            <i class="fa-solid fa-magnifying-glass jmm-search-icon"></i>
            <input type="text" class="jmm-search" id="jmm-search" placeholder="搜尋職業 Search job...">
          </div>
        </div>
      </div>
      <div class="jmm-tabs" id="jmm-tabs"></div>
      <div class="jmm-body">
        <div class="jmm-main">
          <div class="jmm-grid-wrap" id="jmm-grid-wrap"><div class="jmm-grid" id="jmm-grid"></div></div>
        </div>
        <div class="jmm-az" id="jmm-az"></div>
      </div>
      <div class="jmm-bonus" id="jmm-bonus">
        <div class="jmm-bonus-title">⭐ 點選增加特徵 — <span id="jmm-bonus-job"></span></div>
        <div class="jmm-bonus-tags" id="jmm-bonus-tags"></div>
      </div>
      <div class="jmm-footer">
        <div class="jmm-status" id="jmm-status"></div>
        <div class="jmm-actions">
          <button class="jmm-btn jmm-btn-cancel" id="jmm-cancel">❌ 取消</button>
          <button class="jmm-btn jmm-btn-apply" id="jmm-apply">✨ 套用</button>
        </div>
      </div>
    </div>
  `;
        document.body.appendChild(overlay);

        // === Particles ===
        const pc = document.getElementById('jmm-particles');
        const colors = ['#fbbf24', '#a855f7', '#7c3aed', '#f59e0b', '#c084fc', '#fff', '#e879f9'];
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'jmm-particle';
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
            m.className = 'jmm-meteor';
            m.style.top = (Math.random() * 30) + '%';
            m.style.left = (50 + Math.random() * 50) + '%';
            m.style.animationDelay = (0.5 + Math.random() * 3) + 's';
            m.style.animationDuration = (1 + Math.random() * 1.5) + 's';
            overlay.appendChild(m);
        }

        playOpenSound();

        // === Tabs ===
        const tabsEl = document.getElementById('jmm-tabs');
        JOB_CATEGORIES.forEach(c => {
            let count;
            if (c.id === 'all') count = JOBS.length;
            else if (c.id === 'hot') count = HOT_JOBS.length;
            else if (c.id === 'recent') count = getRecentJobs().length;
            else count = JOBS.filter(j => j.cat === c.id).length;

            const tab = document.createElement('div');
            tab.className = 'jmm-tab' + (c.id === activeCat ? ' active' : '');
            tab.dataset.cat = c.id;
            tab.innerHTML = `<span class="jmm-tab-icon">${c.icon}</span><span class="jmm-tab-label">${c.label}<br>${c.en}</span><span class="jmm-tab-count">${count}</span>`;
            tab.addEventListener('click', () => {
                activeCat = c.id;
                filterLetter = null;
                document.getElementById('jmm-az').querySelectorAll('.jmm-az-letter').forEach(l => l.classList.remove('active'));
                tabsEl.querySelectorAll('.jmm-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderGrid();
            });
            tabsEl.appendChild(tab);
        });

        // === A-Z ===
        const azEl = document.getElementById('jmm-az');
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const el = document.createElement('div');
            el.className = 'jmm-az-letter';
            el.textContent = letter;
            el.addEventListener('click', () => {
                filterLetter = letter;
                searchQuery = '';
                document.getElementById('jmm-search').value = '';
                activeCat = 'all';
                tabsEl.querySelectorAll('.jmm-tab').forEach(t => t.classList.remove('active'));
                tabsEl.querySelector('.jmm-tab').classList.add('active');
                azEl.querySelectorAll('.jmm-az-letter').forEach(l => l.classList.remove('active'));
                el.classList.add('active');
                renderGrid();
            });
            azEl.appendChild(el);
        });

        // === Search ===
        document.getElementById('jmm-search').addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            filterLetter = null;
            azEl.querySelectorAll('.jmm-az-letter').forEach(l => l.classList.remove('active'));
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
        document.getElementById('jmm-dice').addEventListener('click', function () {
            if (diceAnimating) return;
            diceAnimating = true;

            const overlayDice = document.getElementById('jmm-dice-overlay');
            const diceEl = document.getElementById('jmm-dice-emoji');
            const btn = this;

            btn.classList.add('jmm-dice-spinning');
            diceEl.className = 'jmm-dice-emoji';
            void diceEl.offsetWidth;
            overlayDice.classList.add('active');
            playDiceRollSound();

            setTimeout(() => {
                diceEl.classList.add('rolling');
            }, 400);

            setTimeout(() => {
                diceEl.classList.remove('rolling');
                diceEl.classList.add('exit');

                const randomJob = JOBS[Math.floor(Math.random() * JOBS.length)];
                selectedJob = randomJob;
                selectedBonuses.clear();

                activeCat = randomJob.cat;
                filterLetter = null;
                tabsEl.querySelectorAll('.jmm-tab').forEach(t => t.classList.remove('active'));
                const targetTab = tabsEl.querySelector(`[data-cat="${randomJob.cat}"]`);
                if (targetTab) targetTab.classList.add('active');

                playSelectSound();
                renderGrid();
                renderBonus(randomJob);

                setTimeout(() => {
                    const selectedEl = document.querySelector('.jmm-job-chip.selected');
                    if (selectedEl) {
                        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        selectedEl.classList.add('random-pick');
                    }
                }, 80);

                setTimeout(() => {
                    overlayDice.classList.remove('active');
                    btn.classList.remove('jmm-dice-spinning');
                    diceAnimating = false;
                }, 350);

            }, 1400);
        });

        renderGrid();

        // === Close ===
        function closeModal() {
            overlay.style.animation = 'jmm-fadeIn .3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }
        document.getElementById('jmm-cancel').addEventListener('click', closeModal);
        document.getElementById('jmm-apply').addEventListener('click', () => {
            if (selectedJob) {
                addRecentJob(selectedJob.en);
                const recentTab = tabsEl.querySelector('[data-cat="recent"]');
                if (recentTab) {
                    recentTab.querySelector('.jmm-tab-count').textContent = getRecentJobs().length;
                }
                selectOption('job', selectedJob.value, { label: selectedJob.label, en: selectedJob.en, value: selectedJob.value });
                const bonusArr = [...selectedBonuses];
                if (bonusArr.length) {
                    state.customInputs['job'] = (state.customInputs['job'] || '') +
                        (state.customInputs['job'] ? ', ' : '') + bonusArr.join(', ');
                    state.customInputVisible['job'] = true;
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

        // === 取得篩選後的職業 ===
        function getFilteredJobs() {
            let filtered = JOBS;
            const recent = getRecentJobs();

            if (activeCat === 'recent') {
                filtered = recent.map(en => JOBS.find(j => j.en === en)).filter(Boolean);
            } else if (activeCat === 'hot') {
                filtered = JOBS.filter(j => j.isHot);
            } else if (activeCat !== 'all') {
                filtered = filtered.filter(j => j.cat === activeCat);
            }

            if (searchQuery) {
                filtered = filtered.filter(j =>
                    j.label.includes(searchQuery) || j.en.toLowerCase().includes(searchQuery) || j.value.toLowerCase().includes(searchQuery)
                );
            }
            if (filterLetter) {
                filtered = filtered.filter(j => j.en.charAt(0).toUpperCase() === filterLetter);
            }
            return filtered;
        }

        function renderGrid() {
            const grid = document.getElementById('jmm-grid');
            const filtered = getFilteredJobs();
            const recent = getRecentJobs();
            const total = JOBS.length;
            const shown = filtered.length;
            const selText = selectedJob ? ` | 已選：<b>${selectedJob.label}</b>` : '';
            document.getElementById('jmm-status').innerHTML = `已載入 ${total} 職業 | 顯示 ${shown}/${total}${selText}`;

            grid.innerHTML = '';
            if (!filtered.length) {
                grid.innerHTML = '<div class="jmm-empty">🔍 沒有找到符合的職業</div>';
                return;
            }

            filtered.forEach(job => {
                const chip = document.createElement('div');
                chip.className = 'jmm-job-chip' + (selectedJob && selectedJob.en === job.en ? ' selected' : '');
                chip.innerHTML = `
                    <span class="jmm-chip-icon">${job.icon}</span>
                    <div class="jmm-chip-text">
                        <span class="jmm-chip-zh">${job.label}</span>
                        <span class="jmm-chip-en">${job.en}</span>
                    </div>
                    ${job.isHot ? '<span class="jmm-hot-badge">🔥</span>' : ''}
                    ${recent.includes(job.en) ? '<span class="jmm-recent-badge">📋</span>' : ''}
                `;
                chip.addEventListener('click', () => {
                    if (selectedJob && selectedJob.en === job.en) {
                        selectedJob = null;
                        selectedBonuses.clear();
                    } else {
                        selectedJob = job;
                        selectedBonuses.clear();
                    }
                    playSelectSound();
                    renderGrid();
                    renderBonus(selectedJob);
                });
                grid.appendChild(chip);
            });

            document.getElementById('jmm-grid-wrap').scrollTop = 0;
        }

        function renderBonus(job) {
            const panel = document.getElementById('jmm-bonus');
            const tagsEl = document.getElementById('jmm-bonus-tags');
            const nameEl = document.getElementById('jmm-bonus-job');
            if (!job) { panel.classList.remove('show'); return; }
            const traits = BONUS_TRAITS[job.cat] || [];
            if (!traits.length) { panel.classList.remove('show'); return; }
            nameEl.textContent = job.label + ' ' + job.en;
            tagsEl.innerHTML = '';
            traits.forEach(trait => {
                const tag = document.createElement('button');
                tag.className = 'jmm-bonus-tag' + (selectedBonuses.has(trait.en) ? ' active' : '');
                tag.innerHTML = `<span class="jmm-chip-icon">${trait.icon}</span> ${trait.zh}`;
                tag.addEventListener('click', () => {
                    if (selectedBonuses.has(trait.en)) selectedBonuses.delete(trait.en);
                    else selectedBonuses.add(trait.en);
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
        openJobMagicModal
    };
})();
