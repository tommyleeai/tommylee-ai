// ============================================
// AI Prompt Generator — Outfit Magic 資料
// 服裝九大分類 + 加分特徵
// 掛載至 window.PromptGen.OutfitMagicData
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.OutfitMagicData = (function () {

    // ── 分類 Tab 定義 ──
    const CATEGORIES = [
        { id: 'all', icon: '🌐', label: '全部', en: 'All' },
        { id: 'recent', icon: '📋', label: '最近', en: 'Recent' },
        { id: 'hot', icon: '🔥', label: '熱門', en: 'Hot' },
        { id: 'daily', icon: '👕', label: '日常系', en: 'Daily' },
        { id: 'school', icon: '🎓', label: '校園系', en: 'School' },
        { id: 'combat', icon: '⚔️', label: '戰鬥系', en: 'Combat' },
        { id: 'fantasy', icon: '🧙', label: '奇幻系', en: 'Fantasy' },
        { id: 'ethnic', icon: '🏯', label: '民族風', en: 'Ethnic' },
        { id: 'idol', icon: '🎤', label: '舞台系', en: 'Stage' },
        { id: 'dark', icon: '🦇', label: '黑暗系', en: 'Dark' },
        { id: 'work', icon: '💼', label: '職業系', en: 'Work' },
        { id: 'swim', icon: '👙', label: '泳裝系', en: 'Swim' }
    ];

    // ── 所有服裝 Chip 項目 ──
    const ITEMS = [
        // ══════════════════════════════════
        // ── 現代日常系 daily（25 件）──
        // ══════════════════════════════════
        { id: 'tshirt', name: '休閒 T恤', en: 'T-shirt', icon: '👕', cat: 'daily', value: 'casual t-shirt' },
        { id: 'hoodie', name: '連帽衫', en: 'Hoodie', icon: '🧥', cat: 'daily', value: 'hoodie' },
        { id: 'sweater', name: '毛衣', en: 'Sweater', icon: '🧶', cat: 'daily', value: 'sweater' },
        { id: 'jeans', name: '牛仔褲', en: 'Jeans', icon: '👖', cat: 'daily', value: 'jeans' },
        { id: 'skirt', name: '裙子', en: 'Skirt', icon: '👗', cat: 'daily', value: 'skirt' },
        { id: 'shorts', name: '短褲', en: 'Shorts', icon: '🩳', cat: 'daily', value: 'shorts' },
        { id: 'sundress', name: '白色洋裝', en: 'Sundress', icon: '👗', cat: 'daily', value: 'white sundress' },
        { id: 'off_shoulder', name: '露肩上衣', en: 'Off-shoulder', icon: '👚', cat: 'daily', value: 'off-shoulder top' },
        { id: 'tank_top', name: '背心', en: 'Tank Top', icon: '🎽', cat: 'daily', value: 'tank top' },
        { id: 'crop_top', name: '短版上衣', en: 'Crop Top', icon: '👚', cat: 'daily', value: 'crop top, midriff' },
        { id: 'leather_jacket', name: '皮夾克', en: 'Leather Jacket', icon: '🧥', cat: 'daily', value: 'leather jacket' },
        { id: 'trench_coat', name: '風衣', en: 'Trench Coat', icon: '🧥', cat: 'daily', value: 'trench coat' },
        { id: 'cardigan', name: '針織衫', en: 'Cardigan', icon: '🧶', cat: 'daily', value: 'cardigan' },
        { id: 'streetwear', name: '街頭潮流', en: 'Streetwear', icon: '🛹', cat: 'daily', value: 'streetwear, urban fashion' },
        { id: 'sportswear', name: '運動服', en: 'Sportswear', icon: '🏃', cat: 'daily', value: 'sportswear, athletic wear' },
        { id: 'pajamas', name: '睡衣', en: 'Pajamas', icon: '😴', cat: 'daily', value: 'pajamas' },
        { id: 'overalls', name: '吊帶褲', en: 'Overalls', icon: '👖', cat: 'daily', value: 'overalls, dungarees' },
        { id: 'summer_dress', name: '夏日洋裝', en: 'Summer Dress', icon: '🌻', cat: 'daily', value: 'summer dress, floral dress' },
        { id: 'denim_jacket', name: '牛仔外套', en: 'Denim Jacket', icon: '🧥', cat: 'daily', value: 'denim jacket' },
        { id: 'polo_shirt', name: 'Polo衫', en: 'Polo Shirt', icon: '👕', cat: 'daily', value: 'polo shirt' },
        { id: 'maxi_dress', name: '長版洋裝', en: 'Maxi Dress', icon: '👗', cat: 'daily', value: 'maxi dress, long flowing dress' },
        { id: 'mini_skirt', name: '迷你裙', en: 'Mini Skirt', icon: '👗', cat: 'daily', value: 'mini skirt' },
        { id: 'pleated_skirt', name: '百褶裙', en: 'Pleated Skirt', icon: '👗', cat: 'daily', value: 'pleated skirt' },
        { id: 'camisole', name: '細肩帶上衣', en: 'Camisole', icon: '👚', cat: 'daily', value: 'camisole, spaghetti strap top' },
        { id: 'bomber_jacket', name: '飛行夾克', en: 'Bomber Jacket', icon: '🧥', cat: 'daily', value: 'bomber jacket' },
        { id: 'turtleneck', name: '高領毛衣', en: 'Turtleneck', icon: '🧶', cat: 'daily', value: 'turtleneck sweater' },
        { id: 'blouse', name: '女性襯衫', en: 'Blouse', icon: '👚', cat: 'daily', value: 'blouse, elegant shirt' },
        { id: 'jumpsuit', name: '連身褲', en: 'Jumpsuit', icon: '👗', cat: 'daily', value: 'jumpsuit, one-piece outfit' },
        { id: 'parka', name: '連帽大衣', en: 'Parka', icon: '🧥', cat: 'daily', value: 'parka, hooded winter coat' },
        { id: 'yoga_pants', name: '瑜伽褲', en: 'Yoga Pants', icon: '🧘', cat: 'daily', value: 'yoga pants, leggings' },

        // ══════════════════════════════════
        // ── 校園制服系 school（18 件）──
        // ══════════════════════════════════
        { id: 'sailor_uniform', name: '水手服', en: 'Sailor Uniform', icon: '⚓', cat: 'school', value: 'sailor uniform' },
        { id: 'blazer_uniform', name: '西裝校服', en: 'Blazer Uniform', icon: '🎓', cat: 'school', value: 'blazer school uniform' },
        { id: 'gakuran', name: '詰襟（男）', en: 'Gakuran', icon: '🎓', cat: 'school', value: 'gakuran, japanese male school uniform' },
        { id: 'gym_clothes', name: '體操服', en: 'Gym Clothes', icon: '🏃', cat: 'school', value: 'gym clothes, bloomers' },
        { id: 'school_swimsuit', name: '學校泳裝', en: 'School Swimsuit', icon: '🏊', cat: 'school', value: 'school swimsuit, competition swimsuit' },
        { id: 'summer_uniform', name: '夏季制服', en: 'Summer Uniform', icon: '☀️', cat: 'school', value: 'summer school uniform, short sleeve uniform' },
        { id: 'winter_uniform', name: '冬季制服', en: 'Winter Uniform', icon: '❄️', cat: 'school', value: 'winter school uniform, long sleeve uniform, school cardigan' },
        { id: 'academy_coat', name: '學院風大衣', en: 'Academy Coat', icon: '🧥', cat: 'school', value: 'academy coat, school overcoat' },
        { id: 'cheerleader', name: '啦啦隊服', en: 'Cheerleader', icon: '📣', cat: 'school', value: 'cheerleader outfit, cheerleading uniform' },
        { id: 'pe_uniform', name: '體育服', en: 'PE Uniform', icon: '⚽', cat: 'school', value: 'PE uniform, jersey, athletic shorts' },
        { id: 'school_vest', name: '制服背心', en: 'School Vest', icon: '🎓', cat: 'school', value: 'school sweater vest, uniform vest' },
        { id: 'school_ribbon', name: '領結制服', en: 'Ribbon Uniform', icon: '🎀', cat: 'school', value: 'school uniform with ribbon tie, bow tie uniform' },
        { id: 'sailor_collar', name: '大翻領水手', en: 'Wide Sailor Collar', icon: '⚓', cat: 'school', value: 'wide sailor collar uniform, large collar' },
        { id: 'school_cardigan', name: '學院針織', en: 'School Cardigan', icon: '🧶', cat: 'school', value: 'school cardigan, uniform cardigan, over shoulder' },
        { id: 'school_jersey', name: '運動外套', en: 'Track Jacket', icon: '🏃', cat: 'school', value: 'school track jacket, athletic jersey' },
        { id: 'boarding_school', name: '寄宿學校服', en: 'Boarding School', icon: '🏫', cat: 'school', value: 'english boarding school uniform, preppy uniform, plaid skirt' },
        { id: 'school_apron', name: '圍裙制服', en: 'Apron Uniform', icon: '🧑‍🍳', cat: 'school', value: 'cooking class apron over uniform' },
        { id: 'graduation_gown', name: '學士服', en: 'Graduation Gown', icon: '🎓', cat: 'school', value: 'graduation gown, academic cap' },

        // ══════════════════════════════════
        // ── 戰鬥裝備系 combat（20 件）──
        // ══════════════════════════════════
        { id: 'full_plate', name: '全身板甲', en: 'Full Plate Armor', icon: '🛡️', cat: 'combat', value: 'full plate armor, heavy armor' },
        { id: 'leather_armor', name: '皮革輕甲', en: 'Leather Armor', icon: '🥊', cat: 'combat', value: 'leather armor, light armor' },
        { id: 'chainmail', name: '鏈甲', en: 'Chainmail', icon: '⛓️', cat: 'combat', value: 'chainmail, chain armor' },
        { id: 'tactical_vest', name: '戰術背心', en: 'Tactical Vest', icon: '🎯', cat: 'combat', value: 'tactical vest, military vest, combat gear' },
        { id: 'power_armor', name: '動力裝甲', en: 'Power Armor', icon: '🤖', cat: 'combat', value: 'sci-fi power armor, mecha suit' },
        { id: 'mecha_pilot', name: '機甲駕駛服', en: 'Mecha Pilot Suit', icon: '🚀', cat: 'combat', value: 'mecha pilot suit, flight suit' },
        { id: 'ninja_outfit', name: '忍者服', en: 'Ninja Outfit', icon: '🥷', cat: 'combat', value: 'ninja outfit, shinobi garb' },
        { id: 'samurai_armor', name: '武士甲冑', en: 'Samurai Armor', icon: '⚔️', cat: 'combat', value: 'samurai armor, japanese armor, yoroi' },
        { id: 'assassin_garb', name: '刺客服', en: 'Assassin Garb', icon: '🗡️', cat: 'combat', value: 'assassin garb, hooded cloak, dark leather' },
        { id: 'battle_dress', name: '戰鬥裙裝', en: 'Battle Dress', icon: '⚔️', cat: 'combat', value: 'battle dress, armored skirt, combat skirt' },
        { id: 'military_uniform', name: '軍裝', en: 'Military Uniform', icon: '🎖️', cat: 'combat', value: 'military uniform, army uniform' },
        { id: 'pirate_outfit', name: '海盜裝', en: 'Pirate Outfit', icon: '🏴‍☠️', cat: 'combat', value: 'pirate outfit, buccaneer clothing' },
        { id: 'gladiator', name: '角鬥士甲', en: 'Gladiator Armor', icon: '🏟️', cat: 'combat', value: 'gladiator armor, roman gladiator outfit' },
        { id: 'scale_armor', name: '鱗甲', en: 'Scale Armor', icon: '🐉', cat: 'combat', value: 'scale armor, dragon scale armor' },
        { id: 'bikini_armor', name: '比基尼甲', en: 'Bikini Armor', icon: '👙', cat: 'combat', value: 'bikini armor, fantasy bikini armor, revealing armor' },
        { id: 'spartan_armor', name: '斯巴達戰甲', en: 'Spartan Armor', icon: '🏛️', cat: 'combat', value: 'spartan armor, greek warrior armor, red cape' },
        { id: 'knight_dress', name: '騎士禮裝', en: 'Knight Dress', icon: '🛡️', cat: 'combat', value: 'knight dress, tabard over armor, heraldic' },
        { id: 'camo_outfit', name: '迷彩服', en: 'Camouflage', icon: '🌿', cat: 'combat', value: 'camouflage outfit, military camo, jungle camo' },
        { id: 'valkyrie_armor', name: '女武神甲', en: 'Valkyrie Armor', icon: '🦅', cat: 'combat', value: 'valkyrie armor, winged helmet, norse warrior' },
        { id: 'wuxia_outfit', name: '武俠服', en: 'Wuxia Outfit', icon: '🥋', cat: 'combat', value: 'wuxia outfit, chinese martial arts clothing' },

        // ══════════════════════════════════
        // ── 奇幻職業系 fantasy（22 件）──
        // ══════════════════════════════════
        { id: 'mage_robe', name: '法師袍', en: 'Mage Robe', icon: '🧙', cat: 'fantasy', value: 'mage robe, wizard robe' },
        { id: 'priest_vestment', name: '祭司服', en: 'Priest Vestment', icon: '⛪', cat: 'fantasy', value: 'priest vestment, holy robes' },
        { id: 'rogue_leather', name: '盜賊皮裝', en: 'Rogue Leather', icon: '🗝️', cat: 'fantasy', value: 'rogue leather armor, thief outfit' },
        { id: 'ranger_garb', name: '遊俠裝', en: 'Ranger Garb', icon: '🏹', cat: 'fantasy', value: 'ranger garb, forest cloak, archer outfit' },
        { id: 'blacksmith_apron', name: '鍛造師圍裙', en: 'Blacksmith Apron', icon: '🔨', cat: 'fantasy', value: 'blacksmith apron, forge outfit' },
        { id: 'bard_outfit', name: '吟遊詩人裝', en: 'Bard Outfit', icon: '🎵', cat: 'fantasy', value: 'bard outfit, minstrel clothing' },
        { id: 'paladin_armor', name: '聖騎士禮甲', en: 'Paladin Armor', icon: '🛡️', cat: 'fantasy', value: 'paladin armor, holy knight armor, white armor' },
        { id: 'necro_robe', name: '死靈法師暗袍', en: 'Necromancer Robe', icon: '💀', cat: 'fantasy', value: 'necromancer robe, dark mage robe' },
        { id: 'witch_robe', name: '魔女袍', en: 'Witch Robe', icon: '🧹', cat: 'fantasy', value: 'witch robe, witch hat, witch outfit' },
        { id: 'alchemist_coat', name: '鍊金術師袍', en: 'Alchemist Coat', icon: '⚗️', cat: 'fantasy', value: 'alchemist coat, laboratory coat' },
        { id: 'druid_garb', name: '德魯伊裝', en: 'Druid Garb', icon: '🌿', cat: 'fantasy', value: 'druid garb, nature robes, leaf clothing' },
        { id: 'warlock_robe', name: '術士長袍', en: 'Warlock Robe', icon: '🔮', cat: 'fantasy', value: 'warlock robe, dark sorcerer clothing' },
        { id: 'fairy_dress', name: '妖精裝', en: 'Fairy Dress', icon: '🧚', cat: 'fantasy', value: 'fairy dress, ethereal gown, translucent wings' },
        { id: 'elf_robe', name: '精靈長袍', en: 'Elven Robe', icon: '🌲', cat: 'fantasy', value: 'elven robe, high elf clothing, elegant green robe' },
        { id: 'demon_suit', name: '魔族服', en: 'Demon Outfit', icon: '😈', cat: 'fantasy', value: 'demon outfit, succubus clothing, demonic attire' },
        { id: 'angel_robe', name: '天使袍', en: 'Angel Robe', icon: '😇', cat: 'fantasy', value: 'angel robe, divine white robes, holy aura' },
        { id: 'summoner_robe', name: '召喚師裝', en: 'Summoner Robe', icon: '✨', cat: 'fantasy', value: 'summoner robe, runic markings, magic circle' },
        { id: 'enchantress_gown', name: '女巫禮服', en: 'Enchantress Gown', icon: '🌙', cat: 'fantasy', value: 'enchantress gown, bewitching dress, moonlit robes' },
        { id: 'monk_outfit', name: '修道武僧服', en: 'Monk Outfit', icon: '🥋', cat: 'fantasy', value: 'monk outfit, martial arts gi, buddhist robes' },
        { id: 'shaman_garb', name: '薩滿裝', en: 'Shaman Garb', icon: '🦅', cat: 'fantasy', value: 'shaman garb, spirit caller, tribal ritual clothing' },
        { id: 'royal_robe', name: '女王禮袍', en: 'Royal Robe', icon: '👑', cat: 'fantasy', value: 'royal robe, queen gown, crown, scepter' },
        { id: 'pirate_captain', name: '海盜船長服', en: 'Pirate Captain', icon: '🏴‍☠️', cat: 'fantasy', value: 'pirate captain coat, tricorne hat, gold embroidery' },

        // ══════════════════════════════════
        // ── 傳統民族風 ethnic（20 件）──
        // ══════════════════════════════════
        { id: 'kimono', name: '和服', en: 'Kimono', icon: '🎌', cat: 'ethnic', value: 'kimono' },
        { id: 'yukata', name: '浴衣', en: 'Yukata', icon: '🎌', cat: 'ethnic', value: 'yukata' },
        { id: 'hanfu', name: '漢服', en: 'Hanfu', icon: '🏯', cat: 'ethnic', value: 'hanfu, chinese traditional clothing' },
        { id: 'cheongsam', name: '旗袍', en: 'Cheongsam', icon: '🏯', cat: 'ethnic', value: 'chinese dress (qipao)' },
        { id: 'hanbok', name: '韓服', en: 'Hanbok', icon: '🇰🇷', cat: 'ethnic', value: 'hanbok, korean traditional clothing' },
        { id: 'sari', name: '印度紗麗', en: 'Sari', icon: '🇮🇳', cat: 'ethnic', value: 'indian sari, traditional indian dress' },
        { id: 'medieval_gown', name: '中世紀禮服', en: 'Medieval Gown', icon: '🏰', cat: 'ethnic', value: 'medieval gown, european medieval dress' },
        { id: 'viking_garb', name: '維京裝', en: 'Viking Garb', icon: '🪓', cat: 'ethnic', value: 'viking clothing, norse outfit, fur cloak' },
        { id: 'egyptian', name: '埃及風', en: 'Egyptian', icon: '🏛️', cat: 'ethnic', value: 'ancient egyptian clothing, pharaoh outfit' },
        { id: 'arabian', name: '阿拉伯風', en: 'Arabian', icon: '🕌', cat: 'ethnic', value: 'arabian clothing, middle eastern outfit' },
        { id: 'miko', name: '巫女服', en: 'Miko', icon: '⛩️', cat: 'ethnic', value: 'miko outfit, shrine maiden' },
        { id: 'ao_dai', name: '越南奧黛', en: 'Ao Dai', icon: '🇻🇳', cat: 'ethnic', value: 'ao dai, vietnamese traditional dress' },
        { id: 'dirndl', name: '德式圍裙裝', en: 'Dirndl', icon: '🍺', cat: 'ethnic', value: 'dirndl, bavarian traditional dress' },
        { id: 'flamenco', name: '佛朗明哥裙', en: 'Flamenco Dress', icon: '💃', cat: 'ethnic', value: 'flamenco dress, spanish traditional, ruffled dress' },
        { id: 'scottish_kilt', name: '蘇格蘭裙', en: 'Scottish Kilt', icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', cat: 'ethnic', value: 'scottish kilt, tartan plaid' },
        { id: 'toga', name: '羅馬長袍', en: 'Roman Toga', icon: '🏛️', cat: 'ethnic', value: 'roman toga, draped white cloth, ancient roman' },
        { id: 'thai_dress', name: '泰國傳統服', en: 'Thai Dress', icon: '🇹🇭', cat: 'ethnic', value: 'thai traditional dress, thai silk, gold accessories' },
        { id: 'russian_sarafan', name: '俄式連衣裙', en: 'Russian Sarafan', icon: '🇷🇺', cat: 'ethnic', value: 'russian sarafan, traditional russian dress, embroidered' },
        { id: 'greek_chiton', name: '希臘長裙', en: 'Greek Chiton', icon: '🏛️', cat: 'ethnic', value: 'greek chiton, draped greek dress, ancient greece' },
        { id: 'aztec_outfit', name: '阿茲特克服', en: 'Aztec Outfit', icon: '🌽', cat: 'ethnic', value: 'aztec clothing, mesoamerican outfit, feathered headdress' },

        // ══════════════════════════════════
        // ── 偶像舞台系 idol（18 件）──
        // ══════════════════════════════════
        { id: 'idol_costume', name: '偶像制服', en: 'Idol Costume', icon: '🎤', cat: 'idol', value: 'idol costume, idol outfit, frilly stage costume' },
        { id: 'magical_girl', name: '魔法少女裝', en: 'Magical Girl', icon: '💖', cat: 'idol', value: 'magical girl outfit, mahou shoujo costume' },
        { id: 'concert_dress', name: '演唱會服', en: 'Concert Dress', icon: '🎶', cat: 'idol', value: 'concert dress, stage performance outfit' },
        { id: 'gothic_lolita', name: '哥德蘿莉', en: 'Gothic Lolita', icon: '🖤', cat: 'idol', value: 'gothic lolita dress' },
        { id: 'sweet_lolita', name: '甜系蘿莉', en: 'Sweet Lolita', icon: '🍰', cat: 'idol', value: 'sweet lolita dress, pastel lolita' },
        { id: 'classic_lolita', name: '古典蘿莉', en: 'Classic Lolita', icon: '🌹', cat: 'idol', value: 'classic lolita dress, elegant lolita' },
        { id: 'bunny_suit', name: '兔女郎', en: 'Bunny Suit', icon: '🐰', cat: 'idol', value: 'bunny suit, bunny girl outfit' },
        { id: 'princess_dress', name: '公主禮服', en: 'Princess Dress', icon: '👸', cat: 'idol', value: 'princess dress, ball gown' },
        { id: 'dance_costume', name: '舞蹈服', en: 'Dance Costume', icon: '💃', cat: 'idol', value: 'dance costume, ballet outfit' },
        { id: 'cosplay', name: 'Cosplay', en: 'Cosplay', icon: '🎭', cat: 'idol', value: 'cosplay outfit, costume play' },
        { id: 'wedding_dress', name: '婚紗', en: 'Wedding Dress', icon: '💒', cat: 'idol', value: 'wedding dress, bridal gown, white wedding veil' },
        { id: 'evening_gown', name: '晚禮服', en: 'Evening Gown', icon: '🌟', cat: 'idol', value: 'evening gown, elegant formal dress' },
        { id: 'pop_star', name: '流行巨星裝', en: 'Pop Star', icon: '⭐', cat: 'idol', value: 'pop star outfit, flashy performance wear, sequins' },
        { id: 'ballet_tutu', name: '芭蕾舞裙', en: 'Ballet Tutu', icon: '🩰', cat: 'idol', value: 'ballet tutu, ballerina outfit, pointe shoes' },
        { id: 'figure_skate', name: '花式滑冰服', en: 'Figure Skating', icon: '⛸️', cat: 'idol', value: 'figure skating costume, sparkly leotard, ice skating' },
        { id: 'race_queen', name: '賽車女郎', en: 'Race Queen', icon: '🏎️', cat: 'idol', value: 'race queen outfit, grid girl costume, high boots' },
        { id: 'wa_lolita', name: '和風蘿莉', en: 'Wa Lolita', icon: '🎌', cat: 'idol', value: 'wa lolita, japanese-style lolita, kimono lolita' },
        { id: 'china_dress', name: '中華風禮裝', en: 'China Dress', icon: '🐲', cat: 'idol', value: 'china dress, chinese style evening dress, side slit' },

        // ══════════════════════════════════
        // ── 黑暗反派系 dark（18 件）──
        // ══════════════════════════════════
        { id: 'black_robe', name: '黑袍', en: 'Dark Robe', icon: '🦇', cat: 'dark', value: 'dark robe, black hooded robe' },
        { id: 'gothic_coat', name: '哥德風大衣', en: 'Gothic Coat', icon: '🖤', cat: 'dark', value: 'gothic coat, long black coat, victorian coat' },
        { id: 'dark_royalty', name: '暗黑王族服', en: 'Dark Royalty', icon: '👑', cat: 'dark', value: 'dark royal clothing, evil queen dress, dark emperor outfit' },
        { id: 'cult_robe', name: '邪教祭司服', en: 'Cult Priest Robe', icon: '🕯️', cat: 'dark', value: 'cult robe, dark priest vestment, ritual clothing' },
        { id: 'vampire_coat', name: '吸血鬼大衣', en: 'Vampire Coat', icon: '🧛', cat: 'dark', value: 'vampire coat, dracula cape, aristocratic dark attire' },
        { id: 'reaper_cloak', name: '死神斗篷', en: 'Reaper Cloak', icon: '💀', cat: 'dark', value: 'grim reaper cloak, death shroud, tattered black cloak' },
        { id: 'fallen_angel', name: '墮落天使裝', en: 'Fallen Angel', icon: '😈', cat: 'dark', value: 'fallen angel outfit, black feathered wings, dark angelic armor' },
        { id: 'demon_armor', name: '魔王鎧甲', en: 'Demon Armor', icon: '👿', cat: 'dark', value: 'demon lord armor, demonic armor, spiked dark armor' },
        { id: 'shadow_assassin', name: '暗影殺手', en: 'Shadow Assassin', icon: '🌑', cat: 'dark', value: 'shadow assassin outfit, all-black stealth suit' },
        { id: 'bondage_suit', name: '束縛裝', en: 'Bondage Outfit', icon: '⛓️', cat: 'dark', value: 'leather straps, buckled outfit, dark leather bodysuit' },
        { id: 'dark_witch', name: '暗黑女巫', en: 'Dark Witch', icon: '🌘', cat: 'dark', value: 'dark witch outfit, black corset, torn lace, dark magic' },
        { id: 'lich_robe', name: '巫妖袍', en: 'Lich Robe', icon: '💀', cat: 'dark', value: 'lich robe, undead mage, glowing eyes, tattered ancient robe' },
        { id: 'plague_doctor', name: '瘟疫醫生', en: 'Plague Doctor', icon: '🎭', cat: 'dark', value: 'plague doctor outfit, beaked mask, dark coat' },
        { id: 'dark_knight', name: '黑騎士甲', en: 'Dark Knight', icon: '🗡️', cat: 'dark', value: 'dark knight armor, black full plate, menacing helmet' },
        { id: 'corrupted_angel', name: '墮天使戰甲', en: 'Corrupted Angel', icon: '👼', cat: 'dark', value: 'corrupted angel armor, broken halo, dark wings, cracked armor' },
        { id: 'void_mage', name: '虛空法師', en: 'Void Mage', icon: '🕳️', cat: 'dark', value: 'void mage robe, cosmic darkness, void energy particles' },
        { id: 'blood_knight', name: '血騎士', en: 'Blood Knight', icon: '🩸', cat: 'dark', value: 'blood knight armor, crimson armor, blood-stained cape' },
        { id: 'wraith_cloak', name: '幽魂斗篷', en: 'Wraith Cloak', icon: '👻', cat: 'dark', value: 'wraith cloak, ghostly shroud, translucent, ethereal' },

        // ══════════════════════════════════
        // ── 現實職業系 work（20 件）──
        // ══════════════════════════════════
        { id: 'office_suit', name: 'OL 套裝', en: 'Office Suit', icon: '💼', cat: 'work', value: 'office lady suit, business attire' },
        { id: 'nurse_uniform', name: '護士服', en: 'Nurse Uniform', icon: '🏥', cat: 'work', value: 'nurse uniform' },
        { id: 'flight_attendant', name: '空姐制服', en: 'Flight Attendant', icon: '✈️', cat: 'work', value: 'flight attendant uniform, airline stewardess' },
        { id: 'police_uniform', name: '警察制服', en: 'Police Uniform', icon: '🚔', cat: 'work', value: 'police uniform' },
        { id: 'officer_uniform', name: '軍官服', en: 'Officer Uniform', icon: '🎖️', cat: 'work', value: 'military officer uniform, naval officer dress' },
        { id: 'firefighter', name: '消防員裝', en: 'Firefighter', icon: '🚒', cat: 'work', value: 'firefighter outfit, firefighter uniform' },
        { id: 'chef_outfit', name: '廚師服', en: 'Chef Outfit', icon: '👨‍🍳', cat: 'work', value: 'chef outfit, chef hat, white coat' },
        { id: 'maid_outfit', name: '女僕裝', en: 'Maid Outfit', icon: '🧹', cat: 'work', value: 'maid apron, maid outfit, maid headband' },
        { id: 'nun_habit', name: '修女服', en: 'Nun Habit', icon: '✝️', cat: 'work', value: 'nun habit, religious habit' },
        { id: 'teacher_outfit', name: '教師裝', en: 'Teacher Outfit', icon: '📚', cat: 'work', value: 'teacher outfit, professional attire, glasses' },
        { id: 'mechanic_suit', name: '技工服', en: 'Mechanic Suit', icon: '🔧', cat: 'work', value: 'mechanic jumpsuit, coveralls, work gloves' },
        { id: 'doctor_coat', name: '醫生白袍', en: 'Doctor Coat', icon: '🩺', cat: 'work', value: 'doctor white coat, lab coat, stethoscope' },
        { id: 'waitress', name: '女服務生', en: 'Waitress', icon: '🍽️', cat: 'work', value: 'waitress uniform, cafe uniform, apron' },
        { id: 'secretary', name: '秘書裝', en: 'Secretary', icon: '📝', cat: 'work', value: 'secretary outfit, pencil skirt, blouse, glasses' },
        { id: 'scientist', name: '科學家', en: 'Scientist', icon: '🔬', cat: 'work', value: 'scientist lab coat, safety goggles, research outfit' },
        { id: 'shrine_maid', name: '神社侍女', en: 'Shrine Maid', icon: '⛩️', cat: 'work', value: 'shrine maid outfit, white and red miko variant' },
        { id: 'reporter', name: '記者裝', en: 'Reporter', icon: '📸', cat: 'work', value: 'reporter outfit, press badge, professional casual' },
        { id: 'bartender', name: '調酒師裝', en: 'Bartender', icon: '🍸', cat: 'work', value: 'bartender uniform, vest, bow tie, cocktail shaker' },
        { id: 'librarian', name: '圖書館員', en: 'Librarian', icon: '📖', cat: 'work', value: 'librarian outfit, glasses, book, cozy cardigan' },
        { id: 'delivery_girl', name: '外送員', en: 'Delivery Girl', icon: '📦', cat: 'work', value: 'delivery uniform, cap, package, courier outfit' },

        // ══════════════════════════════════
        // ── 泳裝系 swim（15 件）──
        // ══════════════════════════════════
        { id: 'bikini', name: '比基尼', en: 'Bikini', icon: '👙', cat: 'swim', value: 'bikini, swimsuit' },
        { id: 'one_piece_swim', name: '連身泳衣', en: 'One-piece Swimsuit', icon: '🩱', cat: 'swim', value: 'one-piece swimsuit' },
        { id: 'string_bikini', name: '細帶比基尼', en: 'String Bikini', icon: '👙', cat: 'swim', value: 'string bikini, micro bikini' },
        { id: 'halter_bikini', name: '繞頸比基尼', en: 'Halter Bikini', icon: '👙', cat: 'swim', value: 'halter neck bikini' },
        { id: 'sport_swim', name: '運動泳衣', en: 'Sports Swimsuit', icon: '🏊', cat: 'swim', value: 'sports swimsuit, athletic swimwear' },
        { id: 'bandeau_bikini', name: '抹胸比基尼', en: 'Bandeau Bikini', icon: '👙', cat: 'swim', value: 'bandeau bikini, strapless swimwear' },
        { id: 'high_waist_bikini', name: '高腰比基尼', en: 'High-waist Bikini', icon: '👙', cat: 'swim', value: 'high waist bikini, retro bikini' },
        { id: 'sarong', name: '沙龍裙', en: 'Sarong', icon: '🏖️', cat: 'swim', value: 'sarong wrap, beach skirt, pareo' },
        { id: 'rash_guard', name: '防曬衣', en: 'Rash Guard', icon: '🌊', cat: 'swim', value: 'rash guard, surf top, UV protection swimwear' },
        { id: 'monokini', name: '單件式泳裝', en: 'Monokini', icon: '👙', cat: 'swim', value: 'monokini, cutout swimsuit' },
        { id: 'beach_dress', name: '海灘罩衫', en: 'Beach Cover-up', icon: '🏖️', cat: 'swim', value: 'beach cover-up, sheer beach dress, kaftan' },
        { id: 'diving_suit', name: '潛水衣', en: 'Diving Suit', icon: '🤿', cat: 'swim', value: 'diving suit, wetsuit, scuba gear' },
        { id: 'surf_outfit', name: '衝浪裝', en: 'Surf Outfit', icon: '🏄', cat: 'swim', value: 'surf outfit, board shorts, surfboard' },
        { id: 'tankini', name: '背心泳裝', en: 'Tankini', icon: '🩱', cat: 'swim', value: 'tankini, tank top swimsuit' },
        { id: 'ruffle_bikini', name: '荷葉邊比基尼', en: 'Ruffle Bikini', icon: '🌺', cat: 'swim', value: 'ruffle bikini, frilly swimwear' },

    ];

    // ── 熱門列表（25 件）──
    const HOT_ITEMS = [
        'sailor_uniform', 'hoodie', 'kimono', 'maid_outfit', 'gothic_lolita',
        'sundress', 'blazer_uniform', 'office_suit', 'witch_robe', 'bunny_suit',
        'hanfu', 'cheongsam', 'sweater', 'full_plate', 'magical_girl',
        'ninja_outfit', 'police_uniform', 'nurse_uniform', 'black_robe', 'bikini',
        'wedding_dress', 'leather_jacket', 'pleated_skirt'
    ];

    // ── 加分特徵 ──
    const BONUS_TRAITS = {
        daily: [
            { icon: '🧢', zh: '棒球帽', en: 'baseball cap' },
            { icon: '🎒', zh: '背包', en: 'backpack' },
            { icon: '👟', zh: '運動鞋', en: 'sneakers' },
            { icon: '🕶️', zh: '墨鏡', en: 'sunglasses' },
            { icon: '📱', zh: '手持手機', en: 'holding phone' },
            { icon: '🎧', zh: '耳機', en: 'headphones' },
            { icon: '⌚', zh: '手錶', en: 'wristwatch' },
            { icon: '💄', zh: '口紅', en: 'lipstick' }
        ],
        school: [
            { icon: '🎀', zh: '紅色蝴蝶結', en: 'red ribbon' },
            { icon: '👜', zh: '學生書包', en: 'school bag' },
            { icon: '🧦', zh: '長筒襪', en: 'thigh-high socks' },
            { icon: '📖', zh: '教科書', en: 'textbook' },
            { icon: '🎀', zh: '髮飾', en: 'hair accessory' },
            { icon: '👞', zh: '制服皮鞋', en: 'loafers' }
        ],
        combat: [
            { icon: '⚔️', zh: '劍', en: 'sword' },
            { icon: '🛡️', zh: '盾牌', en: 'shield' },
            { icon: '🏹', zh: '弓', en: 'bow' },
            { icon: '🩸', zh: '傷疤', en: 'battle scar' },
            { icon: '💎', zh: '護身符', en: 'amulet' },
            { icon: '🔥', zh: '魔法光芒', en: 'magical glow' },
            { icon: '🗡️', zh: '匕首', en: 'dagger' },
            { icon: '🪖', zh: '戰盔', en: 'battle helmet' }
        ],
        fantasy: [
            { icon: '🪄', zh: '魔杖', en: 'magic wand' },
            { icon: '📖', zh: '魔法書', en: 'spellbook' },
            { icon: '🔮', zh: '水晶球', en: 'crystal ball' },
            { icon: '✨', zh: '發光符文', en: 'glowing runes' },
            { icon: '🧪', zh: '藥水瓶', en: 'potion bottle' },
            { icon: '👑', zh: '法師帽', en: 'wizard hat' }
        ],
        ethnic: [
            { icon: '🌸', zh: '花紋', en: 'floral pattern' },
            { icon: '🎎', zh: '傳統髮飾', en: 'traditional hair ornament' },
            { icon: '🪭', zh: '摺扇', en: 'folding fan' },
            { icon: '👘', zh: '帶結', en: 'obi sash' },
            { icon: '🏮', zh: '燈籠', en: 'lantern' },
            { icon: '📿', zh: '串珠飾品', en: 'beaded jewelry' }
        ],
        idol: [
            { icon: '🎤', zh: '麥克風', en: 'microphone' },
            { icon: '✨', zh: '閃亮亮片', en: 'glitter, sparkles' },
            { icon: '🌟', zh: '星星髮飾', en: 'star hair clip' },
            { icon: '🎀', zh: '大蝴蝶結', en: 'big ribbon bow' },
            { icon: '💎', zh: '水鑽裝飾', en: 'rhinestone decoration' },
            { icon: '👢', zh: '高筒靴', en: 'knee-high boots' },
            { icon: '🌸', zh: '花環頭飾', en: 'flower crown' },
            { icon: '🦋', zh: '蝴蝶髮飾', en: 'butterfly hairpin' }
        ],
        dark: [
            { icon: '🦇', zh: '蝙蝠翅膀', en: 'bat wings' },
            { icon: '⛓️', zh: '鎖鏈', en: 'chains' },
            { icon: '🕸️', zh: '蜘蛛網紋', en: 'spiderweb pattern' },
            { icon: '🌹', zh: '黑玫瑰', en: 'black rose' },
            { icon: '💀', zh: '骷髏飾品', en: 'skull accessory' },
            { icon: '🩸', zh: '血跡', en: 'blood stains' }
        ],
        work: [
            { icon: '📋', zh: '文件夾', en: 'clipboard' },
            { icon: '👓', zh: '眼鏡', en: 'glasses' },
            { icon: '🏷️', zh: '名牌', en: 'name tag' },
            { icon: '👠', zh: '高跟鞋', en: 'high heels' },
            { icon: '☕', zh: '咖啡杯', en: 'coffee cup' },
            { icon: '💼', zh: '公事包', en: 'briefcase' }
        ],
        swim: [
            { icon: '🕶️', zh: '太陽眼鏡', en: 'sunglasses' },
            { icon: '🧴', zh: '防曬乳', en: 'sunscreen' },
            { icon: '🌺', zh: '花朵髮飾', en: 'flower hair accessory' },
            { icon: '🏖️', zh: '沙灘巾', en: 'beach towel' },
            { icon: '🐚', zh: '貝殼項鍊', en: 'shell necklace' },
            { icon: '👒', zh: '草帽', en: 'straw hat' },
            { icon: '🩴', zh: '夾腳拖', en: 'flip flops' },
            { icon: '🍹', zh: '熱帶飲料', en: 'tropical drink' }
        ],

    };

    return {
        CATEGORIES,
        ITEMS,
        HOT_ITEMS,
        BONUS_TRAITS
    };
})();
