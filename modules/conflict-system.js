// ============================================
// AI Prompt Generator — 衝突偵測系統
// checkAllConflicts, playConflictAlarm, showConflictModal, etc.
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.ConflictSystem = (function () {
    // Dependencies injected via setup()
    let state, sfx, CONFLICT_RULES, generatePrompt, saveState, selectOption;
    let RACES, JOBS, OUTFITS, BODY_TYPES_FEMALE, BODY_TYPES_MALE, HAIRSTYLES_FEMALE, HAIRSTYLES_MALE;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        CONFLICT_RULES = deps.CONFLICT_RULES;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        selectOption = deps.selectOption;
        RACES = deps.RACES;
        JOBS = deps.JOBS;
        OUTFITS = deps.OUTFITS;
        BODY_TYPES_FEMALE = deps.BODY_TYPES_FEMALE;
        BODY_TYPES_MALE = deps.BODY_TYPES_MALE;
        HAIRSTYLES_FEMALE = deps.HAIRSTYLES_FEMALE;
        HAIRSTYLES_MALE = deps.HAIRSTYLES_MALE;
    }

    // ========================================
    // Conflict Detection & Enforcement System
    // (Restored from conflict_demo.html v3)
    // ========================================

    function checkAllConflicts() {
        for (const rule of CONFLICT_RULES) {
            // Gender-aware: 'gender' key uses state.gender directly
            const selA = rule.a === 'gender' ? state.gender : state.selections[rule.a];
            const selB = rule.b === 'gender' ? state.gender : state.selections[rule.b];
            if (!selA || !selB) continue;
            const matchA = rule.a === 'gender' ? selA === rule.keyword_a : selA.toLowerCase().includes(rule.keyword_a);
            const matchB = rule.b === 'gender' ? selB === rule.keyword_b : selB.toLowerCase().includes(rule.keyword_b);
            if (matchA && matchB) {
                // Find labels from data arrays
                let labelA = rule.keyword_a, labelB = rule.keyword_b;
                const findLabel = (data, val) => {
                    if (!data) return val;
                    const item = data.find(d => d.value === val || d.value.toLowerCase().includes(val));
                    return item ? item.label : val;
                };
                const catDataMap = {
                    race: RACES,
                    job: JOBS,
                    outfit: OUTFITS,
                    bodyType: state.gender === 'female' ? BODY_TYPES_FEMALE : BODY_TYPES_MALE,
                    hairstyle: state.gender === 'female' ? HAIRSTYLES_FEMALE : HAIRSTYLES_MALE
                };
                // For gender category, use localized label
                if (rule.a === 'gender') {
                    labelA = state.gender === 'male' ? '男性' : '女性';
                } else if (catDataMap[rule.a]) {
                    labelA = findLabel(catDataMap[rule.a], selA);
                }
                if (rule.b === 'gender') {
                    labelB = state.gender === 'male' ? '男性' : '女性';
                } else if (catDataMap[rule.b]) {
                    labelB = findLabel(catDataMap[rule.b], selB);
                }
                return { rule, labelA, labelB, catA: rule.a, catB: rule.b, reason: rule.reason };
            }
        }
        return null;
    }

    let conflictAlarmOscillators = [];
    let conflictAudioCtx = null;

    function playConflictAlarm() {
        try {
            if (!conflictAudioCtx) conflictAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (conflictAudioCtx.state === 'suspended') conflictAudioCtx.resume();
            const c = conflictAudioCtx, t = c.currentTime;
            const master = c.createGain(); master.gain.value = 0.25; master.connect(c.destination);
            stopConflictAlarm();
            // Impact boom
            const impact = c.createOscillator(); const impG = c.createGain();
            impact.type = 'sine'; impact.frequency.setValueAtTime(100, t);
            impact.frequency.exponentialRampToValueAtTime(25, t + 0.4);
            impG.gain.setValueAtTime(0.7, t); impG.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
            impact.connect(impG); impG.connect(master); impact.start(t); impact.stop(t + 0.45);
            // Metal clang
            const clangSize = c.sampleRate * 0.15;
            const clangBuf = c.createBuffer(1, clangSize, c.sampleRate);
            const cd = clangBuf.getChannelData(0);
            for (let i = 0; i < clangSize; i++) cd[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / clangSize, 2);
            const clang = c.createBufferSource(); clang.buffer = clangBuf;
            const cf = c.createBiquadFilter(); cf.type = 'bandpass'; cf.frequency.value = 2500; cf.Q.value = 5;
            const cg = c.createGain(); cg.gain.value = 0.35;
            clang.connect(cf); cf.connect(cg); cg.connect(master); clang.start(t);
            // Repeating siren
            const dur = 3.0, bLen = 0.12, gap = 0.06, cyc = bLen + gap;
            for (let i = 0; i * cyc < dur; i++) {
                const st = t + 0.2 + i * cyc, freq = i % 2 === 0 ? 880 : 660;
                const s = c.createOscillator(); const sg = c.createGain();
                s.type = 'square'; s.frequency.setValueAtTime(freq, st);
                sg.gain.setValueAtTime(0.18, st); sg.gain.setValueAtTime(0.18, st + bLen * 0.8);
                sg.gain.exponentialRampToValueAtTime(0.001, st + bLen);
                s.connect(sg); sg.connect(master); s.start(st); s.stop(st + bLen + 0.01);
                conflictAlarmOscillators.push(s);
            }
            // Sub-bass pulse
            for (let i = 0; i < 6; i++) {
                const ps = t + 0.2 + i * 0.5;
                const p = c.createOscillator(); const pg = c.createGain();
                p.type = 'sine'; p.frequency.value = 45;
                pg.gain.setValueAtTime(0.3, ps); pg.gain.exponentialRampToValueAtTime(0.001, ps + 0.25);
                p.connect(pg); pg.connect(master); p.start(ps); p.stop(ps + 0.3);
                conflictAlarmOscillators.push(p);
            }
        } catch (e) { }
    }

    function stopConflictAlarm() {
        conflictAlarmOscillators.forEach(o => { try { o.stop(); } catch (e) { } });
        conflictAlarmOscillators = [];
    }

    function playResolveSound() {
        try {
            stopConflictAlarm();
            if (!conflictAudioCtx) return;
            const c = conflictAudioCtx, t = c.currentTime;
            const m = c.createGain(); m.gain.value = 0.15; m.connect(c.destination);
            [659.25, 783.99, 1046.5].forEach((f, i) => {
                const o = c.createOscillator(); const g = c.createGain();
                o.type = 'sine'; o.frequency.value = f;
                g.gain.setValueAtTime(0.2, t + i * 0.08);
                g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.3);
                o.connect(g); g.connect(m); o.start(t + i * 0.08); o.stop(t + i * 0.08 + 0.35);
            });
        } catch (e) { }
    }

    function showConflictModal(conflict) {
        state.conflictInfo = conflict;
        state.conflictWarningCount++;
        // Remove existing
        const existing = document.getElementById('conflict-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'conflict-overlay';
        overlay.innerHTML = `


<div class="conflict-bg"></div>
<div class="conflict-modal">
    <div class="conflict-header">
        <div class="conflict-title">⚠️ 危險! 魔法錯誤警告!</div>
        <div class="conflict-subtitle">MAGIC CONFLICT DETECTED</div>
        <div class="conflict-counter">第 ${state.conflictWarningCount} 次警告</div>
    </div>
    <div class="conflict-body">
        <div class="conflict-combo">
            <span class="combo-tag combo-race">${conflict.labelA}</span>
            <span class="combo-x">✕</span>
            <span class="combo-tag combo-job">${conflict.labelB}</span>
        </div>
        <div class="conflict-desc">「<strong>${conflict.labelA}</strong>」×「<strong>${conflict.labelB}</strong>」組合偵測到衝突！</div>
        <div class="conflict-reason">${conflict.reason}</div>
        <div class="conflict-prompt-label">⚔️ 命運的岔路已現，魔法師請下達神諭：</div>
        <div class="conflict-options">
            <button class="conflict-option option-1" id="conflict-opt-ignore">
                <div class="option-title">🔥 無視禁忌，強行突破！</div>
                <div class="option-desc">⚠ 代價未知，但你的原始魔法陣將完整保留</div>
            </button>
            <button class="conflict-option option-2" id="conflict-opt-dual">
                <div class="option-title">👥 召喚分身！雙重存在！</div>
                <div class="option-desc">系統植入「2characters」咒文，讓兩個靈魂同時現身</div>
            </button>
            <button class="conflict-option option-3" id="conflict-opt-merge">
                <div class="option-title">✨ 禁忌融合！兩魂歸一！</div>
                <div class="option-desc">系統將兩種矛盾特質鍛造成一個全新的生命體</div>
            </button>
        </div>
        <div class="remember-choice ${state.conflictWarningCount >= 3 ? 'visible' : ''}" id="remember-choice">
            <input type="checkbox" id="remember-checkbox">
            <div>
                <label for="remember-checkbox">記住我的選擇，別再煩我！</label>
                <div class="hint">在「設定」中可以重新召喚這個煩人的警告</div>
            </div>
        </div>
    </div>
</div>
        `;
        document.body.appendChild(overlay);

        // Screen flash
        let flash = document.getElementById('screen-flash-conflict');
        if (!flash) { flash = document.createElement('div'); flash.id = 'screen-flash-conflict'; flash.className = 'screen-flash'; document.body.appendChild(flash); }
        flash.classList.remove('active'); void flash.offsetWidth; flash.classList.add('active');

        // Screen shake — remove class after animation to prevent breaking position:fixed
        document.body.classList.remove('screen-shake'); void document.body.offsetWidth; document.body.classList.add('screen-shake');
        setTimeout(() => document.body.classList.remove('screen-shake'), 500);

        // Alarm
        playConflictAlarm();

        // Button handlers
        const resolveConflict = (type) => {
            state.conflictResolution = type;
            const rememberCb = document.getElementById('remember-checkbox');
            if (rememberCb && rememberCb.checked) {
                state.conflictAutoResolution = type;
                state.conflictWarningsEnabled = false;
            }
            overlay.remove();
            playResolveSound();
            let toastMsg = '';
            if (type === 'ignore') toastMsg = '🔥 禁忌已無視 — 原始魔法陣完整保留';
            else if (type === 'dual') toastMsg = '👥 已切換為雙人構圖 — 加入 "2characters"';
            else if (type === 'merge') toastMsg = '✨ 已合併為一體 — 強調單一角色';
            if (rememberCb && rememberCb.checked) toastMsg += '\n📌 已記住此選擇';
            showConflictToast(toastMsg);
            generatePrompt();
            saveState();
        };
        document.getElementById('conflict-opt-ignore').addEventListener('click', () => resolveConflict('ignore'));
        document.getElementById('conflict-opt-dual').addEventListener('click', () => resolveConflict('dual'));
        document.getElementById('conflict-opt-merge').addEventListener('click', () => resolveConflict('merge'));
    }

    function showConflictToast(msg) {
        let toast = document.getElementById('conflict-resolution-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'conflict-resolution-toast';
            document.body.appendChild(toast);
        }
        // Use absolute positioning with JS-calculated coords (position:fixed breaks with backdrop-filter/transform parents)
        toast.style.cssText = 'position:absolute;background:rgba(0,0,0,0.85);border:1px solid rgba(187,134,252,0.4);border-radius:12px;padding:14px 24px;color:#ddd;font-size:0.85rem;z-index:10000;max-width:500px;text-align:center;white-space:pre-line;transition:opacity 0.3s ease;pointer-events:none;';
        toast.textContent = msg;
        // Position at bottom-center of viewport
        document.body.appendChild(toast); // ensure it's in body
        const tw = toast.offsetWidth;
        toast.style.left = ((window.innerWidth - tw) / 2) + 'px';
        toast.style.top = (window.scrollY + window.innerHeight - 80) + 'px';
        toast.style.opacity = '1';
        clearTimeout(toast._hideTimer);
        toast._hideTimer = setTimeout(() => {
            toast.style.opacity = '0';
        }, 3500);
    }

    function onSelectionChanged() {
        try {
            state.conflictResolution = null;
            const conflict = checkAllConflicts();
            if (conflict) {
                state.conflictInfo = conflict;
                if (!state.conflictWarningsEnabled && state.conflictAutoResolution) {
                    state.conflictResolution = state.conflictAutoResolution;
                    generatePrompt();
                    showConflictToast('⚡ 已自動套用: ' + (state.conflictAutoResolution === 'ignore' ? '🔥 無視禁忌' : state.conflictAutoResolution === 'dual' ? '👥 召喚分身' : '✨ 禁忌融合'));
                    return;
                }
                showConflictModal(conflict);
            } else {
                state.conflictInfo = null;
                generatePrompt();
            }
        } catch (err) {
            console.warn('Conflict system error:', err);
            generatePrompt();
        }
    }

    return {
        setup,
        checkAllConflicts,
        playConflictAlarm,
        stopConflictAlarm,
        playResolveSound,
        showConflictModal,
        showConflictToast,
        onSelectionChanged
    };
})();

