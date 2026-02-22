// ============================================================
// artist-magic-modal.js — 藝術家 Magic Modal (薄包裝)
// 使用 MagicModalBase 共用邏輯
// CSS 前綴: smm-（共用 style-magic-modal.css）
// ============================================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.ArtistMagicModal = (function () {
    let state, sfx, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function openArtistMagicModal() {
        window.PromptGen.MagicModalBase.createModal({
            prefix: 'smm',
            modalId: 'atmm-artist-modal',
            title: '🖌️ 高級魔法・藝術家大全',
            searchPlaceholder: '搜尋藝術家 Search artist...',
            itemLabel: '藝術家',
            stateKey: 'artist',
            advancedKey: 'artistAdvanced',
            recentKey: 'atmm_recent',
            chipClass: 'smm-chip',
            magicCircleText: '✦ ARTIST ✦',
            emptyText: '🔍 沒有找到符合的藝術家',
            applyText: '✨ 套用魔法',
            hasBonus: false,
            hasIcon: false,
            catField: 'category',
            idField: 'id',
            particleCount: 35,
            meteorCount: 3,
            getData: () => window.PromptGen.ArtistMagicData || {},
            restoreSelection: (items, st) => {
                if (!st.artistAdvanced) return null;
                const found = items.find(i => i.value === st.artistAdvanced.selectedValue);
                return found ? { selectedItem: found } : null;
            },
            onApply: (selectedItem, selectedBonuses, closeModal) => {
                if (selectedItem) {
                    window.PromptGen.MagicModalBase.addRecent('atmm_recent', selectedItem.id);
                    selectOption('artist', selectedItem.value, { label: selectedItem.label, en: selectedItem.en, value: selectedItem.value });
                    state.artistAdvanced = {
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

    return { setup, openArtistMagicModal };
})();
