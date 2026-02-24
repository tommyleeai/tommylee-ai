// ============================================
// AI Prompt Generator — Expression Magic Modal
// openExpressionMagicModal() 函式
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.ExpressionMagicModal = (function () {
    let state, sfx, EXPR_DATA, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        EXPR_DATA = deps.EXPR_DATA;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function openExpressionMagicModal() {
        const existing = document.getElementById('expression-magic-modal');
        if (existing) existing.remove();

        // 讀取已儲存的狀態
        const saved = state.expressionAdvanced || {};
        let selectedExpr = saved.expression || null;  // { label, en, value, category }
        let intensity = saved.intensity || 4;
        let activeEffects = new Set(saved.effects || []);
        let currentTab = selectedExpr ? selectedExpr.category : 'joy';
        let searchQuery = '';

        const TABS = EXPR_DATA.TABS;
        const EXPRS = EXPR_DATA.EXPRESSIONS;
        const INTENSITY = EXPR_DATA.INTENSITY;
        const EFFECTS = EXPR_DATA.EFFECTS;

        // === 建立 overlay ===
        const overlay = document.createElement('div');
        overlay.id = 'expression-magic-modal';

        // Tab HTML
        const tabsHtml = TABS.map(t => {
            const count = EXPRS.filter(e => e.category === t.id).length;
            return `<button class="emm-tab${t.id === currentTab ? ' active' : ''}" data-tab="${t.id}">
                <span class="emm-tab-icon">${t.icon}</span>
                <span class="emm-tab-zh">${t.label}</span>
                <span class="emm-tab-en">${t.en}</span>
                <span class="emm-tab-count">${count}</span>
            </button>`;
        }).join('');

        // 特效 HTML
        const effectsHtml = EFFECTS.map(ef =>
            `<button class="emm-effect-chip${activeEffects.has(ef.id) ? ' active' : ''}" data-eid="${ef.id}">${ef.label}</button>`
        ).join('');

        overlay.innerHTML = `
            <div class="emm-particles" id="emm-particles"></div>
            <div class="emm-container">
                <div class="emm-header">
                    <div class="emm-title-row">
                        <div class="emm-title">🎭 表情魔法系統 — Expression Magic</div>
                        <div class="emm-toolbar">
                            <button class="cmm-tool-btn" id="emm-reset" title="重設"><span class="cmm-tool-icon">🔄</span> 重設</button>
                        </div>
                    </div>
                </div>
                <div class="emm-tabs" id="emm-tabs">${tabsHtml}</div>
                <div class="emm-search-bar" style="padding:0 20px;margin-top:8px">
                    <input type="text" id="emm-search" class="cmm-search-input" placeholder="🔍 搜尋表情（中文/英文）..." style="width:100%;padding:8px 12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:#e2e8f0;font-size:13px;outline:none;transition:border-color 0.2s" onfocus="this.style.borderColor='rgba(167,139,250,0.5)'" onblur="this.style.borderColor='rgba(255,255,255,0.12)'">
                </div>

                <div class="emm-fbanner" id="emm-fbanner">
                    <span>🔮</span>
                    <span>已進入<strong>幻想級別</strong>！表情強度超越現實極限，生成失敗風險大增！</span>
                </div>

                <div class="emm-body">
                    <div class="emm-grid-wrap" id="emm-grid-wrap">
                        <div class="emm-grid" id="emm-grid"></div>
                    </div>

                    <div class="emm-controls" id="emm-controls">
                        <div class="emm-controls-row">
                            <div class="emm-intensity">
                                <div class="emm-intensity-label">
                                    <span>⚡ 強度推桿</span>
                                    <span class="emm-intensity-value" id="emm-int-val"></span>
                                </div>
                                <div class="emm-scale">
                                    <span class="fl">🔮極微</span><span>輕微</span><span>自然</span><span>標準</span><span>強烈</span><span>誇張</span><span class="fl">🔮爆發</span>
                                </div>
                                <div class="emm-slider-wrap">
                                    <div class="emm-fz emm-fz-l"></div>
                                    <div class="emm-fz emm-fz-r"></div>
                                    <input type="range" class="emm-slider" id="emm-slider" min="1" max="7" value="${intensity}" step="1">
                                </div>
                                <div class="emm-explain" id="emm-explain"></div>
                            </div>

                            <div class="emm-effects">
                                <div class="emm-effects-label">✨ 特效加成</div>
                                <div class="emm-effects-grid" id="emm-effects-grid">${effectsHtml}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="emm-preview" id="emm-preview-area">
                    <div class="emm-preview-label">📝 提示詞預覽</div>
                    <div class="emm-preview-text" id="emm-preview-text"></div>
                    <div class="emm-weight-ind">
                        <span style="color:#64748b">魔法反噬：</span>
                        <div class="emm-weight-bar"><div class="emm-weight-fill" id="emm-wf"></div></div>
                        <span class="emm-weight-num" id="emm-wn">1.0</span>
                    </div>
                </div>

                <div class="emm-footer">
                    <div class="emm-status" id="emm-status">選擇一個表情開始設定</div>
                    <div class="emm-actions">
                        <button class="emm-btn emm-btn-cancel" id="emm-cancel">❌ 取消</button>
                        <button class="emm-btn emm-btn-apply" id="emm-apply">✨ 套用魔法</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // === 粒子效果 ===
        const pc = document.getElementById('emm-particles');
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'emm-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 3 + 's';
            p.style.animationDuration = (2 + Math.random() * 3) + 's';
            const colors = ['#fbbf24', '#a78bfa', '#7c3aed', '#f59e0b', '#c084fc'];
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
            pc.appendChild(p);
        }

        // === 開啟音效 ===
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

        // === 渲染表情網格 ===
        function renderGrid() {
            const grid = document.getElementById('emm-grid');
            let filtered = EXPRS.filter(e => e.category === currentTab);
            // 搜尋過濾
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                filtered = filtered.filter(e =>
                    e.label.includes(searchQuery) || e.en.toLowerCase().includes(q) || e.value.toLowerCase().includes(q)
                );
            }
            if (filtered.length === 0) {
                grid.innerHTML = `<div class="emm-empty">${searchQuery ? '找不到符合的表情' : '此分類暫無表情'}</div>`;
                return;
            }
            grid.innerHTML = filtered.map(e => {
                const sel = selectedExpr && selectedExpr.value === e.value ? ' selected' : '';
                return `<button class="emm-expr-chip${sel}" data-value="${e.value}" data-label="${e.label}" data-en="${e.en}" data-cat="${e.category}">
                    <span class="emm-chip-zh">${e.label}</span>
                    <span class="emm-chip-en">${e.en}</span>
                </button>`;
            }).join('');
        }

        // === 更新預覽 ===
        function updatePreview() {
            const controls = document.getElementById('emm-controls');
            const previewText = document.getElementById('emm-preview-text');
            const intVal = document.getElementById('emm-int-val');
            const explain = document.getElementById('emm-explain');
            const fbanner = document.getElementById('emm-fbanner');
            const slider = document.getElementById('emm-slider');
            const statusEl = document.getElementById('emm-status');

            if (!selectedExpr) {
                controls.classList.remove('show');
                previewText.innerHTML = '<span style="color:#64748b">（請先選擇一個表情）</span>';
                statusEl.innerHTML = '選擇一個表情開始設定';
                fbanner.classList.remove('show');
                // 權重歸 0
                document.getElementById('emm-wf').style.width = '0%';
                document.getElementById('emm-wn').textContent = '1.0';
                return;
            }

            controls.classList.add('show');
            const lvl = INTENSITY[intensity];

            // 幻想 banner
            fbanner.classList.toggle('show', lvl.fantasy);

            // 強度值
            intVal.textContent = lvl.zh;
            intVal.classList.toggle('fantasy', lvl.fantasy);

            // 滑桿幻想樣式
            slider.classList.toggle('in-fantasy', lvl.fantasy);

            // 左右幻想光暈
            const fzL = overlay.querySelector('.emm-fz-l');
            const fzR = overlay.querySelector('.emm-fz-r');
            fzL.style.opacity = intensity === 1 ? '1' : '0';
            fzR.style.opacity = intensity === 7 ? '1' : '0';

            // 說明
            explain.innerHTML = lvl.explain;

            // 組合提示詞
            let promptParts = [];
            let baseValue = selectedExpr.value;

            // 加入強度修飾
            if (lvl.modifier) {
                promptParts.push(lvl.modifier + ' ' + baseValue);
            } else {
                promptParts.push(baseValue);
            }

            // 加入特效
            activeEffects.forEach(eid => {
                const ef = EFFECTS.find(e => e.id === eid);
                if (ef) promptParts.push(ef.value);
            });

            // 權重包裝
            const w = lvl.weight;
            let displayHtml = '';
            if (w > 1.0) {
                const cls = lvl.fantasy ? 'fantasy-tag' : 'weight-tag';
                displayHtml = promptParts.map(p => `<span class="${cls}">(${p}:${w.toFixed(1)})</span>`).join(', ');
            } else {
                displayHtml = promptParts.join(', ');
            }

            previewText.innerHTML = displayHtml;

            // 權重指示器
            const pct = Math.min(((w - 1.0) / 0.8) * 100, 100);
            const wf = document.getElementById('emm-wf');
            const wn = document.getElementById('emm-wn');
            wf.style.width = pct + '%';
            wn.textContent = w.toFixed(1);
            if (w >= 1.6) { wf.style.background = 'linear-gradient(to right, #fbbf24, #ef4444, #dc2626)'; wn.style.color = '#fbbf24'; }
            else if (w >= 1.3) { wf.style.background = 'linear-gradient(to right, #fbbf24, #ef4444)'; wn.style.color = '#fca5a5'; }
            else if (w >= 1.15) { wf.style.background = 'linear-gradient(to right, #86efac, #fbbf24)'; wn.style.color = '#fcd34d'; }
            else { wf.style.background = '#86efac'; wn.style.color = '#86efac'; }

            // 狀態列
            const effectCount = activeEffects.size;
            statusEl.innerHTML = `已選：<b>${selectedExpr.label}</b> | 強度：<b>${lvl.zh}</b>${effectCount > 0 ? ' | 特效：<b>' + effectCount + '個</b>' : ''}`;
        }

        // === 幻想音效 ===
        let prevFantasy = INTENSITY[intensity] ? INTENSITY[intensity].fantasy : false;

        function playFantasySound() {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
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

        // === 初始渲染 ===
        renderGrid();
        updatePreview();

        // === 搜尋 ===
        document.getElementById('emm-search').addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            renderGrid();
        });

        // === Tab 切換 ===
        document.getElementById('emm-tabs').addEventListener('click', (e) => {
            const tab = e.target.closest('.emm-tab');
            if (!tab) return;
            sfx.playClick();
            currentTab = tab.dataset.tab;
            overlay.querySelectorAll('.emm-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // 清空搜尋
            searchQuery = '';
            const searchInput = document.getElementById('emm-search');
            if (searchInput) searchInput.value = '';
            renderGrid();
        });

        // === 表情選擇 ===
        document.getElementById('emm-grid').addEventListener('click', (e) => {
            const chip = e.target.closest('.emm-expr-chip');
            if (!chip) return;
            sfx.playClick();

            // 切換選擇
            if (selectedExpr && selectedExpr.value === chip.dataset.value) {
                selectedExpr = null;
            } else {
                selectedExpr = {
                    label: chip.dataset.label,
                    en: chip.dataset.en,
                    value: chip.dataset.value,
                    category: chip.dataset.cat
                };
            }

            // 更新 chip 狀態
            overlay.querySelectorAll('.emm-expr-chip').forEach(c => c.classList.remove('selected'));
            if (selectedExpr) chip.classList.add('selected');

            updatePreview();
        });

        // === 滑桿 ===
        document.getElementById('emm-slider').addEventListener('input', (e) => {
            intensity = parseInt(e.target.value);
            const curFantasy = INTENSITY[intensity].fantasy;
            if (curFantasy && !prevFantasy) playFantasySound();
            prevFantasy = curFantasy;
            updatePreview();
        });

        // === 特效 ===
        document.getElementById('emm-effects-grid').addEventListener('click', (e) => {
            const chip = e.target.closest('.emm-effect-chip');
            if (!chip) return;
            sfx.playClick();
            const eid = chip.dataset.eid;
            if (activeEffects.has(eid)) {
                activeEffects.delete(eid);
                chip.classList.remove('active');
            } else {
                activeEffects.add(eid);
                chip.classList.add('active');
            }
            updatePreview();
        });

        // === 重設 ===
        document.getElementById('emm-reset').addEventListener('click', () => {
            sfx.playClick();
            selectedExpr = null;
            intensity = 4;
            activeEffects.clear();
            searchQuery = '';
            const searchInput = document.getElementById('emm-search');
            if (searchInput) searchInput.value = '';
            document.getElementById('emm-slider').value = 4;
            overlay.querySelectorAll('.emm-expr-chip').forEach(c => c.classList.remove('selected'));
            overlay.querySelectorAll('.emm-effect-chip').forEach(c => c.classList.remove('active'));
            renderGrid();
            updatePreview();
        });

        // === 關閉 helper ===
        function closeModal() {
            window.PromptGen.ModalRegistry.unregister('expression-magic-modal');
            overlay.style.animation = 'emm-fadeIn 0.3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }

        // === 取消 ===
        document.getElementById('emm-cancel').addEventListener('click', closeModal);

        // === 套用 ===
        document.getElementById('emm-apply').addEventListener('click', () => {
            if (selectedExpr) {
                const lvl = INTENSITY[intensity];
                state.expressionAdvanced = {
                    expression: selectedExpr,
                    intensity: intensity,
                    effects: Array.from(activeEffects)
                };

                // 更新基礎選擇
                delete state.selections['expression'];
            } else {
                // 清除表情進階
                delete state.expressionAdvanced;
            }

            // 施法音效
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
            } catch (e) { }

            overlay.style.animation = 'emm-fadeIn 0.3s ease reverse';
            setTimeout(() => {
                overlay.remove();
                renderTabContent();
                generatePrompt();
                saveState();
            }, 280);
        });

        // === 點擊外部關閉 ===
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

        // 註冊到 ModalRegistry（統一 ESC 關閉）
        window.PromptGen.ModalRegistry.register('expression-magic-modal', closeModal);
    }

    return {
        setup,
        openExpressionMagicModal
    };
})();
