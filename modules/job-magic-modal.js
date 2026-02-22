// ============================================
// AI Prompt Generator — Job Magic Modal (薄包裝)
// 使用 MagicModalBase 共用邏輯
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.JobMagicModal = (function () {
    let state, sfx, JOBS_RAW, selectOption, generatePrompt, saveState, renderTabContent;

    function setup(deps) {
        state = deps.state;
        sfx = deps.sfx;
        JOBS_RAW = deps.JOBS;
        selectOption = deps.selectOption;
        generatePrompt = deps.generatePrompt;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    function openJobMagicModal() {
        window.PromptGen.MagicModalBase.createModal({
            prefix: 'jmm',
            modalId: 'job-magic-modal',
            title: '🔮 高級魔法・職業大全',
            searchPlaceholder: '搜尋職業 Search job...',
            itemLabel: '職業',
            stateKey: 'job',
            advancedKey: 'jobAdvanced',
            recentKey: 'jmm_recent_jobs',
            chipClass: 'jmm-job-chip',
            magicCircleText: '✦ JOB ✦',
            bonusTitle: '⭐ 點選增加職業特徵 —',
            emptyText: '🔍 沒有找到符合的職業',
            hasBonus: true,
            catField: 'cat',
            idField: 'en',
            getData: () => window.PromptGen.JobMagicData,
            deps: { state, sfx, selectOption, generatePrompt, saveState, renderTabContent, rawData: JOBS_RAW }
        });
    }

    return { setup, openJobMagicModal };
})();
