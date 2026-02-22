// ============================================
// AI Prompt Generator — Scene Magic Modal (薄包裝)
// 使用 MagicModalBase 共用邏輯
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.SceneMagicModal = (function () {
    let state, sfx, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function openSceneMagicModal() {
        const Base = window.PromptGen.MagicModalBase;
        Base.createModal({
            prefix: 'scmm',
            modalId: 'scene-magic-modal',
            title: '🌍 高級魔法・場景大全',
            searchPlaceholder: '搜尋場景 Search scene...',
            itemLabel: '場景',
            stateKey: 'scene',
            advancedKey: 'sceneAdvanced',
            recentKey: 'scmm_recent_scenes',
            recentMax: 15,
            chipClass: 'scmm-scene-chip',
            magicCircleText: '✦ SCENE ✦',
            bonusTitle: '⭐ 點選增加環境特徵 —',
            emptyText: '🔍 沒有找到符合的場景',
            hasBonus: true,
            hasClearBtn: true,
            catField: 'category',
            idField: 'id',
            particleColors: ['#22d3ee', '#a855f7', '#7c3aed', '#06b6d4', '#c084fc', '#fff', '#e879f9'],
            getData: () => window.PromptGen.SceneMagicData,
            restoreSelection: (items, st) => {
                if (!st.sceneAdvanced) return null;
                const prev = st.sceneAdvanced;
                const selectedItem = items.find(s => s.id === prev.selectedScene?.id) || null;
                const selectedBonuses = new Map();
                if (prev.bonusTraits && prev.bonusTraitsZh) {
                    prev.bonusTraits.forEach((en, i) => {
                        selectedBonuses.set(en, prev.bonusTraitsZh[i] || en);
                    });
                }
                return { selectedItem, selectedBonuses };
            },
            onApply: (selectedScene, selectedBonuses, closeModal) => {
                if (selectedScene) {
                    Base.addRecent('scmm_recent_scenes', selectedScene.id, 15);
                    selectOption('scene', selectedScene.value, { label: selectedScene.label, en: selectedScene.en, value: selectedScene.value });
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
                    delete state.sceneAdvanced;
                    generatePrompt();
                    saveState();
                    renderTabContent();
                }
                closeModal();
            },
            deps: { state, sfx, selectOption, generatePrompt, saveState, renderTabContent }
        });
    }

    return { setup, openSceneMagicModal };
})();
