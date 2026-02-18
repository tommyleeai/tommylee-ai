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
            if (selA.toLowerCase().includes(rule.keyword_a) && selB.toLowerCase().includes(rule.keyword_b)) {
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
<style>
#conflict-overlay { position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center; }
#conflict-overlay .conflict-bg { position:absolute;inset:0;background:rgba(80,0,0,0.6);backdrop-filter:blur(8px);animation:bg-pulse 1s ease-in-out infinite alternate; }
@keyframes bg-pulse { 0%{background:rgba(80,0,0,0.6)} 100%{background:rgba(20,0,0,0.75)} }
#conflict-overlay .conflict-modal { position:relative;width:500px;max-width:92vw;background:linear-gradient(145deg,#1a0a0a 0%,#2a1020 40%,#1a0a1a 100%);border:2px solid #ff2244;border-radius:16px;overflow:hidden;animation:modal-enter 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards,border-glow 2s ease-in-out infinite;box-shadow:0 0 30px rgba(255,34,68,0.5),0 0 60px rgba(255,34,68,0.3),inset 0 1px 0 rgba(255,255,255,0.1); }
@keyframes modal-enter { 0%{transform:scale(0.3) rotate(-5deg);opacity:0} 60%{transform:scale(1.05) rotate(0.5deg);opacity:1} 100%{transform:scale(1) rotate(0deg);opacity:1} }
@keyframes border-glow { 0%{border-color:#ff2244;box-shadow:0 0 30px rgba(255,34,68,0.5),0 0 60px rgba(255,34,68,0.3),inset 0 1px 0 rgba(255,255,255,0.1)} 50%{border-color:#ff6644;box-shadow:0 0 40px rgba(255,102,68,0.6),0 0 80px rgba(255,102,68,0.3),inset 0 1px 0 rgba(255,255,255,0.1)} 100%{border-color:#ff2244;box-shadow:0 0 30px rgba(255,34,68,0.5),0 0 60px rgba(255,34,68,0.3),inset 0 1px 0 rgba(255,255,255,0.1)} }
.conflict-header { background:linear-gradient(135deg,rgba(255,34,68,0.3),rgba(200,0,40,0.2));padding:18px 24px;text-align:center;position:relative;overflow:hidden; }
.conflict-header::before { content:'';position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(0,0,0,0.1) 20px,rgba(0,0,0,0.1) 22px);animation:stripe-move 1s linear infinite; }
@keyframes stripe-move { 0%{transform:translateX(0)} 100%{transform:translateX(22px)} }
.conflict-title { font-size:1.3rem;font-weight:900;color:#ff4444;position:relative;text-shadow:0 0 15px rgba(255,68,68,0.5); }
.conflict-subtitle { font-size:0.75rem;color:rgba(255,255,255,0.7);margin-top:4px;position:relative;letter-spacing:2px; }
.conflict-body { padding:20px 24px; }
.conflict-desc { font-size:1.1rem;font-weight:600;line-height:1.7;color:#ddd;margin-bottom:8px;text-align:center;white-space:nowrap; }
.conflict-combo { display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:14px; }
.combo-tag { padding:8px 16px;border-radius:10px;font-weight:700;font-size:0.95rem; }
.combo-race { background:rgba(255,68,68,0.2);border:1px solid #ff4444;color:#ff8888; }
.combo-job { background:rgba(68,136,255,0.2);border:1px solid #4488ff;color:#88bbff; }
.combo-x { font-size:1.4rem;color:#ff4444;font-weight:900;text-shadow:0 0 10px rgba(255,68,68,0.5);animation:x-pulse 0.6s ease-in-out infinite alternate; }
@keyframes x-pulse { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(1.2);opacity:1} }
.conflict-reason { font-size:0.8rem;color:#aa8888;text-align:center;margin-bottom:16px;font-style:italic; }
.conflict-prompt-label { font-size:0.75rem;color:#888;margin-bottom:8px; }
.conflict-options { display:flex;flex-direction:column;gap:10px; }
.conflict-option { background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:14px 16px;cursor:pointer;transition:all 0.25s;text-align:left;font-family:inherit;color:inherit; }
.conflict-option:hover { border-color:rgba(255,255,255,0.3);background:rgba(255,255,255,0.08);transform:translateX(4px); }
.option-title { font-size:0.92rem;font-weight:700;margin-bottom:4px; }
.option-desc { font-size:0.75rem;color:#999;line-height:1.4; }
.option-1 .option-title { color:#ff8844; }
.option-2 .option-title { color:#44aaff; }
.option-3 .option-title { color:#44ff88; }
.conflict-counter { position:absolute;top:12px;right:16px;font-size:0.65rem;color:rgba(255,255,255,0.5);z-index:1; }
.screen-flash { position:fixed;inset:0;background:rgba(255,0,0,0.3);z-index:9998;pointer-events:none;opacity:0; }
.screen-flash.active { animation:flash-hit 0.4s ease-out forwards; }
@keyframes flash-hit { 0%{opacity:1} 100%{opacity:0} }
body.screen-shake { animation:shake-screen 0.4s ease-in-out; }
@keyframes shake-screen { 0%,100%{transform:translate(0)} 10%{transform:translate(-4px,2px)} 20%{transform:translate(4px,-2px)} 30%{transform:translate(-3px,1px)} 40%{transform:translate(3px,-1px)} 50%{transform:translate(-2px,1px)} 60%{transform:translate(2px,0)} 70%{transform:translate(-1px,0)} }
.remember-choice { margin-top:14px;padding:12px 14px;background:rgba(187,134,252,0.06);border:1px solid rgba(187,134,252,0.2);border-radius:8px;display:none; }
.remember-choice.visible { display:flex;align-items:center;gap:10px;animation:fadeSlideIn 0.3s ease forwards; }
@keyframes fadeSlideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.remember-choice input[type="checkbox"] { width:18px;height:18px;accent-color:#bb86fc;cursor:pointer;flex-shrink:0; }
.remember-choice label { font-size:0.8rem;color:#bb86fc;cursor:pointer;line-height:1.4; }
.remember-choice .hint { font-size:0.7rem;color:#888;margin-top:2px; }
.resolution-toast { position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(0,0,0,0.85);border:1px solid rgba(187,134,252,0.4);border-radius:12px;padding:14px 24px;color:#ddd;font-size:0.85rem;z-index:10000;opacity:0;transition:all 0.3s ease;max-width:500px;text-align:center; }
.resolution-toast.show { opacity:1;transform:translateX(-50%) translateY(0); }
</style>
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
        <div class="conflict-prompt-label">請選擇處理方式:</div>
        <div class="conflict-options">
            <button class="conflict-option option-1" id="conflict-opt-ignore">
                <div class="option-title">🔥 忽略警告，繼續執行</div>
                <div class="option-desc">⚠ 可能產生兩個角色的圖片，但保留你的原始設定</div>
            </button>
            <button class="conflict-option option-2" id="conflict-opt-dual">
                <div class="option-title">👥 接受雙人構圖</div>
                <div class="option-desc">系統加入「2characters」提示詞，明確生成雙角色構圖</div>
            </button>
            <button class="conflict-option option-3" id="conflict-opt-merge">
                <div class="option-title">✨ 合併為一體</div>
                <div class="option-desc">系統強調「一個角色同時具有兩種特質」，避免分裂</div>
            </button>
        </div>
        <div class="remember-choice ${state.conflictWarningCount >= 3 ? 'visible' : ''}" id="remember-choice">
            <input type="checkbox" id="remember-checkbox">
            <div>
                <label for="remember-checkbox">以後都用此方式處理，不再顯示警告</label>
                <div class="hint">可在「設定」中隨時重新開啟警告</div>
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
            if (type === 'ignore') toastMsg = '🔥 已忽略警告 — 保留原始設定';
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
                    showConflictToast('⚡ 已自動套用: ' + (state.conflictAutoResolution === 'ignore' ? '🔥 忽略警告' : state.conflictAutoResolution === 'dual' ? '👥 雙人構圖' : '✨ 合併一體'));
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

