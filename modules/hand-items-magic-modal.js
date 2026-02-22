// ============================================
// AI Prompt Generator — Hand Items Magic Modal (薄包裝)
// 使用 MagicModalBase 共用邏輯
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.HandItemsMagicModal = (function () {
    let state, sfx, HAND_ITEMS_RAW, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        HAND_ITEMS_RAW = deps.HAND_ITEMS;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function openHandItemsMagicModal() {
        window.PromptGen.MagicModalBase.createModal({
            prefix: 'him',
            modalId: 'hand-items-magic-modal',
            title: '🔮 高級魔法・手持物件大全',
            searchPlaceholder: '搜尋手持物件 Search hand item...',
            itemLabel: '手持物件',
            stateKey: 'handItems',
            advancedKey: 'handItemsAdvanced',
            recentKey: 'him_recent_items',
            chipClass: 'him-race-chip',
            magicCircleText: '✦ ITEMS ✦',
            bonusTitle: '⭐ 點選增加手持特徵 —',
            emptyText: '🔍 沒有找到符合的手持物件',
            hasBonus: true,
            catField: 'cat',
            idField: 'en',
            getData: () => window.PromptGen.HandItemsMagicData,
            deps: { state, sfx, selectOption, generatePrompt, saveState, renderTabContent, rawData: HAND_ITEMS_RAW }
        });
    }

    return { setup, openHandItemsMagicModal };
})();
