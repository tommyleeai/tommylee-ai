// ============================================
// AI Prompt Generator — Pose Magic Modal
// openPoseMagicModal() 函式
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.PoseMagicModal = (function () {
    let state, sfx, POSE_DATA, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        POSE_DATA = deps.POSE_DATA;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function openPoseMagicModal() {
        const existing = document.getElementById('pose-magic-modal');
        if (existing) existing.remove();

        // 讀取已儲存的狀態
        const saved = state.poseAdvanced || {};
        let selectedPose = saved.pose || null;  // { label, en, value, category }
        let selectedGravity = saved.gravity || 'neutral';
        let selectedGaze = saved.gaze || 'direct';
        let currentTab = selectedPose ? selectedPose.category : 'standing';
        let searchQuery = '';

        const TABS = POSE_DATA.TABS;
        const POSES = POSE_DATA.POSES;
        const GRAVITY = POSE_DATA.GRAVITY;
        const GAZE = POSE_DATA.GAZE;

        // === 建立 overlay ===
        const overlay = document.createElement('div');
        overlay.id = 'pose-magic-modal';

        // Tab HTML
        const tabsHtml = TABS.map(t => {
            const emoji = t.label.split(' ')[0];
            const text = t.label.split(' ').slice(1).join(' ');
            const count = POSES.filter(p => p.category === t.id).length;
            return `<button class="pmm-tab${t.id === currentTab ? ' active' : ''}" data-tab="${t.id}">
                <span class="pmm-tab-icon">${emoji}</span>
                <span class="pmm-tab-label">${text}</span>
            </button>`;
        }).join('');

        // 重心 HTML
        const gravityHtml = GRAVITY.map(g =>
            `<button class="pmm-attr-chip${selectedGravity === g.id ? ' active' : ''}" data-gid="${g.id}">${g.label}</button>`
        ).join('');

        // 視線 HTML
        const gazeHtml = GAZE.map(g =>
            `<button class="pmm-attr-chip${selectedGaze === g.id ? ' active' : ''}" data-gzid="${g.id}">${g.label}</button>`
        ).join('');

        overlay.innerHTML = `
            <div class="pmm-particles" id="pmm-particles"></div>
            <div class="pmm-container">
                <div class="pmm-header">
                    <div class="pmm-title-row">
                        <div class="pmm-title">🎭 角色姿勢魔法系統 — Pose Magic</div>
                        <div class="pmm-toolbar">
                            <button class="cmm-tool-btn" id="pmm-reset" title="重設"><span class="cmm-tool-icon">🔄</span> 重設</button>
                        </div>
                    </div>
                </div>
                <div class="pmm-tabs" id="pmm-tabs">${tabsHtml}</div>
                <div class="pmm-search-bar" style="padding:0 20px;margin-top:8px">
                    <input type="text" id="pmm-search" class="cmm-search-input" placeholder="🔍 搜尋姿勢（中文/英文）..." style="width:100%;padding:8px 12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:#e2e8f0;font-size:13px;outline:none;transition:border-color 0.2s" onfocus="this.style.borderColor='rgba(34,211,238,0.5)'" onblur="this.style.borderColor='rgba(255,255,255,0.12)'">
                </div>

                <div class="pmm-body">
                    <div class="pmm-grid-wrap" id="pmm-grid-wrap">
                        <div class="pmm-grid" id="pmm-grid"></div>
                    </div>

                    <div class="pmm-controls" id="pmm-controls">
                        <div class="pmm-controls-row">
                            <div class="pmm-attr-section">
                                <div class="pmm-attr-label">
                                    <span>⚖️ 重心位置</span>
                                    <span class="pmm-attr-value" id="pmm-gravity-val"></span>
                                </div>
                                <div class="pmm-attr-grid" id="pmm-gravity-grid">${gravityHtml}</div>
                            </div>

                            <div class="pmm-attr-section">
                                <div class="pmm-attr-label">
                                    <span>👁️ 視線方向</span>
                                    <span class="pmm-attr-value" id="pmm-gaze-val"></span>
                                </div>
                                <div class="pmm-attr-grid" id="pmm-gaze-grid">${gazeHtml}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pmm-preview" id="pmm-preview-area">
                    <div class="pmm-preview-label">📝 提示詞預覽</div>
                    <div class="pmm-preview-text" id="pmm-preview-text"></div>
                </div>

                <div class="pmm-footer">
                    <div class="pmm-status" id="pmm-status">選擇一個姿勢開始設定</div>
                    <div class="pmm-actions">
                        <button class="pmm-btn pmm-btn-cancel" id="pmm-cancel">❌ 取消</button>
                        <button class="pmm-btn pmm-btn-apply" id="pmm-apply">✨ 套用魔法</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // === 粒子效果 ===
        const pc = document.getElementById('pmm-particles');
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'pmm-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 3 + 's';
            p.style.animationDuration = (2 + Math.random() * 3) + 's';
            const colors = ['#22d3ee', '#06b6d4', '#0ea5e9', '#67e8f9', '#a5f3fc'];
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
            pc.appendChild(p);
        }

        // === 開啟音效 ===
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            [600, 900, 1200, 1500].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.frequency.value = freq; osc.type = 'sine';
                gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.3);
                osc.start(ctx.currentTime + i * 0.1); osc.stop(ctx.currentTime + i * 0.1 + 0.3);
            });
        } catch (e) { }

        // === 渲染姿勢網格 ===
        function renderGrid() {
            const grid = document.getElementById('pmm-grid');
            let filtered = POSES.filter(p => p.category === currentTab);
            // 搜尋過濾
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                filtered = filtered.filter(p =>
                    p.label.includes(searchQuery) || p.en.toLowerCase().includes(q) || p.value.toLowerCase().includes(q)
                );
            }
            if (filtered.length === 0) {
                grid.innerHTML = `<div class="pmm-empty">${searchQuery ? '找不到符合的姿勢' : '此分類暫無姿勢'}</div>`;
                return;
            }
            grid.innerHTML = filtered.map(p => {
                const sel = selectedPose && selectedPose.value === p.value ? ' selected' : '';
                return `<button class="pmm-pose-chip${sel}" data-value="${p.value}" data-label="${p.label}" data-en="${p.en}" data-cat="${p.category}">
                    <span class="pmm-chip-zh">${p.label}</span>
                    <span class="pmm-chip-en">${p.en}</span>
                </button>`;
            }).join('');
        }

        // === 更新預覽 ===
        function updatePreview() {
            const controls = document.getElementById('pmm-controls');
            const previewText = document.getElementById('pmm-preview-text');
            const gravityVal = document.getElementById('pmm-gravity-val');
            const gazeVal = document.getElementById('pmm-gaze-val');
            const statusEl = document.getElementById('pmm-status');

            if (!selectedPose) {
                controls.classList.remove('show');
                previewText.innerHTML = '<span style="color:#64748b">（請先選擇一個姿勢）</span>';
                statusEl.innerHTML = '選擇一個姿勢開始設定';
                return;
            }

            controls.classList.add('show');

            // 重心值顯示
            const grav = GRAVITY.find(g => g.id === selectedGravity);
            gravityVal.textContent = grav ? grav.label : '';

            // 視線值顯示
            const gz = GAZE.find(g => g.id === selectedGaze);
            gazeVal.textContent = gz ? gz.label : '';

            // 組合提示詞
            let promptParts = [];
            promptParts.push(selectedPose.value);

            // 加入重心（中立不加）
            if (grav && grav.value) {
                promptParts.push(grav.value);
            }

            // 加入視線
            if (gz && gz.value) {
                promptParts.push(gz.value);
            }

            const displayHtml = promptParts.map(p => `<span class="pmm-tag">${p}</span>`).join(', ');
            previewText.innerHTML = displayHtml;

            // 狀態列
            statusEl.innerHTML = `已選：<b>${selectedPose.label}</b> | 重心：<b>${grav ? grav.label : '—'}</b> | 視線：<b>${gz ? gz.label : '—'}</b>`;
        }

        // === 初始渲染 ===
        renderGrid();
        updatePreview();

        // === 搜尋 ===
        document.getElementById('pmm-search').addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            renderGrid();
        });

        // === Tab 切換 ===
        document.getElementById('pmm-tabs').addEventListener('click', (e) => {
            const tab = e.target.closest('.pmm-tab');
            if (!tab) return;
            sfx.playClick();
            currentTab = tab.dataset.tab;
            overlay.querySelectorAll('.pmm-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // 清空搜尋
            searchQuery = '';
            const searchInput = document.getElementById('pmm-search');
            if (searchInput) searchInput.value = '';
            renderGrid();
        });

        // === 姿勢選擇 ===
        document.getElementById('pmm-grid').addEventListener('click', (e) => {
            const chip = e.target.closest('.pmm-pose-chip');
            if (!chip) return;
            sfx.playClick();

            if (selectedPose && selectedPose.value === chip.dataset.value) {
                selectedPose = null;
            } else {
                selectedPose = {
                    label: chip.dataset.label,
                    en: chip.dataset.en,
                    value: chip.dataset.value,
                    category: chip.dataset.cat
                };
            }

            overlay.querySelectorAll('.pmm-pose-chip').forEach(c => c.classList.remove('selected'));
            if (selectedPose) chip.classList.add('selected');
            updatePreview();
        });

        // === 重心選擇 ===
        document.getElementById('pmm-gravity-grid').addEventListener('click', (e) => {
            const chip = e.target.closest('.pmm-attr-chip');
            if (!chip) return;
            sfx.playClick();
            // toggle：再次點擊已選中的項目 → 回到預設 neutral
            if (selectedGravity === chip.dataset.gid) {
                selectedGravity = 'neutral';
            } else {
                selectedGravity = chip.dataset.gid;
            }
            document.querySelectorAll('#pmm-gravity-grid .pmm-attr-chip').forEach(c => c.classList.remove('active'));
            const activeChip = document.querySelector(`#pmm-gravity-grid .pmm-attr-chip[data-gid="${selectedGravity}"]`);
            if (activeChip) activeChip.classList.add('active');
            updatePreview();
        });

        // === 視線選擇 ===
        document.getElementById('pmm-gaze-grid').addEventListener('click', (e) => {
            const chip = e.target.closest('.pmm-attr-chip');
            if (!chip) return;
            sfx.playClick();
            // toggle：再次點擊已選中的項目 → 回到預設 direct
            if (selectedGaze === chip.dataset.gzid) {
                selectedGaze = 'direct';
            } else {
                selectedGaze = chip.dataset.gzid;
            }
            document.querySelectorAll('#pmm-gaze-grid .pmm-attr-chip').forEach(c => c.classList.remove('active'));
            const activeChip = document.querySelector(`#pmm-gaze-grid .pmm-attr-chip[data-gzid="${selectedGaze}"]`);
            if (activeChip) activeChip.classList.add('active');
            updatePreview();
        });

        // === 重設 ===
        document.getElementById('pmm-reset').addEventListener('click', () => {
            sfx.playClick();
            selectedPose = null;
            selectedGravity = 'neutral';
            selectedGaze = 'direct';
            searchQuery = '';
            const searchInput = document.getElementById('pmm-search');
            if (searchInput) searchInput.value = '';
            overlay.querySelectorAll('.pmm-pose-chip').forEach(c => c.classList.remove('selected'));
            // 重設重心選擇
            document.querySelectorAll('#pmm-gravity-grid .pmm-attr-chip').forEach(c => c.classList.remove('active'));
            document.querySelector('#pmm-gravity-grid .pmm-attr-chip[data-gid="neutral"]').classList.add('active');
            // 重設視線選擇
            document.querySelectorAll('#pmm-gaze-grid .pmm-attr-chip').forEach(c => c.classList.remove('active'));
            document.querySelector('#pmm-gaze-grid .pmm-attr-chip[data-gzid="direct"]').classList.add('active');
            renderGrid();
            updatePreview();
        });

        // === 關閉 helper ===
        function closeModal() {
            overlay.style.animation = 'pmm-fadeIn 0.3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }

        // === 取消 ===
        document.getElementById('pmm-cancel').addEventListener('click', closeModal);

        // === 套用 ===
        document.getElementById('pmm-apply').addEventListener('click', () => {
            if (selectedPose) {
                state.poseAdvanced = {
                    pose: selectedPose,
                    gravity: selectedGravity,
                    gaze: selectedGaze
                };

                // 清除基礎選擇
                delete state.selections['pose'];
            } else {
                delete state.poseAdvanced;
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

            overlay.style.animation = 'pmm-fadeIn 0.3s ease reverse';
            setTimeout(() => {
                overlay.remove();
                renderTabContent();
                generatePrompt();
                saveState();
            }, 280);
        });

        // === 點擊外部關閉 ===
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

        // === ESC ===
        const escH = (e) => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escH); } };
        document.addEventListener('keydown', escH);
    }

    return {
        setup,
        openPoseMagicModal
    };
})();
