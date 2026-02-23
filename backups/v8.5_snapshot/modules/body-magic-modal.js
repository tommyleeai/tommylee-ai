// ============================================
// AI Prompt Generator — Body Magic Modal
// openBodyMagicModal() 函式
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.BodyMagicModal = (function () {
    // Dependencies injected via setup()
    let state, sfx, BODY_MAGIC_DATA, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        BODY_MAGIC_DATA = deps.BODY_MAGIC_DATA;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    // ========================================
    // Body Magic Modal — Full Demo v2 Overlay
    // ========================================
    function openBodyMagicModal() {
        // Remove existing modal if any
        const existing = document.getElementById('body-magic-modal');
        if (existing) existing.remove();

        const currentGender = state.gender;
        const adv = state.bodyAdvanced || { primary: 4, build: 4, height: 4 };

        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'body-magic-modal';

        // ── Full Demo v2 CSS (scoped) ──
        overlay.innerHTML = `



        <div class="bmm-particles" id="bmm-particles"></div>
        <div class="bmm-container">
            <div class="bmm-title">🎛️ 身材控制系統 Demo v2 — 含幻想級別</div>
            <div class="bmm-subtitle">Body Type Weight System — 現實 ↔ 幻想級別 7 段滑桿</div>

            <div class="bmm-layout">
                <!-- LEFT: Controls -->
                <div class="bmm-panel">
                    <h2>⚙️ 控制面板</h2>
                    <div class="bmm-gender">
                        <button class="bmm-gender-btn${currentGender === 'female' ? ' active' : ''}" data-g="female">♀ 女性</button>
                        <button class="bmm-gender-btn${currentGender === 'male' ? ' active' : ''}" data-g="male">♂ 男性</button>
                    </div>

                    <!-- PRIMARY -->
                    <div class="bmm-feature" id="bmm-group-primary">
                        <div class="bmm-feature-header">
                            <span class="bmm-feature-label" id="bmm-label-primary">${currentGender === 'female' ? '胸部大小 (Bust Size)' : '肌肉量 (Musculature)'}</span>
                            <span class="bmm-feature-value" id="bmm-val-primary"></span>
                        </div>
                        <div class="bmm-scale" id="bmm-scale-primary">
                            ${currentGender === 'female'
                ? '<span class="fl">🔮 無</span><span>平坦</span><span>偏小</span><span>中等</span><span>豐滿</span><span>巨大</span><span class="fl">🔮 超巨</span>'
                : '<span class="fl">🔮 骷髏</span><span>纖瘦</span><span>偏瘦</span><span>標準</span><span>壯碩</span><span>極壯</span><span class="fl">🔮 浩克</span>'}
                        </div>
                        <div class="bmm-slider-wrap">
                            <div class="bmm-fz bmm-fz-l"></div>
                            <div class="bmm-fz bmm-fz-r"></div>
                            <input type="range" id="bmm-sl-primary" class="${currentGender === 'female' ? 'sl-bust' : 'sl-muscle'}" min="1" max="7" value="${adv.primary}" step="1">
                        </div>
                    </div>

                    <!-- BUILD -->
                    <div class="bmm-feature">
                        <div class="bmm-feature-header">
                            <span class="bmm-feature-label">體型 (Build)</span>
                            <span class="bmm-feature-value" id="bmm-val-build"></span>
                        </div>
                        <div class="bmm-scale">
                            <span class="fl">🔮 骨感</span><span>纖瘦</span><span>苗條</span><span>標準</span><span>豐腴</span><span>壯碩</span><span class="fl">🔮 泰坦</span>
                        </div>
                        <div class="bmm-slider-wrap">
                            <div class="bmm-fz bmm-fz-l"></div>
                            <div class="bmm-fz bmm-fz-r"></div>
                            <input type="range" id="bmm-sl-build" class="sl-weight" min="1" max="7" value="${adv.build}" step="1">
                        </div>
                    </div>

                    <!-- HEIGHT -->
                    <div class="bmm-feature">
                        <div class="bmm-feature-header">
                            <span class="bmm-feature-label">身高比例 (Height)</span>
                            <span class="bmm-feature-value" id="bmm-val-height"></span>
                        </div>
                        <div class="bmm-scale">
                            <span class="fl">🔮 蟻人</span><span>嬌小</span><span>偏矮</span><span>中等</span><span>偏高</span><span>高挑</span><span class="fl">🔮 巨人</span>
                        </div>
                        <div class="bmm-slider-wrap">
                            <div class="bmm-fz bmm-fz-l"></div>
                            <div class="bmm-fz bmm-fz-r"></div>
                            <input type="range" id="bmm-sl-height" class="sl-height" min="1" max="7" value="${adv.height}" step="1">
                        </div>
                    </div>

                    <!-- PRESETS -->
                    <div>
                        <div class="bmm-feature-label" style="margin-bottom: 8px; color: #e2e8f0;">快速預設 (Quick Presets)</div>
                        <div class="bmm-presets" id="bmm-preset-f" style="${currentGender === 'female' ? '' : 'display:none'}">
                            <span class="bmm-preset-label">寫實 Realistic</span>
                            <button class="bmm-preset-btn" data-p="loli">蘿莉體型</button>
                            <button class="bmm-preset-btn" data-p="petite">嬌小少女</button>
                            <button class="bmm-preset-btn" data-p="slim">苗條纖細</button>
                            <button class="bmm-preset-btn" data-p="average">標準均勻</button>
                            <button class="bmm-preset-btn" data-p="curvy">曲線性感</button>
                            <button class="bmm-preset-btn" data-p="voluptuous">豐滿誘人</button>
                            <button class="bmm-preset-btn" data-p="athletic_f">運動健美</button>
                            <div class="bmm-preset-divider"></div>
                            <span class="bmm-preset-label">🔮 幻想 Fantasy</span>
                            <button class="bmm-preset-btn fp" data-p="fairy">🧚 精靈仙子</button>
                            <button class="bmm-preset-btn fp" data-p="oppai">🎯 超乳幻想</button>
                            <button class="bmm-preset-btn fp" data-p="amazon">⚔️ 亞馬遜女戰士</button>
                            <button class="bmm-preset-btn fp" data-p="giantess">🏔️ 巨人族女性</button>
                            <button class="bmm-preset-btn fp" data-p="pixie">✨ 小精靈</button>
                        </div>
                        <div class="bmm-presets" id="bmm-preset-m" style="${currentGender === 'male' ? '' : 'display:none'}">
                            <span class="bmm-preset-label">寫實 Realistic</span>
                            <button class="bmm-preset-btn" data-p="shota">正太體型</button>
                            <button class="bmm-preset-btn" data-p="slim_m">纖瘦少年</button>
                            <button class="bmm-preset-btn" data-p="average_m">標準體型</button>
                            <button class="bmm-preset-btn" data-p="athletic_m">運動型</button>
                            <button class="bmm-preset-btn" data-p="muscular">肌肉壯碩</button>
                            <div class="bmm-preset-divider"></div>
                            <span class="bmm-preset-label">🔮 幻想 Fantasy</span>
                            <button class="bmm-preset-btn fp" data-p="elf_m">🧝 精靈族</button>
                            <button class="bmm-preset-btn fp" data-p="hulk">💪 浩克體型</button>
                            <button class="bmm-preset-btn fp" data-p="titan">🏔️ 泰坦巨人</button>
                            <button class="bmm-preset-btn fp" data-p="antman">🐜 蟻人縮小</button>
                            <button class="bmm-preset-btn fp" data-p="skeleton">💀 骷髏法師</button>
                        </div>
                    </div>
                </div>

                <!-- RIGHT: Output -->
                <div class="bmm-panel">
                    <h2>📝 生成結果</h2>
                    <div class="bmm-fbanner" id="bmm-fbanner">
                        <span class="icon">🔮</span>
                        <span>已進入<strong>幻想級別</strong>！魔咒包含超現實描述，失敗風險大增！</span>
                    </div>
                    <div class="bmm-output-label">✅ 正向提示詞 (Positive Prompt)</div>
                    <div class="bmm-output-text" id="bmm-out-pos"></div>
                    <div class="bmm-weight-ind">
                        <span style="color: #64748b;">魔法反噬：</span>
                        <div class="bmm-weight-bar"><div class="bmm-weight-fill" id="bmm-wf"></div></div>
                        <span class="bmm-weight-num" id="bmm-wn">1.0</span>
                    </div>
                    <div style="height: 12px;"></div>
                    <div class="bmm-output-label">❌ 反向咒語 (Negative Prompt)</div>
                    <div class="bmm-output-text" id="bmm-out-neg"></div>
                    <div class="bmm-output-label">📋 完整 YAML 輸出</div>
                    <div class="bmm-output-text" id="bmm-out-yaml" style="font-family: 'Consolas', monospace; font-size: 0.75rem;"></div>
                    <div class="bmm-explain" id="bmm-explain"></div>
                </div>
            </div>

            <div class="bmm-actions">
                <button class="bmm-btn-cancel" id="bmm-cancel">❌ 取消</button>
                <button class="bmm-btn-apply" id="bmm-apply">✨ 套用魔法</button>
            </div>
        </div>
        `;

        document.body.appendChild(overlay);

        // ── Particles ──
        const pc = document.getElementById('bmm-particles');
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.className = 'bmm-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 3 + 's';
            p.style.animationDuration = (2 + Math.random() * 3) + 's';
            const colors = ['#fbbf24', '#a78bfa', '#7c3aed', '#f59e0b', '#c084fc'];
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
            pc.appendChild(p);
        }

        // ── Sound ──
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            [800, 1200, 1600, 2000].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.frequency.value = freq; osc.type = 'sine';
                gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.3);
                osc.start(ctx.currentTime + i * 0.1); osc.stop(ctx.currentTime + i * 0.1 + 0.3);
            });
        } catch (e) { }

        // ── References ──
        const BUST = BODY_MAGIC_DATA.FEMALE_BUST;
        const MUSC = BODY_MAGIC_DATA.MALE_MUSCLE;
        const BLD = BODY_MAGIC_DATA.BUILD;
        const HGT = BODY_MAGIC_DATA.HEIGHT;
        const PRST = BODY_MAGIC_DATA.PRESETS;

        let modalGender = currentGender;
        const slP = document.getElementById('bmm-sl-primary');
        const slB = document.getElementById('bmm-sl-build');
        const slH = document.getElementById('bmm-sl-height');

        function fmtWeighted(tags, weight, isF) {
            if (!tags || tags.length === 0) return '';
            if (weight <= 1.0) return tags.join(', ');
            const cls = isF ? 'fantasy-tag' : 'weight';
            return tags.map(t => '<span class="' + cls + '">(' + t + ':' + weight.toFixed(1) + ')</span>').join(', ');
        }

        function updateModal() {
            const pVal = parseInt(slP.value);
            const bVal = parseInt(slB.value);
            const hVal = parseInt(slH.value);

            const primary = modalGender === 'female' ? BUST[pVal] : MUSC[pVal];
            const build = BLD[bVal];
            const height = HGT[hVal];
            const hasFantasy = primary.fantasy || build.fantasy || height.fantasy;

            // Fantasy banner
            document.getElementById('bmm-fbanner').classList.toggle('show', hasFantasy);

            // Value labels
            const vp = document.getElementById('bmm-val-primary');
            const vb = document.getElementById('bmm-val-build');
            const vh = document.getElementById('bmm-val-height');
            vp.textContent = primary.zh; vp.classList.toggle('fantasy', primary.fantasy);
            vb.textContent = build.zh; vb.classList.toggle('fantasy', build.fantasy);
            vh.textContent = height.zh; vh.classList.toggle('fantasy', height.fantasy);

            // Slider fantasy class
            slP.classList.toggle('in-fantasy', primary.fantasy);
            slB.classList.toggle('in-fantasy', build.fantasy);
            slH.classList.toggle('in-fantasy', height.fantasy);

            // Collect positive / negative
            const pPos = primary.positive || [];
            const bPos = build.positive || [];
            const hPos = height.positive || [];
            const pNeg = primary.negative || [];
            const bNeg = build.negative || [];
            const hNeg = height.negative || [];

            let allPos = [];
            if (pPos.length) allPos.push(fmtWeighted(pPos, primary.weight, primary.fantasy));
            if (bPos.length) allPos.push(fmtWeighted(bPos, build.weight, build.fantasy));
            if (hPos.length) allPos.push(fmtWeighted(hPos, height.weight, height.fantasy));
            const allNeg = [...new Set([...pNeg, ...bNeg, ...hNeg])];

            // Positive output
            document.getElementById('bmm-out-pos').innerHTML = allPos.filter(Boolean).join(', ') || '<span style="color:#64748b">（標準設定，無額外正向提示詞）</span>';

            // Negative output
            document.getElementById('bmm-out-neg').innerHTML = allNeg.length
                ? allNeg.map(t => '<span class="negative">' + t + '</span>').join(', ')
                : '<span style="color:#64748b">（無需負向提示詞）</span>';

            // YAML
            let yaml = '';
            if (pPos.length) {
                const k = modalGender === 'female' ? 'bust' : 'musculature';
                const pf = primary.fantasy ? '🔮 ' : '';
                yaml += '<span class="tag">' + k + ':</span> ' + pf + pPos.map(t => primary.weight > 1 ? '(' + t + ':' + primary.weight.toFixed(1) + ')' : t).join(', ') + '\n';
            }
            if (bPos.length) {
                const pf = build.fantasy ? '🔮 ' : '';
                yaml += '<span class="tag">build:</span> ' + pf + bPos.map(t => build.weight > 1 ? '(' + t + ':' + build.weight.toFixed(1) + ')' : t).join(', ') + '\n';
            }
            if (hPos.length) {
                const pf = height.fantasy ? '🔮 ' : '';
                yaml += '<span class="tag">height:</span> ' + pf + hPos.map(t => height.weight > 1 ? '(' + t + ':' + height.weight.toFixed(1) + ')' : t).join(', ') + '\n';
            }
            if (allNeg.length) yaml += '<span class="negative">negative:</span> ' + allNeg.join(', ');
            document.getElementById('bmm-out-yaml').innerHTML = yaml || '<span style="color:#64748b">body: average body</span>';

            // Weight indicator
            const maxW = Math.max(primary.weight, build.weight, height.weight);
            const pct = Math.min(((maxW - 1.0) / 0.8) * 100, 100);
            const wf = document.getElementById('bmm-wf');
            const wn = document.getElementById('bmm-wn');
            wf.style.width = pct + '%'; wn.textContent = maxW.toFixed(1);
            if (maxW >= 1.6) { wf.style.background = 'linear-gradient(to right, #fbbf24, #ef4444, #dc2626)'; wn.style.color = '#fbbf24'; }
            else if (maxW >= 1.3) { wf.style.background = 'linear-gradient(to right, #fbbf24, #ef4444)'; wn.style.color = '#fca5a5'; }
            else if (maxW >= 1.15) { wf.style.background = 'linear-gradient(to right, #86efac, #fbbf24)'; wn.style.color = '#fcd34d'; }
            else { wf.style.background = '#86efac'; wn.style.color = '#86efac'; }

            // Explanation
            const pExplain = primary.explain || '';
            const bExplain = build.explain || '';
            const hExplain = height.explain || '';
            document.getElementById('bmm-explain').innerHTML =
                '<strong>💡 原理說明：</strong><br>' +
                '▸ <strong>' + (modalGender === 'female' ? '胸部' : '肌肉') + '</strong>：' + pExplain +
                '<br>▸ <strong>體型</strong>：' + bExplain +
                '<br>▸ <strong>身高</strong>：' + hExplain;
        }

        // Track fantasy state to play sound on entry
        let prevFantasyCount = [adv.primary, adv.build, adv.height].filter(v => v === 1 || v === 7).length;

        function playFantasySound() {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                // Warning beeps then ascending sweep
                const notes = [329.63, 329.63, 440, 523.25, 659.25, 880];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain); gain.connect(ctx.destination);
                    osc.frequency.value = freq;
                    osc.type = i < 2 ? 'square' : 'triangle';
                    const t = ctx.currentTime + i * 0.09;
                    const vol = i < 2 ? 0.012 : 0.015;
                    gain.gain.setValueAtTime(0, t);
                    gain.gain.linearRampToValueAtTime(vol, t + 0.01);
                    gain.gain.setValueAtTime(vol, t + 0.06);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
                    osc.start(t); osc.stop(t + 0.15);
                });
            } catch (e) { }
        }

        updateModal();

        // Slider events with fantasy sound detection
        function onSliderInput() {
            updateModal();
            const curCount = [parseInt(slP.value), parseInt(slB.value), parseInt(slH.value)].filter(v => v === 1 || v === 7).length;
            if (curCount > prevFantasyCount) playFantasySound();
            prevFantasyCount = curCount;
        }
        slP.addEventListener('input', onSliderInput);
        slB.addEventListener('input', onSliderInput);
        slH.addEventListener('input', onSliderInput);

        // Gender toggle
        overlay.querySelectorAll('.bmm-gender-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                modalGender = btn.dataset.g;
                overlay.querySelectorAll('.bmm-gender-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('bmm-label-primary').textContent =
                    modalGender === 'female' ? '胸部大小 (Bust Size)' : '肌肉量 (Musculature)';
                document.getElementById('bmm-scale-primary').innerHTML =
                    modalGender === 'female'
                        ? '<span class="fl">🔮 無</span><span>平坦</span><span>偏小</span><span>中等</span><span>豐滿</span><span>巨大</span><span class="fl">🔮 超巨</span>'
                        : '<span class="fl">🔮 骷髏</span><span>纖瘦</span><span>偏瘦</span><span>標準</span><span>壯碩</span><span>極壯</span><span class="fl">🔮 浩克</span>';
                slP.className = modalGender === 'female' ? 'sl-bust' : 'sl-muscle';
                document.getElementById('bmm-preset-f').style.display = modalGender === 'female' ? 'flex' : 'none';
                document.getElementById('bmm-preset-m').style.display = modalGender === 'male' ? 'flex' : 'none';
                updateModal();
            });
        });

        // Presets
        overlay.querySelectorAll('.bmm-preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const p = PRST[btn.dataset.p];
                if (!p) return;
                slP.value = p.primary; slB.value = p.build; slH.value = p.height;
                updateModal();
            });
        });

        // Close helper
        function closeModal() {
            overlay.style.animation = 'bmm-fadeIn 0.3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }

        // Cancel
        document.getElementById('bmm-cancel').addEventListener('click', closeModal);

        // Apply
        document.getElementById('bmm-apply').addEventListener('click', () => {
            state.bodyAdvanced = {
                primary: parseInt(slP.value),
                build: parseInt(slB.value),
                height: parseInt(slH.value)
            };
            state.gender = modalGender;
            delete state.selections['bodyType'];

            // Spell casting sound (ascending arpeggio with shimmer)
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain); gain.connect(ctx.destination);
                    osc.frequency.value = freq;
                    osc.type = i < 3 ? 'triangle' : 'sine';
                    const t = ctx.currentTime + i * 0.08;
                    gain.gain.setValueAtTime(0, t);
                    gain.gain.linearRampToValueAtTime(0.06, t + 0.02);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
                    osc.start(t); osc.stop(t + 0.4);
                });
                // Shimmer layer
                const shim = ctx.createOscillator();
                const sg = ctx.createGain();
                shim.connect(sg); sg.connect(ctx.destination);
                shim.frequency.value = 2093; shim.type = 'sine';
                sg.gain.setValueAtTime(0.03, ctx.currentTime + 0.4);
                sg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
                shim.start(ctx.currentTime + 0.4); shim.stop(ctx.currentTime + 1.0);
            } catch (e) { }

            overlay.style.animation = 'bmm-fadeIn 0.3s ease reverse';
            setTimeout(() => {
                overlay.remove();
                renderTabContent();
                generatePrompt();
                saveState();
            }, 280);
        });

        // Click outside
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

        // ESC
        const escH = (e) => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escH); } };
        document.addEventListener('keydown', escH);
    }

    return {
        setup,
        openBodyMagicModal
    };
})();

