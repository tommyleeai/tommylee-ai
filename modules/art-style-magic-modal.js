// ============================================================
// art-style-magic-modal.js — 藝術風格 Magic Modal (薄包裝)
// 使用 MagicModalBase 共用邏輯
// CSS 前綴: smm-（共用 style-magic-modal.css）
// ============================================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.ArtStyleMagicModal = (function () {
    let state, sfx, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function openArtStyleMagicModal() {
        window.PromptGen.MagicModalBase.createModal({
            prefix: 'smm',
            modalId: 'arsmm-modal',
            title: '🎨 高級魔法・藝術風格大全',
            searchPlaceholder: '搜尋藝術風格 Search art style...',
            itemLabel: '藝術風格',
            stateKey: 'artStyle',
            advancedKey: 'artStyleAdvanced',
            recentKey: 'arsmm_recent',
            chipClass: 'smm-chip',
            magicCircleText: '✦ ART ✦',
            emptyText: '🔍 沒有找到符合的藝術風格',
            applyText: '✨ 套用魔法',
            hasBonus: false,
            hasIcon: false,
            catField: 'category',
            idField: 'id',
            particleCount: 35,
            meteorCount: 3,
            getData: () => window.PromptGen.ArtStyleMagicData || {},
            restoreSelection: (items, st) => {
                if (!st.artStyleAdvanced) return null;
                const found = items.find(i => i.value === st.artStyleAdvanced.selectedValue);
                return found ? { selectedItem: found } : null;
            },
            onApply: (selectedItem, selectedBonuses, closeModal) => {
                if (selectedItem) {
                    window.PromptGen.MagicModalBase.addRecent('arsmm_recent', selectedItem.id);
                    selectOption('artStyle', selectedItem.value, { label: selectedItem.label, en: selectedItem.en, value: selectedItem.value });
                    state.artStyleAdvanced = {
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

    return { setup, openArtStyleMagicModal };
})();
