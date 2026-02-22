// ============================================
// AI Prompt Generator — Camera Magic Modal (薄包裝)
// 使用 MagicModalBase 共用邏輯
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.CameraMagicModal = (function () {
    let state, sfx, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function openCameraMagicModal() {
        const Base = window.PromptGen.MagicModalBase;
        Base.createModal({
            prefix: 'cmmm',
            modalId: 'camera-magic-modal',
            title: '📸 高級魔法・運鏡大全',
            searchPlaceholder: '搜尋運鏡 Search camera work...',
            itemLabel: '運鏡',
            stateKey: 'cameraAngle',
            advancedKey: 'cameraAdvanced',
            recentKey: 'cmmm_recent_cameras',
            recentMax: 15,
            chipClass: 'cmmm-camera-chip',
            magicCircleText: '✦ CAMERA ✦ MAGIC ✦ LENS ✦ ANGLE ✦',
            bonusTitle: '⭐ 點選增加運鏡特徵 —',
            emptyText: '🔍 沒有找到符合的運鏡',
            hasBonus: true,
            hasClearBtn: true,
            catField: 'category',
            idField: 'id',
            particleColors: ['#22d3ee', '#a855f7', '#7c3aed', '#06b6d4', '#c084fc', '#fff', '#ec4899'],
            getData: () => window.PromptGen.CameraMagicData,
            restoreSelection: (items, st) => {
                if (!st.cameraAdvanced) return null;
                const prev = st.cameraAdvanced;
                const selectedItem = items.find(s => s.id === prev.selectedCamera?.id) || null;
                const selectedBonuses = new Map();
                if (prev.bonusTraits && prev.bonusTraitsZh) {
                    prev.bonusTraits.forEach((en, i) => {
                        selectedBonuses.set(en, prev.bonusTraitsZh[i] || en);
                    });
                }
                return { selectedItem, selectedBonuses };
            },
            onApply: (selectedCamera, selectedBonuses, closeModal) => {
                if (selectedCamera) {
                    Base.addRecent('cmmm_recent_cameras', selectedCamera.id, 15);
                    selectOption('cameraAngle', selectedCamera.value, { label: selectedCamera.label, en: selectedCamera.en, value: selectedCamera.value });
                    const bonusEn = [...selectedBonuses.keys()];
                    const bonusZh = [...selectedBonuses.values()];
                    state.cameraAdvanced = {
                        selectedCamera: { id: selectedCamera.id, label: selectedCamera.label, en: selectedCamera.en, value: selectedCamera.value },
                        bonusTraits: bonusEn,
                        bonusTraitsZh: bonusZh
                    };
                    // 清除被覆蓋的 sub-section 選取
                    ['shotSize', 'focalLength', 'aperture', 'lensEffect'].forEach(k => delete state.selections[k]);
                    generatePrompt();
                    saveState();
                    renderTabContent();
                } else {
                    delete state.cameraAdvanced;
                    generatePrompt();
                    saveState();
                    renderTabContent();
                }
                closeModal();
            },
            deps: { state, sfx, selectOption, generatePrompt, saveState, renderTabContent }
        });

        // 🎮 Konami Code → Super Modal 升級
        const Konami = window.PromptGen.KonamiSuperModal;
        const SuperModal = window.PromptGen.CameraSuperModal;
        if (Konami && SuperModal) {
            const overlayEl = document.getElementById('camera-magic-modal');
            if (overlayEl) {
                Konami.attach(overlayEl, () => {
                    SuperModal.open();
                });
            }
        }
    }

    return { setup, openCameraMagicModal };
})();
