// ============================================
// AI Prompt Generator — Race Magic 資料
// 種族分類 + Icon 映射 + 加分特徵
// 掛載至 window.PromptGen.RaceMagicData
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.RaceMagicData = (function () {

    // ── 分類 Tab 定義 ──
    const CATEGORIES = [
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

    // ── 🔥 Top 20 熱門種族 ──
    const HOT_ITEMS = [
        'Human', 'Elf', 'Angel', 'Demon', 'Vampire', 'Succubus', 'Dragon', 'Cat Girl', 'Fox Girl',
        'Mermaid', 'Fairy', 'Bunny Girl', 'Dark Elf', 'Valkyrie', 'Kitsune',
        'Ghost', 'Android', 'Magical Girl', 'Wolf Girl', 'High Elf'
    ];

    // ── 分類映射 ──
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

    // ── Icon 映射（正則→emoji）──
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

    // ── 加分特徵 ──
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

    // ── 工具函式 ──
    function autoClassify(en) {
        for (const [cat, names] of Object.entries(CATEGORY_MAP)) {
            if (names.includes(en)) return cat;
        }
        return 'other';
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
