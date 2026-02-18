// ============================================
// AI Prompt Generator — Job Magic Modal
// openJobMagicModal() 函式
// 模組化自種族大全結構
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

    // === 🔥 Top 20 熱門職業 ===
    const HOT_JOBS = [
        'Maid', 'Student', 'Idol', 'Shrine Maiden', 'Nurse', 'Mage', 'Knight', 'Princess',
        'Ninja', 'Warrior', 'Office Lady', 'Queen', 'Demon Lord', 'Butler', 'Witch',
        'Hero', 'Assassin', 'Paladin', 'Necromancer', 'Swordsman'
    ];

    // === 📋 最近使用（localStorage）===
    const RECENT_KEY = 'jmm_recent_jobs';
    function getRecentJobs() {
        try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; }
    }
    function addRecentJob(en) {
        let recent = getRecentJobs().filter(r => r !== en);
        recent.unshift(en);
        if (recent.length > 10) recent = recent.slice(0, 10);
        localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    }

    // === 12 大分類 ===
    const JOB_CATEGORIES = [
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

    // === 自動分類映射 ===
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

    function autoClassify(en) {
        for (const [cat, names] of Object.entries(CATEGORY_MAP)) {
            if (names.includes(en)) return cat;
        }
        return 'daily';
    }

    // === Icon 映射 ===
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
    function getIcon(en) {
        for (const [re, icon] of ICON_MAP) { if (re.test(en)) return icon; }
        return '🔹';
    }

    // === 加分特徵 ===
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

    // ========================================
    // openJobMagicModal — 主函式
    // ========================================
    function openJobMagicModal() {
        const JOBS = JOBS_RAW.map(j => ({
            ...j,
            cat: autoClassify(j.en),
            icon: getIcon(j.en),
            isHot: HOT_JOBS.includes(j.en)
        }));

        const existing = document.getElementById('job-magic-modal');
        if (existing) existing.remove();

        let selectedJob = null;
        let selectedBonuses = new Set();
        let activeCat = 'hot';
        let searchQuery = '';
        let filterLetter = null;

        const overlay = document.createElement('div');
        overlay.id = 'job-magic-modal';
        overlay.innerHTML = `
    <div class="jmm-flash"></div>
    <div class="jmm-magic-circle">
      <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="#a855f7" stroke-width=".5"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#7c3aed" stroke-width=".3"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#c084fc" stroke-width=".3"/>
      <polygon points="100,15 178,145 22,145" fill="none" stroke="#a855f7" stroke-width=".4"/>
      <polygon points="100,185 22,55 178,55" fill="none" stroke="#7c3aed" stroke-width=".4"/>
      <text x="100" y="105" text-anchor="middle" fill="#a855f7" font-size="8" opacity=".4">✦ MAGIC ✦</text></svg>
    </div>
    <div class="jmm-particles" id="jmm-particles"></div>
    <div class="jmm-container">
      <div class="jmm-dice-overlay" id="jmm-dice-overlay">
        <span class="jmm-dice-emoji" id="jmm-dice-emoji">🎲</span>
      </div>
      <div class="jmm-header">
        <div class="jmm-title-row">
          <div class="jmm-title">🔮 高級魔法・職業大全</div>
          <div class="jmm-toolbar">
            <button class="jmm-tool-btn" id="jmm-dice" title="隨機選取"><span class="jmm-tool-icon">🎲</span> 隨機</button>
          </div>
        </div>
        <div class="jmm-search-row">
          <div class="jmm-search-wrap">
            <i class="fa-solid fa-magnifying-glass jmm-search-icon"></i>
            <input type="text" class="jmm-search" id="jmm-search" placeholder="搜尋職業 Search job...">
          </div>
        </div>
      </div>
      <div class="jmm-tabs" id="jmm-tabs"></div>
      <div class="jmm-body">
        <div class="jmm-main">
          <div class="jmm-grid-wrap" id="jmm-grid-wrap"><div class="jmm-grid" id="jmm-grid"></div></div>
        </div>
        <div class="jmm-az" id="jmm-az"></div>
      </div>
      <div class="jmm-bonus" id="jmm-bonus">
        <div class="jmm-bonus-title">⭐ 點選增加特徵 — <span id="jmm-bonus-job"></span></div>
        <div class="jmm-bonus-tags" id="jmm-bonus-tags"></div>
      </div>
      <div class="jmm-footer">
        <div class="jmm-status" id="jmm-status"></div>
        <div class="jmm-actions">
          <button class="jmm-btn jmm-btn-cancel" id="jmm-cancel">❌ 取消</button>
          <button class="jmm-btn jmm-btn-apply" id="jmm-apply">✨ 套用</button>
        </div>
      </div>
    </div>
  `;
        document.body.appendChild(overlay);

        // === Particles ===
        const pc = document.getElementById('jmm-particles');
        const colors = ['#fbbf24', '#a855f7', '#7c3aed', '#f59e0b', '#c084fc', '#fff', '#e879f9'];
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'jmm-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 4 + 's';
            p.style.animationDuration = (3 + Math.random() * 4) + 's';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            const s = 2 + Math.random() * 4;
            p.style.width = p.style.height = s + 'px';
            p.style.boxShadow = `0 0 ${s * 2}px ${p.style.background}`;
            pc.appendChild(p);
        }

        // === Meteors ===
        for (let i = 0; i < 4; i++) {
            const m = document.createElement('div');
            m.className = 'jmm-meteor';
            m.style.top = (Math.random() * 30) + '%';
            m.style.left = (50 + Math.random() * 50) + '%';
            m.style.animationDelay = (0.5 + Math.random() * 3) + 's';
            m.style.animationDuration = (1 + Math.random() * 1.5) + 's';
            overlay.appendChild(m);
        }

        playOpenSound();

        // === Tabs ===
        const tabsEl = document.getElementById('jmm-tabs');
        JOB_CATEGORIES.forEach(c => {
            let count;
            if (c.id === 'all') count = JOBS.length;
            else if (c.id === 'hot') count = HOT_JOBS.length;
            else if (c.id === 'recent') count = getRecentJobs().length;
            else count = JOBS.filter(j => j.cat === c.id).length;

            const tab = document.createElement('div');
            tab.className = 'jmm-tab' + (c.id === activeCat ? ' active' : '');
            tab.dataset.cat = c.id;
            tab.innerHTML = `<span class="jmm-tab-icon">${c.icon}</span><span class="jmm-tab-label">${c.label}<br>${c.en}</span><span class="jmm-tab-count">${count}</span>`;
            tab.addEventListener('click', () => {
                activeCat = c.id;
                filterLetter = null;
                document.getElementById('jmm-az').querySelectorAll('.jmm-az-letter').forEach(l => l.classList.remove('active'));
                tabsEl.querySelectorAll('.jmm-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderGrid();
            });
            tabsEl.appendChild(tab);
        });

        // === A-Z ===
        const azEl = document.getElementById('jmm-az');
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const el = document.createElement('div');
            el.className = 'jmm-az-letter';
            el.textContent = letter;
            el.addEventListener('click', () => {
                filterLetter = letter;
                searchQuery = '';
                document.getElementById('jmm-search').value = '';
                activeCat = 'all';
                tabsEl.querySelectorAll('.jmm-tab').forEach(t => t.classList.remove('active'));
                tabsEl.querySelector('.jmm-tab').classList.add('active');
                azEl.querySelectorAll('.jmm-az-letter').forEach(l => l.classList.remove('active'));
                el.classList.add('active');
                renderGrid();
            });
            azEl.appendChild(el);
        });

        // === Search ===
        document.getElementById('jmm-search').addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            filterLetter = null;
            azEl.querySelectorAll('.jmm-az-letter').forEach(l => l.classList.remove('active'));
            renderGrid();
        });

        // === 🎲 骰子滾動音效 ===
        function playDiceRollSound() {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const now = ctx.currentTime;
                const rumble = ctx.createOscillator();
                const rumbleG = ctx.createGain();
                rumble.connect(rumbleG); rumbleG.connect(ctx.destination);
                rumble.type = 'sawtooth';
                rumble.frequency.setValueAtTime(80, now);
                rumble.frequency.linearRampToValueAtTime(40, now + 1);
                rumbleG.gain.setValueAtTime(0.08, now);
                rumbleG.gain.linearRampToValueAtTime(0.02, now + 0.8);
                rumbleG.gain.linearRampToValueAtTime(0, now + 1);
                rumble.start(now); rumble.stop(now + 1);
                for (let i = 0; i < 5; i++) {
                    const t = now + i * 0.18 + Math.random() * 0.05;
                    const click = ctx.createOscillator();
                    const clickG = ctx.createGain();
                    click.connect(clickG); clickG.connect(ctx.destination);
                    click.type = 'square';
                    click.frequency.setValueAtTime(800 + Math.random() * 600, t);
                    click.frequency.exponentialRampToValueAtTime(200, t + 0.04);
                    clickG.gain.setValueAtTime(0.06, t);
                    clickG.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
                    click.start(t); click.stop(t + 0.06);
                }
            } catch (e) { }
        }

        // === 🎲 隨機選取（完整動畫流程）===
        let diceAnimating = false;
        document.getElementById('jmm-dice').addEventListener('click', function () {
            if (diceAnimating) return;
            diceAnimating = true;

            const overlayDice = document.getElementById('jmm-dice-overlay');
            const diceEl = document.getElementById('jmm-dice-emoji');
            const btn = this;

            btn.classList.add('jmm-dice-spinning');
            diceEl.className = 'jmm-dice-emoji';
            void diceEl.offsetWidth;
            overlayDice.classList.add('active');
            playDiceRollSound();

            setTimeout(() => {
                diceEl.classList.add('rolling');
            }, 400);

            setTimeout(() => {
                diceEl.classList.remove('rolling');
                diceEl.classList.add('exit');

                const randomJob = JOBS[Math.floor(Math.random() * JOBS.length)];
                selectedJob = randomJob;
                selectedBonuses.clear();

                activeCat = randomJob.cat;
                filterLetter = null;
                tabsEl.querySelectorAll('.jmm-tab').forEach(t => t.classList.remove('active'));
                const targetTab = tabsEl.querySelector(`[data-cat="${randomJob.cat}"]`);
                if (targetTab) targetTab.classList.add('active');

                playSelectSound();
                renderGrid();
                renderBonus(randomJob);

                setTimeout(() => {
                    const selectedEl = document.querySelector('.jmm-job-chip.selected');
                    if (selectedEl) {
                        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        selectedEl.classList.add('random-pick');
                    }
                }, 80);

                setTimeout(() => {
                    overlayDice.classList.remove('active');
                    btn.classList.remove('jmm-dice-spinning');
                    diceAnimating = false;
                }, 350);

            }, 1400);
        });

        renderGrid();

        // === Close ===
        function closeModal() {
            overlay.style.animation = 'jmm-fadeIn .3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }
        document.getElementById('jmm-cancel').addEventListener('click', closeModal);
        document.getElementById('jmm-apply').addEventListener('click', () => {
            if (selectedJob) {
                addRecentJob(selectedJob.en);
                const recentTab = tabsEl.querySelector('[data-cat="recent"]');
                if (recentTab) {
                    recentTab.querySelector('.jmm-tab-count').textContent = getRecentJobs().length;
                }
                selectOption('job', selectedJob.value, { label: selectedJob.label, en: selectedJob.en, value: selectedJob.value });
                const bonusArr = [...selectedBonuses];
                if (bonusArr.length) {
                    state.customInputs['job'] = (state.customInputs['job'] || '') +
                        (state.customInputs['job'] ? ', ' : '') + bonusArr.join(', ');
                    state.customInputVisible['job'] = true;
                }
                generatePrompt();
                saveState();
                renderTabContent();
            }
            closeModal();
        });
        overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
        const escH = e => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escH); } };
        document.addEventListener('keydown', escH);

        // === 取得篩選後的職業 ===
        function getFilteredJobs() {
            let filtered = JOBS;
            const recent = getRecentJobs();

            if (activeCat === 'recent') {
                filtered = recent.map(en => JOBS.find(j => j.en === en)).filter(Boolean);
            } else if (activeCat === 'hot') {
                filtered = JOBS.filter(j => j.isHot);
            } else if (activeCat !== 'all') {
                filtered = filtered.filter(j => j.cat === activeCat);
            }

            if (searchQuery) {
                filtered = filtered.filter(j =>
                    j.label.includes(searchQuery) || j.en.toLowerCase().includes(searchQuery) || j.value.toLowerCase().includes(searchQuery)
                );
            }
            if (filterLetter) {
                filtered = filtered.filter(j => j.en.charAt(0).toUpperCase() === filterLetter);
            }
            return filtered;
        }

        function renderGrid() {
            const grid = document.getElementById('jmm-grid');
            const filtered = getFilteredJobs();
            const recent = getRecentJobs();
            const total = JOBS.length;
            const shown = filtered.length;
            const selText = selectedJob ? ` | 已選：<b>${selectedJob.label}</b>` : '';
            document.getElementById('jmm-status').innerHTML = `已載入 ${total} 職業 | 顯示 ${shown}/${total}${selText}`;

            grid.innerHTML = '';
            if (!filtered.length) {
                grid.innerHTML = '<div class="jmm-empty">🔍 沒有找到符合的職業</div>';
                return;
            }

            filtered.forEach(job => {
                const chip = document.createElement('div');
                chip.className = 'jmm-job-chip' + (selectedJob && selectedJob.en === job.en ? ' selected' : '');
                chip.innerHTML = `
                    <span class="jmm-chip-icon">${job.icon}</span>
                    <div class="jmm-chip-text">
                        <span class="jmm-chip-zh">${job.label}</span>
                        <span class="jmm-chip-en">${job.en}</span>
                    </div>
                    ${job.isHot ? '<span class="jmm-hot-badge">🔥</span>' : ''}
                    ${recent.includes(job.en) ? '<span class="jmm-recent-badge">📋</span>' : ''}
                `;
                chip.addEventListener('click', () => {
                    if (selectedJob && selectedJob.en === job.en) {
                        selectedJob = null;
                        selectedBonuses.clear();
                    } else {
                        selectedJob = job;
                        selectedBonuses.clear();
                    }
                    playSelectSound();
                    renderGrid();
                    renderBonus(selectedJob);
                });
                grid.appendChild(chip);
            });

            document.getElementById('jmm-grid-wrap').scrollTop = 0;
        }

        function renderBonus(job) {
            const panel = document.getElementById('jmm-bonus');
            const tagsEl = document.getElementById('jmm-bonus-tags');
            const nameEl = document.getElementById('jmm-bonus-job');
            if (!job) { panel.classList.remove('show'); return; }
            const traits = BONUS_TRAITS[job.cat] || [];
            if (!traits.length) { panel.classList.remove('show'); return; }
            nameEl.textContent = job.label + ' ' + job.en;
            tagsEl.innerHTML = '';
            traits.forEach(trait => {
                const tag = document.createElement('button');
                tag.className = 'jmm-bonus-tag' + (selectedBonuses.has(trait.en) ? ' active' : '');
                tag.innerHTML = `<span class="jmm-chip-icon">${trait.icon}</span> ${trait.zh}`;
                tag.addEventListener('click', () => {
                    if (selectedBonuses.has(trait.en)) selectedBonuses.delete(trait.en);
                    else selectedBonuses.add(trait.en);
                    tag.classList.toggle('active');
                });
                tagsEl.appendChild(tag);
            });
            panel.classList.add('show');
        }
    }

    // === 音效 ===
    function playOpenSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;
            const drone = ctx.createOscillator();
            const droneG = ctx.createGain();
            drone.connect(droneG); droneG.connect(ctx.destination);
            drone.type = 'sine';
            drone.frequency.setValueAtTime(100, now);
            drone.frequency.exponentialRampToValueAtTime(200, now + 0.5);
            droneG.gain.setValueAtTime(0, now);
            droneG.gain.linearRampToValueAtTime(0.05, now + 0.15);
            droneG.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
            drone.start(now); drone.stop(now + 0.8);
            [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.connect(g); g.connect(ctx.destination);
                osc.type = 'triangle'; osc.frequency.value = freq;
                const t = now + 0.1 + i * 0.07;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.04, t + 0.02);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                osc.start(t); osc.stop(t + 0.3);
            });
            [1318.51, 1567.98, 2093].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.connect(g); g.connect(ctx.destination);
                osc.type = 'sine'; osc.frequency.value = freq;
                const t = now + 0.7 + i * 0.03;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.025, t + 0.02);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
                osc.start(t); osc.stop(t + 0.5);
            });
        } catch (e) { console.warn('Sound error:', e); }
    }

    function playSelectSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;
            [1200, 1800, 2400].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.connect(g); g.connect(ctx.destination);
                osc.type = 'sine'; osc.frequency.value = freq;
                const t = now + i * 0.04;
                g.gain.setValueAtTime(0.035, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
                osc.start(t); osc.stop(t + 0.2);
            });
        } catch (e) { }
    }

    return {
        setup,
        openJobMagicModal
    };
})();
