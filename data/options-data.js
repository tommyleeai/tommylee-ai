// ============================================
// AI Prompt Generator — 選項資料
// 從 script.js 提取，掛載至 window.PromptGen.Data
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.Data = (function () {
    // ===== v5.0 TAB DATA =====
    const TABS = [
        { id: 'base', label: '基本', en: 'Basic', icon: 'fa-solid fa-user' },
        { id: 'appearance', label: '外觀', en: 'Appearance', icon: 'fa-solid fa-shirt' },
        { id: 'action', label: '動作', en: 'Action', icon: 'fa-solid fa-bolt' },
        { id: 'style', label: '風格', en: 'Style', icon: 'fa-solid fa-palette' },
        { id: 'environment', label: '環境', en: 'Environment', icon: 'fa-solid fa-cloud-sun' },
        { id: 'camera', label: '攝影', en: 'Camera', icon: 'fa-solid fa-camera' }
    ];

    const RACES = [
        // ── 經典奇幻 Top 20 ──
        { label: '人類', en: 'Human', value: 'human' },
        { label: '精靈', en: 'Elf', value: 'elf, pointed ears' },
        { label: '天使', en: 'Angel', value: 'angel, white wings, halo' },
        { label: '惡魔', en: 'Demon', value: 'demon, horns, wings, tail' },
        { label: '吸血鬼', en: 'Vampire', value: 'vampire, pale skin, red eyes, fangs' },
        { label: '魅魔', en: 'Succubus', value: 'succubus, bat wings, heart tail' },
        { label: '龍人', en: 'Dragon', value: 'dragon girl, dragon horns, tail, scales' },
        { label: '妖精', en: 'Fairy', value: 'fairy, small wings, tiny body, glowing' },
        { label: '人魚', en: 'Mermaid', value: 'mermaid, fish tail, underwater' },
        { label: '幽靈', en: 'Ghost', value: 'ghost, translucent, spirit, floating' },
        { label: '機器人', en: 'Android', value: 'android, robot, mechanical parts' },
        { label: '獸人', en: 'Kemonomimi', value: 'kemonomimi, animal ears, tail' },
        { label: '矮人', en: 'Dwarf', value: 'dwarf, short, stocky' },
        { label: '半獸人', en: 'Orc', value: 'orc, green skin, tusks' },
        { label: '殭屍', en: 'Zombie', value: 'zombie, pale, undead' },
        { label: '外星人', en: 'Alien', value: 'alien, extraterrestrial' },
        { label: '史萊姆', en: 'Slime', value: 'slime girl, translucent skin' },
        { label: '兔女郎', en: 'Bunny Girl', value: 'bunny girl, rabbit ears' },
        { label: '狐娘', en: 'Fox Girl', value: 'fox girl, fox ears, multiple tails' },
        { label: '貓娘', en: 'Cat Girl', value: 'cat girl, cat ears, cat tail' },
        // ── 獸耳系 (Kemonomimi) ──
        { label: '犬娘', en: 'Dog Girl', value: 'dog girl, dog ears, dog tail, floppy ears' },
        { label: '狼女', en: 'Wolf Girl', value: 'wolf girl, wolf ears, wolf tail, fierce' },
        { label: '虎娘', en: 'Tiger Girl', value: 'tiger girl, tiger ears, tiger tail, striped' },
        { label: '馬娘', en: 'Horse Girl', value: 'horse girl, horse ears, horse tail' },
        { label: '蛇娘', en: 'Snake Girl', value: 'lamia, snake girl, snake tail, scales' },
        { label: '蜘蛛娘', en: 'Spider Girl', value: 'arachne, spider girl, spider legs, web' },
        { label: '鳥人', en: 'Harpy', value: 'harpy, bird wings, feathered arms, talons' },
        { label: '蝙蝠娘', en: 'Bat Girl', value: 'bat girl, bat wings, bat ears, nocturnal' },
        { label: '鼠娘', en: 'Mouse Girl', value: 'mouse girl, mouse ears, small, mouse tail' },
        { label: '羊娘', en: 'Sheep Girl', value: 'sheep girl, sheep horns, fluffy, wool' },
        { label: '鯊魚娘', en: 'Shark Girl', value: 'shark girl, shark tail, sharp teeth, fin' },
        { label: '鹿娘', en: 'Deer Girl', value: 'deer girl, antlers, deer ears, gentle' },
        { label: '熊娘', en: 'Bear Girl', value: 'bear girl, bear ears, strong, fluffy' },
        { label: '獅娘', en: 'Lion Girl', value: 'lion girl, lion ears, mane, lion tail' },
        { label: '松鼠娘', en: 'Squirrel Girl', value: 'squirrel girl, bushy tail, squirrel ears' },
        { label: '孔雀娘', en: 'Peacock Girl', value: 'peacock girl, peacock feathers, elegant' },
        { label: '鶴娘', en: 'Crane Girl', value: 'crane girl, crane wings, white feathers, graceful' },
        { label: '蜥蜴娘', en: 'Lizard Girl', value: 'lizard girl, scales, tail, reptilian' },
        { label: '章魚娘', en: 'Octopus Girl', value: 'octopus girl, tentacles, sea creature' },
        { label: '蜜蜂娘', en: 'Bee Girl', value: 'bee girl, bee wings, antennae, striped' },
        // ── 日本妖怪系 ──
        { label: '九尾狐', en: 'Kitsune', value: 'kitsune, nine tails, fox ears, mystical' },
        { label: '鬼 (日本)', en: 'Oni', value: 'oni, single horn, red skin, fearsome' },
        { label: '天狗', en: 'Tengu', value: 'tengu, crow wings, long nose, mountain spirit' },
        { label: '河童', en: 'Kappa', value: 'kappa, turtle shell, water creature, beak' },
        { label: '雪女', en: 'Yuki-onna', value: 'yuki-onna, ice spirit, pale skin, snow, cold' },
        { label: '化猫', en: 'Bakeneko', value: 'bakeneko, cat spirit, two tails, supernatural cat' },
        { label: '座敷童子', en: 'Zashiki-warashi', value: 'zashiki-warashi, child spirit, kimono, playful ghost' },
        { label: '般若', en: 'Hannya', value: 'hannya, demon mask, horns, jealous spirit' },
        { label: '絡新婦', en: 'Jorogumo', value: 'jorogumo, spider woman, beautiful, web' },
        { label: '天女', en: 'Tennin', value: 'tennin, celestial maiden, feathered robe, flying' },
        { label: '鎌鼬', en: 'Kamaitachi', value: 'kamaitachi, weasel spirit, wind blade, swift' },
        { label: '付喪神', en: 'Tsukumogami', value: 'tsukumogami, object spirit, animated object' },
        { label: '鵺', en: 'Nue', value: 'nue, chimera, monkey head, snake tail, tanuki body' },
        { label: '白面金毛九尾', en: 'Tamamo-no-Mae', value: 'tamamo-no-mae, golden fox, nine tails, divine' },
        { label: '百鬼夜行', en: 'Hyakki Yagyo', value: 'yokai parade, ghostly procession, supernatural' },
        { label: '玉藻前', en: 'Lady Fox Spirit', value: 'fox spirit, golden fur, elegant, mystical shrine maiden' },
        // ── 神話・聖域 ──
        { label: '半神', en: 'Demigod', value: 'demigod, divine aura, godly, heroic' },
        { label: '墮天使', en: 'Fallen Angel', value: 'fallen angel, black wings, broken halo, dark' },
        { label: '女武神', en: 'Valkyrie', value: 'valkyrie, winged helm, norse, warrior maiden' },
        { label: '半人馬', en: 'Centaur', value: 'centaur, horse body, human torso' },
        { label: '美杜莎', en: 'Medusa', value: 'medusa, snake hair, gorgon, petrifying gaze' },
        { label: '獅鷲', en: 'Griffin Rider', value: 'griffin rider, eagle head, lion body, majestic' },
        { label: '鳳凰', en: 'Phoenix', value: 'phoenix girl, fire wings, rebirth, flame feathers' },
        { label: '獨角獸', en: 'Unicorn', value: 'unicorn girl, horn, pure white, magical' },
        { label: '人面獅身', en: 'Sphinx', value: 'sphinx, lion body, human face, riddle, ancient' },
        { label: '塞壬', en: 'Siren', value: 'siren, singing, ocean, enchanting voice, feathered' },
        { label: '米諾陶洛斯', en: 'Minotaur', value: 'minotaur, bull head, labyrinth, muscular' },
        { label: '九頭蛇', en: 'Hydra', value: 'hydra, multiple heads, serpentine, regenerating' },
        { label: '奇美拉', en: 'Chimera', value: 'chimera, lion head, goat body, snake tail' },
        { label: '刻耳柏洛斯', en: 'Cerberus', value: 'cerberus girl, three heads, guard dog, underworld' },
        { label: '天馬', en: 'Pegasus', value: 'pegasus girl, winged horse, flying, majestic' },
        { label: '寧芙', en: 'Nymph', value: 'nymph, nature spirit, beautiful, forest' },
        { label: '薩提爾', en: 'Satyr', value: 'satyr, goat legs, pan flute, woodland' },
        { label: '巨人', en: 'Giant', value: 'giant, colossal, towering, massive' },
        // ── 元素精靈 ──
        { label: '火精靈', en: 'Fire Spirit', value: 'fire spirit, flame body, ember eyes, burning' },
        { label: '水精靈', en: 'Water Spirit', value: 'water spirit, aqua body, flowing, transparent' },
        { label: '風精靈', en: 'Wind Spirit', value: 'wind spirit, air elemental, floating, breezy' },
        { label: '土精靈', en: 'Earth Spirit', value: 'earth spirit, stone skin, crystal, nature' },
        { label: '雷精靈', en: 'Thunder Spirit', value: 'thunder spirit, lightning, electric, sparking' },
        { label: '冰精靈', en: 'Ice Spirit', value: 'ice spirit, frozen, crystal clear, frost' },
        { label: '光精靈', en: 'Light Spirit', value: 'light spirit, radiant, glowing, luminous' },
        { label: '暗精靈', en: 'Dark Spirit', value: 'dark spirit, shadow, void, mysterious darkness' },
        { label: '花精靈', en: 'Flower Spirit', value: 'flower spirit, petal skin, blooming, fragrant' },
        { label: '星精靈', en: 'Star Spirit', value: 'star spirit, stellar, cosmic glow, stardust' },
        // ── 精靈族變種 ──
        { label: '暗黑精靈', en: 'Dark Elf', value: 'dark elf, drow, dark skin, white hair, red eyes' },
        { label: '高等精靈', en: 'High Elf', value: 'high elf, noble, ancient, golden hair, regal' },
        { label: '木精靈', en: 'Wood Elf', value: 'wood elf, forest, green attire, nature bond' },
        { label: '月精靈', en: 'Moon Elf', value: 'moon elf, silver hair, moonlight, ethereal' },
        { label: '海精靈', en: 'Sea Elf', value: 'sea elf, aquatic, blue skin, gills, underwater' },
        { label: '血精靈', en: 'Blood Elf', value: 'blood elf, glowing eyes, arcane, elegant' },
        { label: '太陽精靈', en: 'Sun Elf', value: 'sun elf, golden skin, radiant, solar magic' },
        // ── 不死族 ──
        { label: '骷髏', en: 'Skeleton', value: 'skeleton, bone, undead, hollow eyes' },
        { label: '巫妖', en: 'Lich', value: 'lich, undead mage, phylactery, dark magic' },
        { label: '木乃伊', en: 'Mummy', value: 'mummy, bandaged, ancient, cursed' },
        { label: '死靈', en: 'Wraith', value: 'wraith, shadow undead, incorporeal, dark cloak' },
        { label: '死神', en: 'Grim Reaper', value: 'grim reaper, scythe, black cloak, death' },
        { label: '屍鬼', en: 'Ghoul', value: 'ghoul, undead, feral, flesh eater' },
        { label: '亡靈騎士', en: 'Death Knight', value: 'death knight, black armor, undead warrior, cursed sword' },
        { label: '骸骨龍', en: 'Dracolich', value: 'dracolich, skeletal dragon, undead dragon, dark' },
        // ── 龍族變種 ──
        { label: '古龍', en: 'Elder Dragon', value: 'elder dragon, ancient dragon, wise, massive' },
        { label: '飛龍', en: 'Wyvern', value: 'wyvern, two-legged dragon, wings, fierce' },
        { label: '龍族公主', en: 'Dragon Princess', value: 'dragon princess, dragon horns, royal, scales, elegant' },
        { label: '冰龍', en: 'Ice Dragon', value: 'ice dragon, frost breath, frozen scales, arctic' },
        { label: '火龍', en: 'Fire Dragon', value: 'fire dragon, flame breath, molten scales, volcanic' },
        { label: '東方龍', en: 'Eastern Dragon', value: 'eastern dragon, chinese dragon, serpentine, whiskers, clouds' },
        // ── 惡魔系 ──
        { label: '大惡魔', en: 'Arch Demon', value: 'arch demon, massive wings, burning eyes, infernal' },
        { label: '夢魔', en: 'Nightmare', value: 'nightmare demon, dream eater, sleep, dark mist' },
        { label: '小惡魔', en: 'Imp', value: 'imp, small demon, mischievous, tiny wings' },
        { label: '夜叉', en: 'Yaksha', value: 'yaksha, nature demon, fierce guardian, fangs' },
        { label: '羅剎', en: 'Rakshasa', value: 'rakshasa, shape-shifting demon, tiger claws, illusion' },
        { label: '阿修羅', en: 'Asura', value: 'asura, multiple arms, warrior demon, fierce' },
        { label: '魔王', en: 'Demon Lord', value: 'demon lord, crown, throne, overwhelming power' },
        // ── 天族・神族 ──
        { label: '神族', en: 'Deity', value: 'deity, divine being, golden aura, omnipotent' },
        { label: '精霊', en: 'Spirit', value: 'spirit, ethereal, natural force, transparent' },
        { label: '仙人', en: 'Xian', value: 'xian, immortal, taoist, cloud riding, mystical' },
        { label: '天人', en: 'Celestial', value: 'celestial being, heavenly, divine robes, halo' },
        { label: '神靈', en: 'Kami', value: 'kami, shinto spirit, sacred, divine presence' },
        // ── 植物・自然族 ──
        { label: '花妖', en: 'Flower Yokai', value: 'flower yokai, petal body, blooming, nature spirit' },
        { label: '蘑菇娘', en: 'Mushroom Girl', value: 'mushroom girl, mushroom cap, spore, forest' },
        { label: '曼德拉草', en: 'Mandragora', value: 'mandragora, plant girl, root body, screaming' },
        { label: '樹人', en: 'Treant', value: 'treant, tree person, bark skin, ancient forest' },
        { label: '藤蔓精', en: 'Vine Spirit', value: 'vine spirit, ivy body, thorns, green' },
        { label: '花嫁精靈', en: 'Alraune', value: 'alraune, flower girl, sitting in flower, nectar' },
        // ── 水棲・海洋族 ──
        { label: '海龍', en: 'Sea Dragon', value: 'sea dragon, ocean serpent, aquatic scales, deep sea' },
        { label: '水妖', en: 'Undine', value: 'undine, water nymph, aquatic, flowing hair' },
        { label: '水母娘', en: 'Jellyfish Girl', value: 'jellyfish girl, translucent, tentacles, glowing' },
        { label: '海妖', en: 'Kraken Girl', value: 'kraken girl, tentacles, deep sea, massive' },
        { label: '珊瑚精', en: 'Coral Spirit', value: 'coral spirit, reef body, colorful, ocean' },
        { label: '深海魚人', en: 'Deep One', value: 'deep one, fish person, bioluminescent, abyssal' },
        // ── 機械・科幻系 ──
        { label: '賽博格', en: 'Cyborg', value: 'cyborg, cybernetic, half machine, glowing circuits' },
        { label: '機械天使', en: 'Mecha Angel', value: 'mecha angel, mechanical wings, holy machine, futuristic' },
        { label: '人造人', en: 'Homunculus', value: 'homunculus, artificial being, alchemical, flask born' },
        { label: '虛擬偶像', en: 'Virtual Idol', value: 'virtual idol, digital, hologram, neon, vocaloid-like' },
        { label: '奈米機器人', en: 'Nano Being', value: 'nano being, nanomachine body, shapeshifting, tech' },
        { label: '太空精靈', en: 'Space Elf', value: 'space elf, cosmic, futuristic elf, star ship' },
        // ── 異形・變異 ──
        { label: '影人', en: 'Shadow Person', value: 'shadow person, living shadow, dark silhouette' },
        { label: '多腳種', en: 'Multi-limbed', value: 'multi-armed, extra limbs, multiple arms' },
        { label: '結晶體', en: 'Crystal Being', value: 'crystal being, gem body, prismatic, reflective' },
        { label: '泥偶', en: 'Golem', value: 'golem, stone body, magical construct, rune inscribed' },
        { label: '寄生體', en: 'Parasite Host', value: 'parasitic symbiont, alien growth, merged being' },
        { label: '鏡像', en: 'Mirror Being', value: 'mirror being, reflective skin, doppelganger, silver' },
        // ── 西洋奇幻追加 ──
        { label: '地精', en: 'Goblin', value: 'goblin, small, green, pointy ears, mischievous' },
        { label: '巨魔', en: 'Troll', value: 'troll, regenerating, large, bridge guardian' },
        { label: '變形者', en: 'Shapeshifter', value: 'shapeshifter, morphing, fluid form, disguise' },
        { label: '狼人', en: 'Werewolf', value: 'werewolf, wolf transformation, moonlight, feral' },
        { label: '石像鬼', en: 'Gargoyle', value: 'gargoyle, stone wings, perched, gothic' },
        { label: '食人魔', en: 'Ogre', value: 'ogre, large, brute, club wielding' },
        { label: '拉蜜亞', en: 'Lamia', value: 'lamia, snake lower body, seductive, coiling' },
        { label: '地侏', en: 'Gnome', value: 'gnome, tiny, earth magic, mushroom hat' },
        { label: '夜魔', en: 'Night Hag', value: 'night hag, nightmare, dark magic, crone' },
        { label: '刺客蟲', en: 'Thri-kreen', value: 'insectoid, mantis arms, compound eyes, chitin' },
        // ── 東方神話追加 ──
        { label: '白蛇', en: 'White Serpent', value: 'white snake spirit, elegant, chinese mythology, divine serpent' },
        { label: '嫦娥', en: "Chang'e", value: 'chang-e, moon goddess, moon rabbit, celestial beauty' },
        { label: '龍宮公主', en: 'Dragon Palace Princess', value: 'otohime, dragon palace, underwater princess, sea jewels' },
        { label: '織女', en: 'Weaver Girl', value: 'orihime, weaver princess, starlight, celestial loom' },
        { label: '雷獸', en: 'Raiju', value: 'raiju, thunder beast, lightning creature, electric fur' },
        { label: '麒麟', en: 'Qilin', value: 'qilin, kirin, benevolent beast, scales, antlers, holy' },
        { label: '朱雀', en: 'Vermillion Bird', value: 'vermillion bird, fire phoenix, southern guardian, crimson' },
        { label: '玄武', en: 'Black Tortoise', value: 'genbu, black tortoise, snake-tortoise, northern guardian' },
        { label: '青龍', en: 'Azure Dragon', value: 'seiryu, azure dragon, eastern guardian, blue dragon' },
        { label: '白虎', en: 'White Tiger', value: 'byakko, white tiger, western guardian, fierce' },
        // ── 北歐神話 ──
        { label: '矮人鍛造', en: 'Norse Dwarf', value: 'norse dwarf, blacksmith, rune forger, mountain' },
        { label: '光之精靈', en: 'Light Elf', value: 'ljosalfar, light elf, radiant, alfheim' },
        { label: '暗之精靈', en: 'Dark Elf (Norse)', value: 'dokkalfar, dark elf, underground, svartalfheim' },
        { label: '霜巨人', en: 'Frost Giant', value: 'frost giant, jotun, ice, massive, jotunheim' },
        { label: '火巨人', en: 'Fire Giant', value: 'fire giant, muspel, flame, burning, muspelheim' },
        { label: '世界蛇', en: 'World Serpent', value: 'jormungandr, world serpent, ocean coiling, massive' },
        // ── 混血・亞種 ──
        { label: '半精靈', en: 'Half-Elf', value: 'half-elf, mixed heritage, slightly pointed ears' },
        { label: '半龍人', en: 'Half-Dragon', value: 'half-dragon, partial scales, dragon eye, human form' },
        { label: '半天使', en: 'Nephilim', value: 'nephilim, half angel, partial wings, divine blood' },
        { label: '半惡魔', en: 'Tiefling', value: 'tiefling, small horns, tail, demonic heritage' },
        { label: '半妖', en: 'Half-Yokai', value: 'hanyo, half demon, mixed form, dual nature' },
        { label: '獸化人', en: 'Beastkin', value: 'beastkin, partial animal features, tribal, wild' },
        // ── 幻想生物 ──
        { label: '泰坦', en: 'Titan', value: 'titan, colossal, primordial, overwhelming' },
        { label: '精靈王', en: 'Elf King', value: 'elf king, ancient, crown of leaves, supreme elf' },
        { label: '夢境生物', en: 'Dream Being', value: 'dream creature, surreal, shifting form, illusory' },
        { label: '星界生物', en: 'Astral Being', value: 'astral being, star body, cosmic consciousness, ethereal' },
        { label: '虛空存在', en: 'Void Being', value: 'void being, emptiness, dark matter, cosmic horror' },
        { label: '時間精靈', en: 'Time Spirit', value: 'chrono spirit, time elemental, clockwork, aging and youth' },
        // ── 精神・概念體 ──
        { label: '夢魘化身', en: 'Nightmare Avatar', value: 'nightmare incarnation, fear manifest, horror form' },
        { label: '命運女神', en: 'Fate Goddess', value: 'moira, fate weaver, thread of destiny, oracle' },
        { label: '混沌獸', en: 'Chaos Beast', value: 'chaos beast, shifting, unstable form, entropy' },
        { label: '秩序天使', en: 'Order Angel', value: 'order angel, geometric wings, law incarnate, symmetry' },
        { label: '自然化身', en: 'Nature Avatar', value: 'nature incarnation, gaia, world tree spirit, mother earth' },
        { label: '星辰使者', en: 'Star Messenger', value: 'star messenger, celestial herald, comet trail, cosmic' },
        // ── 動漫特殊系 ──
        { label: '魔法少女', en: 'Magical Girl', value: 'magical girl, transformation, sparkle, wand, ribbon' },
        { label: '式神', en: 'Shikigami', value: 'shikigami, paper talisman, onmyoji servant, spirit familiar' },
        { label: '英靈', en: 'Heroic Spirit', value: 'heroic spirit, legendary warrior, summoned, golden aura' },
        { label: '人偶', en: 'Living Doll', value: 'living doll, ball-jointed doll, porcelain skin, glass eyes' },
        { label: '使魔', en: 'Familiar', value: 'familiar, magical companion, bonded spirit, small creature' },
        { label: '神器擬人', en: 'Weapon Spirit', value: 'weapon spirit, sentient sword, living weapon, humanoid form' },
        // ── 亞人族追加 ──
        { label: '海馬娘', en: 'Seahorse Girl', value: 'seahorse girl, aquatic, curled tail, ocean' },
        { label: '蠍娘', en: 'Scorpion Girl', value: 'scorpion girl, scorpion tail, pincers, desert' },
        { label: '燕娘', en: 'Swallow Girl', value: 'swallow girl, swift wings, agile, sky dancer' },
        { label: '螢火蟲精', en: 'Firefly Spirit', value: 'firefly spirit, bioluminescent, soft glow, night' },
        { label: '珍珠精', en: 'Pearl Spirit', value: 'pearl spirit, lustrous skin, oyster, ocean treasure' },
        { label: '雷鳥', en: 'Thunderbird', value: 'thunderbird girl, storm wings, lightning, native spirit' },
        { label: '迦樓羅', en: 'Garuda', value: 'garuda, golden wings, eagle warrior, divine bird' },
        { label: '天鵝娘', en: 'Swan Girl', value: 'swan girl, white feathers, graceful, lake' },
        { label: '鳳蝶精', en: 'Butterfly Spirit', value: 'butterfly spirit, colorful wings, metamorphosis, pollen' },
        { label: '水晶龍', en: 'Crystal Dragon', value: 'crystal dragon, gem scales, prismatic breath, treasure' },
        { label: '影龍', en: 'Shadow Dragon', value: 'shadow dragon, dark scales, shadow breath, stealth' },
        { label: '風之民', en: 'Sylph', value: 'sylph, wind being, delicate wings, air dancer' },
        { label: '火蜥蜴', en: 'Salamander', value: 'salamander, fire lizard, heat aura, volcanic' },
        { label: '鬼火精', en: 'Will-o-Wisp', value: 'will-o-wisp girl, floating flame, ghost light, marsh' },
        { label: '血族貴族', en: 'Vampire Noble', value: 'vampire noble, aristocratic, blood red eyes, cape, mansion' },
        { label: '陰陽師', en: 'Onmyoji Spirit', value: 'onmyoji spirit, yin yang, talisman, japanese mystic' },
        { label: '戰乙女', en: 'Shield Maiden', value: 'shield maiden, norse warrior, braided hair, fierce' },
        { label: '鎧武者靈', en: 'Armor Spirit', value: 'living armor, haunted armor, samurai ghost, empty helm' },
        { label: '結界師', en: 'Barrier Mage', value: 'barrier mage, mystic shields, rune caster, protective' }
    ];

    const JOBS = [
        // Top otaku favorites
        { label: '女僕', en: 'Maid', value: 'maid, maid headdress' },
        { label: '學生', en: 'Student', value: 'student, school uniform' },
        { label: '偶像', en: 'Idol', value: 'idol, stage outfit, microphone' },
        { label: '巫女', en: 'Shrine Maiden', value: 'shrine maiden, miko' },
        { label: '護士', en: 'Nurse', value: 'nurse, hospital' },
        { label: '魔法師', en: 'Mage', value: 'mage, wizard, robe, staff' },
        { label: 'OL', en: 'Office Lady', value: 'office lady, business suit' },
        { label: '公主', en: 'Princess', value: 'princess, tiara, dress' },
        { label: '騎士', en: 'Knight', value: 'knight, armor, sword' },
        { label: '修女', en: 'Nun', value: 'nun, habit' },
        { label: '女王', en: 'Queen', value: 'queen, crown, royalty' },
        { label: '忍者', en: 'Ninja', value: 'ninja, shinobi' },
        { label: '戰士', en: 'Warrior', value: 'warrior, fighting stance' },
        { label: '執事', en: 'Butler', value: 'butler, suit' },
        { label: '弓箭手', en: 'Archer', value: 'archer, holding bow' },
        { label: '魔王', en: 'Demon Lord', value: 'demon lord, dark power' },
        { label: '勇者', en: 'Hero', value: 'hero, legendary sword' },
        { label: '盜賊', en: 'Rogue', value: 'thief, rogue, dagger' },
        { label: '殺手', en: 'Assassin', value: 'assassin, dark clothes' },
        { label: '牧師', en: 'Cleric', value: 'cleric, priest, healer' },
        { label: '警察', en: 'Police', value: 'police officer, uniform' },
        { label: '軍人', en: 'Soldier', value: 'soldier, military' },
        { label: '海盜', en: 'Pirate', value: 'pirate, eyepatch' },
        { label: '廚師', en: 'Chef', value: 'chef, apron' },
        { label: '運動員', en: 'Athlete', value: 'athlete, sportswear' },
        { label: '偵探', en: 'Detective', value: 'detective, magnifying glass' },
        { label: '太空人', en: 'Astronaut', value: 'astronaut, spacesuit' },
        { label: '賽車手', en: 'Racer', value: 'racer, racing suit' },
        { label: '音樂家', en: 'Musician', value: 'musician, instrument' },
        { label: '畫家', en: 'Painter', value: 'painter, beret, palette' },
        // New 20 otaku-favorite additions
        { label: '魔女', en: 'Witch', value: 'witch, hat, broom, magic' },
        { label: 'Coser', en: 'Cosplayer', value: 'cosplayer, costume' },
        { label: '啦啦隊', en: 'Cheerleader', value: 'cheerleader, pom poms, uniform' },
        { label: '賞金獵人', en: 'Bounty Hunter', value: 'bounty hunter, weapons' },
        { label: '吟遊詩人', en: 'Bard', value: 'bard, lute, traveling clothes' },
        { label: '鍊金術師', en: 'Alchemist', value: 'alchemist, potions, flask' },
        { label: '舞者', en: 'Dancer', value: 'dancer, elegant pose' },
        { label: '馴獸師', en: 'Beast Tamer', value: 'beast tamer, whip' },
        { label: '機械師', en: 'Mechanic', value: 'mechanic, wrench, goggles' },
        { label: '空姐', en: 'Flight Attendant', value: 'flight attendant, uniform' },
        { label: '模特兒', en: 'Model', value: 'model, fashion, runway' },
        { label: '花魁', en: 'Oiran', value: 'oiran, ornate kimono, hair ornaments' },
        { label: '劍士', en: 'Swordsman', value: 'swordsman, katana, samurai' },
        { label: '歌姬', en: 'Songstress', value: 'songstress, singing, elegant dress' },
        { label: '傭兵', en: 'Mercenary', value: 'mercenary, battle-worn armor' },
        { label: '調酒師', en: 'Bartender', value: 'bartender, cocktail shaker, vest' },
        { label: '教師', en: 'Teacher', value: 'teacher, glasses, classroom' },
        { label: '圖書館員', en: 'Librarian', value: 'librarian, glasses, books' },
        { label: '占卜師', en: 'Fortune Teller', value: 'fortune teller, crystal ball, mysterious' },
        { label: '獵人', en: 'Hunter', value: 'hunter, crossbow, camouflage' }
    ];

    // ── Conflict Rules ──
    const CONFLICT_RULES = [
        // ═══════════════════════════════════════════
        // A. 種族 × 職業 (race × job)
        // ═══════════════════════════════════════════

        // 💀 亡靈系 vs 神聖職業
        { a: 'race', b: 'job', keyword_a: 'lich', keyword_b: 'shrine maiden', reason: '💀 亡靈與神聖力量互斥' },
        { a: 'race', b: 'job', keyword_a: 'lich', keyword_b: 'cleric', reason: '💀 巫妖與治癒魔法互斥' },
        { a: 'race', b: 'job', keyword_a: 'skeleton', keyword_b: 'shrine maiden', reason: '💀 白骨與淨化衝突' },
        { a: 'race', b: 'job', keyword_a: 'skeleton', keyword_b: 'cleric', reason: '💀 骷髏與治癒魔法衝突' },
        { a: 'race', b: 'job', keyword_a: 'wraith', keyword_b: 'shrine maiden', reason: '💀 怨靈與聖地衝突' },
        { a: 'race', b: 'job', keyword_a: 'wraith', keyword_b: 'cleric', reason: '💀 怨靈與治癒衝突' },
        { a: 'race', b: 'job', keyword_a: 'ghoul', keyword_b: 'shrine maiden', reason: '💀 屍鬼與神社服務衝突' },
        { a: 'race', b: 'job', keyword_a: 'death knight', keyword_b: 'shrine maiden', reason: '💀 亡靈騎士 vs 神聖服務' },
        { a: 'race', b: 'job', keyword_a: 'death knight', keyword_b: 'cleric', reason: '💀 亡靈騎士 vs 治癒' },
        { a: 'race', b: 'job', keyword_a: 'zombie', keyword_b: 'shrine maiden', reason: '🧟 殭屍與神聖互斥' },
        { a: 'race', b: 'job', keyword_a: 'zombie', keyword_b: 'cleric', reason: '🧟 殭屍與治癒互斥' },
        { a: 'race', b: 'job', keyword_a: 'zombie', keyword_b: 'chef', reason: '🧟 殭屍做菜有衛生問題' },
        { a: 'race', b: 'job', keyword_a: 'zombie', keyword_b: 'nurse', reason: '🧟 殭屍當護士有衛生問題' },
        { a: 'race', b: 'job', keyword_a: 'dracolich', keyword_b: 'shrine maiden', reason: '💀 骸骨龍與神聖互斥' },
        { a: 'race', b: 'job', keyword_a: 'grim reaper', keyword_b: 'shrine maiden', reason: '💀 死神與神聖互斥' },
        { a: 'race', b: 'job', keyword_a: 'grim reaper', keyword_b: 'cleric', reason: '💀 死神與治癒互斥' },
        { a: 'race', b: 'job', keyword_a: 'vampire', keyword_b: 'shrine maiden', reason: '🧛 吸血鬼怕神聖之地' },
        { a: 'race', b: 'job', keyword_a: 'vampire', keyword_b: 'cleric', reason: '🧛 吸血鬼怕治癒之光' },

        // 😈 惡魔系 vs 神聖職業
        { a: 'race', b: 'job', keyword_a: 'demon', keyword_b: 'cleric', reason: '😈 惡魔與神聖治癒互斥' },
        { a: 'race', b: 'job', keyword_a: 'demon', keyword_b: 'shrine maiden', reason: '😈 惡魔與神社聖地衝突' },
        { a: 'race', b: 'job', keyword_a: 'demon', keyword_b: 'nun', reason: '😈 惡魔與修女信仰對立' },
        { a: 'race', b: 'job', keyword_a: 'arch demon', keyword_b: 'cleric', reason: '👿 大惡魔與治癒聖光互斥' },
        { a: 'race', b: 'job', keyword_a: 'arch demon', keyword_b: 'shrine maiden', reason: '👿 大惡魔與神聖力量互斥' },
        { a: 'race', b: 'job', keyword_a: 'arch demon', keyword_b: 'nun', reason: '👿 大惡魔與修女信仰對立' },
        { a: 'race', b: 'job', keyword_a: 'succubus', keyword_b: 'cleric', reason: '💋 魅魔與聖職衝突' },
        { a: 'race', b: 'job', keyword_a: 'succubus', keyword_b: 'shrine maiden', reason: '💋 魅魔與神聖服務衝突' },
        { a: 'race', b: 'job', keyword_a: 'succubus', keyword_b: 'nun', reason: '💋 魅魔與修女信仰完全對立' },
        { a: 'race', b: 'job', keyword_a: 'imp', keyword_b: 'cleric', reason: '😈 小惡魔與治癒魔法互斥' },
        { a: 'race', b: 'job', keyword_a: 'imp', keyword_b: 'shrine maiden', reason: '😈 小惡魔與神聖互斥' },
        { a: 'race', b: 'job', keyword_a: 'nightmare', keyword_b: 'cleric', reason: '🌙 夢魔與聖光治癒衝突' },
        { a: 'race', b: 'job', keyword_a: 'nightmare', keyword_b: 'shrine maiden', reason: '🌙 夢魔與神聖力量衝突' },
        { a: 'race', b: 'job', keyword_a: 'demon lord', keyword_b: 'cleric', reason: '👑 魔王與治癒聖光完全對立' },
        { a: 'race', b: 'job', keyword_a: 'demon lord', keyword_b: 'shrine maiden', reason: '👑 魔王與神聖服務對立' },
        { a: 'race', b: 'job', keyword_a: 'demon lord', keyword_b: 'nun', reason: '👑 魔王與修女信仰對立' },
        { a: 'race', b: 'job', keyword_a: 'fallen angel', keyword_b: 'cleric', reason: '⬛ 墮天使被神聖力量排斥' },
        { a: 'race', b: 'job', keyword_a: 'fallen angel', keyword_b: 'shrine maiden', reason: '⬛ 墮天使與神聖服務衝突' },
        { a: 'race', b: 'job', keyword_a: 'yaksha', keyword_b: 'cleric', reason: '😈 夜叉與治癒魔法衝突' },
        { a: 'race', b: 'job', keyword_a: 'rakshasa', keyword_b: 'cleric', reason: '😈 羅剎與神聖力量互斥' },

        // 👻 非實體種族 vs 物理職業
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'knight', reason: '👻 幽靈沒有物理身體，無法穿戴盔甲' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'chef', reason: '👻 幽靈無法處理物理食材' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'mechanic', reason: '👻 幽靈無法握住工具' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'athlete', reason: '👻 非實體存在無法進行物理活動' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'astronaut', reason: '👻 幽靈不需要太空衣' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'police', reason: '👻 幽靈無法佩戴警徽和裝備' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'soldier', reason: '👻 幽靈無法持槍作戰' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'racer', reason: '👻 幽靈無法駕駛' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'pirate', reason: '👻 幽靈無法操舵' },
        { a: 'race', b: 'job', keyword_a: 'wraith', keyword_b: 'knight', reason: '👻 非實體怨靈無法穿盔甲' },
        { a: 'race', b: 'job', keyword_a: 'wraith', keyword_b: 'mechanic', reason: '👻 非實體怨靈無法使用工具' },
        { a: 'race', b: 'job', keyword_a: 'will-o-wisp', keyword_b: 'chef', reason: '🔥 鬼火精做菜太危險' },
        { a: 'race', b: 'job', keyword_a: 'will-o-wisp', keyword_b: 'knight', reason: '🔥 火焰無法穿盔甲' },
        { a: 'race', b: 'job', keyword_a: 'shadow person', keyword_b: 'idol', reason: '🌑 影子無法當舞台表演者' },
        { a: 'race', b: 'job', keyword_a: 'shadow person', keyword_b: 'model', reason: '🌑 影子無法當模特' },
        { a: 'race', b: 'job', keyword_a: 'shadow person', keyword_b: 'cheerleader', reason: '🌑 影子無法當啦啦隊' },

        // 🐟 水棲種族 vs 陸地職業
        { a: 'race', b: 'job', keyword_a: 'mermaid', keyword_b: 'ninja', reason: '🧜 魚尾無法在陸地奔跑' },
        { a: 'race', b: 'job', keyword_a: 'mermaid', keyword_b: 'knight', reason: '🧜 沒有腿無法騎馬作戰' },
        { a: 'race', b: 'job', keyword_a: 'mermaid', keyword_b: 'athlete', reason: '🧜 魚尾無法進行陸地運動' },
        { a: 'race', b: 'job', keyword_a: 'mermaid', keyword_b: 'racer', reason: '🧜 人魚無法駕駛' },
        { a: 'race', b: 'job', keyword_a: 'mermaid', keyword_b: 'cheerleader', reason: '🧜 魚尾無法跳啦啦隊' },
        { a: 'race', b: 'job', keyword_a: 'mermaid', keyword_b: 'dancer', reason: '🧜 魚尾無法跳舞' },
        { a: 'race', b: 'job', keyword_a: 'jellyfish', keyword_b: 'knight', reason: '🪼 水母穿不了盔甲' },
        { a: 'race', b: 'job', keyword_a: 'jellyfish', keyword_b: 'athlete', reason: '🪼 水母無法進行陸地運動' },
        { a: 'race', b: 'job', keyword_a: 'sea dragon', keyword_b: 'ninja', reason: '🐉 海龍屬於海洋，無法潛行' },
        { a: 'race', b: 'job', keyword_a: 'sea dragon', keyword_b: 'knight', reason: '🐉 海龍無法穿陸地盔甲' },
        { a: 'race', b: 'job', keyword_a: 'octopus girl', keyword_b: 'knight', reason: '🐙 觸手穿不了盔甲' },
        { a: 'race', b: 'job', keyword_a: 'kraken girl', keyword_b: 'knight', reason: '🐙 觸手穿不了盔甲' },

        // 🧚 微型種族 vs 人類尺寸裝備
        { a: 'race', b: 'job', keyword_a: 'fairy', keyword_b: 'knight', reason: '🧚 太小穿不了盔甲' },
        { a: 'race', b: 'job', keyword_a: 'fairy', keyword_b: 'astronaut', reason: '🧚 太小穿不了太空衣' },
        { a: 'race', b: 'job', keyword_a: 'fairy', keyword_b: 'soldier', reason: '🧚 太小拿不了武器' },
        { a: 'race', b: 'job', keyword_a: 'fairy', keyword_b: 'police', reason: '🧚 太小穿不了制服' },
        { a: 'race', b: 'job', keyword_a: 'fairy', keyword_b: 'mechanic', reason: '🧚 太小操作不了機械' },
        { a: 'race', b: 'job', keyword_a: 'imp', keyword_b: 'knight', reason: '😈 太小穿不了全身甲' },
        { a: 'race', b: 'job', keyword_a: 'imp', keyword_b: 'astronaut', reason: '😈 太小穿不了太空衣' },
        { a: 'race', b: 'job', keyword_a: 'gnome', keyword_b: 'knight', reason: '🍄 太小穿不了盔甲' },
        { a: 'race', b: 'job', keyword_a: 'gnome', keyword_b: 'astronaut', reason: '🍄 太小穿不了太空衣' },

        // 🤖 科技 vs 魔法
        { a: 'race', b: 'job', keyword_a: 'android', keyword_b: 'witch', reason: '🤖 機器人和魔法互斥' },
        { a: 'race', b: 'job', keyword_a: 'android', keyword_b: 'fortune teller', reason: '🤖 機器人用邏輯，不用神秘學' },
        { a: 'race', b: 'job', keyword_a: 'android', keyword_b: 'alchemist', reason: '🤖 機器人與煉金術衝突' },
        { a: 'race', b: 'job', keyword_a: 'android', keyword_b: 'mage', reason: '🤖 機器人無法施展魔法' },
        { a: 'race', b: 'job', keyword_a: 'android', keyword_b: 'shrine maiden', reason: '🤖 機器人與神聖服務衝突' },
        { a: 'race', b: 'job', keyword_a: 'android', keyword_b: 'cleric', reason: '🤖 機器人無法使用治癒魔法' },
        { a: 'race', b: 'job', keyword_a: 'cyborg', keyword_b: 'witch', reason: '🦾 賽博格與魔法衝突' },
        { a: 'race', b: 'job', keyword_a: 'cyborg', keyword_b: 'fortune teller', reason: '🦾 賽博格與占卜衝突' },
        { a: 'race', b: 'job', keyword_a: 'nano being', keyword_b: 'alchemist', reason: '🔬 奈米科技與煉金術衝突' },
        { a: 'race', b: 'job', keyword_a: 'nano being', keyword_b: 'witch', reason: '🔬 奈米科技與魔法衝突' },

        // 💧 形體不定種族 vs 裝備職業
        { a: 'race', b: 'job', keyword_a: 'slime', keyword_b: 'knight', reason: '💧 史萊姆無法穿盔甲持武器' },
        { a: 'race', b: 'job', keyword_a: 'slime', keyword_b: 'astronaut', reason: '💧 史萊姆穿不了太空衣' },
        { a: 'race', b: 'job', keyword_a: 'slime', keyword_b: 'soldier', reason: '💧 史萊姆穿不了軍裝' },
        { a: 'race', b: 'job', keyword_a: 'slime', keyword_b: 'police', reason: '💧 史萊姆穿不了制服' },
        { a: 'race', b: 'job', keyword_a: 'slime', keyword_b: 'racer', reason: '💧 史萊姆無法駕駛' },

        // 🌲 植物種族 vs 動態職業
        { a: 'race', b: 'job', keyword_a: 'treant', keyword_b: 'ninja', reason: '🌲 樹人太大無法隱匿' },
        { a: 'race', b: 'job', keyword_a: 'treant', keyword_b: 'dancer', reason: '🌲 樹人無法靈活舞動' },
        { a: 'race', b: 'job', keyword_a: 'treant', keyword_b: 'racer', reason: '🌲 樹人無法駕駛' },
        { a: 'race', b: 'job', keyword_a: 'treant', keyword_b: 'athlete', reason: '🌲 樹人無法進行運動' },

        // 🦁 巨型種族 vs 室內職業
        { a: 'race', b: 'job', keyword_a: 'giant', keyword_b: 'maid', reason: '🗿 巨人太大無法在室內做女僕' },
        { a: 'race', b: 'job', keyword_a: 'giant', keyword_b: 'nurse', reason: '🗿 巨人太大無法在醫院工作' },
        { a: 'race', b: 'job', keyword_a: 'giant', keyword_b: 'librarian', reason: '🗿 巨人太大無法在圖書館工作' },
        { a: 'race', b: 'job', keyword_a: 'giant', keyword_b: 'teacher', reason: '🗿 巨人太大無法在教室授課' },
        { a: 'race', b: 'job', keyword_a: 'giant', keyword_b: 'bartender', reason: '🗿 巨人太大無法在吧台工作' },
        { a: 'race', b: 'job', keyword_a: 'titan', keyword_b: 'maid', reason: '🗿 泰坦太大無法在室內服務' },
        { a: 'race', b: 'job', keyword_a: 'minotaur', keyword_b: 'maid', reason: '🐂 米諾陶洛斯太大、破壞力太強' },
        { a: 'race', b: 'job', keyword_a: 'hydra', keyword_b: 'maid', reason: '🐍 九頭蛇無法做女僕' },

        // ═══════════════════════════════════════════
        // B. 種族 × 服裝 (race × outfit)
        // ═══════════════════════════════════════════

        // 👻 非實體 × 服裝
        { a: 'race', b: 'outfit', keyword_a: 'ghost', keyword_b: 'knight armor', reason: '👻 幽靈無法穿盔甲' },
        { a: 'race', b: 'outfit', keyword_a: 'ghost', keyword_b: 'power armor', reason: '👻 幽靈無法穿科技戰甲' },
        { a: 'race', b: 'outfit', keyword_a: 'ghost', keyword_b: 'police uniform', reason: '👻 幽靈穿不了制服' },
        { a: 'race', b: 'outfit', keyword_a: 'ghost', keyword_b: 'gym clothes', reason: '👻 幽靈不需要運動服' },

        // 💧 史萊姆 × 服裝
        { a: 'race', b: 'outfit', keyword_a: 'slime', keyword_b: 'knight armor', reason: '💧 史萊姆穿不住盔甲' },
        { a: 'race', b: 'outfit', keyword_a: 'slime', keyword_b: 'power armor', reason: '💧 史萊姆穿不住戰甲' },
        { a: 'race', b: 'outfit', keyword_a: 'slime', keyword_b: 'blazer', reason: '💧 史萊姆穿不住校服' },

        // 🧜 人魚 × 需要腿的服裝
        { a: 'race', b: 'outfit', keyword_a: 'mermaid', keyword_b: 'jeans', reason: '🧜 人魚沒有腿穿不了褲子' },
        { a: 'race', b: 'outfit', keyword_a: 'mermaid', keyword_b: 'gym clothes', reason: '🧜 人魚穿不了運動服' },
        { a: 'race', b: 'outfit', keyword_a: 'mermaid', keyword_b: 'police uniform', reason: '🧜 人魚穿不了制服' },

        // 🧚 妖精 × 大型服裝
        { a: 'race', b: 'outfit', keyword_a: 'fairy', keyword_b: 'knight armor', reason: '🧚 妖精太小穿不了盔甲' },
        { a: 'race', b: 'outfit', keyword_a: 'fairy', keyword_b: 'power armor', reason: '🧚 妖精太小穿不了戰甲' },

        // 🤖 機器人 × 魔法/傳統服裝
        { a: 'race', b: 'outfit', keyword_a: 'android', keyword_b: 'miko', reason: '🤖 機器人穿巫女服？科技與神聖衝突' },
        { a: 'race', b: 'outfit', keyword_a: 'android', keyword_b: 'witch robe', reason: '🤖 機器人穿魔女袍？科技與魔法衝突' },

        // 🐴 半人馬/蛇女 × 褲裝
        { a: 'race', b: 'outfit', keyword_a: 'centaur', keyword_b: 'jeans', reason: '🐴 半人馬下半身是馬穿不了褲子' },
        { a: 'race', b: 'outfit', keyword_a: 'centaur', keyword_b: 'blazer', reason: '🐴 半人馬穿不了完整校服' },
        { a: 'race', b: 'outfit', keyword_a: 'lamia', keyword_b: 'jeans', reason: '🐍 蛇女下半身是蛇穿不了褲子' },
        { a: 'race', b: 'outfit', keyword_a: 'lamia', keyword_b: 'gym clothes', reason: '🐍 蛇女無法穿運動服' },
        { a: 'race', b: 'outfit', keyword_a: 'spider', keyword_b: 'jeans', reason: '🕷️ 蜘蛛娘多腿穿不了褲子' },

        // 🗿 巨人 × 正常尺寸服裝
        { a: 'race', b: 'outfit', keyword_a: 'giant', keyword_b: 'sailor uniform', reason: '🗿 巨人太大穿不了水手服' },
        { a: 'race', b: 'outfit', keyword_a: 'giant', keyword_b: 'blazer', reason: '🗿 巨人太大穿不了校服' },

        // 🔥 火精靈 × 易燃服裝
        { a: 'race', b: 'outfit', keyword_a: 'fire spirit', keyword_b: 'kimono', reason: '🔥 火精靈會燒毀和服' },
        { a: 'race', b: 'outfit', keyword_a: 'fire spirit', keyword_b: 'yukata', reason: '🔥 火精靈會燒毀浴衣' },
        { a: 'race', b: 'outfit', keyword_a: 'fire spirit', keyword_b: 'hanfu', reason: '🔥 火精靈會燒毀漢服' },

        // 🌲 樹人 × 服裝
        { a: 'race', b: 'outfit', keyword_a: 'treant', keyword_b: 'sailor uniform', reason: '🌲 樹人穿不了水手服' },
        { a: 'race', b: 'outfit', keyword_a: 'treant', keyword_b: 'knight armor', reason: '🌲 樹的身體穿不了盔甲' },

        // 🪼 水母 × 服裝
        { a: 'race', b: 'outfit', keyword_a: 'jellyfish', keyword_b: 'knight armor', reason: '🪼 水母穿不了盔甲' },

        // ═══════════════════════════════════════════
        // C. 職業 × 服裝 (job × outfit)
        // ═══════════════════════════════════════════
        { a: 'job', b: 'outfit', keyword_a: 'knight', keyword_b: 'bikini', reason: '⚔️ 騎士穿比基尼上戰場？' },
        { a: 'job', b: 'outfit', keyword_a: 'knight', keyword_b: 'pajamas', reason: '⚔️ 騎士穿睡衣無法戰鬥' },
        { a: 'job', b: 'outfit', keyword_a: 'ninja', keyword_b: 'knight armor', reason: '🥷 忍者穿重甲無法隱匿' },
        { a: 'job', b: 'outfit', keyword_a: 'ninja', keyword_b: 'power armor', reason: '🥷 忍者穿科技戰甲無法潛行' },
        { a: 'job', b: 'outfit', keyword_a: 'astronaut', keyword_b: 'kimono', reason: '🚀 太空人穿和服上太空？' },
        { a: 'job', b: 'outfit', keyword_a: 'astronaut', keyword_b: 'bikini', reason: '🚀 太空人穿比基尼在太空？' },
        { a: 'job', b: 'outfit', keyword_a: 'astronaut', keyword_b: 'pajamas', reason: '🚀 太空人穿睡衣在太空？' },
        { a: 'job', b: 'outfit', keyword_a: 'soldier', keyword_b: 'pajamas', reason: '🎖️ 軍人穿睡衣上戰場？' },
        { a: 'job', b: 'outfit', keyword_a: 'soldier', keyword_b: 'bikini', reason: '🎖️ 軍人穿比基尼上戰場？' },
        { a: 'job', b: 'outfit', keyword_a: 'maid', keyword_b: 'knight armor', reason: '🧹 女僕穿盔甲打掃？' },
        { a: 'job', b: 'outfit', keyword_a: 'maid', keyword_b: 'power armor', reason: '🧹 女僕穿科技戰甲打掃？' },
        { a: 'job', b: 'outfit', keyword_a: 'shrine maiden', keyword_b: 'cyberpunk', reason: '⛩️ 巫女穿賽博裝？傳統與科技衝突' },
        { a: 'job', b: 'outfit', keyword_a: 'nun', keyword_b: 'bikini', reason: '✝️ 修女穿比基尼？信仰衝突' },
        { a: 'job', b: 'outfit', keyword_a: 'nun', keyword_b: 'bunny suit', reason: '✝️ 修女穿兔女郎裝？信仰衝突' },

        // ═══════════════════════════════════════════
        // D. 性別相關衝突 (gender-aware, uses 'gender' key)
        // ═══════════════════════════════════════════
        { a: 'gender', b: 'outfit', keyword_a: 'male', keyword_b: 'bunny suit', reason: '🐰 兔女郎裝通常是女性服裝，AI 可能理解錯誤' },
        { a: 'gender', b: 'outfit', keyword_a: 'male', keyword_b: 'princess dress', reason: '👗 公主禮服是女性服裝，AI 可能理解錯誤' },
        { a: 'gender', b: 'outfit', keyword_a: 'male', keyword_b: 'sailor uniform', reason: '👧 水手服通常指女性校服款式' },
        { a: 'gender', b: 'outfit', keyword_a: 'male', keyword_b: 'maid apron', reason: '👧 女僕裝通常是女性服裝' },
        { a: 'gender', b: 'outfit', keyword_a: 'male', keyword_b: 'nurse uniform', reason: '👩‍⚕️ 護士服通常是女性款式' },
        { a: 'gender', b: 'job', keyword_a: 'male', keyword_b: 'oiran', reason: '🎎 花魁是女性職業' },
        { a: 'gender', b: 'job', keyword_a: 'male', keyword_b: 'shrine maiden', reason: '⛩️ 巫女是女性職業' },
        { a: 'gender', b: 'job', keyword_a: 'female', keyword_b: 'butler', reason: '🤵 執事通常是男性職業' }
    ];

    // ── Age Descriptor Prompts ──
    // Complete gender-specific age descriptions for realistic prompt generation
    const AGE_DESCRIPTORS = {
        1: { f: 'a 1-year-old baby infant girl, tiny newborn proportions, very large head relative to body, soft round face with chubby cheeks, big curious eyes, tiny button nose, short stubby limbs, plump baby fat body, drooling', m: 'a 1-year-old baby infant boy, tiny newborn proportions, very large head relative to body, soft round face with chubby cheeks, big curious eyes, tiny button nose, short stubby limbs, plump baby fat body, drooling' },
        2: { f: 'a 2-year-old toddler girl, oversized head-to-body ratio, round chubby face, big bright curious eyes, pudgy arms and legs, baby fat belly, unsteady waddle stance, innocent exploring expression', m: 'a 2-year-old toddler boy, oversized head-to-body ratio, round chubby face, big bright curious eyes, pudgy arms and legs, baby fat belly, unsteady waddle stance, innocent exploring expression' },
        3: { f: 'a 3-year-old young girl, large head proportions, round soft face with baby fat, big expressive eyes, short chubby limbs, toddler body, playful curious demeanor', m: 'a 3-year-old young boy, large head proportions, round soft face with baby fat, big expressive eyes, short chubby limbs, toddler body, playful curious demeanor' },
        4: { f: 'a 4-year-old preschool girl, large head-to-body ratio, round childish face, big innocent eyes, thin arms and legs with baby fat, petite child body, energetic playful posture', m: 'a 4-year-old preschool boy, large head-to-body ratio, round childish face, big innocent eyes, thin arms and legs with baby fat, petite child body, energetic playful posture' },
        5: { f: 'a 5-year-old young girl, slightly large head, round face with remaining baby fat, bright wide eyes, missing front teeth smile, slim short limbs, small childlike frame, kindergarten child proportions', m: 'a 5-year-old young boy, slightly large head, round face with remaining baby fat, bright wide eyes, missing front teeth smile, slim short limbs, small childlike frame, kindergarten child proportions' },
        6: { f: 'a 6-year-old girl, face losing some baby fat, round eyes with innocent gaze, gap-toothed smile, thin childlike limbs, slender child body, school-age child appearance', m: 'a 6-year-old boy, face losing some baby fat, round eyes with innocent gaze, gap-toothed smile, thin childlike limbs, slender child body, school-age child appearance' },
        7: { f: 'a 7-year-old school girl, face becoming more defined but still round and soft, wide curious eyes, skinny arms and legs, flat chest, straight childish body, elementary school first grader proportions', m: 'a 7-year-old school boy, face becoming more defined but still round and soft, wide curious eyes, skinny arms and legs, flat chest, straight childish body, elementary school first grader proportions' },
        8: { f: 'an 8-year-old girl, soft youthful face, bright alert eyes, lean skinny limbs, flat chest, straight silhouette, active confident child posture, elementary school child build', m: 'an 8-year-old boy, soft youthful face, bright alert eyes, lean skinny limbs, flat chest, straight silhouette, active confident child posture, elementary school child build' },
        9: { f: 'a 9-year-old girl, soft face with baby fat fading, bright expressive eyes, lean and lanky limbs, flat chest, slim straight body, growing taller, confident school child demeanor', m: 'a 9-year-old boy, soft face with baby fat fading, bright expressive eyes, lean and lanky limbs, flat chest, slim straight body, growing taller, confident school child demeanor' },
        10: { f: 'a 10-year-old girl child, prepubescent, large head-to-body ratio, round childish face, innocent wide eyes, flat chest, childlike slender limbs, petite child body, no adult curves', m: 'a 10-year-old boy child, prepubescent, large head-to-body ratio, round childish face, innocent wide eyes, flat chest, childlike slender limbs, petite child body, lean build' },
        11: { f: 'an 11-year-old preteen girl, pre-adolescence, face slightly longer and less round, alert intelligent eyes, lean slender frame, very flat chest, still mostly childlike body, lanky limbs, innocent youthful expression', m: 'an 11-year-old preteen boy, pre-adolescence, face slightly longer and less round, alert intelligent eyes, lean slender frame, flat chest, still fully childlike body, lanky thin limbs, innocent youthful expression' },
        12: { f: 'a 12-year-old preteen girl, early adolescent features emerging, face becoming more oval, youthful bright eyes, mostly flat chest, slim pre-teen body, legs growing longer, awkward gangly proportions, transitioning from child to young teen', m: 'a 12-year-old preteen boy, early adolescent features emerging, face becoming more oval and angular, youthful bright eyes, slim pre-teen body with no muscle, legs and arms growing longer, awkward gangly proportions, transitioning from child to young teen' },
        13: { f: 'a 13-year-old young teenage girl, early puberty, youthful oval face, bright teenage eyes, early subtle body development, very modest curves, slim teenage frame, losing childish proportions, middle school student appearance', m: 'a 13-year-old young teenage boy, early puberty, youthful face becoming slightly angular, bright teenage eyes, slim teenage frame with no muscle, narrow shoulders, losing childish proportions, voice cracking, middle school student appearance' },
        14: { f: 'a 14-year-old teenage girl, mid-puberty, youthful oval face with emerging definition, expressive teen eyes, modest early teenage development, slight gentle curves forming, slender teenage body, adolescent proportions', m: 'a 14-year-old teenage boy, mid-puberty, face becoming more angular and defined, expressive teen eyes, jaw widening slightly, slim teenage body, shoulders beginning to broaden, no significant muscle, adolescent proportions' },
        15: { f: 'a 15-year-old teenage girl, more defined youthful face, clear bright eyes, moderate teenage development, gentle natural curves, slim youthful figure, high school entrance age, youthful confident expression', m: 'a 15-year-old teenage boy, face more angular with defined jaw, clear bright eyes, visible Adam\'s apple, shoulders broadening, slim athletic build forming, very light muscle tone, high school entrance age, youthful confident expression' },
        16: { f: 'a 16-year-old teenage girl, youthful maturing face, clear defined features, developing figure with youthful proportions, natural teenage curves, slender waist, high school student build, youthful vibrant energy', m: 'a 16-year-old teenage boy, maturing masculine face, more defined jawline, visible Adam\'s apple, broader shoulders, developing lean athletic build, light muscle definition, high school student build, youthful vibrant energy' },
        17: { f: 'a 17-year-old late teenage girl, nearing physical maturity, youthful face with refined features, nearly mature figure with youthful proportions, natural curves, defined waist, feminine silhouette forming, confident youthful aura', m: 'a 17-year-old late teenage boy, nearing physical maturity, youthful masculine face with strong jawline, broad shoulders, lean muscular build developing, moderate muscle definition, tall and lean, confident youthful aura' },
        18: { f: 'a 18-year-old young adult woman, freshly mature, youthful face with defined features, smooth flawless skin, fully developed youthful figure, defined curves, slim waist, feminine body shape, fresh adult energy, youthful glow', m: 'a 18-year-old young adult man, freshly mature, youthful face with strong defined jaw, smooth skin, broad shoulders, athletic lean build, visible muscle definition, narrow waist, masculine body proportions, fresh adult energy, youthful glow' },
        19: { f: 'a 19-year-old young adult woman, early adulthood, youthful face, expressive mature eyes, fully mature youthful body, balanced feminine proportions, natural curves, slim figure, toned physique, college freshman appearance', m: 'a 19-year-old young adult man, early adulthood, youthful face, expressive mature eyes, broad shoulders, athletic muscular build, toned physique, masculine proportions, college freshman appearance' },
        20: { f: 'a 20-year-old young woman, youthful prime, refined face, bright confident eyes, smooth glowing skin, mature feminine figure, well-proportioned curves, slim toned body, young adult in her prime', m: 'a 20-year-old young man, youthful prime, refined face, bright confident eyes, broad shoulders, lean muscular athletic build, toned arms and chest, young adult in his prime' },
        21: { f: 'a 21-year-old young woman, full youthful maturity, mature face with youthful softness, confident eyes, flawless smooth skin, fully mature womanly figure, balanced proportions, toned slim body, peak of youthful physique', m: 'a 21-year-old young man, full youthful maturity, mature face with youthful edge, confident strong eyes, sharp jawline, fully mature masculine build, broad shoulders, athletic muscular frame, peak of youthful physicality' },
        22: { f: 'a 22-year-old young woman, fully mature adult, face with youthful radiance, mature womanly figure, natural curves, slim toned body, poised posture, young professional aura', m: 'a 22-year-old young man, fully mature adult, face with youthful sharpness, mature athletic build, broad shoulders, developed chest, muscular arms, strong posture, capable young professional aura' },
        23: { f: 'a 23-year-old young woman, early career young adult, fresh face, intelligent expressive eyes, mature feminine body, slim toned figure, poised demeanor, young professional appearance', m: 'a 23-year-old young man, early career young adult, fresh face, intelligent expressive eyes, mature masculine build, athletic physique, toned muscular frame, young professional appearance' },
        24: { f: 'a 24-year-old young woman, youthful adult, warm confident eyes, mature feminine figure, natural curves, toned slim body, graceful movement, established young adult appearance', m: 'a 24-year-old young man, youthful adult prime, warm confident eyes, mature athletic build, broad shoulders, toned muscular body, strong presence, established young adult appearance' },
        25: { f: 'a 25-year-old young woman, peak of youthful physique, captivating confident eyes, luminous flawless skin, ideal mature feminine figure, natural curves, slim toned body, prime young adult, radiant confidence', m: 'a 25-year-old young man, peak of youthful strength, captivating confident eyes, ideal athletic build, broad strong shoulders, muscular chest, powerful arms, prime young adult, commanding presence' },
        26: { f: 'a 26-year-old woman, mature young adult, subtle sophistication, knowing confident eyes, fully mature womanly figure, balanced curves, toned feminine body, sophisticated young woman', m: 'a 26-year-old man, mature young adult, subtle sophistication, knowing confident eyes, fully mature masculine build, powerful shoulders, athletic muscular physique, sophisticated young man' },
        27: { f: 'a 27-year-old woman, established adult, face blending youth and maturity, warm intelligent eyes, mature feminine body, slim toned figure, confident natural poise, professional accomplished woman', m: 'a 27-year-old man, established adult, face blending youth and maturity, warm intelligent eyes, well-built masculine frame, strong broad shoulders, defined muscular physique, professional accomplished man' },
        28: { f: 'a 28-year-old woman, mature adult, face with youthful glow, perceptive eyes, mature womanly body, natural feminine curves, toned slim figure, confident self-assured woman', m: 'a 28-year-old man, prime adult, mature face with strong features, perceptive eyes, powerful masculine build, broad shoulders, muscular chest, athletic strong body, self-assured man' },
        29: { f: 'a 29-year-old woman, refined adult, face with mature composure, deep expressive eyes, fully mature womanly figure, toned slim body, poised presence, accomplished woman at her prime', m: 'a 29-year-old man, refined adult, face with seasoned confidence, deep expressive eyes, peak masculine build, powerful broad shoulders, defined muscular athletic body, accomplished man at his prime' },
        // 30+ use decade ranges
        30: { f: 'a woman in her 30s, mature adult, graceful early aging, wise confident eyes, subtle expression lines near eyes, mature womanly figure, maintained feminine curves, professional mature woman, sophisticated aura', m: 'a man in his 30s, rugged mature adult, masculine face with character, wise confident eyes, very faint crow\'s feet beginning, broad powerful shoulders, solid muscular build, professional mature man, authoritative dependable aura', range: [30, 39] },
        40: { f: 'a woman in her 40s, mature refined adult, visible laugh lines and crow\'s feet, experienced wise eyes, subtle forehead lines, mature womanly body, figure slightly fuller than youth, confident accomplished woman, dignified presence', m: 'a man in his 40s, distinguished mature male, rugged face with visible character lines, crow\'s feet, forehead lines, possible gray-streaked beard or hair, broad powerful build, slightly thicker torso, seasoned and weathered look, distinguished authoritative presence', range: [40, 49] },
        50: { f: 'a woman in her 50s, aging adult, prominent laugh lines and wrinkles, deep wise experienced eyes, visible forehead lines, nasolabial folds, graying hair, fuller softer figure, warm maternal aura, dignified accomplished older woman', m: 'a man in his 50s, distinguished older man, deep wrinkles and character lines, deep wise experienced eyes, heavy crow\'s feet, receding hairline or graying hair, possible gray beard, heavier set body, silver fox appearance, authoritative wise presence', range: [50, 59] },
        60: { f: 'a woman in her 60s, elderly woman, deep wrinkles and age spots, kind wise old eyes, sagging skin around jaw and neck, white or gray hair, aged body, smaller stature, softer rounded figure, grandmother appearance, warm nurturing presence', m: 'a man in his 60s, elderly gentleman, deep wrinkles and creases, wise tired old eyes, prominent age spots, white or gray thinning hair, gray or white beard, narrower shoulders, loss of muscle mass, slightly hunched posture, grandfather appearance, calm dignified presence', range: [60, 69] },
        70: { f: 'a woman in her 70s, elderly aged woman, deeply wrinkled aged face, sunken cheeks, faded tired gentle eyes, very thin white hair, pronounced sagging skin, frail thin body, significantly hunched posture, bony thin limbs, elderly grandmother, fragile appearance', m: 'a man in his 70s, elderly aged man, deeply wrinkled weathered face, sunken cheeks, faded tired gentle eyes, sparse white hair or bald, frail body with significant muscle loss, thin bony limbs, hunched back, elderly grandfather appearance', range: [70, 79] },
        80: { f: 'a woman in her 80s, very elderly old woman, heavily wrinkled aged face, deeply sunken cheeks and eyes, cloudy faded old eyes, wispy thin white hair, very frail small body, skeletal thin limbs, trembling hands, very elderly great-grandmother appearance', m: 'a man in his 80s, very elderly old man, heavily wrinkled weathered face, deeply sunken features, cloudy faded old eyes, mostly bald with sparse white wisps, very frail shrunken body, skeletal thin limbs, trembling hands, very elderly great-grandfather appearance', range: [80, 89] },
        90: { f: 'a woman in her 90s, extremely elderly ancient woman, profoundly wrinkled paper-thin skin, gaunt hollowed face, milky faded ancient eyes, almost no hair remaining, extremely frail tiny body, skeletal fragile frame, centenarian appearance, ancient ethereal presence', m: 'a man in his 90s, extremely elderly ancient man, profoundly wrinkled paper-thin skin, gaunt hollowed face, milky faded ancient eyes, completely bald or few white strands, extremely frail shrunken body, skeletal fragile frame, centenarian appearance, ancient wise presence', range: [90, 100] }
    };

    // Helper: get age descriptor for a given age and gender
    function getAgeDescriptor(age, gender) {
        age = parseInt(age);
        if (!age || age < 1) return null;
        if (AGE_DESCRIPTORS[age] && !AGE_DESCRIPTORS[age].range) {
            return gender === 'male' ? AGE_DESCRIPTORS[age].m : AGE_DESCRIPTORS[age].f;
        }
        for (const key of Object.keys(AGE_DESCRIPTORS)) {
            const entry = AGE_DESCRIPTORS[key];
            if (entry.range && age >= entry.range[0] && age <= entry.range[1]) {
                return gender === 'male' ? entry.m : entry.f;
            }
        }
        const last = AGE_DESCRIPTORS[90];
        return gender === 'male' ? last.m : last.f;
    }

    const HAIRSTYLES_FEMALE = [
        { label: '雙馬尾', en: 'Twin Tails', value: 'twin tails', image: 'assets/previews/hair_twintails.png' },
        { label: '長直髮', en: 'Long Straight', value: 'long straight hair', image: 'assets/previews/hair_long_hair.png' },
        { label: '波波頭', en: 'Bob Cut', value: 'bob cut', image: 'assets/previews/hair_bob_cut.png' },
        { label: '單馬尾', en: 'Ponytail', value: 'ponytail', image: 'assets/previews/hair_ponytail.png' },
        { label: '姬髮式', en: 'Hime Cut', value: 'hime cut', image: 'assets/previews/hair_hime_cut.png' },
        { label: '凌亂短髮', en: 'Messy Short', value: 'messy short hair' },
        { label: '麻花辮', en: 'Braid', value: 'braid', image: 'assets/previews/hair_single_braid.png' },
        { label: '法式編髮', en: 'French Braid', value: 'french braid' },
        { label: '側馬尾', en: 'Side Ponytail', value: 'side ponytail' },
        { label: '丸子頭', en: 'Bun', value: 'bun', image: 'assets/previews/hair_low_bun.png' },
        { label: '雙丸子', en: 'Twin Buns', value: 'twin buns', image: 'assets/previews/hair_double_buns.png' },
        { label: '精靈短髮', en: 'Pixie Cut', value: 'pixie cut', image: 'assets/previews/hair_pixie_cut.png' },
        { label: '波浪長髮', en: 'Wavy Long', value: 'wavy long hair', image: 'assets/previews/hair_wavy_long_hair.png' },
        { label: '捲髮', en: 'Curly', value: 'curly hair' },
        { label: '鑽頭捲', en: 'Drill Hair', value: 'drill hair' },
        { label: '齊瀏海短髮', en: 'Short w/ Bangs', value: 'short hair with bangs', image: 'assets/previews/hair_bob_cut_blunt_bangs.png' },
        { label: '齊瀏海長髮', en: 'Long w/ Bangs', value: 'long hair with bangs', image: 'assets/previews/hair_blunt_bangs.png' },
        { label: '狼尾剪', en: 'Wolf Cut', value: 'wolf cut', image: 'assets/previews/hair_wolf_cut.png' },
        { label: '半丸子頭', en: 'Half Up Bun', value: 'half up bun' },
        { label: '側邊編髮', en: 'Side Braid', value: 'side braid' },
        { label: '皇冠編髮', en: 'Crown Braid', value: 'crown braid' },
        { label: '髒辮', en: 'Dreadlocks', value: 'dreadlocks' },
        { label: '爆炸頭', en: 'Afro', value: 'afro', image: 'assets/previews/hair_afro.png' },
        { label: '龐克莫霍克', en: 'Mohawk', value: 'mohawk' },
        { label: '光頭', en: 'Bald', value: 'bald', image: 'assets/previews/hair_bald.png' },
        { label: '雲朵燙', en: 'Cloud Hair', value: 'cloud hair' },
        { label: '漂浮長髮', en: 'Floating Hair', value: 'floating hair' },
        { label: '不過肩長髮', en: 'Medium Hair', value: 'medium hair' },
        { label: '超長髮', en: 'Very Long', value: 'very long hair' },
        { label: '不對稱短髮', en: 'Asymmetrical', value: 'asymmetrical short hair' }
    ];

    const HAIRSTYLES_MALE = [
        { label: '清爽短髮', en: 'Short Hair', value: 'short hair', image: 'assets/previews/hair_short_hair.png' },
        { label: '寸頭', en: 'Buzz Cut', value: 'buzz cut', image: 'assets/previews/hair_buzz_cut.png' },
        { label: '側削上梳', en: 'Undercut', value: 'undercut' },
        { label: '油頭', en: 'Slicked Back', value: 'slicked back' },
        { label: '飛機頭', en: 'Pompadour', value: 'pompadour' },
        { label: '莫霍克', en: 'Mohawk', value: 'mohawk' },
        { label: '刺蝟頭', en: 'Spiky Hair', value: 'spiky hair' },
        { label: '凌亂碎髮', en: 'Messy Hair', value: 'messy hair' },
        { label: '長髮', en: 'Long Hair', value: 'long hair', image: 'assets/previews/hair_long_hair.png' },
        { label: '馬尾', en: 'Ponytail', value: 'ponytail', image: 'assets/previews/hair_ponytail.png' },
        { label: '丸子頭', en: 'Man Bun', value: 'man bun' },
        { label: '中分', en: 'Curtain Hair', value: 'curtain hair', image: 'assets/previews/hair_center_part.png' },
        { label: '瀏海短髮', en: 'Fringe Hair', value: 'fringe hair' },
        { label: '層次剪裁', en: 'Textured Crop', value: 'textured crop' },
        { label: '漸層推剪', en: 'Fade Cut', value: 'fade cut' },
        { label: '旁分', en: 'Side Part', value: 'side part', image: 'assets/previews/hair_side_part.png' },
        { label: '蘑菇頭', en: 'Bowl Cut', value: 'bowl cut' },
        { label: '爆炸頭', en: 'Afro', value: 'afro', image: 'assets/previews/hair_afro.png' },
        { label: '髒辮', en: 'Dreadlocks', value: 'dreadlocks' },
        { label: '地壟溝辮', en: 'Cornrows', value: 'cornrows' },
        { label: '狼尾', en: 'Mullet', value: 'mullet' },
        { label: '日系微捲', en: 'Shaggy Hair', value: 'shaggy hair' },
        { label: '武士頭', en: 'Samurai Topknot', value: 'samurai topknot' },
        { label: '動漫刺蝟頭', en: 'Anime Hair', value: 'anime protagonist hair' },
        { label: '剛睡醒', en: 'Bedhead', value: 'bedhead' },
        { label: '波浪捲', en: 'Wavy Hair', value: 'wavy hair' },
        { label: '捲髮', en: 'Curly Hair', value: 'curly hair' },
        { label: '層次長髮', en: 'Layered Long', value: 'layered long hair' },
        { label: '光頭', en: 'Bald', value: 'bald', image: 'assets/previews/hair_bald.png' },
        { label: '二分區', en: 'Two-Block', value: 'two-block cut' }
    ];

    const HAIR_COLORS = [
        { label: '銀白', en: 'Silver', value: 'silver hair', color: '#e2e8f0' },
        { label: '金黃', en: 'Blonde', value: 'blonde hair', color: '#fcd34d' },
        { label: '烏黑', en: 'Black', value: 'black hair', color: '#1a202c' },
        { label: '粉紅', en: 'Pink', value: 'pink hair', color: '#f9a8d4' },
        { label: '天藍', en: 'Light Blue', value: 'light blue hair', color: '#93c5fd' },
        { label: '赤紅', en: 'Red', value: 'red hair', color: '#ef4444' },
        { label: '純白', en: 'White', value: 'white hair', color: '#ffffff' },
        { label: '栗棕', en: 'Brown', value: 'brown hair', color: '#8d6e63' },
        { label: '深藍', en: 'Dark Blue', value: 'dark blue hair', color: '#1e3a8a' },
        { label: '翠綠', en: 'Green', value: 'green hair', color: '#22c55e' },
        { label: '深紫', en: 'Purple', value: 'purple hair', color: '#a855f7' },
        { label: '橘色', en: 'Orange', value: 'orange hair', color: '#f97316' },
        { label: '灰色', en: 'Grey', value: 'grey hair', color: '#9ca3af' },
        { label: '白金', en: 'Platinum', value: 'platinum blonde hair', color: '#fef3c7' },
        { label: '金棕', en: 'Golden Brown', value: 'golden brown hair', color: '#b45309' },
        { label: '青色', en: 'Teal', value: 'teal hair', color: '#14b8a6' },
        { label: '多彩', en: 'Multi', value: 'multicolored hair', color: 'linear-gradient(to right, #f9a8d4, #93c5fd)' },
        { label: '彩虹', en: 'Rainbow', value: 'rainbow hair', color: 'linear-gradient(to right, #ef4444, #fcd34d, #22c55e, #3b82f6, #a855f7)' }
    ];

    const EYE_COLORS = [
        { label: '藍色', en: 'Blue', value: 'blue', color: '#3b82f6' },
        { label: '紅色', en: 'Red', value: 'red', color: '#ef4444' },
        { label: '綠色', en: 'Green', value: 'green', color: '#22c55e' },
        { label: '琥珀', en: 'Amber', value: 'amber', color: '#f59e0b' },
        { label: '紫色', en: 'Purple', value: 'purple', color: '#a855f7' },
        { label: '粉紅', en: 'Pink', value: 'pink', color: '#ec4899' },
        { label: '金色', en: 'Gold', value: 'gold', color: '#eab308' },
        { label: '銀灰', en: 'Silver', value: 'silver', color: '#94a3b8' },
        { label: '黑色', en: 'Black', value: 'black', color: '#171717' },
        { label: '棕色', en: 'Brown', value: 'brown', color: '#78350f' },
        { label: '青色', en: 'Teal', value: 'teal', color: '#14b8a6' },
        { label: '橙色', en: 'Orange', value: 'orange', color: '#f97316' },
        { label: '深藍', en: 'Dark Blue', value: 'dark blue', color: '#1e3a8a' },
        { label: '黃色', en: 'Yellow', value: 'yellow', color: '#facc15' },
        { label: '白色', en: 'White', value: 'white', color: '#ffffff' },
        { label: '紫羅蘭', en: 'Violet', value: 'violet', color: '#7c3aed' },
        { label: '水藍', en: 'Aqua', value: 'aqua', color: '#06b6d4' },
        { label: '血紅', en: 'Blood Red', value: 'blood red', color: '#991b1b' },
        { label: '發光', en: 'Glowing', value: 'glowing eyes', color: '#fef3c7' },
        { label: '異色', en: 'Heterochromia', value: 'heterochromia', color: 'linear-gradient(to right, #3b82f6, #ef4444)' }
    ];

    const OUTFITS = [
        { label: '水手服', en: 'Sailor Uniform', value: 'sailor uniform', image: 'assets/previews/clothing_school_sailor.png' },
        { label: '西裝校服', en: 'Blazer Uniform', value: 'blazer school uniform', image: 'assets/previews/clothing_school_blazer.png' },
        { label: '白色洋裝', en: 'White Sundress', value: 'white sundress', image: 'assets/previews/clothing_sundress.png' },
        { label: '巫女服', en: 'Miko Outfit', value: 'miko outfit', image: 'assets/previews/clothing_miko.png' },
        { label: '女僕裝', en: 'Maid', value: 'maid apron', image: 'assets/previews/clothing_maid.png' },
        { label: '運動服', en: 'Gym Clothes', value: 'gym clothes', image: 'assets/previews/clothing_gym_suit.png' },
        { label: '休閒 T恤', en: 'T-shirt', value: 'casual t-shirt', image: 'assets/previews/clothing_tshirt.png' },
        { label: '連帽衫', en: 'Hoodie', value: 'hoodie', image: 'assets/previews/clothing_hoodie.png' },
        { label: '和服', en: 'Kimono', value: 'kimono', image: 'assets/previews/clothing_kimono.png' },
        { label: '浴衣', en: 'Yukata', value: 'yukata', image: 'assets/previews/clothing_yukata.png' },
        { label: '旗袍', en: 'Cheongsam', value: 'chinese dress (qipao)', image: 'assets/previews/clothing_cheongsam.png' },
        { label: '哥德蘿莉', en: 'Gothic Lolita', value: 'gothic lolita dress' },
        { label: '修女服', en: 'Nun Habit', value: 'nun habit' },
        { label: '騎士盔甲', en: 'Knight Armor', value: 'knight armor' },
        { label: '賽博龐克裝', en: 'Cyberpunk', value: 'cyberpunk bodysuit' },
        { label: '忍者服', en: 'Ninja Outfit', value: 'ninja outfit' },
        { label: '魔女袍', en: 'Witch Robe', value: 'witch robe' },
        { label: '比基尼', en: 'Bikini', value: 'bikini', image: 'assets/previews/clothing_bikini.png' },
        { label: '辦公室套裝', en: 'Office Suit', value: 'office lady suit', image: 'assets/previews/clothing_office_lady.png' },
        { label: '護士服', en: 'Nurse', value: 'nurse uniform', image: 'assets/previews/clothing_nurse.png' },
        { label: '警服', en: 'Police', value: 'police uniform', image: 'assets/previews/clothing_police.png' },
        { label: '公主禮服', en: 'Princess Dress', value: 'princess dress' },
        { label: '睡衣', en: 'Pajamas', value: 'pajamas' },
        { label: '漢服', en: 'Hanfu', value: 'hanfu, chinese traditional clothing', image: 'assets/previews/clothing_hanfu.png' },
        { label: '韓服', en: 'Hanbok', value: 'hanbok, korean traditional clothing', image: 'assets/previews/clothing_hanbok.png' },
        { label: '毛衣', en: 'Sweater', value: 'sweater', image: 'assets/previews/clothing_sweater.png' },
        { label: '露肩上衣', en: 'Off-shoulder', value: 'off-shoulder top', image: 'assets/previews/clothing_off_shoulder.png' },
        { label: '裙子', en: 'Skirt', value: 'skirt', image: 'assets/previews/clothing_skirt.png' },
        { label: '牛仔褲', en: 'Jeans', value: 'jeans', image: 'assets/previews/clothing_jeans.png' },
        { label: '兔女郎', en: 'Bunny Suit', value: 'bunny suit' },
        { label: '科技戰甲', en: 'Power Armor', value: 'sci-fi power armor' }
    ];

    const EXPRESSIONS = [
        { label: '傲嬌', en: 'Tsundere', value: 'tsundere, slight smile' },
        { label: '微笑', en: 'Smile', value: 'gentle smile' },
        { label: '害羞', en: 'Shy', value: 'blushing, shy' },
        { label: '高冷', en: 'Cold', value: 'expressionless, cold eyes' },
        { label: '興奮', en: 'Excited', value: 'excited, happy, open mouth' },
        { label: '哭泣', en: 'Crying', value: 'crying, tears' }
    ];

    const MOODS = [
        { label: '平靜', en: 'Calm', value: 'calm' },
        { label: '開心', en: 'Happy', value: 'happy, joyful' },
        { label: '興奮', en: 'Excited', value: 'excited, energetic' },
        { label: '生氣', en: 'Angry', value: 'angry, furious' },
        { label: '害羞', en: 'Shy', value: 'shy, blushing' },
        { label: '悲傷', en: 'Sad', value: 'sad, crying, tears' },
        { label: '驚訝', en: 'Surprised', value: 'surprised, shocked' },
        { label: '困惑', en: 'Confused', value: 'confused, question mark' },
        { label: '自信', en: 'Confident', value: 'confident, smug' },
        { label: '誘惑', en: 'Seductive', value: 'seductive, alluring' },
        { label: '冷漠', en: 'Cold', value: 'indifferent, cold' },
        { label: '認真', en: 'Serious', value: 'serious, determined' },
        { label: '調皮', en: 'Playful', value: 'playful, mischievous' },
        { label: '疲憊', en: 'Tired', value: 'tired, exhausted' },
        { label: '病嬌', en: 'Yandere', value: 'yandere, crazy eyes' },
        { label: '傲嬌', en: 'Tsundere', value: 'tsundere, blushing, angry' },
        { label: '無口', en: 'Kuudere', value: 'kuudere, emotionless' },
        { label: '呆萌', en: 'Clumsy', value: 'clumsy, dizzy' },
        { label: '沉思', en: 'Pensive', value: 'thinking, pensive' },
        { label: '睡意', en: 'Sleepy', value: 'sleepy, yawning' },
        { label: '醉酒', en: 'Drunk', value: 'drunk, flushed face' },
        { label: '瘋狂', en: 'Insane', value: 'insane, psychotic' },
        { label: '神聖', en: 'Divine', value: 'divine, serene' },
        { label: '孤獨', en: 'Lonely', value: 'lonely, alone' },
        { label: '懷舊', en: 'Nostalgic', value: 'nostalgic' },
        { label: '浪漫', en: 'Romantic', value: 'romantic, love' },
        { label: '緊張', en: 'Nervous', value: 'nervous, sweating' },
        { label: '放鬆', en: 'Relaxed', value: 'relaxed, chill' }
    ];

    const ANIME_STYLES = [
        { label: '宮崎駿 (吉卜力)', en: 'Hayao Miyazaki', value: 'studio ghibli style, by hayao miyazaki' },
        { label: '新海誠 (風景光影)', en: 'Makoto Shinkai', value: 'by makoto shinkai' },
        { label: '鳥山明 (七龍珠)', en: 'Akira Toriyama', value: 'by akira toriyama, dragon ball style' },
        { label: '尾田榮一郎 (海賊王)', en: 'Eiichiro Oda', value: 'by eiichiro oda, one piece style' },
        { label: '岸本齊史 (火影忍者)', en: 'Masashi Kishimoto', value: 'by masashi kishimoto, naruto style' },
        { label: '久保帶人 (死神)', en: 'Tite Kubo', value: 'by tite kubo, bleach style' },
        { label: '富堅義博 (獵人)', en: 'Yoshihiro Togashi', value: 'by yoshihiro togashi, hunter x hunter style' },
        { label: '井上雄彥 (灌籃高手)', en: 'Takehiko Inoue', value: 'by takehiko inoue, slam dunk style' },
        { label: '三浦建太郎 (烙印勇士)', en: 'Kentaro Miura', value: 'by kentaro miura, berserk style' },
        { label: '伊藤潤二 (恐怖漫畫)', en: 'Junji Ito', value: 'by junji ito, horror manga style' },
        { label: '高橋留美子 (犬夜叉)', en: 'Rumiko Takahashi', value: 'by rumiko takahashi, 90s anime style' },
        { label: 'CLAMP (庫洛魔法使)', en: 'CLAMP', value: 'by clamp, cardcaptor sakura style' },
        { label: '武內直子 (美少女戰士)', en: 'Naoko Takeuchi', value: 'by naoko takeuchi, sailor moon style' },
        { label: '荒木飛呂彥 (JOJO)', en: 'Hirohiko Araki', value: 'by hirohiko araki, jojo style' },
        { label: '村田雄介 (一拳超人)', en: 'Yusuke Murata', value: 'by yusuke murata, one punch man style' },
        { label: '吾峠呼世晴 (鬼滅之刃)', en: 'Koyoharu Gotouge', value: 'by koyoharu gotouge, demon slayer style' },
        { label: '藤本樹 (鏈鋸人)', en: 'Tatsuki Fujimoto', value: 'by tatsuki fujimoto, chainsaw man style' },
        { label: '芥見下下 (咒術迴戰)', en: 'Gege Akutami', value: 'by gege akutami, jujutsu kaisen style' },
        { label: '荒川弘 (鋼之鍊金術師)', en: 'Hiromu Arakawa', value: 'by hiromu arakawa, fullmetal alchemist style' },
        { label: '庵野秀明 (EVA)', en: 'Hideaki Anno', value: 'by hideaki anno, evangelion style' },
        { label: '手塚治虫 (原子小金剛)', en: 'Osamu Tezuka', value: 'by osamu tezuka, astro boy style' },
        { label: '永井豪 (惡魔人)', en: 'Go Nagai', value: 'by go nagai, retro mecha style' },
        { label: '松本零士 (銀河鐵道999)', en: 'Leiji Matsumoto', value: 'by leiji matsumoto, space opera style' },
        { label: '貞本義行 (EVA人設)', en: 'Yoshiyuki Sadamoto', value: 'by yoshiyuki sadamoto, evangelion character design' },
        { label: '桂正和 (電影少女)', en: 'Masakazu Katsura', value: 'by masakazu katsura' },
        { label: '北條司 (城市獵人)', en: 'Tsukasa Hojo', value: 'by tsukasa hojo, city hunter style' },
        { label: '京都動畫 (京阿尼)', en: 'Kyoto Animation', value: 'kyoto animation style' },
        { label: 'Ufotable (飛碟社)', en: 'Ufotable', value: 'ufotable style' }
    ];

    const ART_STYLES = [
        { label: '京都動畫', en: 'Kyoto Anim.', value: '(kyoto animation style:1.3)' },
        { label: '吉卜力', en: 'Ghibli', value: '(studio ghibli style:1.2)' },
        { label: '新海誠', en: 'Shinkai', value: '(shinkai makoto style:1.2)' },
        { label: '厚塗油畫', en: 'Oil Painting', value: '(oil painting style:1.1), thick impasto' },
        { label: '素描手繪', en: 'Sketch', value: 'sketch, monochrome, pencil drawing' },
        { label: '像素藝術', en: 'Pixel Art', value: 'pixel art, 16-bit' },
        { label: '賽博龐克', en: 'Cyberpunk', value: 'cyberpunk style, neon lights' },
        { label: '蒸氣波', en: 'Vaporwave', value: 'vaporwave style, aesthetics' },
        { label: '水彩畫', en: 'Watercolor', value: 'watercolor medium, soft edges' },
        { label: '水墨畫', en: 'Ink Wash', value: 'ink wash painting, sumi-e' },
        { label: '浮世繪', en: 'Ukiyo-e', value: 'ukiyo-e style, woodblock print' },
        { label: '普普藝術', en: 'Pop Art', value: 'pop art style, vibrant colors' },
        { label: '黑色電影', en: 'Film Noir', value: 'film noir style, high contrast, monochrome' },
        { label: '90年代動漫', en: '90s Anime', value: '1990s (style), retro anime' },
        { label: 'Q版角色', en: 'Chibi', value: 'chibi, super deformed' },
        { label: '寫實風格', en: 'Realistic', value: 'realistic, photorealistic' },
        { label: '半寫實', en: 'Semi-Real', value: 'semi-realistic' },
        { label: '3D 渲染', en: '3D Render', value: '3d render, blender, unreal engine' },
        { label: '黏土動畫', en: 'Claymation', value: 'claymation style' },
        { label: '剪紙藝術', en: 'Papercut', value: 'papercut art, layered paper' },
        { label: '彩繪玻璃', en: 'Stained Glass', value: 'stained glass style' },
        { label: '塗鴉', en: 'Graffiti', value: 'graffiti style, street art' },
        { label: '黑白漫畫', en: 'B&W Manga', value: 'manga style, monochrome' },
        { label: '韓漫條漫', en: 'Webtoon', value: 'webtoon style, full color' },
        { label: '恐怖風格', en: 'Horror', value: 'horror theme, dark atmosphere' },
        { label: '哥德風', en: 'Gothic', value: 'gothic style, dark and elegant' },
        { label: '粉彩哥德', en: 'Pastel Goth', value: 'pastel goth style' },
        { label: '蒸氣龐克', en: 'Steampunk', value: 'steampunk style, gears and brass' }
    ];

    const ARTISTS = [
        { label: 'Greg Rutkowski', en: 'Greg Rutkowski', value: 'by greg rutkowski' },
        { label: 'Alphonse Mucha', en: 'Alphonse Mucha', value: 'by alphonse mucha' },
        { label: 'Wlop', en: 'Wlop', value: 'by wlop' },
        { label: 'Artgerm', en: 'Artgerm', value: 'by artgerm' },
        { label: 'Ilya Kuvshinov', en: 'Ilya Kuvshinov', value: 'by ilya kuvshinov' },
        { label: 'Rossdraws', en: 'Rossdraws', value: 'by rossdraws' },
        { label: 'Krenz Cushart', en: 'Krenz Cushart', value: 'by krenz cushart' },
        { label: 'Hyung-tae Kim', en: 'Hyung-tae Kim', value: 'by hyung-tae kim' },
        { label: 'Yoshitaka Amano', en: 'Yoshitaka Amano', value: 'by yoshitaka amano' },
        { label: 'James Jean', en: 'James Jean', value: 'by james jean' },
        { label: 'Ruan Jia', en: 'Ruan Jia', value: 'by ruan jia' },
        { label: 'Range Murata', en: 'Range Murata', value: 'by range murata' },
        { label: 'Tiv', en: 'Tiv', value: 'by tiv' },
        { label: 'Kantoku', en: 'Kantoku', value: 'by kantoku' },
        { label: 'Mika Pikazo', en: 'Mika Pikazo', value: 'by mika pikazo' }
    ];

    const QUALITY_TAGS = [
        { label: '傑作', en: 'Masterpiece', value: 'masterpiece' },
        { label: '最佳畫質', en: 'Best Quality', value: 'best quality' },
        { label: '高解析度', en: 'Highres', value: 'highres' },
        { label: '8K', en: '8K', value: '8k' },
        { label: '4K', en: '4K', value: '4k' },
        { label: 'HDR', en: 'HDR', value: 'hdr' },
        { label: 'RAW 照片', en: 'Raw Photo', value: 'raw photo' },
        { label: '超精細', en: 'Ultra Detailed', value: 'ultra detailed' },
        { label: '極致細節', en: 'Extremely Detailed', value: 'extremely detailed' }
    ];

    const SCENES = [
        { label: '櫻花校園', en: 'Cherry Blossom School', value: 'cherry blossom, school, sunset' },
        { label: '夢幻星空', en: 'Starry Night', value: 'starry night, galaxy, dreamlike' },
        { label: '午後教室', en: 'Classroom', value: 'classroom, afternoon sun, window' },
        { label: '繁華都市', en: 'City Night', value: 'city street, neon lights, night' },
        { label: '奇幻森林', en: 'Magic Forest', value: 'magical forest, glowing plants' },
        { label: '海邊夕陽', en: 'Beach Sunset', value: 'beach, ocean, sunset' },
        { label: '臥室', en: 'Bedroom', value: 'bedroom, indoor' },
        { label: '圖書館', en: 'Library', value: 'library, books' },
        { label: '咖啡廳', en: 'Cafe', value: 'cafe, coffee shop' },
        { label: '學校頂樓', en: 'School Rooftop', value: 'school rooftop, cloudy sky' },
        { label: '神社', en: 'Shrine', value: 'shinto shrine, traditional' },
        { label: '賽博城市', en: 'Cyberpunk City', value: 'cyberpunk city, skyscrapers' },
        { label: '太空站', en: 'Space Station', value: 'space station, sci-fi' },
        { label: '水下世界', en: 'Underwater', value: 'underwater, coral reef' },
        { label: '沙漠', en: 'Desert', value: 'desert, dunes' },
        { label: '雪山', en: 'Snowy Mountain', value: 'snowy mountain, winter' },
        { label: '花海', en: 'Flower Field', value: 'flower field, spring' },
        { label: '城堡', en: 'Castle', value: 'castle, fantasy' },
        { label: '地下城', en: 'Dungeon', value: 'dungeon, dark' },
        { label: '實驗室', en: 'Laboratory', value: 'laboratory, science' },
        { label: '末日廢墟', en: 'Ruins', value: 'post-apocalyptic ruins' },
        { label: '溫泉', en: 'Hot Spring', value: 'onsen, hot spring' },
        { label: '夏日祭典', en: 'Summer Festival', value: 'summer festival, fireworks' },
        { label: '雨中', en: 'Rain', value: 'rain, umbrella, wet street' },
        { label: '黃金時刻', en: 'Golden Hour', value: 'golden hour, warm lighting' },
        { label: '抽象異界', en: 'Abstract', value: 'abstract dimension, colorful' }
    ];

    const WEATHER = [
        { label: '晴天', en: 'Sunny', value: 'sunny, clear sky' },
        { label: '多雲', en: 'Cloudy', value: 'cloudy' },
        { label: '雨天', en: 'Rain', value: 'raining, wet' },
        { label: '暴雨', en: 'Storm', value: 'heavy rain, storm' },
        { label: '雪天', en: 'Snow', value: 'snowing, winter' },
        { label: '霧氣', en: 'Foggy', value: 'foggy, mist' },
        { label: '風', en: 'Windy', value: 'windy, blowing wind' },
        { label: '雷電', en: 'Lightning', value: 'lightning, thunder' },
        { label: '彩虹', en: 'Rainbow', value: 'rainbow' },
        { label: '極光', en: 'Aurora', value: 'aurora borealis' },
        { label: '流星雨', en: 'Meteor Shower', value: 'meteor shower' },
        { label: '黃昏', en: 'Dusk', value: 'dusk, sunset' },
        { label: '黎明', en: 'Dawn', value: 'dawn, sunrise' },
        { label: '深夜', en: 'Midnight', value: 'midnight, moon' },
        { label: '正午', en: 'Noon', value: 'noon, harsh shadows' },
        { label: '日落', en: 'Sunset', value: 'sunset, golden hour' },
        { label: '藍色時刻', en: 'Blue Hour', value: 'blue hour' }
    ];

    const LIGHTING = [
        { label: '自然光', en: 'Natural', value: 'natural light' },
        { label: '電影光效', en: 'Cinematic', value: 'cinematic lighting', image: 'assets/previews/lighting_cinematic.png' },
        { label: '柔光', en: 'Soft', value: 'soft lighting' },
        { label: '硬光', en: 'Hard', value: 'hard lighting' },
        { label: '體積光', en: 'Volumetric', value: 'volumetric lighting' },
        { label: '倫勃朗光', en: 'Rembrandt', value: 'rembrandt lighting', image: 'assets/previews/lighting_rembrandt.png' },
        { label: '邊緣光', en: 'Rim', value: 'rim lighting' },
        { label: '逆光', en: 'Backlight', value: 'backlighting' },
        { label: '黃金時刻', en: 'Golden Hour', value: 'golden hour', image: 'assets/previews/lighting_golden_hour.png' },
        { label: '藍色時刻', en: 'Blue Hour', value: 'blue hour', image: 'assets/previews/lighting_blue_hour.png' },
        { label: '賽博龐克光', en: 'Cyberpunk', value: 'cyberpunk lighting' },
        { label: '霓虹燈', en: 'Neon', value: 'neon lights' },
        { label: '發光', en: 'Glow', value: 'glow' },
        { label: '生物發光', en: 'Bioluminescence', value: 'bioluminescence' }
    ];

    const CAMERA_ANGLES = [
        { label: '平視', en: 'Eye Level', value: 'eye level' },
        { label: '俯視', en: 'High Angle', value: 'from above, high angle' },
        { label: '仰視', en: 'Low Angle', value: 'from below, low angle' },
        { label: '側面', en: 'Profile', value: 'from side, profile' },
        { label: '背影', en: 'Back View', value: 'from behind, back view' },
        { label: '第一人稱', en: 'POV', value: 'pov' },
        { label: '自拍', en: 'Selfie', value: 'selfie, phone camera' },
        { label: '大特寫', en: 'Extreme Close-up', value: 'extreme close-up' },
        { label: '臉部特寫', en: 'Face Close-up', value: 'face focus, close-up' },
        { label: '半身像', en: 'Upper Body', value: 'upper body, cowboy shot' },
        { label: '全身像', en: 'Full Body', value: 'full body, wide shot' },
        { label: '廣角', en: 'Wide Angle', value: 'wide angle, fisheye' },
        { label: '微距', en: 'Macro', value: 'macro shot' },
        { label: '荷蘭式傾斜', en: 'Dutch Angle', value: 'dutch angle, tilted' },
        { label: '過肩鏡頭', en: 'Over Shoulder', value: 'over the shoulder' },
        { label: '動態視角', en: 'Dynamic', value: 'dynamic angle' },
        { label: '鳥瞰圖', en: "Bird's Eye", value: "bird's eye view" },
        { label: '蟲視圖', en: "Worm's Eye", value: "worm's eye view" },
        { label: '全景', en: 'Panorama', value: 'panorama' },
        { label: '電影鏡頭', en: 'Cinematic', value: 'cinematic angle' }
    ];

    const SHOT_SIZES = [
        { label: '極遠景', en: 'Extreme Long', value: 'extreme long shot' },
        { label: '遠景', en: 'Long Shot', value: 'long shot' },
        { label: '全身鏡頭', en: 'Full Shot', value: 'full shot' },
        { label: '中遠景', en: 'Medium Wide', value: 'medium wide shot' },
        { label: '牛仔鏡頭', en: 'Cowboy Shot', value: 'cowboy shot' },
        { label: '中近景', en: 'Medium Close-up', value: 'medium close-up shot' },
        { label: '特寫鏡頭', en: 'Close-up', value: 'close-up' },
        { label: '極特寫鏡頭', en: 'Extreme Close-up', value: 'extreme close-up' }
    ];

    const FOCAL_LENGTHS = [
        { label: '超廣角', en: 'Ultra Wide', value: 'ultra wide angle' },
        { label: '廣角', en: 'Wide Angle', value: 'wide angle' },
        { label: '半廣角', en: 'Semi-Wide', value: 'semi-wide angle' },
        { label: '標準鏡', en: 'Standard', value: 'standard lens' },
        { label: '中望遠', en: 'Medium Tele', value: 'medium telephoto' },
        { label: '望遠', en: 'Telephoto', value: 'telephoto' },
        { label: '超望遠', en: 'Super Tele', value: 'super telephoto' }
    ];

    const APERTURES = [
        { label: '小光圈', en: 'Small (f/16)', value: 'small aperture, f/16, deep depth of field' },
        { label: '中光圈', en: 'Medium (f/8)', value: 'medium aperture, f/8' },
        { label: '大光圈', en: 'Large (f/1.8)', value: 'large aperture, f/1.8, shallow depth of field, bokeh' }
    ];

    const LENS_EFFECTS = [
        { label: '景深', en: 'Depth of Field', value: 'depth of field, bokeh' },
        { label: '動態模糊', en: 'Motion Blur', value: 'motion blur' },
        { label: '鏡頭光暈', en: 'Lens Flare', value: 'lens flare' },
        { label: '色差', en: 'Chromatic Ab.', value: 'chromatic aberration' },
        { label: '暗角', en: 'Vignette', value: 'vignette' },
        { label: '膠卷顆粒', en: 'Film Grain', value: 'film grain' },
        { label: '柔焦', en: 'Soft Focus', value: 'soft focus' },
        { label: '銳利化', en: 'Sharp Focus', value: 'sharp focus' },
        { label: '過曝', en: 'Overexposure', value: 'overexposure' },
        { label: '低曝', en: 'Underexposure', value: 'underexposure' },
        { label: '高對比', en: 'High Contrast', value: 'high contrast' },
        { label: '低對比', en: 'Low Contrast', value: 'low contrast' },
        { label: '飽和', en: 'Saturated', value: 'saturated' },
        { label: '去飽和', en: 'Desaturated', value: 'desaturated, muted colors' },
        { label: 'HDR', en: 'HDR', value: 'hdr, hyperrealistic' },
        { label: '魚眼', en: 'Fisheye', value: 'fisheye lens' },
        { label: '廣角', en: 'Wide Lens', value: 'wide angle lens' },
        { label: '長焦', en: 'Telephoto', value: 'telephoto lens' },
        { label: '移軸', en: 'Tilt-Shift', value: 'tilt-shift' },
        { label: '拍立得', en: 'Polaroid', value: 'polaroid' }
    ];

    // Body types — Female
    const BODY_TYPES_FEMALE = [
        { label: '巨乳', en: 'Large Breasts', value: 'large breasts' },
        { label: '貧乳', en: 'Flat Chest', value: 'flat chest' },
        { label: '沙漏型', en: 'Hourglass', value: 'hourglass figure' },
        { label: '曲線', en: 'Curvy', value: 'curvy body' },
        { label: '豐滿', en: 'Voluptuous', value: 'voluptuous body' },
        { label: '嬌小', en: 'Petite', value: 'petite body' },
        { label: '苗條', en: 'Slim', value: 'slim body' },
        { label: '纖細', en: 'Slender', value: 'slender body' },
        { label: '蘿莉體型', en: 'Loli', value: 'loli body, small body' },
        { label: '少女體型', en: 'Young Girl', value: 'young girl body' },
        { label: '成熟體型', en: 'Mature', value: 'mature body' },
        { label: '窄腰', en: 'Narrow Waist', value: 'narrow waist' },
        { label: '長腿', en: 'Long Legs', value: 'long legs' },
        { label: '梨形', en: 'Pear-shaped', value: 'pear-shaped body' },
        { label: '翹臀', en: 'Wide Hips', value: 'wide hips' },
        { label: '細腰', en: 'Thin Waist', value: 'thin waist, waist' },
        { label: '美腿', en: 'Beautiful Legs', value: 'beautiful legs, thighs' },
        { label: '鎖骨線', en: 'Collarbone', value: 'visible collarbone' },
        { label: '小蠻腰', en: 'Tiny Waist', value: 'tiny waist' },
        { label: '柔軟', en: 'Soft Body', value: 'soft body' },
        { label: '豐胸細腰', en: 'Busty Slim', value: 'large breasts, slim waist' },
        { label: '標準', en: 'Average', value: 'average body' },
        { label: '高挑', en: 'Tall', value: 'tall body' },
        { label: '運動型', en: 'Athletic', value: 'athletic body' },
        { label: '健美', en: 'Fit', value: 'fit body' },
        { label: '結實', en: 'Toned', value: 'toned body' },
        { label: '修長', en: 'Lean', value: 'lean body' },
        { label: '纖腰', en: 'Willowy', value: 'willowy body, slender waist' },
        { label: '勻稱', en: 'Proportioned', value: 'well-proportioned body' },
        { label: '性感', en: 'Sexy', value: 'sexy body' },
        { label: '優雅', en: 'Elegant', value: 'elegant body, graceful' },
        { label: '嬰兒肥', en: 'Baby Fat', value: 'baby fat, youthful' },
        { label: '厚實', en: 'Thick', value: 'thick body, thick thighs' },
        { label: '纖瘦', en: 'Skinny', value: 'skinny body' },
        { label: '小巧', en: 'Tiny', value: 'tiny body, small frame' },
        { label: '微胖', en: 'Chubby', value: 'chubby body' },
        { label: '圓潤', en: 'Round', value: 'round body' },
        { label: '矮小', en: 'Short', value: 'short body' },
        { label: '圓臉', en: 'Round Face', value: 'round face, chubby cheeks' }
    ];

    // Body types — Male
    const BODY_TYPES_MALE = [
        { label: '肌肉', en: 'Muscular', value: 'muscular body' },
        { label: '精壯', en: 'Ripped', value: 'ripped body' },
        { label: '壯碩', en: 'Buff', value: 'buff body' },
        { label: '倒三角', en: 'V-shaped', value: 'v-shaped body' },
        { label: '寬肩', en: 'Broad Shoulders', value: 'broad shoulders' },
        { label: '正太體型', en: 'Shota', value: 'shota body, small boy body' },
        { label: '魁梧', en: 'Brawny', value: 'brawny body, powerful build' },
        { label: '健壯', en: 'Sturdy', value: 'sturdy body' },
        { label: '高大', en: 'Large', value: 'large body' },
        { label: '標準', en: 'Average', value: 'average body' },
        { label: '高挑', en: 'Tall', value: 'tall body' },
        { label: '運動型', en: 'Athletic', value: 'athletic body' },
        { label: '健美', en: 'Fit', value: 'fit body' },
        { label: '結實', en: 'Toned', value: 'toned body' },
        { label: '修長', en: 'Lean', value: 'lean body' },
        { label: '苗條', en: 'Slim', value: 'slim body' },
        { label: '纖細', en: 'Slender', value: 'slender body' },
        { label: '勻稱', en: 'Proportioned', value: 'well-proportioned body' },
        { label: '嬌小', en: 'Petite', value: 'petite body' },
        { label: '微胖', en: 'Chubby', value: 'chubby body' },
        { label: '豐腴', en: 'Plump', value: 'plump body' },
        { label: '圓潤', en: 'Round', value: 'round body' },
        { label: '纖瘦', en: 'Skinny', value: 'skinny body' },
        { label: '瘦高', en: 'Lanky', value: 'lanky body, tall and thin' },
        { label: '矮小', en: 'Short', value: 'short body' },
        { label: '嬰兒肥', en: 'Baby Fat', value: 'baby fat, youthful' }
    ];

    // Section definitions per tab
    const TAB_SECTIONS = {
        base: [
            { id: 'gender', title: { zh: '性別', en: 'Gender' }, type: 'gender' },
            { id: 'age', title: { zh: '年齡', en: 'Age' }, type: 'ageSlider' },
            { id: 'race', title: { zh: '種族', en: 'Race' }, data: RACES, count: 20 },
            { id: 'job', title: { zh: '職業', en: 'Job / Class' }, data: JOBS, count: 30 },
            { id: 'hairstyle', title: { zh: '髮型', en: 'Hairstyle' }, data: null, count: 30, genderDependent: true },
            { id: 'bodyType', title: { zh: '身材', en: 'Body Type' }, data: null, count: 40, genderDependent: true }
        ],
        appearance: [
            { id: 'hairColor', title: { zh: '髮色', en: 'Hair Color' }, data: HAIR_COLORS, type: 'color' },
            { id: 'eyeColorLeft', title: { zh: '左眼色', en: 'Left Eye' }, data: EYE_COLORS, type: 'eyeColor' },
            { id: 'eyeColorRight', title: { zh: '右眼色', en: 'Right Eye' }, data: EYE_COLORS, type: 'eyeColor' },
            { id: 'outfit', title: { zh: '服裝', en: 'Outfit' }, data: OUTFITS, count: 31 }
        ],
        action: [
            { id: 'expression', title: { zh: '表情', en: 'Expression' }, data: EXPRESSIONS },
            { id: 'mood', title: { zh: '心情', en: 'Mood' }, data: MOODS, count: 28 }
        ],
        style: [
            { id: 'animeStyle', title: { zh: '動漫風格', en: 'Anime Style' }, data: ANIME_STYLES, count: 28 },
            { id: 'artStyle', title: { zh: '藝術風格', en: 'Art Style' }, data: ART_STYLES, count: 28 },
            { id: 'artist', title: { zh: '藝術家', en: 'Artist' }, data: ARTISTS },
            { id: 'quality', title: { zh: '畫質', en: 'Quality' }, data: QUALITY_TAGS }
        ],
        environment: [
            { id: 'scene', title: { zh: '場景', en: 'Scene' }, data: SCENES, count: 26 },
            { id: 'weather', title: { zh: '時間 & 天氣', en: 'Time & Weather' }, data: WEATHER },
            { id: 'lighting', title: { zh: '光影', en: 'Lighting' }, data: LIGHTING }
        ],
        camera: [
            { id: 'cameraAngle', title: { zh: '角度', en: 'Angle' }, data: CAMERA_ANGLES, count: 20 },
            { id: 'shotSize', title: { zh: '鏡頭', en: 'Shot Size' }, data: SHOT_SIZES },
            { id: 'focalLength', title: { zh: '焦段', en: 'Focal Length' }, data: FOCAL_LENGTHS },
            { id: 'aperture', title: { zh: '光圈', en: 'Aperture' }, data: APERTURES },
            { id: 'lensEffect', title: { zh: '鏡頭效果', en: 'Lens Effect' }, data: LENS_EFFECTS, count: 20 }
        ]
    };

    // Legacy compat: promptData is no longer used for rendering; kept empty for backward compat

    // Legacy compat: promptData is no longer used for rendering
    const promptData = {};

    return {
        TABS, RACES, JOBS, CONFLICT_RULES, HAIRSTYLES_FEMALE, HAIRSTYLES_MALE,
        HAIR_COLORS, EYE_COLORS, OUTFITS, EXPRESSIONS, MOODS,
        ANIME_STYLES, ART_STYLES, ARTISTS, QUALITY_TAGS,
        SCENES, WEATHER, LIGHTING, CAMERA_ANGLES,
        SHOT_SIZES, FOCAL_LENGTHS, APERTURES, LENS_EFFECTS,
        AGE_DESCRIPTORS, BODY_TYPES_FEMALE, BODY_TYPES_MALE,
        TAB_SECTIONS, getAgeDescriptor
    };
})();

