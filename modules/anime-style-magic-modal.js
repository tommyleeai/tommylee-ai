// ============================================================
// anime-style-magic-modal.js — 動漫風格 Magic Modal (薄包裝)
// 使用 MagicModalBase 共用邏輯
// CSS 前綴: smm-（共用 style-magic-modal.css）
// ============================================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.AnimeStyleMagicModal = (function () {
    let state, sfx, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function openAnimeStyleMagicModal() {
        window.PromptGen.MagicModalBase.createModal({
            prefix: 'smm',
            modalId: 'asmm-modal',
            title: '🎌 高級魔法・動漫風格大全',
            searchPlaceholder: '搜尋動漫風格 Search anime style...',
            itemLabel: '動漫風格',
            stateKey: 'animeStyle',
            advancedKey: 'animeStyleAdvanced',
            recentKey: 'asmm_recent',
            chipClass: 'smm-chip',
            magicCircleText: '✦ STYLE ✦',
            emptyText: '🔍 沒有找到符合的動漫風格',
            applyText: '✨ 套用魔法',
            hasBonus: false,
            hasIcon: false,
            catField: 'category',
            idField: 'id',
            particleCount: 35,
            meteorCount: 3,
            getData: () => window.PromptGen.AnimeStyleMagicData || {},
            restoreSelection: (items, st) => {
                if (!st.animeStyleAdvanced) return null;
                const found = items.find(i => i.value === st.animeStyleAdvanced.selectedValue);
                return found ? { selectedItem: found } : null;
            },
            onApply: (selectedItem, selectedBonuses, closeModal) => {
                if (selectedItem) {
                    window.PromptGen.MagicModalBase.addRecent('asmm_recent', selectedItem.id);
                    selectOption('animeStyle', selectedItem.value, { label: selectedItem.label, en: selectedItem.en, value: selectedItem.value });
                    state.animeStyleAdvanced = {
                        selectedLabel: selectedItem.label,
                        selectedEn: selectedItem.en,
                        selectedValue: selectedItem.value
                    };
                    generatePrompt();
                    saveState();
                    renderTabContent();
                }
                closeModal();
            },
            deps: { state, sfx, selectOption, generatePrompt, saveState, renderTabContent }
        });
    }

    return { setup, openAnimeStyleMagicModal };
})();
