// ============================================
// AI Prompt Generator — Race Magic Modal
// openRaceMagicModal() 函式
// 模組化自 demos/race_magic_demo.html
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.RaceMagicModal = (function () {
    // Dependencies injected via setup()
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

    // === 🔥 Top 20 熱門種族 ===
    const HOT_RACES = [
        'Human', 'Elf', 'Angel', 'Demon', 'Vampire', 'Succubus', 'Dragon', 'Cat Girl', 'Fox Girl',
        'Mermaid', 'Fairy', 'Bunny Girl', 'Dark Elf', 'Valkyrie', 'Kitsune',
        'Ghost', 'Android', 'Magical Girl', 'Wolf Girl', 'High Elf'
    ];

    // === 📋 最近使用（localStorage）===
    const RECENT_KEY = 'rmm_recent_races';
    function getRecentRaces() {
        try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; }
    }
    function addRecentRace(en) {
        let recent = getRecentRaces().filter(r => r !== en);
        recent.unshift(en);
        if (recent.length > 10) recent = recent.slice(0, 10);
        localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    }

    // === 10 大分類 ===
    const RACE_CATEGORIES = [
        { id: 'all', label: '全部', en: 'All', icon: '🌐' },
        { id: 'recent', label: '最近', en: 'Recent', icon: '📋' },
        { id: 'hot', label: '熱門', en: 'Hot', icon: '🔥' },
        { id: 'human', label: '人類', en: 'Human', icon: '👤' },
        { id: 'elf', label: '精靈', en: 'Elf', icon: '🧝' },
        { id: 'beast', label: '獸人', en: 'Beast', icon: '🐾' },
        { id: 'mecha', label: '機械', en: 'Mech', icon: '⚙️' },
        { id: 'myth', label: '神話', en: 'Myth', icon: '🏛️' },
        { id: 'undead', label: '亡靈', en: 'Undead', icon: '👻' },
        { id: 'yokai', label: '妖怪', en: 'Yokai', icon: '🎌' },
        { id: 'other', label: '異界', en: 'Other', icon: '🌀' },
        { id: 'fantasy', label: '幻想', en: 'Fantasy', icon: '✨' }
    ];

    // === 自動分類映射 ===
    const CATEGORY_MAP = {
        human: ['Human', 'Werewolf', 'Bunny Girl', 'Magical Girl',
            'Onmyoji Spirit', 'Shield Maiden', 'Heroic Spirit', 'Valkyrie', 'Demigod',
            'Barrier Mage', 'Xian'],
        elf: ['Elf', 'High Elf', 'Dark Elf', 'Wood Elf', 'Moon Elf', 'Sea Elf', 'Blood Elf', 'Sun Elf',
            'Fairy', 'Half-Elf', 'Elf King', 'Light Elf', 'Dark Elf (Norse)',
            'Fire Spirit', 'Water Spirit', 'Wind Spirit', 'Earth Spirit', 'Thunder Spirit',
            'Ice Spirit', 'Light Spirit', 'Dark Spirit', 'Flower Spirit', 'Star Spirit',
            'Nymph', 'Sylph', 'Time Spirit'],
        beast: ['Cat Girl', 'Fox Girl', 'Dog Girl', 'Wolf Girl', 'Tiger Girl', 'Horse Girl',
            'Snake Girl', 'Spider Girl', 'Harpy', 'Bat Girl', 'Mouse Girl', 'Sheep Girl',
            'Shark Girl', 'Deer Girl', 'Bear Girl', 'Lion Girl', 'Squirrel Girl',
            'Peacock Girl', 'Crane Girl', 'Lizard Girl', 'Octopus Girl', 'Bee Girl',
            'Kemonomimi', 'Kitsune', 'Scorpion Girl', 'Swallow Girl', 'Firefly Spirit',
            'Swan Girl', 'Butterfly Spirit', 'Seahorse Girl', 'Pearl Spirit',
            'Thunderbird', 'Garuda', 'Salamander', "Will-o'-Wisp",
            'Beastkin', 'Half-Yokai'],
        mecha: ['Android', 'Cyborg', 'Mecha Angel', 'Homunculus', 'Virtual Idol',
            'Nano Being', 'Space Elf', 'Armor Spirit'],
        myth: ['Angel', 'Demon', 'Succubus', 'Dragon', 'Mermaid', 'Fallen Angel',
            'Centaur', 'Medusa', 'Phoenix', 'Unicorn', 'Siren', 'Pegasus', 'Griffin Rider',
            'Sphinx', 'Minotaur', 'Hydra', 'Chimera', 'Cerberus', 'Satyr', 'Giant',
            'Tennin', 'White Serpent', "Chang'e", 'Dragon Palace Princess', 'Weaver Girl',
            'Raiju', 'Qilin', 'Vermillion Bird', 'Black Tortoise', 'Azure Dragon', 'White Tiger',
            'Norse Dwarf', 'Frost Giant', 'Fire Giant', 'World Serpent'],
        undead: ['Vampire', 'Vampire Noble', 'Zombie', 'Ghost', 'Skeleton', 'Lich',
            'Grim Reaper', 'Mummy', 'Wraith', 'Ghoul', 'Death Knight', 'Dracolich'],
        yokai: ['Oni', 'Tengu', 'Kappa', 'Yuki-onna', 'Bakeneko', 'Zashiki-warashi', 'Hannya',
            'Jorogumo', 'Kamaitachi', 'Tsukumogami', 'Nue', 'Tamamo-no-Mae',
            'Hyakki Yagyo', 'Lady Fox Spirit'],
        other: ['Alien', 'Slime',
            'Golem', 'Shadow Person', 'Crystal Being', 'Multi-limbed', 'Parasite Host', 'Mirror Being',
            'Dwarf', 'Orc', 'Goblin', 'Troll', 'Gargoyle', 'Ogre', 'Lamia', 'Gnome',
            'Night Hag', 'Thri-kreen', 'Shapeshifter'],
        fantasy: ['Dragon Princess', 'Elder Dragon', 'Ice Dragon', 'Fire Dragon', 'Eastern Dragon',
            'Crystal Dragon', 'Shadow Dragon', 'Wyvern',
            'Arch Demon', 'Nightmare', 'Imp', 'Yaksha', 'Rakshasa', 'Asura', 'Demon Lord',
            'Deity', 'Spirit', 'Celestial', 'Kami',
            'Flower Yokai', 'Mushroom Girl', 'Mandragora', 'Treant', 'Vine Spirit', 'Alraune',
            'Sea Dragon', 'Undine', 'Jellyfish Girl', 'Kraken Girl', 'Coral Spirit', 'Deep One',
            'Titan', 'Dream Being', 'Astral Being', 'Void Being',
            'Nightmare Avatar', 'Fate Goddess', 'Chaos Beast', 'Order Angel', 'Nature Avatar', 'Star Messenger',
            'Shikigami', 'Living Doll', 'Familiar', 'Weapon Spirit',
            'Half-Dragon', 'Nephilim', 'Tiefling', 'Will-o-Wisp']
    };

    function autoClassify(en) {
        for (const [cat, names] of Object.entries(CATEGORY_MAP)) {
            if (names.includes(en)) return cat;
        }
        return 'other';
    }

    // === Icon 映射 ===
    const ICON_MAP = [
        [/human/i, '👤'], [/elf/i, '🧝'], [/angel/i, '😇'], [/demon|succubus|imp|asura|rakshasa|yaksha/i, '😈'],
        [/vampire/i, '🧛'], [/dragon|wyvern|dracolich/i, '🐉'], [/fairy/i, '🧚'], [/mermaid|undine|sea/i, '🧜'],
        [/ghost|wraith|spirit/i, '👻'], [/android|cyborg|mecha|nano|virtual/i, '🤖'],
        [/cat/i, '🐱'], [/fox|kitsune|tamamo/i, '🦊'], [/dog/i, '🐕'], [/wolf|were/i, '🐺'],
        [/tiger|byakko/i, '🐯'], [/horse|centaur|pegasus/i, '🐴'], [/snake|serpent|lamia|medusa/i, '🐍'],
        [/spider|jorogumo|arachne/i, '🕷️'], [/bird|harpy|crane|swan|swallow|garuda|thunder/i, '🦅'],
        [/bat/i, '🦇'], [/mouse/i, '🐭'], [/sheep/i, '🐑'], [/shark/i, '🦈'], [/deer|qilin/i, '🦌'],
        [/bear/i, '🐻'], [/lion|sphinx/i, '🦁'], [/squirrel/i, '🐿️'], [/peacock/i, '🦚'],
        [/lizard|salamander/i, '🦎'], [/octopus|kraken/i, '🐙'], [/bee/i, '🐝'], [/scorpion/i, '🦂'],
        [/butterfly/i, '🦋'], [/firefly|wisp/i, '✨'], [/oni|hannya|ogre|goblin|troll/i, '👹'],
        [/tengu/i, '👺'], [/kappa/i, '🐸'], [/zombie|skeleton|ghoul|mummy/i, '💀'],
        [/lich|reaper|death/i, '⚰️'], [/alien/i, '👽'], [/slime/i, '🫧'], [/golem/i, '🗿'],
        [/crystal|pearl/i, '💎'], [/dwarf|gnome|norse dwarf/i, '⛏️'], [/orc/i, '👹'],
        [/phoenix|vermillion/i, '🔥'], [/unicorn/i, '🦄'], [/titan|giant|frost giant|fire giant/i, '🗻'],
        [/magical girl/i, '💖'], [/bunny/i, '🐰'], [/doll/i, '🎎'], [/shikigami/i, '📜'],
        [/weapon/i, '🗡️'], [/armor/i, '🛡️'], [/valkyrie|shield/i, '⚔️'],
        [/yuki|ice|frost/i, '❄️'], [/moon|chang/i, '🌙'], [/sun/i, '☀️'], [/star|astral|cosmic/i, '⭐'],
        [/fire/i, '🔥'], [/water|aqua/i, '💧'], [/wind|air|sylph/i, '🌬️'], [/earth|stone/i, '🪨'],
        [/thunder|lightning|raiju/i, '⚡'], [/light|radiant/i, '💡'], [/dark|shadow|void|night/i, '🌑'],
        [/flower|alraune|bloom/i, '🌸'], [/mushroom/i, '🍄'], [/tree|mandragora|vine/i, '🌿'],
        [/chaos/i, '🌪️'], [/fate|destiny/i, '🔮'], [/dream|nightmare/i, '💭'],
        [/time|chrono/i, '⏳'], [/nature|gaia/i, '🌍'], [/coral|jellyfish/i, '🌊'],
        [/tortoise|genbu/i, '🐢'], [/order/i, '✨'], [/heroic/i, '⚔️'],
        [/gargoyle/i, '🗿'], [/shapeshifter/i, '🔄'], [/mirror/i, '🪞'],
        [/parasite/i, '🧬'], [/multi/i, '🦑'], [/familiar/i, '🐈'],
        [/onmyoji|kami/i, '☯️'], [/xian|celestial/i, '🏔️'], [/deity/i, '👑'],
        [/weaver/i, '🧵'], [/palace/i, '👸'], [/nymph/i, '🌿'], [/siren/i, '🎵'],
        [/griffin/i, '🦅'], [/chimera|nue/i, '🐲'], [/cerberus/i, '🐕'], [/hydra|world serpent/i, '🐍'],
        [/minotaur|satyr/i, '🐂'], [/seahorse/i, '🐴'], [/space/i, '🚀'],
        [/zashiki|tsukumogami/i, '👘'], [/hyakki|parade/i, '🎭'], [/kamaitachi/i, '🌪️'],
        [/bakeneko/i, '🐱']
    ];
    function getIcon(en) {
        for (const [re, icon] of ICON_MAP) { if (re.test(en)) return icon; }
        return '🔹';
    }

    // === 加分特徵 ===
    const BONUS_TRAITS = {
        human: [
            { icon: '🦷', zh: '蒼白肌膚', en: 'pale skin' },
            { icon: '👁️', zh: '紅瞳', en: 'red eyes' },
            { icon: '🦷', zh: '尖牙', en: 'fangs' },
            { icon: '🔄', zh: '變身', en: 'transformation' },
            { icon: '✨', zh: '神聖氣息', en: 'divine aura' },
            { icon: '🛡️', zh: '戰士鎧甲', en: 'warrior armor' },
            { icon: '🧥', zh: '神秘長袍', en: 'mystical robes' }
        ],
        elf: [
            { icon: '🧝', zh: '尖耳', en: 'pointed ears' },
            { icon: '🌸', zh: '優雅', en: 'elegant' },
            { icon: '🏛️', zh: '古老', en: 'ancient' },
            { icon: '🔮', zh: '魔法氣息', en: 'magical aura' },
            { icon: '🌿', zh: '自然', en: 'nature' },
            { icon: '👀', zh: '發光瞳孔', en: 'glowing eyes' },
            { icon: '💇', zh: '長髮', en: 'long hair' },
            { icon: '🌌', zh: '空靈', en: 'ethereal' }
        ],
        beast: [
            { icon: '🐾', zh: '獸耳', en: 'animal ears' },
            { icon: '🦬', zh: '尾巴', en: 'tail' },
            { icon: '🦸', zh: '絨毛', en: 'fur' },
            { icon: '🦷', zh: '尖牙', en: 'fangs' },
            { icon: '💅', zh: '利爪', en: 'claws' },
            { icon: '🐱', zh: '髭鬚', en: 'whiskers' },
            { icon: '☁️', zh: '蓬鬆', en: 'fluffy' },
            { icon: '👁️', zh: '野性眷神', en: 'feral eyes' }
        ],
        mecha: [
            { icon: '⚙️', zh: '機械部件', en: 'mechanical parts' },
            { icon: '💠', zh: '發光電路', en: 'glowing circuits' },
            { icon: '🦿', zh: '金屬肌膚', en: 'metal skin' },
            { icon: '🔫', zh: '雷射眼', en: 'laser eyes' },
            { icon: '🌐', zh: '全息投影', en: 'holographic' },
            { icon: '💡', zh: '霓虹光暈', en: 'neon glow' }
        ],
        myth: [
            { icon: '🪽', zh: '翼翅', en: 'wings' },
            { icon: '😇', zh: '光環', en: 'halo' },
            { icon: '🦷', zh: '角', en: 'horns' },
            { icon: '✨', zh: '神聖之光', en: 'divine light' },
            { icon: '🐉', zh: '鱗片', en: 'scales' },
            { icon: '🔱', zh: '三叉戟', en: 'trident' },
            { icon: '👑', zh: '皇冠', en: 'crown' },
            { icon: '🔥', zh: '聖焰', en: 'sacred flame' }
        ],
        undead: [
            { icon: '🦷', zh: '蒼白肌膚', en: 'pale skin' },
            { icon: '💀', zh: '空洞眼眶', en: 'hollow eyes' },
            { icon: '💠', zh: '骷髅化', en: 'skeletal' },
            { icon: '👻', zh: '幽靈光暈', en: 'ghostly glow' },
            { icon: '🌑', zh: '黑暗氣息', en: 'dark aura' },
            { icon: '⛓️', zh: '鎖鏈', en: 'chains' },
            { icon: '🧥', zh: '殘破斗篷', en: 'tattered cloak' },
            { icon: '🩸', zh: '血液', en: 'blood' }
        ],
        yokai: [
            { icon: '👹', zh: '鬼角', en: 'oni horns' },
            { icon: '🎭', zh: '狐狸面具', en: 'fox mask' },
            { icon: '🔥', zh: '靈火', en: 'spiritual fire' },
            { icon: '👘', zh: '和服', en: 'kimono' },
            { icon: '📜', zh: '紙符', en: 'paper talismans' },
            { icon: '🌫️', zh: '靈霧', en: 'ethereal mist' },
            { icon: '❤️', zh: '紅色紋様', en: 'red markings' }
        ],
        other: [
            { icon: '✨', zh: '超自然氣息', en: 'supernatural aura' },
            { icon: '💎', zh: '水晶化', en: 'crystalline' },
            { icon: '👽', zh: '外星特徵', en: 'alien features' },
            { icon: '🌑', zh: '黑魔法', en: 'dark magic' },
            { icon: '💡', zh: '發光', en: 'glowing' },
            { icon: '👁️', zh: '半透明', en: 'translucent' },
            { icon: '🔄', zh: '變形', en: 'shapeshifting' }
        ],
        fantasy: [
            { icon: '🐲', zh: '龍角', en: 'dragon horns' },
            { icon: '🪽', zh: '龍翼', en: 'dragon wings' },
            { icon: '🦬', zh: '龍尾', en: 'dragon tail' },
            { icon: '🐉', zh: '鱗片', en: 'scales' },
            { icon: '👑', zh: '皇冠', en: 'crown' },
            { icon: '🗻', zh: '巨大化', en: 'massive' },
            { icon: '🌌', zh: '宇宙感', en: 'cosmic' },
            { icon: '🌋', zh: '太古氣息', en: 'primordial aura' }
        ]
    };

    // ========================================
    // openRaceMagicModal — 主函式
    // ========================================
    function openRaceMagicModal() {
        // 建構完整種族列表（加入分類、icon、熱門標記）
        const RACES = RACES_RAW.map(r => ({
            ...r,
            cat: autoClassify(r.en),
            icon: getIcon(r.en),
            isHot: HOT_RACES.includes(r.en)
        }));

        const existing = document.getElementById('race-magic-modal');
        if (existing) existing.remove();

        let selectedRace = null;
        let selectedBonuses = new Set();
        let activeCat = 'hot';
        let searchQuery = '';
        let filterLetter = null;

        const overlay = document.createElement('div');
        overlay.id = 'race-magic-modal';
        overlay.innerHTML = `
    <div class="rmm-flash"></div>
    <div class="rmm-magic-circle">
      <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="#a855f7" stroke-width=".5"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#7c3aed" stroke-width=".3"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#c084fc" stroke-width=".3"/>
      <polygon points="100,15 178,145 22,145" fill="none" stroke="#a855f7" stroke-width=".4"/>
      <polygon points="100,185 22,55 178,55" fill="none" stroke="#7c3aed" stroke-width=".4"/>
      <text x="100" y="105" text-anchor="middle" fill="#a855f7" font-size="8" opacity=".4">✦ MAGIC ✦</text></svg>
    </div>
    <div class="rmm-particles" id="rmm-particles"></div>
    <div class="rmm-container">
      <div class="rmm-dice-overlay" id="rmm-dice-overlay">
        <span class="rmm-dice-emoji" id="rmm-dice-emoji">🎲</span>
      </div>
      <div class="rmm-header">
        <div class="rmm-title-row">
          <div class="rmm-title">🔮 高級魔法・種族大全</div>
          <div class="rmm-toolbar">
            <button class="rmm-tool-btn" id="rmm-dice" title="隨機選取"><span class="rmm-tool-icon">🎲</span> 隨機</button>
          </div>
        </div>
        <div class="rmm-search-row">
          <div class="rmm-search-wrap">
            <i class="fa-solid fa-magnifying-glass rmm-search-icon"></i>
            <input type="text" class="rmm-search" id="rmm-search" placeholder="搜尋種族 Search race...">
          </div>
        </div>
      </div>
      <div class="rmm-tabs" id="rmm-tabs"></div>
      <div class="rmm-body">
        <div class="rmm-main">
          <div class="rmm-grid-wrap" id="rmm-grid-wrap"><div class="rmm-grid" id="rmm-grid"></div></div>
        </div>
        <div class="rmm-az" id="rmm-az"></div>
      </div>
      <div class="rmm-bonus" id="rmm-bonus">
        <div class="rmm-bonus-title">⭐ 點選增加特徵 — <span id="rmm-bonus-race"></span></div>
        <div class="rmm-bonus-tags" id="rmm-bonus-tags"></div>
      </div>
      <div class="rmm-footer">
        <div class="rmm-status" id="rmm-status"></div>
        <div class="rmm-actions">
          <button class="rmm-btn rmm-btn-cancel" id="rmm-cancel">❌ 取消</button>
          <button class="rmm-btn rmm-btn-apply" id="rmm-apply">✨ 套用</button>
        </div>
      </div>
    </div>
  `;
        document.body.appendChild(overlay);

        // === Particles ===
        const pc = document.getElementById('rmm-particles');
        const colors = ['#fbbf24', '#a855f7', '#7c3aed', '#f59e0b', '#c084fc', '#fff', '#e879f9'];
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'rmm-particle';
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
            m.className = 'rmm-meteor';
            m.style.top = (Math.random() * 30) + '%';
            m.style.left = (50 + Math.random() * 50) + '%';
            m.style.animationDelay = (0.5 + Math.random() * 3) + 's';
            m.style.animationDuration = (1 + Math.random() * 1.5) + 's';
            overlay.appendChild(m);
        }

        playOpenSound();

        // === Tabs ===
        const tabsEl = document.getElementById('rmm-tabs');
        RACE_CATEGORIES.forEach(c => {
            let count;
            if (c.id === 'all') count = RACES.length;
            else if (c.id === 'hot') count = HOT_RACES.length;
            else if (c.id === 'recent') count = getRecentRaces().length;
            else count = RACES.filter(r => r.cat === c.id).length;

            const tab = document.createElement('div');
            tab.className = 'rmm-tab' + (c.id === activeCat ? ' active' : '');
            tab.dataset.cat = c.id;
            tab.innerHTML = `<span class="rmm-tab-icon">${c.icon}</span><span class="rmm-tab-label">${c.label}<br>${c.en}</span><span class="rmm-tab-count">${count}</span>`;
            tab.addEventListener('click', () => {
                activeCat = c.id;
                filterLetter = null;
                document.getElementById('rmm-az').querySelectorAll('.rmm-az-letter').forEach(l => l.classList.remove('active'));
                tabsEl.querySelectorAll('.rmm-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderGrid();
            });
            tabsEl.appendChild(tab);
        });

        // === A-Z ===
        const azEl = document.getElementById('rmm-az');
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const el = document.createElement('div');
            el.className = 'rmm-az-letter';
            el.textContent = letter;
            el.addEventListener('click', () => {
                filterLetter = letter;
                searchQuery = '';
                document.getElementById('rmm-search').value = '';
                activeCat = 'all';
                tabsEl.querySelectorAll('.rmm-tab').forEach(t => t.classList.remove('active'));
                tabsEl.querySelector('.rmm-tab').classList.add('active');
                azEl.querySelectorAll('.rmm-az-letter').forEach(l => l.classList.remove('active'));
                el.classList.add('active');
                renderGrid();
            });
            azEl.appendChild(el);
        });

        // === Search ===
        document.getElementById('rmm-search').addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            filterLetter = null;
            azEl.querySelectorAll('.rmm-az-letter').forEach(l => l.classList.remove('active'));
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
        document.getElementById('rmm-dice').addEventListener('click', function () {
            if (diceAnimating) return;
            diceAnimating = true;

            const overlayDice = document.getElementById('rmm-dice-overlay');
            const diceEl = document.getElementById('rmm-dice-emoji');
            const btn = this;

            btn.classList.add('rmm-dice-spinning');
            diceEl.className = 'rmm-dice-emoji';
            void diceEl.offsetWidth;
            overlayDice.classList.add('active');
            playDiceRollSound();

            setTimeout(() => {
                diceEl.classList.add('rolling');
            }, 400);

            setTimeout(() => {
                diceEl.classList.remove('rolling');
                diceEl.classList.add('exit');

                const randomRace = RACES[Math.floor(Math.random() * RACES.length)];
                selectedRace = randomRace;
                selectedBonuses.clear();

                activeCat = randomRace.cat;
                filterLetter = null;
                tabsEl.querySelectorAll('.rmm-tab').forEach(t => t.classList.remove('active'));
                const targetTab = tabsEl.querySelector(`[data-cat="${randomRace.cat}"]`);
                if (targetTab) targetTab.classList.add('active');

                playSelectSound();
                renderGrid();
                renderBonus(randomRace);

                setTimeout(() => {
                    const selectedEl = document.querySelector('.rmm-race-chip.selected');
                    if (selectedEl) {
                        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        selectedEl.classList.add('random-pick');
                    }
                }, 80);

                setTimeout(() => {
                    overlayDice.classList.remove('active');
                    btn.classList.remove('rmm-dice-spinning');
                    diceAnimating = false;
                }, 350);

            }, 1400);
        });

        renderGrid();

        // === Close ===
        function closeModal() {
            overlay.style.animation = 'rmm-fadeIn .3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }
        document.getElementById('rmm-cancel').addEventListener('click', closeModal);
        document.getElementById('rmm-apply').addEventListener('click', () => {
            if (selectedRace) {
                addRecentRace(selectedRace.en);
                // 更新 Recent tab 計數
                const recentTab = tabsEl.querySelector('[data-cat="recent"]');
                if (recentTab) {
                    recentTab.querySelector('.rmm-tab-count').textContent = getRecentRaces().length;
                }
                // ★ 整合關鍵：呼叫主頁面的 selectOption 更新種族選擇
                selectOption('race', selectedRace.value, { label: selectedRace.label, en: selectedRace.en, value: selectedRace.value });
                // 如果有加分特徵，附加到自訂欄位
                const bonusArr = [...selectedBonuses];
                if (bonusArr.length) {
                    state.customInputs['race'] = (state.customInputs['race'] || '') +
                        (state.customInputs['race'] ? ', ' : '') + bonusArr.join(', ');
                    state.customInputVisible['race'] = true;
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

        // === 取得篩選後的種族 ===
        function getFilteredRaces() {
            let filtered = RACES;
            const recent = getRecentRaces();

            if (activeCat === 'recent') {
                filtered = recent.map(en => RACES.find(r => r.en === en)).filter(Boolean);
            } else if (activeCat === 'hot') {
                filtered = RACES.filter(r => r.isHot);
            } else if (activeCat !== 'all') {
                filtered = filtered.filter(r => r.cat === activeCat);
            }

            if (searchQuery) {
                filtered = filtered.filter(r =>
                    r.label.includes(searchQuery) || r.en.toLowerCase().includes(searchQuery) || r.value.toLowerCase().includes(searchQuery)
                );
            }
            if (filterLetter) {
                filtered = filtered.filter(r => r.en.charAt(0).toUpperCase() === filterLetter);
            }
            return filtered;
        }

        function renderGrid() {
            const grid = document.getElementById('rmm-grid');
            const filtered = getFilteredRaces();
            const recent = getRecentRaces();
            const total = RACES.length;
            const shown = filtered.length;
            const selText = selectedRace ? ` | 已選：<b>${selectedRace.label}</b>` : '';
            document.getElementById('rmm-status').innerHTML = `已載入 ${total} 種族 | 顯示 ${shown}/${total}${selText}`;

            grid.innerHTML = '';
            if (!filtered.length) {
                grid.innerHTML = '<div class="rmm-empty">🔍 沒有找到符合的種族</div>';
                return;
            }

            filtered.forEach(race => {
                const chip = document.createElement('div');
                chip.className = 'rmm-race-chip' + (selectedRace && selectedRace.en === race.en ? ' selected' : '');
                chip.innerHTML = `
                    <span class="rmm-chip-icon">${race.icon}</span>
                    <div class="rmm-chip-text">
                        <span class="rmm-chip-zh">${race.label}</span>
                        <span class="rmm-chip-en">${race.en}</span>
                    </div>
                    ${race.isHot ? '<span class="rmm-hot-badge">🔥</span>' : ''}
                    ${recent.includes(race.en) ? '<span class="rmm-recent-badge">📋</span>' : ''}
                `;
                chip.addEventListener('click', () => {
                    if (selectedRace && selectedRace.en === race.en) {
                        selectedRace = null;
                        selectedBonuses.clear();
                    } else {
                        selectedRace = race;
                        selectedBonuses.clear();
                    }
                    playSelectSound();
                    renderGrid();
                    renderBonus(selectedRace);
                });
                grid.appendChild(chip);
            });

            document.getElementById('rmm-grid-wrap').scrollTop = 0;
        }

        function renderBonus(race) {
            const panel = document.getElementById('rmm-bonus');
            const tagsEl = document.getElementById('rmm-bonus-tags');
            const nameEl = document.getElementById('rmm-bonus-race');
            if (!race) { panel.classList.remove('show'); return; }
            const traits = BONUS_TRAITS[race.cat] || [];
            if (!traits.length) { panel.classList.remove('show'); return; }
            nameEl.textContent = race.label + ' ' + race.en;
            tagsEl.innerHTML = '';
            traits.forEach(trait => {
                const tag = document.createElement('button');
                tag.className = 'rmm-bonus-tag' + (selectedBonuses.has(trait.en) ? ' active' : '');
                tag.innerHTML = `<span class="rmm-chip-icon">${trait.icon}</span> ${trait.zh}`;
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
        openRaceMagicModal
    };
})();
