// ============================================
// AI Prompt Generator — Job Magic 資料
// 職業分類 + Icon 映射 + 加分特徵
// 掛載至 window.PromptGen.JobMagicData
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.JobMagicData = (function () {

    // ── 分類 Tab 定義 ──
    const CATEGORIES = [
        { id: 'all', label: '全部', en: 'All', icon: '🌐' },
        { id: 'recent', label: '最近', en: 'Recent', icon: '📋' },
        { id: 'hot', label: '熱門', en: 'Hot', icon: '🔥' },
        { id: 'daily', label: '日常', en: 'Daily', icon: '🏢' },
        { id: 'entertainment', label: '演藝', en: 'Showbiz', icon: '🎤' },
        { id: 'warrior', label: '戰鬥', en: 'Fighter', icon: '⚔️' },
        { id: 'magic', label: '魔法', en: 'Magic', icon: '🔮' },
        { id: 'dark', label: '黑暗', en: 'Dark', icon: '😈' },
        { id: 'noble', label: '王族', en: 'Royal', icon: '👑' },
        { id: 'service', label: '服務', en: 'Service', icon: '🍽️' },
        { id: 'craft', label: '技藝', en: 'Craft', icon: '🔧' },
        { id: 'adventure', label: '冒險', en: 'Adventure', icon: '🗺️' }
    ];

    // ── 🔥 Top 20 熱門職業 ──
    const HOT_ITEMS = [
        'Maid', 'Student', 'Idol', 'Shrine Maiden', 'Nurse', 'Mage', 'Knight', 'Princess',
        'Ninja', 'Warrior', 'Office Lady', 'Queen', 'Demon Lord', 'Butler', 'Witch',
        'Hero', 'Assassin', 'Paladin', 'Necromancer', 'Swordsman'
    ];

    // ── 分類映射 ──
    const CATEGORY_MAP = {
        daily: ['Student', 'Teacher', 'Kindergarten Teacher', 'Nurse', 'Doctor', 'Pharmacist', 'Police', 'Firefighter',
            'Soldier', 'Special Forces', 'Flight Attendant', 'Pilot', 'Astronaut', 'Secretary', 'Office Lady', 'Accountant',
            'Lawyer', 'Reporter', 'News Anchor', 'Director', 'Photographer', 'Librarian', 'Security Guard', 'Architect',
            'Engineer', 'Scientist', 'Athlete', 'Coach', 'Lifeguard', 'Mail Carrier', 'Driver', 'Farmer', 'Fisherman',
            'Veterinarian', 'Dentist', 'Politician', 'Nun', 'Priest', 'Shrine Maiden', 'Monk'],
        entertainment: ['Idol', 'Singer', 'Songstress', 'Actress', 'Voice Actor', 'Model', 'Cheerleader', 'Dancer',
            'Ballerina', 'DJ', 'Musician', 'Pianist', 'Violinist', 'Conductor', 'Mangaka', 'Painter', 'Writer',
            'Photographer', 'Streamer', 'Cosplayer', 'YouTuber', 'VTuber', 'Stage Magician', 'Circus Performer', 'Figure Skater'],
        warrior: ['Warrior', 'Knight', 'Swordsman', 'Samurai', 'Ninja', 'Ronin', 'Archer', 'Lancer', 'Berserker',
            'Brawler', 'Battle Monk', 'Paladin', 'Dark Knight', 'Dragon Knight', 'Hunter', 'Sniper', 'Gunner',
            'Gladiator', 'Guardian', 'Whip Master', 'Fighter', 'War Smith', 'Magic Swordsman', 'Blade Dancer',
            'Heavy Infantry', 'Sky Knight', 'Navy Officer', 'Ranger', 'Racer', 'SWAT'],
        magic: ['Mage', 'Witch', 'Archmage', 'Arcanist', 'Sorcerer', 'Warlock', 'Sage', 'Fire Mage', 'Ice Mage',
            'Thunder Mage', 'Wind Mage', 'Water Mage', 'Earth Mage', 'Light Mage', 'Dark Mage', 'Necromancer',
            'Summoner', 'Barrier Mage', 'Enchanter', 'Illusionist', 'Chronomancer', 'Fortune Teller',
            'Talisman Master', 'Onmyoji', 'Druid', 'Spirit Caller', 'Astrologer', 'Cleric', 'Healer', 'Saint',
            'Herbalist', 'Magical Girl', 'Magus', 'Curse Master', 'Space Mage'],
        dark: ['Demon Lord', 'Assassin', 'Rogue', 'Dark Priest', 'Cult Leader', 'Bounty Hunter', 'Pirate',
            'Poisoner', 'Tomb Raider', 'Smuggler', 'Spy', 'Hitman', 'Grim Reaper', 'Vampire Hunter', 'Avenger',
            'Fallen Paladin', 'Hex Caster', 'Black Knight', 'Shadow Dancer', 'Mad Warrior', 'Demon Pact',
            'Blood Priest', 'Nightwalker', 'Wraith Knight', 'Puppeteer'],
        noble: ['Queen', 'King', 'Princess', 'Prince', 'Emperor', 'Empress', 'Noble', 'Duke', 'Count', 'Lord',
            'Knight Commander', 'High Priest', 'Pope', 'General', 'Admiral', 'Ambassador', 'Chancellor',
            'Oracle', 'Valkyrie', 'Archangel'],
        service: ['Maid', 'Butler', 'Chef', 'Bartender', 'Barista', 'Patissier', 'Oiran', 'Geisha', 'Waitress',
            'Sommelier', 'Housekeeper', 'Beautician', 'Hairdresser', 'Masseuse', 'Florist', 'Cabin Crew',
            'Receptionist', 'Tour Guide', 'Babysitter', 'Caregiver', 'Hotel Manager', 'Funeral Director',
            'Perfumer', 'Tailor', 'Maid Cafe'],
        craft: ['Alchemist', 'Blacksmith', 'Mechanic', 'Carpenter', 'Potter', 'Jeweler', 'Runesmith',
            'Golem Maker', 'Apothecary', 'Brewer', 'Weaponsmith', 'Armorsmith', 'Bowyer', 'Artificer',
            'Doll Maker', 'Scribe', 'Archaeologist', 'Magic Researcher', 'Astronomer', 'Inventor',
            'Programmer', 'Food Researcher', 'Astrologer', 'Cartographer', 'Beast Tamer'],
        adventure: ['Hero', 'Adventurer', 'Mercenary', 'Bard', 'Traveler', 'Merchant', 'Treasure Hunter',
            'Explorer', 'Pirate Captain', 'Sky Pirate', 'Innkeeper', 'Coachman', 'Scout', 'Bandit',
            'Robin Hood', 'Info Broker', 'Navigator', 'Aviator', 'Falconer', 'Beast Rider', 'Wanderer',
            'Pilgrim', 'Duelist', 'Monster Hunter', 'Dungeon Crawler']
    };

    // ── Icon 映射（正則→emoji）──
    const ICON_MAP = [
        [/maid/i, '🧹'], [/student/i, '📚'], [/idol/i, '⭐'], [/shrine maiden|miko/i, '⛩️'],
        [/nurse/i, '💉'], [/doctor/i, '🩺'], [/teacher|kindergarten/i, '📖'], [/police|swat/i, '🚔'],
        [/firefighter/i, '🚒'], [/soldier|military|special forces/i, '🎖️'], [/pilot/i, '✈️'],
        [/astronaut/i, '🚀'], [/secretary|office lady|accountant/i, '💼'], [/lawyer/i, '⚖️'],
        [/reporter|news anchor/i, '📺'], [/director/i, '🎬'], [/photographer/i, '📷'],
        [/librarian/i, '📚'], [/security/i, '🛡️'], [/architect|engineer/i, '🏗️'],
        [/scientist/i, '🔬'], [/athlete|coach/i, '🏃'], [/lifeguard/i, '🏖️'],
        [/farmer/i, '🌾'], [/fisherman/i, '🎣'], [/veterinarian/i, '🐾'],
        [/dentist/i, '🦷'], [/politician/i, '🏛️'], [/nun/i, '✝️'], [/priest(?!ess)/i, '⛪'],
        [/monk/i, '🙏'], [/mail/i, '📮'], [/driver|coachman/i, '🚗'], [/pharmacist/i, '💊'],
        [/singer|songstress/i, '🎵'], [/actress/i, '🎭'], [/voice actor/i, '🎙️'],
        [/model/i, '👗'], [/cheerleader/i, '📣'], [/dancer|ballerina/i, '💃'],
        [/dj/i, '🎧'], [/musician|pianist|violinist|conductor/i, '🎼'],
        [/mangaka/i, '✏️'], [/painter/i, '🎨'], [/writer/i, '✍️'],
        [/streamer|youtuber|vtuber/i, '📱'], [/cosplayer/i, '🎪'],
        [/magician/i, '🎩'], [/circus/i, '🤹'], [/figure skater/i, '⛸️'],
        [/warrior|gladiator|fighter|brawler/i, '⚔️'], [/knight/i, '🗡️'],
        [/swordsman|samurai|ronin|blade/i, '⚔️'], [/ninja/i, '🥷'],
        [/archer|ranger|bowyer/i, '🏹'], [/lancer/i, '🔱'], [/berserker|mad warrior/i, '😤'],
        [/battle monk/i, '🥋'], [/paladin|fallen paladin/i, '🛡️'],
        [/dark knight|black knight|wraith knight/i, '⚫'], [/dragon knight/i, '🐉'],
        [/hunter(?! vampire)/i, '🎯'], [/sniper|gunner/i, '🔫'],
        [/guardian/i, '🛡️'], [/whip/i, '〰️'], [/war smith/i, '🔨'],
        [/magic swords/i, '✨'], [/heavy infantry/i, '🏰'], [/sky knight/i, '🦅'],
        [/navy/i, '⚓'], [/racer/i, '🏎️'],
        [/mage|wizard|sorcerer|warlock|arcanist|archmage|magus/i, '🔮'],
        [/witch/i, '🧙'], [/sage/i, '📜'], [/fire mage|pyro/i, '🔥'],
        [/ice mage|cryo/i, '❄️'], [/thunder mage|storm/i, '⚡'], [/wind mage|tempest/i, '🌬️'],
        [/water mage/i, '💧'], [/earth mage|geo/i, '🪨'], [/light mage|radiant/i, '💡'],
        [/dark mage|shadow|void/i, '🌑'], [/necromancer/i, '💀'], [/summoner/i, '🌀'],
        [/barrier/i, '🛡️'], [/enchanter/i, '✨'], [/illusionist/i, '🪞'],
        [/chronomancer/i, '⏳'], [/fortune teller/i, '🔮'], [/talisman/i, '📿'],
        [/onmyoji/i, '☯️'], [/druid/i, '🌿'], [/spirit caller/i, '👻'],
        [/astrologer/i, '⭐'], [/cleric|healer/i, '💚'], [/saint/i, '😇'],
        [/herbalist/i, '🌱'], [/magical girl/i, '💖'], [/curse/i, '☠️'], [/space mage/i, '🌌'],
        [/demon lord/i, '👿'], [/assassin|hitman/i, '🗡️'], [/rogue|thief/i, '💰'],
        [/dark priest|blood priest/i, '🩸'], [/cult leader/i, '🕯️'],
        [/bounty hunter|monster hunter/i, '🎯'], [/pirate/i, '🏴‍☠️'],
        [/poisoner/i, '☠️'], [/tomb raider/i, '🏺'], [/smuggler/i, '📦'],
        [/spy/i, '🕵️'], [/grim reaper/i, '⚰️'], [/vampire hunter/i, '🧄'],
        [/avenger/i, '💢'], [/hex/i, '🧿'], [/shadow dancer/i, '🌑'],
        [/demon pact/i, '📝'], [/nightwalker/i, '🌙'], [/puppeteer/i, '🎭'],
        [/queen|empress/i, '👑'], [/king|emperor/i, '👑'], [/princess/i, '👸'], [/prince/i, '🤴'],
        [/noble|duke|count|lord/i, '🏰'], [/knight commander/i, '⚜️'],
        [/high priest|pope/i, '⛪'], [/general|admiral/i, '🎖️'],
        [/ambassador|chancellor/i, '🏛️'], [/oracle/i, '🔮'],
        [/valkyrie/i, '⚔️'], [/archangel/i, '😇'],
        [/chef|patissier/i, '👨‍🍳'], [/bartender|sommelier/i, '🍸'],
        [/barista/i, '☕'], [/oiran|geisha/i, '👘'], [/waitress/i, '🍽️'],
        [/housekeeper/i, '🏠'], [/beautician|hairdresser/i, '💇'],
        [/masseuse/i, '💆'], [/florist/i, '💐'], [/cabin crew/i, '✈️'],
        [/receptionist/i, '🛎️'], [/tour guide/i, '🗺️'], [/babysitter|caregiver/i, '👶'],
        [/hotel/i, '🏨'], [/funeral/i, '⚱️'], [/perfumer/i, '🌹'], [/tailor/i, '🧵'],
        [/maid cafe/i, '🎀'],
        [/alchemist|apothecary/i, '⚗️'], [/blacksmith|weaponsmith|armorsmith/i, '🔨'],
        [/mechanic/i, '🔧'], [/carpenter/i, '🪚'], [/potter/i, '🏺'],
        [/jeweler/i, '💎'], [/runesmith/i, '🔡'], [/golem maker/i, '🗿'],
        [/brewer/i, '🍺'], [/artificer|inventor/i, '⚙️'], [/doll maker/i, '🎎'],
        [/scribe/i, '📝'], [/archaeologist/i, '🏛️'], [/magic research/i, '📖'],
        [/astronomer/i, '🔭'], [/programmer/i, '💻'], [/food research/i, '🧪'],
        [/cartographer/i, '🗺️'], [/beast tamer/i, '🦁'],
        [/hero/i, '🦸'], [/adventurer/i, '🎒'], [/mercenary/i, '⚔️'],
        [/bard/i, '🎸'], [/traveler|wanderer|pilgrim/i, '👣'],
        [/merchant/i, '🪙'], [/treasure hunter/i, '💎'],
        [/explorer/i, '🧭'], [/pirate captain/i, '🏴‍☠️'], [/sky pirate/i, '🛩️'],
        [/innkeeper/i, '🍺'], [/scout/i, '👁️'], [/bandit/i, '🗡️'],
        [/robin hood/i, '🏹'], [/info broker/i, '🤫'], [/navigator/i, '🧭'],
        [/aviator/i, '🛩️'], [/falconer/i, '🦅'], [/beast rider/i, '🐴'],
        [/duelist/i, '🤺'], [/dungeon crawler/i, '🏚️']
    ];

    // ── 加分特徵 ──
    const BONUS_TRAITS = {
        daily: [
            { icon: '👔', zh: '制服', en: 'uniform' },
            { icon: '📋', zh: '名牌', en: 'name badge' },
            { icon: '👓', zh: '眼鏡', en: 'glasses' },
            { icon: '💼', zh: '公事包', en: 'briefcase' },
            { icon: '🏫', zh: '學校背景', en: 'school background' },
            { icon: '🏥', zh: '醫院背景', en: 'hospital background' }
        ],
        entertainment: [
            { icon: '🎤', zh: '麥克風', en: 'microphone' },
            { icon: '💡', zh: '舞台燈光', en: 'stage lighting' },
            { icon: '✨', zh: '閃亮服裝', en: 'sparkle outfit' },
            { icon: '🎵', zh: '音符', en: 'musical notes' },
            { icon: '📸', zh: '聚光燈', en: 'spotlight' },
            { icon: '💄', zh: '華麗妝容', en: 'glamorous makeup' }
        ],
        warrior: [
            { icon: '⚔️', zh: '雙手武器', en: 'two-handed weapon' },
            { icon: '🛡️', zh: '盾牌', en: 'shield' },
            { icon: '⚙️', zh: '重甲', en: 'heavy armor' },
            { icon: '🩸', zh: '戰傷', en: 'battle scars' },
            { icon: '🏰', zh: '戰場背景', en: 'battlefield' },
            { icon: '🔥', zh: '戰意', en: 'fighting spirit aura' }
        ],
        magic: [
            { icon: '🔮', zh: '魔法陣', en: 'magic circle' },
            { icon: '✨', zh: '魔力粒子', en: 'mana particles' },
            { icon: '📖', zh: '魔導書', en: 'grimoire' },
            { icon: '🪄', zh: '法杖', en: 'magic staff' },
            { icon: '👁️', zh: '魔眼', en: 'magic eyes' },
            { icon: '🌀', zh: '元素環繞', en: 'elemental orbit' }
        ],
        dark: [
            { icon: '🌑', zh: '暗影氣息', en: 'shadow aura' },
            { icon: '🩸', zh: '血痕', en: 'blood stains' },
            { icon: '⛓️', zh: '鎖鏈', en: 'chains' },
            { icon: '💀', zh: '骷髏', en: 'skull motif' },
            { icon: '🦇', zh: '蝙蝠', en: 'bats' },
            { icon: '🌙', zh: '月夜背景', en: 'moonlit night' }
        ],
        noble: [
            { icon: '👑', zh: '皇冠', en: 'crown' },
            { icon: '🏰', zh: '城堡背景', en: 'castle background' },
            { icon: '🪭', zh: '扇子', en: 'royal fan' },
            { icon: '💎', zh: '珠寶', en: 'jewels' },
            { icon: '🦁', zh: '皇家紋章', en: 'royal crest' },
            { icon: '🍷', zh: '高腳杯', en: 'wine glass' }
        ],
        service: [
            { icon: '🧹', zh: '清潔用具', en: 'cleaning tools' },
            { icon: '🍰', zh: '甜點', en: 'dessert' },
            { icon: '🎀', zh: '蝴蝶結', en: 'ribbon bow' },
            { icon: '🧤', zh: '白手套', en: 'white gloves' },
            { icon: '☕', zh: '茶具', en: 'tea set' },
            { icon: '😊', zh: '微笑', en: 'warm smile' }
        ],
        craft: [
            { icon: '🔨', zh: '鐵鎚', en: 'hammer' },
            { icon: '⚗️', zh: '燒瓶', en: 'flask' },
            { icon: '🔥', zh: '爐火', en: 'forge fire' },
            { icon: '📐', zh: '設計圖', en: 'blueprint' },
            { icon: '🧪', zh: '試劑', en: 'reagents' },
            { icon: '🏭', zh: '工房背景', en: 'workshop background' }
        ],
        adventure: [
            { icon: '🗺️', zh: '地圖', en: 'map' },
            { icon: '🎒', zh: '背包', en: 'backpack' },
            { icon: '🧭', zh: '指南針', en: 'compass' },
            { icon: '🏕️', zh: '營火', en: 'campfire' },
            { icon: '🌄', zh: '荒野背景', en: 'wilderness background' },
            { icon: '💰', zh: '寶箱', en: 'treasure chest' }
        ]
    };

    // ── 工具函式 ──
    function autoClassify(en) {
        for (const [cat, names] of Object.entries(CATEGORY_MAP)) {
            if (names.includes(en)) return cat;
        }
        return 'daily';
    }

    function getIcon(en) {
        for (const [re, icon] of ICON_MAP) { if (re.test(en)) return icon; }
        return '🔹';
    }

    return {
        CATEGORIES,
        HOT_ITEMS,
        CATEGORY_MAP,
        ICON_MAP,
        BONUS_TRAITS,
        autoClassify,
        getIcon
    };
})();
