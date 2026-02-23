// ============================================
// AI Prompt Generator — Body Magic 7段滑桿資料
// 從 script.js 提取，掛載至 window.PromptGen.BodyMagicData
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.BodyMagicData = (function() {
    // ── Body Magic Data — Full Demo v2 (7-level slider system with positive/negative/explain) ──
    const BODY_MAGIC_DATA = {
        FEMALE_BUST: {
            1: {
                zh: '🔮 完全無胸 / Doll-flat',
                positive: ['completely flat chest', 'no breasts at all', 'doll-like torso', 'child-like flat body'],
                negative: ['breasts', 'cleavage', 'bust', 'curvy', 'voluptuous', 'busty', 'chest'],
                weight: 1.7, fantasy: true,
                explain: '🔮 <strong>幻想級 — 完全無胸</strong>：如人偶或精靈般完全平坦的胸部。需要極高權重 (1.7) + 全面壓制負向提示詞。適合精靈、仙子、人偶等非人類角色。'
            },
            2: {
                zh: '非常平坦 / Flat Chest',
                positive: ['flat chest', 'very small breasts', 'almost flat'],
                negative: ['big breasts', 'large breasts', 'cleavage', 'voluptuous', 'curvy', 'busty'],
                weight: 1.5, fantasy: false,
                explain: '<strong>非常平坦</strong>：逆勢設定，需要高權重 (1.5) + 大量負向提示詞壓制 AI 預設偏好。建議搭配 young girl body 或 loli proportions。'
            },
            3: {
                zh: '偏小纖細 / Small',
                positive: ['small breasts', 'petite breasts', 'subtle curves', 'slim figure'],
                negative: ['large breasts', 'big breasts', 'voluptuous', 'curvy', 'busty', 'cleavage'],
                weight: 1.35, fantasy: false,
                explain: '<strong>偏小纖細</strong>：較逆勢，權重 (1.35)。建議把 age descriptor 中的 mature womanly figure 改為 youthful slim figure。'
            },
            4: {
                zh: '中等自然 / Medium',
                positive: ['medium breasts', 'natural breasts', 'modest bust'],
                negative: ['huge breasts', 'massive breasts', 'exaggerated proportions'],
                weight: 1.1, fantasy: false,
                explain: '<strong>中等自然</strong>：最接近 AI 預設，只需微調權重 (1.1)。建議去掉 feminine curves 改用 gentle curves。'
            },
            5: {
                zh: '豐滿 / Large',
                positive: ['large breasts', 'full breasts', 'curvy', 'voluptuous figure'],
                negative: ['small breasts', 'flat chest', 'petite breasts'],
                weight: 1.2, fantasy: false,
                explain: '<strong>豐滿</strong>：順勢設定，AI 容易生成。權重 (1.2) 足夠。'
            },
            6: {
                zh: '非常豐滿 / Huge',
                positive: ['huge breasts', 'massive breasts', 'voluptuous', 'busty'],
                negative: [],
                weight: 1.4, fantasy: false,
                explain: '<strong>非常豐滿</strong>：極端豐滿。因已遠超預設，需要較高權重 (1.4) 確保穩定輸出。幾乎不需要負向提示詞。'
            },
            7: {
                zh: '🔮 超乳幻想 / Fantasy Massive',
                positive: ['impossibly huge breasts', 'gigantic breasts', 'breast bigger than head', 'absurdly large bust', 'gravity-defying breasts'],
                negative: ['small breasts', 'flat chest', 'realistic proportions', 'normal breasts'],
                weight: 1.8, fantasy: true,
                explain: '🔮 <strong>幻想級 — 超乳</strong>：完全脫離現實比例的幻想級巨大。需要極高權重 (1.8) + 壓制 realistic proportions。僅適合動漫/幻想風格。'
            }
        },
        MALE_MUSCLE: {
            1: {
                zh: '🔮 骷髏骨感 / Skeletal',
                positive: ['extremely thin', 'skeletal body', 'emaciated', 'visible ribs', 'gaunt frame', 'unnaturally thin'],
                negative: ['muscular', 'buff', 'brawny', 'broad shoulders', 'ripped', 'healthy', 'normal body'],
                weight: 1.7, fantasy: true,
                explain: '🔮 <strong>幻想級 — 骷髏骨感</strong>：如亡靈法師、骷髏般的超自然消瘦。權重 (1.7) + 大量負向提示詞。適合不死族、法師等角色。'
            },
            2: {
                zh: '纖瘦少年 / Slim',
                positive: ['slim body', 'slender body', 'thin frame', 'delicate build'],
                negative: ['muscular', 'buff', 'brawny', 'broad shoulders', 'ripped'],
                weight: 1.3, fantasy: false,
                explain: '<strong>纖瘦少年</strong>：逆勢設定，AI 傾向生成較壯男性。高權重 (1.3) + 負向提示詞壓制肌肉。'
            },
            3: {
                zh: '偏瘦精緻 / Lean',
                positive: ['lean body', 'slim athletic build', 'light muscle tone'],
                negative: ['muscular', 'buff', 'thick', 'brawny'],
                weight: 1.2, fantasy: false,
                explain: '<strong>偏瘦精緻</strong>：中度逆勢，精壯但不過度。權重 (1.2) 搭配控制。'
            },
            4: {
                zh: '標準體型 / Average',
                positive: ['average build', 'normal body', 'moderate build'],
                negative: ['extremely muscular', 'very thin', 'obese'],
                weight: 1.0, fantasy: false,
                explain: '<strong>標準體型</strong>：AI 預設範圍，幾乎不需額外權重。'
            },
            5: {
                zh: '運動壯碩 / Athletic',
                positive: ['athletic body', 'muscular build', 'toned body', 'broad shoulders'],
                negative: ['thin', 'slender', 'skinny', 'delicate'],
                weight: 1.2, fantasy: false,
                explain: '<strong>運動壯碩</strong>：順勢設定，AI 易生成。權重 (1.2) 穩定控制。'
            },
            6: {
                zh: '極度壯碩 / Massive',
                positive: ['extremely muscular', 'huge muscles', 'bodybuilder physique', 'massive frame'],
                negative: ['thin', 'slim', 'slender', 'skinny'],
                weight: 1.4, fantasy: false,
                explain: '<strong>極度壯碩</strong>：極端設定，需高權重 (1.4) 確保極致肌肉表現。'
            },
            7: {
                zh: '🔮 浩克巨獸 / Hulk',
                positive: ['impossibly muscular', 'hulk-like body', 'grotesquely muscular', 'muscles bigger than head', 'superhero physique', 'inhuman muscle mass'],
                negative: ['thin', 'slim', 'slender', 'skinny', 'normal body', 'realistic proportions'],
                weight: 1.8, fantasy: true,
                explain: '🔮 <strong>幻想級 — 浩克巨獸</strong>：超越人類極限的肌肉量，如漫威浩克。需要極高權重 (1.8)。僅適合超級英雄/怪物角色。'
            }
        },
        BUILD: {
            1: { zh: '🔮 紙片人', positive: ['paper-thin body', 'impossibly thin', '2d flat body', 'stick figure proportions'], negative: ['thick', 'chubby', 'round', 'normal body', 'realistic'], weight: 1.6, fantasy: true, explain: '🔮 <strong>幻想級 — 紙片人</strong>：如動漫中極端纖細的非現實體型，或精靈族的超自然纖細。' },
            2: { zh: '纖瘦', positive: ['skinny body', 'very thin'], negative: ['thick', 'chubby', 'round'], weight: 1.2, fantasy: false, explain: '<strong>纖瘦</strong>：明顯偏瘦，權重 (1.2) + 壓制負向。' },
            3: { zh: '苗條', positive: ['slim body', 'slender'], negative: ['thick', 'chubby'], weight: 1.1, fantasy: false, explain: '<strong>苗條</strong>：健康的纖細，微調即可。' },
            4: { zh: '標準', positive: ['average body'], negative: [], weight: 1.0, fantasy: false, explain: '<strong>標準</strong>：AI 預設範圍。' },
            5: { zh: '豐腴', positive: ['plump body', 'soft figure'], negative: ['skinny', 'thin'], weight: 1.2, fantasy: false, explain: '<strong>豐腴</strong>：略帶豐滿感，權重 (1.2)。' },
            6: { zh: '壯碩', positive: ['thick body', 'large frame'], negative: ['thin', 'slim', 'slender'], weight: 1.3, fantasy: false, explain: '<strong>壯碩</strong>：厚實體型，需要較高控制。' },
            7: { zh: '🔮 泰坦', positive: ['titan-sized body', 'colossal frame', 'impossibly massive build', 'mountain-like physique'], negative: ['thin', 'slim', 'normal', 'human-sized', 'realistic'], weight: 1.7, fantasy: true, explain: '🔮 <strong>幻想級 — 泰坦</strong>：如進擊的巨人般的超自然龐大體型。完全脫離人類比例。' }
        },
        HEIGHT: {
            1: { zh: '🔮 蟻人/小精靈', positive: ['miniature body', 'fairy-sized', 'tiny creature', 'palm-sized', 'chibi proportions', 'ant-sized'], negative: ['tall', 'long legs', 'normal height', 'human-sized'], weight: 1.8, fantasy: true, explain: '🔮 <strong>幻想級 — 蟻人/小精靈</strong>：如手掌大小的精靈、仙子或蟻人縮小狀態。需要極高權重 (1.8)。' },
            2: { zh: '嬌小', positive: ['petite body', 'small frame', 'short stature'], negative: ['tall', 'long legs'], weight: 1.3, fantasy: false, explain: '<strong>嬌小</strong>：明顯矮小或像小孩的身高。' },
            3: { zh: '偏矮', positive: ['short body', 'compact build'], negative: ['tall'], weight: 1.15, fantasy: false, explain: '<strong>偏矮</strong>：略矮，微調。' },
            4: { zh: '中等', positive: [], negative: [], weight: 1.0, fantasy: false, explain: '<strong>中等</strong>：正常身高，不需要額外控制。' },
            5: { zh: '偏高', positive: ['tall body', 'long legs'], negative: ['short', 'petite'], weight: 1.15, fantasy: false, explain: '<strong>偏高</strong>：略高，微調。' },
            6: { zh: '高挑', positive: ['very tall', 'long legs', 'elongated proportions'], negative: ['short', 'petite', 'small'], weight: 1.3, fantasy: false, explain: '<strong>高挑</strong>：明顯高挑。' },
            7: { zh: '🔮 巨人族', positive: ['giant', 'towering over buildings', 'colossal height', '3 meters tall', 'gigantic humanoid', 'looking down at tiny people'], negative: ['short', 'petite', 'small', 'normal height', 'human-sized'], weight: 1.8, fantasy: true, explain: '🔮 <strong>幻想級 — 巨人族</strong>：如進擊的巨人般的超自然身高（3公尺以上）。需要極高權重 (1.8) + 特殊構圖提示。' }
        },
        PRESETS: {
            // Female Realistic
            loli: { primary: 2, build: 2, height: 2 },
            petite: { primary: 3, build: 3, height: 2 },
            slim: { primary: 3, build: 3, height: 4 },
            average: { primary: 4, build: 4, height: 4 },
            curvy: { primary: 5, build: 4, height: 4 },
            voluptuous: { primary: 6, build: 5, height: 4 },
            athletic_f: { primary: 4, build: 4, height: 5 },
            // Female Fantasy
            fairy: { primary: 1, build: 1, height: 1 },
            oppai: { primary: 7, build: 4, height: 4 },
            amazon: { primary: 5, build: 6, height: 6 },
            giantess: { primary: 5, build: 6, height: 7 },
            pixie: { primary: 1, build: 1, height: 1 },
            // Male Realistic
            shota: { primary: 2, build: 2, height: 2 },
            slim_m: { primary: 3, build: 3, height: 4 },
            average_m: { primary: 4, build: 4, height: 4 },
            athletic_m: { primary: 5, build: 4, height: 5 },
            muscular: { primary: 6, build: 5, height: 5 },
            // Male Fantasy
            elf_m: { primary: 2, build: 2, height: 5 },
            hulk: { primary: 7, build: 7, height: 6 },
            titan: { primary: 7, build: 7, height: 7 },
            antman: { primary: 4, build: 4, height: 1 },
            skeleton: { primary: 1, build: 1, height: 4 }
        }
    };
    return BODY_MAGIC_DATA;
})();

