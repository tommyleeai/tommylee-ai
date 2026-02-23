// ============================================
// AI Prompt Generator — Expression Magic 資料
// 9 大分類 + 7 段強度推桿 + 特效系統
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.ExpressionMagicData = (function () {

    // ── 表情分類 Tab 定義 ──
    const TABS = [
        { id: 'joy', icon: '😊', label: '喜悅系', en: 'Joy' },
        { id: 'anger', icon: '😤', label: '憤怒系', en: 'Anger' },
        { id: 'sadness', icon: '😢', label: '悲傷系', en: 'Sadness' },
        { id: 'surprise', icon: '😲', label: '驚訝系', en: 'Surprise' },
        { id: 'shy', icon: '😳', label: '害羞系', en: 'Shy' },
        { id: 'cool', icon: '😐', label: '冷酷系', en: 'Stoic' },
        { id: 'mad', icon: '🤪', label: '狂氣系', en: 'Mad' },
        { id: 'comedy', icon: '😆', label: '搞笑系', en: 'Comedy' },
        { id: 'battle', icon: '⚔️', label: '戰鬥系', en: 'Battle' }
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
        { label: '嘻嘻笑', en: 'Giggling', value: 'giggling, playful laughter, covering mouth', category: 'joy' },
        { label: '露齒笑', en: 'Toothy Grin', value: 'toothy grin, wide smile showing teeth', category: 'joy' },
        { label: '溫暖笑容', en: 'Warm Smile', value: 'warm smile, kind expression, gentle eyes', category: 'joy' },
        { label: '眉開眼笑', en: 'Beaming', value: 'beaming smile, bright eyes, overjoyed', category: 'joy' },
        { label: '竊笑', en: 'Snickering', value: 'snickering, suppressed laugh, sly smile', category: 'joy' },
        { label: '豪放大笑', en: 'Boisterous Laugh', value: 'boisterous laughter, head thrown back, hearty laugh', category: 'joy' },
        { label: '感動笑容', en: 'Touched Smile', value: 'smile with tears of joy, moved to tears, touched expression', category: 'joy' },
        { label: '天使微笑', en: 'Angelic Smile', value: 'angelic smile, pure innocent smile, serene bliss', category: 'joy' },
        { label: '羞澀甜笑', en: 'Coy Smile', value: 'coy smile, blushing while smiling, demure expression', category: 'joy' },
        { label: '惡作劇笑', en: 'Mischievous Grin', value: 'mischievous grin, playful smirk, prankster face', category: 'joy' },
        { label: '勝利笑容', en: 'Victory Smile', value: 'victory smile, triumphant expression, winner face', category: 'joy' },

        // ── ② 憤怒系 Anger ──
        { label: '咬牙切齒', en: 'Gritting Teeth', value: 'gritting teeth, clenched jaw, angry', category: 'anger' },
        { label: '皺眉怒視', en: 'Furrowed Glare', value: 'furrowed brows, angry glare, scowling', category: 'anger' },
        { label: '爆青筋', en: 'Veins Popping', value: 'anger vein, bulging veins, furious', category: 'anger' },
        { label: '火冒三丈', en: 'Raging', value: 'raging expression, extremely angry, fury', category: 'anger' },
        { label: '冷怒', en: 'Cold Fury', value: 'cold anger, icy glare, restrained fury', category: 'anger' },
        { label: '暗黑怒笑', en: 'Dark Grin', value: 'dark grin, menacing smile while angry', category: 'anger' },
        { label: '怒吼', en: 'Roaring', value: 'roaring, screaming in anger, battle cry', category: 'anger' },
        { label: '憤恨咬唇', en: 'Biting Lip Anger', value: 'biting lip in anger, frustrated, holding back rage', category: 'anger' },
        { label: '怒目圓睜', en: 'Wide-Eyed Rage', value: 'eyes wide with rage, bulging eyes, manic anger', category: 'anger' },
        { label: '不屑嗤笑', en: 'Contemptuous Scoff', value: 'contemptuous scoff, condescending sneer, disdain', category: 'anger' },
        { label: '沉默怒火', en: 'Silent Fury', value: 'silent anger, suppressed rage, seething', category: 'anger' },
        { label: '暴怒扭曲', en: 'Frenzied Rage', value: 'frenzied rage, distorted with anger, violent fury', category: 'anger' },
        { label: '殺意凝視', en: 'Killing Intent', value: 'killing intent, murderous gaze, lethal stare', category: 'anger' },
        { label: '鬥志怒焰', en: 'Fiery Determination', value: 'fiery eyes, burning determination, blazing rage', category: 'anger' },
        { label: '壓抑爆發前', en: 'About to Snap', value: 'about to snap, barely contained rage, tension before explosion', category: 'anger' },
        { label: '復仇者之眼', en: 'Avenger Eyes', value: 'vengeful eyes, thirst for revenge, dark resolve', category: 'anger' },
        { label: '不耐煩', en: 'Impatient', value: 'impatient expression, annoyed, irritated', category: 'anger' },
        { label: '嫉恨眼神', en: 'Envious Glare', value: 'envious glare, jealous fury, resentful stare', category: 'anger' },

        // ── ③ 悲傷系 Sadness ──
        { label: '淚眼', en: 'Teary Eyes', value: 'teary eyes, watery eyes, about to cry', category: 'sadness' },
        { label: '默默流淚', en: 'Silent Tears', value: 'silent tears, crying quietly, tears streaming', category: 'sadness' },
        { label: '強忍淚水', en: 'Holding Tears', value: 'holding back tears, trying not to cry', category: 'sadness' },
        { label: '崩潰痛哭', en: 'Sobbing', value: 'sobbing, crying hard, emotional breakdown', category: 'sadness' },
        { label: '失落低頭', en: 'Downcast', value: 'looking down, dejected, downcast expression', category: 'sadness' },
        { label: '空洞眼神', en: 'Empty Eyes', value: 'empty eyes, hollow gaze, lifeless stare', category: 'sadness' },
        { label: '絕望神情', en: 'Despair', value: 'despair, hopeless expression, anguished face', category: 'sadness' },
        { label: '離別之淚', en: 'Farewell Tears', value: 'farewell tears, parting sadness, goodbye tears', category: 'sadness' },
        { label: '苦笑', en: 'Bitter Smile', value: 'bitter smile, forced smile, sad smile', category: 'sadness' },
        { label: '心碎表情', en: 'Heartbroken', value: 'heartbroken expression, devastated, soul crushing sadness', category: 'sadness' },
        { label: '愧疚低頭', en: 'Guilty Look', value: 'guilty expression, remorseful, looking down in shame', category: 'sadness' },
        { label: '哀傷遠望', en: 'Melancholic Gaze', value: 'melancholic gaze, staring into distance, wistful longing', category: 'sadness' },
        { label: '無聲嗚咽', en: 'Silent Whimper', value: 'whimpering, trembling lips, silent cry', category: 'sadness' },
        { label: '悲憤交加', en: 'Grief and Rage', value: 'mix of grief and anger, anguished fury, pained rage', category: 'sadness' },
        { label: '淡淡哀愁', en: 'Subtle Sorrow', value: 'subtle sorrow, faint sadness, quiet melancholy', category: 'sadness' },
        { label: '失魂落魄', en: 'Soulless', value: 'soulless expression, losing will, broken spirit', category: 'sadness' },
        { label: '懷念故人', en: 'Missing Someone', value: 'longing expression, missing someone, reminiscing sadly', category: 'sadness' },
        { label: '雨中哭泣', en: 'Crying in Rain', value: 'crying in rain, tears mixing with rain, dramatic sadness', category: 'sadness' },

        // ── ④ 驚訝系 Surprise ──
        { label: '瞪大雙眼', en: 'Wide Eyes', value: 'wide eyes, surprised, eyes wide open', category: 'surprise' },
        { label: '張口驚訝', en: 'Jaw Drop', value: 'jaw drop, open mouth surprise, shocked', category: 'surprise' },
        { label: '石化表情', en: 'Petrified', value: 'petrified expression, frozen in shock, stunned', category: 'surprise' },
        { label: '突然愣住', en: 'Dumbfounded', value: 'dumbfounded, blank stare, caught off guard', category: 'surprise' },
        { label: '嚇到退後', en: 'Startled', value: 'startled, flinching, scared reaction', category: 'surprise' },
        { label: '震驚失語', en: 'Speechless', value: 'speechless, shock, disbelief expression', category: 'surprise' },
        { label: '雙重驚訝', en: 'Double Take', value: 'double take, looking twice, surprised realization', category: 'surprise' },
        { label: '驚喜雀躍', en: 'Delighted Surprise', value: 'pleasantly surprised, delighted, joyful shock', category: 'surprise' },
        { label: '恐懼驚嚇', en: 'Terrified', value: 'terrified expression, horror, fear in eyes', category: 'surprise' },
        { label: '不可置信', en: 'Disbelief', value: 'disbelief, cannot believe eyes, incredulous', category: 'surprise' },
        { label: '驚覺危險', en: 'Danger Sense', value: 'sensing danger, alert surprise, sudden awareness', category: 'surprise' },
        { label: '驚訝到哭', en: 'Shocked to Tears', value: 'shocked to tears, overwhelming surprise, emotional shock', category: 'surprise' },
        { label: '瞳孔縮小', en: 'Constricted Pupils', value: 'constricted pupils, extreme shock, pin-point eyes', category: 'surprise' },
        { label: '嘴巴O型', en: 'O-Mouth', value: 'O-shaped mouth, round mouth surprise, gasping', category: 'surprise' },
        { label: '後退跌倒', en: 'Falling Back', value: 'falling backward in shock, stumbling back, recoiling', category: 'surprise' },
        { label: '驚訝冒汗', en: 'Nervous Surprise', value: 'surprised and sweating, nervous shock, anxious surprise', category: 'surprise' },
        { label: '眼神發直', en: 'Glazed Stare', value: 'glazed stare, frozen expression, processing shock', category: 'surprise' },

        // ── ⑤ 害羞系 Shy ──
        { label: '臉紅', en: 'Blushing', value: 'blushing, red cheeks, embarrassed', category: 'shy' },
        { label: '低頭不敢看', en: 'Looking Away', value: 'looking away shyly, averting gaze, head down', category: 'shy' },
        { label: '扭捏', en: 'Fidgeting', value: 'fidgeting, nervous, shy body language', category: 'shy' },
        { label: '傲嬌臉紅', en: 'Tsundere Blush', value: 'tsundere, blushing while angry, flustered', category: 'shy' },
        { label: '偷看', en: 'Peeking', value: 'peeking, looking through fingers, shy peek', category: 'shy' },
        { label: '害羞微笑', en: 'Shy Smile', value: 'shy smile, bashful expression, timid smile', category: 'shy' },
        { label: '耳朵泛紅', en: 'Red Ears', value: 'ears turning red, blushing ears, deeply embarrassed', category: 'shy' },
        { label: '捂臉害羞', en: 'Covering Face', value: 'covering face with hands, hiding embarrassment', category: 'shy' },
        { label: '偷瞄心上人', en: 'Stealing Glances', value: 'stealing glances, sneaky look, secret admiration', category: 'shy' },
        { label: '結巴說不出', en: 'Stammering', value: 'stammering, unable to speak, mouth opening and closing', category: 'shy' },
        { label: '僵硬微笑', en: 'Stiff Smile', value: 'stiff awkward smile, forced composure, tense expression', category: 'shy' },
        { label: '心跳加速', en: 'Heart Racing', value: 'flustered, heart pounding, nervous excitement', category: 'shy' },
        { label: '蒸氣冒頭', en: 'Steam from Head', value: 'steam rising from head, overheated embarrassment, maximum blush', category: 'shy' },
        { label: '含羞帶怯', en: 'Demure', value: 'demure expression, coy look, bashful charm', category: 'shy' },
        { label: '緊張到僵硬', en: 'Frozen Nervous', value: 'frozen with nervousness, stiff body, deer in headlights', category: 'shy' },
        { label: '嬌嗔', en: 'Playful Pout', value: 'playful pouting, pretending to be angry, cute sulking', category: 'shy' },
        { label: '撥髮遮臉', en: 'Hair Covering Face', value: 'hiding behind hair, hair over face, bashful', category: 'shy' },

        // ── ⑥ 冷酷系 Stoic ──
        { label: '無表情', en: 'Expressionless', value: 'expressionless, blank face, poker face', category: 'cool' },
        { label: '冷眼旁觀', en: 'Cold Stare', value: 'cold stare, indifferent gaze, detached look', category: 'cool' },
        { label: '半瞇眼', en: 'Half-Lidded', value: 'half-lidded eyes, sleepy eyes, bored look', category: 'cool' },
        { label: '淡然微笑', en: 'Faint Smile', value: 'faint smile, subtle smirk, composed', category: 'cool' },
        { label: '面無波瀾', en: 'Unfazed', value: 'unfazed, calm expression, unshaken', category: 'cool' },
        { label: '王族威嚴', en: 'Regal Aura', value: 'regal expression, noble composure, commanding presence', category: 'cool' },
        { label: '虛無眼神', en: 'Nihilistic Eyes', value: 'nihilistic gaze, empty void in eyes, meaningless stare', category: 'cool' },
        { label: '漫不經心', en: 'Nonchalant', value: 'nonchalant expression, carefree, couldn\'t care less', category: 'cool' },
        { label: '居高臨下', en: 'Looking Down On', value: 'looking down condescendingly, superior gaze, domineering', category: 'cool' },
        { label: '冰封眼神', en: 'Frozen Gaze', value: 'frozen cold gaze, ice in eyes, arctic stare', category: 'cool' },
        { label: '嘆氣無語', en: 'Exhausted Sigh', value: 'tired sigh, exasperated, done with everything', category: 'cool' },
        { label: '死魚眼', en: 'Dead Fish Eyes', value: 'dead fish eyes, completely unimpressed, flat stare', category: 'cool' },
        { label: '暗影遮面', en: 'Shadowed Face', value: 'face in shadow, mysterious, hidden expression', category: 'cool' },
        { label: '冷峻側臉', en: 'Cold Profile', value: 'cold profile view, sharp jawline, distant expression', category: 'cool' },
        { label: '帝王之眼', en: 'Emperor Eyes', value: 'emperor gaze, absolute authority, unquestioned power', category: 'cool' },
        { label: '審判凝視', en: 'Judging Gaze', value: 'judging gaze, evaluating stare, critical assessment', category: 'cool' },
        { label: '哲學沉思', en: 'Philosophical', value: 'philosophical expression, deep thought, contemplative wisdom', category: 'cool' },

        // ── ⑦ 狂氣系 Mad ──
        { label: '病嬌微笑', en: 'Yandere Smile', value: 'yandere smile, unsettling smile, crazy eyes smile', category: 'mad' },
        { label: '眼神渙散', en: 'Unfocused Eyes', value: 'unfocused eyes, dazed look, glazed over eyes', category: 'mad' },
        { label: '瘋狂大笑', en: 'Maniacal Laugh', value: 'maniacal laughter, insane laugh, cackling', category: 'mad' },
        { label: '扭曲微笑', en: 'Twisted Smile', value: 'twisted smile, distorted grin, sinister expression', category: 'mad' },
        { label: '精神錯亂', en: 'Deranged', value: 'deranged expression, psychotic look, losing sanity', category: 'mad' },
        { label: '失控怒笑', en: 'Rage Laugh', value: 'laughing while furious, unhinged laughter', category: 'mad' },
        { label: '雙瞳異色', en: 'Heterochromia Mad', value: 'heterochromia with madness, split personality eyes', category: 'mad' },
        { label: '舔唇', en: 'Lip Licking', value: 'licking lips, intense gaze, anticipating expression', category: 'mad' },
        { label: '壞掉的笑', en: 'Broken Smile', value: 'broken smile, something snapped, lost sanity smile', category: 'mad' },
        { label: '暗黑覺醒', en: 'Dark Awakening', value: 'dark awakening, evil aura, corrupted expression', category: 'mad' },
        { label: '人格分裂', en: 'Split Personality', value: 'split personality, half normal half insane, duality', category: 'mad' },
        { label: '迷幻瞳孔', en: 'Psychedelic Pupils', value: 'psychedelic pupils, swirling colors in eyes, hypnotic madness', category: 'mad' },
        { label: '崩壞笑容', en: 'Corrupted Smile', value: 'corrupted smile, glitching expression, distorted reality', category: 'mad' },
        { label: '興奮到顫抖', en: 'Trembling Excitement', value: 'trembling with excitement, shaking, manic energy', category: 'mad' },
        { label: '嘲弄冷笑', en: 'Mocking Sneer', value: 'mocking sneer, cruel mockery, sadistic amusement', category: 'mad' },
        { label: '自言自語', en: 'Talking to Self', value: 'muttering, talking to self, disturbed expression', category: 'mad' },
        { label: '瞳孔膨脹', en: 'Dilated Pupils', value: 'extremely dilated pupils, manic excitement, wide crazy eyes', category: 'mad' },

        // ── ⑧ 搞笑系 Comedy ──
        { label: '誇張流淚', en: 'Comical Tears', value: 'comedic crying, anime tears, waterfall tears', category: 'comedy' },
        { label: '鼻血', en: 'Nosebleed', value: 'nosebleed, anime nosebleed', category: 'comedy' },
        { label: '臉變Q版', en: 'Chibi Face', value: 'chibi face, super deformed expression', category: 'comedy' },
        { label: '張大嘴巴', en: 'Huge Mouth', value: 'comically large open mouth, exaggerated surprise', category: 'comedy' },
        { label: '無奈翻白眼', en: 'Eye Roll', value: 'eye roll, exasperated, done with everything', category: 'comedy' },
        { label: '無語三條線', en: 'Speechless Lines', value: 'sweat drop, anime speechless lines, exasperated', category: 'comedy' },
        { label: '崩潰跪地', en: 'Despair Kneel', value: 'kneeling in despair, comedic breakdown, orz pose', category: 'comedy' },
        { label: '靈魂出竅', en: 'Soul Leaving', value: 'soul leaving body, ghost coming out, dying inside', category: 'comedy' },
        { label: '吐血', en: 'Spitting Blood', value: 'spitting blood, dramatic cough, anime damage', category: 'comedy' },
        { label: '暴走', en: 'Going Berserk', value: 'comical rage, running wildly, cartoon anger', category: 'comedy' },
        { label: '臉部扭曲', en: 'Face Distortion', value: 'face distortion, comically stretched face, funny deformation', category: 'comedy' },
        { label: '嘴角抽搐', en: 'Eye Twitch', value: 'eye twitching, mouth corner twitching, forced composure', category: 'comedy' },
        { label: '石化碎裂', en: 'Crack and Shatter', value: 'stone crack, petrified and shattering, dramatic shock', category: 'comedy' },
        { label: '發白蒼白', en: 'Turning White', value: 'face turning white, color draining, pale from shock', category: 'comedy' },
        { label: '飛出鼻涕泡', en: 'Snot Bubble', value: 'snot bubble, sleeping with bubble, anime sleep', category: 'comedy' },
        { label: '問號臉', en: 'Question Mark Face', value: 'question mark above head, confused expression, tilted head', category: 'comedy' },
        { label: '閃亮雙眼', en: 'Sparkling Eyes', value: 'sparkling eyes with excitement, stars in eyes, dazzled', category: 'comedy' },
        { label: '被嚇到彈飛', en: 'Jumped in Fright', value: 'jumping in fright, comedic scare, hair standing up', category: 'comedy' },

        // ── ⑨ 戰鬥系 Battle ──
        { label: '專注凝視', en: 'Focused Gaze', value: 'intense focus, determined eyes, battle ready', category: 'battle' },
        { label: '戰意高昂', en: 'Battle Spirit', value: 'battle spirit, fighting aura, determined expression', category: 'battle' },
        { label: '受傷堅持', en: 'Wounded Resolve', value: 'wounded but determined, injured persistence', category: 'battle' },
        { label: '嘴角流血微笑', en: 'Bloody Smile', value: 'blood on lips, smiling with blood, battle damaged smile', category: 'battle' },
        { label: '狂暴覺醒', en: 'Berserk', value: 'berserk rage, berserker expression, losing control', category: 'battle' },
        { label: '覺醒眼發光', en: 'Glowing Eyes', value: 'glowing eyes, power awakening, shining eyes, energy eyes', category: 'battle' },
        { label: '冷靜備戰', en: 'Calm Before Battle', value: 'calm before storm, zen before fight, composed readiness', category: 'battle' },
        { label: '獵手之眼', en: 'Hunter Eyes', value: 'predatory hunter eyes, tracking prey, sharp focus', category: 'battle' },
        { label: '蔑視對手', en: 'Contempt', value: 'contemptuous look at opponent, dismissive, below me', category: 'battle' },
        { label: '野獸咆哮', en: 'Beast Roar', value: 'beast roar, primal scream, feral expression', category: 'battle' },
        { label: '劍士決意', en: 'Swordsman Resolve', value: 'swordsman determination, blade master focus, steel will', category: 'battle' },
        { label: '死亡凝視', en: 'Death Stare', value: 'death stare, lethal gaze, eyes of killer', category: 'battle' },
        { label: '浴血奮戰', en: 'Blood-Soaked', value: 'blood-soaked face, battle worn, blood splattered', category: 'battle' },
        { label: '最後一擊', en: 'Final Strike', value: 'final strike expression, last stand, all-or-nothing', category: 'battle' },
        { label: '力量爆發', en: 'Power Surge', value: 'power surge, energy eruption, overwhelming force', category: 'battle' },
        { label: '守護決心', en: 'Guardian Resolve', value: 'protective resolve, guarding expression, shielding loved ones', category: 'battle' },
        { label: '戰傷榮耀', en: 'Battle Scars', value: 'proud battle scars, war-worn expression, veteran pride', category: 'battle' }
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
