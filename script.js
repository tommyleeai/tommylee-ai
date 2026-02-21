document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---

    // ============================================
    // v7.4.1 模組化匯入 — 從 window.PromptGen 讀取
    // ============================================
    const Data = window.PromptGen.Data;
    const {
        TABS, RACES, JOBS, CONFLICT_RULES, HAIRSTYLES_FEMALE, HAIRSTYLES_MALE,
        HAIR_COLORS, EYE_COLORS, OUTFITS, HEADWEAR, HAND_ITEMS, EXPRESSIONS, MOODS,
        ANIME_STYLES, ART_STYLES, ARTISTS, QUALITY_TAGS,
        SCENES, WEATHER, LIGHTING, CAMERA_ANGLES,
        SHOT_SIZES, FOCAL_LENGTHS, APERTURES, LENS_EFFECTS,
        AGE_DESCRIPTORS, BODY_TYPES_FEMALE, BODY_TYPES_MALE,
        TAB_SECTIONS, getAgeDescriptor
    } = Data;
    const BODY_MAGIC_DATA = window.PromptGen.BodyMagicData;
    const HAIR_MAGIC_DATA = window.PromptGen.HairMagicData;
    const EXPR_DATA = window.PromptGen.ExpressionMagicData;
    const POSE_DATA = window.PromptGen.PoseMagicData;
    const changelog = window.PromptGen.Changelog;
    const SoundManager = window.PromptGen.SoundManager;

    // ============================================
    // Debounce 工具函式
    // ============================================
    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // Legacy compat: promptData is no longer used for rendering; kept empty for backward compat
    const promptData = {};

    // --- State ---
    const state = {
        activeTab: 'base',
        dimension: 'anime',  // v7.9 'anime' | 'realistic' | 'fantasy' | '2.5d' | 'fate'
        gender: 'female',
        age: 21,
        selections: {},  // { sectionId: value }
        customInputs: {},  // { sectionId: customText }
        customInputVisible: {},  // { sectionId: bool }
        customFields: [],
        lang: 'zh',
        format: 'yaml',
        isPreviewLocked: false,
        highQuality: true,
        bodyAdvanced: null,  // null = off, { primary: 4, build: 4, height: 4 } = on
        hairAdvanced: null,  // null = off, { hair_length, ponytail_height, ponytail_count, selectedItems[] }
        hairMagicPrompts: null,  // { positive: [], negative: [] }
        ageEnabled: true,    // age toggle
        // Conflict system state
        conflictWarningsEnabled: true,
        conflictAutoResolution: null,  // null | 'ignore' | 'dual' | 'merge'
        conflictResolution: null,
        conflictInfo: null,
        conflictWarningCount: 0,
        racePage: 1,  // v6.3 種族分頁當前頁碼
        jobPage: 1,    // v6.6 職業分頁
        hairstylePage: 1,  // v6.6 髮型分頁
        bodyTypePage: 1,   // v6.6 身材分頁
        outfitPage: 1,      // v6.8 服裝分頁
        headwearPage: 1,    // v6.91 頭飾分頁
        handItemsPage: 1,   // v6.92 手持物件分頁
        expressionPage: 1,  // v7.2 表情分頁
        posePage: 1,         // v7.3 姿勢分頁
        animeStylePage: 1,   // v7.5 動漫風格分頁
        artStylePage: 1,     // v7.5 藝術風格分頁
        artistPage: 1,       // v7.5 藝術家分頁
        scenePage: 1,        // v7.6 場景分頁
        atmospherePage: 1,   // v7.7 時間氛圍分頁
        atmosphereAdvanced: null, // v7.7 時間氛圍魔法
        heterochromia: false, // v6.9 異色瞳模式
        spellMode: false, // v7.5 咒語模式
        spellEffect: 'D' // v7.8 咒語效果樣式 (A/B/C/D/random)
    };

    // 可複選的 section（值為陣列而非字串）
    const MULTI_SELECT_SECTIONS = new Set(['quality']);

    // All section IDs for iteration
    const ALL_SECTION_IDS = [];
    Object.values(TAB_SECTIONS).forEach(sections => {
        sections.forEach(s => ALL_SECTION_IDS.push(s.id));
    });

    // --- Elements ---
    const categoriesContainer = document.getElementById('categories-container');
    const customFieldsContainer = document.getElementById('custom-fields-container');
    const btnAddCustom = document.getElementById('btn-add-custom');
    const inputSubject = document.getElementById('input-subject');
    const dimensionSelector = document.getElementById('dimension-selector');

    const inputNegative = document.getElementById('negative-prompt');
    const outputFinal = document.getElementById('final-prompt');
    const outputNegative = document.getElementById('final-negative');
    const btnReset = document.getElementById('btn-reset');
    const langRadios = document.getElementsByName('lang');
    const formatRadios = document.getElementsByName('format');
    const btnCopy = document.getElementById('btn-copy');

    // Preview elements
    const previewPlaceholder = document.getElementById('preview-placeholder');
    const previewContent = document.getElementById('preview-content');
    const previewImageBox = document.getElementById('preview-image-box');
    const previewLabel = document.getElementById('preview-label');

    // --- 中二喊話輪播管理器 ---
    const IncantationManager = (() => {
        const textEl = document.querySelector('.incantation-text');
        let timer = null;
        let lastIndex = -1;
        const INTERVAL = 8000; // 8 秒輪播
        const FADE_DURATION = 1200; // 與 CSS transition 同步

        function getRandomIndex() {
            if (typeof INCANTATIONS === 'undefined' || INCANTATIONS.length === 0) return 0;
            let idx;
            do {
                idx = Math.floor(Math.random() * INCANTATIONS.length);
            } while (idx === lastIndex && INCANTATIONS.length > 1);
            lastIndex = idx;
            return idx;
        }

        function renderIncantation(lines) {
            if (!textEl) return;
            textEl.innerHTML = lines.map((line, i) => {
                // 在倒數第二行前加裝飾分隔線
                const isLast = i === lines.length - 1;
                const addSep = isLast && lines.length > 2;
                let html = '';
                if (addSep) {
                    html += '<span class="incantation-line incantation-separator">✦ ✦ ✦</span>';
                }
                html += `<span class="incantation-line">${line}</span>`;
                return html;
            }).join('');
        }

        function showRandom() {
            if (!textEl || typeof INCANTATIONS === 'undefined') return;
            // 淡出
            textEl.classList.remove('visible');
            setTimeout(() => {
                const idx = getRandomIndex();
                renderIncantation(INCANTATIONS[idx]);
                // 淡入
                textEl.classList.add('visible');
            }, FADE_DURATION);
        }

        function start() {
            if (!textEl || typeof INCANTATIONS === 'undefined') return;
            // 立刻顯示一句（無需等 fade out）
            const idx = getRandomIndex();
            renderIncantation(INCANTATIONS[idx]);
            // 下一幀加 visible 確保動畫觸發
            requestAnimationFrame(() => textEl.classList.add('visible'));
            // 啟動定時輪播
            stop();
            timer = setInterval(showRandom, INTERVAL);
        }

        function stop() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
            if (textEl) textEl.classList.remove('visible');
        }

        return { start, stop };
    })();

    // --- Persistence ---
    function saveState() {
        const stateToSave = {
            ...state,
            inputSubject: inputSubject.value,
            inputNegative: inputNegative.value,
            bodyAdvanced: state.bodyAdvanced,
            ageEnabled: state.ageEnabled
        };
        localStorage.setItem('promptGenState', JSON.stringify(stateToSave));
    }
    // Debounced version for rapid interactions (sliders, etc.)
    const debouncedSaveState = debounce(saveState, 300);

    function loadState() {
        const saved = localStorage.getItem('promptGenState');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                state.activeTab = parsed.activeTab || 'base';
                state.dimension = parsed.dimension || 'anime';
                state.gender = parsed.gender || 'female';
                state.age = parsed.age || 21;
                state.selections = parsed.selections || {};
                state.customInputs = parsed.customInputs || {};
                state.customInputVisible = parsed.customInputVisible || {};
                state.customFields = parsed.customFields || [];
                state.lang = parsed.lang || 'zh';
                state.format = parsed.format || 'yaml';
                state.highQuality = parsed.highQuality !== false;
                state.bodyAdvanced = parsed.bodyAdvanced || null;
                state.hairAdvanced = parsed.hairAdvanced || null;
                state.hairMagicPrompts = parsed.hairMagicPrompts || null;
                state.raceAdvanced = parsed.raceAdvanced || null;
                state.jobAdvanced = parsed.jobAdvanced || null;
                state.outfitAdvanced = parsed.outfitAdvanced || null;
                state.headwearAdvanced = parsed.headwearAdvanced || null;
                state.handItemsAdvanced = parsed.handItemsAdvanced || null;
                state.expressionAdvanced = parsed.expressionAdvanced || null;
                state.poseAdvanced = parsed.poseAdvanced || null;
                state.sceneAdvanced = parsed.sceneAdvanced || null;
                state.atmosphereAdvanced = parsed.atmosphereAdvanced || null;
                state.ageEnabled = parsed.ageEnabled !== false;

                // Conflict system state restoration
                state.conflictWarningsEnabled = parsed.conflictWarningsEnabled !== false;
                state.conflictAutoResolution = parsed.conflictAutoResolution || null;
                state.conflictResolution = null; // Always reset on load
                state.conflictInfo = null;
                state.conflictWarningCount = parsed.conflictWarningCount || 0;
                state.spellMode = parsed.spellMode || false;
                state.spellEffect = parsed.spellEffect || 'D';

                inputSubject.value = parsed.inputSubject || '';

                inputNegative.value = parsed.inputNegative || '';

                const langRadio = document.querySelector(`input[name="lang"][value="${state.lang}"]`);
                if (langRadio) langRadio.checked = true;

                const formatRadio = document.querySelector(`input[name="format"][value="${state.format}"]`);
                if (formatRadio) formatRadio.checked = true;
            } catch (e) {
                console.error("Failed to load state", e);
            }
        }
    }

    // --- Tab Rendering ---
    function renderTabs() {
        const tabBar = document.getElementById('tab-bar');
        if (!tabBar) return;
        tabBar.innerHTML = '';
        TABS.forEach(tab => {
            const btn = document.createElement('button');
            btn.className = `tab-btn${state.activeTab === tab.id ? ' active' : ''}`;
            btn.dataset.tab = tab.id;
            btn.innerHTML = `<i class="${tab.icon}"></i> ${state.lang === 'zh' ? tab.label : tab.en}`;
            btn.addEventListener('click', () => {
                state.activeTab = tab.id;
                renderTabs();
                renderTabContent();
                saveState();
            });
            tabBar.appendChild(btn);
        });
    }

    function getOptionLabel(option) {
        return state.lang === 'zh' ? option.label : (option.en || option.label);
    }

    function renderTabContent() {
        const tabContent = document.getElementById('tab-content');
        if (!tabContent) return;
        tabContent.innerHTML = '';

        const sections = TAB_SECTIONS[state.activeTab];
        if (!sections) return;

        sections.forEach(section => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'section-block';

            // Section header with title + custom button
            const header = document.createElement('div');
            header.className = 'section-header';

            const titleEl = document.createElement('h4');
            titleEl.className = 'section-block-title';
            titleEl.textContent = state.lang === 'zh' ? section.title.zh : section.title.en;
            header.appendChild(titleEl);

            // Custom button (skip for genderAge section)
            if (section.type !== 'genderAge') {
                const customBtn = document.createElement('button');
                customBtn.className = `btn-custom-toggle${state.customInputVisible[section.id] ? ' active' : ''}`;
                customBtn.innerHTML = '<i class="fa-solid fa-pen"></i> ' + (state.lang === 'zh' ? '自訂' : 'Custom');
                customBtn.addEventListener('click', () => {
                    state.customInputVisible[section.id] = !state.customInputVisible[section.id];
                    renderTabContent();
                    saveState();
                });
                header.appendChild(customBtn);
            }

            sectionEl.appendChild(header);

            // === Gender + Age Combined Section ===
            if (section.type === 'genderAge') {
                const row = document.createElement('div');
                row.className = 'gender-age-row';

                // Gender toggle (compact)
                const genderToggle = document.createElement('div');
                genderToggle.className = 'gender-toggle gender-toggle-compact';
                ['female', 'male'].forEach(g => {
                    const btn = document.createElement('button');
                    btn.className = `gender-btn${state.gender === g ? ' active' : ''}`;
                    btn.dataset.gender = g;
                    btn.textContent = g === 'female'
                        ? (state.lang === 'zh' ? '♀ 女性' : '♀ Female')
                        : (state.lang === 'zh' ? '♂ 男性' : '♂ Male');
                    btn.addEventListener('click', () => {
                        state.gender = (state.gender === g) ? '' : g;
                        delete state.selections['hairstyle'];
                        delete state.selections['bodyType'];
                        renderTabContent();
                        onSelectionChanged();
                        saveState();
                    });
                    genderToggle.appendChild(btn);
                });
                row.appendChild(genderToggle);

                // Age slider (compact)
                const ageWrap = document.createElement('div');
                ageWrap.className = 'age-compact-wrap';

                const ageDisplay = document.createElement('div');
                ageDisplay.className = 'age-display';
                ageDisplay.innerHTML = `<span class="age-number">${state.age}</span><span class="age-unit">${state.lang === 'zh' ? '歲' : 'yrs'}</span>`;

                const sliderContainer = document.createElement('div');
                sliderContainer.className = 'slider-container';

                const slider = document.createElement('input');
                slider.type = 'range';
                slider.className = 'age-slider';
                slider.min = '1';
                slider.max = '100';
                slider.value = state.age;
                slider.style.setProperty('--val', ((state.age - 1) / 99 * 100) + '%');

                const minLabel = document.createElement('span');
                minLabel.className = 'slider-label';
                minLabel.textContent = '1';
                const maxLabel = document.createElement('span');
                maxLabel.className = 'slider-label';
                maxLabel.textContent = '100';

                // Audio context for age slider sound
                let sliderAudioCtx = null;

                slider.addEventListener('input', (e) => {
                    state.age = parseInt(e.target.value);
                    ageDisplay.innerHTML = `<span class="age-number">${state.age}</span><span class="age-unit">${state.lang === 'zh' ? '歲' : 'yrs'}</span>`;
                    slider.style.setProperty('--val', ((state.age - 1) / 99 * 100) + '%');

                    // Play pitch-varying tone
                    try {
                        if (!sliderAudioCtx) sliderAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
                        const osc = sliderAudioCtx.createOscillator();
                        const gain = sliderAudioCtx.createGain();
                        osc.connect(gain);
                        gain.connect(sliderAudioCtx.destination);
                        const freq = 200 + ((state.age - 1) / 99) * 1000;
                        osc.frequency.value = freq;
                        osc.type = 'sine';
                        gain.gain.value = 0.08;
                        osc.start();
                        gain.gain.exponentialRampToValueAtTime(0.001, sliderAudioCtx.currentTime + 0.08);
                        osc.stop(sliderAudioCtx.currentTime + 0.1);
                    } catch (err) { /* Audio not supported */ }

                    generatePrompt();
                    saveState();
                });

                sliderContainer.appendChild(minLabel);
                sliderContainer.appendChild(slider);
                sliderContainer.appendChild(maxLabel);
                ageWrap.appendChild(ageDisplay);
                ageWrap.appendChild(sliderContainer);
                row.appendChild(ageWrap);

                sectionEl.appendChild(row);
                tabContent.appendChild(sectionEl);
                return; // genderAge section 處理完畢
            }

            // genderDependent sections: no toggle needed here, follows top-level gender

            // === v6.3 種族分頁 — race section 特殊處理 ===
            if (section.id === 'race') {
                // 高級魔法專用按鈕
                const raceMagicBtn = document.createElement('button');
                raceMagicBtn.className = 'race-magic-btn';
                raceMagicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                    (state.lang === 'zh' ? '🔮 高級魔法專用' : '🔮 Advanced Magic');
                raceMagicBtn.addEventListener('click', () => {
                    openRaceMagicModal();
                });
                // 把 magic btn 和 custom btn 包成一組靠右
                const customToggle = header.querySelector('.btn-custom-toggle');
                const btnGroup = document.createElement('div');
                btnGroup.className = 'section-header-buttons';
                header.insertBefore(btnGroup, customToggle);
                btnGroup.appendChild(raceMagicBtn);
                btnGroup.appendChild(customToggle);

                // 已選種族 badge（緊鄰種族標題右側）
                if (state.selections.race) {
                    const raceObj = RACES.find(r => r.value === state.selections.race);
                    if (raceObj) {
                        const badge = document.createElement('span');
                        badge.className = 'selected-race-badge';
                        badge.innerHTML = `✓ ${getOptionLabel(raceObj)} <span class="badge-x" title="${state.lang === 'zh' ? '取消選擇' : 'Deselect'}">✕</span>`;
                        badge.querySelector('.badge-x').addEventListener('click', (e) => {
                            e.stopPropagation();
                            delete state.selections.race;
                            renderTabContent();
                            generatePrompt();
                            saveState();
                        });
                        // 用 wrapper 把 title 和 badge 包在一起，避免被 space-between 推開
                        const titleEl = header.querySelector('.section-block-title');
                        const titleWrapper = document.createElement('div');
                        titleWrapper.className = 'section-title-with-badge';
                        titleEl.parentNode.insertBefore(titleWrapper, titleEl);
                        titleWrapper.appendChild(titleEl);
                        titleWrapper.appendChild(badge);
                    }
                }

                // ★ raceAdvanced 橫幅：顯示加分特徵
                if (state.raceAdvanced && state.raceAdvanced.bonusTraits && state.raceAdvanced.bonusTraits.length > 0) {
                    const ra = state.raceAdvanced;
                    const traitNames = ra.bonusTraitsZh ? ra.bonusTraitsZh.join('、') : ra.bonusTraits.join(', ');
                    const raceName = ra.selectedRace ? `${ra.selectedRace.label} ${ra.selectedRace.en}` : '';

                    const summaryBar = document.createElement('div');
                    summaryBar.className = 'body-advanced-summary';
                    const summaryText = document.createElement('span');
                    summaryText.innerHTML = `🔮 ${state.lang === 'zh' ? '種族魔法啟用中' : 'Race Magic Active'}：${raceName} / 🏷️ ${traitNames}`;

                    const editBtn = document.createElement('button');
                    editBtn.className = 'body-summary-action';
                    editBtn.textContent = state.lang === 'zh' ? '編輯' : 'Edit';
                    editBtn.addEventListener('click', () => openRaceMagicModal());

                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'body-summary-action clear';
                    clearBtn.textContent = state.lang === 'zh' ? '清除' : 'Clear';
                    clearBtn.addEventListener('click', () => {
                        state.raceAdvanced = null;
                        renderTabContent();
                        generatePrompt();
                        saveState();
                    });

                    summaryBar.appendChild(summaryText);
                    summaryBar.appendChild(editBtn);
                    summaryBar.appendChild(clearBtn);
                    sectionEl.appendChild(summaryBar);
                }

                // 渲染分頁 grid
                renderPaginatedRaceGrid(sectionEl, section, RACES);

                // If raceAdvanced active, add disabled overlay（與髮型/身材一致）
                if (state.raceAdvanced && state.raceAdvanced.bonusTraits && state.raceAdvanced.bonusTraits.length > 0) {
                    const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
                    if (tagGrid) tagGrid.classList.add('body-section-disabled');
                }

                tabContent.appendChild(sectionEl);

                // Custom input field (shown when toggled)
                if (state.customInputVisible[section.id]) {
                    const customRow = document.createElement('div');
                    customRow.className = 'custom-input-row';
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'custom-section-input';
                    input.placeholder = state.lang === 'zh' ? '輸入自訂值...' : 'Enter custom value...';
                    input.value = state.customInputs[section.id] || '';
                    input.addEventListener('input', (e) => {
                        state.customInputs[section.id] = e.target.value.trim();
                        generatePrompt();
                    });
                    customRow.appendChild(input);
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'btn-clear-custom';
                    clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    clearBtn.addEventListener('click', () => {
                        state.customInputs[section.id] = '';
                        state.customInputVisible[section.id] = false;
                        renderTabContent();
                        generatePrompt();
                    });
                    customRow.appendChild(clearBtn);
                    sectionEl.appendChild(customRow);
                }

                tabContent.appendChild(sectionEl);
                return; // race section 處理完畢，跳過下方通用邏輯
            }

            // === v6.5 職業分頁 — job section 特殊處理 ===
            if (section.id === 'job') {
                // 高級魔法專用按鈕
                const jobMagicBtn = document.createElement('button');
                jobMagicBtn.className = 'race-magic-btn';
                jobMagicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                    (state.lang === 'zh' ? '🔮 高級魔法專用' : '🔮 Advanced Magic');
                jobMagicBtn.addEventListener('click', () => {
                    openJobMagicModal();
                });
                const jobCustomToggle = header.querySelector('.btn-custom-toggle');
                const jobBtnGroup = document.createElement('div');
                jobBtnGroup.className = 'section-header-buttons';
                header.insertBefore(jobBtnGroup, jobCustomToggle);
                jobBtnGroup.appendChild(jobMagicBtn);
                jobBtnGroup.appendChild(jobCustomToggle);

                // 已選職業 badge
                if (state.selections.job) {
                    const jobObj = JOBS.find(j => j.value === state.selections.job);
                    if (jobObj) {
                        const badge = document.createElement('span');
                        badge.className = 'selected-race-badge';
                        badge.innerHTML = `✓ ${getOptionLabel(jobObj)} <span class="badge-x" title="${state.lang === 'zh' ? '取消選擇' : 'Deselect'}">✕</span>`;
                        badge.querySelector('.badge-x').addEventListener('click', (e) => {
                            e.stopPropagation();
                            delete state.selections.job;
                            renderTabContent();
                            generatePrompt();
                            saveState();
                        });
                        const titleEl = header.querySelector('.section-block-title');
                        const titleWrapper = document.createElement('div');
                        titleWrapper.className = 'section-title-with-badge';
                        titleEl.parentNode.insertBefore(titleWrapper, titleEl);
                        titleWrapper.appendChild(titleEl);
                        titleWrapper.appendChild(badge);
                    }
                }

                // ★ jobAdvanced 橫幅：顯示加分特徵
                if (state.jobAdvanced && state.jobAdvanced.bonusTraits && state.jobAdvanced.bonusTraits.length > 0) {
                    const ja = state.jobAdvanced;
                    const traitNames = ja.bonusTraitsZh ? ja.bonusTraitsZh.join('、') : ja.bonusTraits.join(', ');
                    const jobName = ja.selectedJob ? `${ja.selectedJob.label} ${ja.selectedJob.en}` : '';

                    const summaryBar = document.createElement('div');
                    summaryBar.className = 'body-advanced-summary';
                    const summaryText = document.createElement('span');
                    summaryText.innerHTML = `🔮 ${state.lang === 'zh' ? '職業魔法啟用中' : 'Job Magic Active'}：${jobName} / 🏷️ ${traitNames}`;

                    const editBtn = document.createElement('button');
                    editBtn.className = 'body-summary-action';
                    editBtn.textContent = state.lang === 'zh' ? '編輯' : 'Edit';
                    editBtn.addEventListener('click', () => openJobMagicModal());

                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'body-summary-action clear';
                    clearBtn.textContent = state.lang === 'zh' ? '清除' : 'Clear';
                    clearBtn.addEventListener('click', () => {
                        state.jobAdvanced = null;
                        renderTabContent();
                        generatePrompt();
                        saveState();
                    });

                    summaryBar.appendChild(summaryText);
                    summaryBar.appendChild(editBtn);
                    summaryBar.appendChild(clearBtn);
                    sectionEl.appendChild(summaryBar);
                }

                // 渲染分頁 grid（獨立 jobPage）
                renderPaginatedGrid(sectionEl, section, JOBS, 'jobPage');

                // If jobAdvanced active, add disabled overlay（與髮型/身材一致）
                if (state.jobAdvanced && state.jobAdvanced.bonusTraits && state.jobAdvanced.bonusTraits.length > 0) {
                    const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
                    if (tagGrid) tagGrid.classList.add('body-section-disabled');
                }

                tabContent.appendChild(sectionEl);

                // Custom input
                if (state.customInputVisible[section.id]) {
                    const customRow = document.createElement('div');
                    customRow.className = 'custom-input-row';
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'custom-section-input';
                    input.placeholder = state.lang === 'zh' ? '輸入自訂值...' : 'Enter custom value...';
                    input.value = state.customInputs[section.id] || '';
                    input.addEventListener('input', (e) => {
                        state.customInputs[section.id] = e.target.value.trim();
                        generatePrompt();
                    });
                    customRow.appendChild(input);
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'btn-clear-custom';
                    clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    clearBtn.addEventListener('click', () => {
                        state.customInputs[section.id] = '';
                        state.customInputVisible[section.id] = false;
                        renderTabContent();
                        generatePrompt();
                    });
                    customRow.appendChild(clearBtn);
                    sectionEl.appendChild(customRow);
                }

                tabContent.appendChild(sectionEl);
                return; // job section 處理完畢
            }

            // === v6.6 髮型分頁 — hairstyle section 特殊處理 ===
            if (section.id === 'hairstyle') {
                // 高級魔法專用按鈕
                const hairMagicBtn = document.createElement('button');
                hairMagicBtn.className = 'race-magic-btn';
                hairMagicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                    (state.lang === 'zh' ? '🔮 高級魔法專用' : '🔮 Advanced Magic');
                hairMagicBtn.addEventListener('click', () => {
                    openHairMagicModal();
                });
                const hairCustomToggle = header.querySelector('.btn-custom-toggle');
                const hairBtnGroup = document.createElement('div');
                hairBtnGroup.className = 'section-header-buttons';
                header.insertBefore(hairBtnGroup, hairCustomToggle);
                hairBtnGroup.appendChild(hairMagicBtn);
                hairBtnGroup.appendChild(hairCustomToggle);

                // 已選髮型 badge
                if (state.selections.hairstyle) {
                    const hairData = state.gender === 'female' ? HAIRSTYLES_FEMALE : HAIRSTYLES_MALE;
                    const hairObj = hairData.find(h => h.value === state.selections.hairstyle);
                    if (hairObj) {
                        const badge = document.createElement('span');
                        badge.className = 'selected-race-badge';
                        badge.innerHTML = `✓ ${getOptionLabel(hairObj)} <span class="badge-x" title="${state.lang === 'zh' ? '取消選擇' : 'Deselect'}">✕</span>`;
                        badge.querySelector('.badge-x').addEventListener('click', (e) => {
                            e.stopPropagation();
                            delete state.selections.hairstyle;
                            renderTabContent();
                            generatePrompt();
                            saveState();
                        });
                        const titleEl = header.querySelector('.section-block-title');
                        const titleWrapper = document.createElement('div');
                        titleWrapper.className = 'section-title-with-badge';
                        titleEl.parentNode.insertBefore(titleWrapper, titleEl);
                        titleWrapper.appendChild(titleEl);
                        titleWrapper.appendChild(badge);
                    }
                }

                // If hairAdvanced modal has selections, show summary bar
                if (state.hairAdvanced && state.hairAdvanced.selectedItems && state.hairAdvanced.selectedItems.length > 0) {
                    const hairItems = HAIR_MAGIC_DATA.ITEMS;
                    const selNames = state.hairAdvanced.selectedItems.map(id => {
                        const item = hairItems.find(it => it.id === id);
                        return item ? item.name : id;
                    }).join('、');
                    const lengthLabel = state.hairAdvanced.hair_length
                        ? HAIR_MAGIC_DATA.SLIDERS.HAIR_LENGTH.levels[state.hairAdvanced.hair_length].zh
                        : null;

                    const summaryBar = document.createElement('div');
                    summaryBar.className = 'body-advanced-summary';
                    const summaryText = document.createElement('span');
                    summaryText.innerHTML = `✂️ ${state.lang === 'zh' ? '髮型魔法啟用中' : 'Hair Magic Active'}：${selNames}${lengthLabel ? ' / ' + lengthLabel : ''}`;

                    const editBtn = document.createElement('button');
                    editBtn.className = 'body-summary-action';
                    editBtn.textContent = state.lang === 'zh' ? '編輯' : 'Edit';
                    editBtn.addEventListener('click', () => openHairMagicModal());

                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'body-summary-action clear';
                    clearBtn.textContent = state.lang === 'zh' ? '清除' : 'Clear';
                    clearBtn.addEventListener('click', () => {
                        state.hairAdvanced = null;
                        state.hairMagicPrompts = null;
                        renderTabContent();
                        generatePrompt();
                        saveState();
                    });

                    summaryBar.appendChild(summaryText);
                    summaryBar.appendChild(editBtn);
                    summaryBar.appendChild(clearBtn);
                    sectionEl.appendChild(summaryBar);
                }

                // 渲染分頁 grid
                const hairGridData = state.gender === 'female' ? HAIRSTYLES_FEMALE : HAIRSTYLES_MALE;
                renderPaginatedGrid(sectionEl, section, hairGridData, 'hairstylePage');

                // If hairAdvanced active, add disabled overlay（與身材區塊一致）
                if (state.hairAdvanced && state.hairAdvanced.selectedItems && state.hairAdvanced.selectedItems.length > 0) {
                    const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
                    if (tagGrid) tagGrid.classList.add('body-section-disabled');
                }

                tabContent.appendChild(sectionEl);

                // Custom input
                if (state.customInputVisible[section.id]) {
                    const customRow = document.createElement('div');
                    customRow.className = 'custom-input-row';
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'custom-section-input';
                    input.placeholder = state.lang === 'zh' ? '輸入自訂值...' : 'Enter custom value...';
                    input.value = state.customInputs[section.id] || '';
                    input.addEventListener('input', (e) => {
                        state.customInputs[section.id] = e.target.value.trim();
                        generatePrompt();
                    });
                    customRow.appendChild(input);
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'btn-clear-custom';
                    clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    clearBtn.addEventListener('click', () => {
                        state.customInputs[section.id] = '';
                        state.customInputVisible[section.id] = false;
                        renderTabContent();
                        generatePrompt();
                    });
                    customRow.appendChild(clearBtn);
                    sectionEl.appendChild(customRow);
                }

                tabContent.appendChild(sectionEl);
                return; // hairstyle section 處理完畢
            }

            // === v6.6 身材分頁 — bodyType section 特殊處理 ===
            if (section.id === 'bodyType') {
                // 高級魔法專用按鈕
                const bodyMagicBtn = document.createElement('button');
                bodyMagicBtn.className = 'race-magic-btn';
                bodyMagicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                    (state.lang === 'zh' ? '🔮 高級魔法專用' : '🔮 Advanced Magic');
                bodyMagicBtn.addEventListener('click', () => {
                    openBodyMagicModal();
                });
                const bodyCustomToggle = header.querySelector('.btn-custom-toggle');
                const bodyBtnGroup = document.createElement('div');
                bodyBtnGroup.className = 'section-header-buttons';
                header.insertBefore(bodyBtnGroup, bodyCustomToggle);
                bodyBtnGroup.appendChild(bodyMagicBtn);
                bodyBtnGroup.appendChild(bodyCustomToggle);

                // 已選身材 badge
                if (state.selections.bodyType) {
                    const bodyData = state.gender === 'female' ? BODY_TYPES_FEMALE : BODY_TYPES_MALE;
                    const bodyObj = bodyData.find(b => b.value === state.selections.bodyType);
                    if (bodyObj) {
                        const badge = document.createElement('span');
                        badge.className = 'selected-race-badge';
                        badge.innerHTML = `✓ ${getOptionLabel(bodyObj)} <span class="badge-x" title="${state.lang === 'zh' ? '取消選擇' : 'Deselect'}">✕</span>`;
                        badge.querySelector('.badge-x').addEventListener('click', (e) => {
                            e.stopPropagation();
                            delete state.selections.bodyType;
                            renderTabContent();
                            generatePrompt();
                            saveState();
                        });
                        const titleEl = header.querySelector('.section-block-title');
                        const titleWrapper = document.createElement('div');
                        titleWrapper.className = 'section-title-with-badge';
                        titleEl.parentNode.insertBefore(titleWrapper, titleEl);
                        titleWrapper.appendChild(titleEl);
                        titleWrapper.appendChild(badge);
                    }
                }

                // If bodyAdvanced is active, show summary bar
                if (state.bodyAdvanced) {
                    const primaryData = state.gender === 'female' ? BODY_MAGIC_DATA.FEMALE_BUST : BODY_MAGIC_DATA.MALE_MUSCLE;
                    const primaryInfo = primaryData[state.bodyAdvanced.primary || 4];
                    const buildInfo = BODY_MAGIC_DATA.BUILD[state.bodyAdvanced.build || 4];
                    const heightInfo = BODY_MAGIC_DATA.HEIGHT[state.bodyAdvanced.height || 4];

                    const summaryBar = document.createElement('div');
                    summaryBar.className = 'body-advanced-summary';
                    const summaryText = document.createElement('span');
                    summaryText.innerHTML = `🔮 ${state.lang === 'zh' ? '進階控制啟用中' : 'Advanced Active'}：${primaryInfo.zh} / ${buildInfo.zh} / ${heightInfo.zh}`;

                    const editBtn = document.createElement('button');
                    editBtn.className = 'body-summary-action';
                    editBtn.textContent = state.lang === 'zh' ? '編輯' : 'Edit';
                    editBtn.addEventListener('click', () => openBodyMagicModal());

                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'body-summary-action clear';
                    clearBtn.textContent = state.lang === 'zh' ? '清除' : 'Clear';
                    clearBtn.addEventListener('click', () => {
                        state.bodyAdvanced = null;
                        renderTabContent();
                        generatePrompt();
                        saveState();
                    });

                    summaryBar.appendChild(summaryText);
                    summaryBar.appendChild(editBtn);
                    summaryBar.appendChild(clearBtn);
                    sectionEl.appendChild(summaryBar);
                }

                // 渲染分頁 grid
                const bodyGridData = state.gender === 'female' ? BODY_TYPES_FEMALE : BODY_TYPES_MALE;
                renderPaginatedGrid(sectionEl, section, bodyGridData, 'bodyTypePage');

                // If bodyAdvanced active, add disabled overlay
                if (state.bodyAdvanced) {
                    const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
                    if (tagGrid) tagGrid.classList.add('body-section-disabled');
                }

                tabContent.appendChild(sectionEl);

                // Custom input
                if (state.customInputVisible[section.id]) {
                    const customRow = document.createElement('div');
                    customRow.className = 'custom-input-row';
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'custom-section-input';
                    input.placeholder = state.lang === 'zh' ? '輸入自訂值...' : 'Enter custom value...';
                    input.value = state.customInputs[section.id] || '';
                    input.addEventListener('input', (e) => {
                        state.customInputs[section.id] = e.target.value.trim();
                        generatePrompt();
                    });
                    customRow.appendChild(input);
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'btn-clear-custom';
                    clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    clearBtn.addEventListener('click', () => {
                        state.customInputs[section.id] = '';
                        state.customInputVisible[section.id] = false;
                        renderTabContent();
                        generatePrompt();
                    });
                    customRow.appendChild(clearBtn);
                    sectionEl.appendChild(customRow);
                }

                tabContent.appendChild(sectionEl);
                return; // bodyType section 處理完畢
            }

            // Determine data source
            let data = section.data;
            if (section.genderDependent) {
                // 其他 genderDependent sections (非 hairstyle/bodyType)
                data = state.gender === 'female' ? section.dataFemale : section.dataMale;
            }

            // === v6.8 服裝 Magic Modal — outfit section 特殊處理 ===
            if (section.id === 'outfit') {
                // 高級魔法專用按鈕
                const outfitMagicBtn = document.createElement('button');
                outfitMagicBtn.className = 'race-magic-btn';
                outfitMagicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                    (state.lang === 'zh' ? '🔮 高級魔法專用' : '🔮 Advanced Magic');
                outfitMagicBtn.addEventListener('click', () => {
                    openOutfitMagicModal();
                });
                const outfitCustomToggle = header.querySelector('.btn-custom-toggle');
                const outfitBtnGroup = document.createElement('div');
                outfitBtnGroup.className = 'section-header-buttons';
                header.insertBefore(outfitBtnGroup, outfitCustomToggle);
                outfitBtnGroup.appendChild(outfitMagicBtn);
                outfitBtnGroup.appendChild(outfitCustomToggle);

                // 已選服裝 badge
                if (state.selections.outfit) {
                    const outfitObj = OUTFITS.find(o => o.value === state.selections.outfit);
                    if (outfitObj) {
                        const badge = document.createElement('span');
                        badge.className = 'selected-race-badge';
                        badge.innerHTML = `✓ ${getOptionLabel(outfitObj)} <span class="badge-x" title="${state.lang === 'zh' ? '取消選擇' : 'Deselect'}">✕</span>`;
                        badge.querySelector('.badge-x').addEventListener('click', (e) => {
                            e.stopPropagation();
                            delete state.selections.outfit;
                            renderTabContent();
                            generatePrompt();
                            saveState();
                        });
                        const titleEl = header.querySelector('.section-block-title');
                        const titleWrapper = document.createElement('div');
                        titleWrapper.className = 'section-title-with-badge';
                        titleEl.parentNode.insertBefore(titleWrapper, titleEl);
                        titleWrapper.appendChild(titleEl);
                        titleWrapper.appendChild(badge);
                    }
                }

                // outfitAdvanced 橫幅（加分特徵）
                if (state.outfitAdvanced && state.outfitAdvanced.bonusTraits && state.outfitAdvanced.bonusTraits.length > 0) {
                    const oa = state.outfitAdvanced;
                    const summaryBar = document.createElement('div');
                    summaryBar.className = 'body-advanced-summary';
                    const summaryText = document.createElement('span');
                    const zhList = (oa.bonusTraitsZh || oa.bonusTraits).join('、');
                    summaryText.innerHTML = `🔮 服飾魔法啟用中：${oa.selectedOutfit || ''} — ${zhList}`;
                    const editBtn = document.createElement('button');
                    editBtn.className = 'body-advanced-edit-btn';
                    editBtn.textContent = '編輯';
                    editBtn.addEventListener('click', () => { openOutfitMagicModal(); });
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'body-advanced-clear-btn';
                    clearBtn.textContent = '清除';
                    clearBtn.addEventListener('click', () => {
                        delete state.outfitAdvanced;
                        renderTabContent();
                        generatePrompt();
                        saveState();
                    });
                    summaryBar.appendChild(summaryText);
                    summaryBar.appendChild(editBtn);
                    summaryBar.appendChild(clearBtn);
                    sectionEl.appendChild(summaryBar);
                }

                // 渲染分頁 grid
                renderPaginatedGrid(sectionEl, section, OUTFITS, 'outfitPage');

                // outfitAdvanced 啟用時，灰色 grid
                if (state.outfitAdvanced && state.outfitAdvanced.bonusTraits && state.outfitAdvanced.bonusTraits.length > 0) {
                    const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
                    if (tagGrid) tagGrid.classList.add('body-section-disabled');
                }

                tabContent.appendChild(sectionEl);

                // Custom input
                if (state.customInputVisible[section.id]) {
                    const customRow = document.createElement('div');
                    customRow.className = 'custom-input-row';
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'custom-section-input';
                    input.placeholder = state.lang === 'zh' ? '輸入自訂值...' : 'Enter custom value...';
                    input.value = state.customInputs[section.id] || '';
                    input.addEventListener('input', (e) => {
                        state.customInputs[section.id] = e.target.value.trim();
                        generatePrompt();
                    });
                    customRow.appendChild(input);
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'btn-clear-custom';
                    clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    clearBtn.addEventListener('click', () => {
                        state.customInputs[section.id] = '';
                        state.customInputVisible[section.id] = false;
                        renderTabContent();
                        generatePrompt();
                    });
                    customRow.appendChild(clearBtn);
                    sectionEl.appendChild(customRow);
                }

                tabContent.appendChild(sectionEl);
                return; // outfit section 處理完畢
            }

            // === v6.91 頭飾 section 特殊處理 ===
            if (section.id === 'headwear') {
                // 高級魔法專用按鈕
                const hwMagicBtn = document.createElement('button');
                hwMagicBtn.className = 'race-magic-btn';
                hwMagicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                    (state.lang === 'zh' ? '🔮 高級魔法專用' : '🔮 Advanced Magic');
                hwMagicBtn.addEventListener('click', () => {
                    openHeadwearMagicModal();
                });
                const hwCustomToggle = header.querySelector('.btn-custom-toggle');
                const hwBtnGroup = document.createElement('div');
                hwBtnGroup.className = 'section-header-buttons';
                header.insertBefore(hwBtnGroup, hwCustomToggle);
                hwBtnGroup.appendChild(hwMagicBtn);
                hwBtnGroup.appendChild(hwCustomToggle);

                // 已選頭飾 badge
                if (state.selections.headwear) {
                    const hwObj = HEADWEAR.find(o => o.value === state.selections.headwear);
                    if (hwObj) {
                        const badge = document.createElement('span');
                        badge.className = 'selected-race-badge';
                        badge.innerHTML = `✓ ${getOptionLabel(hwObj)} <span class="badge-x" title="${state.lang === 'zh' ? '取消選擇' : 'Deselect'}">✕</span>`;
                        badge.querySelector('.badge-x').addEventListener('click', (e) => {
                            e.stopPropagation();
                            delete state.selections.headwear;
                            renderTabContent();
                            generatePrompt();
                            saveState();
                        });
                        const titleEl = header.querySelector('.section-block-title');
                        const titleWrapper = document.createElement('div');
                        titleWrapper.className = 'section-title-with-badge';
                        titleEl.parentNode.insertBefore(titleWrapper, titleEl);
                        titleWrapper.appendChild(titleEl);
                        titleWrapper.appendChild(badge);
                    }
                }

                // headwearAdvanced 橫幅（加分特徵）
                if (state.headwearAdvanced && state.headwearAdvanced.bonusTraits && state.headwearAdvanced.bonusTraits.length > 0) {
                    const ha = state.headwearAdvanced;
                    const summaryBar = document.createElement('div');
                    summaryBar.className = 'body-advanced-summary';
                    const summaryText = document.createElement('span');
                    const zhList = (ha.bonusTraitsZh || ha.bonusTraits).join('、');
                    summaryText.innerHTML = `🔮 頭飾魔法啟用中：${ha.selectedItem || ''} — ${zhList}`;
                    const editBtn = document.createElement('button');
                    editBtn.className = 'body-advanced-edit-btn';
                    editBtn.textContent = '編輯';
                    editBtn.addEventListener('click', () => { openHeadwearMagicModal(); });
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'body-advanced-clear-btn';
                    clearBtn.textContent = '清除';
                    clearBtn.addEventListener('click', () => {
                        delete state.headwearAdvanced;
                        renderTabContent();
                        generatePrompt();
                        saveState();
                    });
                    summaryBar.appendChild(summaryText);
                    summaryBar.appendChild(editBtn);
                    summaryBar.appendChild(clearBtn);
                    sectionEl.appendChild(summaryBar);
                }

                // 渲染分頁 grid
                renderPaginatedGrid(sectionEl, section, HEADWEAR, 'headwearPage');

                // headwearAdvanced 啟用時，灰色 grid
                if (state.headwearAdvanced && state.headwearAdvanced.bonusTraits && state.headwearAdvanced.bonusTraits.length > 0) {
                    const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
                    if (tagGrid) tagGrid.classList.add('body-section-disabled');
                }

                tabContent.appendChild(sectionEl);

                // Custom input
                if (state.customInputVisible[section.id]) {
                    const customRow = document.createElement('div');
                    customRow.className = 'custom-input-row';
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'custom-section-input';
                    input.placeholder = state.lang === 'zh' ? '輸入自訂值...' : 'Enter custom value...';
                    input.value = state.customInputs[section.id] || '';
                    input.addEventListener('input', (e) => {
                        state.customInputs[section.id] = e.target.value.trim();
                        generatePrompt();
                    });
                    customRow.appendChild(input);
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'btn-clear-custom';
                    clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    clearBtn.addEventListener('click', () => {
                        state.customInputs[section.id] = '';
                        state.customInputVisible[section.id] = false;
                        renderTabContent();
                        generatePrompt();
                    });
                    customRow.appendChild(clearBtn);
                    sectionEl.appendChild(customRow);
                }

                tabContent.appendChild(sectionEl);
                return; // headwear section 處理完畢
            }

            // === v6.92 手持物件 section 特殊處理 ===
            if (section.id === 'handItems') {
                // 高級魔法專用按鈕
                const hiMagicBtn = document.createElement('button');
                hiMagicBtn.className = 'race-magic-btn';
                hiMagicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                    (state.lang === 'zh' ? '🔮 高級魔法專用' : '🔮 Advanced Magic');
                hiMagicBtn.addEventListener('click', () => {
                    openHandItemsMagicModal();
                });
                const hiCustomToggle = header.querySelector('.btn-custom-toggle');
                const hiBtnGroup = document.createElement('div');
                hiBtnGroup.className = 'section-header-buttons';
                header.insertBefore(hiBtnGroup, hiCustomToggle);
                hiBtnGroup.appendChild(hiMagicBtn);
                hiBtnGroup.appendChild(hiCustomToggle);

                // 已選手持物件 badge
                if (state.selections.handItems) {
                    const hiObj = HAND_ITEMS.find(o => o.value === state.selections.handItems);
                    if (hiObj) {
                        const badge = document.createElement('span');
                        badge.className = 'selected-race-badge';
                        badge.innerHTML = `✓ ${getOptionLabel(hiObj)} <span class="badge-x" title="${state.lang === 'zh' ? '取消選擇' : 'Deselect'}">✕</span>`;
                        badge.querySelector('.badge-x').addEventListener('click', (e) => {
                            e.stopPropagation();
                            delete state.selections.handItems;
                            renderTabContent();
                            generatePrompt();
                            saveState();
                        });
                        const titleEl = header.querySelector('.section-block-title');
                        const titleWrapper = document.createElement('div');
                        titleWrapper.className = 'section-title-with-badge';
                        titleEl.parentNode.insertBefore(titleWrapper, titleEl);
                        titleWrapper.appendChild(titleEl);
                        titleWrapper.appendChild(badge);
                    }
                }

                // handItemsAdvanced 橫幅（加分特徵）
                if (state.handItemsAdvanced && state.handItemsAdvanced.bonusTraits && state.handItemsAdvanced.bonusTraits.length > 0) {
                    const hia = state.handItemsAdvanced;
                    const summaryBar = document.createElement('div');
                    summaryBar.className = 'body-advanced-summary';
                    const summaryText = document.createElement('span');
                    const zhList = (hia.bonusTraitsZh || hia.bonusTraits).join('、');
                    summaryText.innerHTML = `🔮 手持物魔法啟用中：${hia.selectedItem || ''} — ${zhList}`;
                    const editBtn = document.createElement('button');
                    editBtn.className = 'body-advanced-edit-btn';
                    editBtn.textContent = '編輯';
                    editBtn.addEventListener('click', () => { openHandItemsMagicModal(); });
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'body-advanced-clear-btn';
                    clearBtn.textContent = '清除';
                    clearBtn.addEventListener('click', () => {
                        delete state.handItemsAdvanced;
                        renderTabContent();
                        generatePrompt();
                        saveState();
                    });
                    summaryBar.appendChild(summaryText);
                    summaryBar.appendChild(editBtn);
                    summaryBar.appendChild(clearBtn);
                    sectionEl.appendChild(summaryBar);
                }

                // 渲染分頁 grid
                renderPaginatedGrid(sectionEl, section, HAND_ITEMS, 'handItemsPage');

                // handItemsAdvanced 啟用時，灰色 grid
                if (state.handItemsAdvanced && state.handItemsAdvanced.bonusTraits && state.handItemsAdvanced.bonusTraits.length > 0) {
                    const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
                    if (tagGrid) tagGrid.classList.add('body-section-disabled');
                }

                tabContent.appendChild(sectionEl);

                // Custom input
                if (state.customInputVisible[section.id]) {
                    const customRow = document.createElement('div');
                    customRow.className = 'custom-input-row';
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'custom-section-input';
                    input.placeholder = state.lang === 'zh' ? '輸入自訂值...' : 'Enter custom value...';
                    input.value = state.customInputs[section.id] || '';
                    input.addEventListener('input', (e) => {
                        state.customInputs[section.id] = e.target.value.trim();
                        generatePrompt();
                    });
                    customRow.appendChild(input);
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'btn-clear-custom';
                    clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    clearBtn.addEventListener('click', () => {
                        state.customInputs[section.id] = '';
                        state.customInputVisible[section.id] = false;
                        renderTabContent();
                        generatePrompt();
                    });
                    customRow.appendChild(clearBtn);
                    sectionEl.appendChild(customRow);
                }

                tabContent.appendChild(sectionEl);
                return; // handItems section 處理完畢
            }

            // === v7.2 表情 section 特殊處理 ===
            if (section.id === 'expression') {
                // 高級魔法按鈕
                const exprMagicBtn = document.createElement('button');
                exprMagicBtn.className = 'race-magic-btn';
                exprMagicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                    (state.lang === 'zh' ? '🔮 高級魔法專用' : '🔮 Advanced Magic');
                exprMagicBtn.addEventListener('click', () => {
                    openExpressionMagicModal();
                });
                const exprCustomToggle = header.querySelector('.btn-custom-toggle');
                const exprBtnGroup = document.createElement('div');
                exprBtnGroup.className = 'section-header-buttons';
                header.insertBefore(exprBtnGroup, exprCustomToggle);
                exprBtnGroup.appendChild(exprMagicBtn);
                exprBtnGroup.appendChild(exprCustomToggle);

                // expressionAdvanced 橫幅（與種族/職業一致）
                if (state.expressionAdvanced && state.expressionAdvanced.expression) {
                    const ea = state.expressionAdvanced;
                    const summaryBar = document.createElement('div');
                    summaryBar.className = 'body-advanced-summary';
                    const summaryText = document.createElement('span');
                    const lvlStr = EXPR_DATA.INTENSITY[ea.intensity || 4].zh;
                    let detailText = `${ea.expression.label} (${lvlStr})`;
                    if (ea.effects && ea.effects.length > 0) {
                        const efxNames = ea.effects.map(eid => {
                            const ef = EXPR_DATA.EFFECTS.find(e => e.id === eid);
                            return ef ? ef.label : eid;
                        }).join('、');
                        detailText += ` — ${efxNames}`;
                    }
                    summaryText.innerHTML = `🔮 表情魔法啟用中：${detailText}`;
                    const editBtn = document.createElement('button');
                    editBtn.className = 'body-summary-action';
                    editBtn.textContent = '編輯';
                    editBtn.addEventListener('click', () => { openExpressionMagicModal(); });
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'body-summary-action clear';
                    clearBtn.textContent = '清除';
                    clearBtn.addEventListener('click', () => {
                        delete state.expressionAdvanced;
                        renderTabContent();
                        generatePrompt();
                        saveState();
                    });
                    summaryBar.appendChild(summaryText);
                    summaryBar.appendChild(editBtn);
                    summaryBar.appendChild(clearBtn);
                    sectionEl.appendChild(summaryBar);
                }

                // 渲染分頁 grid
                renderPaginatedGrid(sectionEl, section, section.data, 'expressionPage');

                // If expressionAdvanced active, add disabled overlay（與髮型/身材一致）
                if (state.expressionAdvanced && state.expressionAdvanced.expression) {
                    const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
                    if (tagGrid) tagGrid.classList.add('body-section-disabled');
                }

                tabContent.appendChild(sectionEl);

                // Custom input
                if (state.customInputVisible[section.id]) {
                    const customRow = document.createElement('div');
                    customRow.className = 'custom-input-row';
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'custom-section-input';
                    input.placeholder = state.lang === 'zh' ? '輸入自訂值...' : 'Enter custom value...';
                    input.value = state.customInputs[section.id] || '';
                    input.addEventListener('input', (e) => {
                        state.customInputs[section.id] = e.target.value.trim();
                        generatePrompt();
                    });
                    customRow.appendChild(input);
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'btn-clear-custom';
                    clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    clearBtn.addEventListener('click', () => {
                        state.customInputs[section.id] = '';
                        state.customInputVisible[section.id] = false;
                        renderTabContent();
                        generatePrompt();
                    });
                    customRow.appendChild(clearBtn);
                    sectionEl.appendChild(customRow);
                }

                tabContent.appendChild(sectionEl);
                return; // expression section 處理完畢
            }

            // === v7.3 姿勢 section 特殊處理 ===
            if (section.id === 'pose') {
                // 高級魔法按鈕
                const poseMagicBtn = document.createElement('button');
                poseMagicBtn.className = 'race-magic-btn';
                poseMagicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                    (state.lang === 'zh' ? '🔮 高級魔法專用' : '🔮 Advanced Magic');
                poseMagicBtn.addEventListener('click', () => {
                    openPoseMagicModal();
                });
                const poseCustomToggle = header.querySelector('.btn-custom-toggle');
                const poseBtnGroup = document.createElement('div');
                poseBtnGroup.className = 'section-header-buttons';
                header.insertBefore(poseBtnGroup, poseCustomToggle);
                poseBtnGroup.appendChild(poseMagicBtn);
                poseBtnGroup.appendChild(poseCustomToggle);

                // poseAdvanced 橫幅（與種族/職業一致）
                if (state.poseAdvanced && state.poseAdvanced.pose) {
                    const pa = state.poseAdvanced;
                    const summaryBar = document.createElement('div');
                    summaryBar.className = 'body-advanced-summary';
                    const summaryText = document.createElement('span');
                    const gravObj = pa.gravity ? POSE_DATA.GRAVITY.find(g => g.id === pa.gravity) : null;
                    const gazeObj = pa.gaze ? POSE_DATA.GAZE.find(g => g.id === pa.gaze) : null;
                    let detailText = pa.pose.label;
                    if (gravObj) detailText += ` ${gravObj.label}`;
                    if (gazeObj) detailText += ` ${gazeObj.label}`;
                    summaryText.innerHTML = `🔮 姿勢魔法啟用中：${detailText}`;
                    const editBtn = document.createElement('button');
                    editBtn.className = 'body-summary-action';
                    editBtn.textContent = '編輯';
                    editBtn.addEventListener('click', () => { openPoseMagicModal(); });
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'body-summary-action clear';
                    clearBtn.textContent = '清除';
                    clearBtn.addEventListener('click', () => {
                        delete state.poseAdvanced;
                        renderTabContent();
                        generatePrompt();
                        saveState();
                    });
                    summaryBar.appendChild(summaryText);
                    summaryBar.appendChild(editBtn);
                    summaryBar.appendChild(clearBtn);
                    sectionEl.appendChild(summaryBar);
                }

                // 渲染分頁 grid
                renderPaginatedGrid(sectionEl, section, section.data, 'posePage');

                // If poseAdvanced active, add disabled overlay（與髮型/身材一致）
                if (state.poseAdvanced && state.poseAdvanced.pose) {
                    const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
                    if (tagGrid) tagGrid.classList.add('body-section-disabled');
                }

                tabContent.appendChild(sectionEl);

                // Custom input
                if (state.customInputVisible[section.id]) {
                    const customRow = document.createElement('div');
                    customRow.className = 'custom-input-row';
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'custom-section-input';
                    input.placeholder = state.lang === 'zh' ? '輸入自訂值...' : 'Enter custom value...';
                    input.value = state.customInputs[section.id] || '';
                    input.addEventListener('input', (e) => {
                        state.customInputs[section.id] = e.target.value.trim();
                        generatePrompt();
                    });
                    customRow.appendChild(input);
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'btn-clear-custom';
                    clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    clearBtn.addEventListener('click', () => {
                        state.customInputs[section.id] = '';
                        state.customInputVisible[section.id] = false;
                        renderTabContent();
                        generatePrompt();
                    });
                    customRow.appendChild(clearBtn);
                    sectionEl.appendChild(customRow);
                }

                tabContent.appendChild(sectionEl);
                return; // pose section 處理完畢
            }

            // === v7.5 動漫風格 section 特殊處理 ===
            if (section.id === 'animeStyle') {
                const asMagicBtn = document.createElement('button');
                asMagicBtn.className = 'race-magic-btn';
                asMagicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                    (state.lang === 'zh' ? '🔮 高級魔法專用' : '🔮 Advanced Magic');
                asMagicBtn.addEventListener('click', () => { openAnimeStyleMagicModal(); });
                const asCustomToggle = header.querySelector('.btn-custom-toggle');
                const asBtnGroup = document.createElement('div');
                asBtnGroup.className = 'section-header-buttons';
                header.insertBefore(asBtnGroup, asCustomToggle);
                asBtnGroup.appendChild(asMagicBtn);
                asBtnGroup.appendChild(asCustomToggle);

                // 已選 badge
                if (state.selections.animeStyle) {
                    const asObj = section.data.find(o => o.value === state.selections.animeStyle);
                    if (asObj) {
                        const badge = document.createElement('span');
                        badge.className = 'selected-race-badge';
                        badge.innerHTML = `✓ ${getOptionLabel(asObj)} <span class="badge-x" title="${state.lang === 'zh' ? '取消選擇' : 'Deselect'}">✕</span>`;
                        badge.querySelector('.badge-x').addEventListener('click', (e) => {
                            e.stopPropagation();
                            delete state.selections.animeStyle;
                            delete state.animeStyleAdvanced;
                            renderTabContent();
                            generatePrompt();
                            saveState();
                        });
                        const titleEl = header.querySelector('.section-block-title');
                        const titleWrapper = document.createElement('div');
                        titleWrapper.className = 'section-title-with-badge';
                        titleEl.parentNode.insertBefore(titleWrapper, titleEl);
                        titleWrapper.appendChild(titleEl);
                        titleWrapper.appendChild(badge);
                    }
                }

                // animeStyleAdvanced 橫幅
                if (state.animeStyleAdvanced) {
                    const asa = state.animeStyleAdvanced;
                    const summaryBar = document.createElement('div');
                    summaryBar.className = 'body-advanced-summary';
                    const summaryText = document.createElement('span');
                    summaryText.innerHTML = `🔮 動漫風格魔法啟用中：${asa.selectedLabel || ''} ${asa.selectedEn || ''}`;
                    const editBtn = document.createElement('button');
                    editBtn.className = 'body-summary-action';
                    editBtn.textContent = '編輯';
                    editBtn.addEventListener('click', () => { openAnimeStyleMagicModal(); });
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'body-summary-action clear';
                    clearBtn.textContent = '清除';
                    clearBtn.addEventListener('click', () => {
                        delete state.animeStyleAdvanced;
                        delete state.selections.animeStyle;
                        renderTabContent();
                        generatePrompt();
                        saveState();
                    });
                    summaryBar.appendChild(summaryText);
                    summaryBar.appendChild(editBtn);
                    summaryBar.appendChild(clearBtn);
                    sectionEl.appendChild(summaryBar);
                }

                renderPaginatedGrid(sectionEl, section, section.data, 'animeStylePage');
                if (state.animeStyleAdvanced) {
                    const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
                    if (tagGrid) tagGrid.classList.add('body-section-disabled');
                }
                tabContent.appendChild(sectionEl);
                return;
            }

            // === v7.5 藝術風格 section 特殊處理 ===
            if (section.id === 'artStyle') {
                const arMagicBtn = document.createElement('button');
                arMagicBtn.className = 'race-magic-btn';
                arMagicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                    (state.lang === 'zh' ? '🔮 高級魔法專用' : '🔮 Advanced Magic');
                arMagicBtn.addEventListener('click', () => { openArtStyleMagicModal(); });
                const arCustomToggle = header.querySelector('.btn-custom-toggle');
                const arBtnGroup = document.createElement('div');
                arBtnGroup.className = 'section-header-buttons';
                header.insertBefore(arBtnGroup, arCustomToggle);
                arBtnGroup.appendChild(arMagicBtn);
                arBtnGroup.appendChild(arCustomToggle);

                if (state.selections.artStyle) {
                    const arObj = section.data.find(o => o.value === state.selections.artStyle);
                    if (arObj) {
                        const badge = document.createElement('span');
                        badge.className = 'selected-race-badge';
                        badge.innerHTML = `✓ ${getOptionLabel(arObj)} <span class="badge-x" title="${state.lang === 'zh' ? '取消選擇' : 'Deselect'}">✕</span>`;
                        badge.querySelector('.badge-x').addEventListener('click', (e) => {
                            e.stopPropagation();
                            delete state.selections.artStyle;
                            delete state.artStyleAdvanced;
                            renderTabContent();
                            generatePrompt();
                            saveState();
                        });
                        const titleEl = header.querySelector('.section-block-title');
                        const titleWrapper = document.createElement('div');
                        titleWrapper.className = 'section-title-with-badge';
                        titleEl.parentNode.insertBefore(titleWrapper, titleEl);
                        titleWrapper.appendChild(titleEl);
                        titleWrapper.appendChild(badge);
                    }
                }

                if (state.artStyleAdvanced) {
                    const ara = state.artStyleAdvanced;
                    const summaryBar = document.createElement('div');
                    summaryBar.className = 'body-advanced-summary';
                    const summaryText = document.createElement('span');
                    summaryText.innerHTML = `🔮 藝術風格魔法啟用中：${ara.selectedLabel || ''} ${ara.selectedEn || ''}`;
                    const editBtn = document.createElement('button');
                    editBtn.className = 'body-summary-action';
                    editBtn.textContent = '編輯';
                    editBtn.addEventListener('click', () => { openArtStyleMagicModal(); });
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'body-summary-action clear';
                    clearBtn.textContent = '清除';
                    clearBtn.addEventListener('click', () => {
                        delete state.artStyleAdvanced;
                        delete state.selections.artStyle;
                        renderTabContent();
                        generatePrompt();
                        saveState();
                    });
                    summaryBar.appendChild(summaryText);
                    summaryBar.appendChild(editBtn);
                    summaryBar.appendChild(clearBtn);
                    sectionEl.appendChild(summaryBar);
                }

                renderPaginatedGrid(sectionEl, section, section.data, 'artStylePage');
                if (state.artStyleAdvanced) {
                    const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
                    if (tagGrid) tagGrid.classList.add('body-section-disabled');
                }
                tabContent.appendChild(sectionEl);
                return;
            }

            // === v7.5 藝術家 section 特殊處理 ===
            if (section.id === 'artist') {
                const atMagicBtn = document.createElement('button');
                atMagicBtn.className = 'race-magic-btn';
                atMagicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                    (state.lang === 'zh' ? '🔮 高級魔法專用' : '🔮 Advanced Magic');
                atMagicBtn.addEventListener('click', () => { openArtistMagicModal(); });
                const atCustomToggle = header.querySelector('.btn-custom-toggle');
                const atBtnGroup = document.createElement('div');
                atBtnGroup.className = 'section-header-buttons';
                header.insertBefore(atBtnGroup, atCustomToggle);
                atBtnGroup.appendChild(atMagicBtn);
                atBtnGroup.appendChild(atCustomToggle);

                if (state.selections.artist) {
                    const atObj = section.data.find(o => o.value === state.selections.artist);
                    if (atObj) {
                        const badge = document.createElement('span');
                        badge.className = 'selected-race-badge';
                        badge.innerHTML = `✓ ${getOptionLabel(atObj)} <span class="badge-x" title="${state.lang === 'zh' ? '取消選擇' : 'Deselect'}">✕</span>`;
                        badge.querySelector('.badge-x').addEventListener('click', (e) => {
                            e.stopPropagation();
                            delete state.selections.artist;
                            delete state.artistAdvanced;
                            renderTabContent();
                            generatePrompt();
                            saveState();
                        });
                        const titleEl = header.querySelector('.section-block-title');
                        const titleWrapper = document.createElement('div');
                        titleWrapper.className = 'section-title-with-badge';
                        titleEl.parentNode.insertBefore(titleWrapper, titleEl);
                        titleWrapper.appendChild(titleEl);
                        titleWrapper.appendChild(badge);
                    }
                }

                if (state.artistAdvanced) {
                    const ata = state.artistAdvanced;
                    const summaryBar = document.createElement('div');
                    summaryBar.className = 'body-advanced-summary';
                    const summaryText = document.createElement('span');
                    summaryText.innerHTML = `🔮 藝術家魔法啟用中：${ata.selectedLabel || ''} ${ata.selectedEn || ''}`;
                    const editBtn = document.createElement('button');
                    editBtn.className = 'body-summary-action';
                    editBtn.textContent = '編輯';
                    editBtn.addEventListener('click', () => { openArtistMagicModal(); });
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'body-summary-action clear';
                    clearBtn.textContent = '清除';
                    clearBtn.addEventListener('click', () => {
                        delete state.artistAdvanced;
                        delete state.selections.artist;
                        renderTabContent();
                        generatePrompt();
                        saveState();
                    });
                    summaryBar.appendChild(summaryText);
                    summaryBar.appendChild(editBtn);
                    summaryBar.appendChild(clearBtn);
                    sectionEl.appendChild(summaryBar);
                }

                renderPaginatedGrid(sectionEl, section, section.data, 'artistPage');
                if (state.artistAdvanced) {
                    const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
                    if (tagGrid) tagGrid.classList.add('body-section-disabled');
                }
                tabContent.appendChild(sectionEl);
                return;
            }

            // === v7.6 場景 Magic Modal — scene section 特殊處理 ===
            if (section.id === 'scene') {
                // 高級魔法專用按鈕
                const sceneMagicBtn = document.createElement('button');
                sceneMagicBtn.className = 'race-magic-btn';
                sceneMagicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                    (state.lang === 'zh' ? '🌍 高級魔法專用' : '🌍 Advanced Magic');
                sceneMagicBtn.addEventListener('click', () => {
                    openSceneMagicModal();
                });
                const scCustomToggle = header.querySelector('.btn-custom-toggle');
                const scBtnGroup = document.createElement('div');
                scBtnGroup.className = 'section-header-buttons';
                header.insertBefore(scBtnGroup, scCustomToggle);
                scBtnGroup.appendChild(sceneMagicBtn);
                scBtnGroup.appendChild(scCustomToggle);

                // 已選場景 badge
                if (state.selections.scene) {
                    const scData = window.PromptGen.SceneMagicData;
                    const scObj = scData ? scData.ITEMS.find(s => s.value === state.selections.scene) : null;
                    if (scObj) {
                        const badge = document.createElement('span');
                        badge.className = 'selected-race-badge';
                        badge.innerHTML = `✓ ${scObj.icon} ${state.lang === 'zh' ? scObj.label : scObj.en} <span class="badge-x" title="${state.lang === 'zh' ? '取消選擇' : 'Deselect'}">✕</span>`;
                        badge.querySelector('.badge-x').addEventListener('click', (e) => {
                            e.stopPropagation();
                            delete state.selections.scene;
                            delete state.sceneAdvanced;
                            renderTabContent();
                            generatePrompt();
                            saveState();
                        });
                        const titleEl = header.querySelector('.section-block-title');
                        const titleWrapper = document.createElement('div');
                        titleWrapper.className = 'section-title-with-badge';
                        titleEl.parentNode.insertBefore(titleWrapper, titleEl);
                        titleWrapper.appendChild(titleEl);
                        titleWrapper.appendChild(badge);
                    }
                }

                // ★ sceneAdvanced 橫幅：顯示加分特徵
                if (state.sceneAdvanced && state.sceneAdvanced.bonusTraits && state.sceneAdvanced.bonusTraits.length > 0) {
                    const sa = state.sceneAdvanced;
                    const traitNames = sa.bonusTraitsZh ? sa.bonusTraitsZh.join('、') : sa.bonusTraits.join(', ');
                    const sceneName = sa.selectedScene ? `${sa.selectedScene.label} ${sa.selectedScene.en}` : '';

                    const summaryBar = document.createElement('div');
                    summaryBar.className = 'body-advanced-summary';
                    const summaryText = document.createElement('span');
                    summaryText.innerHTML = `🌍 ${state.lang === 'zh' ? '場景魔法啟用中' : 'Scene Magic Active'}：${sceneName} / 🏷️ ${traitNames}`;

                    const editBtn = document.createElement('button');
                    editBtn.className = 'body-summary-action';
                    editBtn.textContent = state.lang === 'zh' ? '編輯' : 'Edit';
                    editBtn.addEventListener('click', () => openSceneMagicModal());

                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'body-summary-action clear';
                    clearBtn.textContent = state.lang === 'zh' ? '清除' : 'Clear';
                    clearBtn.addEventListener('click', () => {
                        state.sceneAdvanced = null;
                        delete state.selections.scene;
                        renderTabContent();
                        generatePrompt();
                        saveState();
                    });

                    summaryBar.appendChild(summaryText);
                    summaryBar.appendChild(editBtn);
                    summaryBar.appendChild(clearBtn);
                    sectionEl.appendChild(summaryBar);
                }

                // 渲染分頁 grid（使用 SceneMagicData 全部 332 項，依常用度排序）
                const SCENE_CATEGORY_ORDER = ['daily', 'nature', 'urban', 'special', 'fantasy', 'classic', 'scifi', 'abstract', 'dark'];
                const scAllItems = window.PromptGen.SceneMagicData ? [...window.PromptGen.SceneMagicData.ITEMS].sort((a, b) => {
                    return SCENE_CATEGORY_ORDER.indexOf(a.category) - SCENE_CATEGORY_ORDER.indexOf(b.category);
                }) : section.data;
                renderPaginatedGrid(sectionEl, section, scAllItems, 'scenePage');

                // Advanced 啟用時灰化 grid
                if (state.sceneAdvanced && state.sceneAdvanced.bonusTraits && state.sceneAdvanced.bonusTraits.length > 0) {
                    const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
                    if (tagGrid) tagGrid.classList.add('body-section-disabled');
                }
                tabContent.appendChild(sectionEl);

                // Custom input
                if (state.customInputVisible[section.id]) {
                    const customRow = document.createElement('div');
                    customRow.className = 'custom-input-row';
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'custom-section-input';
                    input.placeholder = state.lang === 'zh' ? '輸入自訂場景...' : 'Enter custom scene...';
                    input.value = state.customInputs[section.id] || '';
                    input.addEventListener('input', (e) => {
                        state.customInputs[section.id] = e.target.value.trim();
                        generatePrompt();
                        debouncedSaveState();
                    });
                    customRow.appendChild(input);
                    tabContent.appendChild(customRow);
                }
                return;
            }

            // === v7.7 時間氛圍 Magic Modal — atmosphere section 特殊處理 ===
            if (section.id === 'atmosphere') {
                // 高級魔法專用按鈕
                const atmMagicBtn = document.createElement('button');
                atmMagicBtn.className = 'race-magic-btn';
                atmMagicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                    (state.lang === 'zh' ? '⏰ 高級魔法專用' : '⏰ Advanced Magic');
                atmMagicBtn.addEventListener('click', () => {
                    openAtmosphereMagicModal();
                });
                const atmCustomToggle = header.querySelector('.btn-custom-toggle');
                const atmBtnGroup = document.createElement('div');
                atmBtnGroup.className = 'section-header-buttons';
                header.insertBefore(atmBtnGroup, atmCustomToggle);
                atmBtnGroup.appendChild(atmMagicBtn);
                atmBtnGroup.appendChild(atmCustomToggle);

                // atmosphereAdvanced 橫幅
                if (state.atmosphereAdvanced) {
                    const atm = state.atmosphereAdvanced;
                    const ATM_DATA = window.PromptGen.AtmosphereMagicData;
                    let detailParts = [];
                    if (atm.timeOfDay && ATM_DATA) {
                        const td = ATM_DATA.TIME_OF_DAY[atm.timeOfDay - 1];
                        if (td) detailParts.push(`⏰ ${td.label}`);
                    }
                    if (atm.weather && ATM_DATA) {
                        const wd = ATM_DATA.WEATHER_OPTIONS[atm.weather - 1];
                        if (wd) detailParts.push(`🌤 ${wd.label}`);
                    }
                    if (atm.effectsZh && atm.effectsZh.length > 0) {
                        detailParts.push(`✨ ${atm.effectsZh.join('、')}`);
                    }
                    if (detailParts.length > 0) {
                        const summaryBar = document.createElement('div');
                        summaryBar.className = 'body-advanced-summary';
                        const summaryText = document.createElement('span');
                        summaryText.innerHTML = `⏰ 時間氛圍魔法啟用中：${detailParts.join(' | ')}`;
                        const editBtn = document.createElement('button');
                        editBtn.className = 'body-summary-action';
                        editBtn.textContent = state.lang === 'zh' ? '編輯' : 'Edit';
                        editBtn.addEventListener('click', () => openAtmosphereMagicModal());
                        const clearBtn = document.createElement('button');
                        clearBtn.className = 'body-summary-action clear';
                        clearBtn.textContent = state.lang === 'zh' ? '清除' : 'Clear';
                        clearBtn.addEventListener('click', () => {
                            state.atmosphereAdvanced = null;
                            delete state.selections.atmosphere;
                            renderTabContent();
                            generatePrompt();
                            saveState();
                        });
                        summaryBar.appendChild(summaryText);
                        summaryBar.appendChild(editBtn);
                        summaryBar.appendChild(clearBtn);
                        sectionEl.appendChild(summaryBar);
                    }
                }

                // 渲染分頁 grid
                renderPaginatedGrid(sectionEl, section, section.data, 'atmospherePage');

                // Advanced 啟用時灰化 grid
                if (state.atmosphereAdvanced) {
                    const tagGrid = sectionEl.querySelector('.tag-grid-paginated');
                    if (tagGrid) tagGrid.classList.add('body-section-disabled');
                }
                tabContent.appendChild(sectionEl);

                // Custom input
                if (state.customInputVisible[section.id]) {
                    const customRow = document.createElement('div');
                    customRow.className = 'custom-input-row';
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'custom-section-input';
                    input.placeholder = state.lang === 'zh' ? '輸入自訂氛圍...' : 'Enter custom atmosphere...';
                    input.value = state.customInputs[section.id] || '';
                    input.addEventListener('input', (e) => {
                        state.customInputs[section.id] = e.target.value.trim();
                        generatePrompt();
                        debouncedSaveState();
                    });
                    customRow.appendChild(input);
                    tabContent.appendChild(customRow);
                }
                return;
            }

            // === v6.9 眼色色盤：跳過 eyeColorRight，由 eyeColorLeft 一併處理 ===
            if (section.id === 'eyeColorRight') return;

            // === v6.9 眼色色盤渲染 ===
            if (section.id === 'eyeColorLeft') {
                // 改標題為「眼色」
                const eyeTitle = header.querySelector('.section-block-title');
                eyeTitle.textContent = state.lang === 'zh' ? '眼色' : 'Eye Color';

                // 取得 eyeColorRight section 定義
                const rightSection = sections.find(s => s.id === 'eyeColorRight');

                // --- 異色瞳開關（放到 header 按鈕群組，與自訂按鈕並排）---
                const toggleWrapper = document.createElement('div');
                toggleWrapper.className = 'eye-heterochromia-toggle';
                const toggleLabel = document.createElement('span');
                toggleLabel.className = 'eye-toggle-label';
                toggleLabel.textContent = state.lang === 'zh' ? '異色瞳' : 'Heterochromia';
                const toggleSwitch = document.createElement('label');
                toggleSwitch.className = 'eye-toggle-switch';
                const toggleInput = document.createElement('input');
                toggleInput.type = 'checkbox';
                toggleInput.checked = state.heterochromia;
                toggleInput.addEventListener('change', (e) => {
                    state.heterochromia = e.target.checked;
                    // 關閉異色瞳時同步右眼 = 左眼
                    if (!state.heterochromia && state.selections['eyeColorLeft']) {
                        state.selections['eyeColorRight'] = state.selections['eyeColorLeft'];
                    }
                    renderTabContent();
                    generatePrompt();
                });
                const toggleSlider = document.createElement('span');
                toggleSlider.className = 'eye-toggle-slider';
                toggleSwitch.appendChild(toggleInput);
                toggleSwitch.appendChild(toggleSlider);
                toggleWrapper.appendChild(toggleLabel);
                toggleWrapper.appendChild(toggleSwitch);

                // 插入 header 按鈕群組（異色瞳 + 自訂）
                const eyeCustomToggle = header.querySelector('.btn-custom-toggle');
                const eyeBtnGroup = document.createElement('div');
                eyeBtnGroup.className = 'section-header-buttons';
                header.insertBefore(eyeBtnGroup, eyeCustomToggle);
                eyeBtnGroup.appendChild(toggleWrapper);
                eyeBtnGroup.appendChild(eyeCustomToggle);

                // === 永遠顯示雙色盤（左眼 + 右眼）===
                // syncBoth = !heterochromia：同步模式時，點任一眼另一眼自動 match
                const syncBoth = !state.heterochromia;
                const dualRow = document.createElement('div');
                dualRow.className = 'eye-palette-dual';

                // 左眼
                const leftHalf = document.createElement('div');
                leftHalf.className = 'eye-palette-half';
                const leftTitle = document.createElement('div');
                leftTitle.className = 'eye-palette-subtitle';
                leftTitle.innerHTML = `\ud83d\udc41 ${state.lang === 'zh' ? '左眼' : 'Left Eye'}`;
                leftHalf.appendChild(leftTitle);
                renderEyeColorPalette(leftHalf, section, section.data, syncBoth);

                // 右眼
                const rightHalf = document.createElement('div');
                rightHalf.className = 'eye-palette-half';
                const rightTitle = document.createElement('div');
                rightTitle.className = 'eye-palette-subtitle';
                rightTitle.innerHTML = `\ud83d\udc41 ${state.lang === 'zh' ? '右眼' : 'Right Eye'}`;
                rightHalf.appendChild(rightTitle);
                if (rightSection) {
                    renderEyeColorPalette(rightHalf, rightSection, rightSection.data, syncBoth);
                }

                dualRow.appendChild(leftHalf);
                dualRow.appendChild(rightHalf);
                sectionEl.appendChild(dualRow);

                tabContent.appendChild(sectionEl);

                // Custom input
                if (state.customInputVisible[section.id]) {
                    const customRow = document.createElement('div');
                    customRow.className = 'custom-input-row';
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'custom-section-input';
                    input.placeholder = state.lang === 'zh' ? '輸入自訂值...' : 'Enter custom value...';
                    input.value = state.customInputs[section.id] || '';
                    input.addEventListener('input', (e) => {
                        state.customInputs[section.id] = e.target.value.trim();
                        generatePrompt();
                    });
                    customRow.appendChild(input);
                    const clearBtn = document.createElement('button');
                    clearBtn.className = 'btn-clear-custom';
                    clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    clearBtn.addEventListener('click', () => {
                        state.customInputs[section.id] = '';
                        state.customInputVisible[section.id] = false;
                        renderTabContent();
                        generatePrompt();
                    });
                    customRow.appendChild(clearBtn);
                    sectionEl.appendChild(customRow);
                }

                tabContent.appendChild(sectionEl);
                return; // 眼色 section 處理完畢
            }

            // Render options based on type
            if (section.type === 'color') {
                renderColorSwatches(sectionEl, section, data);
            } else if (section.type === 'eyeColor') {
                renderEyeColors(sectionEl, section, data);
            } else {
                renderTagGrid(sectionEl, section, data);
            }

            // Custom input field (shown when toggled)
            if (state.customInputVisible[section.id]) {
                const customRow = document.createElement('div');
                customRow.className = 'custom-input-row';
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'custom-section-input';
                input.placeholder = state.lang === 'zh' ? '輸入自訂值...' : 'Enter custom value...';
                input.value = state.customInputs[section.id] || '';
                input.addEventListener('input', (e) => {
                    state.customInputs[section.id] = e.target.value.trim();
                    generatePrompt();
                });
                customRow.appendChild(input);

                // Clear custom button
                const clearBtn = document.createElement('button');
                clearBtn.className = 'btn-clear-custom';
                clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                clearBtn.addEventListener('click', () => {
                    state.customInputs[section.id] = '';
                    state.customInputVisible[section.id] = false;
                    renderTabContent();
                    generatePrompt();
                });
                customRow.appendChild(clearBtn);
                sectionEl.appendChild(customRow);
            }

            tabContent.appendChild(sectionEl);
        });
    }


    // ============================================
    // Body Magic Modal — 由 modules/body-magic-modal.js 提供
    // ============================================
    function openBodyMagicModal() {
        window.PromptGen.BodyMagicModal.openBodyMagicModal();
    }

    // ============================================
    // Race Magic Modal — 由 modules/race-magic-modal.js 提供
    // ============================================
    function openRaceMagicModal() {
        window.PromptGen.RaceMagicModal.openRaceMagicModal();
    }

    // ============================================
    // Job Magic Modal — 由 modules/job-magic-modal.js 提供
    // ============================================
    function openJobMagicModal() {
        window.PromptGen.JobMagicModal.openJobMagicModal();
    }

    // ============================================
    // Hair Magic Modal — 由 modules/hair-magic-modal.js 提供
    // ============================================
    function openHairMagicModal() {
        window.PromptGen.HairMagicModal.openHairMagicModal();
    }

    // ============================================
    // Outfit Magic Modal — 由 modules/outfit-magic-modal.js 提供
    // ============================================
    function openOutfitMagicModal() {
        window.PromptGen.OutfitMagicModal.openOutfitMagicModal();
    }

    // ============================================
    // Headwear Magic Modal — 由 modules/headwear-magic-modal.js 提供
    // ============================================
    function openHeadwearMagicModal() {
        window.PromptGen.HeadwearMagicModal.openHeadwearMagicModal();
    }

    // ============================================
    // Hand Items Magic Modal — 由 modules/hand-items-magic-modal.js 提供
    // ============================================
    function openHandItemsMagicModal() {
        window.PromptGen.HandItemsMagicModal.openHandItemsMagicModal();
    }

    // ============================================
    // Expression Magic Modal — 由 modules/expression-magic-modal.js 提供
    // ============================================
    function openExpressionMagicModal() {
        window.PromptGen.ExpressionMagicModal.openExpressionMagicModal();
    }

    // ============================================
    // Pose Magic Modal — 由 modules/pose-magic-modal.js 提供
    // ============================================
    function openPoseMagicModal() {
        window.PromptGen.PoseMagicModal.openPoseMagicModal();
    }

    // ============================================
    // Anime Style Magic Modal — 由 modules/anime-style-magic-modal.js 提供
    // ============================================
    function openAnimeStyleMagicModal() {
        window.PromptGen.AnimeStyleMagicModal.openAnimeStyleMagicModal();
    }

    // ============================================
    // Art Style Magic Modal — 由 modules/art-style-magic-modal.js 提供
    // ============================================
    function openArtStyleMagicModal() {
        window.PromptGen.ArtStyleMagicModal.openArtStyleMagicModal();
    }

    // ============================================
    // Artist Magic Modal — 由 modules/artist-magic-modal.js 提供
    // ============================================
    function openArtistMagicModal() {
        window.PromptGen.ArtistMagicModal.openArtistMagicModal();
    }
    function openSceneMagicModal() {
        window.PromptGen.SceneMagicModal.openSceneMagicModal();
    }
    // ============================================
    // Atmosphere Magic Modal — 由 modules/atmosphere-magic-modal.js 提供
    // ============================================
    function openAtmosphereMagicModal() {
        window.PromptGen.AtmosphereMagicModal.openAtmosphereMagicModal();
    }

    // ============================================
    // 衝突偵測系統 — 由 modules/conflict-system.js 提供
    // ============================================
    function checkAllConflicts() {
        return window.PromptGen.ConflictSystem.checkAllConflicts();
    }
    function onSelectionChanged() {
        return window.PromptGen.ConflictSystem.onSelectionChanged();
    }
    function showConflictToast(msg) {
        return window.PromptGen.ConflictSystem.showConflictToast(msg);
    }


    function renderTagGrid(container, section, data) {
        const grid = document.createElement('div');
        grid.className = 'tag-grid';
        const isMulti = MULTI_SELECT_SECTIONS.has(section.id);

        data.forEach(option => {
            const chip = document.createElement('div');
            let isActive;
            if (isMulti) {
                const arr = state.selections[section.id] || [];
                isActive = arr.includes(option.value);
            } else {
                isActive = state.selections[section.id] === option.value;
            }
            chip.className = `tag-chip${isActive ? ' active' : ''}`;
            chip.dataset.section = section.id;
            chip.dataset.value = option.value;
            if (option.image) chip.dataset.image = option.image;
            chip.textContent = getOptionLabel(option);

            chip.addEventListener('click', () => {
                if (isMulti) {
                    selectMultiOption(section.id, option.value);
                } else {
                    selectOption(section.id, option.value, option);
                }
            });

            // Preview hover
            if (option.image) {
                chip.addEventListener('mouseenter', () => {
                    showPreview(option.image, getOptionLabel(option));
                });
                chip.addEventListener('mouseleave', () => {
                    updateLockedPreview();
                });
            }

            grid.appendChild(chip);
        });

        container.appendChild(grid);
    }

    // ============================================
    // v6.3 種族分頁 Grid
    // ============================================
    const RACE_MAX_ROWS = 3;
    const RACE_COLS = 10;
    const RACE_PER_PAGE = RACE_MAX_ROWS * RACE_COLS; // 30

    function renderPaginatedGrid(container, section, data, pageKey) {
        const totalPages = Math.ceil(data.length / RACE_PER_PAGE);
        // 邊界保護
        if (state[pageKey] < 1) state[pageKey] = 1;
        if (state[pageKey] > totalPages) state[pageKey] = totalPages;

        const startIdx = (state[pageKey] - 1) * RACE_PER_PAGE;
        const endIdx = Math.min(startIdx + RACE_PER_PAGE, data.length);
        const pageData = data.slice(startIdx, endIdx);

        const grid = document.createElement('div');
        grid.className = 'tag-grid-paginated';

        pageData.forEach(option => {
            const chip = document.createElement('div');
            chip.className = `tag-chip${state.selections[section.id] === option.value ? ' active' : ''}`;
            chip.dataset.section = section.id;
            chip.dataset.value = option.value;
            if (option.image) chip.dataset.image = option.image;
            chip.textContent = getOptionLabel(option);
            chip.title = option.en || option.label;

            chip.addEventListener('click', () => {
                selectOption(section.id, option.value, option);
            });

            // Preview hover (if image exists)
            if (option.image) {
                chip.addEventListener('mouseenter', () => {
                    showPreview(option.image, getOptionLabel(option));
                });
                chip.addEventListener('mouseleave', () => {
                    updateLockedPreview();
                });
            }

            grid.appendChild(chip);
        });

        container.appendChild(grid);

        // === Pagination Nav ===
        if (totalPages > 1) {
            const nav = document.createElement('div');
            nav.className = 'pagination-nav';

            const prevBtn = document.createElement('button');
            prevBtn.className = 'page-btn';
            prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
            prevBtn.disabled = state[pageKey] === 1;
            prevBtn.addEventListener('click', () => {
                if (state[pageKey] > 1) { state[pageKey]--; renderTabContent(); }
            });

            const pageText = document.createElement('span');
            pageText.className = 'page-indicator';
            pageText.textContent = `${state[pageKey]} / ${totalPages}`;

            const nextBtn = document.createElement('button');
            nextBtn.className = 'page-btn';
            nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
            nextBtn.disabled = state[pageKey] === totalPages;
            nextBtn.addEventListener('click', () => {
                if (state[pageKey] < totalPages) { state[pageKey]++; renderTabContent(); }
            });

            nav.appendChild(prevBtn);
            nav.appendChild(pageText);
            nav.appendChild(nextBtn);
            container.appendChild(nav);
        }
    }

    // 向後兼容别名
    function renderPaginatedRaceGrid(container, section, data) {
        renderPaginatedGrid(container, section, data, 'racePage');
    }

    function renderColorSwatches(container, section, data) {
        const grid = document.createElement('div');
        grid.className = 'color-swatch-grid';

        data.forEach(option => {
            const swatch = document.createElement('button');
            swatch.className = `color-swatch${state.selections[section.id] === option.value ? ' active' : ''}`;
            swatch.title = getOptionLabel(option);
            swatch.dataset.section = section.id;
            swatch.dataset.value = option.value;

            const colorCircle = document.createElement('span');
            colorCircle.className = 'swatch-circle';
            if (option.color.startsWith('linear')) {
                colorCircle.style.background = option.color;
            } else {
                colorCircle.style.backgroundColor = option.color;
            }
            swatch.appendChild(colorCircle);

            const label = document.createElement('span');
            label.className = 'swatch-label';
            label.textContent = getOptionLabel(option);
            swatch.appendChild(label);

            swatch.addEventListener('click', () => {
                selectOption(section.id, option.value, option);
            });

            grid.appendChild(swatch);
        });

        container.appendChild(grid);
    }

    // === v6.9 眼色色盤渲染（複用 color-swatch 元件，與髮色一致）===
    function renderEyeColorPalette(container, section, data, syncBoth) {
        const grid = document.createElement('div');
        grid.className = 'color-swatch-grid eye-swatch-grid';

        data.forEach(option => {
            const swatch = document.createElement('button');
            const isActive = state.selections[section.id] === option.value;
            swatch.className = `color-swatch${isActive ? ' active' : ''}`;
            swatch.title = getOptionLabel(option);
            swatch.dataset.section = section.id;
            swatch.dataset.value = option.value;

            const colorCircle = document.createElement('span');
            colorCircle.className = 'swatch-circle';
            if (option.color && option.color.startsWith('linear')) {
                colorCircle.style.background = option.color;
            } else {
                colorCircle.style.backgroundColor = option.color;
            }
            swatch.appendChild(colorCircle);

            const label = document.createElement('span');
            label.className = 'swatch-label';
            label.textContent = getOptionLabel(option);
            swatch.appendChild(label);

            swatch.addEventListener('click', () => {
                // Toggle：再點同色取消
                if (state.selections[section.id] === option.value) {
                    delete state.selections[section.id];
                    if (syncBoth) {
                        // 同步模式：另一眼也取消
                        const otherId = section.id === 'eyeColorLeft' ? 'eyeColorRight' : 'eyeColorLeft';
                        delete state.selections[otherId];
                    }
                } else {
                    state.selections[section.id] = option.value;
                    if (syncBoth) {
                        // 同步模式：另一眼自動 match
                        const otherId = section.id === 'eyeColorLeft' ? 'eyeColorRight' : 'eyeColorLeft';
                        state.selections[otherId] = option.value;
                    }
                }
                renderTabContent();
                generatePrompt();
            });

            grid.appendChild(swatch);
        });

        container.appendChild(grid);
    }

    // 保留舊函式名以防其他地方呼叫
    function renderEyeColors(container, section, data) {
        renderEyeColorPalette(container, section, data, false);
    }

    // --- Single Select ---
    function selectOption(sectionId, value, option) {
        // Toggle: if already selected, deselect
        if (state.selections[sectionId] === value) {
            delete state.selections[sectionId];
        } else {
            state.selections[sectionId] = value;
        }

        renderTabContent();
        updateLockedPreview();
        // Check for conflicts on any conflict-relevant selection
        if (['race', 'job', 'outfit', 'bodyType', 'hairstyle'].includes(sectionId)) {
            window.PromptGen.ConflictSystem.onSelectionChanged();
        } else {
            generatePrompt();
        }
    }

    // --- Multi Select（畫質等可複選 section）---
    function selectMultiOption(sectionId, value) {
        if (!Array.isArray(state.selections[sectionId])) {
            state.selections[sectionId] = [];
        }
        const arr = state.selections[sectionId];
        const idx = arr.indexOf(value);
        if (idx >= 0) {
            arr.splice(idx, 1); // 取消選取
        } else {
            arr.push(value); // 加入選取
        }
        // 空陣列時清除
        if (arr.length === 0) delete state.selections[sectionId];

        renderTabContent();
        updateLockedPreview();
        generatePrompt();
    }

    // --- Custom Fields ---
    function renderCustomFields() {
        customFieldsContainer.innerHTML = '';
        state.customFields.forEach((field, index) => {
            const row = document.createElement('div');
            row.className = 'custom-field-row';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'custom-field-checkbox';
            checkbox.checked = field.enabled !== false;
            checkbox.addEventListener('change', (e) => {
                state.customFields[index].enabled = e.target.checked;
                generatePrompt();
            });

            const keyInput = document.createElement('input');
            keyInput.type = 'text';
            keyInput.placeholder = 'Key';
            keyInput.value = field.key;
            keyInput.addEventListener('input', (e) => {
                state.customFields[index].key = e.target.value;
                generatePrompt();
            });

            const valInput = document.createElement('input');
            valInput.type = 'text';
            valInput.placeholder = 'Value';
            valInput.value = field.value;
            valInput.addEventListener('input', (e) => {
                state.customFields[index].value = e.target.value;
                generatePrompt();
            });

            const delBtn = document.createElement('button');
            delBtn.className = 'btn btn-delete';
            delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            delBtn.addEventListener('click', () => {
                state.customFields.splice(index, 1);
                renderCustomFields();
                generatePrompt();
            });

            row.appendChild(checkbox);
            row.appendChild(keyInput);
            row.appendChild(valInput);
            row.appendChild(delBtn);
            customFieldsContainer.appendChild(row);
        });
    }

    // --- Prompt Generation ---
    function generatePromptPlain() {
        const parts = [];

        // 次元開場宣言
        parts.push(getDimensionPromptPrefix(state.dimension));
        if (inputSubject.value.trim()) parts.push(inputSubject.value.trim());
        // Gender
        if (state.gender) {
            parts.push(state.gender === 'female' ? 'female' : 'male');
        }

        // Age
        if (state.age) {
            const ageDesc = getAgeDescriptor(state.age, state.gender);
            if (ageDesc) {
                parts.push(ageDesc);
            } else {
                parts.push(`${state.age} years old`);
            }
        }

        // Generate order based on tabs
        const sectionOrder = ['race', 'job', 'hairstyle', 'bodyType', 'hairColor', 'eyeColorLeft', 'eyeColorRight',
            'outfit', 'headwear', 'handItems', 'expression', 'mood', 'pose', 'animeStyle', 'artStyle', 'artist', 'quality',
            'scene', 'weather', 'lighting', 'cameraAngle', 'shotSize', 'focalLength', 'aperture', 'lensEffect'];

        sectionOrder.forEach(secId => {
            // Skip bodyType if bodyAdvanced is active (handled separately)
            if (secId === 'bodyType' && state.bodyAdvanced) {
                const primaryData = state.gender === 'female' ? BODY_MAGIC_DATA.FEMALE_BUST : BODY_MAGIC_DATA.MALE_MUSCLE;
                const primaryInfo = primaryData[state.bodyAdvanced.primary || 4];
                const buildInfo = BODY_MAGIC_DATA.BUILD[state.bodyAdvanced.build || 4];
                const heightInfo = BODY_MAGIC_DATA.HEIGHT[state.bodyAdvanced.height || 4];
                // Use positive[] arrays from demo v2 format with weights
                if (primaryInfo.positive && primaryInfo.positive.length) {
                    primaryInfo.positive.forEach(tag => parts.push(`(${tag}:${primaryInfo.weight})`));
                }
                if (buildInfo.positive && buildInfo.positive.length) {
                    buildInfo.positive.forEach(tag => parts.push(`(${tag}:${buildInfo.weight})`));
                }
                if (heightInfo.positive && heightInfo.positive.length) {
                    heightInfo.positive.forEach(tag => parts.push(`(${tag}:${heightInfo.weight})`));
                }
                return;
            }
            // Skip expression if expressionAdvanced is active
            if (secId === 'expression' && state.expressionAdvanced) {
                const ea = state.expressionAdvanced;
                const lvl = EXPR_DATA.INTENSITY[ea.intensity || 4];
                let baseValue = ea.expression.value;
                // 加入強度修飾
                if (lvl.modifier) baseValue = lvl.modifier + ' ' + baseValue;
                // 權重包裝
                if (lvl.weight > 1.0) {
                    parts.push(`(${baseValue}:${lvl.weight.toFixed(1)})`);
                } else {
                    parts.push(baseValue);
                }
                // 特效
                if (ea.effects && ea.effects.length > 0) {
                    ea.effects.forEach(eid => {
                        const ef = EXPR_DATA.EFFECTS.find(e => e.id === eid);
                        if (ef) {
                            if (lvl.weight > 1.0) {
                                parts.push(`(${ef.value}:${lvl.weight.toFixed(1)})`);
                            } else {
                                parts.push(ef.value);
                            }
                        }
                    });
                }
                return;
            }
            // Skip pose if poseAdvanced is active
            if (secId === 'pose' && state.poseAdvanced) {
                const pa = state.poseAdvanced;
                parts.push(pa.pose.value);
                const gravObj = POSE_DATA.GRAVITY.find(g => g.id === pa.gravity);
                if (gravObj && gravObj.value) parts.push(gravObj.value);
                const gazeObj = POSE_DATA.GAZE.find(g => g.id === pa.gaze);
                if (gazeObj && gazeObj.value) parts.push(gazeObj.value);
                return;
            }
            // Skip atmosphere if atmosphereAdvanced is active
            if (secId === 'atmosphere' && state.atmosphereAdvanced) {
                const atm = state.atmosphereAdvanced;
                const ATM_DATA = window.PromptGen.AtmosphereMagicData;
                if (atm.timeOfDay && ATM_DATA) {
                    const td = ATM_DATA.TIME_OF_DAY[atm.timeOfDay - 1];
                    if (td) parts.push(td.value);
                }
                if (atm.weather && ATM_DATA) {
                    const wd = ATM_DATA.WEATHER_OPTIONS[atm.weather - 1];
                    if (wd) parts.push(wd.value);
                }
                if (atm.effects && atm.effects.length > 0 && ATM_DATA) {
                    atm.effects.forEach(eid => {
                        const ef = ATM_DATA.ITEMS.find(e => e.id === eid);
                        if (ef) parts.push(ef.value);
                    });
                }
                return;
            }
            const val = state.selections[secId];
            if (val && (!Array.isArray(val) || val.length > 0)) {
                // Handle eye colors specially
                if (secId === 'eyeColorLeft') {
                    const rightEye = state.selections['eyeColorRight'];
                    if (rightEye && rightEye !== val) {
                        parts.push(`${val} left eye, ${rightEye} right eye`);
                        return; // Skip right eye in normal flow
                    } else {
                        parts.push(`${val} eyes`);
                        return;
                    }
                }
                if (secId === 'eyeColorRight') {
                    // Already handled by left eye
                    const leftEye = state.selections['eyeColorLeft'];
                    if (leftEye) return; // Already emitted
                    parts.push(`${val} eyes`);
                    return;
                }
                // 複選 section → 合併為逗號分隔
                if (Array.isArray(val)) {
                    parts.push(val.join(', '));
                } else {
                    parts.push(val);
                }
            }

            // Custom input
            const custom = state.customInputs[secId];
            if (custom) {
                parts.push(custom);
            }

            // Hair Magic prompts (append after hairstyle section)
            if (secId === 'hairstyle' && state.hairMagicPrompts && state.hairMagicPrompts.positive && state.hairMagicPrompts.positive.length > 0) {
                state.hairMagicPrompts.positive.forEach(tag => parts.push(tag));
            }

            // ★ raceAdvanced bonusTraits（附加在 race section 後）
            if (secId === 'race' && state.raceAdvanced && state.raceAdvanced.bonusTraits && state.raceAdvanced.bonusTraits.length > 0) {
                state.raceAdvanced.bonusTraits.forEach(trait => parts.push(trait));
            }

            // ★ jobAdvanced bonusTraits（附加在 job section 後）
            if (secId === 'job' && state.jobAdvanced && state.jobAdvanced.bonusTraits && state.jobAdvanced.bonusTraits.length > 0) {
                state.jobAdvanced.bonusTraits.forEach(trait => parts.push(trait));
            }

            // ★ outfitAdvanced bonusTraits
            if (secId === 'outfit' && state.outfitAdvanced && state.outfitAdvanced.bonusTraits && state.outfitAdvanced.bonusTraits.length > 0) {
                state.outfitAdvanced.bonusTraits.forEach(trait => parts.push(trait));
            }

            // ★ headwearAdvanced bonusTraits
            if (secId === 'headwear' && state.headwearAdvanced && state.headwearAdvanced.bonusTraits && state.headwearAdvanced.bonusTraits.length > 0) {
                state.headwearAdvanced.bonusTraits.forEach(trait => parts.push(trait));
            }

            // ★ handItemsAdvanced bonusTraits
            if (secId === 'handItems' && state.handItemsAdvanced && state.handItemsAdvanced.bonusTraits && state.handItemsAdvanced.bonusTraits.length > 0) {
                state.handItemsAdvanced.bonusTraits.forEach(trait => parts.push(trait));
            }

            // ★ sceneAdvanced bonusTraits（附加在 scene section 後）
            if (secId === 'scene' && state.sceneAdvanced && state.sceneAdvanced.bonusTraits && state.sceneAdvanced.bonusTraits.length > 0) {
                state.sceneAdvanced.bonusTraits.forEach(trait => parts.push(trait));
            }
        });

        // Quality tags
        if (state.highQuality) {
            const q = state.selections['quality'];
            const hasQuality = q && (Array.isArray(q) ? q.length > 0 : true);
            if (!hasQuality) {
                parts.push('masterpiece, best quality');
            }
        }

        // Custom Fields
        state.customFields.forEach(field => {
            if (field.enabled !== false && field.key && field.value) {
                parts.push(field.value);
            }
        });

        let result = parts.join(', ');

        // Apply conflict resolution to final prompt
        if (state.conflictInfo && state.conflictResolution) {
            if (state.conflictResolution === 'dual') {
                result = '2characters, multiple characters, ' + result;
            } else if (state.conflictResolution === 'merge') {
                const coreA = (state.selections[state.conflictInfo.catA] || '').split(',')[0].trim();
                const coreB = (state.selections[state.conflictInfo.catB] || '').split(',')[0].trim();
                if (coreA && coreB) {
                    result = `(${coreA} ${coreB}:1.3), single character, solo, ` + result;
                }
            }
            // 'ignore' = no modification
        }

        return result;
    }

    function generatePromptYAML() {
        let yaml = '';

        // 次元 task header
        const dimHeader = getDimensionYAMLHeader(state.dimension);
        yaml += `task: ${dimHeader.task}\n`;
        yaml += `style_notes: ${dimHeader.style_notes}\n`;
        if (inputSubject.value.trim()) yaml += `additional_instructions: ${inputSubject.value.trim()}\n`;
        yaml += `gender: ${state.gender ? (state.gender === 'female' ? 'female' : 'male') : 'unspecified'}\n`;

        if (state.age) {
            const ageDesc = getAgeDescriptor(state.age, state.gender);
            if (ageDesc) {
                yaml += `age: ${ageDesc}\n`;
            } else {
                yaml += `age: ${state.age} years old\n`;
            }
        }

        const yamlMap = {
            'race': 'race', 'job': 'job', 'hairstyle': 'hairstyle', 'bodyType': 'body_type',
            'hairColor': 'hair_color',
            'eyeColorLeft': 'left_eye', 'eyeColorRight': 'right_eye', 'outfit': 'outfit',
            'headwear': 'headwear', 'handItems': 'hand_items',
            'expression': 'expression', 'mood': 'mood', 'pose': 'pose', 'animeStyle': 'anime_style',
            'artStyle': 'art_style', 'artist': 'artist', 'quality': 'quality',
            'scene': 'scene', 'weather': 'weather', 'lighting': 'lighting',
            'cameraAngle': 'camera_angle', 'shotSize': 'shot_size', 'focalLength': 'focal_length',
            'aperture': 'aperture', 'lensEffect': 'lens_effect'
        };

        Object.keys(yamlMap).forEach(secId => {
            // Skip bodyType if bodyAdvanced is active (handled separately)
            if (secId === 'bodyType' && state.bodyAdvanced) {
                const primaryData = state.gender === 'female' ? BODY_MAGIC_DATA.FEMALE_BUST : BODY_MAGIC_DATA.MALE_MUSCLE;
                const primaryInfo = primaryData[state.bodyAdvanced.primary || 4];
                const buildInfo = BODY_MAGIC_DATA.BUILD[state.bodyAdvanced.build || 4];
                const heightInfo = BODY_MAGIC_DATA.HEIGHT[state.bodyAdvanced.height || 4];
                const bodyParts = [];
                if (primaryInfo.positive && primaryInfo.positive.length) {
                    primaryInfo.positive.forEach(tag => bodyParts.push(`(${tag}:${primaryInfo.weight})`));
                }
                if (buildInfo.positive && buildInfo.positive.length) {
                    buildInfo.positive.forEach(tag => bodyParts.push(`(${tag}:${buildInfo.weight})`));
                }
                if (heightInfo.positive && heightInfo.positive.length) {
                    heightInfo.positive.forEach(tag => bodyParts.push(`(${tag}:${heightInfo.weight})`));
                }
                if (bodyParts.length > 0) {
                    yaml += `body_type: ${bodyParts.join(', ')}\n`;
                }
                return;
            }
            // Skip expression if expressionAdvanced is active
            if (secId === 'expression' && state.expressionAdvanced) {
                const ea = state.expressionAdvanced;
                const lvl = EXPR_DATA.INTENSITY[ea.intensity || 4];
                const exprParts = [];
                let baseValue = ea.expression.value;
                if (lvl.modifier) baseValue = lvl.modifier + ' ' + baseValue;
                if (lvl.weight > 1.0) {
                    exprParts.push(`(${baseValue}:${lvl.weight.toFixed(1)})`);
                } else {
                    exprParts.push(baseValue);
                }
                if (ea.effects && ea.effects.length > 0) {
                    ea.effects.forEach(eid => {
                        const ef = EXPR_DATA.EFFECTS.find(e => e.id === eid);
                        if (ef) {
                            if (lvl.weight > 1.0) exprParts.push(`(${ef.value}:${lvl.weight.toFixed(1)})`);
                            else exprParts.push(ef.value);
                        }
                    });
                }
                yaml += `expression: ${exprParts.join(', ')}\n`;
                return;
            }
            // Skip pose if poseAdvanced is active
            if (secId === 'pose' && state.poseAdvanced) {
                const pa = state.poseAdvanced;
                const poseParts = [pa.pose.value];
                const gravObj = POSE_DATA.GRAVITY.find(g => g.id === pa.gravity);
                if (gravObj && gravObj.value) poseParts.push(gravObj.value);
                const gazeObj = POSE_DATA.GAZE.find(g => g.id === pa.gaze);
                if (gazeObj && gazeObj.value) poseParts.push(gazeObj.value);
                yaml += `pose: ${poseParts.join(', ')}\n`;
                return;
            }
            // Skip atmosphere if atmosphereAdvanced is active (YAML)
            if (secId === 'atmosphere' && state.atmosphereAdvanced) {
                const atm = state.atmosphereAdvanced;
                const ATM_DATA = window.PromptGen.AtmosphereMagicData;
                const atmParts = [];
                if (atm.timeOfDay && ATM_DATA) {
                    const td = ATM_DATA.TIME_OF_DAY[atm.timeOfDay - 1];
                    if (td) atmParts.push(td.value);
                }
                if (atm.weather && ATM_DATA) {
                    const wd = ATM_DATA.WEATHER_OPTIONS[atm.weather - 1];
                    if (wd) atmParts.push(wd.value);
                }
                if (atm.effects && atm.effects.length > 0 && ATM_DATA) {
                    atm.effects.forEach(eid => {
                        const ef = ATM_DATA.ITEMS.find(e => e.id === eid);
                        if (ef) atmParts.push(ef.value);
                    });
                }
                if (atmParts.length > 0) {
                    yaml += `atmosphere: ${atmParts.join(', ')}\n`;
                }
                return;
            }
            const parts = [];
            const selVal = state.selections[secId];
            if (selVal) {
                if (Array.isArray(selVal) && selVal.length > 0) {
                    parts.push(selVal.join(', '));
                } else if (!Array.isArray(selVal)) {
                    parts.push(selVal);
                }
            }
            if (state.customInputs[secId]) parts.push(state.customInputs[secId]);
            // Hair Magic prompts (append to hairstyle)
            if (secId === 'hairstyle' && state.hairMagicPrompts && state.hairMagicPrompts.positive && state.hairMagicPrompts.positive.length > 0) {
                state.hairMagicPrompts.positive.forEach(tag => parts.push(tag));
            }
            // ★ raceAdvanced bonusTraits（YAML）
            if (secId === 'race' && state.raceAdvanced && state.raceAdvanced.bonusTraits && state.raceAdvanced.bonusTraits.length > 0) {
                state.raceAdvanced.bonusTraits.forEach(trait => parts.push(trait));
            }
            // ★ jobAdvanced bonusTraits（YAML）
            if (secId === 'job' && state.jobAdvanced && state.jobAdvanced.bonusTraits && state.jobAdvanced.bonusTraits.length > 0) {
                state.jobAdvanced.bonusTraits.forEach(trait => parts.push(trait));
            }
            // ★ outfitAdvanced bonusTraits（YAML）
            if (secId === 'outfit' && state.outfitAdvanced && state.outfitAdvanced.bonusTraits && state.outfitAdvanced.bonusTraits.length > 0) {
                state.outfitAdvanced.bonusTraits.forEach(trait => parts.push(trait));
            }
            // ★ headwearAdvanced bonusTraits（YAML）
            if (secId === 'headwear' && state.headwearAdvanced && state.headwearAdvanced.bonusTraits && state.headwearAdvanced.bonusTraits.length > 0) {
                state.headwearAdvanced.bonusTraits.forEach(trait => parts.push(trait));
            }
            // ★ handItemsAdvanced bonusTraits（YAML）
            if (secId === 'handItems' && state.handItemsAdvanced && state.handItemsAdvanced.bonusTraits && state.handItemsAdvanced.bonusTraits.length > 0) {
                state.handItemsAdvanced.bonusTraits.forEach(trait => parts.push(trait));
            }
            if (parts.length > 0) {
                yaml += `${yamlMap[secId]}: ${parts.join(', ')}\n`;
            }
        });

        const yq = state.selections['quality'];
        const yqHas = yq && (Array.isArray(yq) ? yq.length > 0 : true);
        if (state.highQuality && !yqHas) {
            yaml += `quality: masterpiece, best quality\n`;
        }

        // Custom Fields
        state.customFields.forEach(field => {
            if (field.enabled !== false && field.key && field.value) {
                yaml += `${field.key}: ${field.value}\n`;
            }
        });

        // Apply conflict resolution to YAML output
        if (state.conflictInfo && state.conflictResolution) {
            if (state.conflictResolution === 'dual') {
                yaml += `conflict_resolution: 2characters, multiple characters\n`;
            } else if (state.conflictResolution === 'merge') {
                const coreA = (state.selections[state.conflictInfo.catA] || '').split(',')[0].trim();
                const coreB = (state.selections[state.conflictInfo.catB] || '').split(',')[0].trim();
                if (coreA && coreB) {
                    yaml += `conflict_resolution: (${coreA} ${coreB}:1.3), single character, solo\n`;
                }
            }
            // 'ignore' = 不加額外欄位
        }

        return yaml;
    }

    function applySyntaxHighlighting(yamlText) {
        const lines = yamlText.split('\n');
        const highlightedLines = lines.map(line => {
            const match = line.match(/^(\s*)([a-zA-Z0-9_]+):\s*(.*)$/);
            if (match) {
                const indent = match[1];
                const key = match[2];
                const value = match[3];
                return `${indent}<span style="color: #6B9FE8;">${key}:</span> <span style="color: #D4A574;">${value}</span>`;
            }
            return line;
        });
        return highlightedLines.join('\n');
    }

    function generatePrompt() {
        let promptText;
        if (state.format === 'yaml') {
            promptText = generatePromptYAML();
            outputFinal.innerHTML = applySyntaxHighlighting(promptText);
            outputFinal.dataset.plainText = promptText;
        } else {
            promptText = generatePromptPlain();
            outputFinal.textContent = promptText;
            outputFinal.dataset.plainText = promptText;
        }

        outputNegative.value = inputNegative.value.trim();

        // Append body magic negative prompts if active
        if (state.bodyAdvanced) {
            const primaryData = state.gender === 'female' ? BODY_MAGIC_DATA.FEMALE_BUST : BODY_MAGIC_DATA.MALE_MUSCLE;
            const primaryInfo = primaryData[state.bodyAdvanced.primary || 4];
            const buildInfo = BODY_MAGIC_DATA.BUILD[state.bodyAdvanced.build || 4];
            const heightInfo = BODY_MAGIC_DATA.HEIGHT[state.bodyAdvanced.height || 4];
            const negParts = [];
            if (primaryInfo.negative && primaryInfo.negative.length) negParts.push(...primaryInfo.negative);
            if (buildInfo.negative && buildInfo.negative.length) negParts.push(...buildInfo.negative);
            if (heightInfo.negative && heightInfo.negative.length) negParts.push(...heightInfo.negative);
            if (negParts.length > 0) {
                const existing = outputNegative.value;
                outputNegative.value = existing ? existing + ', ' + negParts.join(', ') : negParts.join(', ');
            }
        }

        // 更新 tag 計數顯示（始終用 plain 格式計數，避免 YAML 格式影響）
        const tagCountEl = document.getElementById('prompt-tag-count');
        if (tagCountEl) {
            const countText = generatePromptPlain();
            const tagCount = countText.split(',').filter(t => t.trim().length > 0).length;
            tagCountEl.textContent = tagCount > 0 ? `${tagCount} tags` : '';
        }

        // 儲存 negative plainText 供咒語模式使用
        if (outputNegative) {
            outputNegative.dataset.plainText = outputNegative.value;
        }

        // 如果咒語模式啟用，轉換顯示文字
        if (typeof renderSpellText === 'function' && state.spellMode) {
            renderSpellText();
        }

        saveState();
    }

    // --- Preview Logic ---
    function showPreview(imageSrc, labelText) {
        if (imageSrc) {
            previewImageBox.style.backgroundImage = `url('${imageSrc}')`;
            previewLabel.textContent = labelText;
            previewPlaceholder.style.display = 'none';
            previewContent.style.display = 'block';
            IncantationManager.stop();
        }
    }

    function hidePreview() {
        previewPlaceholder.style.display = 'flex';
        previewContent.style.display = 'none';
        previewImageBox.style.backgroundImage = 'none';
        IncantationManager.start();
    }

    function updateLockedPreview() {
        // Find last selected tag with an image in the DOM
        const activeTags = Array.from(document.querySelectorAll('.tag-chip.active'));
        let lastTagWithImage = null;

        for (let i = activeTags.length - 1; i >= 0; i--) {
            if (activeTags[i].dataset.image) {
                lastTagWithImage = activeTags[i];
                break;
            }
        }

        if (lastTagWithImage) {
            state.isPreviewLocked = true;
            showPreview(lastTagWithImage.dataset.image, lastTagWithImage.textContent);
        } else {
            state.isPreviewLocked = false;
            hidePreview();
        }
    }


    // --- Sound Manager (from modules/sound-manager.js) ---
    const sfx = new SoundManager();

    // ============================================
    // 模組依賴注入
    // ============================================
    window.PromptGen.BodyMagicModal.setup({
        state, sfx, BODY_MAGIC_DATA, generatePrompt, saveState, renderTabContent
    });
    window.PromptGen.RaceMagicModal.setup({
        state, sfx, RACES, selectOption, generatePrompt, saveState, renderTabContent
    });
    window.PromptGen.JobMagicModal.setup({
        state, sfx, JOBS, selectOption, generatePrompt, saveState, renderTabContent
    });
    window.PromptGen.HairMagicModal.setup({
        state, sfx, HAIR_MAGIC_DATA, generatePrompt, saveState, renderTabContent
    });
    window.PromptGen.OutfitMagicModal.setup({
        state, sfx, OUTFITS, selectOption, generatePrompt, saveState, renderTabContent
    });
    window.PromptGen.HeadwearMagicModal.setup({
        state, sfx, HEADWEAR, selectOption, generatePrompt, saveState, renderTabContent
    });
    window.PromptGen.HandItemsMagicModal.setup({
        state, sfx, HAND_ITEMS, selectOption, generatePrompt, saveState, renderTabContent
    });
    window.PromptGen.ExpressionMagicModal.setup({
        state, sfx, EXPR_DATA, generatePrompt, saveState, renderTabContent
    });
    window.PromptGen.PoseMagicModal.setup({
        state, sfx, POSE_DATA, generatePrompt, saveState, renderTabContent
    });
    window.PromptGen.AnimeStyleMagicModal.setup({
        state, sfx, selectOption, generatePrompt, saveState, renderTabContent
    });
    window.PromptGen.ArtStyleMagicModal.setup({
        state, sfx, selectOption, generatePrompt, saveState, renderTabContent
    });
    window.PromptGen.ArtistMagicModal.setup({
        state, sfx, selectOption, generatePrompt, saveState, renderTabContent
    });
    window.PromptGen.SceneMagicModal.setup({
        state, sfx, selectOption, generatePrompt, saveState, renderTabContent
    });
    window.PromptGen.AtmosphereMagicModal.setup({
        state, sfx, ATM_DATA: window.PromptGen.AtmosphereMagicData, generatePrompt, saveState, renderTabContent
    });
    window.PromptGen.ConflictSystem.setup({
        state, sfx, CONFLICT_RULES, generatePrompt, saveState, selectOption,
        RACES, JOBS, OUTFITS, BODY_TYPES_FEMALE, BODY_TYPES_MALE,
        HAIRSTYLES_FEMALE, HAIRSTYLES_MALE
    });
    if (window.PromptGen.FateWheelModal) {
        window.PromptGen.FateWheelModal.setup({
            state, sfx, generatePrompt, generatePromptPlain, saveState, renderTabContent
        });
    }




    // Changelog Logic
    const btnHistory = document.getElementById('btn-history');
    const changelogModal = document.getElementById('changelog-modal');
    const btnCloseChangelog = document.getElementById('btn-close-changelog');
    const changelogBody = document.getElementById('changelog-body');

    function renderChangelog() {
        changelogBody.innerHTML = changelog.map(entry => `
            <div class="changelog-entry">
                <div class="changelog-header">
                    <span class="changelog-version">${entry.version}</span>
                    <span class="changelog-date">${entry.date}</span>
                </div>
                <ul class="changelog-list">
                    ${entry.changes.map(change => `<li>${change}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    if (btnHistory && changelogModal) {
        btnHistory.addEventListener('click', () => {
            sfx.playClick();
            renderChangelog();
            changelogModal.classList.add('active');
        });

        const closeChangelog = () => {
            sfx.playClick();
            changelogModal.classList.remove('active');
        };

        btnCloseChangelog.addEventListener('click', closeChangelog);
        changelogModal.addEventListener('click', (e) => {
            if (e.target === changelogModal) closeChangelog();
        });
    }

    // --- Init ---

    // Sound Toggle Button
    const btnSoundToggle = document.getElementById('btn-sound-toggle');
    const iconSound = btnSoundToggle.querySelector('i');

    // Initialize button state based on saved setting
    if (sfx.isMuted) {
        iconSound.className = 'fa-solid fa-volume-xmark';
        btnSoundToggle.classList.add('muted');
    }

    // Attempt to initialize audio context immediately (Best effort)
    // Browsers may block this until user interaction, but high-engagement sites might allow it.
    try {
        sfx.init();
    } catch (e) {
        console.log("Auto-init prevented by browser policy");
    }

    // Initialize audio context on first user interaction (Fallback)
    // Listened for multiple event types to catch any valid user gesture
    ['click', 'mousedown', 'keydown', 'touchstart'].forEach(eventType => {
        document.addEventListener(eventType, () => {
            if (!sfx.initialized || (sfx.ctx && sfx.ctx.state === 'suspended')) sfx.init();
        }, { once: true });
    });

    // Also listen for mouseover as a potential trigger (though strict browsers may ignore this)
    document.addEventListener('mouseover', () => {
        if (!sfx.initialized || (sfx.ctx && sfx.ctx.state === 'suspended')) sfx.init();
    }, { once: true });

    btnSoundToggle.addEventListener('click', () => {
        sfx.init(); // Ensure context is started
        const isMuted = sfx.toggleMute();
        if (isMuted) {
            iconSound.className = 'fa-solid fa-volume-xmark';
            btnSoundToggle.classList.add('muted');
        } else {
            iconSound.className = 'fa-solid fa-volume-high';
            btnSoundToggle.classList.remove('muted');
            sfx.playClick();
        }
    });

    // Event Listeners
    btnAddCustom.addEventListener('click', () => {
        sfx.playClick();
        state.customFields.push({ key: '', value: '', enabled: true });
        renderCustomFields();
        generatePrompt();
    });

    // Attach Hover Sounds globally to interactive elements
    document.addEventListener('mouseenter', (e) => {
        if (e.target.matches && e.target.matches('.tag-chip, button, .collapsible-header, .custom-field-checkbox')) {
            sfx.playHover();
        }
    }, true); // Use capture to ensure we catch it

    btnReset.addEventListener('click', () => {
        sfx.playClick();
        const confirmMessage = state.lang === 'zh'
            ? "確定要重置所有設定嗎？\n\n這將會：\n1. 清空所有已選項目\n2. 清空主詞與描述\n3. 清空自訂欄位"
            : "Are you sure you want to reset all settings?\n\nThis will:\n1. Clear all selections\n2. Clear subject and description\n3. Clear custom fields";

        if (confirm(confirmMessage)) {
            sfx.playDelete();
            state.selections = {};
            state.customInputs = {};
            state.customInputVisible = {};
            state.customFields = [];
            inputSubject.value = '做一張全新的圖';

            inputNegative.value = '';

            state.isPreviewLocked = false;
            hidePreview();
            renderCustomFields();
            renderTabs();
            renderTabContent();

            generatePrompt();
            saveState();
        }
    });

    // Copy Button with Auto-Open (v4.7)
    btnCopy.addEventListener('click', () => {
        const textToCopy = outputFinal.dataset.plainText || outputFinal.textContent;
        if (!textToCopy) {
            sfx.playDelete(); // Error/Empty sound (reused delete)
            return;
        }

        // Copy to clipboard
        navigator.clipboard.writeText(textToCopy);
        const originalText = btnCopy.innerHTML;
        btnCopy.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => btnCopy.innerHTML = originalText, 2000);

        // Load AI sites
        const DEFAULT_AI_SITES = [
            { name: 'Grok 速度型', url: 'https://grok.com/' },
            { name: 'Gpt 乖寶型', url: 'https://chatgpt.com/' },
            { name: 'bing 笨呆型', url: 'https://www.bing.com/images/create/ai-image-generator' }
        ];
        const saved = localStorage.getItem('aiSites');
        const aiSites = saved ? JSON.parse(saved) : DEFAULT_AI_SITES;
        const validSites = aiSites.filter(site => site.name && site.url);

        if (validSites.length === 0) {
            // No sites configured, just play success sound
            sfx.playSuccess();
        } else if (validSites.length === 1) {
            // One site: open directly
            window.open(validSites[0].url, '_blank');
            sfx.playSuccess();
        } else {
            // Multiple sites: show picker
            showSitePicker(validSites);
        }
    });

    // --- Dimension Selector (召喚指令) ---
    function getDimensionPromptPrefix(dim) {
        const prefixes = {
            anime: 'masterpiece, best quality, highly detailed anime illustration, anime coloring, cel shading,',
            realistic: 'RAW photo, professional photography, photorealistic, 8k uhd, DSLR, high quality, film grain,',
            fantasy: 'fantasy digital painting, semi-realistic, ethereal glow, detailed illustration, concept art,',
            '2.5d': '2.5D art, anime character design with realistic lighting, detailed textures, blending anime and photorealism,'
        };
        const key = (dim === 'fate') ? ['anime', 'realistic', 'fantasy', '2.5d'][Math.floor(Math.random() * 4)] : dim;
        return prefixes[key] || prefixes.anime;
    }

    function getDimensionYAMLHeader(dim) {
        const headers = {
            anime: {
                task: 'Generate a single anime-style character illustration',
                style_notes: 'Use classic anime coloring with cel shading. The image should look like a high-quality anime screenshot or illustration.'
            },
            realistic: {
                task: 'Generate a photorealistic character portrait',
                style_notes: 'Use professional photography style with natural lighting, DSLR quality, film grain, and realistic skin texture.'
            },
            fantasy: {
                task: 'Generate a fantasy-style character illustration',
                style_notes: 'Use semi-realistic digital painting style with ethereal glow, concept art quality, blending fantasy and realism.'
            },
            '2.5d': {
                task: 'Generate a 2.5D character illustration',
                style_notes: 'Use anime character design but with realistic lighting, detailed textures, blending anime aesthetics with photorealistic rendering.'
            }
        };
        const key = (dim === 'fate') ? ['anime', 'realistic', 'fantasy', '2.5d'][Math.floor(Math.random() * 4)] : dim;
        return headers[key] || headers.anime;
    }

    function updateDimensionUI() {
        if (!dimensionSelector) return;
        dimensionSelector.querySelectorAll('.dim-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.dim === state.dimension);
        });
    }

    function triggerFateWheel() {
        // v8.0 — 開啟命運之輪 Modal（完整轉盤體驗）
        if (window.PromptGen.FateWheelModal) {
            window.PromptGen.FateWheelModal.openFateWheelModal();
        }
    }

    if (dimensionSelector) {
        dimensionSelector.addEventListener('click', (e) => {
            const btn = e.target.closest('.dim-btn');
            if (!btn) return;
            const dim = btn.dataset.dim;

            if (dim === 'fate') {
                triggerFateWheel();
                return;
            }

            // Toggle: 再按一次取消
            state.dimension = (state.dimension === dim) ? 'anime' : dim;
            updateDimensionUI();
            generatePrompt();
            saveState();
        });
    }

    inputSubject.addEventListener('input', () => {
        generatePrompt();
        saveState();
    });



    inputNegative.addEventListener('input', () => {
        saveState(); // just save, no need to regen positive prompt
    });

    // --- Translations for Settings ---
    const i18nText = {
        'settings-title': { en: 'AI Website Settings', zh: 'AI 網站設定' },
        'settings-hint': { en: 'Configure up to 5 AI image generation websites. After copying, you can quickly open them.', zh: '設定最多 5 個 AI 繪圖網站。複製後可以快速開啟。' },
        'add-website': { en: 'Add Website', zh: '新增網站' },
        'save': { en: 'Save', zh: '儲存' },
        'choose-website': { en: 'Choose AI Website', zh: '選擇 AI 網站' },
        'appearance-title': { en: 'Appearance', zh: '外觀設定 (Appearance)' },
        'bg-image-label': { en: 'Background Image (Ctrl+V)', zh: '背景圖片 (Ctrl+V 貼上)' },
        'paste-hint': { en: 'Click input and press Ctrl+V to paste image, or upload.', zh: '點擊輸入框並按下 Ctrl+V 元件可直接貼上，或點擊右側按鈕上傳圖片' },
        'opacity-label': { en: 'Opacity', zh: '透明度' },
        'blur-label': { en: 'Blur', zh: '模糊度' },
        'audio-title': { en: 'Audio Settings', zh: '音效設定 (Audio)' },
        'volume-label': { en: 'Volume', zh: '音量' }
    };

    function updateStaticText() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (i18nText[key]) {
                el.innerText = i18nText[key][state.lang] || i18nText[key].en;
            }
        });
    }

    langRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            sfx.playClick();
            state.lang = e.target.value;
            renderTabs();
            renderTabContent();
            updateStaticText();
            renderCustomFields();
            renderAISites();
            generatePrompt();
        });
    });



    formatRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            sfx.playClick();
            state.format = e.target.value;
            generatePrompt();
        });
    });

    // === 標題列 Toggle 按鈕 ===
    function updateToggleButtons() {
        const langBtn = document.getElementById('btn-lang-toggle');
        const fmtBtn = document.getElementById('btn-format-toggle');
        if (langBtn) {
            const isZh = state.lang === 'zh';
            langBtn.classList.toggle('active', true);  // 永遠保持某種狀態
            langBtn.classList.remove('dim');
            langBtn.querySelector('.btn-icon-label').textContent = isZh ? '中' : 'EN';
            langBtn.title = isZh ? '語言：中文 → 按此切英文' : 'Lang: English → Click for 中文';
        }
        if (fmtBtn) {
            const isYaml = state.format === 'yaml';
            fmtBtn.classList.toggle('active', isYaml);
            fmtBtn.classList.toggle('dim', !isYaml);
            fmtBtn.title = isYaml ? '格式：YAML → 按此切純文字' : '格式：純文字 → 按此切 YAML';
        }
    }

    const btnLangToggle = document.getElementById('btn-lang-toggle');
    if (btnLangToggle) {
        btnLangToggle.addEventListener('click', function () {
            sfx.playClick();
            state.lang = (state.lang === 'zh') ? 'en' : 'zh';
            // 同步隱藏的 radio
            const radio = document.querySelector(`input[name="lang"][value="${state.lang}"]`);
            if (radio) radio.checked = true;
            updateToggleButtons();
            renderTabs();
            renderTabContent();
            updateStaticText();
            renderCustomFields();
            renderAISites();
            generatePrompt();
        });
    }

    const btnFormatToggle = document.getElementById('btn-format-toggle');
    if (btnFormatToggle) {
        btnFormatToggle.addEventListener('click', function () {
            sfx.playClick();
            state.format = (state.format === 'yaml') ? 'plain' : 'yaml';
            const radio = document.querySelector(`input[name="format"][value="${state.format}"]`);
            if (radio) radio.checked = true;
            updateToggleButtons();
            generatePrompt();
        });
    }

    // Initialize
    loadState();
    updateDimensionUI();
    renderTabs();
    renderTabContent();
    updateStaticText();
    renderCustomFields();
    generatePrompt();
    updateToggleButtons(); // 初始化 toggle 按鈕狀態
    IncantationManager.start(); // 啟動中二喊話輪播

    // Global Click Listener for UI Sounds (Delegation)
    document.addEventListener('click', (e) => {
        // Tag Chip Selection
        if (e.target.closest('.tag-chip')) {
            sfx.playClick();
        }
        // Collapsible Header (Toggle)
        if (e.target.closest('.collapsible-header')) {
            sfx.playToggle();
        }
        // Custom field delete
        if (e.target.closest('.btn-delete')) {
            sfx.playDelete();
        }
    });

    // ========================================
    // Settings Panel & Copy-to-Open (v4.7)
    // ========================================

    const settingsModal = document.getElementById('settings-modal');
    const btnSettings = document.getElementById('btn-settings');
    const btnCloseSettings = document.getElementById('btn-close-settings');
    const btnSaveSettings = document.getElementById('btn-save-settings');
    const btnAddSite = document.getElementById('btn-add-site');
    const aiSitesList = document.getElementById('ai-sites-list');
    const sitePicker = document.getElementById('site-picker');
    const sitePickerList = document.getElementById('site-picker-list');

    let aiSitesConfig = [];

    // Load AI sites from localStorage
    function loadAISites() {
        const DEFAULT_AI_SITES = [
            { name: 'Grok 速度型', url: 'https://grok.com/' },
            { name: 'Gpt 乖寶型', url: 'https://chatgpt.com/' },
            { name: 'bing 笨呆型', url: 'https://www.bing.com/images/create/ai-image-generator' }
        ];
        const saved = localStorage.getItem('aiSites');
        aiSitesConfig = saved ? JSON.parse(saved) : DEFAULT_AI_SITES;
        renderAISites();
    }

    // Save AI sites to localStorage
    function saveAISites() {
        localStorage.setItem('aiSites', JSON.stringify(aiSitesConfig));
    }

    // Render AI sites in settings panel
    function renderAISites() {
        aiSitesList.innerHTML = '';
        const phName = state.lang === 'zh' ? '名稱 (如 ChatGPT)' : 'Name (e.g. ChatGPT)';
        const phUrl = state.lang === 'zh' ? '網址 (如 https://...)' : 'URL (e.g. https://...)';

        aiSitesConfig.forEach((site, index) => {
            const row = document.createElement('div');
            row.className = 'site-row';
            row.innerHTML = `
                <input type="text" placeholder="${phName}" value="${site.name || ''}" data-index="${index}" data-field="name">
                <input type="text" placeholder="${phUrl}" value="${site.url || ''}" data-index="${index}" data-field="url">
                <button class="btn-delete-site" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
            `;
            aiSitesList.appendChild(row);
        });
    }

    // Open settings modal
    function openSettings() {
        settingsModal.classList.add('active');
        sfx.playClick();
    }

    // Close settings modal
    function closeSettings() {
        settingsModal.classList.remove('active');
        sfx.playClick();
    }

    // Show site picker popup
    function showSitePicker(sites) {
        sitePickerList.innerHTML = '';
        sites.forEach(site => {
            const btn = document.createElement('button');
            btn.className = 'site-picker-btn';
            btn.textContent = site.name;
            btn.addEventListener('click', () => {
                window.open(site.url, '_blank');
                sitePicker.classList.remove('active');
                sfx.playSuccess();
            });
            sitePickerList.appendChild(btn);
        });

        // Position near copy button
        const copyBtn = document.getElementById('btn-copy');
        const rect = copyBtn.getBoundingClientRect();
        sitePicker.style.top = `${rect.bottom + 10}px`;
        sitePicker.style.left = `${rect.left}px`;
        sitePicker.classList.add('active');

        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', function closePicker(e) {
                if (!sitePicker.contains(e.target) && e.target !== copyBtn) {
                    sitePicker.classList.remove('active');
                    document.removeEventListener('click', closePicker);
                }
            });
        }, 100);
    }

    // Event Listeners for Settings
    btnSettings.addEventListener('click', openSettings);
    btnCloseSettings.addEventListener('click', closeSettings);
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) closeSettings();
    });

    btnAddSite.addEventListener('click', () => {
        if (aiSitesConfig.length >= 5) {
            alert('Maximum 5 AI websites allowed');
            return;
        }
        aiSitesConfig.push({ name: '', url: '' });
        renderAISites();
        sfx.playClick();
    });

    aiSitesList.addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT') {
            const index = parseInt(e.target.dataset.index);
            const field = e.target.dataset.field;
            aiSitesConfig[index][field] = e.target.value;
        }
    });

    aiSitesList.addEventListener('click', (e) => {
        if (e.target.closest('.btn-delete-site')) {
            const index = parseInt(e.target.closest('.btn-delete-site').dataset.index);
            aiSitesConfig.splice(index, 1);
            renderAISites();
            sfx.playDelete();
        }
    });

    btnSaveSettings.addEventListener('click', () => {
        // Filter out empty entries
        aiSitesConfig = aiSitesConfig.filter(site => site.name.trim() && site.url.trim());
        saveAISites();

        // Save Background Settings
        saveState();

        closeSettings();
        sfx.playSuccess();
    });

    // --- Conflict Detection Settings ---
    const conflictToggle = document.getElementById('setting-conflict-warnings');
    const conflictAutoLabel = document.getElementById('setting-conflict-auto-label');
    const conflictResetBtn = document.getElementById('setting-conflict-reset');

    if (conflictToggle) {
        conflictToggle.addEventListener('change', () => {
            state.conflictWarningsEnabled = conflictToggle.checked;
            saveState();
        });
    }

    if (conflictResetBtn) {
        conflictResetBtn.addEventListener('click', () => {
            state.conflictAutoResolution = null;
            state.conflictWarningsEnabled = true;
            if (conflictToggle) conflictToggle.checked = true;
            updateConflictSettingsUI();
            saveState();
            sfx.playClick();
        });
    }

    // --- Spell Mode Settings (咒語模式：阿拉伯文翻譯) ---
    const spellToggleBtn = document.getElementById('btn-spell-toggle');
    const spellSettingToggle = document.getElementById('setting-spell-mode');
    const spellEffectSelect = document.getElementById('setting-spell-effect');
    const spellEffectGroup = document.getElementById('spell-effect-group');
    const outputSection = document.querySelector('.output-section');

    // 翻譯快取，避免重複 API 呼叫
    const _spellCache = {};

    // 英文字母 → 阿拉伯字母映射
    const _arabicLetterMap = {
        'a': 'ا', 'b': 'ب', 'c': 'ث', 'd': 'د', 'e': 'ع', 'f': 'ف',
        'g': 'غ', 'h': 'ح', 'i': 'ي', 'j': 'ج', 'k': 'ك', 'l': 'ل',
        'm': 'م', 'n': 'ن', 'o': 'ه', 'p': 'ف', 'q': 'ق', 'r': 'ر',
        's': 'س', 't': 'ت', 'u': 'ع', 'v': 'ف', 'w': 'و', 'x': 'خ',
        'y': 'ي', 'z': 'ز'
    };
    // 阿拉伯數字
    const _arabicDigitMap = {
        '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
        '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩'
    };
    // 中日韓字元替換用的阿拉伯詞彙
    const _arabicWords = [
        'سحر', 'نور', 'قوة', 'روح', 'ظل', 'نار', 'ماء', 'ريح',
        'قمر', 'نجم', 'حلم', 'سيف', 'درع', 'تاج', 'عين', 'قلب',
        'بحر', 'جبل', 'غيم', 'فجر', 'ليل', 'شمس', 'ذهب', 'فضة'
    ];

    // 將殘留的非阿拉伯字元全部替換
    function purifyToArabic(text) {
        let result = '';
        let cjkIndex = 0;
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            const code = ch.charCodeAt(0);
            // 保留阿拉伯文字元 (U+0600–U+06FF, U+0750–U+077F, U+FB50–U+FDFF, U+FE70–U+FEFF)
            if ((code >= 0x0600 && code <= 0x06FF) || (code >= 0x0750 && code <= 0x077F) ||
                (code >= 0xFB50 && code <= 0xFDFF) || (code >= 0xFE70 && code <= 0xFEFF)) {
                result += ch;
            }
            // 保留換行和基本空白
            else if (ch === '\n' || ch === '\r') { result += ch; }
            else if (ch === ' ') { result += ' '; }
            // 英文字母 → 阿拉伯字母
            else if (/[a-zA-Z]/.test(ch)) {
                result += _arabicLetterMap[ch.toLowerCase()] || 'ع';
            }
            // 數字 → 阿拉伯數字
            else if (/[0-9]/.test(ch)) {
                result += _arabicDigitMap[ch] || ch;
            }
            // 中日韓字元 → 隨機阿拉伯詞彙
            else if (code >= 0x4E00 && code <= 0x9FFF) {
                result += _arabicWords[cjkIndex % _arabicWords.length];
                cjkIndex++;
            }
            // 標點符號替換
            else if (ch === ':' || ch === '：') { result += '؛'; }
            else if (ch === ',' || ch === '，') { result += '،'; }
            else if (ch === '.' || ch === '。') { result += '۔'; }
            else if (ch === '(' || ch === ')' || ch === '（' || ch === '）') { result += '﴾'; }
            else if (ch === '_') { result += 'ـ'; }
            // 其他保留
            else { result += ch; }
        }
        return result;
    }

    // 使用 MyMemory 免費翻譯 API (英文→阿拉伯文)
    async function translateToArabic(text) {
        if (!text || !text.trim()) return '';
        const cacheKey = text.trim().substring(0, 200); // 用前200字當 key
        if (_spellCache[cacheKey]) return _spellCache[cacheKey];

        try {
            // 限制長度以符合 API 限制 (500 chars per request)
            const chunks = [];
            const lines = text.split('\n');
            let currentChunk = '';
            for (const line of lines) {
                if ((currentChunk + '\n' + line).length > 450 && currentChunk) {
                    chunks.push(currentChunk.trim());
                    currentChunk = line;
                } else {
                    currentChunk += (currentChunk ? '\n' : '') + line;
                }
            }
            if (currentChunk.trim()) chunks.push(currentChunk.trim());

            const translated = [];
            for (const chunk of chunks) {
                const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|ar`;
                const resp = await fetch(url);
                const data = await resp.json();
                if (data.responseStatus === 200 && data.responseData) {
                    translated.push(data.responseData.translatedText);
                } else {
                    translated.push(chunk); // fallback: 保留原文
                }
            }
            const result = translated.join('\n');
            // 後處理：確保所有文字都是阿拉伯文
            const purified = purifyToArabic(result);
            _spellCache[cacheKey] = purified;
            return purified;
        } catch (e) {
            console.warn('[Spell Mode] 翻譯失敗，使用純映射:', e.message);
            // 離線回退：直接用字元映射
            return purifyToArabic(text);
        }
    }

    function applySpellMode(enabled) {
        state.spellMode = enabled;
        if (outputSection) {
            outputSection.classList.toggle('spell-mode', enabled);
        }
        if (spellToggleBtn) {
            spellToggleBtn.classList.toggle('active', enabled);
        }
        if (spellSettingToggle) {
            spellSettingToggle.checked = enabled;
        }
        // 顯示/隱藏效果樣式下拉選單
        if (spellEffectGroup) {
            spellEffectGroup.classList.toggle('setting-group--hidden', !enabled);
        }

        // 更新 prompt 顯示 (async)
        renderSpellText();
        saveState();
    }

    // 咒語動畫計時器（用於清除上一次動畫）
    let _spellAnimTimers = [];
    function _clearSpellAnim() {
        _spellAnimTimers.forEach(t => clearTimeout(t));
        _spellAnimTimers.length = 0;
    }

    // 取得當前要使用的效果（支援 random）
    function _getSpellEffect() {
        if (state.spellEffect === 'random') {
            const effects = ['A', 'B', 'C', 'D'];
            return effects[Math.floor(Math.random() * effects.length)];
        }
        return state.spellEffect || 'D';
    }

    // === 方案 A：逐字顯示 ===
    function spellAnimA(arabicText) {
        const BASE_SPEED = 40;
        outputFinal.textContent = '';
        outputFinal.style.fontSize = '';
        outputSection.classList.add('spell-glow-active');

        const chars = [...arabicText];
        let i = 0;
        function tick() {
            if (!state.spellMode || i >= chars.length) return;
            outputFinal.textContent += chars[i++];
            _spellAnimTimers.push(setTimeout(tick, BASE_SPEED));
        }
        tick();

        const scrollInterval = setInterval(() => {
            if (!state.spellMode || i >= chars.length) { clearInterval(scrollInterval); return; }
            outputFinal.scrollTop = outputFinal.scrollHeight;
        }, 200);
    }

    // === 方案 B：逐詞顯示 ===
    function spellAnimB(arabicText) {
        const BASE_SPEED = 40;
        outputFinal.textContent = '';
        outputFinal.style.fontSize = '';
        outputSection.classList.add('spell-glow-active');

        const tokens = arabicText.split(/(\s+)/);
        let i = 0;
        function tick() {
            if (!state.spellMode || i >= tokens.length) return;
            outputFinal.textContent += tokens[i];
            const delay = tokens[i].trim() === '' ? 0 : BASE_SPEED;
            i++;
            _spellAnimTimers.push(setTimeout(tick, delay));
        }
        tick();

        const scrollInterval = setInterval(() => {
            if (!state.spellMode || i >= tokens.length) { clearInterval(scrollInterval); return; }
            outputFinal.scrollTop = outputFinal.scrollHeight;
        }, 200);
    }

    // === 方案 C：逐行揭開 ===
    function spellAnimC(arabicText) {
        const BASE_SPEED = 40;
        outputFinal.innerHTML = '';
        outputFinal.style.fontSize = '';
        outputSection.classList.add('spell-glow-active');

        const lines = arabicText.split('\n');
        const transMs = Math.max(BASE_SPEED * 10, 400);

        lines.forEach((line, idx) => {
            const d = document.createElement('div');
            d.className = 'spell-line';
            d.textContent = line;
            d.style.transition = `opacity ${transMs}ms ease, transform ${transMs}ms ease`;
            outputFinal.appendChild(d);
            _spellAnimTimers.push(setTimeout(() => {
                if (!state.spellMode) return;
                d.classList.add('revealed');
            }, idx * BASE_SPEED * 14));
        });

        const scrollInterval = setInterval(() => {
            if (!state.spellMode) { clearInterval(scrollInterval); return; }
            outputFinal.scrollTop = outputFinal.scrollHeight;
        }, 200);
        _spellAnimTimers.push(setTimeout(() => clearInterval(scrollInterval), lines.length * BASE_SPEED * 14 + transMs + 500));
    }

    // === 方案 D：縮放逐詞動畫 ===
    function spellAnimD(arabicText) {
        const START_SIZE = 4;
        const MIN_SIZE = 0.8;
        const BASE_SPEED = 40;
        const SLOW_MULT = 2.5;
        const FAST_MULT = 0.3;

        const lines = arabicText.split('\n');
        const allSteps = [];
        lines.forEach((line, li) => {
            if (li > 0) allSteps.push({ text: '\n', isWord: false, isNewLine: true });
            line.split(/(\s+)/).forEach(t => {
                allSteps.push({ text: t, isWord: t.trim() !== '', isNewLine: false });
            });
        });

        outputFinal.textContent = '';
        outputFinal.style.fontSize = START_SIZE + 'rem';
        outputSection.classList.add('spell-glow-active');

        let i = 0;
        let lineWordCount = 0;

        function tick() {
            if (!state.spellMode) return;
            if (i >= allSteps.length) {
                outputFinal.style.fontSize = MIN_SIZE + 'rem';
                return;
            }
            const step = allSteps[i];

            if (step.isNewLine) {
                lineWordCount = 0;
                outputFinal.textContent += step.text;
                outputFinal.style.fontSize = START_SIZE + 'rem';
                i++;
                _spellAnimTimers.push(setTimeout(tick, 50));
                return;
            }

            outputFinal.textContent += step.text;

            if (step.isWord) {
                lineWordCount++;
                outputFinal.style.fontSize = Math.max(START_SIZE / lineWordCount, MIN_SIZE) + 'rem';
                const delay = Math.round(BASE_SPEED * Math.max(SLOW_MULT / lineWordCount, FAST_MULT));
                i++;
                _spellAnimTimers.push(setTimeout(tick, delay));
            } else {
                i++;
                _spellAnimTimers.push(setTimeout(tick, 0));
            }
        }
        tick();

        const scrollInterval = setInterval(() => {
            if (!state.spellMode || i >= allSteps.length) { clearInterval(scrollInterval); return; }
            outputFinal.scrollTop = outputFinal.scrollHeight;
        }, 200);
    }

    async function renderSpellText() {
        const plainText = outputFinal.dataset.plainText || '';
        if (state.spellMode && plainText) {
            _clearSpellAnim();

            // 設定 RTL + 居中
            outputFinal.style.direction = 'rtl';
            outputFinal.style.textAlign = 'center';
            outputFinal.style.transition = 'font-size 0.3s ease-out';

            // 顯示翻譯中提示
            outputFinal.textContent = '✨ جارٍ ترجمة التعويذة...';
            outputFinal.style.fontSize = '';

            const arabicText = await translateToArabic(plainText);
            if (!state.spellMode) return; // 使用者可能已切回

            // 依據設定選擇動畫方案
            const effect = _getSpellEffect();
            switch (effect) {
                case 'A': spellAnimA(arabicText); break;
                case 'B': spellAnimB(arabicText); break;
                case 'C': spellAnimC(arabicText); break;
                case 'D': default: spellAnimD(arabicText); break;
            }

        } else if (plainText) {
            _clearSpellAnim();
            outputSection.classList.remove('spell-glow-active');
            outputFinal.style.direction = '';
            outputFinal.style.textAlign = '';
            outputFinal.style.fontSize = '';
            outputFinal.style.transition = '';
            if (state.format === 'yaml') {
                outputFinal.innerHTML = applySyntaxHighlighting(plainText);
            } else {
                outputFinal.textContent = plainText;
            }
        }

        // 負面提示詞（直接顯示翻譯，不做動畫）
        const negEl = outputNegative;
        if (negEl) {
            if (state.spellMode && negEl.value) {
                if (!negEl.dataset.plainText) negEl.dataset.plainText = negEl.value;
                const negArabic = await translateToArabic(negEl.dataset.plainText);
                if (state.spellMode) {
                    negEl.value = negArabic;
                    negEl.style.direction = 'rtl';
                    negEl.style.textAlign = 'center';
                }
            } else if (negEl.dataset.plainText) {
                negEl.value = negEl.dataset.plainText;
                negEl.style.direction = '';
                negEl.style.textAlign = '';
            }
        }
    }

    // 標題列的 toggle 按鈕
    if (spellToggleBtn) {
        spellToggleBtn.addEventListener('click', () => {
            applySpellMode(!state.spellMode);
            try { sfx.playClick(); } catch (e) { }
        });
    }

    // 設定面板的 toggle switch
    if (spellSettingToggle) {
        spellSettingToggle.addEventListener('change', () => {
            applySpellMode(spellSettingToggle.checked);
        });
    }

    // 設定面板的效果樣式下拉選單
    if (spellEffectSelect) {
        spellEffectSelect.value = state.spellEffect || 'D';
        spellEffectSelect.addEventListener('change', () => {
            state.spellEffect = spellEffectSelect.value;
            saveState();
            // 如果咒語模式啟用中，重新播放動畫
            if (state.spellMode) {
                renderSpellText();
            }
        });
    }

    // 初始化咒語模式狀態
    applySpellMode(state.spellMode);

    function updateConflictSettingsUI() {
        if (conflictToggle) conflictToggle.checked = state.conflictWarningsEnabled;
        if (conflictAutoLabel) {
            const modeMap = { 'ignore': '忽略（繼續生成）', 'dual': '雙角色模式', 'merge': '融合模式' };
            conflictAutoLabel.textContent = state.conflictAutoResolution
                ? modeMap[state.conflictAutoResolution] || state.conflictAutoResolution
                : '未設定（每次詢問）';
        }
    }

    // --- Body Magic Settings ---
    const bodyMagicStatus = document.getElementById('setting-bodymagic-status');
    const bodyMagicResetBtn = document.getElementById('setting-bodymagic-reset');

    if (bodyMagicResetBtn) {
        bodyMagicResetBtn.addEventListener('click', () => {
            state.bodyAdvanced = null;
            renderTabContent();
            generatePrompt();
            saveState();
            updateBodyMagicSettingsUI();
            sfx.playClick();
        });
    }

    function updateBodyMagicSettingsUI() {
        if (bodyMagicStatus) {
            if (state.bodyAdvanced) {
                const primaryData = state.gender === 'female' ? BODY_MAGIC_DATA.FEMALE_BUST : BODY_MAGIC_DATA.MALE_MUSCLE;
                const pInfo = primaryData[state.bodyAdvanced.primary || 4];
                bodyMagicStatus.textContent = `已套用 — ${pInfo ? pInfo.label : '自訂'}`;
                bodyMagicStatus.className = 'hint-text status-active';
            } else {
                bodyMagicStatus.textContent = '目前未套用';
                bodyMagicStatus.className = 'hint-text status-inactive';
            }
        }
    }

    // Sync settings UI when settings modal opens
    const origOpenSettings = openSettings;
    openSettings = function () {
        updateConflictSettingsUI();
        updateBodyMagicSettingsUI();
        origOpenSettings();
    };
    btnSettings.removeEventListener('click', origOpenSettings);
    btnSettings.addEventListener('click', openSettings);

    // ========================================
    // Custom Background Logic (v4.7)
    // ========================================
    const bgUrlInput = document.getElementById('bg-url-input');
    const bgOpacitySlider = document.getElementById('bg-opacity-slider');
    const bgBlurSlider = document.getElementById('bg-blur-slider');
    const opacityValueDisplay = document.getElementById('opacity-value');
    const blurValueDisplay = document.getElementById('blur-value');
    const customBg = document.querySelector('.custom-bg');
    const btnUploadBg = document.getElementById('btn-upload-bg');
    const bgFileInput = document.getElementById('bg-file-input');

    function updateBackground() {
        if (!state.background) return;

        // Update CSS
        if (state.background.url) {
            customBg.style.backgroundImage = `url('${state.background.url}')`;
        }
        customBg.style.opacity = state.background.opacity / 100;
        customBg.style.filter = `blur(${state.background.blur}px) grayscale(30%)`;

        // Update Text Displays (Always update these for real-time feedback)
        opacityValueDisplay.textContent = `${state.background.opacity}%`;
        blurValueDisplay.textContent = `${state.background.blur}px`;

        // Update Input Values (Only if NOT active to avoid cursor fighting)
        if (document.activeElement !== bgUrlInput) {
            bgUrlInput.value = state.background.url || '';
        }
        if (document.activeElement !== bgOpacitySlider) {
            bgOpacitySlider.value = state.background.opacity;
        }
        if (document.activeElement !== bgBlurSlider) {
            bgBlurSlider.value = state.background.blur;
        }
    }

    // Event Listeners for Background Settings
    bgUrlInput.addEventListener('input', (e) => {
        state.background.url = e.target.value;
        updateBackground();
    });

    btnUploadBg.addEventListener('click', () => {
        bgFileInput.click();
        sfx.playClick();
    });

    bgFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target.result;
                // Check size limit (approx 3MB safety net for localStorage)
                if (base64.length > 3 * 1024 * 1024) {
                    alert("Image is too large to save! It will work for this session but won't be saved.");
                }
                state.background.url = base64;
                updateBackground();
                sfx.playSuccess();
            };
            reader.readAsDataURL(file);
        }
    });

    bgOpacitySlider.addEventListener('input', (e) => {
        state.background.opacity = e.target.value;
        updateBackground();
    });

    bgBlurSlider.addEventListener('input', (e) => {
        state.background.blur = e.target.value;
        updateBackground();
    });

    // Volume Slider Logic
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValueDisplay = document.getElementById('volume-value');

    // Set initial value from sfx instance
    volumeSlider.value = sfx.volume;
    volumeValueDisplay.textContent = `${sfx.volume}%`;

    volumeSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        sfx.setVolume(val);
        volumeValueDisplay.textContent = `${val}%`;
    });

    // Play test sound when slider is released (change event)
    volumeSlider.addEventListener('change', () => {
        sfx.playClick();
    });

    // Paste to Upload (Ctrl+V)
    bgUrlInput.addEventListener('paste', (e) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (let index in items) {
            const item = items[index];
            if (item.kind === 'file' && item.type.includes('image/')) {
                const blob = item.getAsFile();
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64 = event.target.result;
                    // Check size limit (approx 3MB safety net for localStorage)
                    if (base64.length > 3 * 1024 * 1024) {
                        alert("Image is too large to save! It will work for this session but won't be saved.");
                    }
                    state.background.url = base64;
                    updateBackground();
                    sfx.playSuccess();
                };
                reader.readAsDataURL(blob);
                e.preventDefault(); // Prevent pasting the filename
            }
        }
    });

    // Global Paste Listener (When settings modal is open)
    document.addEventListener('paste', (e) => {
        if (!settingsModal.classList.contains('active')) return;
        // If focus is already on input, let the input handler deal with it
        if (document.activeElement === bgUrlInput) return;

        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (let index in items) {
            const item = items[index];
            if (item.kind === 'file' && item.type.includes('image/')) {
                const blob = item.getAsFile();
                const reader = new FileReader();
                reader.onload = (event) => {
                    state.background.url = event.target.result;
                    updateBackground();
                    sfx.playSuccess();
                };
                reader.readAsDataURL(blob);
            }
        }
    });

    // Initialize
    loadAISites();
    // Ensure background state exists
    if (!state.background) {
        state.background = {
            url: 'assets/background_v2.jpg',
            opacity: 20,
            blur: 2
        };
    }
    updateBackground();

    // Lock layout width after initial render to prevent content-driven expansion
    requestAnimationFrame(() => {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.maxWidth = mainContent.offsetWidth + 'px';
        }
    });

});
