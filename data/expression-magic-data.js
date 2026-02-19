// ============================================
// AI Prompt Generator — Expression Magic 資料
// 9 大分類 + 7 段強度推桿 + 特效系統
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.ExpressionMagicData = (function () {

    // ── 表情分類 Tab 定義 ──
    const TABS = [
        { id: 'joy', label: '😊 喜悅系', en: 'Joy' },
        { id: 'anger', label: '😤 憤怒系', en: 'Anger' },
        { id: 'sadness', label: '😢 悲傷系', en: 'Sadness' },
        { id: 'surprise', label: '😲 驚訝系', en: 'Surprise' },
        { id: 'shy', label: '😳 害羞系', en: 'Shy' },
        { id: 'cool', label: '😐 冷酷系', en: 'Stoic' },
        { id: 'mad', label: '🤪 狂氣系', en: 'Mad' },
        { id: 'comedy', label: '😆 搞笑系', en: 'Comedy' },
        { id: 'battle', label: '⚔️ 戰鬥系', en: 'Battle' }
    ];

    // ── 表情項目（每項含 label, en, value, category）──
    const EXPRESSIONS = [
        // ── ① 喜悅系 Joy ──
        { label: '微笑', en: 'Smile', value: 'gentle smile', category: 'joy' },
        { label: '開懷大笑', en: 'Laughing', value: 'laughing, open mouth, happy', category: 'joy' },
        { label: '笑到閉眼', en: 'Eyes Closed Laugh', value: 'laughing with eyes closed, happy expression', category: 'joy' },
        { label: '甜美微笑', en: 'Sweet Smile', value: 'sweet smile, warm expression', category: 'joy' },
        { label: '自信笑', en: 'Confident Smile', value: 'confident smile, smirk', category: 'joy' },
        { label: '得意笑', en: 'Smug', value: 'smug expression, proud smile', category: 'joy' },
        { label: '傻笑', en: 'Goofy Grin', value: 'goofy grin, silly smile, dopey expression', category: 'joy' },
        { label: '陽光笑', en: 'Bright Smile', value: 'bright cheerful smile, radiant expression', category: 'joy' },

        // ── ② 憤怒系 Anger ──
        { label: '咬牙切齒', en: 'Gritting Teeth', value: 'gritting teeth, clenched jaw, angry', category: 'anger' },
        { label: '皺眉怒視', en: 'Furrowed Glare', value: 'furrowed brows, angry glare, scowling', category: 'anger' },
        { label: '爆青筋', en: 'Veins Popping', value: 'anger vein, bulging veins, furious', category: 'anger' },
        { label: '火冒三丈', en: 'Raging', value: 'raging expression, extremely angry, fury', category: 'anger' },
        { label: '冷怒', en: 'Cold Fury', value: 'cold anger, icy glare, restrained fury', category: 'anger' },
        { label: '暗黑怒笑', en: 'Dark Grin', value: 'dark grin, menacing smile while angry', category: 'anger' },
        { label: '怒吼', en: 'Roaring', value: 'roaring, screaming in anger, battle cry', category: 'anger' },

        // ── ③ 悲傷系 Sadness ──
        { label: '淚眼', en: 'Teary Eyes', value: 'teary eyes, watery eyes, about to cry', category: 'sadness' },
        { label: '默默流淚', en: 'Silent Tears', value: 'silent tears, crying quietly, tears streaming', category: 'sadness' },
        { label: '強忍淚水', en: 'Holding Tears', value: 'holding back tears, trying not to cry', category: 'sadness' },
        { label: '崩潰痛哭', en: 'Sobbing', value: 'sobbing, crying hard, emotional breakdown', category: 'sadness' },
        { label: '失落低頭', en: 'Downcast', value: 'looking down, dejected, downcast expression', category: 'sadness' },
        { label: '空洞眼神', en: 'Empty Eyes', value: 'empty eyes, hollow gaze, lifeless stare', category: 'sadness' },
        { label: '絕望神情', en: 'Despair', value: 'despair, hopeless expression, anguished face', category: 'sadness' },

        // ── ④ 驚訝系 Surprise ──
        { label: '瞪大雙眼', en: 'Wide Eyes', value: 'wide eyes, surprised, eyes wide open', category: 'surprise' },
        { label: '張口驚訝', en: 'Jaw Drop', value: 'jaw drop, open mouth surprise, shocked', category: 'surprise' },
        { label: '石化表情', en: 'Petrified', value: 'petrified expression, frozen in shock, stunned', category: 'surprise' },
        { label: '突然愣住', en: 'Dumbfounded', value: 'dumbfounded, blank stare, caught off guard', category: 'surprise' },
        { label: '嚇到退後', en: 'Startled', value: 'startled, flinching, scared reaction', category: 'surprise' },
        { label: '震驚失語', en: 'Speechless', value: 'speechless, shock, disbelief expression', category: 'surprise' },

        // ── ⑤ 害羞系 Shy ──
        { label: '臉紅', en: 'Blushing', value: 'blushing, red cheeks, embarrassed', category: 'shy' },
        { label: '低頭不敢看', en: 'Looking Away', value: 'looking away shyly, averting gaze, head down', category: 'shy' },
        { label: '扭捏', en: 'Fidgeting', value: 'fidgeting, nervous, shy body language', category: 'shy' },
        { label: '傲嬌臉紅', en: 'Tsundere Blush', value: 'tsundere, blushing while angry, flustered', category: 'shy' },
        { label: '偷看', en: 'Peeking', value: 'peeking, looking through fingers, shy peek', category: 'shy' },
        { label: '害羞微笑', en: 'Shy Smile', value: 'shy smile, bashful expression, timid smile', category: 'shy' },

        // ── ⑥ 冷酷系 Stoic ──
        { label: '無表情', en: 'Expressionless', value: 'expressionless, blank face, poker face', category: 'cool' },
        { label: '冷眼旁觀', en: 'Cold Stare', value: 'cold stare, indifferent gaze, detached look', category: 'cool' },
        { label: '半瞇眼', en: 'Half-Lidded', value: 'half-lidded eyes, sleepy eyes, bored look', category: 'cool' },
        { label: '淡然微笑', en: 'Faint Smile', value: 'faint smile, subtle smirk, composed', category: 'cool' },
        { label: '面無波瀾', en: 'Unfazed', value: 'unfazed, calm expression, unshaken', category: 'cool' },
        { label: '王族威嚴', en: 'Regal Aura', value: 'regal expression, noble composure, commanding presence', category: 'cool' },

        // ── ⑦ 狂氣系 Mad ──
        { label: '病嬌微笑', en: 'Yandere Smile', value: 'yandere smile, unsettling smile, crazy eyes smile', category: 'mad' },
        { label: '眼神渙散', en: 'Unfocused Eyes', value: 'unfocused eyes, dazed look, glazed over eyes', category: 'mad' },
        { label: '瘋狂大笑', en: 'Maniacal Laugh', value: 'maniacal laughter, insane laugh, cackling', category: 'mad' },
        { label: '扭曲微笑', en: 'Twisted Smile', value: 'twisted smile, distorted grin, sinister expression', category: 'mad' },
        { label: '精神錯亂', en: 'Deranged', value: 'deranged expression, psychotic look, losing sanity', category: 'mad' },
        { label: '失控怒笑', en: 'Rage Laugh', value: 'laughing while furious, unhinged laughter', category: 'mad' },

        // ── ⑧ 搞笑系 Comedy ──
        { label: '誇張流淚', en: 'Comical Tears', value: 'comedic crying, anime tears, waterfall tears', category: 'comedy' },
        { label: '鼻血', en: 'Nosebleed', value: 'nosebleed, anime nosebleed', category: 'comedy' },
        { label: '臉變Q版', en: 'Chibi Face', value: 'chibi face, super deformed expression', category: 'comedy' },
        { label: '張大嘴巴', en: 'Huge Mouth', value: 'comically large open mouth, exaggerated surprise', category: 'comedy' },
        { label: '無奈翻白眼', en: 'Eye Roll', value: 'eye roll, exasperated, done with everything', category: 'comedy' },
        { label: '無語三條線', en: 'Speechless Lines', value: 'sweat drop, anime speechless lines, exasperated', category: 'comedy' },
        { label: '崩潰跪地', en: 'Despair Kneel', value: 'kneeling in despair, comedic breakdown, orz pose', category: 'comedy' },

        // ── ⑨ 戰鬥系 Battle ──
        { label: '專注凝視', en: 'Focused Gaze', value: 'intense focus, determined eyes, battle ready', category: 'battle' },
        { label: '戰意高昂', en: 'Battle Spirit', value: 'battle spirit, fighting aura, determined expression', category: 'battle' },
        { label: '受傷堅持', en: 'Wounded Resolve', value: 'wounded but determined, injured persistence', category: 'battle' },
        { label: '嘴角流血微笑', en: 'Bloody Smile', value: 'blood on lips, smiling with blood, battle damaged smile', category: 'battle' },
        { label: '狂暴覺醒', en: 'Berserk', value: 'berserk rage, berserker expression, losing control', category: 'battle' },
        { label: '覺醒眼發光', en: 'Glowing Eyes', value: 'glowing eyes, power awakening, shining eyes, energy eyes', category: 'battle' }
    ];

    // ── 強度推桿 7 段系統 ──
    // 依照強度自動調整 prompt 權重和修飾詞
    const INTENSITY = {
        1: {
            zh: '🔮 極致微弱',
            en: 'Phantom Trace',
            modifier: 'very subtle, barely noticeable',
            weight: 1.3,
            fantasy: true,
            explain: '🔮 <strong>幻想級 — 極致微弱</strong>：表情幾乎看不出來，只有最微妙的痕跡。需要高權重反向壓制才能讓 AI 理解「幾乎沒有但又有一點」。'
        },
        2: {
            zh: '輕微',
            en: 'Slight',
            modifier: 'slight, subtle',
            weight: 1.0,
            fantasy: false,
            explain: '<strong>輕微</strong>：淡淡的表情，自然不刻意。'
        },
        3: {
            zh: '自然',
            en: 'Natural',
            modifier: '',
            weight: 1.0,
            fantasy: false,
            explain: '<strong>自然</strong>：標準強度，最自然的表情呈現。'
        },
        4: {
            zh: '標準',
            en: 'Standard',
            modifier: '',
            weight: 1.0,
            fantasy: false,
            explain: '<strong>標準</strong>：AI 預設範圍的表情強度。'
        },
        5: {
            zh: '強烈',
            en: 'Intense',
            modifier: 'very, intense',
            weight: 1.2,
            fantasy: false,
            explain: '<strong>強烈</strong>：明顯加強的表情，情緒張力提升。'
        },
        6: {
            zh: '誇張',
            en: 'Extreme',
            modifier: 'extremely, exaggerated, dramatic',
            weight: 1.4,
            fantasy: false,
            explain: '<strong>誇張</strong>：高度戲劇化的表情，適合動漫演出。'
        },
        7: {
            zh: '🔮 幻想爆發',
            en: 'Fantasy Burst',
            modifier: 'impossibly intense, supernatural, overwhelming',
            weight: 1.8,
            fantasy: true,
            explain: '🔮 <strong>幻想級 — 爆發</strong>：超越物理極限的表情演出。眼睛放光、淚如瀑布、怒火燃燒——完全脫離現實的幻想級演出。'
        }
    };

    // ── 特效系統 ──
    const EFFECTS = [
        { id: 'tears', label: '💧 淚水', en: 'Tears', value: 'tears, crying, tear drops' },
        { id: 'sweat', label: '😰 汗珠', en: 'Sweat', value: 'sweat drop, sweating, nervous sweat' },
        { id: 'glow_eyes', label: '✨ 發光眼', en: 'Glowing Eyes', value: 'glowing eyes, shining eyes, luminous eyes' },
        { id: 'blood', label: '🩸 流血', en: 'Blood', value: 'blood on face, bleeding, blood dripping' },
        { id: 'veins', label: '💢 爆青筋', en: 'Anger Veins', value: 'anger vein, popping veins, throbbing veins' },
        { id: 'heart_eyes', label: '💖 愛心眼', en: 'Heart Eyes', value: 'heart-shaped pupils, heart eyes, love eyes' },
        { id: 'spiral_eyes', label: '🌀 渦旋眼', en: 'Spiral Eyes', value: 'spiral eyes, dizzy eyes, hypnotic eyes' },
        { id: 'blush', label: '🌸 紅暈', en: 'Blush', value: 'blushing cheeks, rosy cheeks, red face' },
        { id: 'shadow', label: '🖤 陰影遮眼', en: 'Shadow Eyes', value: 'eyes hidden in shadow, dark shadow over eyes, hair shadow' },
        { id: 'sparkle', label: '⭐ 星星眼', en: 'Sparkly Eyes', value: 'sparkling eyes, starry eyes, shining pupils' }
    ];

    return {
        TABS,
        EXPRESSIONS,
        INTENSITY,
        EFFECTS
    };
})();
