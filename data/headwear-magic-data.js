// ============================================
// AI Prompt Generator — Headwear Magic 資料
// 頭飾九大分類 + 加分特徵
// 掛載至 window.PromptGen.HeadwearMagicData
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.HeadwearMagicData = (function () {

    // ── 分類 Tab 定義 ──
    const CATEGORIES = [
        { id: 'all', icon: '🌐', label: '全部', en: 'All' },
        { id: 'recent', icon: '📋', label: '最近', en: 'Recent' },
        { id: 'hot', icon: '🔥', label: '熱門', en: 'Hot' },
        { id: 'hair_acc', icon: '🎀', label: '髮飾', en: 'Hair Acc' },
        { id: 'piercing', icon: '💎', label: '穿刺', en: 'Piercing' },
        { id: 'hat', icon: '🎩', label: '帽子', en: 'Hat' },
        { id: 'neck', icon: '🧣', label: '圍巾頸部', en: 'Neck' },
        { id: 'face', icon: '🎭', label: '面部覆蓋', en: 'Face' },
        { id: 'device', icon: '🥽', label: '頭部裝置', en: 'Device' },
        { id: 'animal', icon: '🐱', label: '動物異種', en: 'Animal' },
        { id: 'ritual', icon: '👑', label: '宗教儀式', en: 'Ritual' },
        { id: 'energy', icon: '✨', label: '特殊能量', en: 'Energy' }
    ];

    // ── 所有頭飾 Chip 項目 ──
    const ITEMS = [
        // ══════════════════════════════════
        // ── 髮飾 hair_acc（9 件）──
        // ══════════════════════════════════
        { id: 'hair_clip', name: '髮夾', en: 'Hair Clip', icon: '📎', cat: 'hair_acc', value: 'hair clip, hair pin' },
        { id: 'hair_bow', name: '蝴蝶結髮飾', en: 'Hair Bow', icon: '🎀', cat: 'hair_acc', value: 'hair bow, ribbon bow in hair' },
        { id: 'scrunchie', name: '髮圈', en: 'Scrunchie', icon: '⭕', cat: 'hair_acc', value: 'scrunchie, hair tie' },
        { id: 'headband', name: '髮箍', en: 'Headband', icon: '👸', cat: 'hair_acc', value: 'headband' },
        { id: 'hair_band', name: '髮帶', en: 'Hair Band', icon: '🎗️', cat: 'hair_acc', value: 'hair band, fabric hair band' },
        { id: 'hair_ribbon', name: '絲帶', en: 'Hair Ribbon', icon: '🎀', cat: 'hair_acc', value: 'hair ribbon, silk ribbon in hair' },
        { id: 'mini_tiara', name: '皇冠小飾', en: 'Mini Tiara', icon: '👑', cat: 'hair_acc', value: 'mini tiara, small crown hair accessory' },
        { id: 'flower_hair', name: '花朵髮飾', en: 'Flower Hair Acc', icon: '🌸', cat: 'hair_acc', value: 'flower hair accessory, floral hair ornament' },
        { id: 'pearl_pin', name: '珍珠髮飾', en: 'Pearl Hair Pin', icon: '🤍', cat: 'hair_acc', value: 'pearl hair pin, pearl hair ornament' },

        // ══════════════════════════════════
        // ── 穿刺飾品 piercing（5 件）──
        // ══════════════════════════════════
        { id: 'earrings', name: '耳環', en: 'Earrings', icon: '💎', cat: 'piercing', value: 'earrings' },
        { id: 'ear_cuff', name: '耳骨環', en: 'Ear Cuff', icon: '✨', cat: 'piercing', value: 'ear cuff, cartilage earring' },
        { id: 'nose_ring', name: '鼻環', en: 'Nose Ring', icon: '👃', cat: 'piercing', value: 'nose ring, nose piercing' },
        { id: 'lip_ring', name: '唇環', en: 'Lip Ring', icon: '💋', cat: 'piercing', value: 'lip ring, lip piercing' },
        { id: 'eyebrow_piercing', name: '眉環', en: 'Eyebrow Piercing', icon: '⚡', cat: 'piercing', value: 'eyebrow piercing, eyebrow ring' },

        // ══════════════════════════════════
        // ── 帽子 hat（8 件）──
        // ══════════════════════════════════
        { id: 'baseball_cap', name: '鴨舌帽', en: 'Baseball Cap', icon: '🧢', cat: 'hat', value: 'baseball cap' },
        { id: 'beret', name: '貝雷帽', en: 'Beret', icon: '🎨', cat: 'hat', value: 'beret' },
        { id: 'witch_hat', name: '巫師帽', en: 'Witch Hat', icon: '🧙', cat: 'hat', value: 'witch hat, wizard hat' },
        { id: 'straw_hat', name: '草帽', en: 'Straw Hat', icon: '👒', cat: 'hat', value: 'straw hat, sun hat' },
        { id: 'military_cap', name: '軍帽', en: 'Military Cap', icon: '🎖️', cat: 'hat', value: 'military cap, officer cap' },
        { id: 'bucket_hat', name: '漁夫帽', en: 'Bucket Hat', icon: '🎣', cat: 'hat', value: 'bucket hat, fisherman hat' },
        { id: 'top_hat', name: '高禮帽', en: 'Top Hat', icon: '🎩', cat: 'hat', value: 'top hat, formal hat' },
        { id: 'beanie', name: '毛帽', en: 'Beanie', icon: '🧶', cat: 'hat', value: 'beanie, knit cap, winter hat' },

        // ══════════════════════════════════
        // ── 圍巾與頸部 neck（5 件）──
        // ══════════════════════════════════
        { id: 'scarf', name: '圍巾', en: 'Scarf', icon: '🧣', cat: 'neck', value: 'scarf, winter scarf' },
        { id: 'neckerchief', name: '領巾', en: 'Neckerchief', icon: '🎗️', cat: 'neck', value: 'neckerchief, neck scarf' },
        { id: 'shawl', name: '披肩', en: 'Shawl', icon: '🧥', cat: 'neck', value: 'shawl, shoulder wrap' },
        { id: 'hooded_cloak', name: '斗篷帽', en: 'Hooded Cloak', icon: '🧙', cat: 'neck', value: 'hooded cloak, cloak with hood' },
        { id: 'bandana', name: '頭巾', en: 'Bandana', icon: '🏴', cat: 'neck', value: 'bandana, head bandana' },

        // ══════════════════════════════════
        // ── 面部覆蓋 face（6 件）──
        // ══════════════════════════════════
        { id: 'mask', name: '面具', en: 'Mask', icon: '🎭', cat: 'face', value: 'mask, masquerade mask' },
        { id: 'half_mask', name: '半面罩', en: 'Half Mask', icon: '🎭', cat: 'face', value: 'half mask, half face mask' },
        { id: 'eye_patch', name: '眼罩', en: 'Eye Patch', icon: '🏴‍☠️', cat: 'face', value: 'eye patch, eyepatch' },
        { id: 'veil', name: '面紗', en: 'Veil', icon: '👰', cat: 'face', value: 'veil, face veil' },
        { id: 'face_mask', name: '口罩', en: 'Face Mask', icon: '😷', cat: 'face', value: 'face mask, surgical mask' },
        { id: 'gas_mask', name: '防毒面具', en: 'Gas Mask', icon: '☣️', cat: 'face', value: 'gas mask, respirator mask' },

        // ══════════════════════════════════
        // ── 頭部裝置 device（5 件）──
        // ══════════════════════════════════
        { id: 'vr_headset', name: 'VR眼鏡', en: 'VR Headset', icon: '🥽', cat: 'device', value: 'VR headset, virtual reality goggles' },
        { id: 'tactical_headset', name: '戰術耳機', en: 'Tactical Headset', icon: '🎧', cat: 'device', value: 'tactical headset, military headphones' },
        { id: 'comm_earpiece', name: '通訊耳機', en: 'Comm Earpiece', icon: '📡', cat: 'device', value: 'communication earpiece, radio headset' },
        { id: 'cyber_eye', name: '賽博義眼', en: 'Cyber Eye', icon: '🤖', cat: 'device', value: 'cybernetic eye, cyber eye implant' },
        { id: 'goggles', name: '護目鏡', en: 'Goggles', icon: '🥽', cat: 'device', value: 'goggles, aviator goggles' },

        // ══════════════════════════════════
        // ── 動物 / 異種附加 animal（7 件）──
        // ══════════════════════════════════
        { id: 'cat_ears', name: '貓耳', en: 'Cat Ears', icon: '🐱', cat: 'animal', value: 'cat ears, nekomimi' },
        { id: 'fox_ears', name: '狐耳', en: 'Fox Ears', icon: '🦊', cat: 'animal', value: 'fox ears, kitsune ears' },
        { id: 'bunny_ears', name: '兔耳', en: 'Bunny Ears', icon: '🐰', cat: 'animal', value: 'bunny ears, rabbit ears headband' },
        { id: 'dragon_horns', name: '龍角', en: 'Dragon Horns', icon: '🐉', cat: 'animal', value: 'dragon horns' },
        { id: 'demon_horns', name: '惡魔角', en: 'Demon Horns', icon: '😈', cat: 'animal', value: 'demon horns, devil horns' },
        { id: 'angel_halo', name: '天使光環', en: 'Angel Halo', icon: '😇', cat: 'animal', value: 'angel halo, glowing halo above head' },
        { id: 'antlers', name: '鹿角', en: 'Antlers', icon: '🦌', cat: 'animal', value: 'antlers, deer antlers' },

        // ══════════════════════════════════
        // ── 宗教 / 儀式物 ritual（6 件）──
        // ══════════════════════════════════
        { id: 'crown', name: '王冠', en: 'Crown', icon: '👑', cat: 'ritual', value: 'crown, royal crown' },
        { id: 'papal_tiara', name: '教冠', en: 'Papal Tiara', icon: '⛪', cat: 'ritual', value: 'papal tiara, religious crown' },
        { id: 'bridal_veil', name: '頭紗', en: 'Bridal Veil', icon: '👰', cat: 'ritual', value: 'bridal veil, wedding veil' },
        { id: 'feather_crown', name: '羽毛冠', en: 'Feather Crown', icon: '🪶', cat: 'ritual', value: 'feather crown, feathered headdress' },
        { id: 'laurel_wreath', name: '月桂冠', en: 'Laurel Wreath', icon: '🌿', cat: 'ritual', value: 'laurel wreath, victory wreath' },
        { id: 'flower_crown', name: '花冠', en: 'Flower Crown', icon: '🌺', cat: 'ritual', value: 'flower crown, floral wreath' },

        // ══════════════════════════════════
        // ── 特殊能量 / 概念型 energy（5 件）──
        // ══════════════════════════════════
        { id: 'glowing_halo', name: '發光光環', en: 'Glowing Halo', icon: '💫', cat: 'energy', value: 'glowing halo, luminous ring above head' },
        { id: 'energy_flames', name: '能量火焰', en: 'Energy Flames', icon: '🔥', cat: 'energy', value: 'energy flames on head, fire crown, flaming hair' },
        { id: 'floating_runes', name: '漂浮符文', en: 'Floating Runes', icon: '🔮', cat: 'energy', value: 'floating runes around head, magic symbols' },
        { id: 'star_halo', name: '星辰光環', en: 'Star Halo', icon: '⭐', cat: 'energy', value: 'star halo, constellation crown, celestial ring' },
        { id: 'arc_crown', name: '電弧光圈', en: 'Arc Crown', icon: '⚡', cat: 'energy', value: 'electric arc crown, lightning halo, energy sparks' }
    ];

    // ── 熱門列表（20 件）──
    const HOT_ITEMS = [
        'cat_ears', 'hair_bow', 'crown', 'witch_hat', 'beret',
        'earrings', 'headband', 'bunny_ears', 'flower_crown', 'scarf',
        'mask', 'angel_halo', 'demon_horns', 'fox_ears', 'baseball_cap',
        'veil', 'goggles', 'dragon_horns', 'straw_hat', 'glowing_halo'
    ];

    // ── 加分特徵 ──
    const BONUS_TRAITS = {
        hair_acc: [
            { icon: '✨', zh: '鑲嵌寶石', en: 'jeweled, gemstone embedded' },
            { icon: '🌸', zh: '櫻花裝飾', en: 'cherry blossom decoration' },
            { icon: '🦋', zh: '蝴蝶造型', en: 'butterfly shaped' },
            { icon: '💎', zh: '水鑽點綴', en: 'rhinestone accent' },
            { icon: '🌙', zh: '月牙造型', en: 'crescent moon shaped' },
            { icon: '⭐', zh: '星星點綴', en: 'star accent' }
        ],
        piercing: [
            { icon: '💎', zh: '鑽石鑲嵌', en: 'diamond stud' },
            { icon: '🔗', zh: '鎖鏈連結', en: 'chain connected' },
            { icon: '🌙', zh: '月牙吊墜', en: 'crescent pendant' },
            { icon: '✝️', zh: '十字架墜', en: 'cross pendant' },
            { icon: '⭐', zh: '星形穿刺', en: 'star shaped piercing' }
        ],
        hat: [
            { icon: '🌸', zh: '花朵裝飾', en: 'flower decoration' },
            { icon: '🪶', zh: '羽毛裝飾', en: 'feather decoration' },
            { icon: '🎀', zh: '緞帶裝飾', en: 'ribbon decoration' },
            { icon: '⭐', zh: '徽章別針', en: 'badge pin' },
            { icon: '🔮', zh: '魔法符文', en: 'magic rune marking' },
            { icon: '✨', zh: '金色刺繡', en: 'gold embroidery' }
        ],
        neck: [
            { icon: '❄️', zh: '雪花圖案', en: 'snowflake pattern' },
            { icon: '🌈', zh: '彩虹色彩', en: 'rainbow colored' },
            { icon: '🧶', zh: '手工編織', en: 'handknit texture' },
            { icon: '✨', zh: '金線刺繡', en: 'gold thread embroidery' },
            { icon: '🪶', zh: '毛皮邊飾', en: 'fur trim' }
        ],
        face: [
            { icon: '🎭', zh: '金色紋飾', en: 'gold filigree pattern' },
            { icon: '💎', zh: '寶石鑲嵌', en: 'gemstone inlay' },
            { icon: '🕸️', zh: '蕾絲材質', en: 'lace material' },
            { icon: '🔮', zh: '發光效果', en: 'glowing effect' },
            { icon: '⚔️', zh: '戰損痕跡', en: 'battle-worn, scratched' },
            { icon: '🩸', zh: '血跡汙漬', en: 'blood stains' }
        ],
        device: [
            { icon: '💡', zh: 'LED 燈光', en: 'LED lights, glowing indicators' },
            { icon: '📡', zh: '天線裝置', en: 'antenna attachment' },
            { icon: '🔧', zh: '機械零件', en: 'mechanical parts, gears' },
            { icon: '⚡', zh: '電弧效果', en: 'electric arc effect' },
            { icon: '🌐', zh: '全息投影', en: 'holographic display' }
        ],
        animal: [
            { icon: '🐾', zh: '毛茸茸質感', en: 'fluffy, furry texture' },
            { icon: '✨', zh: '發光效果', en: 'glowing effect' },
            { icon: '🌸', zh: '花朵裝飾', en: 'flower decoration' },
            { icon: '🔗', zh: '金屬飾環', en: 'metal rings, chains' },
            { icon: '💎', zh: '寶石鑲嵌', en: 'gemstone embedded' },
            { icon: '🌙', zh: '月光輝映', en: 'moonlight glow' }
        ],
        ritual: [
            { icon: '💎', zh: '寶石鑲嵌', en: 'jeweled, gemstones' },
            { icon: '✨', zh: '金光閃耀', en: 'golden glow' },
            { icon: '🕊️', zh: '神聖光芒', en: 'holy light, divine aura' },
            { icon: '🌹', zh: '玫瑰裝飾', en: 'rose decoration' },
            { icon: '🪶', zh: '羽毛裝飾', en: 'feather ornament' },
            { icon: '🔮', zh: '魔法光環', en: 'magical aura' }
        ],
        energy: [
            { icon: '🌈', zh: '彩虹光譜', en: 'rainbow spectrum' },
            { icon: '💜', zh: '紫色能量', en: 'purple energy' },
            { icon: '❄️', zh: '冰霜粒子', en: 'ice frost particles' },
            { icon: '🔥', zh: '烈焰效果', en: 'intense flame effect' },
            { icon: '⚡', zh: '閃電環繞', en: 'lightning circling' },
            { icon: '🌀', zh: '漩渦扭曲', en: 'vortex distortion' }
        ]
    };

    return {
        CATEGORIES,
        ITEMS,
        HOT_ITEMS,
        BONUS_TRAITS
    };
})();
