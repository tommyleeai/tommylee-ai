// ============================================
// AI Prompt Generator — Outfit Magic Modal (薄包裝)
// 使用 MagicModalBase 共用邏輯
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.OutfitMagicModal = (function () {
    let state, sfx, OUTFITS_RAW, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        OUTFITS_RAW = deps.OUTFITS;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function openOutfitMagicModal() {
        window.PromptGen.MagicModalBase.createModal({
            prefix: 'cmm',
            modalId: 'outfit-magic-modal',
            title: '🔮 高級魔法・服裝大全',
            searchPlaceholder: '搜尋服裝 Search outfit...',
            itemLabel: '服裝',
            stateKey: 'outfit',
            advancedKey: 'outfitAdvanced',
            recentKey: 'cmm_recent_outfits',
            chipClass: 'cmm-race-chip',
            magicCircleText: '✦ OUTFIT ✦',
            bonusTitle: '⭐ 點選增加穿搭特徵 —',
            emptyText: '🔍 沒有找到符合的服裝',
            hasBonus: true,
            catField: 'cat',
            idField: 'en',
            getData: () => window.PromptGen.OutfitMagicData,
            deps: { state, sfx, selectOption, generatePrompt, saveState, renderTabContent, rawData: OUTFITS_RAW }
        });
    }

    return { setup, openOutfitMagicModal };
})();
