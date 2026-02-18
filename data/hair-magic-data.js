// ============================================
// AI Prompt Generator — Hair Magic 資料
// 髮型分類、推桿、熱門、預設
// 掛載至 window.PromptGen.HairMagicData
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.HairMagicData = (function () {

    // ── 分類 Tab 定義 ──
    const CATEGORIES = [
        { id: 'all', icon: '🌐', label: '全部', en: 'All' },
        { id: 'recent', icon: '📋', label: '最近', en: 'Recent' },
        { id: 'hot', icon: '🔥', label: '熱門', en: 'Hot' },
        { id: 'ponytail', icon: '🐴', label: '馬尾', en: 'Ponytail' },
        { id: 'buns', icon: '🎀', label: '包頭', en: 'Buns' },
        { id: 'braids', icon: '🌀', label: '辮子', en: 'Braids' },
        { id: 'bangs', icon: '✂️', label: '瀏海', en: 'Bangs' },
        { id: 'modern', icon: '💈', label: '流行', en: 'Modern' },
        { id: 'punk', icon: '🎸', label: '龐克/特殊', en: 'Punk' },
        { id: 'anime', icon: '🎌', label: '動漫', en: 'Anime' }
    ];

    // ── 推桿定義（漸變屬性）──
    const SLIDERS = {
        HAIR_LENGTH: {
            id: 'hair_length',
            label: '頭髮長度',
            en: 'Hair Length',
            icon: '📏',
            levels: {
                1: { zh: '光頭 / Bald', positive: ['bald', 'shaved head'], negative: ['long hair', 'bangs', 'ponytail'], weight: 1.0, fantasy: false },
                2: { zh: '超短髮 / Buzz', positive: ['ultra short hair', 'buzz cut', 'cropped hair'], negative: ['long hair', 'ponytail'], weight: 1.0, fantasy: false },
                3: { zh: '短髮 / Short', positive: ['short hair', 'ear-length hair'], negative: ['long hair'], weight: 1.0, fantasy: false },
                4: { zh: '中長髮 / Medium', positive: ['medium hair', 'shoulder-length hair'], negative: [], weight: 1.0, fantasy: false },
                5: { zh: '長髮 / Long', positive: ['long hair', 'chest-length hair'], negative: ['short hair'], weight: 1.0, fantasy: false },
                6: { zh: '超長髮 / Very Long', positive: ['very long hair', 'waist-length hair', 'flowing hair'], negative: ['short hair'], weight: 1.2, fantasy: false },
                7: { zh: '🔮 拖地長髮 / Floor', positive: ['extremely long hair', 'floor-length hair', 'hair dragging on ground', 'rapunzel-like hair'], negative: ['short hair', 'medium hair'], weight: 1.6, fantasy: true }
            },
            scaleLabels: ['光頭', '超短', '短髮', '中長', '長髮', '超長', '🔮 拖地']
        },
        PONYTAIL_HEIGHT: {
            id: 'ponytail_height',
            label: '馬尾高度',
            en: 'Ponytail Height',
            icon: '📐',
            levels: {
                1: { zh: '超低馬尾', positive: ['very low ponytail', 'nape ponytail'], negative: [], weight: 1.0, fantasy: false },
                2: { zh: '低馬尾', positive: ['low ponytail'], negative: [], weight: 1.0, fantasy: false },
                3: { zh: '中馬尾', positive: ['ponytail', 'mid ponytail'], negative: [], weight: 1.0, fantasy: false },
                4: { zh: '高馬尾', positive: ['high ponytail'], negative: [], weight: 1.0, fantasy: false },
                5: { zh: '側馬尾', positive: ['side ponytail', 'one-side ponytail'], negative: [], weight: 1.0, fantasy: false }
            },
            scaleLabels: ['超低', '低', '中', '高', '側']
        },
        PONYTAIL_COUNT: {
            id: 'ponytail_count',
            label: '馬尾數量',
            en: 'Ponytail Count',
            icon: '🔢',
            levels: {
                1: { zh: '單馬尾', positive: ['single ponytail', 'ponytail'], negative: ['twin tails'], weight: 1.0, fantasy: false },
                2: { zh: '雙馬尾', positive: ['twin tails', 'twintails', 'pigtails'], negative: ['single ponytail'], weight: 1.0, fantasy: false },
                3: { zh: '三馬尾', positive: ['triple ponytails', 'three ponytails'], negative: [], weight: 1.2, fantasy: false },
                4: { zh: '🔮 多馬尾', positive: ['multiple ponytails', 'many ponytails'], negative: [], weight: 1.4, fantasy: true }
            },
            scaleLabels: ['單', '雙', '三', '🔮 多']
        }
    };

    // ── 所有髮型 Chip 項目 ──
    const ITEMS = [
        // ── 馬尾系 ponytail ──
        { id: 'high_ponytail', name: '高馬尾', en: 'High Ponytail', icon: '🐴', cat: 'ponytail', value: 'high ponytail' },
        { id: 'low_ponytail', name: '低馬尾', en: 'Low Ponytail', icon: '🐴', cat: 'ponytail', value: 'low ponytail' },
        { id: 'side_ponytail', name: '側馬尾', en: 'Side Ponytail', icon: '🐴', cat: 'ponytail', value: 'side ponytail' },
        { id: 'twin_tails', name: '雙馬尾', en: 'Twin Tails', icon: '🐴', cat: 'ponytail', value: 'twin tails, twintails' },
        { id: 'triple_tails', name: '三馬尾', en: 'Triple Tails', icon: '🐴', cat: 'ponytail', value: 'triple ponytails' },
        { id: 'short_ponytail', name: '短馬尾', en: 'Short Ponytail', icon: '🐴', cat: 'ponytail', value: 'short ponytail, stubby ponytail' },

        // ── 包頭系 buns ──
        { id: 'bun', name: '丸子頭', en: 'Bun', icon: '🎀', cat: 'buns', value: 'hair bun' },
        { id: 'twin_buns', name: '雙丸子', en: 'Twin Buns', icon: '🎀', cat: 'buns', value: 'twin buns, double buns, space buns' },
        { id: 'low_bun', name: '低包頭', en: 'Low Bun', icon: '🎀', cat: 'buns', value: 'low bun, chignon' },
        { id: 'chinese_buns', name: '中式雙髻', en: 'Chinese Buns', icon: '🎀', cat: 'buns', value: 'chinese double buns, ox horns hair, traditional chinese hairstyle' },
        { id: 'space_buns', name: '太空雙髻', en: 'Space Buns', icon: '🎀', cat: 'buns', value: 'space buns, futuristic double buns' },
        { id: 'half_up_bun', name: '半丸子頭', en: 'Half-Up Bun', icon: '🎀', cat: 'buns', value: 'half up bun, half updo' },
        { id: 'messy_bun', name: '慵懶丸子', en: 'Messy Bun', icon: '🎀', cat: 'buns', value: 'messy bun, loose bun' },
        { id: 'ballet_bun', name: '芭蕾髻', en: 'Ballet Bun', icon: '🎀', cat: 'buns', value: 'ballet bun, sleek bun, tight bun' },
        { id: 'topknot', name: '沖天髻', en: 'Topknot', icon: '🎀', cat: 'buns', value: 'topknot, samurai topknot' },

        // ── 辮子系 braids ──
        { id: 'single_braid', name: '單辮', en: 'Single Braid', icon: '🌀', cat: 'braids', value: 'single braid, one braid' },
        { id: 'twin_braids', name: '雙辮', en: 'Twin Braids', icon: '🌀', cat: 'braids', value: 'twin braids, double braids' },
        { id: 'french_braid', name: '法式編髮', en: 'French Braid', icon: '🌀', cat: 'braids', value: 'french braid' },
        { id: 'fishtail_braid', name: '魚骨辮', en: 'Fishtail Braid', icon: '🌀', cat: 'braids', value: 'fishtail braid' },
        { id: 'dutch_braid', name: '荷蘭辮', en: 'Dutch Braid', icon: '🌀', cat: 'braids', value: 'dutch braid, reverse french braid' },
        { id: 'side_braid', name: '側邊編髮', en: 'Side Braid', icon: '🌀', cat: 'braids', value: 'side braid' },
        { id: 'crown_braid', name: '皇冠編髮', en: 'Crown Braid', icon: '🌀', cat: 'braids', value: 'crown braid, milkmaid braid' },
        { id: 'dreadlocks', name: '髒辮', en: 'Dreadlocks', icon: '🌀', cat: 'braids', value: 'dreadlocks' },
        { id: 'cornrows', name: '地壟溝辮', en: 'Cornrows', icon: '🌀', cat: 'braids', value: 'cornrows, braided rows' },
        { id: 'waterfall_braid', name: '瀑布辮', en: 'Waterfall Braid', icon: '🌀', cat: 'braids', value: 'waterfall braid' },
        { id: 'box_braids', name: '方塊辮', en: 'Box Braids', icon: '🌀', cat: 'braids', value: 'box braids' },

        // ── 瀏海系 bangs ──
        { id: 'blunt_bangs', name: '齊瀏海', en: 'Blunt Bangs', icon: '✂️', cat: 'bangs', value: 'blunt bangs, straight bangs' },
        { id: 'side_bangs', name: '斜瀏海', en: 'Side Bangs', icon: '✂️', cat: 'bangs', value: 'side-swept bangs' },
        { id: 'air_bangs', name: '空氣瀏海', en: 'Air Bangs', icon: '✂️', cat: 'bangs', value: 'thin bangs, see-through bangs, wispy bangs' },
        { id: 'curtain_bangs', name: '窗簾瀏海', en: 'Curtain Bangs', icon: '✂️', cat: 'bangs', value: 'curtain bangs, parted bangs' },
        { id: 'long_bangs', name: '長瀏海', en: 'Long Bangs', icon: '✂️', cat: 'bangs', value: 'long bangs, eye-covering bangs' },
        { id: 'choppy_bangs', name: '參差瀏海', en: 'Choppy Bangs', icon: '✂️', cat: 'bangs', value: 'choppy bangs, uneven bangs' },
        { id: 'no_bangs', name: '無瀏海', en: 'No Bangs', icon: '✂️', cat: 'bangs', value: 'no bangs, forehead showing, hair pulled back' },
        { id: 'baby_bangs', name: '眉上短瀏海', en: 'Baby Bangs', icon: '✂️', cat: 'bangs', value: 'baby bangs, micro bangs, very short bangs' },

        // ── 流行/現代 modern ──
        { id: 'bob_cut', name: '波波頭', en: 'Bob Cut', icon: '💈', cat: 'modern', value: 'bob cut' },
        { id: 'lob', name: '長波波', en: 'Lob', icon: '💈', cat: 'modern', value: 'lob, long bob' },
        { id: 'pixie_cut', name: '精靈短髮', en: 'Pixie Cut', icon: '💈', cat: 'modern', value: 'pixie cut' },
        { id: 'wolf_cut', name: '狼尾剪', en: 'Wolf Cut', icon: '💈', cat: 'modern', value: 'wolf cut' },
        { id: 'shag_cut', name: '層次剪', en: 'Shag Cut', icon: '💈', cat: 'modern', value: 'shag cut, layered cut' },
        { id: 'undercut', name: '削邊上梳', en: 'Undercut', icon: '💈', cat: 'modern', value: 'undercut, shaved sides' },
        { id: 'fade_cut', name: '漸層推剪', en: 'Fade Cut', icon: '💈', cat: 'modern', value: 'fade cut, taper fade' },
        { id: 'two_block', name: '二分區', en: 'Two-Block', icon: '💈', cat: 'modern', value: 'two-block cut, korean two block' },
        { id: 'slicked_back', name: '油頭', en: 'Slicked Back', icon: '💈', cat: 'modern', value: 'slicked back hair, pomade' },
        { id: 'pompadour', name: '飛機頭', en: 'Pompadour', icon: '💈', cat: 'modern', value: 'pompadour' },
        { id: 'center_part', name: '中分', en: 'Center Part', icon: '💈', cat: 'modern', value: 'center-parted hair, middle part' },
        { id: 'side_part', name: '旁分', en: 'Side Part', icon: '💈', cat: 'modern', value: 'side part, side-parted hair' },
        { id: 'wavy_long', name: '波浪長髮', en: 'Wavy Long', icon: '💈', cat: 'modern', value: 'wavy long hair' },
        { id: 'curly_hair', name: '捲髮', en: 'Curly Hair', icon: '💈', cat: 'modern', value: 'curly hair, natural curls' },
        { id: 'straight_long', name: '長直髮', en: 'Long Straight', icon: '💈', cat: 'modern', value: 'long straight hair, silky straight hair' },
        { id: 'textured_crop', name: '短碎髮', en: 'Textured Crop', icon: '💈', cat: 'modern', value: 'textured crop, short textured hair' },
        { id: 'messy_short', name: '凌亂短髮', en: 'Messy Short', icon: '💈', cat: 'modern', value: 'messy short hair' },
        { id: 'bowl_cut', name: '蘑菇頭', en: 'Bowl Cut', icon: '💈', cat: 'modern', value: 'bowl cut, helmet hair' },
        { id: 'mullet', name: '鯔魚頭', en: 'Mullet', icon: '💈', cat: 'modern', value: 'mullet, business in front party in back' },
        { id: 'shaggy_hair', name: '日系微捲', en: 'Shaggy Hair', icon: '💈', cat: 'modern', value: 'shaggy hair, japanese messy perm' },
        { id: 'bedhead', name: '剛睡醒', en: 'Bedhead', icon: '💈', cat: 'modern', value: 'bedhead, just woke up, messy hair' },
        { id: 'buzz_cut', name: '寸頭', en: 'Buzz Cut', icon: '💈', cat: 'modern', value: 'buzz cut, military cut' },
        { id: 'asymmetrical', name: '不對稱髮', en: 'Asymmetrical', icon: '💈', cat: 'modern', value: 'asymmetrical hair, one side short one side long' },

        // ── 龐克/特殊 punk ──
        { id: 'mohawk', name: '莫霍克', en: 'Mohawk', icon: '🎸', cat: 'punk', value: 'mohawk, liberty spikes' },
        { id: 'faux_hawk', name: '仿莫霍克', en: 'Faux Hawk', icon: '🎸', cat: 'punk', value: 'faux hawk, fauxhawk' },
        { id: 'liberty_spikes', name: '自由刺', en: 'Liberty Spikes', icon: '🎸', cat: 'punk', value: 'liberty spikes, punk spikes, gel spikes' },
        { id: 'deathhawk', name: '死亡鷹', en: 'Deathhawk', icon: '🎸', cat: 'punk', value: 'deathhawk, goth mohawk, shaved sides long top' },
        { id: 'bald', name: '光頭', en: 'Bald', icon: '🎸', cat: 'punk', value: 'bald, shaved head' },
        { id: 'half_shaved', name: '半剃', en: 'Half Shaved', icon: '🎸', cat: 'punk', value: 'half-shaved head, one side shaved' },
        { id: 'afro', name: '爆炸頭', en: 'Afro', icon: '🎸', cat: 'punk', value: 'afro, big afro hair' },
        { id: 'spiky_hair', name: '刺蝟頭', en: 'Spiky Hair', icon: '🎸', cat: 'punk', value: 'spiky hair, gel spikes' },
        { id: 'cloud_hair', name: '雲朵燙', en: 'Cloud Hair', icon: '🎸', cat: 'punk', value: 'cloud hair, cotton candy hair, puffy curls' },

        // ── 動漫 anime ──
        { id: 'hime_cut', name: '姬髮式', en: 'Hime Cut', icon: '🎌', cat: 'anime', value: 'hime cut, straight bangs with sidelocks' },
        { id: 'drill_hair', name: '鑽頭捲', en: 'Drill Hair', icon: '🎌', cat: 'anime', value: 'drill hair, ringlet curls, ojou-sama curls' },
        { id: 'ahoge', name: '呆毛', en: 'Ahoge', icon: '🎌', cat: 'anime', value: 'ahoge, antenna hair, cowlick' },
        { id: 'twin_drills', name: '雙鑽頭捲', en: 'Twin Drills', icon: '🎌', cat: 'anime', value: 'twin drill hair, double ringlets' },
        { id: 'odango', name: '丸子包', en: 'Odango', icon: '🎌', cat: 'anime', value: 'odango, sailor moon hair, twin buns with tails' },
        { id: 'antenna_hair', name: '觸角髮', en: 'Antenna Hair', icon: '🎌', cat: 'anime', value: 'antenna hair, sticking up hair strands' },
        { id: 'anime_spiky', name: '動漫刺蝟', en: 'Anime Spiky', icon: '🎌', cat: 'anime', value: 'anime protagonist hair, wild spiky hair, gravity-defying hair' },
        { id: 'floating_hair', name: '漂浮長髮', en: 'Floating Hair', icon: '🎌', cat: 'anime', value: 'floating hair, wind-blown hair, hair floating upward' },
        { id: 'very_long_anime', name: '超長飄逸', en: 'Flowing Hair', icon: '🎌', cat: 'anime', value: 'very long flowing hair, ethereal long hair, magical flowing hair' },
        { id: 'gradient_tips', name: '漸層髮尾', en: 'Gradient Tips', icon: '🎌', cat: 'anime', value: 'gradient hair tips, ombre hair, colored hair tips' }
    ];

    // ── 熱門列表 ──
    const HOT_ITEMS = [
        'twin_tails', 'straight_long', 'bob_cut', 'high_ponytail', 'hime_cut',
        'wavy_long', 'bun', 'twin_buns', 'french_braid', 'pixie_cut',
        'blunt_bangs', 'air_bangs', 'side_ponytail', 'wolf_cut', 'drill_hair'
    ];

    // ── 快速預設組合 ──
    const PRESETS = {
        // 女性常用
        school_girl: { length: 5, items: ['twin_tails', 'blunt_bangs'], label: '🎀 學生妹', desc: '長髮雙馬尾+齊瀏海' },
        idol: { length: 5, items: ['side_ponytail', 'air_bangs'], label: '🎤 偶像', desc: '側馬尾+空氣瀏海' },
        princess: { length: 6, items: ['hime_cut'], label: '👑 公主', desc: '超長姬髮式' },
        warrior: { length: 4, items: ['single_braid'], label: '⚔️ 女戰士', desc: '中長辮子' },
        modern_girl: { length: 4, items: ['bob_cut', 'curtain_bangs'], label: '💈 時尚女', desc: '波波頭+窗簾瀏海' },
        goth: { length: 6, items: ['straight_long', 'blunt_bangs'], label: '🖤 哥德', desc: '超長直髮+齊瀏海' },
        cute: { length: 4, items: ['twin_buns', 'air_bangs'], label: '🌸 可愛', desc: '雙丸子+空氣瀏海' },
        // 男性常用
        hero: { length: 3, items: ['spiky_hair'], label: '🦸 英雄', desc: '短刺蝟頭' },
        samurai: { length: 5, items: ['topknot'], label: '⚔️ 武士', desc: '武士頭' },
        cool_guy: { length: 3, items: ['undercut'], label: '😎 酷哥', desc: '削邊上梳' },
        kpop: { length: 4, items: ['two_block', 'curtain_bangs'], label: '🇰🇷 韓系', desc: '二分區+窗簾瀏海' }
    };

    // ── 衝突規則 ──
    const CONFLICTS = [
        // 光頭不能有瀏海或馬尾
        { slider: 'hair_length', sliderValue: 1, blockedCats: ['bangs', 'ponytail', 'buns', 'braids'], reason: '光頭無法搭配頭髮相關款式' },
        { slider: 'hair_length', sliderValue: 2, blockedCats: ['ponytail', 'buns', 'braids'], reason: '超短髮無法做馬尾或包頭' },
        // 互斥項目
        { itemA: 'bald', blockedCats: ['bangs', 'ponytail', 'buns', 'braids', 'anime'], reason: '光頭不能搭配任何髮型' }
    ];

    return {
        CATEGORIES,
        SLIDERS,
        ITEMS,
        HOT_ITEMS,
        PRESETS,
        CONFLICTS
    };
})();
