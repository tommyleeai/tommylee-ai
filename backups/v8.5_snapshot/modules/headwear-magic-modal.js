// ============================================
// AI Prompt Generator — Headwear Magic Modal (薄包裝)
// 使用 MagicModalBase 共用邏輯
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.HeadwearMagicModal = (function () {
    let state, sfx, HEADWEAR_RAW, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        HEADWEAR_RAW = deps.HEADWEAR;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function openHeadwearMagicModal() {
        window.PromptGen.MagicModalBase.createModal({
            prefix: 'hmm',
            modalId: 'headwear-magic-modal',
            title: '🔮 高級魔法・頭飾大全',
            searchPlaceholder: '搜尋頭飾 Search headwear...',
            itemLabel: '頭飾',
            stateKey: 'headwear',
            advancedKey: 'headwearAdvanced',
            recentKey: 'hmm_recent_headwear',
            chipClass: 'hmm-race-chip',
            magicCircleText: '✦ HEADWEAR ✦',
            bonusTitle: '⭐ 點選增加頭飾特徵 —',
            emptyText: '🔍 沒有找到符合的頭飾',
            hasBonus: true,
            catField: 'cat',
            idField: 'en',
            getData: () => window.PromptGen.HeadwearMagicData,
            deps: { state, sfx, selectOption, generatePrompt, saveState, renderTabContent, rawData: HEADWEAR_RAW }
        });
    }

    return { setup, openHeadwearMagicModal };
})();
