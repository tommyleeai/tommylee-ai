// ============================================
// AI Prompt Generator — Race Magic Modal (薄包裝)
// 使用 MagicModalBase 共用邏輯
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.RaceMagicModal = (function () {
    let state, sfx, RACES_RAW, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        RACES_RAW = deps.RACES;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function openRaceMagicModal() {
        window.PromptGen.MagicModalBase.createModal({
            prefix: 'rmm',
            modalId: 'race-magic-modal',
            title: '🔮 高級魔法・種族大全',
            searchPlaceholder: '搜尋種族 Search race...',
            itemLabel: '種族',
            stateKey: 'race',
            advancedKey: 'raceAdvanced',
            recentKey: 'rmm_recent_races',
            chipClass: 'rmm-race-chip',
            magicCircleText: '✦ MAGIC ✦',
            bonusTitle: '⭐ 點選增加特徵 —',
            emptyText: '🔍 沒有找到符合的種族',
            hasBonus: true,
            catField: 'cat',
            idField: 'en',
            getData: () => window.PromptGen.RaceMagicData,
            deps: { state, sfx, selectOption, generatePrompt, saveState, renderTabContent, rawData: RACES_RAW }
        });
    }

    return { setup, openRaceMagicModal };
})();
