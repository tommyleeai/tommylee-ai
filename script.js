document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---

    // ============================================
    // v6.1 模組化匯入 — 從 window.PromptGen 讀取
    // ============================================
    const Data = window.PromptGen.Data;
    const {
        TABS, RACES, JOBS, CONFLICT_RULES, HAIRSTYLES_FEMALE, HAIRSTYLES_MALE,
        HAIR_COLORS, EYE_COLORS, OUTFITS, HEADWEAR, EXPRESSIONS, MOODS,
        ANIME_STYLES, ART_STYLES, ARTISTS, QUALITY_TAGS,
        SCENES, WEATHER, LIGHTING, CAMERA_ANGLES,
        SHOT_SIZES, FOCAL_LENGTHS, APERTURES, LENS_EFFECTS,
        AGE_DESCRIPTORS, BODY_TYPES_FEMALE, BODY_TYPES_MALE,
        TAB_SECTIONS, getAgeDescriptor
    } = Data;
    const BODY_MAGIC_DATA = window.PromptGen.BodyMagicData;
    const HAIR_MAGIC_DATA = window.PromptGen.HairMagicData;
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
        heterochromia: false // v6.9 異色瞳模式
    };

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
                state.ageEnabled = parsed.ageEnabled !== false;

                // Conflict system state restoration
                state.conflictWarningsEnabled = parsed.conflictWarningsEnabled !== false;
                state.conflictAutoResolution = parsed.conflictAutoResolution || null;
                state.conflictResolution = null; // Always reset on load
                state.conflictInfo = null;
                state.conflictWarningCount = parsed.conflictWarningCount || 0;

                inputSubject.value = parsed.inputSubject || '做一張全新的圖';

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
                        state.gender = g;
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

                // 渲染分頁 grid
                renderPaginatedRaceGrid(sectionEl, section, RACES);
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

                // 渲染分頁 grid（獨立 jobPage）
                renderPaginatedGrid(sectionEl, section, JOBS, 'jobPage');
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

                // 渲染分頁 grid
                renderPaginatedGrid(sectionEl, section, OUTFITS, 'outfitPage');
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

                // 渲染分頁 grid
                renderPaginatedGrid(sectionEl, section, HEADWEAR, 'headwearPage');
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

        data.forEach(option => {
            const chip = document.createElement('div');
            chip.className = `tag-chip${state.selections[section.id] === option.value ? ' active' : ''}`;
            chip.dataset.section = section.id;
            chip.dataset.value = option.value;
            if (option.image) chip.dataset.image = option.image;
            chip.textContent = getOptionLabel(option);

            chip.addEventListener('click', () => {
                selectOption(section.id, option.value, option);
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

        if (inputSubject.value.trim()) parts.push(inputSubject.value.trim());
        // Gender
        parts.push(state.gender === 'female' ? 'female' : 'male');


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
            'outfit', 'headwear', 'expression', 'mood', 'animeStyle', 'artStyle', 'artist', 'quality',
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
            const val = state.selections[secId];
            if (val) {
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
                parts.push(val);
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
        });

        // Quality tags
        if (state.highQuality) {
            const hasQuality = state.selections['quality'];
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

        yaml += `gender: ${state.gender === 'female' ? 'female' : 'male'}\n`;

        if (inputSubject.value.trim()) yaml += `subject: ${inputSubject.value.trim()}\n`;

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
            'headwear': 'headwear',
            'expression': 'expression', 'mood': 'mood', 'animeStyle': 'anime_style',
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
            const parts = [];
            if (state.selections[secId]) parts.push(state.selections[secId]);
            if (state.customInputs[secId]) parts.push(state.customInputs[secId]);
            // Hair Magic prompts (append to hairstyle)
            if (secId === 'hairstyle' && state.hairMagicPrompts && state.hairMagicPrompts.positive && state.hairMagicPrompts.positive.length > 0) {
                state.hairMagicPrompts.positive.forEach(tag => parts.push(tag));
            }
            if (parts.length > 0) {
                yaml += `${yamlMap[secId]}: ${parts.join(', ')}\n`;
            }
        });

        if (state.highQuality && !state.selections['quality']) {
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

        saveState();
    }

    // --- Preview Logic ---
    function showPreview(imageSrc, labelText) {
        if (imageSrc) {
            previewImageBox.style.backgroundImage = `url('${imageSrc}')`;
            previewLabel.textContent = labelText;
            previewPlaceholder.style.display = 'none';
            previewContent.style.display = 'block';
        }
    }

    function hidePreview() {
        previewPlaceholder.style.display = 'flex';
        previewContent.style.display = 'none';
        previewImageBox.style.backgroundImage = 'none';
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
    window.PromptGen.ConflictSystem.setup({
        state, sfx, CONFLICT_RULES, generatePrompt, saveState, selectOption,
        RACES, JOBS, OUTFITS, BODY_TYPES_FEMALE, BODY_TYPES_MALE,
        HAIRSTYLES_FEMALE, HAIRSTYLES_MALE
    });




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

    // Initialize
    loadState();
    renderTabs();
    renderTabContent();
    updateStaticText();
    renderCustomFields();
    generatePrompt();

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
                bodyMagicStatus.style.color = '#22c55e';
            } else {
                bodyMagicStatus.textContent = '目前未套用';
                bodyMagicStatus.style.color = '#a855f7';
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
